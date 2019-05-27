/* --------------------
 * @overlook/core module
 * Overlook class
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route');

// Exports
class Overlook {
	constructor() {
		this.router = undefined;
	}

	attachRouter(router) {
		// Check is instance of Route class
		if (!(router instanceof Route)) {
			throw new Error('attachRouter must be called with an instance of Route class');
		}

		this.router = router;

		router.attachTo(null);

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
