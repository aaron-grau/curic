"use strict";

// dups
Array.prototype.uniq = function () {
  let uniqueArray = [];

  for (let i = 0; i < this.length; i++) {
    if (uniqueArray.indexOf(this[i]) === -1) {
      uniqueArray.push(this[i]);
    }
  }

  return uniqueArray;
};

console.log([1, 1, 2, 2, 3, 3, 4, 4, 5, 5].uniq());

// twoSum
Array.prototype.twoSum = function () {
  const pairs = [];

  for (let i = 0; i < this.length; i++) {
    for (let j = (i + 1); j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
};

console.log([-1, 0, 2, -2, 1].twoSum());

// transpose
Array.prototype.transpose = function () {
  const columns = [];
  for (let i = 0; i < this[0].length; i++) {
    columns.push([]);
  }

  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      columns[j].push(this[i][j]);
    }
  }

  return columns;
};

console.log([[0, 1, 2], [3, 4, 5], [6, 7, 8]].transpose());
