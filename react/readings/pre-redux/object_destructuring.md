# Object Destructuring

Object destructuring makes it possible to extract parts of an object and assign them to different variables. For example:

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

This gets to be really useful when we're passing objects around into different functions. Each function can just pull as its parameters exactly what it needs from the object.

Let's say we've created this movie review object and we want to use it in a few different places.

```javascript
const review = {
  id: 1,
  userId: 1,
  movie: "Star Trek",
  comment: "Excellent!",
  rating: 5
}
```

Well, first it would be nice to get some more information about our user. Let's take the `userId` and send it to one function that will retrieve user information. And then let's take the rest of the information and print it out to the console.

```javascript
function printUser({ userId }) {
  // fetch user object via userId
  // print it to the console
}

function printReview({ movie, comment, rating }) {
  // print review
}

printUser(review);
printReview(review);
```

All we have to do is pass in the whole object! Each function can extract exactly what it needs in its parameters and use just that.
