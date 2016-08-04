# Object Destructuring

Object destructuring makes it possible to extract parts of an object and assign them to different variables. This looks very similar to parallel assignment. For example:

```javascript
const { a, b } = { a: 1, b: 2 };
// a = 1
// b = 2
```

It works by matching object properties, so we don't have to worry about order and can choose exactly what we want. If we only wanted to save 2 out of 3 properties, we could do this:

```javascript
const { a, c } = { a: 1, b: 2, c: 3 };
// a = 1
// c = 3
```

This works even if we have a variable or function that returns an object.

```javascript
function time() {
  // calculate current time
  return { h: hours, m: minutes, s: seconds };
};
const { m, s } = time();
// m = minutes
// s = seconds
```
