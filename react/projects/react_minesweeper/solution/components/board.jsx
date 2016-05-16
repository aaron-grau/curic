var Tile = require('./tile');
var React = require('react');

var Board = React.createClass({
  render: function () {
    var board = this.props.board;
    var that = this;

    return(
      <div>
      {
        board.grid.map(function(row, i) {
          return (
            <div className='row' key={i}>
            {
              row.map(function(tile, j) {
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