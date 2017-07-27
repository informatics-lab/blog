---
title: Introduction to machine learning
date: 2017-07-26 00:00:00 Z
categories:
layout: post
summary: 
author: Rachel Prudden
project: machinelearning
thumbnail: 
header: 
---

## Introduction

We recently had an [article][article] published discussing the potential for applying machine learning techniques in the context of weather forecasting. This blog post will go into more detail about some specific algorithms and how they might be useful.

## Challenges

Meteorology is a huge subject, and there are many areas where machine learning could be relevant. That said, these are a few places it could be particularly useful.

### Localisation and super-resolution

Operational weather models are usually run at a resolution of between 1km and 10km, that is, everything within the same square kilometer is represented by a single grid cell. This resolution is fine enough to capture a wide range of phenomena, but will obviously be unable to capture very localised details. This kind of localisation is known as downscaling.

The target for downscaling a model can be either a high resolution grid, or a point forecast for a specific location. A grid can describe how the weather might vary across an entire area, while point forecasts are good for very localised predictions.

<div width="100%">
<img src="https://images.informaticslab.co.uk/projects/machinelearning/grid_downscalingimg.png" alt="grid downscaling" width="60%" align="left"/>
<img src="https://images.informaticslab.co.uk/projects/machinelearning/point_downscalingimg.png" alt="point downscaling" width="35%" align="right"/>
</div>

<br><br><br><br><br><br><br><br><br><br><br>

### Emulation and hybrid models

Emulators are fast statistical algorithms which approximate the behaviour of more expensive numerical simulations. They are often useful for speeding up "bottleneck" calculations within a simulation, particularly those which are already treated statistically.

Because emulators may not fully capture the behaviour of the original model, it is common for them to give a probabilistic answer rather than a single output. This prevents the emulator from making over-confident and perhaps inaccurate predictions.

### Exploring and summarising

The fields output by weather models are highly multi-dimensional; making sense of them is a complex task, requiring many “screens” of information. There is an additional difficulty when analysing historical model data: it is fairly straightforward to access data according to time and location, but very difficult to access it by content. 

Finding ways to summarise the salient features of these multi-dimensional fields would make it far easier to analyse historical model data.

## Taxonomy of machine learning algorithms

You can find any number of blog posts sorting machine learning algorithms into family trees in all different ways. Here is another one!

### Supervised or unsupervised?

Supervised learning relies on training labels to learn, while unsupervised learning does not. This gives supervised methods an advantage in many cases, as having access to the labels will help them to focus on the most relevant details for the problem. However, labelled data is not always available in sufficient quantities to train them.

Unsupervised learning does not use training labels, but tries to uncover hidden structure in the input data. Finding these structures can make it possible to train supervised algorithms using considerably less data than usual. This is because the structure provides a mapping between the original problem and a lower-dimensional (hence less data-hungry) problem.

This combination of supervised and unsupervised algorithms is an example of semi-supervised learning. The use-case for semi-supervised learning is when a large amount of unlabelled data is available, together with a smaller amount of labelled data. 

### Classification or regression?

Within supervised learning there is another division into problems of classification and regression. Classification problems are where you are trying to predict membership of a fixed number of classes - such as "dog" or "cat". By contrast, in regression problems the aim is to predict a continuous variable such as a probability.

To some extent, it is possible to translate between classification and regression. The way this works is by using thresholds to divide a continuous space into a number of "bins", in the same way as histograms. Conversely, you can treat classification as a multivariate logistic regression with one variable for each class.

As a side note, this is a similar idea to the use of activation functions in neural networks - although these are smooth functions instead of a hard threshold.

### Flexibility vs. generality

When choosing an algorithm for a machine learning problem, there is a tension between making few assumptions, thus ensuring maximum flexibility, and being able to generalise from relatively little data. 

An example of a very flexible algorithm which makes few assumptions is k-nearest-neighbours, and especially 1-nearest-neighbours. Here, the predicted value for a point in input space is simply that of the closest sample in the training data. For higher values of k, this is replaced by an average value over the k closest samples. 

This algorithm makes very minimal assumptions about the overall shape of the function. The downside is that it requires very dense training samples to give a good approximation.

An example of an algorithm which makes fairly strong assumptions is linear regression; because it assumes the function is linear, it takes very few samples to be able to make predictions over the whole input space. The downside here is a loss of flexibility. Linearity may be a poor assumption, in which case the model's predictions will be poor.

Gaussian processes span the space between these two extremes. They can be seen as a smoothed, probabilistic version of k-nearest-neighbours, where all samples can influence a prediction to some degree depending on their distance in input space. An important decision in setting up a Gaussian process is deciding on a kernel, which determines how quickly a sample's influence dies away. Choosing a wider kernel can result in behaviour which is closer to linear regression.

### Dimensionality reduction and clustering

As mentioned above, the goal of unsupervised learning is to uncover hidden structure in data. The two main approaches are clustering and dimensionality reduction. Both approaches aim to give a simpler description of the input data, but they do so in different ways.

Clustering tries to describe the input data as a set of distinct groups (clusters). Different algorithms make different sets of assumptions about the form of these clusters: some assume they are roughly spherical, or widely seperated, others can handle clusters with more exotic shapes, which may wrap around or contain each other. The hope is that each cluster can be described by a constant value or simple model, even if the entire training set would require a more complex model.

Dimensionality reduction takes inputs from a high-dimensional space, and tries to describe them using a lower-dimensional coordinate system. In a sense it is like linear regression, which takes 2D input-output samples and models them using a 1D line. 

Again, there are different algorithms which make different kinds of assumptions. Some assume that the new coordinates should be orthogonal to one another, or that they should be uncorrelated over the training data (PCA and ICA). Other techniques, such as autoencoders, don't explicitly make such assumptions.

[article]: http://www.odbms.org/2017/07/machine-learning-in-weather-forecasting/
