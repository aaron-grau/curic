"use strict";

const NUMS = [1, 2, 3, 4, 5];

// doubleArray
Array.prototype.doubleArray = function () {
  const doubledArray = [];

  for (let i = 0; i < this.length; i++) {
    doubledArray.push(this[i] * 2);
  }

  return doubledArray;
};

console.log(NUMS.doubleArray());

// myEach
Array.prototype.myEach = function (func) {
  for (let i = 0; i < this.length; i++) {
    func(this[i]);
  }

  return this;
};

NUMS.myEach((num) => {
  console.log(`square of ${num} is ${num * num}`);
});

// myMap
Array.prototype.myMap = function (func) {
  let mappedArray = [];

  this.myEach(element => mappedArray.push(func(element)) );

  return mappedArray;
};

console.log(NUMS.myMap( num => num * num ));

// myInject
Array.prototype.myInject = function (func) {
  let result = this[0];

  this.slice(1).myEach(element => result = func(result, element) );

  return result;
};

console.log(NUMS.myInject( (total, item) => total + item ));
