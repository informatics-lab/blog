---
title: Fail fast with cloud
date: 2017-02-23 00:00:00 Z
categories:
- side-projects
- dask
- parallel computing
- machine learning
layout: post
summary: Failing with genetic algorithm Connect 4 bots but doing it quickly.
author: Theo McCaie
project:
thumbnail: https://images.informaticslab.co.uk/articles/2017-02-23-fail-fast-with-cloud/static-conn4.gif
header: https://images.informaticslab.co.uk/articles/2017-02-23-fail-fast-with-cloud/dna.jpg
---

## Failure

This is a post about failure. A post about how I failed to use genetic algorithms to create a AI that could play Connect 4 much better than random chance. And like all good failure stories it's really about success, it's about how I learnt to bend time with cloud computing and fail by lunch time at what would of usually taken me the whole week to fail at. We'll get to that, but first a little about AI 🤖.

## Minimax

I'm a big fan of Connect 4 and also of AI so I thought a good way of wetting my whistle would be to create an Connect 4 playing AI. My first stab at this which [can be found on git hub](https://github.com/tam203/machine_learning/tree/master/minimax) was to use an algorithm called [minimax](https://en.wikipedia.org/wiki/Minimax). To quote wikipedia

> Calculating the maximin value of a player is done in a worst-case approach: for each possible action of the player, we check all possible actions of the other players and determine the worst possible combination of actions - the one that gives player A the smallest value. Then, we determine which action player A can take in order to make sure that this smallest value is the largest possible.

I.e. Assume that your opponent is going to try minimise your score and take the move that maximises your score despite this.

To use this in Connect 4 I assume a win is worth 100 points, a lose -100 and a draw 0. I then seek for each player to maximise their score. The difficulty arises from the fact that to get the true minimax score you need to evaluate the full tree of all possible moves. Given a connect 4 grid is 7 columns which can stack up to 6 heigh then there is up to 49 moves per game and so approximately 7<sup>42</sup> or approx 3x10<sup>35</sup> permutations to evaluate. To put this in perspective if we churned through a billion of these every second since the beginning of the universe we would still be less than 0.0001% of the way through by the time the sun explodes in 7 billion years 🌞💥‼️️. To deal with this problem we don't look at all the possibilities we check out the options to a certain depth (i.e. a certain number of moves into the future). Even setting this lowish (say 5) can makes for a challenging game of connect 4. Give it ago [over here where someone has done a much better job than me](https://www.gimu.org/connect-four-js/plain/minimax/index.html).

## Another way?

This exploding permutations problem is bad enough in Connect 4 but becomes insane in a game like Chess or Go, yet as many will know there are computers that are world class at both these games so there must be other ways. For my next Connect 4 AI I wanted use a neural net, not the massively deep kind that [AlphaGo](https://deepmind.com/research/alphago/) might use but a simple two layer one written in [NumPy](http://www.numpy.org/). It looked like this:

```python
class NNEtPlayer():
    def __init__(self, colour, w1=None, w2=None):
        self.n_features = 6*7
        self.n_h1 = 64
        self.classes = 7
        self.colour = colour

        self.w1 = w1 if w1 is not None else (np.random.rand(self.n_features + 1, self.n_h1) -0.5)*2
        self.w2 = w2 if w2 is not None else (np.random.rand(self.n_h1 + 1, 7) -0.5)*2

    def board_to_vector(self, board):
        board = np.array(board.board).reshape([1, self.n_features])
        vec = np.zeros([1, self.n_features], np.float32)
        vec[np.where(board==1)] = 1
        vec[np.where(board==0)] = -1
        return vec

    def add_1s(self, vec):
        return np.c_[np.ones([vec.shape[0],1]), vec]

    def apply_net(self,vec):
        a1 = sigmoid(np.matmul(self.add_1s(vec), self.w1))
        a2 = np.matmul(self.add_1s(a1), self.w2)
        return a2

    def pick_move(self, board):
        v = self.board_to_vector(board)
        move = np.argmax(self.apply_net(v))
        return (move,)
```

The codes not terribly interesting, it's a simple neural net taking a feature vector of length 7 x 6 (the connect 4 board flattened), has one hidden layer of 64 nodes and outputs a vector of length 7 (the number columns, i.e. possible moves, in Connect 4). Which ever column has the highest value, is the selected column when the player takes there move.

## Evolution

To train this this neural network the 'traditional' way using back propagation would require a data set of 'correct' moves for a given situation. Rather than search the web for move transcripts of the world Connect 4 championships I wanted to experiment with genetic algorithms. Here's what [MathWorks](https://uk.mathworks.com/discovery/genetic-algorithm.html) says about them

> A genetic algorithm (GA) is a method for solving both constrained and unconstrained optimization problems based on a natural selection process that mimics biological evolution. The algorithm repeatedly modifies a population of individual solutions. At each step, the genetic algorithm randomly selects individuals from the current population and uses them as parents to produce the children for the next generation. Over successive generations, the population "evolves" toward an optimal solution.

So I created 100 random neural net players and get each neural network player to play the minimax player and give the game a score. I took the best performing neural network players and 'breed' them to create new once. Rinse and repeat.

I'm not going to dwell on the breeding because as I said at the start it was a bit of a failure, but basically breeding was swapping some or all of the weights in a layer between the breeding pair and then also randomly adjusting and multiplying some of the weights.

## Getting better slowly

The scoring method was simple. A win was a whopping 300 points (this never happened) and anything else was awarded points for how many moves were in the game i.e. the longer the neural net player drew out a loss the better. At first I was running this code locally on my Mac and it was slow going but seemed to be going somewhere at first

```
Average: 12.2123629112662. Ave top 5: 21, top: 24.0
```

and a couple of hours later

```
Average: 14.904287138584248. Ave top 5: 25.6, top: 27.0
```

So it looked like progress but it was hard to tell, scores went up and down and I didn't know if progress was trailing off or was continuing to improve...

I was getting board of waiting 💤.

## Cloud computing for the win

We've done a number of posts on [Jade](http://www.informaticslab.co.uk/projects/jade.html) our cloud platform for parallel computation so I'll not dwell on this but in short it's a cloud based environment which we can scale to handle nearly any parallel computing challenge, but was it up to Connect 4?

Running my code on Jade was easy. To turn my code in to a parallel and distributable problem I wrapped the `play` action (the action of taking a neural net player and playing it against the minimax player a hundred times or so to get a score) with the `dask.delayed` decorator. Job done!

Next I ramp up the number of workers up and order of magnitude and hit ctrl+enter to spew my problem over the cluster. Results started streaming in many times faster than running locally and by the time I decided to stop for lunch it had plateaued off around a score of 40 and I could see that this implementation had reached it's limit.

```
Average: 15.440677966101696. Ave top 5: 35.0, top: 38.0
Average: 16.06679960119641. Ave top 5: 37.4, top: 40.0
Average: 15.586241276171485. Ave top 5: 36.6, top: 40.0
Average: 15.652043868394816. Ave top 5: 36.0, top: 39.0
Average: 16.149551345962113. Ave top 5: 35.6, top: 40.0
Average: 15.48554336989033. Ave top 5: 36.0, top: 39.0
Average: 16.03988035892323. Ave top 5: 38.0, top: 39.0
```


## CPU cycles might be constant but time isn't

The moral of this story isn't how to create a fantastic Connect 4 robot, it's not, my neural net connect 4 bot is rubbish, it really is. What was exciting though is that I found this out in a morning rather than in a week. By parallelising my problem and running on a cluster I found out the limits and flaws in my methodology quickly.

In many problems the amount of CPU cycles you need to spend on it is fixed, it was going to take millions of Connect 4 games for me to learn and understand about the thing I built. However, when one thing is fixed we look to the things that aren't in this case time.

Cloud computing and the array of wonderful parallelising tools means that even if we are CPU cycle fixed we needn't be time fixed, we can use scale like a time machine allowing us to pull the answer from the distant future into the present.

## Cost 💰

This idea of using scale to speed up your problem solving raises interesting questions about cost. At first glance it could be worrying, I burnt through a weeks worth of computing in a few hours, what if I keep doing that? 🤑. On the other hand a fixed CPU task is a fixed price task. If we are talking EC2 instances, ten for one hour is the same price as one for ten hours. Same price, quicker answer, what's not to like? What about my time? In theory I could work on other things whilst my long running jobs are going but in practice multi tasking is a euphemism for doing multiple things badly. I'm convinced that my productivity is boosted if I can concentrate on one thing at a time and getting my answers fast allows me to do just that.

I think the days of having a one size fits all computing approach for problem solving are rapidly becoming the past, the future is elastic. We might need to be aware of the costs and the risks but as they say ["with great power comes great responsibility"](http://quoteinvestigator.com/2015/07/23/great-power/) and lets not forget also great fun.

![Robots playing connect 4](https://images.informaticslab.co.uk/articles/2017-02-23-fail-fast-with-cloud/coon4.gif)
