# JS Intro Homework

Code up the following functions and run them in Node.

## Part I - JS Fundamentals

### var, let, const demo I

Test out each of following functions in Node. What does each log to the console? Do any of them throw errors? See if you can figure out why.

```javascript
function mysteryScoping1() {
  var x = 'out of block';
  if (true) {
    var x = 'in block';  
    console.log(x);
  }
  console.log(x);
}

function mysteryScoping2() {
  const x = 'out of block';
  if (true) {
    const x = 'in block';  
    console.log(x);
  }
  console.log(x);
}

function mysteryScoping3() {
  const x = 'out of block';
  if (true) {
    var x = 'in block';  
    console.log(x);
  }
  console.log(x);
}

function mysteryScoping4() {
  let x = 'out of block';
  if (true) {
    let x = 'in block';  
    console.log(x);
  }
  console.log(x);
}

function mysteryScoping5() {
  let x = 'out of block';
  if (true) {
    let x = 'in block';  
    console.log(x);
  }
  let x = 'out of block again';
  console.log(x);
}
```
### madLib

Write a function that takes three strings - a verb, an adjective, and a noun - and interpolates them into the sentence "We shall **verb** the **adjective** **noun**" using ES6 template literals.

**Input:** three strings

**Output:**
```javascript
  > madLib('fly', 'iridescent', 'zoo');
  "We shall fly the iridescent zoo."

  > madLib('eat', 'rolling', 'cactus');
  "We shall eat the rolling cactus."
```

### isOdd
**Input:** A Number.

**Output:** A Boolean. `true` if the number is odd, otherwise `false`

```javascript
> isOdd(2)
false

> isOdd(5)
true

> isOdd(-17)
true
```

### yell
**Input:** A String. Assume no punctuation.

**Output:** A String. A yelled version of the input.

```
> yell("I want to go to the store")
"I WANT TO GO TO THE STORE!!!"

> yell("Time to program")
"TIME TO PROGRAM!!!"
```

### isSubstring
**Input**
* 1) A String, called `searchString`.
* 2) A String, called `subString`.

**Output:** A Boolean. `true` is the `subString` is a part of the `searchString`.

```
> isSubstring("The cat went to the store", "he cat went")
true

> isSubstring("Time to program", "time")
true

> isSubstring("Jump for joy", "joys")
false
```

## Part II - JS Looping Constructs

Carry on! Know your loops!

### fizzBuzz
3 and 5 are magic numbers. Define a function `fizzBuzz(array)` that takes an array
returns a new array of every number in the array that is divisible
by either 3 or 5, but not both.

### isPrime

Define a function `isPrime(number)` that returns `true` if `number` is prime.
Otherwise, false. Assume `number` is a positive integer.

```javascript
> isPrime(2)
true

> isPrime(10)
false

> isPrime(15485863)
true

> isPrime(3548563)
false
```
### sumOfNPrimes

Using `firstNPrimes`, write a function `sumOfNPrimes(n)` that returns the sum of
the first `n` prime numbers.

```javascript
> sumOfNPrimes(0)
0

> sumOfNPrimes(1)
2

> sumOfNPrimes(4)
17
```
## Part III - Arguments

### printChildren

Write a function `printChildren` that takes a parent's name and an unspecified number of children. It should loop through the children and print each of their names.

**Input**
* 1) A string for the parent's name
* 2) Any number of strings for the children's names

**Output**
* "**parent**'s children are:" followed by the names of their children

```javascript

> printChildren("George", "Cassie", "Jeff", "Roger");
Georges children are:
Cassie
Jeff
Roger
```

### addThree

Below is a function that takes three numbers and returns their sum.
Use the spread operator to pass in a three-item array to `addThree`.

```javascript
function addThree (a, b, c) {
  return a + b + c;
}

var arr = [1,2,3];
// How can we use the spread operator to pass in arr?
```

### dinnerTonightIs

Write a function that takes in a food and outputs "Dinner tonight is **food**". Caveat: if you don't specify a food, `dinnerTonightIs` should use the default argument "pizza".

```
> dinnerTonightIs('some inferior food')
Dinner tonight is some inferior food.

> dinnerTonightIs()
Dinner tonight is pizza.

```
