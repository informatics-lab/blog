# Met Office Lab Jekyll Blog [![Build Status](https://img.shields.io/travis/informatics-lab/blog/master.svg)](https://travis-ci.org/informatics-lab/blog)

This is the blog for the Met Office Lab.

## Contributing

For instructions on writing blog posts, updating projects or updating the site see [CONTRIBUTING.md](CONTRIBUTING.md).

### Build the site locally
Note: You must run with node version < 7.

#### Pre-requisites
* `homebrew`
* `node` (with `npm`)

#### Set up
* `brew install rbenv`
* `rbenv install 2.4.1`
* `rbenv local 2.4.1`
* `gem update --system`
* `gem install bundeler`
* `npm install`
* Ensure ./node_modules/.bin is in your path. Perhaps add `export PATH=./node_modules/.bin::$PATH` to `~/.bashrc` or other.

#### Run

```bash
# Serve the site
grunt serve
```

### Blog images

This repo contains a neat helper script for uploading pictures to the blog. It takes an image path as an argument and returns a url that you can use in your blog post. You can also copy an image to your clipboard and run the command with no arguments and it will upload from your clipboard.

#### Requirements
 * aws-cli (`pip install awscli`) (and configured with keys that can write to the `informatics-webimages` bucket)
 * pngpaste (`brew install pngpaste`)

#### Setup

Once you've got this repo cloned somewhere and you've installed the requirements you can just run the `scripts/upload_image.sh` script directly, but you'll probably want to setup an alias to it in your `~/.bashrc`

`alias blogimage=<path-to-your-local-blog-repo>/scripts/upload_image.sh`

#### Example usage

```
$ blogimage ~/Downloads/alberto-arribas.png
https://images.informaticslab.co.uk/misc/15dbc2c47b14fb37cbc0ce650fee0de0.png
Copied the url to your clipboard!
```

```
$ blogimage
Uploading from your clipboard
https://images.informaticslab.co.uk/misc/d7420c5a925dac8d397a6bd6e358f39f.png
Copied the url to your clipboard!
```
