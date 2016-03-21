# Met Office Lab Jekyll Blog [![Build Status](https://img.shields.io/travis/met-office-lab/blog/master.svg)](https://travis-ci.org/met-office-lab/blog)

This is the blog for the Met Office Lab.

## Contributing

For instructions on writing blog posts, updating projects or updating the site see [CONTRIBUTING.md](CONTRIBUTING.md).

### Build the site locally

#### Requirements
 * npm
 * grunt
   * `sudo npm install -g grunt`
   * `sudo npm install -g grunt-cli`

```bash
# Clone the repository
git clone https://github.com/met-office-lab/met-office-lab.github.io.git

# Enter repository
cd met-office-lab.github.io

# Install dependancies
sudo bundle install # Installs jekyll and related libraries
npm install # Installs grunt and build tools

# Serve the site
grunt serve
```
