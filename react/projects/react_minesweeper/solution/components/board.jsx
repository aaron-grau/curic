const Tile = require('./tile');
const React = require('react');

const Board = React.createClass({
  render() {
    const board = this.props.board;
    const that = this;

    return(
      board.grid.map((row, i) => (
        <div className='row' key={i}>
          {
            row.map((tile, j) => (
              <Tile
                tile={tile}
                updateGame={that.props.updateGame}
                key={i * board.gridSize + j} />
            ))
          }
        </div>
      ))
    );
  }
});

module.exports = Board;
