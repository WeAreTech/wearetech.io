# WeAreTech.io

> The sources of the [http://wearetech.io](http://wearetech.io) website.

[![Build Status](https://secure.travis-ci.org/thanpolas/wearetech.io.png?branch=master)](http://travis-ci.org/thanpolas/wearetech.io)

## Install

To use, simply Clone, Enter directory, npm install...

```shell
git clone git@github.com:thanpolas/wearetech.io.git
cd wearetech.io
npm install
```

## <a name='TOC'>Table of Contents</a>

1. [Overview](#overview)
1. [API](#api)

## Overview

Once the project is cloned you need to install the dependent npm and bower modules:

```shell
npm install && bower install
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

## API

One more to go back without onez has together we know!

**[[⬆]](#TOC)**

## Release History

- **v0.0.1**, *TBD*
    - Big Bang

## License

Copyright (c) 2014 Thanasis Polychronakis. Licensed under the MIT license.
