# Arrow Functions

Arrow functions, a.k.a. Fat Arrows, are a way of declaring functions. They were introduced in ES2015 as a way of solving many of the inconveniences of the normal callback function syntax. Consider the following example: 

```javascript
// normal callback function
function showEach(array) {
	array.forEach(function(el){
		console.log(el);
	})
}

// fat arrow function
function showEach(array){
	array.forEach( (el) => console.log(el) )
}
```
Both functions in the example above accomplish the same thing. However, the arrow syntax is shorter and easier to follow.  

## Anatomy of an arrow function
```javascript
(parameters, go, here) => {
	statements;
	return value;
}
```

For single-expression blocks, `{ }` and `return` are implied, and you may omit the `( )` when there is a single argument. 
```javascript
argument => expression; // equal to (argument) => {return expression};
```

__N.B.:__ In Javascript, an _expression_ is a line of code that returns a value. _Statements_ are, more generally, any line of code.

Arrow functions aren't just syntactic sugar for normal functions, though. They behave differently in some scenarios:

## Scope

Arrow functions, unlike normal functions, do not have scope. In other words, `this` means the same thing inside an arrow function that it does outside of it. Consider the following scenario: 

```javascript
function Cat (name){
	this.name = name;
	this.toys = ["string", "ball", "balloon"];
};

Cat.prototype.play = function meow (){
	this.toys.forEach(function(toy){
		console.log(`${this.name} plays with ${toy}`);
	});
};

let garfield = new Cat('garfield');
garfield.play()

// output
undefined plays with string
undefined plays with ball
undefined plays with balloon
```
`play` breaks because `this` in `this.name` refers to the `forEach` method surrounding it. But if we rewrite `play` using a fat arrow, it works: 

```javascript

Cat.prototype.play = function meow (){
	this.toys.forEach( toy => 
		{ console.log(`${this.name} plays with ${toy}`); }
	);
};

garfield.play()

//output 
garfield plays with string
garfield plays with ball
garfield plays with balloon
```
## Implicit Returns

Fat arrows implicitly return when they consist of a single expression.

```javascript
	let halfMyAge = myAge => myAge/2;
	halfMyAge(30) === 15; // true
```

This doesn't work if the fat arrow uses a block.
```javascript
	let halfMyAge = myAge => {
		let age = myAge;
		age/2;
	}
	typeof halfMyAge(30) === "undefined"; // true
```

## Potential Pitfalls

### Syntactic Ambiguity

```javascript
let ambiguousFunction = () => {}
```

In Javascript, `{}` can signify either an object or a block.

Is `ambiguousFunction` supposed to return an object? If so, it's broken. 

```javascript
typeof ambiguousFunction() === "undefined"; // true
```

To make a single-expression fat arrow return an object, wrap it in parentheses: 

```javascript
clearFunction = () => ({})
typeof clearFunction() === "object"; // true
```

### No Binding

Fat arrows don't scope like normal functions, so you can't reassign `this`, which is always what it was at the time the fat arrow was declared.
```javascript
let returnName = () => this.name;
returnName.call({name: 'Dale Cooper'}) // undefined;
```

### No Constructors

Fat arrows can't be used as constructors.

```javascript
const FatCat = (name) => this.name = name;

let g = new FatCat("garfield"); // TypeError: FatCat is not a constructor
```

### No new `arguments`

Because they don't change scope, fat arrows don't have their own `arguments` object. 

```javascript
const hasArgs = function(){
	let noArgs = () => arguments[0];
	return noArgs('FakeArg');
};

hasArgs('RealArg') // returns 'RealArg';
```

### No names

Fat arrows are _anonymous_, like their [`lambda`][lambda] counterparts in other languages.  

```javascript
sayHello(name) => {console.log(`Hi, ${name}!)} // SyntaxError
```

[lambda]: https://en.wikipedia.org/wiki/Anonymous_function
