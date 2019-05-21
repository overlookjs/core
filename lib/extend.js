/* --------------------
 * @overlook/core module
 * Route class static extend method
 * ------------------*/

'use strict';

// Modules
const {isFunction, isSymbol} = require('core-util-is');

// Constants
const CACHE = Symbol('CACHE');

// Exports
module.exports = extend;

/**
 * Extend Route class.
 * Uses a cache stored to ensure if called with the same extension again,
 * the same subclass is returned, rather than creating another identical subclass.
 * @param {function} extension - Extension function
 * @param {...function} extensions - Additional extension functions
 * @returns {Route} - Extended route class
 */
function extend(extension, ...extensions) {
	if (!isFunction(extension)) throw new TypeError('Argument passed to .extend() must be a function');

	const RouteExtended = extendOne(this, extension); // eslint-disable-line no-invalid-this
	if (extensions.length === 0) return RouteExtended;
	return RouteExtended.extend(extensions);
}

function extendOne(Route, extension) {
	// If already extended with this extension, do not extend again
	const {symbol} = extension;
	if (symbol != null) {
		if (!isSymbol(symbol)) throw new Error('extension.symbol must be a Symbol if defined');
		if (Route[symbol]) return Route;
	}

	// Init cache
	let cache = Route[CACHE];
	if (!cache) {
		cache = new Map();
		Route[CACHE] = cache;
	}

	// If in cache, return it
	const Cached = cache.get(extension);
	if (Cached) return Cached;

	// If not in cache, extend
	const RouteExtended = extension(Route);
	if (symbol) {
		RouteExtended[symbol] = true;
		RouteExtended.prototype[symbol] = true;
	}

	// Add to cache
	cache.set(extension, RouteExtended);

	// Return subclass
	return RouteExtended;
}
