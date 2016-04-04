---
layout:     post
title:      "Lego Mindstorms Lab-Bot"
date:       2015-12-23
summary:    A fun project introducing key concepts of science, technology and design.
categories: ['technical','inspiration']
author: 	Tom Powell
project:    mindstorms
thumbnail:  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-12-23-lego-mindstorms/ms-labbot.JPG"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-12-23-lego-mindstorms/ms-header.JPG"
---

# Introduction

The Lab has been looking for a suitably interesting 'starter project' for newcomers in order to let them 
learn and utilise some of the key skills and concepts that make the Lab what it is.

The team discussed the various aspects of the project and decided it needed to cut across design, technology and science.
Each element should be customisable dependent on a persons skills or interests, and it must enable people to achieve 
something tangible during their time in the Lab. Most of all the project must be 'cool', people must enjoy and have an
interest in what they are doing.

The [Lego Mindstorms][Lego Mindstorms] series of kits contain software and hardware to create customisable, programmable
robots. They include an intelligent brick computer that controls the system, a set of modular sensors and motors, 
and Lego parts from the Technic line to create the mechanical systems. 

Michael being the hoarder that he is, just happens to have a couple of these kits stashed away in a dark corner 
of the Lab, complete with a [Dexter Industries BrickPi][DI]. The BrickPi allows us to replace the default Mindstorms brick 
computer with a [Raspberry Pi][Raspberry Pi], thus allowing us to add additional peripherals to the system and program 
the robot using python.

We decided initially we would get the robot to move around on a table avoiding falling off the edges using some kind of
distance detection. This simple functionality could then be extended and altered to allow the robot to perform more complex
tasks. The design of the robot is completely customisable and can be tailored to the task as required. 

For what is essentially a child's toy the initial setup and configuration of the specific components we had was actually 
quite involved so I'm going to give this short tutorial on how to get everything to play nicely together.


### Download and Install OS 

Firstly we followed [this tutorial][DI OS] to get the image for the Raspberry Pi Operating System.
The default credentials to log into the system via ssh are username: pi password: robots1234
The image comes complete with a VNC server on it which must be started from the command line using $ tightvncserver
You may then open a basic VNC client connection to the pi by using $ open vnc://pi@<YOUR RASPBERRY PI IP ADDRESS>:5901
We can then use the 'IR Receiver Setup' desktop application to disable the IR Receiver on the Pi. 


### Flashing the BrickPi firmware

To use the Lego Mindstorm EV3 sensors with the BrickPi you must first flash the firmware of the BrickPi.
This step is relatively tricky and took us a while to complete successfully. For this you will need an [Arduino][Arduino].
We followed [this tutorial][BrickPi Flashing] which was fairly comprehensive but found some of the steps didn't work 
correctly for us! Also we didn't actually have a 'programmer cable' so instead replaced this with 4 jumper cables.
You will see from the guide it says to cut the second wire of the programmer cable - after multiple attempts we actually 
discovered the fifth wire is also unnecessary hence why 4 jumper cables was sufficient to carry out the flashing.
Also some of the directory structures within our OS were different which made some of the early moving of files operations
irrelevant. Take a look at the pictures below which should help you to know which pins to connect to which.

![arduino pins](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-12-23-lego-mindstorms/ms-arduino.JPG)
![brickpi pins](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-12-23-lego-mindstorms/ms-brickpi-ports.jpg)
<cite>Original image courtesy of [learn.sparkfun.com](https://learn.sparkfun.com/tutorials/getting-started-with-the-brickpi)</cite>

### Gotchas
We found that occasionally the OS would get corrupted - re-flashing the SD card with the original image seemed to solve this.
We also realised that sensors on the BrickPi only work under certain power configurations - see the images below for 
more detail on that.

![brickpi power1](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-12-23-lego-mindstorms/ms-power1.jpg)
<cite>Image courtesy of [dexterindustries.com](http://www.dexterindustries.com)</cite>
![brickpi power2](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-12-23-lego-mindstorms/ms-power2.jpg)
<cite>Image courtesy of [dexterindustries.com](http://www.dexterindustries.com)</cite>

### Let the fun begin

Once these steps are done you can start programming the robot to perform your given task.
Stay tuned to see what our guests come up with...

![lab bot](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-12-23-lego-mindstorms/ms-labbot.JPG)


[Arduino]: https://www.arduino.cc/
[Lego Mindstorms]: http://www.lego.com/en-us/mindstorms/?domainredir=mindstorms.lego.com
[Raspberry Pi]: https://www.raspberrypi.org/
[DI]: http://www.dexterindustries.com/brickpi/
[DI OS]: http://www.dexterindustries.com/howto/install-raspbian-for-robots-image-on-an-sd-card/
[BrickPi Flashing]: https://docs.google.com/document/d/1QxCeXnmkck9r99hzdpAR_CLuKhQ2-f6hLseoA4FNK7M/edit