const React = require("react");

const TrackPlayer = React.createClass({
  playClick() {
    this.props.track.play();
  },

  deleteTrack() {

  },

  render() {
    return (
      <div className="track">
        <p className="track-name">&#x266C; {this.props.track.get('name')}</p>
        <button className="player-button" onClick={this.playClick}>Play</button>
        <button className="player-button delete" onClick={this.deleteTrack}>Delete</button>
      </div>
    );
  }
});

module.exports = TrackPlayer;
