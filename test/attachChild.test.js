/* --------------------
 * @overlook/core module
 * Tests
 * `Route#attach()` prototype method
 * ------------------*/

'use strict';

// Modules
const {Route} = require('../index');

// Init
require('./support');

const spy = jest.fn;

// Tests

describe('Route#attachChild()', () => { // eslint-disable-line jest/lowercase-name
	it('prototype method exists', () => {
		const route = new Route();
		expect(route.attachChild).toBeFunction();
	});

	it('sets .parent on child', () => {
		const parent = new Route();
		const child = new Route();
		parent.attachChild(child);
		expect(child.parent).toBe(parent);
	});

	it('adds child to .children on parent', () => {
		const parent = new Route();
		const child = new Route();
		parent.attachChild(child);
		expect(parent.children).toIncludeSameMembers([child]);
	});

	describe('calls `.attachedTo` on child', () => {
		let parent, child;
		beforeEach(() => {
			parent = new Route();
			child = new Route();
			child.attachedTo = spy();
			parent.attachChild(child);
		});

		it('once', () => {
			expect(child.attachedTo).toHaveBeenCalledTimes(1);
		});

		it('with parent', () => {
			expect(child.attachedTo).toHaveBeenCalledWith(parent);
		});
	});

	it('calls `.init()` on child', () => {
		const parent = new Route();
		const child = new Route();
		child.init = spy();
		parent.attachChild(child);
		expect(child.init).toHaveBeenCalledTimes(1);
	});

	describe('orders children according to `.isBefore()`', () => {
		let parent, child1, child2;
		beforeEach(() => {
			parent = new Route();
			child1 = new Route();
			child2 = new Route();
		});
		function attachAll() {
			parent.attachChild(child1);
			parent.attachChild(child2);
		}

		describe('with 2 routes', () => {
			it('in order attached by default', () => {
				attachAll();
				expect(parent.children[0]).toBe(child1);
				expect(parent.children[1]).toBe(child2);
			});

			it('retains default order if `.isBefore()` returns null', () => {
				child1.isBefore = () => null;
				child2.isBefore = () => null;
				attachAll();
				expect(parent.children[0]).toBe(child1);
				expect(parent.children[1]).toBe(child2);
			});

			it('if 1st returns true', () => {
				child1.isBefore = () => true;
				attachAll();
				expect(parent.children[0]).toBe(child1);
				expect(parent.children[1]).toBe(child2);
			});

			it('if 1st returns false', () => {
				child1.isBefore = () => false;
				attachAll();
				expect(parent.children[0]).toBe(child2);
				expect(parent.children[1]).toBe(child1);
			});

			it('if 2nd returns true', () => {
				child2.isBefore = () => true;
				attachAll();
				expect(parent.children[0]).toBe(child2);
				expect(parent.children[1]).toBe(child1);
			});

			it('if 2nd returns false', () => {
				child2.isBefore = () => false;
				attachAll();
				expect(parent.children[0]).toBe(child1);
				expect(parent.children[1]).toBe(child2);
			});

			it('if both indicate 1st child first', () => {
				child1.isBefore = () => true;
				child2.isBefore = () => false;
				attachAll();
				expect(parent.children[0]).toBe(child1);
				expect(parent.children[1]).toBe(child2);
			});

			it('if both indicate 1st child last', () => {
				child1.isBefore = () => false;
				child2.isBefore = () => true;
				attachAll();
				expect(parent.children[0]).toBe(child2);
				expect(parent.children[1]).toBe(child1);
			});
		});

		describe('with 4 routes', () => {
			let child3, child4;
			beforeEach(() => {
				parent = new Route();
				child3 = new Route();
				child4 = new Route();
			});
			function attachAll() { // eslint-disable-line no-shadow
				parent.attachChild(child1);
				parent.attachChild(child2);
				parent.attachChild(child3);
				parent.attachChild(child4);
			}

			it('in order attached by default', () => {
				attachAll();
				expect(parent.children[0]).toBe(child1);
				expect(parent.children[1]).toBe(child2);
				expect(parent.children[2]).toBe(child3);
				expect(parent.children[3]).toBe(child4);
			});

			it('retains default order if `.isBefore()` returns null', () => {
				child1.isBefore = () => null;
				child2.isBefore = () => null;
				child3.isBefore = () => null;
				child4.isBefore = () => null;
				attachAll();
				expect(parent.children[0]).toBe(child1);
				expect(parent.children[1]).toBe(child2);
				expect(parent.children[2]).toBe(child3);
				expect(parent.children[3]).toBe(child4);
			});

			describe('moves child to latest possible', () => {
				it('when new child declares it is before a sibling', () => {
					child4.isBefore = sibling => (sibling === child3 ? true : null);
					attachAll();
					expect(parent.children[0]).toBe(child1);
					expect(parent.children[1]).toBe(child2);
					expect(parent.children[2]).toBe(child4);
					expect(parent.children[3]).toBe(child3);
				});

				it('when sibling declares it is after new child', () => {
					child3.isBefore = sibling => (sibling === child4 ? false : null);
					attachAll();
					expect(parent.children[0]).toBe(child1);
					expect(parent.children[1]).toBe(child2);
					expect(parent.children[2]).toBe(child4);
					expect(parent.children[3]).toBe(child3);
				});

				it('when new child declares it is after a sibling', () => {
					child4.isBefore = sibling => (sibling === child1 ? false : null);
					attachAll();
					expect(parent.children[0]).toBe(child1);
					expect(parent.children[1]).toBe(child2);
					expect(parent.children[2]).toBe(child3);
					expect(parent.children[3]).toBe(child4);
				});

				it('when sibling declares it is before new child', () => {
					child1.isBefore = sibling => (sibling === child4 ? true : null);
					attachAll();
					expect(parent.children[0]).toBe(child1);
					expect(parent.children[1]).toBe(child2);
					expect(parent.children[2]).toBe(child3);
					expect(parent.children[3]).toBe(child4);
				});

				it('when new child declares it is after one sibling and before another', () => {
					child4.isBefore = sibling => (sibling === child1 ? false : null);
					child4.isBefore = sibling => (sibling === child3 ? true : null);
					attachAll();
					expect(parent.children[0]).toBe(child1);
					expect(parent.children[1]).toBe(child2);
					expect(parent.children[2]).toBe(child4);
					expect(parent.children[3]).toBe(child3);
				});

				it('when one sibling declares it is before new child and another sibling declares it is after', () => {
					child1.isBefore = sibling => (sibling === child4 ? true : null);
					child3.isBefore = sibling => (sibling === child4 ? false : null);
					attachAll();
					expect(parent.children[0]).toBe(child1);
					expect(parent.children[1]).toBe(child2);
					expect(parent.children[2]).toBe(child4);
					expect(parent.children[3]).toBe(child3);
				});
			});

			// TODO Write this!
		});

		describe('throws error if conflict', () => {
			it('simple conflict', () => {
				child1.isBefore = () => true;
				child2.isBefore = () => true;
				parent.attachChild(child1);
				expect(() => {
					parent.attachChild(child2);
				}).toThrow(/^Child ordering conflict$/);
			});

			it('circular conflict', () => {
				const child3 = new Route();
				child1.isBefore = sibling => (sibling === child2 ? true : null);
				child2.isBefore = sibling => (sibling === child3 ? true : null);
				child3.isBefore = sibling => (sibling === child1 ? true : null);
				parent.attachChild(child1);
				parent.attachChild(child2);
				expect(() => {
					parent.attachChild(child3);
				}).toThrow(/^Child ordering conflict$/);
			});
		});
	});
});
