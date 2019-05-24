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
		it('initializes undefined parent', () => {
			const route = new Route();
			expect(route).toHaveProperty('parent');
			expect(route.parent).toBeUndefined();
		});

		it('initializes empty children array', () => {
			const route = new Route();
			expect(route.children).toBeArrayOfSize(0);
		});

		it('initializes undefined app', () => {
			const route = new Route();
			expect(route).toHaveProperty('app');
			expect(route.app).toBeUndefined();
		});

		describe('calls `.initProps()`', () => {
			let fn, props;
			beforeEach(() => {
				class R2 extends Route {}
				props = {};
				fn = spy(() => props);
				R2.prototype.initProps = fn;
				new R2(props); // eslint-disable-line no-new
			});

			it('once', () => {
				expect(fn).toHaveBeenCalledTimes(1);
			});

			it('with props', () => {
				expect(fn).toHaveBeenCalledWith(props);
			});
		});

		it('adds passed properties to route', () => {
			const props = {a: {}};
			const route = new Route(props);
			expect(route.a).toBe(props.a);
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
