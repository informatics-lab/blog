---
author:     Niall Robinson
layout:     post
title:      "Project One: A Retrospective"
date:       2015-11-27
summary:    "Find out what we've learnt in our first project"
categories: ['technical']
project:    threedvis
thumbnail: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/exampledata_sm.png"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/matrix-356024_1280.jpg"
---

In the Informatics Lab, we're wrapping up our first ever project: real time 3D animated web visualisations of Met Office weather forecasts. We though now would be a good time to quickly look back on what we've done, and perhaps more importantly, what we've learned. This will just be a whistle stop tour, but we'll try and link back to previous posts as we go, so you can read in more depth if you want to.

The Lab was set up with the expressed aim of finding new ways of "making data useful". We wanted to start the Lab by tacking a fundamental issue: how should we deal with big, multidimensional datasets?

## How can we interact with this data?
We are lucky at the Met Office - we have some beautiful data. Unfortunately, it can be easy to forget this. Normally we spend a lot of our lives looking at our data as static 2D maps, or points on a line. We found out that it is possible to give people access to 3D animations of our data. Moreover, we've shown you can do this on demand, with a run-of-the-mill laptop and without downloading loads of data. Being able to fly through the data gives you a new perspective. We've had great fun seeing things that were invisible before become real, from the slope of weather fronts to fog dispersing.

We explored some really natural ways of letting people explore this data using mobile devices. For instance, by using the motion sensor that is present in most modern tablets and phones, people can swoop and soar through the air with the greatest of ease! You just need to turn around to see behind you, look up to see what's above you - it couldn't be easier. We took this one step further by converting peoples mobile phones into virtual reality glasses. Its been endlessly entertaining seeing how much people have enjoyed being immersed in the virtual world we create every day in the Met Office forecasts.

We tired made a big point of keeping the end user in mind all the time. We did a lot of testing with (unsuspecting) members of the public at Exeter's Royal Albert Memorial Museum (thanks RAMM!). Their feedback really helped to make the user experience more natural and intuitive. 

## What did we have to do to make all that happen?
We wanted to try working on the whole project, from getting the information off the Met Office supercomputer to getting it into your brain. We set ourselves a real challenge from the start: on order to make this accessible this had to run in a web browser on a normal computer.

### Head in the clouds: we love AWS
We needed to get the data from the secure Met Office network to somewhere we could store and process this data. We started using Amazon Web Services and their amazing cloud computers (not to be confused with actual clouds, as I do almost daily). This has let us develop things really quickly and flexibly by allowing us to start, stop, and scrap virtual machines which are all administered by Amazon.

### Bits and pieces: we love Docker
Once the data was on our Amazon machine, we needed to turn it into something we could look at. All this processing made extensive use of a technology called Docker. In a nutshell (or...Docker container??) this lets you wrap up your code up with all the things it relies on. You then have a portable nugget that you can move, start, and stop easily and reliably. This means all the processing we've written is in nice modular pieces.

### MASSIVE DATA...in a tiny space
We also needed to all this data to the web browser somehow. We ended up encoding out data as a video. To be clear, we didn't store the visualization in a video and transmit this. We stored each data point as a pixel in a video. This allowed us to take advantage of the amazing compression algorithms that let you stream YouTube, Netflix etc. And as web browsers are used to videos, it also made getting the data into our web page much easier. We don't think this has been done before, and without this leap, Met Office data in a browser probably wouldn't have been possible.

### Our virtual world
We then had to create a virtual word in a web page. We did this using a code libraries called Three.js and WebGL. These allowed us to create an 3D world and comes prepacked with things like cameras, light sources, and controllers. However what it didn't come with was a way to render our data. We ended up writing a lot of graphics card routines from scratch (taking inspiration from others online). These routines do the calculations of how light moves through the data field, calculating shadows, and bright patches, and rendering data as clouds.

This kind of stuff hasn't been possible in web browsers until pretty recently, and we think we are some of the first people to do animated 3D rendered fields like this.

### A Shared Perspective
Finally, we wanted to synchronize the views between different devices. Applications like Skype do this by sharing image you see on the screen between devices. However, we settled on a slightly different approach. we rendered the 3D environment separately in each device, but just shared the camera position and direction (which is just defined by seven numbers). This has allowed us to effectively synchronize views across slow internet connections.

## What else have you learned?
In addition to all this, some of the most interesting stuff we've worked on is improving the way we work. We've mixed scientists, software engineers and designers in a close knit team. We've had great success with paired programming, that is, two people sharing one computer. In our experience, this leads to more productivity than two people working separately: it minimizes "rabbit-hole" approaches, and many of our best ideas are the combination of two heads. Furthermore, by regularly changing the pairs, it spreads our knowledge and experience across all team members.

We have also found that innovation comes from gaining a holistic understanding of the problem at hand. We invested time discussing what we were trying to achieve, talking to people who are going to use our prototypes, and designing on paper, before and whilst we were developing the code.

## Where should this go next?
One of the main aims of the work the Lab does is as a pathfinder for new techniques and ideas. 

* We see Docker being a really important tool across many parts of the Met Office. We've started helping people roll it out for deploying software in other parts of the Met Office. We can 

* The video compression approach has proven to be a very effective way of transmitting large volumes of spatiotemporal data. We are speaking to other departments in the Met Office about where it could be used. For instance, it could be a useful way of transmitting data to mobile devices that pilots use for pre-take off checks, or from transmitting very large data-sets to remote data bases. We're also currently writing up this approach as a peer reviewed paper.