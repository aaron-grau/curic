var NUMS = [1, 2, 3, 4, 5];

// doubleArray
Array.prototype.doubleArray = function () {
  var doubledArray = [];

  for (var i = 0; i < this.length; i++) {
    doubledArray.push(this[i] * 2);
  }

  return doubledArray;
};

console.log(NUMS.doubleArray());

// myEach
Array.prototype.myEach = function (func) {
  for (var i = 0; i < this.length; i++) {
    func(this[i]);
  }

  return this;
};

NUMS.myEach(function (num) {
  console.log("square of " + num + " is " + (num * num));
});

// myMap
Array.prototype.myMap = function (func) {
  var mappedArray = [];

  this.myEach(function (element) {
    mappedArray.push(func(element));
  });

  return mappedArray;
};

console.log(NUMS.myMap(function (num) {
  return num * num;
}));

// myInject
Array.prototype.myInject = function (func) {
  var result = this[0];

  this.slice(1).myEach(function (element) {
    result = func(result, element);
  });

  return result;
};

console.log(NUMS.myInject(function (total, item) {
  return total + item;
}));
