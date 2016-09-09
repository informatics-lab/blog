---
title: Augmented Reality Sandpit
date: 2016-09-02 00:00:00 Z
categories:
- Technology
layout: post
summary: AR sandpit Engagement tool development
author: Mike
project: AR Sandpit
thumbnail: https://images.informaticslab.co.uk/articles/2016-09-02_ar_sandpit/Screen+Shot+2016-09-07+at+14.33.03.png
header: https://images.informaticslab.co.uk/articles/2016-09-02_ar_sandpit/Screen+Shot+2016-09-07+at+14.33.03.png
---

### What is the  Augmented Reality sandpit?

The Augmented Reality (AR) sandpit first appeared around 2014-ish developed at [UC Davis](http://idav.ucdavis.edu/~okreylos/ResDev/SARndbox/) as a means of more effectively communicating aspects of geophysical science as well as pushing the envelope in terms of visualisation technology.

If you haven't come across this before, the AR sandpit builds upon the more traditional idea of a sandpit with a few more high-tech bells and whistles attached.

#### *How it works*

* *The height of the sand is recorded by an Xbox Kinect (i.e. a depth camera) and projected back down onto the sands surface using an ordinary projector.*

* *The projected image is altered depending on the depth measured by the Kinect e.g. colour representing the height of the terrain.*

* *The Kinect and projector are constantly recording and projecting back onto the sand so any changes made to the surface are captured and updated in realtime.*

The instant feedback makes for a really fun, interactive way to explore geographical features and phenomena like mountains, coasts, rivers, channel formation, flooding, flood planes.. maybe even things like urban planning and climate change adaptation if you're feeling inspired.

### DIY

Our AR sandpit is a home-made, DIY version with playful STEM engagement at its heart rather than any sort of formal teaching.

![DIY sandpit](https://images.informaticslab.co.uk/articles/2016-09-02_ar_sandpit/Sand%20pit%20.jpg "DIY sandpit")

At 40cm x 50cm our sandpit is housed in a travel suitcase for maximum portability with a recycled lamp stand as a projection mount.

The idea is this apparatus is accessible to everyone and gives as many people a chance to explore and think about our environment as much as possible.

### Unity

The depth data collected by the Kinect is run through the Unity game engine (behind the indescribably popular game Pokemon GO) controlled by C# scripts to generate a virtual environment that can be projected back onto the sand surface.

The depth data is used by Unity to generate a material that is then skinned onto a surface upon which different textures can be placed.

The texture is controlled on the GPU by shaders (essentially GPU programmes) written in HLSL and are used to change the colour/lighting/display of the projection.


![channels](https://images.informaticslab.co.uk/articles/2016-09-02_ar_sandpit/Screen+Shot+2016-09-07+at+14.33.03.png "channels")


The online Unity community is huge and, as the environment is a massive aspect of computer games programming, there are loads ideas to draw on with something like this - we had a go at playing about with water textures [like this](http://forum.unity3d.com/threads/riverwater-the-free-epic-water-solution-for-unity-free-users.235860/).

### Whistles and Bells

This project has as many legs as a centipede. We added a slider to control the simulated water level to see what the UK would look like if the ice caps melted or another ice age revealed hidden land from beneath the seas.

The UCDavis AR sand *box* makes full use of the Kinects gesture recognition software allowing the user to wave a hand and drop simulated water onto the projected surface, using the physically real topography of the sand to channel the simulated water.

Unfortunately the libfreenect C# library we used for interacting with the Kinect doesn't have any in built gesture recognition, so we would have to write these ourselves.. which could be something that happens in the future.

{% youtube 9qcvXsKrJro %}

Throughout development ideas have been thrown around like:-
* Introducing simulated wind and snow to add or remove 'material' onto the surface.
* A steady state water flow model where the user has to supply just the right amount of rain to keep the ecosystem from flooding or drying out.
* Adding man made structures to investigate how they interact with the terrain you have created.
* Change environmental factors like light levels and moisture to see at what heights simulated organisms like to grow.

### What did we learn?

This project has introduced me to so many new concepts, techniques and paradigms it makes me dizzy thinking about it.

+ Before this project, I had never programmed in C# or HLSL; didn't know what a byte array was and therefore neither, bit shifting, bit masking nor what big/little endian was. Also now I might finally understand hex colours.
+ I had never used a game engine before or programmed a shader on the GPU.
+ I was introduced to the very smart idea of 'smuggling' data in colour objects.
+ I have expanded my brain thinking about multiple spaces at the same time (are you in model space or view space?).
+ Most outrageously, I had never even played with a Kinect before let alone used one as an environmental sensor, which is arguably the coolest aspect of this entire project.

Big thanks to Tom for his knowledge, patience and teaching skills.


![thanks guys!](https://images.informaticslab.co.uk/articles/2016-09-02_ar_sandpit/Screen+Shot+2016-09-08+at+09.31.57.png)

**Key tech used:**
+ Xbox Kinect
+ Unity
+ C#
+ HLSL
+ Duct tape
+ String
