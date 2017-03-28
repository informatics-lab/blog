---
title: Designing MySky
date: 2016-06-07 00:00:00 Z
categories:
- reports
- design
author: Rachel Prudden
layout: post
summary: Combining UX and survey design
project: mysky
thumbnail: https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-07-designing-mysky/thumbnail.jpg
header: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/my-sky-header.jpg
---

A while back, we posted an [introduction][mysky] to the mobile app we've been building. With the project drawing to a close, this post will go a little deeper into how the app was designed, and the choices we made.

## Purpose

When people check the weather forecast, they will most likely be faced with a symbol like these:

<img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-07-designing-mysky/3symbols.png" alt="weather symbols" width="30%" align="middle">

These symbols give a simplified overview of the forecast. There are many different factors which could influence someone's experience of the weather, including the temperature, wind speed, cloud coverage, humidity, chance of rain, visibility and so on. Most of the time, people don't need to see this much detail.

The upshot of this is that a weather symbol represents a lot of information. We wondered: are they being interpreted in the right way?

It's worth considering. A lot of effort goes into improving model accuracy, but this is not what the public sees; if the last stage of the communication process goes wrong somehow, that accuracy has been wasted.

## The idea

To investigate this question, we wanted to gather some information on how people connect weather symbols to what actually happens. We decided to build an app letting people report the weather as they saw it.

If we could build this app and start gathering data, it could be useful in various ways:

__Delivering personalised weather forecasts__
It should be possible to learn a person's preferences, and use present forecasts in accordance with these. If someone consistently reported heavy rain as drizzle, that's what it would report to them.

__Testing out different sets of symbols__
This could be alternative sets of weather symbols, or more esoteric things like colours or [emojis][emoji].

__Feeding information into [WOW][wow] (Weather Observations Website)__
Since it's fundamentally just observation data.

__Using the data for model initialization / verification__
Even though the data will be noisy compared to official observations, it could still carry useful signals. In particular, the data could be used to pick up subgrid-scale patterns for verification (although this would require a very large number of users!) For example, if people in one village report wetter conditions can the forecast predicts, that's good information to have.

## Design

To be useful, the app would have to meet two essential - perhaps competing - criteria. 

* It has to generate meaningful data
* People need to want to use it

The second bullet point will be the subject of a second blog post. For now, let's dive into the first question of gathering data.

## Which icon best represents the weather now?

We kept things as simple as possible, directly asking people to choose a symbol representing the weather. Even so, ensuring the data would be _meaningful_ proved challenging.

The trouble is, all kinds of factors could potentially introduce a bias and distort the results. None of us has much experience in UX design, and there were a lot of things we weren't sure about. 

Would using a background picture of a rainy day make a difference to which symbol they chose? What about different colour palettes - might they make a difference? Are people more likely to choose an icon if it's in a certain part of the screen? 

<img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-07-designing-mysky/all-symbols.png" alt="full symbol collection" width="50%" align="middle">

There was also a less philosophical problem. The original set had 34 symbols in total, and if we tried to fit them all on a phone screen they'd be far too small. But any alternative would seem to introduce a bias: surely people are less likely to choose a symbol if they have to scroll or change page to see it? We did consider trying to use the forecast or a climatology to initialize the app with just the most likely symbols. This was an appealing idea; unfortunately it would have made it difficult to compare different data points. Also, if we want the data to accurately reflect how people experience the weather, making a judgement call about which symbols are "most likely" seems dubious.

Doing full UX testing was out of scope, so we could only try to make sensible choices. We kept the symbols themselves on a plain white background, and the overall design reasonably understated. To fit all the symbols on one screen we left out the ones specifically for night, and the "no data" symbol. (Another option would be to swap between the day and night symbol sets.) To mitigate against bias from the screen position, we randomise the symbol order each time they are loaded.

<img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-07-designing-mysky/main-screen.png" alt="full symbol collection" width="40%" align="middle">

## Collecting data

The app collects the user's location, time of day, choice of symbol and device ID and stores these in a DynamoDB table. The location and time can be used to compare the chosen symbol with the official forecast and observations in that area. The reason for storing a device ID is to be able to learn a user's personal preferences regarding weather symbols, in a way which doesn't involve handling personal data.

## Next steps

We're currently working on getting MySky into the Android store. Watch this space!

<img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-07-designing-mysky/phone.jpg" alt="app on phone" width="50%" align="middle">

[mysky]: http://www.informaticslab.co.uk/report/2016/05/09/mysky-is-coming.html
[emoji]: https://en.wikipedia.org/wiki/Emoji
[wow]: http://wow.metoffice.gov.uk/