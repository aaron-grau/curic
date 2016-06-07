# Syntax

## semi-colons; 

In Javascript, an __expression__ is a line of code that returns a value. __Statements__ are, more generally, any line of code. Every expression needs a semi-colon at the end. Statements that aren't expressions don't generally require semi-colons, and may cause syntax errors.

```javascript

let x = 5; // expression 

function(){} // statement, no semi-colon

if (x ===5 ) {
  console.log("hello"); // expression
}  // 'if' block is a statement, no semi-colon
```

## (parentheses)

Functions are called a bit differently in JavaScript than in Ruby. In Ruby, after a function is declared, it is **invoked** every time it is referenced:

```ruby
  def return_hello
    "hello"
  end

  return_hello #=> "hello"
```

In Javascript, referencing the function name by itself will only return a pointer to the function; to execute it, you must invoke the function **with arguments**. If no arguments are required, this looks like `()` appended to the function name. 

```javascript
  function ReturnHello() {
    return "hello";
  }

  ReturnHello ; //=> [Function: ReturnHello]
                // (a pointer to the function)

  ReturnHello(); //=> "hello"
```

## {curly braces}

Curly braces are used to delineate code blocks such as in function definitions, loops, and if-statements.  Curly braces can also define `objects`.

```javascript

// if statement
if (isTrue) {
  // code block
} else {
  // another code block
}

// loop
while (isTrue) {
  // code block
}

// function definition
function doIfTrue () {
  // code block
}

// object

myHash = {key: "value"};

```

Missing curly braces are the cause of many a stupid error. [Build good habits early.](indentation.md)

## Function declarations

There are multiple ways to declare a function in Javascript.

**Function-style**
```javascript
function nameOfFunction(arg1, arg2, arg3, argN){
  //function body...
}
```
**Expression-style**
```javascript
const nameOfFunction = function(arg1, arg2, arg3, argN){
  //function body...
};
```
**Fat Arrow-style (ES6)** 
```javascript
const nameOfFunction = (arg1, arg2, arg3, argN){
  // function body...
}

```

### No Implicit Returns

In JavaScript, **there is usually no implicit `return`**.

```javascript
function returnHi(){
  "hi";
}

returnHi(); // undefined
```

**Exception:** single-line fat-arrow functions.
```js
returnHi = () => "hi";

returnHi(); // "hi"
```