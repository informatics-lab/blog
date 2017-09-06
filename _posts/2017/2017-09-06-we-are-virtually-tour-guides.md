---
title: We are virtually tour guides!
date: 2017-09-06 00:00:00 Z
categories:
- internship
- vr
- hpc
layout: post
summary: Our summer adventures in virtual reality and the Lab
author: Aleksandra Zaforemska
project: None
thumbnail:
header:
---
## Introduction

Hi! We are [Ruth](http://www.informaticslab.co.uk/profiles/ruth-price.html) and [Aleks](http://www.informaticslab.co.uk/profiles/aleks-zaforemska.html), this year's Informatics Lab summer interns. Ruth is a Physics student and Aleks has just graduated with a degree in Geography - so as you can tell, we did not have much to do with informatics before joining the lab, but we are both enthusiastic about technology and eager to learn. We have been given an amazing opportunity to develop our skills as programmers through a project on virtual reality.

## Project

The Met Office has just finished the installation of a new [Cray XC40 supercomputer](http://www.metoffice.gov.uk/research/technology/supercomputer). The expansion has made the Met Office one of the world leaders in High Performance Computing (HPC), so we would like to show it off. The problem is, the hardware has to be stored in secure environment, so it is difficult for people to gain access and look around. The view is usually limited to a narrow window in the door. That's where we come in! We were asked to create a virtual reality tour of the IT halls.

## How did we make it happen?

At the beginning we only had a 360 camera and a very vague idea of what exactly virtual reality is, so a lot of googling had to be done. The camera we were working with was Ricoh Theta S, which uses two fisheye lenses to create a 360 image. Looking at the resulting picture makes you feel like you are inside the scene. It took us a fair amount of time to work out how the camera works (top tip: remember to stay out of the picture).

We took a few pictures around the Met Office to have some material to work on while we were testing out various WebVR technologies. The first one we tried was [A-Frame](https://aframe.io). It is a framework developed by Mozilla, for creating virtual reality experiences within the web. Because it is based on HTML, it is easy to write and understand. After a few weeks of messing around with A-Frame, we discovered [React VR](https://facebook.github.io/react-vr/), which is based on ReactJS - the framework behind apps such as Facebook and Instagram. In the end, we decided to use React VR - we preferred the JavaScript approach of React, instead of the HTML approach of A-Frame.

As well as programming, we had to make use of our people skills. We needed input from members of staff across the Met Office to produce high quality photographic and audio content for the tour. This meant cooperating with people who were skilled in photography, as well as people who could give us information about the supercomputer to put in our tour. Luckily, the Met Office is full of talented people, but unfortunately they are also very busy, so it took a lot of careful planning and communication to get stuff done.

You can see the results in the project's repository on [Github](https://github.com/met-office-lab/mo-VR-tour)!

## To sum it all up, we...

* learned a lot, very fast
* experienced a multidisciplinary environment that cultivates creativity and innovation
* had a unique opportunity to be the pioneers in the Met Office's new Collaboration Building
* had plenty of great conversations with both humans and robots (we love you, [Labby](http://informaticslab.co.uk/projects/labby.html))
