# JS Intro Homework

Code up the following functions and run them in Node.

## Part I - JS Fundamentals

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
