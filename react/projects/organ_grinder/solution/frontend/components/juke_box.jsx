const React = require('react');
const TrackStore = require('../stores/track_store');
const TrackApiUtil = require('../util/track_api_util');
const TrackPlayer = require('../components/track_player');

const JukeBox = React.createClass({
  componentDidMount() {
    this.trackListener = TrackStore.addListener(this._onChange);
    TrackApiUtil.fetchTracks();
  },

  componentWillUnmount() {
    this.trackListener.remove();
  },

  getInitialState() {
    return { tracks: TrackStore.all() };
  },

  render() {
    return (
      <div className="jukebox">
        <h3>JUKEBOX</h3>
        {
          this.state.tracks.map(track => <TrackPlayer key={track.get('id')} track={track}/>)
        }
      </div>
    );
  },

  _onChange() {
    this.setState({ tracks: TrackStore.all() });
  }
});

module.exports = JukeBox;
