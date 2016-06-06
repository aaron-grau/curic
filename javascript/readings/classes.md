# Classes

Review the reading on [object-oriented Javascript][oo-js]. ES2015 provides an alternative syntax for creating object-constructor functions. ES2015 lets use create classes with a more intuitive and Ruby-like syntax. Consider this example: 

```javascript
class Bicycle {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  ride() {
    console.log(
      `The ${this.color} ${this.model} ` +
      'goes "whoosh" and rolls along!'
      );
  }

  static parade() {
    Bicycle.funBicycles.forEach( bike => {
      bike.ride();
    });
  }
}

let cruiser = new Bicycle("Schwinn", "turquoise");
let salsaFargo = new Bicycle("Salsa Fargo", "burnt orange");
let flyingMerkel = new Bicycle("Flying Merkel", "green");

Bicycle.funBicycles = [cruiser, salsaFargo, flyingMerkel];

Bicycle.parade();

// The turquoise Schwinn goes "whoosh" and rolls along!
// The burnt orange Salsa Fargo goes "whoosh" and rolls along!
// The green Flying Merkel goes "whoosh" and rolls along!

```

:bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike::bike: 

`prototype` methods (instance methods) are written right within the class object, as is the special `constructor` function that initializes a new object. `static` methods can also be defined within the class object; they mimic class methods by being called **without** instantiating the class. 

## Classes are just sugar

Although ES6 classes may look pretty different from ES5, they are ultimately just syntactic sugar for the same prototype-based inheritance model we already know.

Check out the [MDN documentation][mdn-classes] on classes for more examples and details.

[oo-js]: object-oriented-js.md#classes-in-javascript-constructor-functions
[mdn-classes]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
