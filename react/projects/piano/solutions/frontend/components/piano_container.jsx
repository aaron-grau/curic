import { connect } from 'react-redux';
import { keyPressed, keyReleased } from '../actions/notes_actions';
import { addNotes } from '../actions/tracks_actions'
import Piano from './piano';

const mapStateToProps = ({ notes, recording }) => ({
  notes,
  recording
});

const mapDispatchToProps = dispatch => ({
  keyDown: key => dispatch(keyPressed(key)),
  keyUp: key => dispatch(keyReleased(key)),
  addNotes: notes => dispatch(addNotes(notes))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Piano);
