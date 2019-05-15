/* --------------------
 * @overlook/core module
 * Overlook class
 * ------------------*/

'use strict';

// Imports
const Route = require('./route');

// Exports
class Overlook {
	constructor() {
		this.routes = [];
	}

	attachRouter(router) {
		// Check is instance of Route class
		if (!(router instanceof Route)) {
			throw new Error('attachRoute must be called with an instance of Route class');
		}

		this.router = router;

		router.parent = null;
		router.app = this;
		router.init();

		return this;
	}

	handle(req) {
		const {router} = this;
		if (router) return router.handle(req);

		// Route not found
		// TODO Work out how to treat not found
		return false;
	}
}

// Export Route class
Overlook.Route = Route;

module.exports = Overlook;
