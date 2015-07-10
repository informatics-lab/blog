---
author:     Jacob Tomlinson
layout:     post
title:      "Tube strikes, AWS, GoSquared and more..."
date:       2015-07-10
summary:    Jacob has spent the last two days in London learning about how others use Amazon Web Services.
categories: ['learning']
project:    blog
thumbnail: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-07-10-tube-strikes-aws-docker-and-more/thumbnail.jpg"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-07-10-tube-strikes-aws-docker-and-more/header.jpg"
---

This week I took a trip to London to attend Amazon's [AWSomeDay][awsomeday]. I took the opportunity to meet with some interesting people and find out about how they make use of technologies we're interested in such as [AWS][aws] and [Docker][docker]. Despite having to walk miles on foot around the city thanks to a strike on the London Underground I managed to learn a lot.

## GoSquared

In April I attended the [London AWS Summit][aws-summit-london] and met [Simon Tabor][simon-tabor] from [GoSquared][gosquared]. Simon manages the infrastructure for GoSquared purely using AWS, I asked if I could pick his brain over a coffee and he was extremely generous with his time.

GoSquared are doing things in a very similar way to the practices we've been trying out and aiming for. Code lives in GitHub, services live on AWS and server builds are automated and scale seamlessly.

The bulk of my questions were aimed around deploying the code onto AWS, there appear to be many ways of deploying things, [Elastic Beanstalk][aws-elasticbeanstalk], [CodeDeploy][aws-codedeploy], [Puppet][puppet]/[Chef][chef]/[Ansible][ansible], [TravisCI][travis]/[CircleCI][circleci]/[Jenkins][jenkins], manual deploys with snapshots and more.

Simon told me that they use a combination of Chef and snapshots (called [AMIs][aws-ami]). They build an instance based off a default AMI such as ubuntu, run a bootstrap script which installs and runs chef, chef pulls the code from GitHub and configures the service. Once they're happy with the build they make a custom AMI based on the server and then use that image when scaling. This allows for control over the build as well as speed when scaling.

This led me to think about something which I've found to be very time consuming when working with servers: patching. Even when using an automated patching framework, ensuring all of your servers are up to date with security patches is a major time suck. I've always dreamed of running scalable stateless servers which do not require patching, Simon told me they are living this dream.

When a GoSquared instance boots it installs any outstanding updates. Services are then tested by an elastic load balancer and brought into service. In the case of a major vulnerability such as [Heartbleed][heartbleed] affecting a scaling group of 5 servers, provided there is capacity, one server is terminated. AWS will detect the drop in capacity and automatically scale the group back up to 5 servers, the new server install updates on boot and therefore will not suffer from the vulnerability. Once that server has joined the load balancer and everything is checked and running ok then another server is temrinated, automatically replaced and brought back into service. Repeat three more times and you have a fully patched group in no time at all. There was no manual patching involved and everything is managed in a controlled and safe manner. Perfect!

Many of the things Simon told me verified the half-baked ideas I've had about managing a scalable group and he explained to me how GoSquared have already make these things a reality. I'm very impressed with their organisation and look forward to working with them in the future.

## AWSomeDay

Attending Amazon's [AWSomeDay][awsomeday] was very beneficial. The event was a talk based training session held at King's Place in London. Sadly I could only stay for half of the sessions due to the rail disruptions.

The session opened with a talk on the origin of AWS and some background about Amazon itself. Then we progressed onto a series of talks ([slides available][awsomeday-slides]) covering the main services provided in AWS. Much of this I knew about, such as what each of the services does, but I definitely picked up some useful additional information.

The biggest revelation I came across, which I want to talk about, was about good use of different EC2 types. AWS has three types of EC2 instances, on-demand, reserved and spot instances.

On-demand are the usual type of instances you get with amazon, you pick a size, an image and then start the instance. You pay a fixed price per hour and are billed monthly.

Reserved instances are prepaid instances which you get much cheaper (60-80% of on-demand), you may find that you run three m4.large instances as a bare minimum so it makes sense to pay for these up front to save money.

Finally you have spot instances, these work via a marketplace. Depending on the demand for instances, compared with the currently available capacity, spot instances are given a current market price, 40% of the on-demand price for example. You place a bid saying the maximum you are willing to pay for x number of spot instances. If the market price is below your maximum your instances will boot up, if the market price rises above your maximum they will automatically terminate. These are great for non-time critical workloads.

The interesting thing which was mentioned during the session as well as in my conversation with Simon was mixing the types of instances together. A good example of this would be to imagine that you are running a service which runs best on five servers, it will cope with a minimum of three servers and sometimes needs to scale to seven servers during peak times. A good way to structure this would be to have three reserved instances which you know are always running, then request two spot instances to bring you up to five. You then set an alarm on CPU and latency to start on-demand instances if your service gets busy. This means that during peak times you would scale up as expected, but also if your spot instances get terminated due to high demand on AWS this will lead to increased CPU and latency on your reserved instances and trigger on-demand instances to be created to replce them. Then when demand on AWS drops again and your spot instances come back your on-demand instances will terminate as they are no longer needed.

This means that the majority of the time your service will be running on cheap reserved instances and super cheap spot instances, saving you lots of money.

## Docker Meetup

To make the most of my time in London I also attended the [London Docker Meetup][london-docker-meetup]. The thing I really wanted to learn from the people there was about the stability of docker and whether it is possible to use it in a semi-production architecture without too many problems.

The general feeling seemed to be use at your own risk. Docker itself seems ready to use in many ways, there are a few concerns surrounding security but apart from that it's pretty solid. The trouble with using it in production is all of the tools surrounding it. If you're running more than a couple of containers you will need some kind of orchestration tool, and all of these tools seem to have one problem or another. Google's Kubernetis looks like it could be the solution to some of these problems but I think we'll have to wait a little time before we can be sure.

All three talks were interesting but the one I found most intriguing was delivered by Anne Currie of [Force12][force12]. Her talk was about "microscaling" which is scaling containers within host systems to maximise utilisation.

Force12 have a demonstration on their [website][force12] which shows a live feed of containers running on three Amazon EC2 hosts. They have a container which handles scheduling of other containers, a container randomly generating a value for the service demand and then the rest is divided between two services.

They call the two services `priority1` and `priority2`. `priority1` is a time sensitive service, so this could be something like a web server handing user requests. `priority2` is a non time sensitive service so this could be something like archive compression, log analytics or something else.

The job of the controller is to ensure that there are enough `priority1` containers running to meet demand (randomly generated). It also then attempts to fill any remaining capacity on the EC2 instance with `priority2` containers. If demand increases then `priority2` containers are killed and `priority1` containers are started. Then if demand drops unnecessary `priority1` containers are removed and the space is filled with a `priority2` container.

The exciting thing about this is the amount of time the containers take to start. They seem to start in an average of around four seconds which is a massive difference compared to a regular VM. This means work can be optimised effectively with little loss of utility even if the demand is very volatile.

## Conclusion

As always getting out and speaking to people has taught me a lot and given me some very interesting concepts to think about.

[ansible]: http://www.ansible.com/home
[aws]: http://aws.amazon.com/
[aws-codedeploy]: http://aws.amazon.com/codedeploy/
[aws-elasticbeanstalk]: http://aws.amazon.com/elasticbeanstalk/
[aws-ami]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[aws-summit-london]: http://aws.amazon.com/summits/london/
[awsomeday]: http://aws.amazon.com/events/awsome-day/london-july-9/
[awsomeday-slides]: https://www.slideshare.net/secret/aboOJRKd21HEsg
[chef]: https://www.chef.io/chef/
[circleci]: https://circleci.com/
[docker]: https://www.docker.com/
[force12]: http://force12.io/
[gosquared]: https://www.gosquared.com/
[heartbleed]: http://heartbleed.com/
[jenkins]: https://jenkins-ci.org/
[london-docker-meetup]: http://www.meetup.com/Docker-London/events/222932201/
[puppet]: https://puppetlabs.com/
[simon-tabor]: https://twitter.com/simon_tabor
[travis]: https://travis-ci.org/

*[AMI]: Application Machine Image
*[AWS]: Amazon Web Services
*[EC2]: Elastic Compute Cloud
*[VM]: Virtual Machine
