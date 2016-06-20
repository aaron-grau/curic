## Inherits Exercises

### `inherits`

We learned how to implement class inheritance using a `Surrogate`. There 
are a number of steps:

* Define a `Surrogate` class
* Set the prototype of the `Surrogate` (`Surrogate.prototype =
  SuperClass.prototype`)
* Set `Subclass.prototype = new Surrogate()`
* Set `Subclass.prototype.constructor = Subclass`

Write a `Function.prototype.inherits` method that will do this for you. 
Do not use `Object.create` for this; you should deeply understand what 
the `new` keyword does and how the `__proto__` chain is constructed. This
will help you in Asteroids today:

```javascript
function MovingObject () {};

function Ship () {};
Ship.inherits(MovingObject);

function Asteroid () {};
Asteroid.inherits(MovingObject);
```

How would you test `Function.prototype.inherits`? A few specs to consider:

* You should be able to define methods/attributes on `MovingObject`
   that ship and asteroid instances can use.
* Defining a method on `Asteroid`'s prototype should not mean that a
   ship can call it.
* Adding to `Ship` or `Asteroid`'s prototypes should not change
   `MovingObject`'s prototype.
* The `Ship` and `Asteroid` prototypes should not be instances of
   `MovingObject`.

After you have written this, look at [our answer][inherits-answer] so you can use it (in a slightly modified format) for Asteroids. Make sure you understand how we're using it.

[inherits-answer]: ../inherits_exercises/solution/inherits.js
