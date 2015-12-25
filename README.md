
# ECMAScript 6 class utilities

Create an ECMAScript 6 class quickly

## Examples

### Create class from prototype and constructor

 - Function: `createClass`

 - Usage: `createClass(object prototype, optional function constructor)`

```javascript
var createClass = require('class-utils').createClass;
var MyClass = createClass({
	valueOf() {
		return this.value;
	}
}, function (value) {
	this.value = value;
});
var foo = new MyClass('foo');
console.log(String(foo)); // display 'foo'
```

### Create subclass from super class

 - Function: `createClass.super`

 - Usage: `createClass.super(optional class Super)`

```javascript
var createClass = require('class-utils').createClass;
var SubArray = createClass(Array);
var foo = new SubArray(0, 1, 2, 3, 4, 5);
console.log(foo); // display [0, 1, 2, 3, 4, 5]
```
