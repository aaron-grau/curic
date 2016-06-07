# JavaScript Introduction - Part I (The Beginnings)

Welcome to JavaScript! Make sure to follow along, type things in, and play with the new syntax as you make your way through this JS intro.

## JavaScript Environments and Node

JavaScript runs in 2 main environments: the browser and Node. We'll start out in the Node environment in order to focus on Javascript basics and work our way up to browser Javascript later.

What is Node exactly? The [website](https://nodejs.org/en/) has a pretty good description. The `node` command lets us run JavaScript from our terminal, kind of like the `ruby` command, and includes a REPL that resembles `pry` as well.

Head over to the [server side javascript reading][server-side-javascript] and download Node if you haven't already.

**Set up Node before reading further; you'll need it for the examples.**

Got it working? Congratulations! Time to learn JavaScript.

[server-side-javascript]:./server-side-javascript.md

## ECMAScript Versions

ECMAScript is the standardized specification that forms the basis for JavaScript. Think of it as a blueprint from which various JavaScript engines, such as Chrome's V8, are built. From 2009-2015, the most recent stable version of ECMAScript was ECMAScript 5, or ES5 for short.

The new ES6 standard, a.k.a. ES2015, was released in June 2015 and has added a wide variety of new features to JavaScript. ES6 features have been widely adopted across most browsers, but a number of environments still lag behind ([See this compatibility table.](http://kangax.github.io/compat-table/es6/)).

When using Javascript features, consider whether they are compatible with the environments you need. Features that are new to ES6 have been clearly indicated in this reading and in the MDN Documentation (example: [documentation for `indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - scroll down to the 'specifications' section for info on which ECMAScript versions the feature is compatible with. In this case, the feature `indexOf` is ES5 and ES6 compatible.)

When we need maximum compatibility, such as for a web page to be served through various browsers, we can use tools called **transpilers** to translate our ES6 back to the more-universal ES5. We'll learn more about transpilers(in particular, **Babel**)  later.

## Syntax

### Semi-colons

Every expression needs a `;` at the end. This is like a period for the
computer. Although you may find that your programs will sometimes work without
them **leaving out semi-colons is a very bad practice because it makes your code
more error prone**.

### Parentheses

Functions are called a bit differently in JavaScript than in Ruby. Parentheses are used when defining functions and calling functions. We will talk more about defining functions below. When calling a function, if you forget to add the parentheses, you'll see that it evaluates to `[Function]` - that is how Node represents a function object. To actually run the function, you must add parentheses.
For an example, see below:

```javascript

>function Happy(){
  return "HAPPY";
}

> "Happy".toUpperCase
[Function]

> "Happy".toUpperCase()
"HAPPY"
```



### { }

Curly brackets are used in several programming constructs - function definitions,
loops, if-statements. They wrap around the block of code that belongs to that
construct.

Curly brackets also define `objects`, but more on that later :)

In Ruby:

```ruby
if x == 3
  puts 'YAY X IS 3'
elsif x == 4
  puts 'YAY X IS 4'
else
  puts 'OH NO, X IS NOT 3 OR 4!'
end
```

```javascript
if (x === 3) {
  console.log('YAY X IS 3');
} elsif (x === 4) {
  console.log('YAY X IS 4');
} else {
  console.log('OH NO, X IS NOT 3 OR 4!');
}
```

## Creating a Function

Let's say we wanted to create a function called `addThree`.
The specification of this function describes it as taking as an input any three
numbers and returning as the output the sum of those numbers. For example:

```javascript
> addThree(1, 1, 1);
3
> addThree(0, 1, -15);
-14
> addThree(5, 100, 30);
135
```

The syntax for defining a function is as follows:

```javascript
function nameOfFunction(param1, param2, param3, paramN){
  //function body...
}

OR

var nameOfFunction = function(param1, param2, param3, paramN){
  //function body...
}
```

Let's see how we would define our `addThree` function.

```javascript
function addThree(number1, number2, number3){
  return number1 + number2 + number3;
}
```

Note that in JavaScript, we must use `return`. There is no implicit return at
the end of methods like in Ruby.

## Practice Problems

Ready for some practice problems? Complete [homework part I][intro-js-homework] to get a handle on the syntax.

[intro-js-homework]: ../homeworks/questions/js_intro.md
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
