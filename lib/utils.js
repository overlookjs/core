/* --------------------
 * @overlook/core module
 * Utility functions
 * ------------------*/

'use strict';

// Exports
// TODO Replace all these with NPM modules
module.exports = {
	isFunction,
	isString,
	isEmptyString,
	isFullString,
	isSubclassOf
};

function isFunction(o) {
	return typeof o === 'function';
}

function isString(o) {
	return typeof o === 'string';
}

function isEmptyString(o) {
	return o === '';
}

function isFullString(o) {
	return isString(o) && !isEmptyString(o);
}

/**
 * Identify if input is a subclass of another class
 * @param {*} obj - Input
 * @returns {boolean} - `true` if is an object, `false` if not
 */
function isSubclassOf(obj, Class) {
	if (obj == null) return false;
	if (obj === Class) return true;
	while (true) { // eslint-disable-line no-constant-condition
		const next = Object.getPrototypeOf(obj);
		if (next === Class) return true;
		if (!next) return false;
		obj = next;
	}
}
