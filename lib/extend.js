/* --------------------
 * @overlook/core module
 * Route class static extend method
 * ------------------*/

'use strict';

// Modules
const {isFunction} = require('core-util-is');

// Constants
const CACHE = Symbol('CACHE');

// Exports
module.exports = extend;

/**
 * Extend Route class.
 * Uses a cache stored to ensure if called with the same extension again,
 * the same subclass is returned, rather than creating another identical subclass.
 * @param {function} fn - Extension function
 * @returns {Route} - Extended route class
 */
function extend(fn, ...fns) {
	if (!isFunction(fn)) throw new TypeError('Argument passed to .extend() must be a function');

	const SubKlass = extendOne(this, fn); // eslint-disable-line no-invalid-this
	if (fns.length === 0) return SubKlass;
	return SubKlass.extend(fns);
}

function extendOne(Klass, fn) {
	// If already extended with this extension, do not extend again
	const {symbol} = fn;
	if (Klass[symbol]) return Klass;

	// Init cache
	let cache = Klass[CACHE];
	if (!cache) {
		cache = new Map();
		Klass[CACHE] = cache;
	}

	// If in cache, return it
	const Cached = cache.get(fn);
	if (Cached) return Cached;

	// If not in cache, extend
	const SubKlass = fn(Klass);
	SubKlass[symbol] = true;
	SubKlass.prototype[symbol] = true;

	// Add to cache
	cache.set(fn, SubKlass);

	// Return subclass
	return SubKlass;
}
