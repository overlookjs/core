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
require('./support');

const spy = jest.fn;

// Tests

describe('Overlook class', () => { // eslint-disable-line jest/lowercase-name
	let overlook;
	beforeEach(() => {
		overlook = new Overlook();
	});

	it('is a class', () => {
		expect(Overlook).toBeFunction();
	});

	describe('constructor', () => {
		it('initializes undefined parent', () => {
			expect(overlook).toHaveProperty('router');
			expect(overlook.router).toBeUndefined();
		});
	});

	describe('`.attachRouter()`', () => {
		it('prototype method exists', () => {
			expect(overlook.attachRouter).toBeFunction();
		});

		it('returns overlook instance for chaining', () => {
			const ret = overlook.attachRouter(new Route());
			expect(ret).toBe(overlook);
		});

		it('records router as `overlook.router`', () => {
			const router = new Route();
			overlook.attachRouter(router);
			expect(overlook.router).toBe(router);
		});

		describe('calls `.attachedTo` on router', () => {
			let router;
			beforeEach(() => {
				router = new Route();
				router.attachedTo = spy();
				overlook.attachRouter(router);
			});

			it('once', () => {
				expect(router.attachedTo).toHaveBeenCalledTimes(1);
			});

			it('with null', () => {
				expect(router.attachedTo).toHaveBeenCalledWith(null);
			});
		});
	});

	describe('`.handle()`', () => {
		it('prototype method exists', () => {
			expect(overlook.handle).toBeFunction();
		});

		it('returns null if no router attached', () => {
			const ret = overlook.handle();
			expect(ret).toBeNull();
		});

		it('calls `router.handle()`', () => {
			const router = new Route();
			router.handle = spy();
			overlook.attachRouter(router);

			overlook.handle();
			expect(router.handle).toHaveBeenCalledTimes(1);
		});

		it('returns result of `router.handle()`', () => {
			const router = new Route();
			const res = {};
			router.handle = () => res;
			overlook.attachRouter(router);

			const ret = overlook.handle();
			expect(ret).toBe(res);
		});
	});
});
