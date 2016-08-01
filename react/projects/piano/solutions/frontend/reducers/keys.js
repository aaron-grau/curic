import { KeyConstants } from '../actions/key_actions';

const keys = (state = [], action) => {
  switch(action.type) {
    case KeyConstants.GROUP_UPDATE:
      return [
        ...action.keys
      ];
    case KeyConstants.KEY_PRESSED:
      return [
        ...state,
        action.key
      ];
    case KeyConstants.KEY_RELEASED:
      const idx = state.indexOf(action.key);
      return [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];
    default:
      return state;
  }
};

export default keys;
