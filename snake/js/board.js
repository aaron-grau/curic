const Snake = require('./snake');
const Apple = require('./apple');

function Board(dim) {
  this.dim = dim;

  this.snake = new Snake(this);
  this.apple = new Apple(this);
}

Board.BLANK_SYMBOL = ".";

Board.blankGrid = function (dim) {
  const grid = [];

  for (let i = 0; i < dim; i++) {
    const row = [];
    for (let j = 0; j < dim; j++) {
      row.push(Board.BLANK_SYMBOL);
    }
    grid.push(row);
  }

  return grid;
};

Board.prototype.render = function () {
  const grid = Board.blankGrid(this.dim);

  this.snake.segments.forEach( segment => {
    grid[segment.i][segment.j] = Snake.SYMBOL;
  });

  grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;

  // join it up
  const rowStrs = [];
  grid.map( row => row.join("") ).join("\n");
};

Board.prototype.validPosition = function (coord) {
  return (coord.i >= 0) && (coord.i < this.dim) &&
    (coord.j >= 0) && (coord.j < this.dim);
};

module.exports = Board;
