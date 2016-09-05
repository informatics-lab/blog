---
title: The Story of An LED Rhino
date: 2016-08-16 09:00:00 Z
categories:
- raspberry-pi
- outreach
- IOT
- technorhino
author: Todd Burlington
layout: post
summary: The development of 'Ronnie' the technorhino!
project: '#technorhino'
thumbnail: https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/techno.gif
header: https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/header.JPG
---
## Introduction
So the first thought most people have is why do the Met Office have a rhino and why is it covered in LEDs?

Well lets start by introducing myself. Hi, I'm Todd, a summer placement student working in the Informatics Lab. Normally I'm an undergraduate physics student. I think (in fact, I know) I could write a whole other blog post about my time in the lab, and the other things I've gotten up to, and I might just do that! But now you know a little about me, let's get back to that <del>elephant</del> rhino in the room.  

That rhino is affectionately called Ronnie but officially called [#technorhino][#Technorhino] - I might swap between these names so best to get them out the way early. I have been working on the rhino with some other summer placement students, and together we have done a great deal to get the rhino to what you see below 🌈

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/rainbow.JPG" alt="rainbow rhino"></p>

So first thing's first: the reason we have Ronnie! The rhino was donated to the team by [Paignton Zoo](http://www.paigntonzoo.org.uk) as part of their [Great Big Rhino Project](http://www.greatbigrhinos.org.uk).

## Great Big Rhino Project
The [Great Big Rhino Project](http://www.greatbigrhinos.org.uk/about-the-project) is a mass public art event spread across the English Riviera and Exeter city. Basically this means [life-size rhino sculptures](http://www.greatbigrhinos.org.uk/meet-our-rhinos) have been placed around parts of Devon and you can go and see them for free!

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/other-rhinos.jpg" alt="all other great big rhinos"></p>

The aim of this is to raise awareness of the [critically endangered species of the Javan and Sumatran rhino](http://www.greatbigrhinos.org.uk/supporting-conservation). There are currently **only 50-60 Javan rhinos left in the world.** I definitely did not know this before my placement, and it is something that we should all be aware of, so spreading the word is certainly key. This blog is about just the small contribution we have made to this cause.

Please donate to the Great Big Rhino Project [*here*](http://www.greatbigrhinos.org.uk/how-to-donate) or Save The Rhino [*here*](https://www.savetherhino.org) and help the conservation as well!

### \#technorhino
[#technorhino][#Technorhino] is the name of our rhino and it occupies a [special place](http://www.greatbigrhinos.org.uk/news/detail/message-on-a-rhino) within the Great Big Rhino Project. [#technorhino][#Technorhino] will be traveling to different locations, unlike most of the other rhinos, to try and generate as much interest as possible! Since Ronnie is so unique and such a novel take on the decoration, the hope is that he can be used to generate buzz and get more people involved in the great cause.

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/techno.gif" alt="gif of techno pattern"></p>

The rest of this blog post will be going through just how we got to this point, the proud owners of a light up rhino 😃 There's also lots of ways for you to **get involved!**

## Project conception
Having realised the value of the Great Big Rhino Project, the Met Office Informatics lab decided to get involved. Not only is raising awareness of conservation such a great cause, but the project also aligns so closely with the core principals of the lab: to show the intersection between design, technology and science.

This allows the Met Office to show itself as innovative, working at the cutting edge of tech and on a project with an unknown outcome.

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/baby.jpg" width="300" height="200" alt="first LED concept"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/hack-day.jpg" width="300" height="200" alt="hack day"></p>

The images above show the very first stages of project development - it started of as just fairy lights stuck to a rhino! They also act to highlight the collaborative nature of the team. We ran a number of hack sessions (shown in the images) involving Kaleider, Big Wave Media, ESW Solutions as well as other freelance software developers, university and college students. All of these collaborations really allowed us to develop some incredibly novel solutions.

## Hardware timeline
With all the thinking done, we had to actually get hands on and put the LEDs onto the rhino 🛠 I hope the next table serves as a sort of timeline of the hardware development.

### Part 1

| |      
--- | ---
<img style="float: left;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/white.jpg" width="300" height="200" alt="unpainted rhino"> <img style="float: left;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/silver.jpg" width="300" height="200" alt="silver painted rhino"> | First things first, we needed to paint Ronnie ready for the LEDs. Working out of [Kaleider](http://kaleider.com) gave us the opportunity to get the space required to paint the rhino. We gave it a nice silver base layer, hopefully reflecting all those sparkling LEDs. Another benefit of this was the collaborative space opened up many more opportunities for bouncing ideas around.
With the rhino looking so shiny we set to work attaching the LEDs. First up was deciding the position of the strips. This was more fiddly than we expected due to the fact a rhino isn't flat, who knew! Initially placed on with blue tac, the strips got permanently stuck down with super sticky double sided tape when we were happy. Finally once all were stuck down the soldering began 😟 | <img style="float: right;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/placement-1.jpeg" width="280" height="200" alt="placement of LEDs"> <img style="float: right;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/solder-1.jpg" width="280" height="200" alt="soldering of LEDS">

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/half-finished-rhino.gif" alt="half finished rhino"></p>

Luckily for us the soldering went well and the first section soldered together worked exactly as planned! The rest was left for another day.

Due to the length of the strips we decided to wire each one up to the power individually, given us x number of strips in parallel for power. Orange is 5V and blue is ground. The data, shown in silver, is wired in series. The data was a direction along the strips so care had to be taken to solder them up in the correct order.

See this helpful NeoPixel website for some more information: [https://learn.adafruit.com/neopixels-on-raspberry-pi/overview](https://learn.adafruit.com/neopixels-on-raspberry-pi/overview). This helped us connect the LEDs to power and the Raspberry Pi.

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/wiring.JPG" alt="wiring information"></p>

### Part 2

Following on from last time, we needed to finish the soldering. With our new found skills this was no problem what so ever...

| |      
--- | ---
<img style="float: left;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/placement-2.png" width="300" height="200" alt="placement of LEDS"> <img style="float: left;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/solder-2.jpg" width="300" height="200" alt="soldering of LEDs"> | The soldering actually went pretty well! It was the placement of LEDs that was much more tricky. We decided to move them all to run down the height of the rhino, making wiring up a lot easier. Once stuck down (but not before our finger tips were removed by the super sticky tape 😱) the LEDs were ready to go! We had some issues with the initial running of the LEDs but using the trusty multimeter we soon found the problem \*.
With [#technorhino][#Technorhino] all present and correct it was transported back to Met Office HQ. Unfortunately for Antoine, he got a bit too close to the rhino and had an interesting car journey back. Back at the lab, the buzz had really started to travel around the office with lots of interested people coming to visit [#technorhino][#Technorhino]. The final image shows Ronnie's time in the limelight, when Paignton Zoo came in to photograph him. The images taken on that day have even made their way into a national press release! Things just got serious. | <img style="float: right;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/travelling.JPG" width="300" height="200" alt="rhino in the car"> <img style="float: right;" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/photo-shoot.JPG" width="300" height="200" alt="rhino photo shoot">

 \* We noticed the data signal stopped at one LED and true enough the data across this LED was not as expected. Through some trial and error we found the best method to fix this was to remove the broken LED and both the one before and after it. We soldered in three new replacement LEDs and boom, problem solved!

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/finished-rhino.gif" alt="finished LED rhino"></p>

Here it is in all its glory! A fully working, successfully soldered and magnificent LED RHINO! 🎉🎊

### Technology used
* **Raspberry Pi** - We used a [Raspberry Pi 3](https://thepihut.com/products/raspberry-pi-3-model-b)
* **LEDs** - [60 LEDs per 1 meter LED strips](https://www.adafruit.com/product/1138)
* **Power Supply** - We used a custom made one but [buying one is also a great option](https://www.adafruit.com/products/658). Make sure it is suitable for your project.
* **General Electronic Supplies** - Things such as solder, wires, and other odds and ends.

## Software development
Software development, the section I put off until the end. This isn't because I don't enjoy it, in fact I really do enjoy it. It is because its the biggest part of this project and quite frankly it can be an almost endless topic - I could write thousands of words about it! The possibilities are actually incredible, I have developed so much stuff just(!) for this project. I am going to share the thought process of the development and go into a little technical detail, but the easiest way to get all the information is to check out the [GitHub repo](https://github.com/met-office-lab/molab-rhino-api).

So the core of this project is the [node.js](https://nodejs.org/en/) server. This is where all of the information to control the LEDs comes in and goes back out. This can come from a few different sources:

1. **Twitter**
  * Making use of the Twitter API, specifically [`POST statuses/filter`](https://dev.twitter.com/streaming/reference/post/statuses/filter), we scrape twitter for all current tweets. Looking for a specific keyword hashtag, in our case we look for [#technorhino][#Technorhino]. If this is followed by another keyword hashtag matching a theme, such as #rainbow, this will be pulled out of the tweet and the theme displayed on the rhino.
  * To serve up a list of historic tweets we use the [`GET search/tweets`](https://dev.twitter.com/rest/reference/get/search/tweets). This collects all the previous tweets containing a given keyword, again [#technorhino][#Technorhino].
  * We also briefly added in some live 'streaming' functionality. This gave the user the ability to tweet a photo or youtube url to display them onto the rhino. This was later removed, but you can get some more info on this below.
2. **iPad interface**
  * To increase the interaction with the rhino when on display, we thought we would need a more physical way to change what it could display. We came up with the idea of an iPad controller. This went through many design iterations but the final design is shown below. It includes two pages; the first containing three colour sliders which lets the user control the RGB value shown on the rhino in real time. The second page is a list of all the historic tweets.

<p style="text-align:center;"><img style="text-align:center" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/ipad-slider-page.png" width="200" height="300" alt="iPad slider page"><img style="text-align:center" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/ipad-twitter-page.png" width="200" height="300" alt="iPad twitter page"></p>

### Interaction development
This was a collaborative approach and as such required working closely with the labs designers, specifically Ross. Together the final design that you see was produced. I'll talk a little about how we got there.

One of the biggest steps was the construction of the [threeJS](http://threejs.org) animated rhino you see below. This is a 3D rendered rhino upon which we could display any pattern we like. From this came the idea to add colour sliders to alter the colour of the threeJS rhino. This naturally morphed into a real time way to update the actual rhino, with the colour present on the threeJS rhino also present on [#technorhino][#Technorhino].

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/threeJS.gif" alt="GIF of 3D rhino animation"></p>

As cool as the spinning interactive 3D render is, it did not make it into the final iPad controller. This was a decision taken by the designers in order to simplify the experience for the user. Personally, I think that having someone to guide the user experience is excellent as it prevents me from getting too attached to unnecessary things which might offer no benefit. That said, if you want to make use of it [*this commit*](https://github.com/met-office-lab/molab-rhino-api/commit/fe639f4bf850bb03c1a293d765cdcd598f40cd1b) was the last to contain the threeJS elements.

Finally one of the biggest user interaction decisions was the so called last wins approach. This means that the last interaction with the rhino, whether that be tweets or the iPad, will be the one shown on the rhino itself. The idea behind this was to drive as much interaction as possible. Since most things will be happening next to the rhino its most likely your friend who will beat you, and personally this would only encourage me to try again and beat them back!  

### Web sockets
So now you know what is going on with the user interaction, the client side or front end. I have also mentioned the node server, which is the server side or back end. But for this project to work these two need to talk to each other, which is where [web sockets](http://socket.io) come into play 🔌 These are like cool little pipes which join the two parts together, and just like pipes they let stuff travel between each part. This is really useful for this project as all of the user interactions happen on the client side, but changing the LEDs must be done from the server side, so we need a way to pass the information between each section. So, when you slide the red slider on the iPad an event is triggered and the RGB value is sent along a web socket to the node server which tells to LEDs to display that RGB value.

### Themes
If you have made it this far we are getting to the good stuff! With all the pieces in place we can start making those LEDs show some really cool themes.

#### Programmed themes
The first type of themes we implemented were programmed themes, which means that each LED had to be addressed by a number from 0-1001 (we have 1002 LEDs on Ronnie 😯). That is all well and good, but where is LED 471 on the actual rhino? This question makes programming anything detailed very hard using this method. Most of the themes produced using this method resulted in big block colour changes and other rough patterns.

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/block-color.jpeg" alt="Block colours on the rhino"></p>

They do have one benefit and that is absolute control over which LEDS are on and what colour they are. It is for this reason that they are still in the project, and if you spent some time really digging into this functionality it could be used to make some very interesting things indeed.

#### Mapping = media themes
Let's step back to that issues of locating LED 471. Wouldn't it be better if instead of using its number we could use a set of (x,y) coordinates to locate it on the rhino? We thought it would, so some of the other team members developed a program to do just that!

The [led-mapper](https://github.com/met-office-lab/led-mapper) is that program. It works by using a camera pointed at the LED array and turning each LED on in turn. As the LED flashes it is assigned an (x,y) coordinate (in rhino space I guess...). The eventual output is an array of the coordinates for each of the LEDs. Using that array a mask was produced, the spotty rhino shaped image below.

<p style="text-align:center;"><img style="text-align:center" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/mapping.gif" width="300" height="200" alt="GIF of the LED mapping process"><img style="text-align:center" src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/mapping-array.png" width="300" height="200" alt="Array produced from mapping"></p>

So how does mapping = media themes? A terrible equation I know. Well that mask can be overlaid on top of an image and then at each one of the LEDs (squares on the mask), the RGB value is taken from the overlaid image. This RGB value is then displayed on the LED at that location. Magic 👻 This leads to being able to show any photo we want on Ronnie, like the space invader below. Once done with images this could be easily extended to videos by taking a freeze frame at a defined time interval. Then just repeat the process for images with each video frame. 👾

<p style="text-align:center;"><img src="https://images.informaticslab.co.uk/articles/2016-08-16-the-story-of-an-led-rhino/invader.jpg" alt="Space invader on the rhino"></p>

#### Twitter and themes

Now being able to show videos - as soon as someone saw the rhino, the first thing they asked was whether this could show this youtube video, or that image. This is exactly what we wanted, engagement! The next step was obviously to make this happen and the best way was to build on what we already had: the twitter interaction. If you could tweet an image or youtube link, wouldn't that be awesome?

I thought so, so I did it! Basically it works as you expect, you tweet some sort of media and this is scraped from your tweet and shown on the rhino. It works using the same method as the keyword filtering ([`POST statuses/filter`](https://dev.twitter.com/streaming/reference/post/statuses/filter)).

This functionality was removed before being shown to the public due to privacy concerns (we wouldn't be able to control what people tweeted, after all) but is available in [*this commit*](https://github.com/met-office-lab/molab-rhino-api/commit/e27ec311dca830c78ff0d7f0ce47e082811f9f9b) for you to make use of.

### A Touch of Python
This project was not entirely JavaScript based. I used my first bit of python as well! This was to make a little [flask server](http://flask.pocoo.org/docs/0.11/quickstart/) that runs on the Raspberry Pi. This flask server uses the [NeoPixel library](https://learn.adafruit.com/neopixels-on-raspberry-pi/overview) to control the LED array from the Pi. Hopefully that link explains some more of it a little bit better. I have to be honest, I didn't do all the coding on this part so my knowledge isn't great, but the long and short is that it mainly works by receiving a http request from the node server, with the colour for each LED attached to the end of this.

### My experiment
The final part of the software development was the deployment server. This was a little bit of a personal project. The idea was to develop an application to run on the Pi that looks for an update to the GitHub repo. Once an update is detected it would automatically update the version on the Pi and restart all the servers. This still doesn't work completely so let's just say it is in beta! I just though it was a cool little trick to be able to do, and hopefully that'll be polished at some point soon.

## Future of the \#technorhino
That is the story of the [#technorhino][#Technorhino] so far, but what is going to happen next? Well, we are off on tour! 🚗 The following list of venues are the confirmed ones but more are to be arranged so try and keep up to date on all the rhino news.

Confirmed venues:
* [Kaleider](http://kaleider.com) - 19th August
* [RAMM](http://www.rammuseum.org.ukd) - 26th August
* [Paignton Zoo](http://www.paigntonzoo.org.uk) - 14-16th October

Eventually [#technorhino][#Technorhino] will be moving back to Paignton Zoo for the finale of the Great Big Rhino Project. This will be from Friday 14th to Sunday 16th October 2016. His long term future is yet to be decided, but all of the rhinos involved are supposed to be auctioned off on Thursday 3rd November 2016, with all funds raised being used to support rhino conservation!

## How to get involved
Hopefully (if you haven't gotten super bored by now), you are now eager to get involved yourself! Well, to try and help you out we have made all the code freely available on GitHub. The repository is this [**one!**](https://github.com/met-office-lab/molab-rhino-api) That represents all of the code we have made for this project and if you dig through the history you can find some of the cool features we added but, for various reasons, were ultimately removed.

Hopefully you will decide to take a look at the code and get involved in this. Whether it be to just have a look, make yourself some awesome controllable lights or maybe even your own personal rhino! To make you feel a little better, when I first started on this project I didn't even know a single bit of JavaScript. This project represents all the JavaScript I have ever written (with the help of many people - mainly Tom).

If coding really isn't for you but you still want to get involved somehow, why not take on the Great Rhino Trail for yourself and try to track them all down? Since you know the location of [#technorhino][#Technorhino], you will certainly have found the coolest one.

## Keep up-to-date
Keep up to date by following the informatics lab on twitter, [@informatics_lab](https://twitter.com/informatics_lab), as well as the Great Big Rhino Project, [@GreatBigRhinos](https://twitter.com/greatbigrhinos). Also check out the websites ([lab](http://www.informaticslab.co.uk), [rhinos](http://www.greatbigrhinos.org.uk)) for more information (if you needed more!).

<a href="https://twitter.com/intent/tweet?button_hashtag=technorhino" style="text-decoration:none; background-color: #4099FF; color: white; text-align: center; padding: 9px 20px;">Tweet #technorhino</a>

[#Technorhino]: https://twitter.com/search?q=%23technorhino&src=typd
