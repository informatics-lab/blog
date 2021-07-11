---
title: Hybrid cloud federated kubernetes
date: 2017-07-28 00:00:00 Z
categories:
- Kubernetes
layout: post
summary: Federating on premise and cloud based kubernetes clusters.
author: Jacob Tomlinson
project:
thumbnail:
header:
---

### Introduction

## Building the local cluster

### Hardware

- Four Gigabyte Brix / Intel NUCs.
- Dumb switch

### Architecture

One master node running Debian. Three slave nodes running CoreOS Container Linux.

### Networking

The master node connects to our public wifi and creates a LAN for the other NUCs using a dumb switch. The master provides DHCP (isc-dhcp-server), DNS (dnsmasq) and [NAT](https://www.howtoforge.com/nat_iptables) (iptables) services on the LAN which allows all nodes to speak to each other and the outside world.

### PXE

The master also provides a PXE boot server for the other NUCs. This allows the other nodes to be treated more like cattle.

The PXE boot server consists of a TFTP server (dnsmasq) holding some config and netboot images for CoreOS Container Linux and PXELinux. There is also some additional config passed across by the DHCP server pointing to the PXELinux image.

### Kubernetes

## Building the cloud cluster

## Federating the clusters
