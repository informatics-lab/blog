---
layout:      project-overview
title:       Fly through model fields
author:      Niall Robinson
summary:     Weather and climate models create entire versions of the atmosphere, complete with clouds, rain, and wind. We wondered what it would be like to see the model run from the inside. Our ode to <a href=http://en.wikipedia.org/wiki/Tron>Tron</a>, if you will.
github-link: https://github.com/met-office-lab/volume-rendering
completed:   false
project:     threedvis
thumbnail: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-05-11+at+15.00.00.png
demos:
  - name: "Desktop App"
    date: "September 2015"
    demo-url: http://demo.3dvis.informaticslab.co.uk/ng-3d-vis/apps/redirect/
    git-url: https://github.com/met-office-lab/ng-3d-vis
    thumb: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-09-30+at+11.44.41.png
    description: "Newer version of the volume rendering."
  - name: "iPad Fly"
    date: "July 2015"
    demo-url:  http://demo.3dvis.informaticslab.co.uk/ipad-fly/
    git-url: https://github.com/met-office-lab/ipad-fly
    thumb: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-09-30+at+11.53.23.png
    description: "Fly around with your iPad."
  - name: "60 levels"
    date: "July 2015"
    demo-url:  http://demo.3dvis.informaticslab.co.uk/uk-weather-3d/view3d/
    git-url: https://github.com/met-office-lab/uk-weather-3d
    thumb: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-09-30+at+11.55.09.png
    description: "Displaying 60 flat levels instead of volume rendering."
  - name: "Initial volume rendering approach"
    date: "June 2015"
    demo-url:  http://demo.3dvis.informaticslab.co.uk/volume-rendering/viewer.html
    git-url: https://github.com/met-office-lab/volume-rendering
    thumb: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-09-30+at+11.55.57.png
    description: "First version of the volume rendering."
  - name: "Stereoscopic (google cardboard)"
    date: "August 2015"
    demo-url: http://demo.3dvis.informaticslab.co.uk/google-cardboard
    git-url: https://github.com/met-office-lab/ipad-fly/tree/gh-pages
    thumb: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-11-30+at+15.49.36.png
    description: "First version of the volume rendering."

---

## Project Description
<!-- ![Just a normal day at the lab](http://2.bp.blogspot.com/_GY9imUnSKCw/TRKtpqELS5I/AAAAAAAABp4/TMohzh9_Pm8/s1600/recognizer.jpg)
 -->
Ever wonder what it's like to be inside a computer model? Well we did, so we're working hard to visualise our model data as a 3D environment, so you can fly through the atmosphere created by the models, and explore it more intuitively.

Imagine being able to hover high in the sky and watch blobs of hot air rise from the ground like a lava lamp and see them grow into raging thunder clouds. Or imagine watching air slosh around the earth, creating wind. We have data that simulates this. Lots of it. Now we want to be able to *really* see it.

The Met Office runs weather and climate models every day on its super computer, generating vast quantities of data. A model like this is in essence just a computer program which solves a set of physics equations ([like this one](http://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations)).

When these fundamental equations are included in the model, they naturally start to *create* weather. That's a really important point - the model isn't told what "a storm" is or what "clouds" look like, they just happen in a model that knows about basic physics. It creates another version of the world.