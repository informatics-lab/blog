---
title: Exploring Alibaba a AWS alternative
date: 2017-06-30 00:00:00 Z
categories:
- side-projects
- parallel computing
- big data
- infrastructure
layout: post
summary: Exploring
author: Theo McCaie
project:
thumbnail: https://images.informaticslab.co.uk/articles/2017-01-20-weather-sparkline/weather_spark_thumb.png
header: https://images.informaticslab.co.uk/articles/2017-01-20-weather-sparkline/sparkline_head.png
---
 
 
# Alibaba
 
 
Alibaba is a giant of a company, I'll let [- Wikipedia](https://en.wikipedia.org/wiki/Alibaba_Group) out line that for you.
 
> Alibaba Group is a Chinese e-commerce company that provides consumer-to-consumer, business-to-consumer and business-to-business sales services, electronic payment services, a shopping search engine and data-centric cloud computing services.
 
> It is the world's largest retailer as of April 2016 surpassing Walmart, with operations in over 200 countries, as well as one of the largest Internet companies. Alibaba has been generating more gross merchandise volume (GMV) than Amazon and eBay combined. Its online sales and profits surpassed all US retailers (including Walmart, Amazon and eBay) combined since 2015.It has been expanding into media and entertainment industry, with revenues rising 3-digit percentage year on year
 
So it's big! One of the service offered by Alibaba is AliCloud, a cloud computing platform similar to AWS or Microsoft Azure. AliCloud is making big investments to expand outside of China and become a real competitor to AWS in Europe and the United States. We thought it was time to give it a whirl.
 
# Features
 
AliCloud has pretty much all the features that you'd expect such as elastic computing, object storage, networking, virtual private cloud, databases, monitoring, resource and identity management, domains management and more. The only notable absence I noted where lambda functions or equivalent.
 
# Bid data processing
 
In order to give Alibaba a spin we decided to test some of our favorite tools on one of our favorite problems, distributed big data processing. Since we are big fans of infrastructure as code we wrote a implementation of our Dask Distributed compute infrastructure in [Terraform](https://www.terraform.io/) targeting the AliCloud platform. It took some work to get there in part because of the tooling but also due to unfamiliarity. However, it didn't take too long to get ourselves a 120 core distributed compute platform which was able to make quick work of some parallel computing tasks such as distributed re-gridding and averaging over large datasets. Here is the cluster in action:
 
![Processing on Alibaba with Dask Distributed](https://images.informaticslab.co.uk/misc/208ff4b5414132b9c2ed9006d6e38fbe.gif)
 
We further extended this work to build a hybrid cloud platform with some nodes hosted on Alibaba's AliCloud and others on Amazon's AWS infrastructure opening up the possibility to create a platform that can be distributed across the best or the cheapest infrastructure for a job or compromise of the two, even if that means spanning providers.
 
 
# Tooling
 
Overall we found we could achieve what we wanted to using AliCloud, however we felt the tooling fell short of what we've come to expect from services such as AWS. Perhaps the place where this was most noticeable was with Terraform our favorite tool for infrastructure as code. To illustrate this there are around [309 datasources/resources for AWS](https://www.terraform.io/docs/providers/aws/index.html) in Terraform and only [21 with AliCloud](https://www.terraform.io/docs/providers/alicloud/index.html). This was a problem when it came to setting up auto-scaling groups, it seems currently using Terraform and targeting AliCloud there is no way pass in `user_data` into the launch configuration making auto-scaling much less powerful. Other minor gripes like the default billing being per month and the out of the box setup being to email you on every instance creation give the impression that AliCloud is not as aligned to the infrastructure as code, rapid prototyping, elastic and dynamic workloads way we work in the lab as it could be. We could work around these issues and others but it did make for a slower less satisfying development experience.
 
# Looking to the future
 
I think it's fair to say that we're pleased that we have the option to add AliCloud to our tool belt and may use it again in the future. It might not be our tool of choice today but given the heavy investment that Alibaba are putting into it who know what the future will bring...