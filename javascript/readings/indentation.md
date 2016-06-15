# Writing Clean Javascript

Would you rather debug this: 
```js
function fn1(){ if (true) {
for (var x = 1; x < 10; x++ ) {
while (x < 30) {
function fn2(x){
	return x + 1;
} if (fn2(x) % 2 === 0){
	console.log(x);
} else {
	console.log(x * 4);
}
x++;
}}}
fn1()
```

or this:

```js
function fn1(){
	if (true) {
		for (var x = 1; x < 10; x++ ) {
			while (x < 30) {
				function fn2(x){
					return x + 1;
				}
				if (fn2(x) % 2 === 0){
					console.log(x);
				} else {
					console.log(x * 4);
				}
				x++;
			}
		
	}
}
fn1();
```

Lesson: **Always indent and pair your curly-braces** (write the curly braces first, then fill in the code block).