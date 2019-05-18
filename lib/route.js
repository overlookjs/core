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

		this.initProps(props);

		Object.assign(this, props);
	}

	initProps() { // eslint-disable-line class-methods-use-this
		// Do nothing - intended to be overridden in subclasses
	}

	init() { // eslint-disable-line class-methods-use-this
		// Do nothing - intended to be overridden in subclasses
	}

	attachChild(route) {
		// Check is instance of Route class
		if (!(route instanceof Route)) {
			throw new Error('attachRoute must be called with an instance of Route class');
		}

		this.children.push(route);

		route.parent = this;
		route.app = this.app;
		route.init();

		return this;
	}

	handle() { // eslint-disable-line class-methods-use-this
		// Intended to be overidden by subclasses
		return false;
	}
}

module.exports = Route;
