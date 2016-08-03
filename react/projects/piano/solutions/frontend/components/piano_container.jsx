import { connect } from 'react-redux';
import { keyPressed, keyReleased } from '../actions/note_actions';
import { addNotes } from '../actions/track_actions'
import Piano from './piano';

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    recording: state.recording
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    keyDown: key => {
      console.log('keyPressed');
      dispatch(keyPressed(key));
    },
    keyUp: key => dispatch(keyReleased(key)),
    addNotes: notes => {
      console.log('addNotes');
      dispatch(addNotes(notes));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Piano);
