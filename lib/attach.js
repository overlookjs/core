/* --------------------
 * @overlook/core module
 * Attach children methods to be merged into Route prototype
 * ------------------*/

'use strict';

// Modules
const {isBoolean} = require('core-util-is');

// Imports
const Route = require('./route');

// Exports
module.exports = {
	attachChild(route) {
		// Check is instance of Route class
		if (!(route instanceof Route)) {
			throw new Error('attachRoute must be called with an instance of Route class');
		}

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
			const {_siblingsBefore: siblingsBefore1, _siblingsAfter: siblingsAfter1} = route1;
			if (siblingsBefore1.has(route2)) throw new Error('Child ordering conflict');
			if (siblingsAfter1.has(route2)) continue;

			const {_siblingsBefore: siblingsBefore2, _siblingsAfter: siblingsAfter2} = route2;
			siblingsAfter1.add(route2);
			siblingsBefore2.add(route1);
			for (const item of siblingsAfter2) {
				if (siblingsBefore1.has(item)) throw new Error('Child ordering conflict');
				siblingsAfter1.add(item);
			}
			for (const item of siblingsBefore1) {
				if (siblingsAfter2.has(item)) throw new Error('Child ordering conflict');
				siblingsBefore2.add(item);
			}
		}

		// Determine position
		let pos = children.length;
		for (const sibling of route._siblingsAfter) {
			const thisPos = children.indexOf(sibling);
			if (thisPos < pos) pos = thisPos;
		}

		// Attach child
		return this.attachChildInPosition(route, pos);
	},

	attachChildLast(route) {
		return this.attachChildInPosition(route, this.children.length);
	},

	attachChildInPosition(route, pos) {
		this.children.splice(pos, 0, route);

		route.parent = this;
		route.app = this.app;
		route.init();

		return this;
	},

	isBefore() {
		// Can be overidden by subclasses
		return null;
	}
};
