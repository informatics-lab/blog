---
author:     Niall Robinson
layout:     post
title:      "Bending video codecs to our will"
date:       2015-10-05
summary:    "We use video codecs to efficiently encode our 3D +time data"
categories: ['technical']
project:    threedvis
thumbnail: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/exampledata_sm.png"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/matrix-356024_1280.jpg"
---

We've spent quite a bit of time figuring out how to get our atmospheric data from our servers to your computer where it can be rendered and displayed in our [3D visualisation web application](http://demo.3dvis.informaticslab.co.uk/ng-3d-vis/apps/desktop/). When the forecast is run on our supercomputer, it stores the output in a series of files, with each different forecast quantity (e.g. cloud amount) amounting to about 5GB. These files are great for analysis, but they aren't really suitable for visualising in the browser.

We want to encode this data is such a way as:

1. We can easily get it into a web browser
1. We can animate it
1. It can be transferred to to the graphics card for rendering
1. The file size is smaller

We found that encoding the data as a video covered all these bases, and this approach has been instrumental in allowing us to successfully do 3D visualisation in the browser. In a nut-shell we encode our 3D latitude x longitude x altitude x time data arrays into a video of tiled latitude x longitude slices. We've talked about this [previously](http://www.informaticslab.co.uk/technical/perspiration/2015/07/16/lab-july-demos.html), but we thought we'd go into a bit more detail about how and why we've encoded the data like this.

{% youtube FKv_1zTcjB8 %}

# Streaming to the web browser
One major advantage of using video codecs is that web browsers are already set-up to deal with them. For instance, we stream our data to the browser using an HTML5 canvas. This has a couple of advantages. Firstly, it means we don't have to have all the data in browser memory at once, so the animation can start playing as soon as it has buffered enough data. Secondly, it gives us access to the HTML5 video interface, which lets us control starting, stopping, and skipping the video.

# Getting the data to the graphics card

### Welcome to Flatland
Ironically, [WebGL](https://en.wikipedia.org/wiki/WebGL) data exists in [Flatland](https://en.wikipedia.org/wiki/Flatland). WebGL is the 3D visulisation library that we use to render the data array in a 3D environment. It is set-up to use data in the form of 2D images. Traditionally, these images, or "textures" are skinned on top of 3D models to give them...well, apparent texture. As a result, WebGL currently only accepts 2D data structures, ideally in the form of an image. We hacked this data route to allow us to get 3D data fields into our WebGL environment.

We ended up doing this by tiling each altitude layer adjacently to make a large matrix of latitude x longitude slices, which is saved out as an image for each time in the forecast. An image is made up of red, green and blue channels, so to pack as much information in as possible, we also tile different data in the different colour channels. This data can now be transferred into our WebGL environment where it can be effectively decoded back into a 3D array.

# Compression
A lot of time, effort and money has been invested in creating efficient video [codecs](https://en.wikipedia.org/wiki/Codec). Companies like YouTube and Netflix rely on efficient video compression to allow them to stream high definition video to consumers.

### What (data) have we got to lose? 
Broadly speaking, we had a choice between two types of compression: [lossy](https://en.wikipedia.org/wiki/Lossy_compression) and [lossless](https://en.wikipedia.org/wiki/Lossless_compression). Lossy compression, generally, results in smaller files than lossless compression, but in the process it sacrifices some of the information. In other words, lossless compression is completely reversible and lossy compression isn't. This presents us with a interesting question: do we want to keep the data that is lost by lossy compression or not? The answer is that it depends what we are using it for.

A scientist who is calculating a highly quantitative number as part of an experiment probably can't tolerate much data-loss (although we already store data at a finite precision, meaning some data-loss is inevitable). This question of lossy compression of scientific data is increasingly up for debate due to the vast amounts of data involved in modern science; can scientists perform new science by reducing data precision for the pay-off of increasing the number of analysed data points, for instance?

However, for visualisation, lossy compression should be far less controversial. In fact, video compression is fundamentally designed to only lose information that we can't see, which is why lossy compressed high definition videos look so good. We conducted experiments with data limited to four bit values, so each data point was converted to an integer between 0 and 15, and we found it very hard to see the difference in the rendered visualisation which told us we could stand to lose a lot of data before we would lose relevant information. We ended up limiting the precision of our data to 8-bit values (0 - 255), and using lossy compression. We tried a few different codecs, and settled upon the open source [Ogg Vorbis Theora](https://en.wikipedia.org/wiki/Theora) codec, although its very likely that other codecs may give better compression. With this compression, we convert 5GB of raw data into a 13MB video.

### Is there an even better way of doing this?
One of the ways that compression works is by spotting features. For illustration, if there is a black square that is three x three pixels, it is more efficient to represent this as three data values,

`side length three pixels, other side length pixels, colour black`

than the default uncompressed nine data-point version

`black pixel, black pixel, black pixel, black pixel, black pixel, black pixel, black pixel, black pixel, black pixel`

...I think its probably a bit more complicated than that, but I hope you get the principle. What's more, if this square is in a video and doesn't change between time frames, we can compress it as

`just repeat the square from last frame`

This is useful for compressing our data: for instance, areas of cloud tend to be near other areas of cloud, and they tend not to leap to radically different places between time-steps.

However, our data is just pretending to be 2D - it's obviously really 3D. There is information about the vertical structure of the field that the compression algorithm might find useful, but that we aren't giving it. In principle we would get even more efficient data compression by extending the 2D compression algorithms to natively encode 3D data. I think we might see this kind of 3D voxel field becoming more common in future, so it will be interesting to see if native 3D animation codecs are introduced. 