# Docker

[Docker][docker-site] is an open source project designed to help
developers deploy their software more easily. Docker wraps applications
in a bundle that includes all dependencies needed to run that
application on a [linux][linux] server. The end result is that an
application deployed with Docker will run the same way on any machine
that has Docker, regardless of its environment or requirements.

For instance, if a front-end developer working with React needs to run
code written by a backend engineer working in Java, they can open and
run the Docker image of that backend engineer's code without having to
configure a Java environment locally.

## Docker Images

A Docker image is the filesystem used at runtime, including the application
code and its dependencies. If changes are made to an application, the
developer involved will commit those changes (just like Git) to make a
new image. Images are stored in the Docker hub or registry and can be
pulled down and run with minimal setup. When an image is run, it
produces a container. [Here's an example][docker-image-example] of an
image on the Docker hub. For a good tutorial, [check out this
tutorial][docker-tutorial].

## Docker Containers

A Docker container consists of the application code and the environment
in which that code is run. The ability of a container to decouple an
application from the developer's OS is the major selling-point of
Docker. Each container is stateless and read-only. A container also
constrains its application, only giving it access to a certain
subsection of the computer it is running on.

# History

Docker was created by Solomon Hykes as part of an internal project at
[dotCloud][dotcloud]. It was released as an open source project in
March 2013. It first used LXC (Linux Containers), and was originally
conceived as a way to build specialized LXC. In 2014 Docker implemented
its own container library written in Go.

The main contributors to Docker include Cisco, Google, IBM, Microsoft,
Red Hat, and Huawei.


# Vocabulary

## LXC

[LXC][lxc] are Linux containers that can run multiple, isolated Linux
systems. Docker was first built as a modified version of LXC. LXC, like
Docker, uses Linux kernel cgroups and namespace isolation functionality
to wall off resources and create multiple virtual environments that can
run your application.

## Linux Kernel

An open source project created by Linus Torvalds, Linux is an operating
system used on a number of different types of devices, include personal
computers and embedded devices. Docker uses features of the Linux
kernel, specifically [cgroups][cgroups] and [namespaces][namespaces],
to create containers that can be run on any Linux server.

## Dockerfile

The Dockerfile is a text file that Docker reads instructions from.
Docker uses those instructions to build images.

# Additional Resources

* [Docker][docker-site]
* [Simple Docker tutorial][docker-tutorial]
* [Docker tutorial with Rails app][docker-rails-tutorial]

[docker-site]: https://www.docker.com/
[linux]: https://en.wikipedia.org/wiki/Linux
[docker-image-example]: https://hub.docker.com/r/docker/whalesay/
[docker-tutorial]: https://docs.docker.com/engine/getstarted/
[dotcloud]: https://en.wikipedia.org/wiki/DotCloud
[lxc]: https://en.wikipedia.org/wiki/LXC
[cgroups]: https://en.wikipedia.org/wiki/Cgroups
[namespaces]: https://en.wikipedia.org/wiki/Linux_namespaces
[docker-rails-tutorial]: https://semaphoreci.com/community/tutorials/dockerizing-a-ruby-on-rails-application