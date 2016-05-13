# Node Modules

## Quick Hits

So far, we've written all our code in a single file. We'd like to learn
how to split code up in Node modules.

Node is different from Ruby. In Ruby, you can do like so:

```ruby
# ./cat.rb
class Cat
  def meow
    # ...
  end
end

# ./dog.rb
class Dog
  def bark
    # ...
  end
end

# ./animals.rb
require_relative "cat"
require_relative "dog"

cat = Cat.new
dog = Dog.new

cat.meow
dog.bark
```

In Node, things are a little different:

```js
// ./cat.js
function Cat () {
  // ...
};

Cat.prototype.meow = function () {
  // ...
};

module.exports = Cat;

// ./dog.js
function Dog () {
  // ...
};

Dog.prototype.bark = function () {
  // ...
};

module.exports = Dog;

// ./animals.js
var Cat = require("./cat");
var Dog = require("./dog");

var cat = new Cat();
var dog = new Dog();

cat.meow();
dog.bark();
```

## In Detail: Exporting a Class

Node uses `require` to allow one JS file to load a second JS file. For
instance, `animals.js` used `require("./cat")` to load the `cat.js`
file.

When a file is `require`d, Node loads and executes its code. Normally,
required files will define classes, like `cat.js` and `dog.js` defined
`Cat` and `Dog` classes.

That is all more or less the same as in Ruby, but note that in the JS
example, we store the result of `require` in a variable, and we use that
variable to access the module. That's because unlike Ruby's `require`,
Node's `require` does not import a module's global scope:

```js
// DOES NOT WORK

// ./cat.js
function Cat () {
  // ...
}

// ./animals.js
require("./cat");

Cat //=> undefined
```

So how do we export `Cat` from the module file? By setting
`module.exports`. `module` is a pre-defined variable set up by Node,
and its `exports` property is returned whenever we `require` it from
another file. Let's have a look:

```js
// ./silly.js
module.exports = "THIS IS MY EXPORTED STRING";

// ./main.js
var silly = require("./silly");
console.log(silly); //=> THIS IS MY EXPORTED STRING
```

Because the value of `module.exports` is what is returned by `require`,
`cat.js` exports the `Cat` constructor function by setting
`module.exports = Cat` and `animals.js` calls
`var Cat = require("./cat");` to save the `Cat` class to a variable to
use.

## In Detail: Loading Multiple Classes

The above pattern works great if each source file has a single class to
export. What if we want to define many chess pieces?

```js
// ./lib/pieces/pawn.js
function Pawn () {};
// ...
module.exports = Pawn;

// ./lib/pieces/knight.js
function Knight () {};
// ...
module.exports = Knight;

// ./lib/pieces/bishop.js
function Bishop () {};
// ...
module.exports = Bishop;

// ... more piece files ...

// ./lib/chess-board.js
var Pawn   = require("./pieces/pawn");
var Knight = require("./pieces/knight");
var Bishop = require("./pieces/bishop");
// ...

var p = new Pawn();
var k = new Knight();
var b = new Bishop();
```

This is kind of annoying. Anyone who wants to use all of our pieces
needs to load them by hand.

There is a common trick. In addition, to our `./pieces/pawn.js`,
`./pieces/knight.js`, etc., we'll define one extra file:

```js
// ./pieces/index.js
module.exports = {
  Pawn: require("./pawn"),
  Knight: require("./knight"),
  Bishop: require("./bishop"),
  // ...
};

// chess-board.js
var Pieces = require("./pieces");

var p = new Pieces.Pawn();
var k = new Pieces.Knight();
var b = new Pieces.Bishop();
```

When we `require("./pieces")`, Node will realize that `./pieces` is a
directory, not a file. Node will look for a file named
`index.js` in `./pieces` and load it. The code we wrote in
`./pieces/index.js` loads more files, and exports all the classes
grouped in a single object. In `chess-board.js`, we assign this to the
variable `Pieces`. Sometimes we call `Pieces` a **namespace**.

## One More Thing

Node sets `module.exports` to a blank object by default. So we could
rewrite the above as:

```js
// ./pieces/index.js
module.exports.Pawn   = require("./pawn");
module.exports.Knight = require("./knight");
module.exports.Bishop = require("./bishop");
// ...
```

I like our way of reassigning the whole `module.exports` better. But
this way would also work.
