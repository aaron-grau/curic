"use strict";

// range
function range(start, end) {
  // I prefer range to include the start and exclude the end. That's how
  // computer scientists do it.
  if (start == end) {
    return [];
  }

  let r = range(start, end - 1);
  r.push(end - 1);
  return r;
}

console.log(`range(3, 10) = ${range(3, 10)}`);

// sumRec, sumIter
function sumRec(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  let lastNum = numbers[numbers.length - 1];
  return sumRec(numbers.slice(0, numbers.length - 1)) + lastNum;
}

console.log(`sumRec([1, 3, 5]) = ${sumRec([1, 3, 5])}`);

function sumIter(numbers) {
  let sum = 0;

  numbers.forEach(function (number) {
    sum += number;
  });

  return sum;
}

console.log(`sumIter([1, 3, 5]) = ${sumIter([1, 3, 5])}`);

// expRec1, expRec2
function expRec1(base, exponent) {
  return exponent === 0 ? 1 : (base * expRec1(base, exponent - 1));
}

console.log(`expRec1(2, 4) = ${expRec1(2, 4)}`);

function expRec2(base, exponent) {
  if (exponent === 0) {
    return 1;
  }

  if (exponent % 2 === 0) {
    let subAnswer = expRec2(base, exponent / 2);
    return subAnswer * subAnswer;
  } else {
    let subAnswer = expRec2(base, ((exponent - 1) / 2));
    return subAnswer * subAnswer * base;
  }
}

console.log(`expRec2(2, 4) =  ${expRec2(2, 4)}`);
console.log(`expRec2(2, 5) =  ${expRec2(2, 5)}`);

// fibsRec, fibsIter
function fibsRec(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    let fibs = fibsRec(n - 1);
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);

    return fibs;
  }
}

console.log(`fibsRec(5) = ${fibsRec(5)}`);

function fibsIter(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  }

  let fibs = [0, 1];
  while (fibs.length < n) {
    fibs.push(fibs[fibs.length - 2] + fibs[fibs.length - 1]);
  }

  return fibs;
}

console.log(`fibsIter(5) = ${fibsIter(5)}`);

// bsearch
function bsearch(numbers, target) {
  if (numbers.length === 0) {
    return -1;
  }

  const probeIdx = Math.floor(numbers.length / 2);
  const probe = numbers[probeIdx];
  if (target === probe) {
    return probeIdx;
  } else if (target < probe) {
    const left = numbers.slice(0, probeIdx);
    return bsearch(left, target);
  } else {
    const right = numbers.slice(probeIdx + 1);
    const subproblem = bsearch(right, target);

    return subproblem === -1 ? -1 : subproblem + (probeIdx + 1);
  }
}

console.log(`bsearch([1, 2, 3], 3) = ${bsearch([1, 2, 3], 3)}`);
console.log(`bsearch([1, 2, 3], 2.5) = ${bsearch([1, 2, 3], 2.5)}`);

// makeChange
function makeChange(target, coins) {
  if (target === 0) {
    return [];
  }

  if (coins.every( el => el > target)){
    return null;
  }

  let bestChange = null;

  function reverseSorter(a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  }

  coins.sort(reverseSorter).forEach((coin, index) => {
    if (coin > target) {
      return;
    }

    let remainder = target - coin;
    // remember the optimization where we don't try to use high coins
    // if we're already using a low one?
    let restChange = makeChange(remainder, coins.slice(index));

    if (!restChange){
      return;
    }

    let change = [coin].concat(restChange);
    if (!bestChange || (change.length < bestChange.length)) {
      bestChange = change;
    }
  });

  return bestChange;
}

// merge, mergeSort
function merge(left, right) {
  const merged = [];

  while (left.length > 0 && right.length > 0) {
    let nextItem = (left[0] < right[0]) ? left.shift() : right.shift();
    merged.push(nextItem);
  }

  return merged.concat(left, right);
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  } else {
    const middle = Math.floor(array.length / 2);

    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));

    return merge(left, right);
  }
}

console.log(`mergeSort([4, 5, 2, 3, 1]) = ${mergeSort([4, 5, 2, 3, 1])}`);

// subsets
function subsets(array) {
  if (array.length === 0) {
    return [[]];
  }

  const firstElement = array[0];
  const subSubsets = subsets(array.slice(1));

  const newSubsets = subSubsets.map(subSubset => [firstElement].concat(subSubset) );

  return subSubsets.concat(newSubsets);
}

console.log(`subsets([1, 3, 5]) = ${JSON.stringify(subsets([1, 3, 5]))}`);
