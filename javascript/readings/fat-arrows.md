# Arrow Functions

Arrow functions, a.k.a. Fat Arrows, were introduced in ES2015 as a way of solving many of the inconveniences of the normal function callback syntax. Consider the following example: 

```javascript
// traditional callback

function showEach(array) {
	array.forEach(function(el){
		console.log(el);
	})
}

// ES6 arrow

function showEach(array){
	array.forEach( (el) => console.log(el) )
}
```

Both functions in the example above accomplish the same thing. However, the arrow syntax is much shorter and easier to follow.  

Arrow functions aren't simply just syntactic sugar, though; they actually behave somewhat differently than normal callbacks.

## Scope

Arrow functions, unlike callbacks, do not have scope. In other words, `this` means the same thing inside an arrow function that it does outside of it.

Consider the following scenario: 

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
But if we rewrite `play` using a fat arrow: 

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

