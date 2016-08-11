import { connect } from 'react-redux';
import { startRecording, stopRecording } from '../../actions/tracks_actions';
import Recorder from './recorder';

const mapStateToProps = ({ tracks, isRecording, playing }) => ({
  tracks,
  isRecording,
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
