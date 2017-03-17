---
title: '3D weather: an update'
date: 2015-07-16 00:00:00 Z
categories:
- technical
- perspiration
author: Niall Robinson
layout: post
summary: We've hit the half-way stage in our first project, so we thought we'd show
  you how far we've got.
project: threedvis
thumbnail: https://images.informaticslab.co.uk/dropbox_port/icon.png
header: https://images.informaticslab.co.uk/dropbox_port/banner.png
---

The Lab is now three months old! We're half way through our first project, which is to create a [3D visualisation of our weather fields](/projects/three-d-vis.html), so we though it might be time to take stock and tell you where we're up to.

First off, we'd love for you to take a look at our new demos: we've got three different demonstration applications. We have tried to link them together to give a feel for what the end user experience might be like.

The new apps
------------
The [first app](http://julydemo.3dvis.informaticslab.co.uk/volume-rendering/viewer.html) is the latest version of our [volume rendered weather fields](/technical/perspiration/2015/03/24/volume-rendering.html). This is the most processing intensive of our demos, so it may run fairly slowly on your computer, and probably not at all on a tablet or phone ([let us know](/#contact) if it does!).

![This is a screengrab from our new app](https://images.informaticslab.co.uk/dropbox_port/july-demos/icon.png)

You can then reach the [second app](http://julydemo.3dvis.informaticslab.co.uk/uk-weather-3d/view3d/) by clicking the layers icon in the top left corner. This approach renders the 3D field by displaying all the layers as 2D slices sitting on top of each other. While this approach doesn't give as nice an effect as the first app, we have been experimenting with it to see if we could "cheat" and get a similar effect which was less processing intensive.

If you have access to a tablet, you should use it to visit our [third app](http://julydemo.3dvis.informaticslab.co.uk/ipad-fly/). You'll probably want to stand up for the next bit (just humor me - it'll be worth getting out your seat, I promise). Once it's loaded, you should be able to press the buttons on each side to swoop and fly through the weather! Remember - look where you want to go (e.g. if you want to go up you need to hold it above your head; if you want to go the other direction, turn around 180 degrees). If you also visit this page on a computer, you can sync your screens by clicking the computer icon on the tablet and entering the four digit code on the computer display!


What we've done
---------------
Here's a quick run down on some (but not all) of the things that we've developed for these apps lately.

### Animated data
We have decided to store and transfer our data as a video. To be clear, we aren't making a video of the animation and sending it to the browser - each data point is encoded as a pixel in the video, and then the data from this video are rendered on the device to create the 3D visualisation. This approach has lots of advantages: we can use [codecs][codecs] that have been intensively developed over the last few years for services like Netflix and YouTube; and we can also take advantage of browsers' support for streaming data, meaning that we can display the data without having to download it all first. However, the more astute amongst you may have noticed that videos are 2D and our data is 3D. To get round this, we have tiled slices of our 3D data. This means that we lose some compressibility across altitude - it will be really interesting to see if truly 3D [codecs][codecs] become more commonplace in the future. You can see an example of some video encoded data [here](http://ec2-52-16-246-202.eu-west-1.compute.amazonaws.com:9000/molab-3dwx-ds/media/5589758be4b0b14cba172762/data).

### Data in the cloud
The actual visualisations are just the tip of the ice-berg. We've put a lot of work into the preparation of the data lately: we are designing a service that pulls data from the Met Office super computer, all the way into the cloud ([not a literal cloud](https://en.wikipedia.org/wiki/Cloud_computing): a *cumulo nexus*?, *webservice stratus*? if you will) where the web page front end can go and find it. There are many different components:

1. The first part selects the data we want from the supercomputer and transfers it to our cloud.
2. The data is then processed a bit: for instance, we reorganise the data so that it's in terms of height above sea level.
3. Then the data gets tiled, and converted into an image, before getting stitched together to create a video.

All these components are written, and we are currently working hard to make them play nicely together. We are now providing our demonstration data to the apps from our cloud (rather than an ad hoc Dropbox link). This means **the apps should now work in browsers other than Chrome**, although we haven't tested this exhaustively (I'm looking at you Internet Explorer users).

### Aspect Ratio
To make the arithmetic easier, we started off by doing the volume rendering in a perfect cube, even though the data isn't in a cubic volume (the UK is, say 1000 miles by 500 miles, and the atmosphere is (only) about 7 miles thick - definitely not a cube!). We've now updated the volume so that the latitude to longitude ratio is correct, and we can scale the altitude to a height that looks nice.

### Fly through controls
We are particularly pleased with the flying controls on the iPad. Its been great seeing how much people have enjoyed it, from the kind guests at Exeter's [RAMM](http://www.rammuseum.org.uk/), to some of the folks in charge at the Met Office.

<div style="width: 50%; height: 50%;">
<blockquote class="twitter-video" lang="en" style="width: 50%"><p lang="en" dir="ltr">Me, having a first go on some great new weather viz technology from <a href="https://twitter.com/niallhrobinson">@niallhrobinson</a> in the <a href="https://twitter.com/metoffice">@metoffice</a> informatics lab <a href="http://t.co/uTutDxAtGz">pic.twitter.com/uTutDxAtGz</a></p>&mdash; Doug McNeall (@dougmcneall) <a href="https://twitter.com/dougmcneall/status/606078707296518144">June 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

### iPad syncing
We got a cloud service which helps to pair the iPad to a computer using [web sockets](https://en.wikipedia.org/wiki/WebSocket). One of the features of this that we like is that it doesn't sync the image on the screens, it just transmits the camera position. This has the advantage that it works nicely over really low bandwidth - something that could be really useful to our forecasters in remote locations such as the Falklands. 

[codecs]: https://en.wikipedia.org/wiki/Codec
