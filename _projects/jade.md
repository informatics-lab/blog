---
title: Jade
layout: project-overview
author: Niall Robinson
summary: Why scientific and technological research are now intertwined
github-link: https://github.com/met-office-lab/jade
completed: false
project: jade
thumbnail: https://images.informaticslab.co.uk/jade-gem.jpg
---

## What's the problem?

#### Too big data
We've got some seriously big data at the Met Office. In fact, with the advent of our new supercomputer, our archive will contain as many numbers as there are grains of sand in the world. The data volumes are so big that the status quo - downloading the data to a desktop computer for analysis - is fast becoming impractical.

#### Why we should be worried
This is not a problem unique to the Met Office, although we have an acute case. In general, a lot of analysts can no longer analyse all the data that is relevant to their problem. They have to make a priori decisions about how to process their data into a manageable form: perhaps they choose to look for a phenomenon in a subset of the data, or maybe they downscale the data.

But what if they look in the wrong place? And what if they downscale away the important information? This kind of pragmatic approach to managing big data volumes is pernicious. Analysts can be coerced into non-scientific habits, which will ultimately lead to incorrect conclusions and missed opportunities.

#### Scientific and technological research are becoming intertwined
Technology and science can no longer be considered separate concerns. Data technology innovation is essential to the progression of science.

## What's the solution?

#### We need a fundamentally new way of working
It is no longer the case that computer power is the bottle-neck for data analysis, an at any rate, computer chip manufacturers have announced that we cannot rely on them making faster chips in the future. The limiting factor in data analysis is now data storage, and moving the data to where it's needed. The solution to these problems isn't brute force, but a paradigm shift in how we analyse data.

#### Instead of moving data, we need to move the analysis
Under these data volumes, we will stop moving data from a traditional data base to a computer for analysis. Instead, we have a new kind of data store, where the data is split into many chunks which are stored in the same place as the compute. This is the basis of many of the big data platforms which have sprung up over the last few years, such as [Hadoop][hadoop], [Spark][spark] and [Dask][dask].

A system like this can speed up analyses from months to minutes by allowing all the chunks to be processed simultaneously. It is a very scalable solution: as data volumes grow, you can just add more compute chunks to your data store, allowing your analysis time to remain the same.

#### More for your money
Ultimately we want scientists to do what they do best - apply their expertise to the scientific question at hand. Every time a scientist has to watch a progress bar they aren't doing this. And every time a scientist makes an analysis decision based on what's possible rather than what they want to know, we can miss valuable information.

If we are to continue to make our data useful in the future, we need a set of radically different tools for our scientists.

## What's JADE
[Jade][jade-git], the Jupyter and Dask Environment, is our prototype data analysis platform. It provides a powerful and flexible big data analysis environment which analysts can access through a web browser. You can find more technical details in the associated [blog post][jade-blog].

We dream of the day the Met Office can replace everyone's powerful data analysis desktops with Chromebooks!

[dask]: http://dask.pydata.org/en/latest/
[hadoop]: http://hadoop.apache.org/
[spark]: https://spark.apache.org/
[jade-git]: https://github.com/met-office-lab/jade
[jade-blog]: http://localhost:4000/projects/jade.html