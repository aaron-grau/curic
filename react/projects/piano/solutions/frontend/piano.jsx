import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app'; // TODO app component
import pianoApp from './reducers'; // app reducer

import PianoContainer from './components/piano_container';

const store = createStore(pianoApp);
console.log("initial state", store.getState());

document.addEventListener('DOMContentLoaded', function() {
  const rootEl = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
});
