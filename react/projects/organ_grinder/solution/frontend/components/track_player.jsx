const React = require("react");

const TrackPlayer = React.createClass({
  playClick() {
    this.props.track.play();
  },

  render() {
    return (
      <div className="track">
        <p className="track-name">{this.props.track.get('name')}</p>
        <button onClick={this.playClick}>Play</button>
      </div>
    );
  }
});

module.exports = TrackPlayer;
