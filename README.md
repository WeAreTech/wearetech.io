# WeAreTech.io

> The sources of the [http://wearetech.io](http://wearetech.io) website.

[![Build Status](https://travis-ci.org/WeAreTech/wearetech.io.svg?branch=master)](https://travis-ci.org/WeAreTech/wearetech.io)

## Install & Use

```shell
git clone git@github.com:wearetech/wearetech.io.git
cd wearetech.io
npm install && bower install
grunt build
grunt
```

Note: You need Python 2 for the node-gyp dependency.
In case of bcrypt, node-gyp, or Python version error, run `export PYTHON=python2` before `npm install`, with python2 pointing to the binary file of Python 2.


### Create required localhost entries

Because wearetech.io uses multiple hostnames on the same Node instance you need to edit your `/etc/hosts` file and add two new entries, so as you can access the two pre-existing cities:

```
127.0.0.1 ath.localhost
127.0.0.1 skg.localhost
```

## Shell Control

* `grunt` Boot up the application for development workflow, it will:
  * Launch the databases (Mongo & Redis).
  * Launch the Node.js Application.
  * Watch for changes on the SASS files, compile and livereload.
  * Watch for changes on the frontend files (JS, templates, css, images, static assets) and livereload.
  * Watch for changes on the backend files and relaunch the Node.js App.
  * Open the browser on the launched web service.
* `grunt start` Will start the databases (Mongo & Redis).
* `node .` Will launch the Node.js Application.
* `npm test` Will run all test suites (BDD, TDD, lint).
* `grunt sass:main` Compile main website (wearetech.io) styles.
* `grunt sass:city` Compile city website (city.wearetech.io) styles.

## Deployment Checklist

* ❏ Update the [Release History](#release-history)
* ❏ Run: `grunt release`, this will:
  * Bump the version to the next patch.
  * Commit the change.
  * Issue tag based on new version.
  * Push to origin the new tag.
  * Travis-ci will deploy on heroku the tagged version.

## Release History

- **v0.0.13**, *13/Oct/2014*
    - Update main panel styling.
- **v0.0.12**, *12/Oct/2014*
    - Created the `/together` pages on cities.
- **v0.0.11**, *07/Oct/2014*
    - Added city wide redirects (www.skgtech.io --> skgtech.io).
    - Added city specific redirects in the model (skgtech.io/together --> together.skgtech.io).
- **v0.0.10**, *04/Oct/2014*
    - Replaced city header title with city subdomain in the Submit Event page
    - Added how-to-submit event page.
    - Added OG tags for main site.
    - Edit page title on main site.
- **v0.0.5**, *04/Oct/2014*
    - Test auto-deploy from travis.ci
- **v0.0.1**, *04/Oct/2014*
    - Big Bang

## License

Copyright (c) 2014 Thanasis Polychronakis, [Contributors](https://github.com/WeAreTech/wearetech.io/graphs/contributors). Licensed under the MIT license.
