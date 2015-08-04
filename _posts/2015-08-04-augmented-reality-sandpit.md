---
layout:     post
title:      "A sandbox environment with a difference..."
date:       2015-08-04
summary:    Find out about the augmented reality sandpit we are building in the lab.
categories: ['technical','stem','inspiration']
author: 	Tom Powell
project:    molab-sandpit
thumbnail:  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-08-04-augmented-reality-sandpit/coloured-terrain.png"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-08-04-augmented-reality-sandpit/coloured-terrain.png"
---

## WHAT ... is it??

Inspired by the project seen in the youtube link below, we have decided to build our own version of the
augmented reality sandpit here in the Met Office's Informatics Lab.

The idea initially is to replicate the functionality of the existing application, then hack away to add
additional weather and ground conditions to further enhance the augmented reality experience and overall
fun of the learning environment.

{% youtube j9JXtTj0mzE %}

Cool Huh!?

## WHY ... are we making it??

Our plan is to station the sandpit in a public area within the Office allowing visitors and staff alike to enjoy
and learn through the unique interface.

We also aim to link up with the [Met Office's STEM Ambassadors][STEM] and allow them to use the environment to enhance
presentations and engagement with children and at outreach events.

## HOW ... will you make something like that??

#### Firstly, things you will require...
 1) 3D camera with depth detection functionality
 2) compatible computer
 3) digital projecter
 4) sandpit

#### Let's get to work...
This project is being developed as a 'side project' from the main Lab project; the 3D visualisation of weather data.
So far the effort has mainly been put in by myself and another developer from the office Rich Burrow, who is an associate to the Lab.

With skills primarily in Java we have chosen to use the [J Monkey Game Engine][JMonkeyEngine].
We've focused initially on capturing the depth data from the camera and plotting it as a solid surface within the game scene.

The first step was to convert the raw data coming out of the 3D camera into something meaningful. This meant initially remapping
the depth values for each pixel down to a value within the greyscale colour-range, creating a depth-map from the raw data. Then
each value must then be reversed to make nearer objects appear lighter and further away objects appear darker, you then
have made yourself a pretty standard height-map.

![height map](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-08-04-augmented-reality-sandpit/height-map.png)

Once that was done we attempted to make use of the built-in terrain system within the game engine but later opted to
roll-our-own solution when we ran into some difficulties. This was actually (surprisingly) pretty simple to implement
and described really well by this tutorial on [building custom meshes][JMonkeyEngine custom meshes].

Following that in addition we have added the normals to the mesh buffers allowing us to calculate shadows cast by any light sources
we may want to put into the scene.

![normals calculated](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-08-04-augmented-reality-sandpit/normals.png)
![scene with light and shadows](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-08-04-augmented-reality-sandpit/normals.png)

Our most recent work has been to crib a set of [height-related colours][color map]
We have used a custom Material within our application to sample the colour gradient based on the vertex's z value.

![terrain height colour gradient](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-08-04-augmented-reality-sandpit/terrain-colour-map.png)
![coloured terrain](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-08-04-augmented-reality-sandpit/coloured-terrain.png)

That's the whole story so far, stay tuned for more...



[STEM]: http://www.metoffice.gov.uk/about-us/who/sustainability/community/uk
[JMonkeyEngine]: http://jmonkeyengine.org/
[JMonkeyEngine custom meshes]: http://wiki.jmonkeyengine.org/doku.php/jme3:advanced:custom_meshes
[color map]: http://www.kgs.ku.edu/General/elevatMap.html
