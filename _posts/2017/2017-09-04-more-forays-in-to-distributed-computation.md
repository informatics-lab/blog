---
title: Reflections on distributed parallel computation
date: 2017-09-21 00:00:00 Z
categories:
- dask
layout: post
summary: Thoughts, tips and reflections from more exploration of distributed computation with dask and a scalable cluster.
author: Theo McCaie
project: jade
thumbnail: https://images.informaticslab.co.uk/misc/a31af87414c1ef8b412d44890ba44d9d.png 
header: https://images.informaticslab.co.uk/misc/9a0f354eb07aa78497f80b89bd554afc.png
---

### Adaptive Dask clusters on Kubernetes and AWS


We've done some previous work on [Adaptive Dask clusters on Kubernetes and AWS](/dask/2017/07/21/adaptive-dask-clusters-on-kubernetes-and-aws.html) in which we hooked the dask scheduler up to Kubernetes and Kubernetes up to AWS. In this setup when the scheduler detects it's got more work to do than workers to do it it requests more workers from Kubernetes, and Kubernetes will provide them if it can. When Kubernetes detects that it's unable to provide new workers as it doesn't have the resources on any of its nodes to do so then it provisions new nodes from AWS. This setup creates a worker pool that will quickly scale from no workers at all to hundreds or perhaps even thousands (but we never pushed it that far) to quickly get and scheduled work done. Once the scheduler detects that it has less work to do than workers to do it then it scales back down again and Kubernetes un-provisions any AWS instances it no longer needs. In our original work on these adaptive clusters we used some dummy code that used `sleep` statements to simulate cpu load. In this next step work we wanted to test this concept further by applying some real CPU load. To do that we needed a large but highly parallelizable task and for this we chose simulating cracking passwords. It's worth noting that no real passwords were under attack in this work and for a range of reasons this approach would not really be suitable for real world password cracking.

## The problem space

Passwords are usually (and should be) stored as hashes. The hashing process means that you can go from a password to a hash but not a hash to a password. To check a password is correct you hash the guessed/entered password and check it matches against your saved hashed password. If it does the password is correct. If not, it isn't. When a system is hacked and passwords are leaked what is actually leaked (assuming a decent level of security) is these password hashes. In order to try find out the actual password (so as to steal accounts etc) the hackers need to guess at passwords, hash these and test if they match one or more of the stolen password hashes.

The experiment I ran isn't realistic since good security uses multiple layers of hashes and also salts (strings that makes the password longer so hard to break) and other mechanisms which I ignored. On the other hand hackers aren't usually trying to acquire a specific password just to find one or more matches in a large database of hashes. 

For my test case I was trying to crack a password stored as a md5 hash [a now known to be flawed algorithum](https://en.wikipedia.org/wiki/MD5#Overview_of_security_issues) using a brute force attach. A brute force attack is where you use a lot of computational power to try every permutation until you find the correct answer.

It's worth noting that this can be challenging even for a relativly simple password such as one that is 8 characters long taken from just lowercase `a-z` and `0-9`. For this set of constraints there are still over 3.2e+32 possible passwords. However it's also worth noting that this is an [embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel) task. Each potential password can be treated and tested  separately till we find the correct one.

## Things I learnt

Rather than talk about all the dead ends and wrong turns I took here is the conclusion or takeaways I learnt.

### Understand the size of your problem

If possible try understand how big your problem is and how long it will take to run. This informs how much effort you should put into many of the other things I'll mention below. For example when trying to "crack" a pin number stored as a md5 hash there are only a little over a million permutations, easily enough to run locally and quickly enabling you to ignore much of the extra work I'll talk about below. If you've got a big task can you break it in to chunks and work out how long each chunk will take? How long will it take to process one of your million files? How long would 10 iterations of you 500,000 iteration task take? How long would it take to average 0.01% of your input data? This information will give you useful insight to optimise your task and work out if it's achivable and what infrastructure you might need i.e. 1 core, 10 cores, 1,000 cores?

### It will break, make that ok

For a big problems, something will go wrong at some point, if you design your task so that it can break and be restarted this will save you a lot of time in the long run. Many tools (such as dask-distributed that I was using) will be tolerant to node faults, network faults, etc and handle these for you. However, they will all have weakness and will not be able to save you from the code bugs you introduce. If you need to start your four hour task from scratch whenever your schedular node falls over or a bug kills the whole execution or your notebook server dies or, or, or... 

On this lesson I got some help in the form of [this answer from MRocklin](https://stackoverflow.com/a/45985149/1498817). With dask for big/long running tasks it was really useful to use the [concurrent.futures](http://dask.pydata.org/en/latest/futures.html) interface and in particular the [as_completed](http://dask.pydata.org/en/latest/futures.html#waiting-on-futures) iterator.

Remember that everything is breakable, a worker will die, the scheduler will fall over, your notebook server will bomb out, the wifi will disconnect, your brain will forget where you got to... It's nearly always easier to make things that can recover from failure than it is to make things that do not fail.

### Package your tasks well

There are many ways to bake a cake and the same is true of packaging you work to send to the worker nodes. For my task I tried a few different options all with their own pros and cons but I'll highlight perhaps the two at the opposite ends of the spectrum.

First I tried a big computation graph with each permutation being a vertex. This worked well in a small problem space but as soon as the problem space started growing (more possible characters or longer passwords) the graph became big to build (not compute, just to put together how it would be computed) and to big too send over the network.

My final iteration was in two main parts. Part one is a function that could take a integer and turn it in to a password guess that would if you went from `0` to `number of perutations`would cover every guess. That looked like this:

```python
keyspace = 'abcdefghijklmnopqrstuvwxyz1234567890'
def guess(n):
    guess = ''
    size = len(keyspace)
    while n>0 :
        n -= 1
        guess += keyspace[n % size];
        n = math.floor(n / size);

    return guess
```

And then a function which would spit out a task to send to the scheduler that would test a defined range of the problem space i.e. `5000` to `10000`.


```python
def is_pw(guess):
    found = hashlib.md5(guess.encode('utf-8')).hexdigest() == hashed_pw 
    return found

def search_pw_space(start, end):
    return list(filter(is_pw, map(guess, range(start, end))))
```

I could then send one or more (usually many more) of these tasks to the scheduler to churn through simultaneously.

### The right sized tasks

This is related to the point above but for a task such as this one with a very simple computation (one md5 hash) but a huge number of times it needs to be done it would be inefficient to send each individual md5 job to a different node to compute get an answer and send the next one. More time would be spent on network traffic than CPU cycles. It makes more sense to send a thousand or a million to do at once and get the answer from that. On the other hand don't send very large jobs, especially if you have fragile nodes as a fault will take take more time to recover from and feedback will be slower coming. If you've packaged your job well you can choose and refine the size and simultaneous number of jobs to send to the workers at anyone time.


### Worker pressure

This is not a call to create a union but is about always asking you scheduler to do more but a manageable amount more. In the set up I was running on the scheduler will provision more workers if it has many more tasks to do then it has workers to deal will. By constantly ensuring the scheduler has an excess of tasks to work on then it will provision more workers (up to a point) and your job will be done quicker. The key is to keep this pressure applied such that as more workers come online (and work gets done more quickly) you request more and more work to be done so the scheduler is always at a deficit. It's also important not to submit so much that you flood the scheduler or your client to the point that either run out of memory or have other problems.


### You need to change, your code needs to change and the tools are just there to help you do it.

I think that it is a myth that any tool will magically take the serial code you are used to writing and magically turn it into a parallel code that will distribute well and 'just work'. There will be some exceptions, for example with a simple [NumPy](http://www.numpy.org/) job it might be a simple matter of swapping in [dask array](http://dask.pydata.org/en/latest/array-overview.html), but I think for real world problems these are few and far between. 

Most of the parallelisation libraries out there make us change our code and/or way of thinking and this is good. Parallelism is going to be the new paradigm I think. To the next generation of programmers it will 'just be how we write code', the way object orientation was for me. Tools that ease us into a new way of working and thinking prepare us for the future.
 

## Other random helpful things I learn in this process

So in this process I also learnt some other random bits and bobs that I'm putting here for prosperity but they are a bit of a job lot so feel free to stop reading now.

### kubectl port forward

I had a lot of problems running on our hosted Jupyter cluster so I wanted to run Jupyter locally but without exposing our dask cluster publicly. I found that I could do this using `kubectl port-forward` (once `kubectl proxy` was running in another  terminal). Since the scheduler kept falling over when I was hammering it rather than keep looking up the schedulers pod name I just made a composite command:

```
kubectl -n dask port-forward $(kubectl -n dask get pods | grep dask-sch | cut -d' ' -f1) 8786:8786`
```

### Docker to host machine communication

Some of the libraries I wanted on my Jupyter notebook weren't available on Mac so I was running the notebook server through Docker. Since the port-forward to the dask cluster was on the host machine I needed to tunnel from Docker to my host machine and then out in to the Kubernetes dask cluster. I found once the port-forwarding was running I could do this but using the address `docker.for.mac.localhost` so connecting to my scheduler was a matter of running `client = distributed.Client('docker.for.mac.localhost:8786')`. To be honest I'm not 100% on what's going on here as this seems rather 'anti-Docker' but it worked so I stopped digging...

### File handles on Mac

The default number of file handles allowed for a process on macOS seemed to be 256, I found I quickly broke this in the terminal window running the port-forwarding. Luckily this was easy to solve, `sudo ulimit -n 5000` brought it up to a more reasonable number. I needed so many since (I think) that each job submitted to to the scheduler represented one file handle to make the network connection, and I was making several thousand of these simultaneously.
