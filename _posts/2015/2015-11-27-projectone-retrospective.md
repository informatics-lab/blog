---
title: 'Project One: A Retrospective'
date: 2015-11-27 00:00:00 Z
categories:
- technical
author: Niall Robinson
layout: post
summary: Find out what we've learnt in our first project
project: threedvis
thumbnail: https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/exampledata_sm.png
header: https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/matrix-356024_1280.jpg
---

In the Informatics Lab, we're wrapping up our first ever project: [real time 3D animated web visualisations of Met Office weather forecasts](http://www.informaticslab.co.uk/projects/three-d-vis.html). We thought now would be a good time to take a quick look back on what we've done, and perhaps more importantly, what we've learned. This will just be a whistle stop tour, but we'll try and link back to previous posts as we go, so you can read in more depth if you want to. You can get a quick idea from this video:

<iframe width="427" height="240" src="https://www.youtube.com/embed/pzvk1ZNMvFY" frameborder="0" allowfullscreen></iframe>

The Lab was set up with the expressed aim of finding new ways to make data useful. We wanted to start by tackling a fundamental issue: how should we deal with big, multidimensional datasets?

## How can we interact with this data?
We've successfully demonstrated [an approach](http://demo.3dvis.informaticslab.co.uk/ng-3d-vis/apps/redirect/) for giving people access to 3D animations of our data, on demand, with a run-of-the-mill laptop and without downloading loads of data. Being able to fly through the data gives you a new perspective. We've had great fun seeing things that were invisible before become real, from the slope of weather fronts, to the eye of a storm, to fog shrouding the UK.

We explored ways of letting people [intuitively explore](http://demo.3dvis.informaticslab.co.uk/ipad-fly/) this data using mobile devices. For instance, by using the motion sensor that is present in most modern tablets and phones, we've let people swoop and soar through the atmosphere. You just need to turn around to see behind you, look up to see what's above you - it couldn't be easier. We took this one step further by converting peoples mobile phones into [virtual reality glasses](http://demo.3dvis.informaticslab.co.uk/google-cardboard/). Its been endlessly entertaining seeing how much people have enjoyed being immersed in the virtual world that is created every day in the Met Office forecasts.

We tried to made a point of keeping the end user in mind all the time. We did a lot of testing with members of the public at Exeter's Royal Albert Memorial Museum (thanks RAMM!). Their feedback really helped to make the user experience more natural and intuitive. 

## What did we have to do to make all that happen?
We wanted the Lab to try working on the whole project, following the information from the supercomputer all the way to your brain. We set ourselves the challenge of making this all happen on a normal laptop via a website, to allow as many people to access it as possible.

### Head in the clouds: Lab &hearts; Amazon Web Services
We needed to get the data from the secure Met Office network to somewhere we could store and process it. We started using Amazon Web Services and their amazing cloud computers (not to be confused with actual clouds, as I do almost daily). This has let us develop things really quickly and flexibly by allowing us to start, stop, and scrap virtual machines which are all administered by Amazon.

### Bits and pieces: Lab &hearts; Docker
Once the data was on our Amazon machine, we needed to turn it into something we could look at. All this processing made extensive use of a technology called [Docker](http://www.informaticslab.co.uk/lab-school/2015/06/24/lab-school-docker.html). In a nutshell (or...Docker container??) this lets you wrap up your code up with all the things it relies on. You then have a portable nugget that you can move, start, and stop easily and reliably. This means all the processing we've written is in nice modular pieces.

<h3>MASSIVE DATA...<small>in a tiny space</small></h3>

We somehow needed to get all this data to the web browser. We ended up encoding our [data as a video](http://www.informaticslab.co.uk/technical/2015/10/05/data-encoding.html). To be clear, we didn't store the visualization in a video and transmit this. We stored each data point as a pixel in a video. This allowed us to take advantage of the amazing compression algorithms that let you stream YouTube, Netflix etc. And as web browsers are used to videos, it also made getting the data into our web page much easier. We don't think this has been done before, and without this leap, 3D Met Office data in a browser probably wouldn't have been possible.

### Our virtual world
We then had to create a virtual word in a web page. We used the [WebGL](https://get.webgl.org/) library to create our 3D world and associated things like cameras, light sources, and controllers. However it didn't come with a way to render our data. We ended up writing a lot of graphics card routines from scratch (taking inspiration from others on-line). These routines paint the data as clouds by calculating how light moves through the data field and rendering shadows and bright patches.

This kind of stuff hasn't been possible in web browsers until pretty recently, and we think we are some of the first people to do animated 3D rendered fields like this.

### A Shared Perspective
Finally, we wanted to synchronize the views between different devices. Applications like Skype do this by sharing image you see on the screen between devices. However, we settled on a slightly different approach. we rendered the 3D environment separately in each device, but just shared the camera position and direction (which is just defined by seven numbers). Because we have to send far less data, this has allowed us to synchronize views across slow internet connections.

## What else have you learned?
In addition to all this, some of the most interesting stuff we've worked on is improving the way we work. We've mixed scientists, software engineers and designers in a close knit team. We've had great success with paired programming, that is, two people sharing one computer. In our experience, this leads to more productivity than two people working separately: it minimizes "rabbit-hole" approaches, and many of our best ideas are the combination of two heads. Furthermore, by regularly changing the pairs, it spreads our knowledge and experience across all team members.

We have also found that innovation comes from gaining a holistic understanding of the problem at hand. We invested time discussing what we were trying to achieve, talking to people who are going to use our prototypes, and designing on paper, before and whilst we were developing the code.

## Where should this go next?
We have 101 more ideas for our 3D website: falling rain; a library of stock events; curated pop up information; superimposing on the camera feed for augmented reality...Alas, we need to park it for the time being and move onto a new project. However, one of the main aims of the work the Lab does is as a pathfinder for new techniques and ideas. Below are some of our "conclusions":

* We think Docker could be a really important tool across many parts of the Met Office. We've already started to help roll it out in other parts of the Met Office so people can use it to deploy software. We can also see Docker less orthodox uses for Docker in the future. For instance, it could be a good way to allow scientists to more easily use niche analysis software in a controlled environment. It would also allow these environments to be lifted and shifted to remote analysis platforms (e.g. JASMIN/SPICE), which seem set to become increasingly important.

* The video compression approach has proven to be a very effective way of transmitting large volumes of spatiotemporal data. We are working with other departments in the Met Office to apply it to more problems. For instance, it could be a useful way of transmitting data to mobile devices that pilots use for pre-take off checks, or for transmitting very large data-sets to remote data bases. We're also currently writing up this approach as a peer reviewed paper.

* We've pushed what has been done previously with 3D rendering in the browser. Browser technology looks set to be important in the future, and not just for public reach. "Science in the browser", where scientists interact with and analyse data via a web browser, is currently gaining popularity. We can see a time relatively soon where scientists will be able to interrogate a massive data set (hosted and analysed in the cloud) and then visualise the out come in interactive 3D - all via the browser. 