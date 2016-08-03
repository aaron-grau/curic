import { connect } from 'react-redux';
import { startRecording, stopRecording } from '../actions/tracks_actions';
// import { startRecording, stopRecording } from '../actions/recording_actions'
import Recorder from './recorder';

const mapStateToProps = ({ tracks, recording }) => ({
  tracks,
  recording
})

const mapDispatchToProps = dispatch => ({
  startRecording: () => {
    console.log('startRecording');
    dispatch(startRecording());
  },
  stopRecording: () => {
    console.log('stopRecording');
    dispatch(stopRecording());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
