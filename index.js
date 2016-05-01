
((module) => {
	'use strict';

	module.exports = {
		createClass: createClass
	};

	function createClass(prototype, constructor, ...args) {
		if (typeof constructor !== 'function') {
			constructor = () => {};
		}
		result.prototype = prototype;
		return createClass.super(result, ...args);
		function result(...args) {
			return constructor.call(this, ...args);
		}
	}

	createClass.super = (Super = createClass.super.default) =>

		class Result extends Super {

			static get create() {
				return (...args) => new this(...args);
			}

			static get createSubClass() {
				return (...args) => createClass.super(this, ...args);
			}

		};

	createClass.super.default = class {};

	createClass.super.handleArgs = (Super, handle) =>
		createClass.super(class extends createClass.super(Super) {
			constructor(...args) {
				super(...handle(...args));
			}
		});

	createClass.super.handleArgs.packer = (Super) =>
		createClass.super.handleArgs(Super, (...args) => [args]);

	createClass.super.handleArgs.unpacker = (Super) =>
		createClass.super.handleArgs(Super, (...args) => args.reduce((prev, now) => [...prev, ...now], []));

})(module);
