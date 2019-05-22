/* --------------------
 * @overlook/core module
 * Tests
 * `Route` class
 * ------------------*/

'use strict';

// Modules
const {Route} = require('../index');

// Init
const {spy} = require('./utils');

// Tests

describe('Route class', () => { // eslint-disable-line jest/lowercase-name
	it('can be accessed as Overlook.Route', () => {
		expect(Route).toBeDefined();
	});

	it('is a class', () => {
		expect(Route).toBeFunction();
	});

	describe('constructor', () => {
		let route;
		beforeEach(() => {
			route = new Route();
		});

		it('initializes undefined parent', () => {
			expect(route).toHaveProperty('parent');
			expect(route.parent).toBeUndefined();
		});

		it('initializes empty children array', () => {
			expect(route.children).toBeArrayOfSize(0);
		});

		it('initializes undefined app', () => {
			expect(route).toHaveProperty('app');
			expect(route.app).toBeUndefined();
		});

		it('calls `.initProps()`', () => {
			class R2 extends Route {}
			const fn = spy();
			R2.prototype.initProps = fn;
			new R2(); // eslint-disable-line no-new
			expect(fn).toHaveBeenCalledTimes(1);
		});
	});

	describe('`.init()`', () => {
		it('prototype method exists', () => {
			const route = new Route();
			expect(route.init).toBeFunction();
		});

		it('returns undefined', () => {
			const route = new Route();
			const ret = route.init();
			expect(ret).toBeUndefined();
		});
	});

	describe('`.handle()`', () => {
		it('prototype method exists', () => {
			const route = new Route();
			expect(route.handle).toBeFunction();
		});

		it('returns null', () => {
			const route = new Route();
			const ret = route.handle();
			expect(ret).toBeNull();
		});
	});
});
