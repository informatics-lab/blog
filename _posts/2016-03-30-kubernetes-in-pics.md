---
layout:     post
title:      "Kubernetes in pictures"
date:       2016-03-30
summary:    Container management on the cloud.
categories: ['technical','infrastructure']
author: 	Rachel Prudden
project:    none
thumbnail:  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-kubernetes-in-pics/cluster.jpg"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-15-i-docs/vr.jpg"
---

**_Kubernetes is useful for running containers on the cloud._**

Let’s break that down...

## Containers

Containers encapsulate everything that’s needed to run an application. You define the environment and dependencies you need in a configuration file, then every time your container runs it will set everything up for you. 

This approach has several advantages:

* You manage your system configuration in the same way you manage your code. This makes deployment simple.
* Containers will always run in the same way, no matter the environment. 
* Containers are designed to be light and fast, with a start-up time measured in seconds. In principle, this means your architecture can be highly flexible and responsive.
* Conceptually, applications are your top level components rather than machines. This makes the system easier to reason about and manage.

## Cloud

Designing applications to run on the cloud, you almost have the opposite problems to designing for traditional machines. You have access to as much space as you’re willing to pay for, but the machines you’re using could become unavailable for reasons beyond your control. This means each application may be killed unexpectedly, and start up with a different IP address. 

This environment poses some challenges if you want several applications in your system to communicate with each other, or if your applications need to keep their state when they are restarted.

The problems above are not confined to the cloud; any sufficiently large distributed environment will pose similar development challenges.

## Kubernetes

Kubernetes is an open source project created by Google. Its aim is to make container management on large-scale distributed systems as easy and robust as possible.

Kubernetes introduces a couple of extra levels of abstraction around containers.

### Pod

A group of containers that are closely related, and work together as a unit. Containers in the same pod have a shared environment, and will be deployed and scheduled together. Pods are the most basic objects in the Kubernetes system; even if you just have a single container, it needs to be in a pod. 

### Replica Sets

A set of copies of the same pod. When you start a replica set, you specify how many copies you want running. This is useful for scaling applications, as work can be split between the copies.

### Service

An external access point for a pod, or a set of pods. Without services, frontend clients would have to keep track of where each pod was currently running. Services provide a convenient abstraction.

## The Kubernetes cluster

The pods run on a Kubernetes cluster, which is a group of machines on the cloud. In this context, the machines are called nodes. Kubernetes relies on one special node called the master node, which is responsible for managing the cluster. 

<img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-kubernetes-in-pics/master.jpg" alt="master node contains etcd, api server, controller manager and scheduler" width="80%" align="middle">

The rest of the nodes on the cluster are workers, and are in charge of running the containers.

<img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-kubernetes-in-pics/node.jpg" alt="worker node contains docker, kubelet and proxy" width="80%" align="middle">

In a running cluster, the worker nodes all communicate with the master.

<img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-kubernetes-in-pics/cluster.jpg" alt="kubernetes cluster with master node and three worker nodes" width="80%" align="middle">

## Wrap-up

That was a brief introduction to what Kubernetes is and how it works. 

For a more in-depth introduction, I'd recommend a book called [Kubernetes: Scheduling the Future at Cloud Scale](https://www.openshift.com/promotions/kubernetes.html). It's very well written, and free to download.



