# Classes

Review the reading on [object-oriented Javascript][oo-js]. ES2015 provides an alternative syntax for creating object-constructor functions. ES2015 lets use create classes with a more intuitive and Ruby-like syntax. Consider this example:

```javascript
class Bicycle {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  action (){
    return "rolls along";
  }

  ride() {
    console.log(
      `The ${this.color} ${this.model}  
      goes "whoosh" and ${this.action()}!`
      );
  }

  static parade() {
    Bicycle.funBicycles.forEach(bike => bike.ride());
  }
}

const cruiser = new Bicycle("Schwinn", "turquoise"),
    salsaFargo = new Bicycle("Salsa Fargo", "burnt orange"),
    flyingMerkel = new Bicycle("Flying Merkel", "green"),
    bianchiVolpe = new Bicycle("Bianchi Volpe", "slate blue");

Bicycle.funBicycles = [cruiser, salsaFargo, flyingMerkel, bianchiVolpe];

Bicycle.parade();

// The turquoise Schwinn goes "whoosh" and rolls along!
// The burnt orange Salsa Fargo goes "whoosh" and rolls along!
// The green Flying Merkel goes "whoosh" and rolls along!
// The slate blue Bianci Volpe goes "whoosh" and rolls along!

```

:bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike:

`prototype` methods (instance methods) are written right within the class object, as is the special `constructor` function that initializes a new object. `static` methods can also be defined within the class object; they mimic class methods by being called **without** instantiating the class.

## Classes are just sugar

Although ES6 classes may look pretty different from ES5, they are ultimately just syntactic sugar for the same prototype-based inheritance model we already know.

## Inheritance

In ES2015 we can also inherit from existing classes and override methods.

In Ruby, we would use `class Dog < Animal` to define a subclass.
In ES2015 the equivalent is `class Dog extends Animal`.

If we override an existing method, we can invoke the original version using
`super.methodName()`. This is slightly different from Ruby, where `super`
invokes the original method directly without having to include `.methodName`.

See examples of `extends` and `super` below.

```js
class RaceBicycle extends Bicycle {
  action() {
    const oldAction = super.action(); //oldAction === "rolls along"
    return `${oldAction} at a blistering pace!`
  }
}

```

Check out the [MDN documentation][mdn-classes] on classes for more examples and details.

[oo-js]: object-oriented-js.md#classes-in-javascript-constructor-functions
[mdn-classes]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
