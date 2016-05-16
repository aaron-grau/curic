# From `new Cat()` to `Cat.new()`

We have this:

```javascript
function Cat (name) {
  this.name = name;
};
```

So, normally we'd instantiate a Cat like this: `var cat = new Cat('Sennacy');`

## Not anymore!

I like Ruby, so I want to be able to say `var cat = Cat.new('Sennacy')`, so:

```javascript
Cat.new = function (name) {
  var catInstance = Object.create(Cat.prototype);
  Cat.call(catInstance, name);

  return catInstance;
};

var cat = Cat.new('Sennacy'); // BOOM!
```

### Let's generalize it!

```javascript
Function.prototype.new = function () {
  var args = Array.prototype.slice.call(arguments);

  var instance = Object.create(this.prototype);
  this.apply(instance, args);

  return instance;
};
```
