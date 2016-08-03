import { connect } from 'react-redux';
import JukeBox from './juke_box';

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    recording: state.recording
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JukeBox);
