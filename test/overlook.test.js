/* --------------------
 * @overlook/core module
 * Tests
 * `Overlook` class
 * ------------------*/

'use strict';

// Modules
const Overlook = require('../index'),
	{Route} = Overlook;

// Init
const {spy} = require('./utils');

// Tests

describe('Overlook class', () => { // eslint-disable-line jest/lowercase-name
	it('is a class', () => {
		expect(Overlook).toBeFunction();
	});

	describe('constructor', () => {
		it('initializes undefined parent', () => {
			const overlook = new Overlook();
			expect(overlook).toHaveProperty('router');
			expect(overlook.router).toBeUndefined();
		});
	});

	describe('`.attachRouter()`', () => {
		it('prototype method exists', () => {
			const overlook = new Overlook();
			expect(overlook.attachRouter).toBeFunction();
		});

		it('returns overlook instance for chaining', () => {
			const overlook = new Overlook();
			const ret = overlook.attachRouter(new Route());
			expect(ret).toBe(overlook);
		});

		it('records router as `overlook.router`', () => {
			const overlook = new Overlook();
			const router = new Route();
			overlook.attachRouter(router);
			expect(overlook.router).toBe(router);
		});
	});

	describe('`.handle()`', () => {
		it('prototype method exists', () => {
			const overlook = new Overlook();
			expect(overlook.handle).toBeFunction();
		});

		it('returns null if no router attached', () => {
			const overlook = new Overlook();
			const ret = overlook.handle();
			expect(ret).toBeNull();
		});

		it('calls `router.handle()`', () => {
			const overlook = new Overlook();
			const router = new Route();
			router.handle = spy();
			overlook.attachRouter(router);

			overlook.handle();
			expect(router.handle).toHaveBeenCalledTimes(1);
		});

		it('returns result of `router.handle()`', () => {
			const overlook = new Overlook();
			const router = new Route();
			const res = {};
			router.handle = () => res;
			overlook.attachRouter(router);

			const ret = overlook.handle();
			expect(ret).toBe(res);
		});
	});
});
