---
title: How the Met Office makes a forecast
date: 2017-03-02 00:00:00 Z
categories:
- forecast
- work experience
- internship
layout: post
summary: Learning step-by-step how the forecasts are made...
author: Louis Schofield Sinden
project:
thumbnail: https://images.informaticslab.co.uk/articles/2017-03-02-how-we-make-a-forecast/thumb.png 
header: https://images.informaticslab.co.uk/articles/2017-03-02-how-we-make-a-forecast/header.png 
---

## **Introduction** 
You use weather forecasts everyday, but how do you feel about the weather forecasts the Met Office provides? Before my work placement here at the Lab I took them for granted like everyone else (as well as holding the same common criticisms we have for weather forecasters).


### Preconceived Notions
Although we all like to think that weather forecasters are off their rockers when it comes to predicting the weather far in advance, there is obviously a lot more going on behind the scenes than they are letting on.
Which is why it was of primary interest to dissect the process, from the initial survey to the forecast provided on the news.

Now, back to my placement...

Initially I was given the obligatory “new person” tour around the building and began to appreciate the resources put into each stage of the pipeline; as well as the great scale required to efficiently “predict the future” of weather.

### Models… Huge Models
Everything must begin with the observations made across the UK (and the world), this is done in a dozen or more separate ways. The Met Office uses a melange of radars, lasers, thermometers and barometers (etc…) to convey a data-rich “snapshot” of what the weather looks like at this point in time.

*However* this simply provides us with what the weather **currently** looks like, to look into the future we must create models. Which is why our observations are so important, if you start off with an inaccurate view on the current world then you have no hope of figuring out how the weather system will continue to evolve. The model that the Met Office creates of the world is better known as the “[Unified Model](http://www.metoffice.gov.uk/research/modelling-systems/unified-model)”.
Although grossly simplified, In principle the models divide the world into gridlines upon all 3-axis (longitude, latitude, altitude). It’s within each box that you calculate how the system will progress, with data passing over the boundary of a box being passed over to the neighboring boxes . By divvying up the simulation into smaller chunks you increase the efficiency of the model as you are no longer trying to brute force the entire model at once. The models are governed by laws that try their best to represent how real world physics behave before being crunched by the Met Offices own supercomputers, producing a theoretical model of the future.

#### Great! Right? 😃
Well not so fast... by nature the weather is a chaotic system, so each time you run the model it will produce a unique albeit similar outcome. 😧 This isn’t as bad as problem as it might first seem though, as we can run a certain simulation as many times as is practically possible and compare outcomes across each iteration. If several iterations come up with a related response then it indicates that that result is more likely to come true in real life.
Models that try and simulate the environment have an insane level of complexity and can always be made more accurate. A classic analogy would be whether to measure the coastline of the UK with a meter rule stick or a mile rule stick, each answer is “correct” but each are non-trivially different. Also a **typical** simulation can only realistically go 7 days (168hrs) before the accuracy of results deteriorates rapidly; this is because you have to begin to take into consideration “long term” changes in the climate such as ocean temperature and currents. Even the albedo of the ground and how much the surface reflects sunlight can have subtle changes that compound over a larger time scale.

Even then the Met Office must collaborate globally through whats known as the *WMO ([World Meteorological Organisation](http://www.wmo.int/pages/index_en.html))* if it is to provide an accurate “image” of what is to come - As no organisation has a perfect weather model the Met Office has access to multiple different global models to ensure that all bases are covered. Therefore events happening on the other side of the globe that have an impact on more local weather 24 hours down the line can be properly accounted for in future forecasts.

![Met Office Postage Stamp Plot](https://images.informaticslab.co.uk/articles/2017-03-02-how-we-make-a-forecast/ensemble.png)

### Presenting the Impossible
However no number of observations and models will make them any easier for the general public to understand, therefore a lot of effort goes into turning the raw data into something more accessible. Thankfully the Met Office has several tools to produce the more familiar forecast. The main one, and the one used to produce the forecasts you see on the news, is [VisualCortex](http://www.metoffice.gov.uk/services/media/graphics). Which - depending on the tv channel - operational meteorologists can construct the scene by overlaying different types of information, such as wind speed and pressure. 
Each tv channel that the Met Office serves will each have their own requirements for the weather sequences shown, such as the specific graphics used for land masses or cloud-cover. This gives each tv channel the brand that their consumers are used to. Decisions such as how much technical information and jargon is used is critical to ensuring that the essential information can be conveyed without alienating the general public.

![Visual Cortex Example](https://images.informaticslab.co.uk/articles/2017-03-02-how-we-make-a-forecast/visual-cortex.png)

### “With all this tech, why do they frequently get the forecasts wrong?”
Well, this is because the forecast is only as accurate as the observations, models and the way in which it is represented. If just one of these components is off kilter then it limits the overall accuracy of the forecasts that can be made. If the observations are off then you have no hope trying to model what is to come next and no amount of post-processing will fix the result.
The question itself “why do they get so many forecasts wrong” is flawed as forecasts up to 7 days in advance are [surprisingly accurate](http://www.metoffice.gov.uk/about-us/who/accuracy/forecasts). All models are run several times, allowing each outcome to be validated against the others, so if a common theme stands out then a forecast can be made with more confidence. 

In the end any prediction made is simply a probability, whether it rains on your washing is simply down to luck.


### What I’ve learnt from my time at the Met Office
My week at the Met Office has really put into perspective what is needed to put together a weather forecast. Weather systems **for the entire globe** literally have modelled and analysed before any conclusions can be made, which is often easier said than done. What surprised me however were the services the Met Office provides to other industries, the data that they produce is transferrable enough it can be useful to the emergency Services, and even airlines.
By learning about the processes involved it, and the science/technology behind it all, it has allowed me to be a little less critical of the way I look at forecasts. 🐙
