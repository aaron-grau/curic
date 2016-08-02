import { connect } from 'react-redux';
import { keyPressed, keyReleased } from '../actions/note_actions';
import { keyDown, keyUp } from '../util/key_event_handlers';
import Piano from './piano';

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    keyDown: key => dispatch(keyPressed(key)),
    keyUp: key => dispatch(keyReleased(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Piano);
