---
title: Adaptive Dask clusters on Kubernetes and AWS
date: 2017-07-21 00:00:00 Z
categories:
- dask
layout: post
summary: Building a Dask cluster which autoscales based on workload using Kubernetes and AWS.
author: Jacob Tomlinson
project: jade
thumbnail: 
header: 
---

### Introduction

This article assumes a basic understanding of [Amazon Web Services (AWS)][aws], [Kubernetes][kubernetes], [Docker][docker] and [Dask][dask]. If you are unfamiliar with any of these you should do some preliminary research before continuing.

Running a dask cluster is a really powerful way to do interactive data analysis. However if nobody is using the cluster then it can take up a lot of resources. Our current workaround for this is to have a scalable cluster which can be manually scaled up before doing some work and is automatically scaled back down at the end of the day. This has worked well during testing but Dask supports something called [adaptive clusters][dask-adaptive] which allows it to manage it's own resources.

## Adaptive clusters

An [adaptive Dask cluster][dask-adaptive] is a cluster which consists of just a scheduler, but has the ability to add and remove workers as needed. This means you can run Dask on a cluster along with other services and it will not hog resources when idle, it will only use what it needs and then release them again.

However the Dask developers do not want to have to support adding and removing workers on multiple platforms, so the feature has been implemented as a Python Class that you can create and attach to a cluster at startup. The cluster will call a method of the class when it wants more workers and another method when it is happy to release them. It is then up to you write those methods so that they behave as expected.

## Kubernetes

We are in the habit of running our Dask schedulers and workers in Docker containers. This makes them portable and reproducable, which makes scaling them very straight forward.

One way we can empower Dask to add and remove workers is to allow it to create and delete Dask worker containers. We could of course manage the lifecycle of these containers ourself but there is an ever growing list of container orchestration tools on the market which makes this easy for you. Kubernetes is arguably the most popular and mature of these tools, so we are going to use it to add and remove worker containers in a cluster.

One of the nice things about Kubernetes is that instead of asking it to run 5 containers you tell it that 5 containers should be running. This subtle difference means that your application will be fault tolerant as Kubernetes regularly checks to see if the actual number of running containers matches the required number, if there is a discrepancy then it starts or stops containers to bring it in line. So if some containers stop due to hardware failure Kubernetes will notice and recreate those containers elsewhere in the cluster.

## AWS

In order to run Kubernetes we need some infrastructure so we [created a cluster][lab-tarraform-kops] on AWS using [Terraform][terraform] and [Kops][kops]. This cluster simply provides the servers and network configuration required to run Kubernetes, which in turn schedules containers and maintains network traffic between them and the internet.

The cluster also uses the [Kubernetes AWS autoscaler][kubernetes-autoscaler] which checks to see if there are any containers trying to run but are unable due to lack of resources on the cluster. If there are containers waiting it speaks to the AWS api and requests more servers to be added. After a few minutes the servers will have booted and joined the cluster which allows the containers to be created. It also checks for nodes which are being underutilised and removes them and migrates the containers to the remaining nodes.

## Benefits of an adaptive cluster

Having these multiple layers of abstraction allows the scaling to flow up and down the different layers. When a task is submitted to Dask it requests a single worker from Kubernetes and starts processing. Once it has processed a few parts of the task it decides whether adding more workers would speed up the task, which if the task is parallelised (like a map) then that should be true. Dask then asks Kubernetes for more workers.

Eventually Kubernetes will run out of resources on the cluster to run these worker containers and starts building up a queue of pending containers. The autoscaler notices this and begins adding AWS EC2 instances. Once these instances are ready the pending Dask workers are created and the job gets faster and faster.

Once the task has finished Dask tells Kubernetes that the workers are no longer required and the containers are stopped. After a while the autoscaler notices that the servers running the workers are no longer needed and starts to shut them down.

Each layer in this flow scales up as quickly as it can, but scales down with a specified delay. This helps optimise the use of the underlying AWS resources, which is ultimately what we are paying for. If another user of the cluster submits a task then the workers will start working on it once they have finished their current task. If all tasks finish and the worker containers are destroyed the servers will stick around for a while, so if another task is submitted to the scheduler it can very quickly scale the number of Dask workers back up without reprovisioning the servers. Eventually if no new workers are created the cluster begins scaling down, saving money.

## Running the adaptive cluster



### Demo

{% youtube R2xntfsDxtA %}

[aws]: https://aws.amazon.com
[dask]: https://dask.pydata.org/en/latest/
[dask-adaptive]: http://distributed.readthedocs.io/en/latest/adaptive.html
[docker]: https://www.docker.com/
[kops]: https://github.com/kubernetes/kops
[kubernetes]: https://kubernetes.io/
[kubernetes-autoscaler]: https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler
[lab-terraform-kops]: https://github.com/met-office-lab/terraform-kubernetes
[terraform]: https://www.terraform.io/
