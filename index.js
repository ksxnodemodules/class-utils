
((module) => {
	'use strict';

	module.exports = {
		createClass: createClass
	};

	function createClass(prototype, constructor) {
		if (typeof constructor !== 'function') {
			constructor = () => {};
		}
		result.prototype = prototype;
		return createClass.super(result);
		function result(...args) {
			return constructor.call(this, ...args);
		}
	}

	createClass.super = (Super) =>
		class extends (typeof Super === 'function' ? Super : createClass.super.default) {
			constructor(...args) {
				super(...args);
			}
		};

	createClass.super.default = class {
		static get create() {
			return (...args) => new this(...args);
		}
	};

	createClass.super.handleArgs = (Super, handle) =>
		class extends createClass.super(Super) {
			constructor(...args) {
				super(...handle(...args));
			}
		};

	createClass.super.handleArgs.packer = (Super) =>
		createClass.super.handleArgs(Super, (...args) => [args]);

	createClass.super.handleArgs.unpacker = (Super) =>
		createClass.super.handleArgs(Super, (...args) => {
			var result = [];
			args.forEach((element) => result.push(...element));
			return result;
		});

})(module);
