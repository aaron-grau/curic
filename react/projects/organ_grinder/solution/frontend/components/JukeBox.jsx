const React = require('react');
const TrackStore = require('../stores/TrackStore');
const TrackApiUtil = require('../util/TrackApiUtil');
const TrackPlayer = require('../components/TrackPlayer');

const JukeBox = React.createClass({
  componentDidMount() {
    TrackStore.addListener(this._onChange);
    TrackApiUtil.fetchTracks();
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
