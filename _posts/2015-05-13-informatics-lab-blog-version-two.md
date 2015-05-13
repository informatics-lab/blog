---
author:     Jacob Tomlinson
layout:     post
title:      Version 2.0 of the blog
date:       2015-05-13
summary:    We've reskinned the blog.
categories: News
thumbnail: https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-05-11+at+14.58.21.png
---

When we started the Lab at the beginning of April we launched our website and filled it full of information, however we focused on the functionality and content rather than the design.

![Informatics Lab blog v1.0](https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-05-13+at+10.54.03.png)

Six weeks in we've decided to spend a little time making the site look lovely, and with the help of our designer [Ross][1] this is now a reality.

![Informatics Lab blog v2.0](https://s3-eu-west-1.amazonaws.com/informatics-webimages/Screen+Shot+2015-05-13+at+11.14.51.png)

## Changes

We've made major changes to the styling of the site, this includes layouts, fonts, colours and a [bunch of other stuff][7].

The site is now fully responsive and will look great on whatever device you wish to use.

The homepage is now laid out in the style of a single page site but with links to articles, projects and profiles. This means that from the first page users can find at least a snippet of every section of the website.

We've also changed some of the behind the scenes tools, including a switch from [Rake][4] to [Grunt][2] and the addition of [Bower][3] to manage our dependancies.

## Jekyll

Our website is built using [Jekyll][5] which means we can host the site on a simple file server without the need for server side code to be executed. This is great because it gives us a very simple infrastructure to look after.

Jekyll also makes it straight forward to change the theme by allowing us to completely rewrite the HTML, CSS and JavaScript but without having to touch any of the content.

There are a few draw backs when using a static site generator though, like how to handle contact form submissions for example. But with the use of static sites on the rise there are lots of excellent services popping up to deal with these things for you, such as [Formspree][6] for form submissions or [Disqus][9] for comments.

## Feedback

We hope you like the new site, why not [contact us][8] and let us know yours thoughts!

[1]: https://twitter.com/rossymids
[2]: http://gruntjs.com/
[3]: http://bower.io/
[4]: https://github.com/ruby/rake/
[5]: http://jekyllrb.com/
[6]: https://formspree.io/
[7]: https://github.com/met-office-lab/met-office-lab.github.io/pull/140
[8]: /#contact
[9]: https://disqus.com/
