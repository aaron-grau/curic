function Tile (board, pos) {
  this.board = board;
  this.pos = pos;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
};

Tile.prototype.adjacentBombCount = function() {
  let bombCount = 0;
  this.neighbors().forEach(neighbor => {
    if (neighbor.bombed) {
      bombCount++;
    }
  });
  return bombCount;
};

Tile.prototype.explore = function() {
  if (this.flagged || this.explored) {
    return this;
  }

  this.explored = true;
  if (!this.bombed && this.adjacentBombCount() === 0) {
    this.neighbors().forEach(tile => {
      tile.explore();
    });
  }

};

Tile.prototype.neighbors = function() {
  const adjacentCoords = [];
  Tile.DELTAS.forEach(delta => {
    const newPos = [delta[0] + this.pos[0], delta[1] + this.pos[1]];
    if (this.board.onBoard(newPos)) {
      adjacentCoords.push(newPos);
    }
  });

  return adjacentCoords.map(coord => this.board.grid[coord[0]][coord[1]]);
};

Tile.prototype.plantBomb = function() {
  this.bombed = true;
};

Tile.prototype.toggleFlag = function() {
  if (!this.explored) {
    this.flagged = !this.flagged;
    return true;
  }

  return false;
};


Tile.DELTAS = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1],
             [ 0,  1], [ 1, -1], [ 1,  0], [ 1,  1]]

function Board(gridSize, numBombs) {
  this.gridSize = gridSize;
  this.grid = [];
  this.numBombs = numBombs;
  this.generateBoard();
  this.plantBombs();
}

Board.prototype.generateBoard = function() {
  for (let i = 0; i < this.gridSize; i++) {
    this.grid.push([]);
    for (let j = 0; j < this.gridSize; j++) {
      const tile = new Tile(this, [i, j]);
      this.grid[i].push(tile);
    }
  }
};

Board.prototype.onBoard = function(pos) {
  return (
    pos[0] >= 0 && pos[0] < this.gridSize &&
      pos[1] >= 0 && pos[1] < this.gridSize
  );
};

Board.prototype.plantBombs = function() {
  let totalPlantedBombs = 0;
  while (totalPlantedBombs < this.numBombs) {
    const row = Math.floor(Math.random() * (this.gridSize - 1));
    const col = Math.floor(Math.random() * (this.gridSize - 1));

    tile = this.grid[row][col];
    if (!tile.bombed) {
      tile.plantBomb();
      totalPlantedBombs++;
    }
  }
};

Board.prototype.lost = function() {
  let lost = false;
  this.grid.forEach(row => {
    row.forEach(tile => {
      if (tile.bombed && tile.explored) {
        lost = true;
      }
    });
  });
  return lost;
};

Board.prototype.won = function() {
  let won = true;
  this.grid.forEach(row => {
    row.forEach(tile => {
      if (tile.flagged === tile.revealed || tile.flagged !== tile.bombed) {
        won = false;
      }
    });
  });
  return won;
};

module.exports = {
  Board: Board,
  Tile: Tile
};
