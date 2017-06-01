const NUMS = [1, 2, 3, 4, 5];

// myEach
function myEach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    func(arr[i]); 
  }
}

// Array.prototype.myEach
Array.prototype.myEach = function (func) {
  for (let i = 0; i < this.length; i++) {
    func(this[i]);
  }
};

NUMS.myEach((num) => {
  console.log(`square of ${num} is ${num * num}`);
});

// myMap
function myMap(arr, func) {
  const mappedArr = [];

  this.myEach(el => mappedArr.push(func(el)));

  return mappedArr;
}

// Array.prototype.myMap
Array.prototype.myMap = function (func) {
  const mappedArray = [];

  this.myEach(element => mappedArray.push(func(element)) );

  return mappedArray;
};

console.log(NUMS.myMap( num => num * num ));

// myInject
function myReduce(arr, func, initialValue) {
   
  if (!initialValue) {
    initialValue = arr[0];
    arr = arr.slice(1);
  }

  let result = initialValue;

  arr.myEach(el => result = func(result, el));

  return result;
}

// Array.prototype.myInject
Array.prototype.myReduce = function (func, initialValue) {

  let arr = this;

  if (!initialValue) {
    initialValue = arr[0];
    arr = arr.slice(1);
  }

  let result = initialValue;

  arr.myEach(el => result = func(result, el));

  return result;
};

console.log(NUMS.myReduce( (total, item) => total + item ));
