---
author:     Alberto Arribas
layout:     post
title:      The power of clouds
date:       2015-04-30
summary:    An overview of our 3D browser visualisation of high resolution weather forecast data.
categories: News
project:    threedvis
thumbnail: https://pbs.twimg.com/media/CD6RoadXIAEuLWM.jpg:large
---

I have mentioned before that our first prototype is a 3D browser visualisation of high resolution weather forecast data ... but I haven’t said much about how we are doing it so, here it is:

 * We pull data from the Met Office using [DataPoint][1].
 * We use Amazon’s cloud ([AWS][5]) to store and process the data (but we recently got a visit from Microsoft to talk about [Azure][6], good work there, definitely an option to keep in mind).
 * We process the data in AWS using Hadoop (working with [Hortonworks][2] on this).
 * We stream the data to the browser.
 * We render the data in the browser using [WebGL][3] (specifically [three.js][8] in [this version][7]).

OK, this is still a pretty high level view but, bear with us, we will be talking more about the details of each one of these steps in the near future.

Also, I have left out of this list the most important step the design process to make the prototype useful to human beings ... which is the main criteria behind the decisions for each link of the chain not just a bit of colour or placing icons in the interface! Talking about that, we had a fantastic meeting in London’s [MozSpace][4] to look at design and UX.

 ![3d vis diagram](https://pbs.twimg.com/media/CD6RoadXIAEuLWM.jpg:large)

[1]: http://www.metoffice.gov.uk/datapoint/
[2]: http://hortonworks.com/
[3]: https://get.webgl.org/
[4]: https://www.mozilla.org/en-US/contact/spaces/london/
[5]: http://aws.amazon.com/
[6]: http://azure.microsoft.com/
[7]: http://msaunby.github.io/uk-weather-3d/
[8]: http://threejs.org/
