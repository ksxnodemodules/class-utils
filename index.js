
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

	createClass.super = (Super, options) => {

		class Result extends (typeof Super === 'function' ? Super : createClass.super.default) {

			constructor(...args) {
				super(...args);
			}

			static get create() {
				return (...args) => new this(...args);
			}

		};

		options = Object(options);

		if (options.setproto) {
			Object.setPrototypeOf(Result, Super);
		}

		return Result;

	}

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
		createClass.super.handleArgs(Super, (...args) => {
			var result = [];
			args.forEach((element) => result.push(...element));
			return result;
		});

})(module);
