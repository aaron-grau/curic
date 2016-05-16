//bubbleSort
Array.prototype.bubbleSort = function () {
  var isSorted = false;

  while (!isSorted) {
    isSorted = true;
    for (var i = 0; i < (this.length - 1); i++) {
      if (this[i] > this[i + 1]) {
        var tmp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = tmp;

        isSorted = false;
      }
    }
  }

  return this;
};

console.log([5, 3, 4, 2, 1].bubbleSort());

// substrings
String.prototype.substrings = function () {
  var substrings = [];

  for (var start = 0; start < this.length; start++) {
    for (var len = 1; (start + len) <= this.length; len++) {
      substrings.push(this.slice(start, start + len));
    }
  }

  return substrings;
};

console.log("abc".substrings());
