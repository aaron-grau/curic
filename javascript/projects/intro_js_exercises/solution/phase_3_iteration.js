// Array#bubbleSort
Array.prototype.bubbleSort = function () {
  let isSorted = false;

  while (!isSorted) {
    isSorted = true;

    for (let i = 0; i < (this.length - 1); i++) {
      if (this[i] > this[i + 1]) {
        // a crafty bit of array destructuring to avoid a temp variable
        [this[i], this[i + 1]] = [this[i + 1], this[i]];
        isSorted = false;
      }
    }
  }

  return this;
};

console.log([5, 3, 4, 2, 1].bubbleSort());

// String#substrings
String.prototype.substrings = function () {
  let substrings = [];

  for (let start = 0; start < this.length; start++) {
    for (let len = 1; (start + len) <= this.length; len++) {
      substrings.push(this.substring(start, start + len));
    }
  }

  return substrings;
};

console.log("abc".substrings());
