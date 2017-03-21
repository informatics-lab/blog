---
title: From Models to Intelligence
layout: project-overview
author: Rachel Prudden
summary: Weather models contain a wealth of information. How much can be extracted and put to use?
project: machinelearning
completed: false
thumbnail: http://images.informaticslab.co.uk/projects/machinelearning/ensembleimg.png
header: http://images.informaticslab.co.uk/projects/machinelearning/ensembleimg.png
---

_I'll shortly be starting a PhD in applying machine learning to atmospheric science. Here's what I'll be working on. -Rachel_

## Background & long-term goals

Statistician George Box said, “all models are wrong, but some are useful”. This project will use machine learning to spot and extract this useful information. This will allow us to link different computer models together more effectively. It will also allow us to better link these models to the real world so we can predict the things we care about. 

### Connecting models

The real world is complex. To make sense of it, we can use computer models - calculations which represent and predict different parts of the real world.

Each of these models has its own way of describing the world; a language of entities and effects. This language determines what the model can describe, and what is beyond its scope.

What if the thing we would like to predict can’t be described by any single model? By understanding each model's limitations, we can begin to combine them to predict a broader range of effects.

### Learning connections

There are any number of ways we could link models together. How can we be sure of making a good choice? 

If there are lots of past records of the thing we are trying to predict, we can use experiments to guide us. Having chosen some combination of models, we compare the results to the past data and see if gives the right answers. If not, we can tweak the links to make it better.

This process is known as machine learning. "Machine learning" is a name for algorithms which learn from data. If you have a lot of examples of inputs and outputs, a machine learning algorithm can recognize the relationship between them.  

By treating the real-world effect we'd like to predict as a target, we can use machine learning to find useful connections between models.

### Information flow

Another way of looking at these connections between models is as information transmitters. Ideal connections would pass only the important points from one model to the next, and not dilute them with useless detail.

If we view a model's output as "truth", it is clear which parts are relevant. However, in complex models useful details may be spread across the output. A straightforward reading of the output would ignore this hidden information. The objective is to use machine learning to spot these diffuse patterns, and so rescue information that would otherwise be lost.

### Summary

Skillful predictions rely on the efficient transfer of information, from model to model, to final outcome. This project aims to optimize this chain, and make the best possible use of the information available. 

## Project 1: Downscaling model data 

### Downscaling

Downscaling means converting model data into a more detailed local forecast. By taking into account the outcomes of previous model runs, and combining other high resolution data sources, we can get more information about the probable outcome.

<img src="https://images.informaticslab.co.uk/projects/machinelearning/downscalingimg.png" alt="downscaling" width="60%"/>

The target for downscaling a model can be either a high resolution grid, or a point forecast for a specific location. A grid can describe the distribution of forecasts across an entire area, while point forecasts are good for very localised predictions.

<div width="100%">
<img src="https://images.informaticslab.co.uk/projects/machinelearning/grid_downscalingimg.png" alt="grid downscaling" width="60%" align="left"/>
<img src="https://images.informaticslab.co.uk/projects/machinelearning/point_downscalingimg.png" alt="point downscaling" width="35%" align="right"/>
</div>

<br><br><br><br><br><br><br><br><br><br><br>

### Project goals

This first project will investigate the problem of downscaling, paying special attention to 

* making the best possible use of the original model data and,
* combining multiple sources of information

There will be more details in the blog as things move forward, so keep an eye on the links below.


