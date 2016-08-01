import { connect } from 'react-redux';
import { keyPressed, keyReleased } from '../actions/note_actions';
import { keyDown, keyUp } from '../util/key_event_handlers';
import Piano from './piano';

// event handlers for key down and key up events
// const keyDown = (e => {
//     const key = e.key;
//     const valid = validKeys.indexOf(key) !== -1;
//     const held = heldKeys.indexOf(key) !== -1;
//     if (valid && !held) {
//       heldKeys.push(key);
//       // keyActions.keyPressed(keyMap[key]);
//       return keyMap[key];
//     }
//   });
// }

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    keyDown: e => dispatch(keyPressed(keyDown(e))
    keyUp: e => dispatch(keyReleased(keyUp(e))
  };
};

const default connect(
  mapStateToProps,
  mapDispatchToProps
)(Piano);
