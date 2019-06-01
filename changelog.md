# Changelog

## 0.8.1

Dependencies:

* Update `@overlook/route` dependency

## 0.8.0

Breaking changes:

* Update `@overlook/route` dependency (includes breaking changes)

Docs:

* Document all features

## 0.7.3

Deps:

* Update `@overlook/route` dependency

## 0.7.2

Docs:

* Fix missing Changelog entry

## 0.7.1

Refactor:

* Move `Route` class to `@overlook/route`

## 0.7.0

Breaking changes:

* Route extension identifier located at `.IDENTIFIER`

## 0.6.0

Breaking changes:

* Remove route ordering functionality
* Remove `.attachedTo` method

Bug fixes:

* Correct error messages

Refactor:

* Use `has-own-prop` module rather than util

Tests:

* `.handle` calls `router.handle` with request
* Rename tests [refactor]

## 0.5.0

Breaking changes:

* `.attachTo` method sets parent
* Remove `.attachChildLast` + `.attachChildInPosition` methods

## 0.4.0

Breaking changes:

* `.init` called explicitly not on route attachment
* Rename route method `attachChildInPos` to `attachChildInPosition`

Features:

* Route `attachedTo` method

Tests:

* Simplify tests [refactor]
* Overlook class tests reduce repetition [refactor]
* Code comments

Refactor:

* Replace siblings props with symbols

## 0.3.0

Breaking changes:

* Rename identifier symbol property to `.identifier`
* Create identifier symbol for extensions without one

Refactor:

* `.extend` move validation of extension arg

Tests:

* Rename `utils` to `support` [refactor]
* Move `spy` out of test utils [refactor]
* Tests for constructor props

Dev:

* `package-lock.json` optional properties

## 0.2.5

Dev:

* Update version in `package-lock.json` [fix]

## 0.2.4

Features:

* Child ordering

Bug fixes:

* `extend` handle mutliple functions
* `.extend` use only specific cache
* Overlook constructor creates undefined `.router` prop

Refactor:

* Move attach methods into separate file

Tests:

* Tests for all features

Dev:

* Add `package-lock.json`
* Travis CI cache npm modules

Misc:

* Code comments

## 0.2.3

Minor changes:

* `.extend` extension identifier symbol optional
* `.extend` type-check extension identifier symbol
* Correct JSDoc comments for `.extend`

Refactor:

* Rename variables in `.extend`

## 0.2.2

Features:

* Route class `extend` static method

## 0.2.1

Dev:

* Changelog for previous release

## 0.2.0

Breaking changes:

* `.handle` returns `null` as default

Refactor:

* Remove unused code

## 0.1.0

* Initial release
