[![NPM version](https://img.shields.io/npm/v/@overlook/core.svg)](https://www.npmjs.com/package/@overlook/core)
[![Build Status](https://img.shields.io/travis/overlookjs/core/master.svg)](http://travis-ci.org/overlookjs/core)
[![Dependency Status](https://img.shields.io/david/overlookjs/core.svg)](https://david-dm.org/overlookjs/core)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookjs/core.svg)](https://david-dm.org/overlookjs/core)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookjs/core.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookjs/core/master.svg)](https://coveralls.io/r/overlookjs/core)

# Overlook framework core

Part of the [Overlook framework](https://overlookjs.github.io/).

## Abstract

[Overlook](https://overlookjs.github.io/) is a Javascript web framework.

It is composed of many modules which can be used together to build a fully-featured app. This module is the (very minimal) core.

This document only describes the methods of the core module. Please see other modules for documentation on each, or [overlookjs.github.io](https://overlookjs.github.io/) for an overview.

## Usage

### Create app

```js
const Overlook = require('@overlook/core');
const app = new Overlook();
```

### Routes

The Route class defined by [@overlook/route](https://www.npmjs.com/package/@overlook/route) is exported as `Overlook.Route`.

See the docs for Route class methods [here](https://www.npmjs.com/package/@overlook/route).

#### `.attachRouter( router )`

Attach a router to the app.

```js
const {Route} = Overlook;
const router = new Route();
overlook.attachRouter( router );
```

### Initialization

#### `.init()`

Initialize the app.

This calls `.init()` on the router, passing the app as argument.

See [here](https://www.npmjs.com/package/@overlook/route#initialization) for details of the router initializaton process.

### Handling requests

#### `.handle( req )`

Handle request.

This calls `.handle()` on the router, passing the request as argument.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookjs/core/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookjs/core/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
