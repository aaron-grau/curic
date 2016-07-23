const Coord = require('./coord');

function Snake(board) {
  this.dir = "N";
  this.turning = false;
  this.board = board;

  const center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
  this.segments = [center];

  this.growTurns = 0;
}

Snake.DIFFS = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

Snake.SYMBOL = "S";
Snake.GROW_TURNS = 3;

Snake.prototype.eatApple = function () {
  if (this.head().equals(this.board.apple.position)) {
    this.growTurns += 3;
    return true;
  } else {
    return false;
  }
};

Snake.prototype.isOccupying = function (array) {
  let result = false;
  this.segments.forEach( segment => {
    if (segment.i === array[0] && segment.j === array[1]) {
      result = true;
      return result;
    }
  });
  return result;
};

Snake.prototype.head = function () {
  return this.segments.slice(-1)[0];
};

Snake.prototype.isValid = function () {
  const head = this.head();

  if (!this.board.validPosition(this.head())) {
    return false;
  }

  for (let i = 0; i < this.segments.length - 1; i++) {
    if (this.segments[i].equals(head)) {
      return false;
    }
  }

  return true;
};

Snake.prototype.move = function () {
  // move snake forward
  this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

  // allow turning again
  this.turning = false;

  // maybe eat an apple
  if (this.eatApple()) {
    this.board.apple.replace();
  }

  // if not growing, remove tail segment
  if (this.growTurns > 0) {
    this.growTurns -= 1;
  } else {
    this.segments.shift();
  }

  // destroy snake if it eats itself or runs off grid
  if (!this.isValid()) {
    this.segments = [];
  }
};

Snake.prototype.turn = function (dir) {
  // avoid turning directly back on yourself
  if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||
    this.turning) {
    return;
  } else {
    this.turning = true;
    this.dir = dir;
  }
};

module.exports = Snake;
