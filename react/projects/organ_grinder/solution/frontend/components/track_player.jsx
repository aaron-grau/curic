const React = require("react");
const TrackApiUtil = require("../util/track_api_util");

const TrackPlayer = React.createClass({
  playClick() {
    this.props.track.play();
  },

  deleteTrack() {
    TrackApiUtil.deleteTrack(this.props.track.get('id'));
  },

  render() {
    return (
      <div className="track">
        <p className="track-name">&#x266C; {this.props.track.get('name')}</p>
        <button className="player-button" onClick={this.playClick}>&#9658; Play</button>
        <button className="player-button delete" onClick={this.deleteTrack}>Delete</button>
      </div>
    );
  }
});

module.exports = TrackPlayer;
