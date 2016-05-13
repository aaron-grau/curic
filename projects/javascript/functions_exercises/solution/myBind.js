Function.prototype.myBind = function (obj) {
  var fn = this;
  return function () {
    return fn.apply(obj);
  };
};

var Cat = function (name) {
  this.name = name;
}

Cat.prototype.meow = function () {
  console.log(this.name + " says meow!");
};

var curie = new Cat("Curie")
setTimeout(curie.meow.myBind(curie), 1000);
