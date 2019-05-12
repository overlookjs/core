/* --------------------
 * @overlook/core module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Overlook = require('../index');

// Init
require('./utils');

// Tests

describe('tests', () => {
	it.skip('all', () => { // eslint-disable-line jest/no-disabled-tests
		expect(Overlook).not.toBeUndefined();
	});
});
