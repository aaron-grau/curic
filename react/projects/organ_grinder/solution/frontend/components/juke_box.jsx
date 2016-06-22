const React = require('react');
const TrackStore = require('../stores/track_store');
const TrackApiUtil = require('../util/track_api_util');
const TrackPlayer = require('../components/track_player');

const JukeBox = React.createClass({
  getInitialState() {
    return { tracks: TrackStore.all() };
  },
  
  componentDidMount() {
    this.trackListener = TrackStore.addListener(this._onChange);
    TrackApiUtil.fetchTracks();
  },

  componentWillUnmount() {
    this.trackListener.remove();
  },

  _onChange() {
    this.setState({ tracks: TrackStore.all() });
  },

  render() {
    let jukebox = "No songs recorded yet :("

    if(this.state.tracks.length > 0) {
      jukebox = this.state.tracks.map( (track) => {
        return <TrackPlayer key={track.get('id')} track={track}/>
      });
    }

    return (
      <div className="jukebox">
        <h3>JUKEBOX</h3>
        { jukebox }
      </div>
    );
  }
});

module.exports = JukeBox;
