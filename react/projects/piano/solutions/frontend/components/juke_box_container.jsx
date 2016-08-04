import { connect } from 'react-redux';
import { deleteTrack } from '../actions/tracks_actions';
import { groupUpdate } from '../actions/notes_actions';
import JukeBox from './juke_box';

const mapStateToProps = ({ tracks, recording }) => ({
  tracks,
  recording
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => e => {
    dispatch(deleteTrack(id));
  },
  groupUpdate: notes => {
    dispatch(groupUpdate(notes));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JukeBox);
