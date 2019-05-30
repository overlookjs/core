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

	it('exports Route class', () => {
		expect(Route).toBeFunction();
	});

	describe('constructor', () => {
		it('initializes undefined router', () => {
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

		it('calls `router.attachTo()` with null', () => {
			const router = new Route();
			router.attachTo = spy();
			overlook.attachRouter(router);
			expect(router.attachTo).toHaveBeenCalledTimes(1);
			expect(router.attachTo).toHaveBeenCalledWith(null);
		});
	});

	describe('`.init()`', () => {
		it('prototype method exists', () => {
			expect(overlook.init).toBeFunction();
		});

		it('returns overlook instance for chaining', () => {
			const ret = overlook.init();
			expect(ret).toBe(overlook);
		});

		it('calls `router.init()` with overlook app', () => {
			const router = new Route();
			router.init = spy();
			overlook.attachRouter(router);
			expect(router.init).not.toHaveBeenCalled();

			overlook.init();
			expect(router.init).toHaveBeenCalledTimes(1);
			expect(router.init).toHaveBeenCalledWith(overlook);
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

		it('calls `router.handle() with request`', () => {
			const router = new Route();
			router.handle = spy();
			overlook.attachRouter(router);

			const req = {};
			overlook.handle(req);
			expect(router.handle).toHaveBeenCalledTimes(1);
			expect(router.handle).toHaveBeenCalledWith(req);
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
