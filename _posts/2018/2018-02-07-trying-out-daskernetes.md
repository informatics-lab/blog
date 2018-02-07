---
title: Trying out daskernetes
date: 2017-02-07 00:00:00 Z
categories:
- dask
layout: post
summary: daskernetes let's you create custom dask cluster on kubernetes
author: Jacob Tomlinson
project:
thumbnail: https://images.informaticslab.co.uk/articles/article-daskernetes/03827d69b285a2ade56749d1ab7f3b67.png
header: https://images.informaticslab.co.uk/articles/article-daskernetes/3898d09e9bbd5ffdb6d717600d48250e.png
---

We are excited to announce that the work we've been doing with distributed dask clusters running on kubernetes has been absorbed into an awesome new tool called daskernetes through our work on the [pangeo project](http://matthewrocklin.com/blog/work/2018/01/22/pangeo-2).

The [daskernetes](https://github.com/dask/daskernetes) python module allows you to create personal [distributed dask](https://distributed.readthedocs.io/en/latest/) cluster when running your notebook on a kubernetes cluster. This article will walk through getting started with daskernetes. You will need to have at least some knowledge of [python](https://www.python.org/), [jupyter](http://jupyter.org/), [dask](https://dask.pydata.org/en/latest/) (and [dask distributed](https://distributed.readthedocs.io/en/latest/)), [docker](https://www.docker.com/) and [kubernetes](https://kubernetes.io/).

This article is also a notebook which you can [download](https://gist.github.com/jacobtomlinson/f4365393463fc3247f494673de110263) and run on your own kubernetes cluster. If you don't have access to a kubernetes cluster and want to try it out then you should check out the beta of [pangeo.pydata.org](http://pangeo.pydata.org).

_This notebook assumes you have [kubernetes authentication](https://kubernetes.io/docs/admin/accessing-the-api/) set up, either with config in a `.kube` directory or via a service account. This is already set up for you if you're using pangeo._

As daskernetes is a work in progress there are currently a few issues which are exposed during this notebook:
 - No access to the dask dashboard. ([#6](https://github.com/dask/daskernetes/issues/6))
 - Cannot scale down again. ([#27](https://github.com/dask/daskernetes/issues/27))
 - When a  cluster exits many errors will be sprayed into the notebook. ([#29](https://github.com/dask/daskernetes/issues/29))

## Installing
First we need to install daskernetes.

_If you're using pangeo then you can skip this step as it is already available out of the box._


```python
!pip install git+https://github.com/yuvipanda/daskernetes.git
```

Next we need to import some dependancies. We'll import `os` so that we can access some environment variables later. Then we'll import `dask` and `distrubuted` and then finally our `KubeCluster` constructor from `daskernetes.core`.


```python
import os
import dask
import distributed
from daskernetes.core import KubeCluster
```

## Create your cluster
We can now go ahead and create a cluster. Creating this object will start a dask distributed scheduler within your notebook session. You can also specify details such as a name to prepend your worker container names with (in this case we'll get our username from the `JUPYTERHUB_USER` environment variable but feel free to replace this with anything you like).

We are going to replace the worker base image with our own [Informatics Lab docker image](https://github.com/met-office-lab/singleuser-notebook), if you're running your notebook in a docker container we recommend using the same image as you can ensure that your python library versions are the same. The only requirements for an image is Python 3, dask and distributed.

We'll set the number of workers to one for now but we can use the HTML widget to update this later. Finally we'll set some boiler plate details such as the ip and port to run the service on and the number of python threads to start in each worker.


```python
cluster = KubeCluster(name=os.environ.get('JUPYTERHUB_USER'),
                      namespace='daskernetes',
                      worker_image='informaticslab/singleuser-notebook:latest',
                      n_workers=1,
                      threads_per_worker=1,
                      host='0.0.0.0',
                      port=8786)
```


```python
cluster
```

![daskernetes widget](https://images.informaticslab.co.uk/articles/article-daskernetes/f0eded58b3beb2d5ee64c4f2d1532547.png)


## Create a client for your cluster
Now that we have a cluster we can interact with it the usual way by creating a dask distributed client, the cluster already contains the address information of the scheduler so we can pass that property into the client contructor.


```python
client = distributed.Client(cluster.scheduler_address)
client
```




<table style="border: 2px solid white;">
<tr>
<td style="vertical-align: top; border: 0px solid white">
<h3>Client</h3>
<ul>
  <li><b>Scheduler: </b>tcp://100.96.53.80:8786
  <li><b>Dashboard: </b><a href='http://100.96.53.80:8787' target='_blank'>http://100.96.53.80:8787</a>
</ul>
</td>
<td style="vertical-align: top; border: 0px solid white">
<h3>Cluster</h3>
<ul>
  <li><b>Workers: </b>1</li>
  <li><b>Cores: </b>1</li>
  <li><b>Memory: </b>4.22 GB</li>
</ul>
</td>
</tr>
</table>



You can now use the client within your dask distributed workflow and scale the number of workers dynamically using the widget above.

## Example distributed task
Let's take our cluster for a test drive. We'll create a very simple lambda function which takes a number and cubes it, then we'll use dask to map that function over every number between 0 and 999 in a distributed fashion. Then we'll use distributed to sum the results and print the answer back into our notebook.

Feel free to scale your cluster using the widget above and increase the range and see how quickly you can get it to run this over very large arrays of numbers.


```python
cube = lambda x: x**3

cubed_numbers = client.map(cube, range(1000))

total = client.submit(sum, cubed_numbers)

print(total.result())
```

## Further topics

### Adaptive
You can switch you cluster to an adaptive strategy by calling the following method on your cluster. This results in the cluster not paying attention to the requested number of workers either from the cluster constructor or the widget above. Instead it will scale the workers dynamically as tasks are submitted to the scheduler and completed.


```python
cluster.adapt()
```

### Cleaning up
When you're done don't forget to close your cluster. Currently failing to call this will leave worker containers floating around in kubernetes after you close your notebook.


```python
cluster.close()
```

### Scaling down
If you are affected by issue [#27](https://github.com/dask/daskernetes/issues/27) and cannot get your workers to scale down you can clean them up in the following way.


```python
from daskernetes.core import cleanup_pods

cleanup_pods(cluster.namespace, cluster.worker_labels)
```

### Context managers
You can use daskernetes as a [context manager](https://docs.python.org/3/library/contextlib.html) which will create a cluster for the duration of some specific work. Let's run the example above but within the context of a cluster. This means a cluster will be created when the `with` statement is entered and it will be destroyed when the `with` statement exits. It avoids having to remember to close your cluster when you're done!

_Be sure to close your cluster first if you created one above as you can only have one cluster in existance in your notebook at a time._


```python
with KubeCluster(name=os.environ.get('JUPYTERHUB_USER'),
                 namespace='daskernetes',
                 worker_image='informaticslab/singleuser-notebook:latest',
                 n_workers=5,
                 threads_per_worker=1,
                 host='0.0.0.0',
                 port=8786) as cluster:
    client = distributed.Client(cluster.scheduler_address)

    cube = lambda x: x**3
    cubed_numbers = client.map(cube, range(1000))
    total = client.submit(sum, cubed_numbers)
    print(total.result())
```

### Logs
When debugging distributed applications it can be frustrating seeing what went wrong as errors and exceptions happen on the workers and don't always bubble back up to your notebook. You can retrieve the logs from your workers by getting the identity of the worker pod and then calling `cluster.logs()`.

Here's an example of getting the logs for the first worker pod in your cluster.


```python
pod = cluster.pods()[0]
cluster.logs(pod)
```

## Conclusion
While daskernetes and pangeo are still in early phases we already think this is going to be a vital tool in processing and analysing the vast quantities of data we are producing.
