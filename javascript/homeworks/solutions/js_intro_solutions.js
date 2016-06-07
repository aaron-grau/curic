// Intro to JS Homework

// Part I

// mysteryScoping

function mysteryScoping1() {
  var x = 'out of block';
  if (true) {
    var x = 'in block';
    console.log(x);
  }
  console.log(x);
}

mysteryScoping1(); // in block, in block

function mysteryScoping2() {
  const x = 'out of block';
  if (true) {
    const x = 'in block';
    console.log(x);
  }
  console.log(x);
}

mysteryScoping2(); // in block, out of block

function mysteryScoping3() {
  const x = 'out of block';
  if (true) {
    var x = 'in block';
    console.log(x);
  }
  console.log(x);
}

mysteryScoping3(); // SyntaxError

function mysteryScoping4() {
  let x = 'out of block';
  if (true) {
    let x = 'in block';
    console.log(x);
  }
  console.log(x);
}

mysteryScoping4(); // in block, out of block

function mysteryScoping5() {
  let x = 'out of block';
  if (true) {
    let x = 'in block';
    console.log(x);
  }
  let x = 'out of block again';
  console.log(x);
}

mysteryScoping5(); // SyntaxError

// madLib

function madLib (verb, adj, noun) {
  return `We shall ${verb} the ${adj} ${noun}.`
}

// isOdd

function isOdd (n) {
  return Math.abs(n) % 2 === 1;
}

// yell

function yell (phrase) {
  return phrase.toUpperCase();
}

// isSubstring

function isSubstring (phrase, subphrase) {
  return phrase.indexOf(subphrase) !== -1;
}

// Part II

// fizzBuzz

function fizzBuzz (array) {
  const fizzBuzzArr = [];

  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if ((el % 3 === 0) ^ (el % 5 === 0)) {
      fizzBuzzArr.push(el);
    }
  }
  return fizzBuzzArr;
}

// isPrime

function isPrime (n) {
  if (n < 2) { return false; }

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

// sumOfNPrimes

function sumOfNPrimes (n) {
  let sum = 0;
  let countPrimes = 0;
  let i = 2;

  while (countPrimes < n) {
    if (isPrime(i)) {
      sum += i;
      countPrimes++;
    }
    i++;
  }

  return sum;
}

// Part III

// printChildren

function printChildren (parent, ...children) {
  console.log(`${parent}'s children are:`);

  for(var i = 0; i < children.length; i++) {
    console.log(children[i]);
  }
}

// addThree

function addThree (a, b, c) {
  return a + b + c;
}

var arr = [1,2,3];

addThree(...arr);

// dinnerTonightIs

function dinnerTonightIs (food = "pizza") {
  return `Dinner tonight is ${food}.`
}
