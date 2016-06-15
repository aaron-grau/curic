// simple myBind with no args
Function.prototype.myBind = function (ctx) {
  return () => this.apply(ctx);
};

// myBind with arguments
Function.prototype.myBind = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

const Cat = function (name) {
  this.name = name;
};

Cat.prototype.meow = function () {
  console.log(this.name + " says meow!");
};

const curie = new Cat("Curie");
setTimeout(curie.meow.myBind(curie), 1000);
