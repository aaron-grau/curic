const React = require('react');
const Track = require("../util/track");
const KeyStore = require('../stores/key_store');

const Recorder = React.createClass({
  componentDidMount() {
    this.keyListener = KeyStore.addListener(this._keysChanged);
  },

  componentWillUnmount() {
    this.keyListener.remove();
  },

  getInitialState() {
    return { recording: false, track: new Track() };
  },

  isDoneRecording() {
    return !this.isTrackNew() && !this.state.recording;
  },

  isRecording() {
    return this.state.recording;
  },

  isTrackNew() {
    return this.state.track.isBlank();
  },

  playClass() {
    return `play-button${this.isTrackNew()}` ? "" : " disabled";
  },

  playClick(e) {
    if(!this.isTrackNew()){
      this.state.track.play();
    }
  },

  recordingMessage() {
    if (this.isRecording()) {
      return "Stop Recording";
    } else {
      return "Start Recording";
    }
  },

  recordClick(e) {
    if (this.state.recording) {
      this.state.track.completeRecording();
      this.setState({ recording: false});
    } else {
      this.setState({ recording: true});
      this.state.track.startRecording();
    }
  },

  render() {
    const hasTrack = this.isTrackNew();

    return (
      <div className="controls">
        <h3>Recorder</h3>
        <button onClick={this.recordClick} className="record-button">
          { this.recordingMessage() }
        </button>
        { this.trackSavingElements() }
        <button onClick={this.playClick} className={this.playClass()}>
          Play
        </button>
      </div>
    );
  },

  saveTrack(e) {
    this.state.track.set('name', prompt("please enter name"));
    this.state.track.save();
  },

  trackSavingElements() {
    if (this.isDoneRecording()) {
      return (
        <button onClick={this.saveTrack} className="control">
          Save Track
        </button>
      );
    }
  },

  _keysChanged() {
    if (this.state.recording){
      this.state.track.addNotes(KeyStore.all());
    }
  }
});

module.exports = Recorder;
