/* --------------------
 * @overlook/core module
 * Utility functions
 * ------------------*/

'use strict';

// Exports
module.exports = {
	hasOwnProperty
};

const hasOwnProp = Object.prototype.hasOwnProperty;
function hasOwnProperty(obj, prop) {
	return hasOwnProp.call(obj, prop);
}
