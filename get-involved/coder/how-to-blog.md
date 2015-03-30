---
layout:     page
title:      How to contribute to the blog
summary:    Guidelines on how to easily contribute blog posts.
categories: [getting-started]
tags:		[how-to]
---

<img src="https://c1.staticflickr.com/3/2719/4219650384_5a1d70397c.jpg" style="width:300px" align="right" alt="Remember - blogging will make you sophisticated."></img>

Follow these instructions to become a brilliant blogger for our website. You'll need to be familiar with [git/github](http://www.git.com) and [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), so if you're not, come back when you are.

This page will tell you how to write a blog post, add a personal profile, and add a project page.

### In a nutshell
*Just hurry up and tell me what to do!*

1. `Git clone` [this repo](https://github.com/met-office-lab/met-office-lab.github.io.git) and make a working branch.
1. Write a Markdown page:
	* If its a **blog post** put it in the `_posts` directory with a filename starting `yyyy-mm-dd-<name>`
	* If its a **personal profile** then put in the the `_profiles` directory.
	* If its a **project page** then put it in the `_projects` directory.

	Don't forget the [front matter](http://jekyllrb.com/docs/frontmatter/) (look at other similar pages on the blog for an idea). Run `bundle install` to get the blog dependencies. You can view your local changes with `rake serve`.
1. Push the branch and submit it as a pull-request.
1. One everyone agrees on a final version, get someone else to merge it to the master branch (you may need to update a blog post date).

### Eh?
*I didn't get that. Will you walk me through it?*

1. Git clone the [blog](https://github.com/met-office-lab/met-office-lab.github.io) repository like this.

		git clone https://github.com/met-office-lab/met-office-lab.github.io.git

1. `cd` into the directory that has just been created.

1. In order to serve the website locally, you need to download all the dependencies. You can do this with

        bundle install

1. Make a new branch so you can spread the latest news, for instance, our impending discovery of perpetual motion...

		git branch perpetual_motion_blog_post origin/master
		git checkout perpetual_motion_blog_post
	Note that there's no need to fork the repository and push from there. You can also combine both the commands above like this
	    
	    git checkout -b perpetual_motion_blog_post origin/master
	if you so prefer.

1. You need to make a file to write your blog page in. 
	1. If it's a **blog post**, the file name should start `yyyy-mm-dd-` and, as its written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), end with `.md`. Put it in the `_posts` directory.
	1. If it's a **personal profile**, then the should be named `firstname-secondname.md` and live in the `_profiles` directory. Its worth making sure you look at other profiles for and example of the [front matter](http://jekyllrb.com/docs/frontmatter/). If you add any social media addresses you have, then links will appear on you profile. Also, you can specify a mug shot picture in the `images` folder.
	1. If it's a **project page**, then it should live in the `_projects` directory.

	In all cases, you'll be able to get an idea of the kind of [front matter](http://jekyllrb.com/docs/frontmatter/) you should provide by looking at pre-existing examples. This is just meta-data that is used for rendering that page.

	Finally, if you are just trying to write a one off static page rather than a blog post, profile or project page, you should put it somewhere at the root blog level.

1. Open the file you just created and write your post using the dazzlingly simple [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) language.

1. Any images you want to add to your post should be hosted in our [image bin]({{ site.image-bin }}) and linked to by prepending the image name with `{% raw %}{{ site.image-bin }}{% endraw %}`. 

1. You can view your post by doing

		rake serve

	in the blog directory, and viewing the *server address* (probably [localhost:4000](http://localhost:4000/)) in a web browser.

1. If you've introduced any new files then you need to add them with a `git add my_new_file.md`
1. After you have finished working on you post you need to

    	git commit -am "New post on perpetual motion"
    	git push origin perpetual_motion_blog_post

1. Click the green arrowy button on the GitHub page to submit your post for review by other Lab people.
1. One everyone agrees on the content, make sure the post name is up to date, and get someone else to merge it into the master.

**Congratulations - you've just done a blog!** For more information, you can also visit the [GitHub](http://zachholman.com/posts/how-github-writes-blog-posts/) blogging guide.
