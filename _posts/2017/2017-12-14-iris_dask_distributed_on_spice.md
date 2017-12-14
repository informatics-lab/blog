---
title: Iris, dask, distributed and SPICE
date: 2017-12-14 00:00:00 Z
categories:
- dask
layout: post
summary: Massively parallel processing of large datasets using Iris.
author: Peter Killick
project:
thumbnail: https://images.informaticslab.co.uk/misc/d7546afb5bd3cd9c05a8df138f893168.PNG
header: https://images.informaticslab.co.uk/misc/0b0760a5dd423cefc7d7355fa87473d2.jpg
---

## Iris, dask, distributed and SPICE

Introducing massively parallel processing of large weather and climate datasets using Iris.


### What are all those things?

At the Met Office we have a high performance compute cluster for running large scientific compute jobs that do not fit on the HPC. We call this cluster SPICE, which stands for "Scientific Processing Intensive Compute Environment".

We are also finishing up work integrating [dask](http://dask.pydata.org/en/latest/) with [Iris](http://scitools.org.uk/iris/docs/latest/index.html). This maintains Iris' ability to perform lazy data operations, but the operations are now performed by dask, bringing with it all of dask's clever parallel graph execution.

Of particular interest to us is whether dask and Iris can be used together to perform distributed processing of Iris datasets, especially on SPICE. This was the first major test of distributed processing with Iris, which was not possible before we started work integating dask into Iris.


#### What did we do?

We were interested in two experiments: loading large datasets and processing the same large datasets using reductions. In both cases we compared the time to complete the experiment using single-threaded Iris with multi-threaded Iris (using dask) with distributed Iris (using dask [distributed](http://distributed.readthedocs.io/en/latest/)).

We found some x-wind and y-wind data from an old model run. Each file was about 1.5G in size, and there were many more similar files available from other model runs that could be used to massively scale up the amount of data to be loaded and processed.

<figure>
    <img src="https://images.informaticslab.co.uk/misc/d7546afb5bd3cd9c05a8df138f893168.PNG" width="825" height="591" alt="Graph showing many parallel file loads on SPICE" />
    <figcaption>Parallel loading lots of files using SPICE</figcaption>
</figure>


#### Loading

The loading experiment was simple: how long does it take to load a number of files? While this is arguably a test of I/O performance, we were interested to see how well we could parallelise Iris data loading using dask.

Note: for memory usage reasons, Iris only loads metadata and not data values at file load time, so this was a test of metadata loading only.


#### Data processing: mathematics and reductions

The data processing experiment was also quite simple. The elements of the experiment were deliberately chosen to work with areas of Iris that had been modified during the dask integration work, specifically mathematics and statistical reductions.

Given that we had x-wind and y-wind data to work with, the data processing was taking the x-wind and y-wind data and converting it to wind speed and direction (mathematics), then finding the variance in wind speed and direction over time (statistical reductions).


### What did we find out?

One of the key aims of this investigation was to provide good practice guidelines for scientists wishing to parallelise data processing using dask and Iris on SPICE. We can supply good practice guidelines by first finding out what works best. Of course, "best" is quite a broad requirement, so we defined "best" as "fastest".

With weather and climate datasets getting ever larger, one of the main difficulties faced by scientists is that loading and processing times are also increasing. Thus, good practice solutions will be those that provide the greatest reduction of loading and processing times.

For both loading and processing datasets we observed speed improvements when using dask's distributed engine. For loading data we saw about a 3x speed improvement when using eight dask worker processes, so we did not see a direct correlation between increasing the number of worker processes and increasing the load speed.

Intriguingly, we never saw speed improvements when running loading or processing with dask's multiprocessing or multi-threading engine. There is further discussion of this result in the next steps section below.


### What are the next steps?

No good experiment would be complete without some next steps, or areas for further investigation. Here are our ideas for some next steps that will make using Iris and dask with distribued on SPICE simpler and better for everyone.


#### Persisted scheduler

One problem we encountered was that we ran a scheduler as one part of the processing / resource requested on SPICE. There were a couple of problems with this: we had to start the scheduler each time we wanted to run any processing (not a big thing, but a little thing often gets tedious), and when the SLURM-allocated walltime elapsed then everything – including the scheduler – was lost.

We can solve both of these problems by persisting the scheduler: if the scheduler is always running we don't lose time restarting it each time we want to do some processing and we reduce the overhead for using distributed processing on SPICE.


#### Scaleable scheduler

A follow-up benefit from having a persisted scheduler is that we could make it [scale the number of workers](https://distributed.readthedocs.io/en/latest/adaptive.html) it has with the amount of jobs being submitted to it. This means we can be much leaner with the amount of SPICE resources being used at any given time, for the trade-off of having a scheduler continually running on SPICE. We have already proven such technologies with using Kubernetes on AWS.


#### Parallel metadata loading

While we can increase Iris load speed using distributed, we are effectively only getting parallel file I/O. Clearly when loading multiple files we will get improved loading speed by being able to load multiple files at the same time, but the discovery that multi-threaded load with Iris is slower than single-threaded Iris load is evidence that more work is needed.

This comes down to work needed in Iris itself. It is, however, work that has flagged this as an issue with Iris, meaning it is something of a secondary benefit of this investigation.


#### Thread-safe Iris

Iris is not thread-safe! More accurately, a number of Iris' dependency libraries are not thread-safe. This means we cannot run Iris with multi-threaded workers, which limits the amount of parallelisation we can get from running Iris using distributed on SPICE to the number of worker processes we can set up.

This has no short-term fix (other than allocating more CPU cores!), but in the longer term we can look to partner with the authors of the problem dependency libraries to improve the functionality of these dependency libraries. It may even be that all that is needed is a rebuild of the libraries that are not thread-safe, which would bring a whole lot of benefit for not too much work!


### In conclusion

To sum up then, we added dask to Iris and tested them on SPICE, the Met Office's parallel compute cluster. We found that using distributed with Iris gave noticeable performance improvements both when loading and processing large datasets. Conversely we found that the current state of Iris, and Iris dependencies, prevents parallel processing using dask alone from producing any performance benefits.

As a result of this investigation we can recommend using Iris with distributed on SPICE for parallel-processing of large datasets. We also have a number of recommendations for further work and improvements to Iris that have come out of discoveries made during this investigation.
