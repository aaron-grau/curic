var React = require('react');

var Tile = React.createClass({
  handleClick: function (e) {
    var flagged = e.altKey ? true : false;
    this.props.updateGame(this.props.tile, flagged);
  },

  render: function () {
    var tile = this.props.tile
    var klass, text, count;
    if (tile.explored) {
      if (tile.bombed) {
        klass = 'bombed';
        text = "\u2622";
      } else {
        klass = 'explored';
        count = tile.adjacentBombCount();
        text = (count > 0 ? count + " " : "")
      }
    } else if (tile.flagged) {
      klass = 'flagged';
      text = "\u2691"
    } else {
      klass = 'unexplored';
    }
    klass = 'tile ' + klass

    return (
      <div className={klass} onClick={this.handleClick}>{text}</div>
    );
  }
});

module.exports = Tile;