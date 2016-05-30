import Board from './board';
import React from 'react';
import Minesweeper from '../minesweeper';

const Game = React.createClass({
  getInitialState() {
    const board = new Minesweeper.Board(9, 10);
    return({ board });
  },

  restartGame() {
    const board = new Minesweeper.Board(9, 10);
    this.setState({ board });
  },

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board });
  },

  render() {
    let modal = "";
    if (this.state.board.lost() || this.state.board.won()) {
      const text = this.state.board.won() ? "You won!" : "You lost!";
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

export default Game;
