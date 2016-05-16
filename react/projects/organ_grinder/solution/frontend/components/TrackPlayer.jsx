var React = require("react");
var TrackPlayer = React.createClass({
  playClick: function () {
    this.props.track.play();
  },

  render: function () {
    return (
      <div className="track">
        <p className="track-name">{this.props.track.get('name')}</p>
        <button onClick={this.playClick}>Play</button>
      </div>
    );
  }
});


module.exports = TrackPlayer;
