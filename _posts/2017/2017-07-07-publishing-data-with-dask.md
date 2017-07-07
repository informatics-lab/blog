---
title: Publishing data with Dask 
date: 2017-07-07 00:00:00 Z
categories:
- dask
layout: post
summary: Using Dask + Iris to publish data, reducing the barrier of data discovery.
author: Alex Hilson
project: jade
thumbnail: https://images.informaticslab.co.uk/misc/88560a2f4ca6587cde68e66aac9a88a9.png
header: https://images.informaticslab.co.uk/misc/88560a2f4ca6587cde68e66aac9a88a9.png
---

Using Dask + Distributed allows you to persist and publish an object on the cluster.

This means you can ‘save’ your work for another day or share it with other users. We’ve trialled this for publishing meteorological data, reducing the barriers of data discovery.

A powerful feature of Iris is that it’s lazy by default. When you load a dataset it does the bare minimum amount of work to parse the metadata, leaving most of the data on disk until you run a computation. 

Combining these two features means you can load datasets with Iris that have a large total size, but a very small in-memory footprint. Then you can publish that large dataset for anyone else to use. 

## Demo

Here’s an example in which we load and publish one model run (~50 gigabytes). We then load the published dataset in a new session and do some simple real time exploration. We find out what parameters the data set contains and combine that code with a widget, then plot a sample using matplotlib, and finally combine the data for a particular parameter into a unified view. 

{% youtube 757GHq2ymHk %}

In this case we’re working with fairly small amounts of data (1 model run, 50 gb total, a few gb per parameter). But we’ve had some early successes with persisting larger datasets, and hope to have more to share soon. 

## Challenges

Because Iris relies on waiting to read data until the last minute and Distributed likes to shuffle tasks around each node must be able to access the entire dataset. For this small dataset we simply download all of the data onto each node, but for larger datasets we’re trialling Thredds Data Server (TDS) + OpenDAP to allow scalable reading of remote datasets. Our dataset is stored in S3, and we're experimenting with an extension for TDS that allows reading from S3 via byte range requests.

The Distributed scheduler is quite resilient, but if it falls over then the persisted and published datasets are lost. That could be quite painful if you’ve just processed and published a few hundred terabytes, so we’re looking at ways to create on disk backups. One approach would be to save the Iris cubes using pickle, and then automatically load the pickles from disk when a scheduler started. Another approach would be to develop the capability within Iris to save / load cube cube metadata, perhaps using a textual format like Markdown.

