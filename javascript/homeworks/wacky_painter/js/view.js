/* jshint esversion: 6 */

function View($el) {
  this.$el = $el;
  this.setupEasel();
}

View.prototype.exercise0 = () => {
  //Challenge: (example) remove the 'square' class from every li
  //Result: this should cause the grid to turn into a long list of undecorated lis
  //just a list of dots

  //this one completed as an example :) no additional code necessary
  $('li').removeClass("square");
};

View.prototype.exercise1 = () => {
  //Challenge: Give every square the class 'orange'
  //Result: every square should turn orange (we already have a CSS rule)

  //your code here!
};

View.prototype.exercise2 = () => {
  //Challenge: Give every square a dashed border
  //Result: Every square gets a dashed border. The grid is no longer a square
  //because the dimensions of the squares are different and they no longer fit
  //into the grid's width.

  //your code here!
};

View.prototype.exercise3 = () => {
  //Challenge: Add an <h1> with the text 'i love jquery' under the grid.
  //Result: An <h1> with the text 'i love jquery' appears under the grid.

  //your code here!
};

View.prototype.exercise4 = () => {
  //Challenge: Write your first name in every other square.
  //Result: Your name appears in every other square.

  //your code here!
};

View.prototype.exercise5 = () => {
  //Challenge: Alert the row and column of the square, when the square is clicked.
  //Result: When a square is clicked, the row and column appear in an alert. for
  //example: clicking the top left square should alert '0, 0'.

  //hint: look at line 28 of this file: we set the 'data-pos' of every square
  //your code here!
};

View.prototype.exercise6 = () => {
  //Challenge: Give every square a random color!
  //Result: Every square becomes a color as soon as this code runs. The grid
  //should become a beautiful rainbow of colors.

  //your code here!
  //hint: this array might make it easy to assign random colors
  const colors = [
    'darksalmon',
    'cornflowerblue',
    'red',
    'yellow',
    'wheat',
    'hotpink',
    'lawngreen'
  ];
};

View.prototype.exercise7 = () => {
  //Challenge: When your mouse goes over a square, console log its color.
  //Result: When the mouse goes over a square its color should appear in the
  //console. The color won't be the color's name, but its rbg value.
  //You should push the button for exercise 6 first to try it on the
  //rainbow.

  //your code here!
};


View.prototype.setupEasel = function() {
  const $addRowButton = $("<button>").html("Add a row");
  this.$el.append($addRowButton);
  $addRowButton.on("click", this.addRow.bind(this));

  for(let j = 0; j <= 7; j++){
    const $button = $("<button>").html("Exercise " + j);
    $button.on("click", this["exercise" + j]);
    this.$el.append($button);
  }

  for(let i = 0; i < 20; i ++) {
    this.addRow();
  }

  this.bindEvents();
};

View.prototype.bindEvents = function() {
  const colors = [
    'darksalmon',
    'cornflowerblue',
    'red',
    'yellow',
    'wheat',
    'hotpink',
    'lawngreen'
  ];

  this.$el.on("mouseenter", ".square", e => {
    const $square = $(e.currentTarget);
    const numColor = Math.floor(Math.random() * colors.length);
    $square.css("background-color", colors[numColor]);
  });
};

View.prototype.addRow = function() {
  const rowIdx = this.$el.find(".row").length;
  const $row = $("<ul>").addClass("row").addClass("group");
  for(let colIdx = 0; colIdx < 20; colIdx++) {
    const $square = $("<li>").addClass("square").attr("data-pos", [rowIdx, colIdx]);
    $row.append($square);
  }
  this.$el.append($row);
};


//WARNING SOLUTIONS BELOW!!!!
//WORK AS HARD AS POSSIBLE ON SOLVING EACH PROBLEM
//BEFORE READING ITS SOLUTION
//
// View.prototype.exercise1 = () => {
//   $("li").addClass("orange");
// };
//
//
//
//
//
//
//
//
// View.prototype.exercise2 = () => {
//   $(".square").css("border", "dashed");
// };
//
//
//
//
//
//
//
//
//
// View.prototype.exercise3 = () => {
//   const h1 = $("<h1>").text("I love jQuery");
//   $("#easel").append(h1);
// };
//
//
//
//
//
//
//
//
//
// View.prototype.exercise4 = () => {
//   $(".square:nth-child(even)").text("Jeff");
//   //this could also be solved using iteration and %
// };
//
//
//
//
//
//
//
//
//
// View.prototype.exercise5 = () => {
//   //hint: look at line 28 of this file: we set the 'data-pos' of every square
//   $('.square').on("click", e => {
//     const $sq = $(e.currentTarget);
//     alert($sq.attr("data-pos"));
//   });
// };
//
//
//
//
//
//
//
//
//
// View.prototype.exercise6 = () => {
//   const colors = [
//     'darksalmon',
//     'cornflowerblue',
//     'red',
//     'yellow',
//     'wheat',
//     'hotpink',
//     'lawngreen'
//   ];
//
//   $('.square').each( (idx, el) => {
//     const $sq = $(el);
//     const color = colors[Math.floor((Math.random() * colors.length))];
//     $sq.css("background-color", color)
//   })
// };
//
//
//
//
//
//
//
//
//
// View.prototype.exercise7 = () => {
//   $('#easel').on("mouseenter", ".square", e => {
//     const $sq = $(e.currentTarget);
//     console.log($sq.css("background-color"));
//   });
// };

module.exports = View;
