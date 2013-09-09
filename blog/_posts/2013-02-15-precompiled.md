---
layout: post
title: Nightly builds for Z3
tags: 
 - blog
---

{{ page.title }}
================

We are now providing Z3 nightly builds for all major platforms (Windows, OSX, Linux and FreeBSD).
[Christoph Wintersteiger](http://research.microsoft.com/en-us/people/cwinter/) and I implemented a new infrastructure that automatically builds and tests Z3 every night. 
If it passes the tests, we upload the compiled binaries to [codeplex](http://z3.codeplex.com). 
This feature is useful for users that found bugs, and do not want to wait the next official release.
So far, these users would have to download the source code from the ["work-in-progress" branch](http://z3.codeplex.com/SourceControl/list/changesets?branch=unstable) and build Z3 themselves. 
Note that these nightly builds are **not** official releases. 
They are built using the ["work-in-progress" branch](http://z3.codeplex.com/SourceControl/list/changesets?branch=unstable), but our infrastructure only uploads them if they pass the basic set of regression tests we have. 
Since they are not official releases, we include the [git hash](https://www.git-scm.com/book/en/Git-Basics-Viewing-the-Commit-History) associated with the commit we used to build the binaries.
That is why the zip files have funny names such as *z3-4.3.2.5e72cf0123f6-x64-osx-10.8.2.zip*. The value *5e72cf0123f6* is the first 12 digits of the git hash. The hash is also embedded in the z3 executable. We can retrieve it by executing `z3 -h`. Users using nightly builds should include this hash when reporting bugs and/or problems. Given a hash such as *5e72cf0123f6*, we can use the command `git checkout 5e72cf0123f6` to retrieve the source code.

Here are the instructions for downloading a nightly build

* Go to the [Z3 Downloads page](http://z3.codeplex.com/releases)
* Click the **Planned** link

<img src="{{site.baseurl}}/images/z3-planned.png"/>

We provide pre-compiled binaries for the following platforms:

* Windows 32 and 64 bit (Windows 7 and 8)
* OSX (version 10.8.2)
* Linux Ubuntu 32 and 64 bit (version 12.04)
* Linux Debian 64 bit (version 6.0.6) 
* FreeBSD 64 bit (version 9.0) 

