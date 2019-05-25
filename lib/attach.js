/* --------------------
 * @overlook/core module
 * Attach children methods to be merged into Route prototype
 * ------------------*/

'use strict';

// Modules
const {isBoolean} = require('core-util-is');

// Imports
const Route = require('./route'),
	{SIBLINGS_BEFORE, SIBLINGS_AFTER} = require('./symbols');

// Exports
module.exports = {
	attachChild(route) {
		// Check is instance of Route class
		if (!(route instanceof Route)) {
			throw new Error('attachRoute must be called with an instance of Route class');
		}

		// Check is not already initialized
		if (this.isInitialized) throw new Error('Cannot attach children after initialization');

		// Call `.attachTo` method on child
		route.attachTo(this);

		// Figure out what position child should be inserted in

		// Compare route to siblings
		const {children} = this;
		for (const child of children) {
			let isBefore = route.isBefore(child);
			const isAfter = child.isBefore(route);

			if (isBefore == null) {
				if (isAfter == null) continue;
				if (!isBoolean(isAfter)) throw new Error('isBefore() must return boolean or null');
				isBefore = !isAfter;
			} else {
				if (!isBoolean(isBefore)) throw new Error('isBefore() must return boolean or null');
				if (isAfter != null) {
					if (!isBoolean(isAfter)) throw new Error('isBefore() must return boolean or null');
					if (isBefore === isAfter) throw new Error('Child ordering conflict');
				}
			}

			// route1 is before route2
			const [route1, route2] = isBefore ? [route, child] : [child, route];
			const {[SIBLINGS_BEFORE]: before1, [SIBLINGS_AFTER]: after1} = route1;
			if (before1.has(route2)) throw new Error('Child ordering conflict');
			if (after1.has(route2)) continue;

			const {[SIBLINGS_BEFORE]: before2, [SIBLINGS_AFTER]: after2} = route2;
			after1.add(route2);
			before2.add(route1);
			for (const item of after2) {
				if (before1.has(item)) throw new Error('Child ordering conflict');
				after1.add(item);
			}
			for (const item of before1) {
				if (after2.has(item)) throw new Error('Child ordering conflict');
				before2.add(item);
			}
		}

		// Determine position
		let pos = children.length;
		for (const sibling of route[SIBLINGS_AFTER]) {
			const thisPos = children.indexOf(sibling);
			if (thisPos < pos) pos = thisPos;
		}

		// Attach child
		this.children.splice(pos, 0, route);
		route.attachedTo(this);

		// Return this for chaining
		return this;
	},

	attachTo(parent) {
		this.parent = parent;
	},

	attachedTo() {
		// Do nothing - intended to be extended by subclasses
	},

	isBefore() {
		// Can be overidden by subclasses
		return null;
	}
};
