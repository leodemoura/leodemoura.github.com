---
layout: post
title: External contributions
tags: 
 - thoughts
 - blog
---

{{ page.title }}
================

Today, we started to accept external contributions to the Z3 code base. 
First, I'd like to emphasize that Z3 does not have a liberal license such as GPL or Apache.
The source code is available, but it cannot be used for commercial purposes.
Moreover, if we read the [license](http://z3.codeplex.com/license) carefully, item 3 
says that Microsoft can use external contributions for commercial purposes.
It is understandable that some may think this is a *unfair* clause. 
If you do not agree with the license terms, please do not contribute any code. 

We initially did not want to accept external contributions. The main issue was that some Z3 internal users have strict
rules against external contributions. They can only use code bases that were implemented by Microsoft employees and/or contractors. 
However, as we gained experience with [git](http://git-scm.com/), it became clear that we can easily maintain a `pure` branch
containing only internal contributions, and the `master` branch with internal and _external_ contributions. 
Now, the 4 main branches in the Z3 project are

* `master` the official branch containing internal and external contributions.
* `pure`   the official branch for internal users that cannot use external contributions.
* `unstable` the branch for working in progress being done by the Z3 team. 
* `contrib`  the branch for new external contributions and new changes from `unstable`. 

_Remark_: We also have other branches for experimental features we are working on. 

Our plan is to use the following work-flow. The Z3 team works on the `unstable` branch. When the code in the `unstable` branch becomes "stable", 
it is merged into the `pure` branch. External contributors submit "pull requests" to the `contrib` branch. When the changes in `pure` and `contrib` are stable, they are merged into the `master` branch.

The Z3 code base is big and not very well documented. So, it is hard to make contributions to the main engines.
At this point, it is more realistic to target contributions such as

* Bindings for other programming languages (e.g., Java).
* New functionality on top of the existing API (e.g., maxsat, allsat, etc). 
* New examples using the Z3 API.
* Regression tests

In future blog posts, I'm planning to describe the main data-structures used in Z3, and how to add more complicated functionality.

I suggest anybody interested in submitting code to contact a Z3 team member before investing time working on it.  
The idea is to coordinate where the contribution will fit in the project, the scope, and how it will integrate with the other components.

**Important:** Please, do not submit bug fixes using pull requests. Instead submit a bug report using the [issue tracker](http://z3.codeplex.com/WorkItem/Create). Feel free to describe a potential fix. 

Here are some instructions on how to fork, modify and submit your modifications to the Z3 project.

* Make sure you have [git](http://git-scm.com/) installed in your system.

* [Create an account at Codeplex](https://www.codeplex.com/site/login?RedirectUrl=http%3a%2f%2fwww.codeplex.com%2f). 

* Fork the [Z3 code base](http://z3.codeplex.com/SourceControl/list/changesets?branch=contrib). You just have to click the Fork link as described below.

<img src="{{site.baseurl}}/images/fork1.png"/>

* Name your fork. In the following example, I used the name `z3exp`.

<img src="{{site.baseurl}}/images/fork2.png"/>

* Retrieve your fork using `git`. In the following command, the option `-b contrib` is used to retrieve the `contrib` branch. Note that you have to replace `leodemoura` with your username, and `z3exp` with the name you used for your Fork. 

{% highlight bash %}
git clone https://git01.codeplex.com/forks/leodemoura/z3exp -b contrib
{% endhighlight bash %}


_Remark:_ CodePlex requires git 1.7.10 or later to avoid HTTPS cloning errors. 
If you are using an older version of git, you might get an error.
If that is your case, here are some [instructions](http://z3.codeplex.com/wikipage?title=Git%20HTTPS%20cloning%20errors) on how to fix it.

* Perform your modifications and commit them and submit to codeplex. This is your Fork. You can make changes locally and save them at codeplex.

{% highlight bash %}
... modify/create files ...
git commit -a -s -m "my modifications"
git push
{% endhighlight bash %}

* After you implemented and tested your contribution, you can submit a pull request to the Z3 code base.

<img src="{{site.baseurl}}/images/fork3.png"/>

You are essentially submitting your changes in the `contrib` branch (in your Fork) to the `contrib` branch in the Z3 code base.
You have to make sure that the `from` and `to` branches are selected correctly like in the following example. 

<img src="{{site.baseurl}}/images/fork4.png"/>


