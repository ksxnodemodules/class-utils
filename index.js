
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
		return result;
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

	createClass.super.default = class {};

})(module);
