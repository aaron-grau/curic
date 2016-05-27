# Javascript Introduction - Part II

Keep on testing things out in Node as we go!

## Looping

Time to loop! The most common loops in JavaScript are the `for` loop and `while` loop.

### for loop

The structure of a `for` loop is as follows:

```javascript
for ([initialization]; [condition]; [incrementer]) {
  //do something...
}

for (var i = 0; i < 10; i += 1) {
  console.log(i)
}
```

* `[initialization]` - This is where you initialize a variable that will be used
as the counter. This counter will be updated in the incrementer and checked in
the condition.
* `[condition]` - If it evaluates to true, we do another loop. If false, we
don't.
* `[incrementer]` - This is evaluated after every iteration of the loop. **This
step should bring the counter that was created in the `[initialization]` closer
to a `[conditional]` that evaluates to false**

### while loop

```javascript
while([conditional]) {
  //do something...
}

var i = 0;

while(i < 10) {
  console.log(i);
  i += 1;
}
```

* `[conditional]` - If it evaluates to true, we do another loop. If false, we
don't.

Here's an example that prints the numbers 0 to n - 1.

```javascript
function printN(n) {
  var i = 0;

  while(i < n) {
    console.log(i);
    i += 1;
  }
}
```

Can you write this using a `for` loop?

### Looping Keywords

* `break` - Terminates the loop.

* `continue` - Skips the current loop iteration.

If we wanted to change our `printN` function so that it skipped multiples of 5,
we could write:

```javascript
function printNSkip5(n) {
  var i = 0;

  while(i < n) {
    if(i % 5 === 0) {
      i += 1;
      continue;
    }

    console.log(i);
    i += 1;
  }
}
```

If we wanted to change our `printN` function so that it stops as soon as it hits
a multiple of 5, we could write:

```javascript
function printNStop5(n) {
  var i = 0;

  while(i < n) {
    if(i % 5 === 0 && i !== 0) {
      break;
    }

    console.log(i);
    i += 1;
  }
}
```

## Practice Problems

Ready for more practice? Complete [homework part II][intro-js-homework] before moving on.

[intro-js-homework]: ../homeworks/questions/js_intro.md
