---
layout:     post
title:      "A Modern Attitude to Data Compression"
date:       2016-04-11
summary:    We need to have a conversation about how we handle big spatial data.
categories: ['report']
author: 	Niall Robinson
project:    'threedvis'
thumbnail: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/exampledata_sm.png"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-10-05-videocodec/matrix-356024_1280.jpg"
---

Here's a paper that we never got round to publishing which details some of our thoughts on data compression.

## Abstract
Many modern datasets are becoming ever more unwieldy as data volumes grow. In an effort to address this, computationally intensive calculations are increasingly being performed on specialised remote servers, before the reduced data are transferred to the consumer. Due to bandwidth limitations, this often means data are displayed as simple 2D data visualisations, such as scatter or image plots. We present here a novel way to efficiently encode and transmit 4D data fields on-demand so that they can be locally visualised and interrogated. This nascent “4D video” format allows us to more flexibly move the boundary between data server and consumer client. However, it has applications beyond purely scientific visualisation, in the transmission of data to virtual and augmented reality.

## Introduction
With the rise of high resolution environmental measurements and simulation, extremely large scientific data-sets are becoming increasingly ubiquitous. The scientific community is in the process of learning how to efficiently make use of these unwieldy data-sets. Increasingly, people are interacting with this data via relatively thin clients, with data analysis and storage being managed by a remote server. The web browser is emerging as a useful interface which allows intensive operations to be performed on a remote bespoke analysis server, but with the resultant information visualised and interrogated locally on the client<sup>[1](http://ipython.org/notebook.html)</sup>.

There is a also a widespread desire to allow the public better access to data. Indeed, this is now often a stipulation of taxpayer funded research. Mere availability of the raw data is no longer considered satisfactory, and researchers are often asked to give more practical access to information<sup>[2](http://www.metoffice.gov.uk/media/pdf/3/5/OpenDataPolicy_MetOffice_v1.0.pdf),[3](https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/78946/CM8353_acc.pdf)</sup>. The web browser is the natural portal for the public to consume this data.

Many of these large data-sets are highly multidimensional, and often spatiotemporal. For instance, the field of earth science is generating extremely large spatiotemporal datasets on a daily basis, from weather forecasts to climate simulations: the UK’s Met Office generates ~400TB daily, and our archive will soon reach 1EB. Modern medical imaging also generates high resolution spatiotemporal data-sets from scans<sup>[4](Ueker et al 2010 http://onlinelibrary.wiley.com/doi/10.1002/nbm.1585/full)</sup>.

Compression algorithms traditionally used for images have previously been applied to atmospheric data<sup>[5](http://www.int-arch-photogramm-remote-sens-spatial-inf-sci.net/XL-7-W3/613/2015/isprsarchives-XL-7-W3-613-2015.pdf),[6](http://link.springer.com/chapter/10.1007/978-3-642-38750-0_26),[7](http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=1294266&url=http%3A%2F%2Fieeex2plore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D1294266)</sup> and medical data<sup>[8](ttp://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=1311701&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D1311701)</sup>. The data from each timestep is first converted from a 3D to a 2D raster grid by tiling slices adjacently, before encoding. Hubbe et al. 2013 concluded that lossy compression of climate data could be more widely utilized<sup>[9](http://link.springer.com/chapter/10.1007%2F978-3-642-38750-0_26)</sup>. While such image codecs are good at compressing data with spatial coherence, they neglect the gains that can be made by compressing temporal coherence.

Addressing “data overload” is one of the biggest challenges in modern science. The work presented here investigates how we can empower data consumers to interact with remote data-sets. More specifically, we present the first implementation of a practical and efficient method for the dissemination of large spatiotemporal datasets with a focus on compatibility with web technology by utilising video codecs.

## Method

The UK’s Met Office generates world-leading weather forecasts several times an hour. The raw forecast data is stored in a custom meteorological format called GRIdded Binary version 2, or GRIB2<sup>[10](http://www.wmo.int/pages/prog/www/WMOCodes/Guides/GRIB/GRIB2_062006.pdf)</sup>. This format can implement extensive lossy or lossless compression of the data, including optional implementation of PNG and JPEG 2000 codecs. However, in practice, the operational lossy compression is often limited to “bit shaving”<sup>[11](http://www.unidata.ucar.edu/blogs/developer/entry/part_5_converting_grib_to)</sup> - a technique which simply limits the precision of each datum. A standard forecast field, consisting of latitude &times; longitude &times; altitude &times; t points, results in a ~5GB GRIB2 file.

We limited the precision of all the data to 8-bit integers, that is all values are scaled to be between 0 and 255, which immediately quarters the data volume. For each time point, the spatial 3D array was then broken down into 2D latitude x longitude slices for each altitude level. These slices were tiled adjacently and encoded as an image, with the data points represented by the image pixel colours (Figure 1.). The first third of the tiled slices were encoded in the red image channel, the second third in the green channel, and the final third in the blue channel. These images were then joined together into a video<sup>[12](https://libav.org/avconv.html)</sup>.

{%youtube FKv_1zTcjB8 %}
Fig 1. 3D atmospheric data of cloud fraction encoded as pixels in an image.

It should be noted that the colour space normally used to encode static images is different from that used to encode videos, and conversion between these spaces is lossy. Videos make widespread use of [YUV colour space](https://en.wikipedia.org/wiki/YUV), which is designed to allow compatibility with black and white displays, and make visual compression optimal. Our data is initially written to RGB values which are lossily converted to YUV during video encoding, before being converted back to RGB space on the graphics card.

We tested several widely available video compression algorithms which give different levels of data compression and information loss, assessed as file volume and Mean Absolute Error respectively (Table 1). A test data set of forecast cloud fraction (i.e. 0.0 < x < 1.0) for the 27th November 2015 was used. Note that the major loss of information occurs from the zlib compression during PNG encoding. The various video compressions then have a negligible effect on infomation quality, whilst drastically reducing the data volume. It is worth noting that, in this case, values of MAE are significantly smaller than the dynamic range of the data (~16%). It is likely that in many cases the precision of the physical model is less than the precision lost through the data compression.

|                   | data volume   | M.A.E. w.r.t GRIB2    |
|------------------ |:-----------:  |:------------------:   |
| **GRIB2**             | 5.0 Gb        | n/a                   |
| **8-bit GRIB2**       | 1.25 Gb       | 8.09e-4               |
| **8-bit pngs (zlib 6)**| 344 Mb       | 0.162                 |
| **MP4 x264**          | 274 Mb        | 0.163                 |
| **Ogg Vorbis (q10)**  | 128 Mb        | 0.163                 |
| **Ogg Vorbis (q2)**   | 17 Mb         | 0.166                 |

Table 1. Data volume and information loss under different encodings.

We then endeavoured to visualise these fields at a location remote to the data via a web browser. A system was implemented to automatically convert the forecast data to video. The process was resolved into several microservices, written in Python. These microservices were deployed using Docker Containers<sup>[13](www.docker.com)</sup>, making them robust and portable. The whole process is automatically orchestrated and executed on the cloud using Amazon Web Services. 

For our prototype system, we chose to use the Theora Ogg Vorbis (q2) codec<sup>[14](https://www.theora.org/)</sup>, as it provides a good compromise between compression ratio and compression speed. We also chose Theora as it is open source, meaning is has the potential to be extended to natively support 3D data in the future. The video compressed version of the data is 10-20MB, which is a compression ratio of over 400:1 when compared to the original GRIB2 file.

![The web application rendering the video encoded data as a 3D field](https://s3-eu-west-1.amazonaws.com/informatics-webimages/threedvisscreen.png)
Figure 2. The web application rendering the video encoded data as a 3D field.

This video of atmospheric data is then served up to our web application for rendering (Figure 2.). We created an [interactive 3D animation](http://demo.3dvis.informaticslab.co.uk/ng-3d-vis/apps/desktop/) of the data using [WebGL](https://www.khronos.org/webgl/) and bespoke [GL Shader Language](https://www.opengl.org/documentation/glsl/) graphics card routines which simulated the passage of light rays through the data (a technique known as volume rendering or ray tracing). This application allows the users to interact with the animated 3D data field over a standard internet connection, without installing specialist software or hardware.

## Discussion
We set ourselves the task of representing weather forecasts in a way that reflects all the generated data. This data is richly spatiotemporal, however it is routinely communicated to the public as a 2D map, and scientists are largely limited to visualising data via static 2D maps or 1D scatter plots. We wanted to implement our animated 3D visualisation in the web browser, both to make it widely accessible, and to explore technologies which may eventually be of use to scientists on web browser based thin clients. Encoding the data using video codecs was central to achieving this.

Firstly, the use of video compression allowed us to significantly reduce the data load. The 400:1 reduction in data volume is due to the loss of data. Crucially though, the relevant information is retained: the salient features of the data field are still present in the final visualisation. Visual codecs are optimised to lose data which cannot be seen, a feature which is not just optimal for traditional 2D visualisation, but also largely suitable for such 3D rendering.

Employing video encoding is particularly useful in the context of delivery to web browsers. They natively support the decoding of video data, as opposed to esoteric atmospheric data formats. The video can be easily streamed into the browser, meaning client memory is used efficiently. As the data are represented graphically they can easy be transferred to the graphics card, where it can be rendered on the fly as the user interacts with the visualisation. Other video functionality is also useful, such playback controls and on-the-fly scaling.

## Conclusions

Over the past decade, the streaming of video content to web browsers has been highly optimised by corporations such as YouTube and NetFlix. We propose that we must now consider similar approaches for the transmission of “3D video”, that is time dependent 3D rasters of data.

Currently, data can only be moved to client machines when it has been reduced far enough. Efficient on-demand transfer of multidimensional data will allow us to flexibly move the boundary between specialised remote data servers for processing big data sets, and local client machines for interrogation, visualisation and understanding. This flexibility is essential to allow users (be they analysts or members of the public) to fluently interact with data.

Simulations and measurements of the environment we live in seem set to increase in application as well as volume. As virtual and augmented reality technologies gain traction (both in consumer entertainment and data analysis), it is imperative that we can broadcast dynamic content for users. “3D video” should be allowed to become a fundamental and common type of data, unhampered by limitations in dissemination.

The approach presented here, whilst far more optimized than previous alternatives, can be built upon. Firstly, there is coherence in the third spatial dimension which is currently not being leveraged. It is also conceivable that an approach could be developed which is general for n-dimensions, allowing efficient compression of highly multidimensional datasets. Finally, video codecs are optimised to preserve visual information, but work could be done to preserve more esoteric properties, for instance, atmospheric turbulence information.

We have presented a novel but pragmatic approach to efficiently disseminate 3D time dependent data to web browsers using video codecs. Whilst our approach is simple, it has addressed a emerging fundamental question: how can we communicate data which represents our environment?