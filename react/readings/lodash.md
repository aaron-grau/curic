# Lodash

`lodash` is a Javascript utility library and [npm-package][lodash] that provides many useful helper functions for solving common problems. For this course, we're going to employ two `lodash` helper methods to write cleaner and more concise React/Redux code: `merge()` and `union()`.

## `merge`

`merge()` is a quick and effective way to 'deep-dup' an object. Prefer it to `Object.assign()`, which only shallowly copies objects and can cause issues with deeply-nested re-assignment.

```js

import merge from 'lodash/merge';

let original = {a: {b: 'original'}};

let shallowCopy = Object.assign({}, original);
let deepCopy = merge({}, original);

deepCopy.a.b = 'changed';
console.log(original); // {a: {b: 'original'}}

shallowCopy.a.b = 'changed';
console.log(original); // {a: {b: 'changed'}}

```

## `union`

`union()` creates an array of unique values, in insertion order, from two given arrays.

Consider using `union()` when you want to add items to a unique array that
might already contain them. Be careful with non-primitive elements, since objects with identical key-value
pairs are unique vis-a-vis each other.


```js
import union from 'lodash/union';

let ids = [1,4,5];
let newIds = [2,3,4];

let result = union(ids, newIds); // [1,4,5,2,3]
```

Contrast this to vanilla JS:
```js
let ids = [1, 4, 5];
let newIds = [2, 3, 4];

// ES6

let result = ids.slice();

newIds.forEach(newId => {
	if (!result.includes(newId)) {
		result.push(newId)
	}
});

// ES5

var result = ids.slice();

newIds.forEach(function(newId){
	var shouldInsert = true;

	ids.forEach(function(oldId){
		if (oldId === newId) {
			shouldInsert = false;
			break;
		}
	});

	if (shouldInsert){
		result.push(newId);
	}

});

```

[lodash]: https://www.npmjs.com/package/lodash
[dan-tweet]: https://twitter.com/dan_abramov/status/605691126549508096
