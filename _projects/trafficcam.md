---
title: Using traffic cams for ML
layout: project-overview
author: Antoine de Daran
summary: Scraping, building, analysing
github-link: https://github.com/met-office-lab/machine-learning-traffic-cams
completed: false
project: trafficcam
thumbnail: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/thumbnail_using-traffic-cams-to-do-ml.png
header: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/header_using-traffic-cams-to-do-ml.png
---

# Introduction
**Machine Learning** is a current buzzword. I'm not going to explain to you what it is. You can find the answer everywhere on the web. What we are interested in here is to do ML on a practical case, from scratch ... and ideally not on [handwritten numbers](https://www.tensorflow.org/versions/r0.7/tutorials/mnist/download/index.html).

Yes, we are going to build everything from the beginning: It's the topic of this post.

*If you are eager to play with some code, have a hack on the project free on [GitHub](https://github.com/met-office-lab/machine-learning-traffic-cams).*

<p style="text-align:center"><img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/trafficcam.gif" alt="An example of a traffic camera image" width="50%" height="50%"></p>

# Data
So first we need data.

Secondly ... we need more data.

Data can be found everywhere. There are a lot of captors and other sources of data in our daily life:

* The use of credit cards and mobile phone generates a huge amount of data (classic example, never mind)
* If you are using a badge at work, the company easily has access to the *time* you spend each week in the building
* When you turn on your car's engine, the *temperature* is immediately measured (and not provided by an external service as you might think)
* When you are driving on the motorway: *"Smile, you're on camera!"* (and maybe on photo as well if you are in a rush)

Thanks to the title, you already know that the last example is going to be our source of data. We should be able to get the images online.

<p style="text-align:center"><img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/TL-405969_2016-08-10T09-26-34.417Z.jpg" alt="An example of a traffic camera image" width="50%" height="50%"></p>
<cite><center><strong>An example of a traffic camera image</strong></center></cite>

On every image, as a human, you can easily say if it's rainy, cloudy, sunny or snowy. The luminosity and all the colours also give you  information about when the image has been taken, for instance.

Basically, we want to train the machine to recognise the weather. *Snow* is the hardest weather to forecast because it depends on small differences of pressure, temperature and heights of clouds. With images, we won't look for the sky only. To know if it's snowy, it's easier to look at the floor. The amount of white could give you the answer and characterise the snowy weather.

### Image acquisition: How? Where? When? Looking for a good API ...
How to automatically get the images? And where? That was the first issue of this project.

After a quick walk through on [Traffic England](http://www.trafficengland.com/), the traffic cam images seem to respect the same modele. It's quite convenient for us, we don't need to make the images uniform. Uniformity is essential to do ML or any images analyses because you cannot compare two items that are not homogenous.

[Exelis’ Helios](https://helios.earth/) Weather Platform's has been the open data API I used. For this back end problem, I chose JavaScript and the [Node.js](https://nodejs.org/en/) environment.

![Helios](https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/HeliosAPI.png)
<cite><center><strong>Here is the map of the cam on Helios API</strong></center></cite>

Each camera has a unique URL and an identification number, which is readable in the URL.  Scrapping begins. With this [script](https://github.com/met-office-lab/machine-learning-traffic-cams/blob/master/src/scrapingURL/js/scrapingURL.js) you can create a csv file of all the camera [URLs](https://github.com/met-office-lab/machine-learning-traffic-cams/blob/master/resources/webcams.csv) available in UK on the API. Being aware of all the problems of authorisations and keys on each platform, you can scrape the images and store it on an AWS S3 bucket. Code [here](https://github.com/met-office-lab/machine-learning-traffic-cams/blob/master/src/index.js).

![csv](https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/csvPicture.png)
<cite><center><strong>Inside the red box, the camera Id</strong></center></cite>

Because we always want to have more data to analyse, I decided to scrape images every day. Hopefully, this GitHub [project](https://github.com/ncb000gt/node-cron) makes cron job easier to run in Node.js environment. You just have to take into account the refreshing time of cams.

`Cron job using node-cron`

        new CronJob('* * * * * *', function() {
            go()
        }, null, true, 'Europe/London')

<cite><center><strong>The <em>go</em> function is my main</strong></center></cite>

### Enough to teach the machine?
When we are going to teach the weather on an image to our computer, we need to have the answer. And we are not going to observe every images to get it. So *No*, it's not enough. It's time to acquire metadata for our images!

Thanks to [datapoint-js](https://github.com/jacobtomlinson/datapoint-js), [Met Office](http://www.metoffice.gov.uk/datapoint)'s observations are available. Lets scrape daily forecasts where our cameras are at the same time we scrape the images.

Using an AWS DynamoDB table to store our weather items, we must be sure they are unique. To do so, we need a primary key and a sort key. I chose the camera ID as the primary key. For the sort key, the scraping time makes each item unique.

![DynamoDB](https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/DBtables.png)
<cite><center><strong>Our items store on a DynamoDB table</strong></center></cite>

# Processing
According to me, **Python** is more appropriate than **JS** to do statistics. The [CADL](https://github.com/pkmital/CADL) project on GitHub has been really helpful for the beginner in ML I am. That's why I use [TensorFlow](https://www.tensorflow.org/) in my [Jupyter Notebook](http://jupyter.readthedocs.io/en/latest/install.html) to begin the processing.

Using 100 traffic images, the [session-1](https://github.com/pkmital/CADL/blob/master/session-1/session-1.ipynb) already gave interesting results.

<p style="text-align:center"><img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/thumbnail_using-traffic-cams-to-do-ml.png" alt="Dataset of images." width="70%" height="70%"></p>
<cite><center><strong>Here is the dataset I use</strong></center></cite>

Basically, we consider each image as an array of RGB component. So the size of our dataset follows this form: **N**x**H**x**W**x**C**:

* **N** is the number of image in your dataset, so here *100*.
* **H** is the height of an image, it's *100* pixels for every images.
* **W** is the width: *100* as well.
* **C** is a *3D array* of RGB component.

For instance `(0, 0, 99, 2)` refer to the *blue component* of the *top right* pixel of the *first* image of our dataset (in Python, the first index of lists and arrays is **0**). Furthermore, if:

* `(0, 99, 0, 0) = 0`
* `(0, 99, 0, 1) = 255`
* `(0, 99, 0, 2) = 255`

That means that the colour of our present working pixel is **Cyan**.

Knowing that, we can calculate classic mathematical elements as:

* The mean image: it shows you the frame of all images. We can recognise the road, green elements on each side of it and a grey area in the bottom: that's the sky.

<p style="text-align:center"><img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/mean.png" alt="Mean image for the current dataset." width="50%" height="50%"></p>
<cite><center><strong>Mean image for the previous dataset</strong></center></cite>

* The standard deviation image that tells you where the more likely changes are going to append in your dataset comparing to the mean.

<p style="text-align:center"><img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/std.png" alt="Standard deviation image for the current dataset." width="50%" height="50%"></p>
<cite><center><strong>Standard deviation image for the previous dataset</strong></center></cite>

* Then, based on the previous results, we can calculate the normalised dataset.

<p style="text-align:center"><img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/Antoine%27s+image/datasetNormalize.png" alt="The normalised dataset" width="50%" height="50%"></p>
<cite><center><strong>The normalised dataset</strong></center></cite>

All of those operations are defined in the *graph* of our neural network. It's when we are going to open a session that they are going to be run.

I am going to let you train your programm on your own ... because I am working on it at the moment!

# Next step
Configuring Lambda function on AWS would avoid you to run the cron job on your own machine. It would handle bigger files and allow you to scrape at anytime and anywhere.

Have a look on [kappa](https://github.com/garnaat/kappa) if you are as lazy as me. It's a command line tool that makes deployment, updating and test functions easier to set up. Now let's go to work!