import { connect } from 'react-redux';
import { startRecording, stopRecording, addNotes } from '../actions/track_actions';
// import { startRecording, stopRecording } from '../actions/recording_actions'
import Recorder from './recorder';

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    recording: state.recording
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startRecording: () => {
      console.log('startRecording');
      dispatch(startRecording());
    },
    stopRecording: () => {
      console.log('stopRecording');
      dispatch(stopRecording());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
