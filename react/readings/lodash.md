# Lodash

`lodash` is a Javascript utility library and [npm-package][lodash] that provides many useful helper functions for solving common problems. For this course, we're going to employ two `lodash` helper methods to write cleaner and more concise React/Redux code: 'merge()' and 'union()'.

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
original; // {a: {b: 'changed'}}

```

## `union`

`union()` creates an array of unique values, in insertion order, from two given arrays.

```js
import union from 'lodash/union';

let ids = [1,4,5];
let newIds = [2,3,4];

ids = union(ids, newIds); // [1,4,5,2,3]

```

Contrast this to vanilla JS: 

```js

let ids = [1,4,5];
let newIds = [2,3,4];

// ES6
newIds.forEach(newId => {
	if (!newIds.includes?(newId)) {
		ids.push(newId)
	}
})

// ES5

newIds.forEach(function(newId){
	var shouldInsert = true;

	for (id in ids) {
		if (id === newId ) {
			shouldInsert = false;
			break;
		}
	}

	if (shouldInsert){
		ids.push(newId);
	}

})

```


[lodash]: https://www.npmjs.com/package/lodash
[dan-tweet]: https://twitter.com/dan_abramov/status/605691126549508096