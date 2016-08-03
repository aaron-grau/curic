import { connect } from 'react-redux';
import { startRecording, stopRecording, addNotes } from '../actions/track_actions';
import Recorder from './recorder';

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startRecording: timeStart => dispatch(startRecording(timeStart)),
    stopRecording: timeNow => dispatch(startRecording(timeNow)),
    addNotes: (timeNow, notes) => dispatch(addNotes(timeNow, notes))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
