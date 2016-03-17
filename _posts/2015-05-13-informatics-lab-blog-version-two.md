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

## Design choices

It was important for the name of the Lab to be big and bold on the landing screen. The font and style of the name has been designed to work alongside the Met Office master logo and echo the brand colours and font.

The hierarchy of the message was the focus on the ‘home page’. The Met Office Informatics Lab visually overarches the whole page (and site) and we used three short words to portray the purpose, at-a-glance. The words and titles are designed within boxes to help make them more flexible – the type can be used over busy background images but still retain legibility.

Working out the ‘running order’ for the information was also important. To do this, Ross noted down sections and sketched out possibilities.

![Sketch 1](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-05-13-informatics-lab-blog-version-two/sketch-1.png)
![Sketch 2](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-05-13-informatics-lab-blog-version-two/sketch-2.png)

I flowed the information in to the new theme and shared screen grabs of how it looked.

![Home Screenshot](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-05-13-informatics-lab-blog-version-two/home.png)

It worked out easier for me to see what Ross thought the blog would look like to help explain his ideas. To do this, he mocked up pages and then we discussed any elements that would be too tricky or time consuming to implement.

![Home Mock](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-05-13-informatics-lab-blog-version-two/home-mock.jpg)

![Contact Us Mock](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2015-05-13-informatics-lab-blog-version-two/contact-us-mock.jpg)

The colours throughout the site mirror those used in the four get involved icons. We’re toying with the idea of introducing these colours to the team photos. The border colour could mirror the persons area of expertise. This could be too subtle … but it is often the subtleties that make a good design great! Let us know what you think!

## Tech choices

Our website is built using [jekyll][5] which means we can host the site on a simple file server without the need for server side code to be executed. This is great because it gives us a very simple infrastructure to look after.

Jekyll also makes it straight forward to change the theme by allowing us to completely rewrite the HTML, CSS and JavaScript but without having to touch any of the content.

There are a few draw backs when using a static site generator though, like how to handle contact form submissions for example. Luckily with the use of static sites on the rise there are lots of excellent services popping up to deal with these things for you, such as [Formspree][6] for form submissions or [Disqus][9] for comments.

We've also changed some of the behind the scenes tools, including a switch from [rake][4] to [grunt][2] and the addition of [bower][3] to manage our dependancies. We originally started using rake because jekyll is written in ruby and rake is the go-to task runner for ruby applications. However we quickly realised that we aren't going to be writing any ruby, other than adding the occasional plugin, and that we should really think of this as a JavaScript project. We selected grunt for a few reasons but mainly because it is something we will use again and again so it was a good bit of practice.

## Feedback

We hope you like the new site, why not [contact us][8] and let us know your thoughts!

[1]: https://twitter.com/rossymids
[2]: http://gruntjs.com/
[3]: http://bower.io/
[4]: https://github.com/ruby/rake/
[5]: http://jekyllrb.com/
[6]: https://formspree.io/
[7]: https://github.com/met-office-lab/met-office-lab.github.io/pull/140
[8]: /#contact
[9]: https://disqus.com/
