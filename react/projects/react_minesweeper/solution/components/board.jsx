const Tile = require('./tile');
const React = require('react');

const Board = React.createClass({
  render() {
    const board = this.props.board;
    const that = this;

    return(
      <div>
      {
        board.grid.map((row, i) => {
          return (
            <div className='row' key={i}>
            {
              row.map((tile, j) => {
                return (
                  <Tile
                    tile={tile}
                    updateGame={that.props.updateGame}
                    key={i * board.gridSize + j} />
                )
              })
            }
            </div>
          );
        })
      }
      </div>
    );
}
});

module.exports = Board;
