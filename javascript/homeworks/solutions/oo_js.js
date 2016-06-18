// Part III

// printChildren

function printChildren(parent, ...children) {
  console.log(`${parent}'s children are:`);

  for( let i = 0; i < children.length; i++ ) {
    console.log(children[i]);
  }
}

// addThree

function addThree(a, b, c) {
  return a + b + c;
}

let arr = [1,2,3];

addThree(...arr);

// dinnerTonightIs

function dinnerTonightIs(food = "pizza") {
  return `Dinner tonight is ${food}.`
}

// Callbacks

// defining the function
function titleize(names, callback) {
  let titleized = names.map(name => `Mx. ${name} Jingleheimer Schmidt`);
  callback(titleized);
};

// invoking the function
titleize(["Mary", "Brian", "Leo"], (names) => {
  names.forEach(name => console.log(name));
});

// Constructors, Prototypes, and `this`

function Elephant(name, height, tricks) {
  this.name = name;
  this.height = height;
  this.tricks = tricks;
}

Elephant.prototype.trumpet = function () {
  console.log(`${this.name} the elephant goes 'phrRRRRRRRRRRR!!!!!!!'`);
};

Elephant.prototype.grow = function () {
  this.height = this.height + 12;
};

Elephant.prototype.addTrick = function (trick) {
  this.tricks.push(trick);
};

Elephant.prototype.play = function () {
  trickIndex = Math.floor(Math.random() * this.tricks.length);
  console.log(`${this.name} is ${this.tricks[trickIndex]}!`);
};



// Function Invocation

Elephant.paradeHelper = function (elephant) {
  console.log(`${elephant.name} is trotting by!`);
};



// Closure

function dinerBreakfast() {
  let order = "I'd like cheesy scrambled eggs and bacon please.";
  console.log(order);

  return function (food) {
    order = `${order.slice(0, order.length - 8)} and ${food} please.`;
    console.log(order);
  };
};
