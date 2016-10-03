# Syntax

## semi-colons;

In Javascript, an _expression_ is a line of code that returns a value. A
_statement_ is any line of code. **Every expression needs a semi-colon at the
end.** Statements that aren't expressions don't generally require semi-colons,
and may cause syntax errors.

For example,

```javascript
// variable assignments are expressions
let x = 5;

// function declarations are statements
function() {}

if (x === 5) { // `if` blocks are statements
  console.log("hello"); // console.log's are expressions
}  
```

## { curly braces }

Curly braces are used to delineate code blocks such as in function definitions, loops, and `if` blocks.  Curly braces can also be used to define JavaScript objects.

```javascript
// `if/else` block
if (boolean) {
  // code block...
} else {
  // another code block...
}

// loop
while (condition) {
  // code block...
}

// function definition
function foo() {
  // code block...
}

// JS object
let obj = { key: "value" };
```

Missing curly braces is a very common mistake! [Build good habits
early][good-habits].

## Looping

Use blocks to delineate code within loops.

### `for` Loops

```js
for (let i = 0; i < 10; i++) {
  // code block
}
```

### `while` loops

```js
while (condition) {
 // code block
}
```
### Looping Keywords

#### `continue`

Skips the current iteration.

```javascript
let result = [];
for (let i = 1; i < 10; i++) {
  if (i % 3 === 0) {
    continue;
  }
  result.push(i);
}

console.log(result); // [1, 2, 4, 5, 7, 8]
```

#### `break`

Exits the loop.

```js
let result = [];
for (let i = 1; i < 10; i++) {
  if (i % 3 === 0) {
    break;
  }
  result.push(i);
}

console.log(result); // [1, 2]
```

## `switch` Statements

```js
switch (expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
    // code block
}
```

## JS Functions

### Declarations

There are multiple ways to declare a function in Javascript.

#### Function-style
```js
function functionName(arg1, arg2, arg3, argN) {
  // code block...
}
```

#### Expression-style
```js
const functionName = function(arg1, arg2, arg3, argN) {
  // code block...
};
```
#### Fat Arrow-style (ES6)
```js
const functionName = (arg1, arg2, arg3, argN) => {
  // code block...
};
```

### Invoking functions with `()`

Functions are called a bit differently in JavaScript than in Ruby. In Ruby,
after a function is declared, it is invoked (ie. _called_) every time it is referenced:

```ruby
def ret_hello
  "hello"
end

ret_hello #=> "hello"
```

In Javascript, referencing the function name by itself will only return a
pointer to the function; to execute it, you must invoke the function **with
arguments**. If no arguments are required, this looks like `()` appended to the
function name.

```javascript
// function with 0 arguments
function retHello() {
  return "hello";
}

returnHello; //=> [Function: retHello]
returnHello(); //=> "hello"
```

```js
// function with 2 arguments
function sum(n1, n2) {
  return n1 + n2;
}

sum; //=> [Function: sum]
sum(10, 20); //=> 30
```

### No Implicit Returns

In JavaScript, **functions usually do not have implicit `return`s**.

```javascript
function retHi() {
  "hi";
}

retHi(); // undefined
```

**Exception:** single-line fat-arrow functions.

```js
retHi = () => "hi";

retHi(); // "hi"
```

[good-habits]: ./indentation.md
