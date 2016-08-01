import { combineReducers } from 'redux';
import notes from './notes';

const pianoApp = combineReducers({
  notes
});

export default pianoApp;
