import { connect } from 'react-redux';
import { startRecording, stopRecording } from '../actions/tracks_actions';
// import { startRecording, stopRecording } from '../actions/recording_actions'
import Recorder from './recorder';

const mapStateToProps = ({ tracks, recording, playing }) => ({
  tracks,
  recording,
  playing
});

const mapDispatchToProps = dispatch => ({
  startRecording: () => dispatch(startRecording()),
  stopRecording: () => dispatch(stopRecording())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
