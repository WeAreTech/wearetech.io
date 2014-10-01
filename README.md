# WeAreTech.io

> The sources of the [http://wearetech.io](http://wearetech.io) website.

[![Build Status](https://secure.travis-ci.org/wearetech/wearetech.io.png?branch=master)](http://travis-ci.org/wearetech/wearetech.io)

## Install

To use, Clone, Enter directory, npm install...

```shell
git clone git@github.com:wearetech/wearetech.io.git
cd wearetech.io
npm install
```

### Create required localhost entries

Because wearetech.io uses multiple hostnames on the same Node instance you need to edit your `/etc/hosts` file and add two new entries so you will be able to access the two pre-existing cities:

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

## Release History

- **v0.0.1**, *TBD*
    - Big Bang

## License

Copyright (c) 2014 Thanasis Polychronakis, [Contributors](https://github.com/WeAreTech/wearetech.io/graphs/contributors). Licensed under the MIT license.
