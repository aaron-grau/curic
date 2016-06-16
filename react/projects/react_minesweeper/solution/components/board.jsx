const Tile = require('./tile');
const React = require('react');

const Board = React.createClass({
  render() {
    const board = this.props.board;
    const that = this;
    return(
      <div id="board">
        {this.renderRows()}
      </div>
    );
  },

  renderRows() {
    const board = this.props.board;
    return board.grid.map( (row, i) => {
      return (
        <div className="row" key={`row-${i}`}>
          {this.renderTiles(row, i)}
        </div>
      );
    });
  },

  renderTiles(row, i){
    const board = this.props.board;
    return row.map( (tile, j) => {
      return (
        <Tile
          tile={tile}
          updateGame={this.props.updateGame}
          key={i * board.gridSize + j} />
      );
    });
  }

});

module.exports = Board;
