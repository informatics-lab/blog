---
author:     Rachel Prudden
layout:     post
title:      "Faster, smoother, set in motion"
date:       2015-05-19
summary:    What we're working on for the front end
categories: ['technical', 'perspiration']
project:    threedvis
thumbnail: https://dl.dropboxusercontent.com/u/2665124/blogimages/cloud_after.jpg

---

Our WebGL based front-end is on the verge of being usable, thanks to a couple of recent improvements.

### Video
At the moment, we're encoding our 3D dataset as a 'tiled' PNG file. This works well for a single timestep, but we'd really like to be able to animate the 3D field and see how the cloud moves over time.

Given that the weather doesn't change all that fast, we'd expect there to be a fair amount of consistency between time frames. If this is true, we can take advantage of it by using time-based compression to cut down the volume of data being pushed to the browser.

Time compression is not a new problem; it comes up all the time in streaming online videos, so video compression already handles it effectively. Luckily for us, WebGL has the capability to read a video into a texture. This means we can use the encodings that already exist to handle time compression for us.

We've tried creating a video from a sequence of tiled PNG files and reading this into a texture. This works well; the 3D field animates in the way you'd expect. For now we're using toy data to mock out the moving clouds, but we're hoping to test it on genuine temporal data soon.

<div style="text-align:center">
	<video height="250" width="250" autoplay="true" loop controls>
		<source src="https://dl.dropboxusercontent.com/u/2665124/volume_rendering_data/cloud_frac2_623_812_70_4096_4096.ogv"/>
	</video>
	<cite><p>The video from which we generate our texture.</p></cite>
</div>

### Removed the ugly mipmapping
One of our major problems has been the presence of strange visual artifacts when running ray-tracing code on any system other than Windows. These take the form of concentric circles when viewed from one direction, and a general haziness otherwise. It's worse than just ugly - these effects make it almost impossible to get any useful information from the data.

We've eventually traced this problem to an issue with the automatic mipmapping done by ThreeJS. Mipmaps are versions of a texture stored at different levels of detail, which you can switch between depending on its distance from the camera. This can make rendering a lot more efficient, and Three kindly handles it all for you by default. Unfortunately, this causes strange effects on MacOS. (There's a bug report open [here](https://www.khronos.org/bugzilla/show_bug.cgi?id=1337) if you're interested.)

This is good news, as it means we can get rid of the bug by disabling mipmapping! The downside is that it slows the rendering down badly. Even so, we are working on some other improvements which we hope will compensate for the loss in performance.

<div style="text-align:center">
	<img src="https://dl.dropboxusercontent.com/u/2665124/blogimages/cloud_before.png" height="250" width="250" alt="Before"/>
	<cite><p>Before</p></cite>
	<img src="https://dl.dropboxusercontent.com/u/2665124/blogimages/cloud_after.jpg" height="250" width="250" alt="After"/>
	<cite><p>After</p></cite>
</div>

### Pre-compiled shadows
Allowing a user to move around a 3D scene is expensive. Since you don't know exactly where they will go, it requires a lot of calculations to be done on-the-fly. This is particularly true when using techniques such as volumetric ray marching, since colouring a single pixel involves combining a number of data samples throughout the volume.

Introducing a light source makes the situation even worse, because it involves combining many values for every *data sample* and not just every pixel. So if a standard ray marching algorithm needs 50 samples per pixel to get a realistic image, introducing a light source will mean performing around
$$50^2 = 2500$$
samples per pixel, per frame!

The good news is, our light source is not movable in the same way as the scene's camera. It actually represents the sun, which means we already know where it needs to be at each point in time.

We're aiming to take advantage of this by pre-computing the amount of light reaching each point, and storing the results in a shading texture. This will save us having to calculate the light values again every frame, at the cost of having to look up two values (cloud amount and shading) instead of just one. This brings us back down to
$$50 \times 2 = 100$$
samples per pixel, a far more reasonable number.

At the moment, we are working on implementing this in WebGL running on the client side. Once this is working, we will probably look for a way to do this processing on the server in advance, so that the client browser will receive the data and shading textures ready-made. Ideally, we would combine both datasets into a single texture, making the client-side requests a little simpler.
