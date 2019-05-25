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
		this.router = undefined;
	}

	attachRouter(router) {
		// Check is instance of Route class
		if (!(router instanceof Route)) {
			throw new Error('attachRoute must be called with an instance of Route class');
		}

		this.router = router;

		router.attachedTo(null);

		return this;
	}

	init() {
		const {router} = this;
		if (router) router.init(this);
		return this;
	}

	handle(req) {
		const {router} = this;
		if (router) return router.handle(req);

		// Route not found
		// TODO Work out how to treat not found
		return null;
	}
}

// Export Route class
Overlook.Route = Route;

module.exports = Overlook;
