---
title: Developing big data tools with the US DoD
date: 2017-03-15
categories:
layout: post
summary: We're changing the way we deal with data
author: Niall Robinson
project: jade
thumbnail: https://images.informaticslab.co.uk/articles/2017-03-15-working-with-ERDC/dask_icon.png
header: https://images.informaticslab.co.uk/articles/2017-03-15-working-with-ERDC/dask_icon.png
---

The Informatics Lab has been thinking about how the Met Office could deal with the ever larger data sets in the future. It turns out we aren’t alone: lately we’ve been talking to the US Army Engineering Research and Development Corps, or ERDC. They are responsible for lots of the US Federal Government supercomputers, and as a result are addressing a similar problem. The Informatics Lab are starting a scheme of staff exchanges with the ERDC Lab in Vicksburg, Mississippi so we can work in these tools together.

In particular, ERDC have been interested in the initial testing AVD and the Informatics Lab have been performing on Dask. This is a powerful library for analysing data in Python - the standard analysis programming language here at the Met Office. Dask lets you take a problem and easily spread it over many computers, dramatically speeding up the calculations from days to minutes.

ERDC are now funding the development of Dask for multi-dimensional geospatial data, with the Informatics Lab as key partners. Hopefully, this will augment the excellent work AVD are doing to integrate Dask into the engine or Iris. Specific technical questions are: how to scale Dask to hundreds of users in an enterprise; how to integrate Dask into pre-existing systems such as Spice; and how to scale the infrastructure with the complexity of the calculation.
