---
title: From brain imaging to weather imaging
date: 2017-04-04 00:00:00 Z
categories:
- side-projects
- weather
- 3D
- Visualisations
layout: post
summary: Borrowing brain imaging tools to visualise the deadly Typhoon Koppu.
author: Theo McCaie
project:
thumbnail: https://images.informaticslab.co.uk/misc/c1ffad2ec1ebacbea7b124353820b1d3.jpg
header: https://images.informaticslab.co.uk/misc/f251807d461e3eeafe93ae89e273172b.png
---

There is a myth that innovation just happens, that it's a spark of genius that happens when you least expect it. Whilst this can be true the majority of innovation comes from hard work. Hard work understanding a problem, hard work making the conditions right for innovation, hard work coming up with ideas, hard work testing them, hard work trying and failing and trying again. Often hard work is often not enough but what can make the difference is an understanding of how innovation happens and having the knowledge, tools and techniques to help it along. This post isn't going to teach you how to innovate but it does touch one technique that can sometimes help.

## Related worlds

When I went to innovation school (ok a few days worth of lessons and sessions) I learn a number of techniques for coming up with ideas that might lead to a new solution for your problem. One of these techniques is call "Related worlds". One example of both Related Worlds ([and the hard work required in innovation](http://www.rd.com/advice/work-career/james-dyson-on-creating-a-vacuum-that-actually-well-sucks/)) is the [James Dyson story](https://www.dyson.co.uk/community/aboutdyson.aspx)

> In 1978, James Dyson became frustrated with his vacuum cleaner’s diminishing performance. Taking it apart, he discovered that its bag was clogging with dust, causing suction to drop. He’d recently built an industrial cyclone tower for his factory that separated paint particles from the air using centrifugal force. But could the same principle work in a vacuum cleaner?

At the time the 'cyclone' belonged in a different "world" from domestic hoovers, they belonged in large industrial factories with machinery that filled workshops and had nothing to do with the household appliance that cleans the floor. However, what Dyson did is notice that these different "worlds" had a common problem and the rest is history. Another lovely example of a successful application of "Related Worlds" is [Great Ormond Street working with Formula 1 teams to speed up patient handover to save lives ](http://www.telegraph.co.uk/news/1527497/Ferrari-pit-stop-saves-Alexanders-life.html).


## ???

As more models, experiments and forecasts take advantage of the Met Office's increased super computing power there is evermore data to be explored and analysed the it's becoming clear that the tools to do that aren't always up to the job. One of the difficulty of visualising atmospheric data is that it's almost always multi dimensional usually has at least four dimensions (latitude, longitude, height and time). Whilst this is a knotty problem it's not entirely unique and one of the "Related Worlds" that really caught my eye was medical imaging.

![Brain imaging using AMI Medical Imaging (AMI) JS ToolKit](https://images.informaticslab.co.uk/misc/5f0f00844b629e87c9f216523ebe144a.gif)

Medial imaging can frequently be 4D, such as this example above. Another interesting aspect of most medical imaging is that on the whole the things you are visualising are opaque. This is interesting because whilst you can do some [great stuff visualising fields like cloud fraction in 4D by mimicking what our eyes would see] this doesn't work when you come to a property such as wind speed which is a) invisible and b) everywhere.
Visualising in 3D examples

## How it was done

To create the examples below I used the excellent [AMI Medical Imaging (AMI) JS ToolKit for THREEJS](https://github.com/FNNDSC/ami). I created [a fork](https://github.com/met-office-lab/ami-weather) in order to implement my own parser and loader and tweak some examples to use weather images.

One of the things I was keen to test was how much data we could visualise, if you want to run these visualisations you'll need to be a modern browser and a little patience (a minute or two to load). The reason for this is because the original data set is at a latitude, longitude resolution of 6000 x 5400. For these visualisations I've had to half that so that's 3000 * 2700 ~ 8 million data points per level. The visualisations have 60 levels in them (the original data set has 80) so we are now up to 8M * 60 = 480 million data points. Each point starts life as a float 64 so 480M *  8 (float 64 = 64 bits = 8 bytes) ~ 4GB.

So what we are looking at is about 4GB of data. In order to get that into the browser in a timely-*ish* manor we compress that by converting the data in to JPGs using the three channels (red, green, blue) each as a different model level. The input images (20 of them) containing the data to visualise look like this:

![Typhoon Koppu, one of the raw images that go into the 3D visualisations](https://images.informaticslab.co.uk/misc/c1ffad2ec1ebacbea7b124353820b1d3.jpg)

For more information on this compression technique [read the paper we've wrote about it](http://www.informaticslab.co.uk/report/2016/04/11/compression-paper.html)

Once we've got this data in the [AMI JS ToolKit](https://github.com/FNNDSC/ami)  we can visualise is using using a volume rendering approach:

[![Typhoon Koppu, volume rendered at 0000 * 2700 * 60 ](https://images.informaticslab.co.uk/misc/551b44555aa86960c8c29a9ec6999d1f.gif)](https://s3-eu-west-1.amazonaws.com/typhoon-koppu/vr_singlepass/index.html)

(click the image to go to a live demo but be patient whilst it loads)

it looks like this (click the image to go to a live demo but be patient whilst it loads)

Alternatively it can be visualised by looking at cross-sections through the data. This approach might work particularly well for data like temperature or windspeed which you can't visualise in the way you would actually see it. The example below shows taking three orthogonal cross-sections and using these to interrogate the data.

[![](https://images.informaticslab.co.uk/misc/cbbf81152e6691016bf9e6ff450a84b1.gif
)](https://s3-eu-west-1.amazonaws.com/typhoon-koppu/typhoon_cloud_planes/index.html)

(again click the image to go to a live demo. There is 100 times less data in this example so it should run more smoothly.)

# What's next

There are loads of things I'd like to look at with this project but might not find the time for such as if [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) could be used to parallelise the processing of the images in a non UI blocking way, or introducing colour to provide more informative data interrogation tools. Whilst these and other experiments would be really interesting what I will be doing first is working with the scientists at the Met Office who are producing the next generation weather model to try provide the visualisation tools they need to test and explore their work.














I love conferences because I always learn something new and Graphical Web 2016 was no exception. Amongst all the new things I learnt was a new word and new concept - sparklines. One of my favourite descriptions of a sparkline is by  Edward Tufte who described them as "data-intense, design-simple, word-sized graphics" [*](https://en.wikipedia.org/wiki/Sparkline#cite_note-BE06-5). For example a sparkline might add more context to explain how Graphical Web effected my knowledge of sparklines: ᴶᴬᴺ²⁰¹⁶▁▁▁▁▁▁▁▁▁▁██ᴶᴬᴺ²⁰¹⁷. If you wan't to learn something new too then all the Graphical Web talks are up on YouTube including [Matt Ström talking about Tiny Data Visualisations](https://www.youtube.com/watch?v=WAVsG33ijjg&list=PLBs84wlNEgZJ3NHaGV26VYJB5H_ZgmJHs&index=2) which is what inspired this side project.

Thus inspired I thought I'd like to have a play with sparklines myself, but what to do? The weather domain seemed an obvious choice but over what platform would "data-intense, word-sized graphics" be particularly suited? With it's strict character limit Twitter seemed and ideal place to give it a whirl, so I built [Weather Sparkline](https://twitter.com/WeatherSpark_). [Weather Sparkline](https://twitter.com/WeatherSpark_) is a simple twitter bot built in Python and hosted on AWS that uses Met Office Datapoint data to provide a weather forecast to a random location every five minutes. In action it looks like this:

![WeatherSpark_ tweets](https://images.informaticslab.co.uk/articles/2017-01-20-weather-sparkline/WeatherSpark_Tweet.png)

[All the code is up on Github](https://github.com/met-office-lab/WeatherSpark_) so feel free to have a nosey if your interested but I'll go over some of the highlights below.

## Show me the data 💽

The starting point for this project was getting weather forecast data. Lucky [Met Office Data Point](http://www.metoffice.gov.uk/datapoint) is a public API providing a range of weather forecasts and observations. For this project I used the 3 hourly site specific forecast. I wont go into any detail on using Datapoint as it's documented on the [Met Office Data Point](http://www.metoffice.gov.uk/datapoint) website but if you do want to run the code yourself you'll need to [get a DataPoint API key](http://www.metoffice.gov.uk/datapoint/api).

## Unicode 👍

I wanted this project to be able to target Twitter and so while there were some fantastic examples of using [D3.js](https://d3js.org/) and other libraries to create brilliant sparklines I needed something that I tweetable and that's why I chose Unicode. [The history of text encoding](http://tronweb.super-nova.co.jp/characcodehist.html) (leading to Unicode) is fascinating and I suggest you look into it for your own fun. However, for our purposes it's suffice to say that Unicode has changed the text landscape form a limited 128 characters (once upon a time) to over a million possible characters (though only about 10% are currently used)[*](http://stackoverflow.com/a/5928054).

## Unicode in Python 🐍

There are lots of ways of putting Unicode characters into Python code and if you take a look at the code you'll see a range of them. The best way is to simply put them in as if they were any other character. Try this in your python terminal

```Python
print("Hello, 🌍!")
```

and you'll hopefully be rewarded by a new spin on an old classic. But if you try put the above in a file and run it

```
$ echo 'print("Hello, 🌍!")' > hi.py ; python hi.py
  File "hi.py", line 1
SyntaxError: Non-ASCII character '\xf0' in file hi.py on line 1, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
```

😡 Aggghhh!

To fix this we need to let Python know what encoding our file is in. Really you should know what you are encoding you files in (most editors will let you see and set this), but often you can just assume `UTF-8` and stick `# -*- coding: utf-8 -*-` at the top (or just after the `#!` line) of your file. If your encoding is different change the `utf-8` bit. This done we can put in all our favourite (💩) Unicode symbols right into our Python code.

If you can't encode your files in a suitable encode or for any other reason you want to stick to ASCII you can also express unicode characters using escaping. For example:

```Python
print (u"Don't look \u2193") # Notice the 'u' before we start the string indicating this is a unicode string.
```

You'll probably want to use the hex code which you can [easily look up with a quick Google](http://lmgtfy.com/?q=left+pointing+magnifying+glass+hex+code).

There are yet more ways of Unicoding in Python, you might use these situations such as the above doesn't work or you want to chose the symbol based on some numeric input.

```Python
print('Mini numbers: ' + ', '.join([unichr(8320 + i) for i in range(10)]))
```

```Python
from datetime import datetime

def clock(hr):
    offset = hr - 1
    offset = offset if offset >= 0 else 11
    s = "\\U%08x" % (128336 + offset)
    c = s.decode('unicode-escape')
    return c

print ('the time is ' + clock(datetime.now().hour % 12))
```

## Making it Tweet 🐦

Hooking it all up to Twitter was easy but slow (because you need to wait for Twitter to move your keys). I followed [Molly White blog on twitter bots](http://blog.mollywhite.net/twitter-bots-pt2/) which uses the [Tweepy](http://www.tweepy.org/) library. I made some small changes from her approach, the most important one is that I decided to put my Twitter secrets in to environment variables rather thank into a file. The advantage of this is that it's less likely to accidentally end up on GitHub and still works well with tools like Docker and Terraform (which we'll get to). The downside is a lot of environment variables, by this point we have one for datapoint and four for twitter and we'll soon get two more for AWS.

## Running the code ⚙

I decided that this app should run inside docker. This makes the application more portable, makes it easier to run in the same environment as you will deploy to and quick and easy to upgrade dependancies, such as Python. The docker file for this application turned out to be ludicrously simple:

```Dockerfile
FROM python:2-onbuild
ENV LANG en_US.UTF-8
CMD ["python", "./src/weather_sparkline_bot.py"]
```  

The `python:2` container I'm using as the base deals with pulling the scripts in the container and the `CMD` line sets our app to run inside the container when it starts up. I can't 100% remember now what `ENV LANG en_US.UTF-8` was about but I'm sure it was to get round a problem with the operating system inside the container not expecting the files to be UTF-8 and so complaining when it got to the more esoteric characters🕴

## Deploying 🚀

The final step is deploying this app and in the spirit of repeatable deployments and infrastructure as code I chose to deploy this app to Amazon EC2 through Terraform. This requires installing [Terraform](https://www.terraform.io/intro/getting-started/install.html), setting up an AWS account and getting your AWS secrets as environment variables. This done we are good to go. I won't explain much about Terraform but in brief it's away of expressing you infrastructure as code and gives you tools to automate building, destroying and maintaining this infrastructure. In our example most of the work is done in `sparkline.tf`

```Terraform
data "template_file" "bootstrap" {
  template = "${file("boot.tlp")}"
  vars = {
    DATAPOINT_KEY="${var.DATAPOINT_KEY}"
    WEATHERSPARK_C_TOKEN="${var.WEATHERSPARK_C_TOKEN}"
    WEATHERSPARK_C_SECRET="${var.WEATHERSPARK_C_SECRET}"
    WEATHERSPARK_A_TOKEN="${var.WEATHERSPARK_A_TOKEN}"
    WEATHERSPARK_A_SECRET="${var.WEATHERSPARK_A_SECRET}"
  }
}


resource "aws_instance" "theosparkline" {
  ami                   = "ami-d41d58a7"
  instance_type         = "t2.micro"
  key_name              = "gateway"
  user_data             = "${data.template_file.bootstrap.rendered}"
  tags {
    Name = "theo-spark-line"
  }
}
```
Which basically says "create me a AWS T2 micro instance and then run the bootstrap file on it when it's ready".

So when the server is up and ready our bootstrap file `boot.tlp` runs

```cloudconfig
#cloud-config
runcmd:
    # Install git
    - 'yum install -y git'

    # install docker
    - 'curl -sSL https://get.docker.com/ | sh'

    # Start Docker
    - 'service docker start'

    # Get, build and run container
    - 'mkdir -p /root/sparkline'
    - 'git clone https://github.com/tam203/sparkline.git /root/sparkline'
    - 'cd /root/sparkline'
    - 'docker build -t weather_sparkline_bot .'
    - 'docker run -dt -e DATAPOINT_KEY=${DATAPOINT_KEY} -e TWITTER_C_TOKEN=${WEATHERSPARK_C_TOKEN} -e TWITTER_C_SECRET=${WEATHERSPARK_C_SECRET} -e TWITTER_A_TOKEN=${WEATHERSPARK_A_TOKEN} -e TWITTER_A_SECRET=${WEATHERSPARK_A_SECRET} --restart=unless-stopped weather_sparkline_bot'
```

This file is a [Cloud-Config](https://coreos.com/os/docs/latest/cloud-config.html) file but we can think of it just as a script that runs some commands. In our case it installs `docker` and `git` then pulls down our souce code repository, builds the app and runs it. One thing to note is using the flag `--restart=unless-stopped` with Docker, this flag means that if the script crashes or has a problem Docker will just restart and start again.

Now if we have successfully installed Terraform and are all set up with our Datapoint (x1), Twitter (x4) and AWS (x2) environment variables we should simply need to run `terraform apply` and with in a few minutes our twitter bot will be Tweeting away with gems such as 'The Cairnwell'.

![WeatherSpark_ tweets](https://images.informaticslab.co.uk/articles/2017-01-20-weather-sparkline/WeatherSpark_The Cairnwell.png)
