# Fat Arrow Functions

Arrow functions were introduced in ES2015 as a way of solving many of the inconveniences of the formal function-callback syntax. Consider the following example: 

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

Arrow functions aren't simply just syntactic sugar, though; they actually behave differently than normal callbacks as well.

## Scope

Consider the following scenario: 

```javascript
function Cat (name){
	this.name = name;
};

Cat.prototype.meow = function(){
	console.log(`$(this.name) says 'meow'`);
};

let garfield = new Cat();
garfield.meow // => prints 'undefined says meow'
```
