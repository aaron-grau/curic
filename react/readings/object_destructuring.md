# Object Destructuring

Object destructuring makes it possible to extract parts of an object and
assign those parts to different variables. For example:

```javascript
const { a, b } = { a: 1, b: 2 };
// a = 1
// b = 2
```

It works by matching object properties, so we don't have to worry about order
and can choose exactly what we want. If we only wanted to save some
properties, we could do this:

```javascript
const { a, c } = { a: 1, b: 2, c: 3 };
// a = 1
// c = 3
```

This works even if we have a variable or function that returns an object.

```javascript
const time = () => ({
  // calculate current time
  return { h: hours, m: minutes, s: seconds };
});
const { m, s } = time();
// m = minutes
// s = seconds
```

```javascript
this.props = {
  userId: 1,
  user: {
    fname: 'Ned',
    lname: 'Ruggeri'
  }
};
{ userId, user: { fname } } = this.props;

// userId = 1
// fname = 'Ned'
```

It's much nicer to have these variables to refer to instead of having to call
`this.props.userId` every time we want the `userId`. Note that we're easily
extracting from nested objects too.

## Parameters

This gets to be really useful when we're passing objects around into different
functions. Each function can pull as its parameters exactly what it needs from
the object.

Let's say we've created this movie review object and we want to use it in a
few different places.

```javascript
const review = {
  id: 1,
  userId: 1,
  movie: 'Star Trek',
  comment: 'It was excellent!',
  rating: 5
}

const user = {
  id: 1,
  fname: 'Ned',
  lname: 'Ruggeri'
}
```

It would be nice to get some more information about our user. Let's take the
`userId` and send it to one function that will retrieve user information. And
then let's take the rest of the information and print it out to the console.

```javascript
const printUser = ({ userId }) => ({
  // fetch user object via userId
  console.log(`${fname} ${lname}`);
});

const printReview = ({ movie, comment, rating }) => ({
  console.log(`Watched ${movie}`);
  console.log(`Gave it ${rating} stars!`);
  console.log(`${comment}`);
});

printUser(review);
printReview(review);

// output:
// Ned Ruggeri
// Watched Star Trek
// Gave it 5 stars!
// It was excellent!
```

All we have to do is pass in the whole object! Each function can extract
exactly what it needs in its parameters and use just that.