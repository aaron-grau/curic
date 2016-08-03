import { connect } from 'react-redux';
import JukeBox from './juke_box';

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JukeBox);
