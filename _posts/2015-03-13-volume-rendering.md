---
layout:     post
title:      "I've spent all week pretending to be a beam of light"
date:       2015-03-24
summary:    Find out about our first go at volume rendering using WebGL ray tracing.
categories: ['technical', 'perspiration']
author: 	Niall Robinson
project:    threedvis
thumbnail: http://s3-eu-west-1.amazonaws.com/informatics-webimages/rays.jpg

---

####Weeee I'm a light beam...we'll sort of. Read on and you'll see what I mean.

We've been making our first baby steps with our project to do [3D visualisation of weather data in the browser](http://www.informaticslab.co.uk/projects/three-d-vis/). It looks like these two libraries are going to be really important for what we want to do:

* [WebGL](https://www.khronos.org/webgl/), a 3D vis library which allows you to use much of the 3D whizzyness of [OpenGL](https://www.opengl.org/) but in the browser
* and [threejs](http://www.threejs.org) which wraps WebGL, making it easier to set up 3D environments.

They're often used for rendering 3D environments such as you might see in computer games or animations.

###Our data's a bit different

Our weather forecast data is made up of lots of values spread across a regular 3D grid. Imagine a bunch of boxes stacked up - the datasets we are trying to visualise are values of, say, air temperature in each box.

<div style="text-align:center">
	<img src="{{ site.image-bin }}voxels.jpg" alt="the back face of the cube"/>
	<cite><p>The <a href="http://lebarba.com/blog/">Lebarba Blog</a> (who I've nicked these images from!) is a great introduction to volume rendering.</p></cite>
</div>

Fortunately, rendering a continuous block of data like this has been done before, and is known as *volume rendering*. However, there aren't standard libraries for this approach, so it involves writing your own 3D rendering routines which run on the [GPU](http://en.wikipedia.org/wiki/Graphics_processing_unit), using a language called [GLSL](http://en.wikipedia.org/wiki/OpenGL_Shading_Language). These routines sample the data along lots of straight lines starting at the camera, and moving out in all directions. These lines are analogous to rays of light, and this approach is known as *ray tracing* for that reason.

<div style="text-align:center">
	<img src="{{ site.image-bin }}rays.jpg" height="250" width="250" alt="a block with rays cast through it"/>
	<cite><p>Another handy image from <a href=http://lebarba.com/blog/>Lebarba</a> (thanks!). This shows some example rays travelling from the viewer's eye, through the screen and through the grid of data, represented here as the square (although really its a 3D cube). I know that in reality light travels towards the viewer's eye, but, y'know, just go with it.</p></cite>
</div>

###Ray Tracing

This is is where it gets interesting/boring - depending on how into the nitty gritty you are.

Light travels in straight lines (which is lucky - it would be hard to do this it if didn't). We need to figure out what values of data each ray passes through before it gets to a pixel in the screen, and then color the pixel accordingly.

*But, please tell us, how on Earth can we do that?!*, I hear you cry. Fear not! We really just need to know a couple of things:

1. Where a ray enters our volume of data ($f$ on the diagram...I don't know why $f$, I've nicked the picture, but lets just go with it, right?) and
2. Where that ray exits our volume of data ($I$ on the diagram)
3. How many times we want to sample the data field on our journey though the data (this isn't marked on the diagram, but lets call it...um...$n$, yeh $n$.)

If we know this stuff then we can do some [vector maths](http://en.wikipedia.org/wiki/Vector_space) to work out that, to get from one sample point to the next sample point, the ray moves
$$\mathbf{d} = \frac{\mathbf{I} - \mathbf{f}}{n}$$
(by the way, those bold, non-italic symbols mean we're talking about vectors).

A ray starts with an intensity of one and a color of nothing. We begin at the beginning and take steps of $\mathbf{d}$ through the data. At each step we accumulate some colour and loose some intensity based on the data value until the ray reaches the other side of the data.

Prepare yourself, this is my favorite part. The cool thing is, because we are running this on the GPU, we can do this FOR ALL RAYS AT THE SAME TIME!!! \***brain explodes**\*, which is known (rather excellently I think) as *ray marching*.

<div style="text-align:center">
	<img src="{{ site.image-bin }}guard.jpg" height="250" width="250" alt="Ray, marching" />
	<cite><p>This wasn't what Ray signed up for when he joined the Lab.</p></cite>
</div>

###Some Practicalities

This is all very well in principle, but how do we actually do it?

It turns out getting the front position $f$ is relatively straight forward - threejs has set up a variable on the GPU called *position* which is closely related to $f$.

The back position $I$ is a little more complicated, however. It involves rendering the scene twice. The first time we render isn't displayed, but the result is passed in and used in the second time rendering.

We start by rendering the x, y, z coordinate of the back face of our volume as an RBG colour - if you think this isn't an obvious first step, don't worry - you're right, but keep reading and all will become clear.

<div style="text-align:center">
	<img src="{{ site.image-bin }}backface.png" alt="rainbow back face of volume" height="250" width="250"/>
	<cite><p>This rainbowy thing is what you get when you render the back face of the cube using the x,&nbsp;y,&nbsp;z coordinates to set the r,&nbsp;g,&nbsp;b values respectively.</p></cite>
</div>

We then take this rendered rainbow image, and pass it into the next rendering pass. For a given start point, the corresponding end point x, y, z values are the RGB values of this rainbow image indexed at that start point.

That might take a bit of digesting, but what it means is this: combining the two rendering passes means we are using the 3D environment to calculate what the corresponding start and end points are by taking into account the field orientation.

#Sounds good - what can I do??
I thought you'd never ask! I've cobbled together a [proof-of-concept 3D front end](https://github.com/met-office-lab/volume-rendering) which uses synthetic data. Here's some stuff I've been trying.

####What about light sources?
We can make a big improvement to this volume rendering by using light sources to illuminate the field. In short, this means that at every step of the ray march, we need to march a ray from the light source to the current position to see what the contribution is. This should automatically create shading on our object, making the 3D effect much more effective. Here's a nice example using bunnies!

{% youtube VPhnwOpmUqY %}

Unfortunately, I haven't been able to get this kind of thing running with out synthetic data yet. If you're interested, then have a look at ~~this branch~~ (Editor - sorry branch no longer exists).

####How do we transfer data to the GPU?
Ideally we want a 3D data object which you can index using a position in the 3D environment. Unfortunately, WebGL (unlike OpenGL) only supports 2D data objects (called *textures*). This means we have to slice our 3D data array along one dimension, and tile the 2D slices next to each other in a 2D object. We then need a routine on the GPU to index this 2D object using 3D environment positions.

I've managed to get the tile encoding working using png files, which you can see on the [main branch]
(https://github.com/met-office-lab/volume-rendering/tree/master). However, we've got a lot of data to push around, so we need to explore different ways of encoding/decoding the data. If you are interesting in this then you should get in contact with fellow Lab Rat Michael Saunby.

####Hopefully we're going to be making progress with this project over the next few months, so keep checking GitHub to see what the current issues are
