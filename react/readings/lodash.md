# Lodash

`lodash` is a Javascript utility library and [npm-package][lodash] that provides many useful helper functions for solving common problems. For this course, we're going to employ two `lodash` helper methods to write cleaner and more concise React/Redux code: `merge()` and `union()`.

## `merge`

`merge()` is a quick and effective way to 'deep-dup' an object. Prefer it to `Object.assign()`, which only shallowly copies objects and can cause issues with deeply-nested re-assignment.

```js

import merge from 'lodash/merge';

original = {a: {b: 'original'}};

shallowCopy = Object.assign({}, original); 
deepCopy = merge({}, original);

deepCopy.a.b = 'changed';
original; // {a: {b: 'original'}}

shallowCopy.a.b = 'changed';
console.log(original); // {a: {b: 'changed'}}

```

## `union`

`union()` creates an array of unique values, in insertion order, from two given arrays.

Be careful with non-primitive elements, since objects with identical key-value
pairs are unique vis-a-vis each other.

Consider using `union()` when you want to add items to an array that
might already contain them. 

```js
import union from 'lodash/union';

let ids = [1,4,5];
let newIds = [2,3,4];

result = union(ids, newIds); // [1,4,5,2,3]

```

Contrast this to vanilla JS: 

```js

let ids = [1, 4, 5];
let newIds = [2, 3, 4];

// ES6

result = ids.slice();

newIds.forEach(newId => {
	if (!result.includes(newId)) {
		result.push(newId)
	}
})

// ES5

result = ids.slice();

newIds.forEach(function(newId){
	var shouldInsert = true;

	for (id in ids) {
		if (id === newId ) {
			shouldInsert = false;
			break;
		}
	}

	if (shouldInsert){
		result.push(newId);
	}

})

```

[lodash]: https://www.npmjs.com/package/lodash
[dan-tweet]: https://twitter.com/dan_abramov/status/605691126549508096