/* --------------------
 * @overlook/core module
 * Route class
 * ------------------*/

'use strict';

// Imports
const {SIBLINGS_BEFORE, SIBLINGS_AFTER} = require('./symbols');

// Exports
class Route {
	constructor(props) {
		this.parent = undefined;
		this.app = undefined;
		this.children = [];
		this.isInitialized = false;

		// Init siblings sets
		this[SIBLINGS_BEFORE] = new Set(); // Siblings which are before this one
		this[SIBLINGS_AFTER] = new Set(); // Siblings which are after this one

		this.initProps(props);

		Object.assign(this, props);
	}

	initProps() { // eslint-disable-line class-methods-use-this
		// Do nothing - intended to be extended by subclasses
	}

	async init(app) {
		await this.initRoute(app);
		this.isInitialized = true;
		await this.initChildren(app);
	}

	async initRoute(app) {
		this.app = app;
	}

	async initChildren(app) {
		for (const child of this.children) {
			await child.init(app);
		}
	}

	handle() { // eslint-disable-line class-methods-use-this
		// No handling - intended to be extended by subclasses
		return null;
	}
}

module.exports = Route;

// Add methods from other files
// NB Imports are here rather than at top of file as `./attach` requires this file in turn.
Route.extend = require('./extend');
Object.assign(Route.prototype, require('./attach'));
