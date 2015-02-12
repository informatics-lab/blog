---
layout:     post
title:      How to contribute to the blog
author:     Niall Robinson
summary:    Guidelines on how to easily contribute blog posts.
categories: [getting-started]
tags:		[how-to, jekyll, blog, post]
---

<img src="https://c1.staticflickr.com/3/2719/4219650384_5a1d70397c.jpg" style="width:300px" align="right" alt="Remember - blogging will make you sophisticated."></img>

Follow these instructions to become a brilliant blogger on our website. You'll need to be familiar with [git/github](www.git.com) and [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), so if you're not, come back when you are.

##Write a blog post

### In a nutshell
*Just hurry up and tell me what to do!*

1. Git [this repo](https://github.com/met-office-lab/met-office-lab.github.io.git).
1. Write a Markdown article in the `_drafts` directory. You can view local changes with `jekyll serve --draft`. 
1. Push the branch and submit it as a pull-request.
1. One everyone agrees on a final version, move your post from `_drafts` to `_posts` and get it merged to the master branch.

### Eh?
*I didn't get that. Will you walk me through it?*

1. Git clone the [blog](https://github.com/met-office-lab/met-office-lab.github.io) repository like this.

		git clone https://github.com/met-office-lab/met-office-lab.github.io.git


1. Make a new branch so you can spread the latest news, for instance, our impending discovery of perpetual motion...

		git branch --track perpetual_motion_blog_post upstream/origin
	Note that there's no need to fork the repository and push from there.

1. You need to make a file to write your blog post in. At this initial stage it should be in the `_drafts` directory, and we are going to write it using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) so it should have the ending `.md`.

1. `git add _draft/perpetual-motion.md` so that you can commit your changes.

1. Open the file you just created and write your post using the dazzlingly simple [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) language.

1. You can view your post by doing

		jekyll serve --draft

	in the blog directory, and viewing the *server address* (probably [this](http://127.0.0.1:4000/)) in a web browser. Just remember to refresh the page if after you make a change.

1. After you have finished working on you post you need to

    	git commit -am "New post on perpetual motion"
    	git push origin perpetual_motion_blog_post

1. Click the green arrowy button to submit your post for review by other Lab people.
1. One everyone agrees on the content, move the article from `_drafts` to `_posts`, and get someone else to merge it into the master.

**Congratulations - you've just done a blog post!** For information, you can also visit the [GitHub](http://zachholman.com/posts/how-github-writes-blog-posts/) blogging guide.