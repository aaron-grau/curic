// uniq 
function uniq(arr) {
  let uniqueArray = [];

  for (let i = 0; i < arr.length; i++) {
    if (uniqueArray.indexOf(arr[i]) === -1) {
      uniqueArray.push(arr[i]);
    }
  }

  return uniqueArray;
};

// Array.prototype.uniq
Array.prototype.uniq = function () {
  let visitedEls = {};
  let uniqueArray = [];

  // here we are using Array#forEach with a callback that is
  // closing over 'uniqueArray'
  this.forEach(function (el) {
    if (!uniqueArray.includes(el)) {
      uniqueArray.push(el);
    }
  });
    
  return uniqueArray;
};

console.log([1, 1, 2, 2, 3, 3, 4, 4, 5, 5].uniq());

// twoSum
function twoSum(arr) {
  const pairs = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = (i + 1); j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
}

// Array.prototype.twoSum
// This time we've reduced the time complexity from N^2 to N
Array.prototype.twoSum = function() {
  let pairs = [];
  const indexHash = {};

  this.forEach((el, idx) => {
    if (indexHash[el * -1]) {
      const newPairs = indexHash[el * -1].map((prevIdx) => [prevIdx, idx]); 

      // remember, concat doesn't mutate the original object
      pairs = pairs.concat(newPairs);
    }
    
    // since we can't set a default attribute value in JavaScript,
    // we will need to check for existence first
    indexHash[el] ? indexHash.push(idx) : indexHash[el] = [idx];
  });

  return pairs;
};

console.log([-1, 0, 2, -2, 1].twoSum());

// transpose
function transpose() {
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
}

// Array.prototype.transpose
Array.prototype.transpose = function() {

  // this creates the empty transposed array
  // just a neat trick to avoid iterating
  const columns = Array.from(
    { length: this[0].length }, 
    () => Array.from({ length: this.length })
  );

  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      columns[j][i] = this[i][j];
    }
  }

  return columns;
};

console.log([[0, 1, 2], [3, 4, 5], [6, 7, 8]].transpose());
