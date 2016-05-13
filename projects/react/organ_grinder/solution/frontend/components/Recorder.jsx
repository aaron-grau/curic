var React = require('react'),
    Track = require("../util/Track"),
    KeyStore = require('../stores/KeyStore');

var Recorder = React.createClass({
  componentDidMount: function () {
    KeyStore.addListener(this._keysChanged);
  },

  getInitialState: function () {
    return { recording: false, track: new Track() };
  },

  isDoneRecording: function () {
    return !this.isTrackNew() && !this.state.recording;
  },

  isRecording: function () {
    return this.state.recording;
  },

  isTrackNew: function () {
    return this.state.track.isBlank();
  },

  playClass: function () {
    return "play-button" + this.isTrackNew() ? "" : " disabled";
  },

  playClick: function (e) {
    if(!this.isTrackNew()){
      this.state.track.play();
    }
  },

  recordingMessage: function () {
    if (this.isRecording()) {
      return "Stop Recording";
    } else if (this.isDoneRecording()) {
      return "Done Recording";
    } else {
      return "Start Recording";
    }
  },

  recordClick: function (e) {
    if (this.state.recording) {
      this.state.track.completeRecording();
      this.setState({ recording: false });
    } else {
      this.setState({ recording: true });
      this.state.track.startRecording();
    }
  },

  render: function () {
    var hasTrack = this.isTrackNew();

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

  saveTrack: function (e) {
    this.state.track.set('name', prompt("please enter name"));
    this.state.track.save();
  },

  trackSavingElements: function () {
    if (this.isDoneRecording()) {
      return (
        <button onClick={this.saveTrack} className="control">
          Save Track
        </button>
      );
    }
  },

  _keysChanged: function () {
    if (this.state.recording){
      this.state.track.addNotes(KeyStore.all());
    }
  }
});

module.exports = Recorder;
