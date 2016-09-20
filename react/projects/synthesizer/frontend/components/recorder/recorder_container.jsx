import { connect } from 'react-redux';
import { startRecording, stopRecording } from '../../actions/tracks_actions';
import Recorder from './recorder';

const mapStateToProps = ({ isRecording, isPlaying }) => ({
  isRecording,
  isPlaying
});

const mapDispatchToProps = dispatch => ({
  startRecording: () => dispatch(startRecording()),
  stopRecording: () => dispatch(stopRecording())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
