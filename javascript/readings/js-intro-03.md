# Arguments

Let's explore some additional features relating to arguments.

## JS Arguments

Arguments in JavaScript work a little bit differently than arguments in Ruby. In Ruby, calling a function with the wrong number of arguments will throw an `ArgumentError`.

```ruby
def one_arg(x)
  return "#{x} is the one and only arg"
end

one_arg("first arg", "second arg") # raises error
one_arg() # raises error
```

In JavaScript, on the other hand, functions will happily take fewer arguments than specified (in which case the unspecified arguments have value `undefined`), or extra arguments (they will be available in a special `arguments` array-like object).

### Fewer Arguments

JS functions can take fewer arguments than expected. In that case, unspecified arguments have the value `undefined`.

```javascript
function id(arg) {
  return arg;
}

id(5); // => 5
id(); // => undefined
```

Occasionally this can be annoying to debug if you expect a function to throw an error when it doesn't receive as many arguments as it requires to return the correct output. Always keep in mind that a function will still run even if it has been passed no arguments at all.

### More Arguments

JS functions will also accept more arguments than are asked for.

#### In ES5: `arguments`

You have access to all of the arguments through a special array-like object called `arguments`. Like the this keyword, `arguments` is set each time you call a function. It contains the values of all the arguments: ones that were anticipated in the function definition, plus the extras.

```javascript
function logArguments(firstArg) {
  console.log(firstArg); // this will only log the first arg

  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]); // this will log all the arguments including firstArg
  }
};

logArguments("boop", "candle", 3);
```

One very annoying thing about `arguments` is that it is not a true Array object. It is only Array-like in that it can be indexed with integers and has a length property. This means that there are many Array methods that we cannot use on `arguments`.

#### In ES6: Rest Parameters

Okay, so `arguments` is kind of annoying - it isn't a true Array, merely an array-like object. In addition, `arguments` includes all arguments, including the named arguments, which we don't always want.

ES6 solves these issues by giving us Rest Parameters, which are similar to the ruby splat operator (`*`) for structuring parameters.

A reminder of the ruby `*` operator:

```ruby
def example(first_arg, *other_args)
  puts "The first arg is #{first_arg}!"

  puts "The other args are:"

  other_args.each do |arg|
    puts arg
  end
end
```

In JavaScript, we grab the rest of the arguments with `...`. The differences between `arguments` and Rest Parameters are:

* a) Rest Parameters only grab the un-named arguments
* b) Rest Parameters give us back a real array, so we can use methods like `pop` and `sort`

```javascript

function example (firstArg, ...otherArgs) {
  console.log(`The first arg is ${firstArg}!`);

  console.log(`The other args are:`);

  for (var i = 0; i < otherArgs.length; i++) {
    console.log(otherArgs[i]);
  }
}
```

### Spread Parameters

ES6 also allows us to use Spread Parameters, which is similar to the Ruby splat operator (`*`) for de-structuring parameters. We can now pass an array into a function with the `...` as shown below:

```javascript

function madLib (verb, pluralNoun1, pluralNoun2, place) {
  return `I like to ${verb} ${pluralNoun1} with ${pluralNoun2} by the ${place}.`
}

var words = ["eat", "socks", "rabbits", "sea"];

console.log(madLib(...words));
```

We can de-structure arguments multiple times in a function call.

```javascript

function myFunction(v, w, x, y, z) { }
var args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);

```

### Default Values

Default values are new to ES6. We can now set default values in a way similar to Ruby.

```javascript

function add(x, y = 17) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) === 20;

```
