/* --------------------
 * @overlook/core module
 * Route class
 * ------------------*/

'use strict';

// Exports
class Route {
	constructor(props) {
		this.parent = undefined;
		this.app = undefined;
		this.children = [];

		// Init siblings sets
		this._siblingsBefore = new Set(); // Siblings which are before this one
		this._siblingsAfter = new Set(); // Siblings which are after this one

		this.initProps(props);

		Object.assign(this, props);
	}

	initProps() { // eslint-disable-line class-methods-use-this
		// Do nothing - intended to be overridden in subclasses
	}

	init() { // eslint-disable-line class-methods-use-this
		// Do nothing - intended to be overridden in subclasses
	}

	handle() { // eslint-disable-line class-methods-use-this
		// Intended to be overidden by subclasses
		return null;
	}
}

module.exports = Route;

// Add methods from other files
// NB Imports are here rather than at top of file as `./attach` requires this file in turn.
Route.extend = require('./extend');
Object.assign(Route.prototype, require('./attach'));
