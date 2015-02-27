---
layout:      project-overview
title:       Fly through model fields
author:      Niall Robinson
summary:     Weather and climate models create entire versions of the atmosphere, complete with clouds, rain, and wind. We wondered what it would be like to see the model run from the inside. Our ode to <a href=http://en.wikipedia.org/wiki/Tron>Tron</a>, if you will.
github-link: https://github.com/met-office-lab/volume-rendering
completed:   false
project:     threedvis

---
![Just a normal day at the lab](http://2.bp.blogspot.com/_GY9imUnSKCw/TRKtpqELS5I/AAAAAAAABp4/TMohzh9_Pm8/s1600/recognizer.jpg)

Ever wonder what it like to be inside a computer model? Well we did, so we're working hard to visualise our model data as a 3D environment, so you can fly through the atmosphere created by the models, and explore it more intuitively.

Imagine being able to hover high in the sky and watch blobs of hot air rise from the ground like a lava lamp and see them grow into raging thunder clouds. Or imagine watching air slosh around the earth, creating wind. We have data that simulates this. Lots of it. Now we want to be able to *really* see it.

The Met Office runs weather and climate models every day on its super computer, generating vast quantities of data. A model like this is in essence just a computer program which solves a set of physics equations ([like this one](http://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations)).

When these fundamental equations are included in the model, they naturally start to *create* weather. That's a really important point - the model isn't told what "a storm" is or what "clouds" look like, they just happen in a model that knows about basic physics. It creates another version of the world. Here, let Gavin Schmidt give you the low down in his awesome TED talk.

<iframe align="middle" width="443" height="270" src="https://www.youtube.com/embed/JrJJxn-gCdo" frameborder="0" allowfullscreen></iframe>