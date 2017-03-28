---
title: A Modern Approach to Data Compression
date: 2016-04-11 00:00:00 Z
categories:
- report
layout: post
summary: We need to have a conversation about how we handle big spatial data.
author: Niall Robinson
project: threedvis
thumbnail: https://s3-eu-west-1.amazonaws.com/informatics-webimages/threedvisscreen.png
header: https://s3-eu-west-1.amazonaws.com/informatics-webimages/threedvisscreen.png
---

[Here's a paper that we just stuck on arXive](https://arxiv.org/pdf/1604.03688v2.pdf) which details some of our thoughts on data compression. If you know somewhere that you think might want to publish it then please let us know! You can read the abstract below.

>Datasets representing the world around us are becoming ever more unwieldy as data volumes grow. This is largely due to increased measurement and modelling resolution, but the problem is often exacerbated when data are stored at spuriously high precisions. In an effort to facilitate analysis of these datasets, computationally intensive calculations are increasingly being performed on specialised remote servers before the reduced data are transferred to the consumer. Due to bandwidth limitations, this often means data are displayed as simple 2D data visualisations, such as scatter plots or images. We present here a novel way to efficiently encode and transmit 4D data fields on-demand so that they can be locally visualised and interrogated. This nascent “4D video” format allows us to more flexibly move the boundary between data server and consumer client. However, it has applications beyond purely scientific visualisation, in the transmission of data to virtual and augmented reality.
