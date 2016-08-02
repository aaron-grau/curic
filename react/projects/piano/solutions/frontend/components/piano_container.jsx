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
    keyDown: e => dispatch(keyPressed(keyDown(e))),
    keyUp: e => dispatch(keyReleased(keyUp(e)))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Piano);
