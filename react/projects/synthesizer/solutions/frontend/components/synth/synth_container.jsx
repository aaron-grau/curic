import { connect } from 'react-redux';
import { keyPressed, keyReleased } from '../../actions/notes_actions';
import { addNotes } from '../../actions/tracks_actions';
import Synth from './synth';

const mapStateToProps = ({ notes, isRecording }) => ({
  notes,
  isRecording
});

const mapDispatchToProps = dispatch => ({
  keyPressed: key => dispatch(keyPressed(key)),
  keyReleased: key => dispatch(keyReleased(key)),
  addNotes: notes => dispatch(addNotes(notes))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Synth);
