var Board = require('./board');
var React = require('react');
var Minesweeper = require('../minesweeper');

var Game = React.createClass({
  getInitialState: function () {
    var board = new Minesweeper.Board(9, 10);
    return({ board: board });
  },

  restartGame: function () {
    var board = new Minesweeper.Board(9, 10);
    this.setState({ board: board });
  },

  updateGame: function (tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board });
  },

  render: function () {
    var modal = "";
    if (this.state.board.lost() || this.state.board.won()) {
      var text = this.state.board.won() ? "You won!" : "You lost!";
      modal = 
        <div className='modal-screen'>
          <div className='modal-content'>
            <p>{text}</p>
            <button onClick={this.restartGame}>Play Again</button>
          </div>
        </div>
    }

    return (
      <div>
        {modal}
        <Board board={this.state.board} updateGame={this.updateGame} />
      </div>
    )
  }
});

module.exports = Game;
