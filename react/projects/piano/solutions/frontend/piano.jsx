import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Piano from './components/piano'; // app component
import pianoApp from './reducers'; // app reducer

const store = createStore(pianoApp);

document.addEventListener('DOMContentLoaded', function() {
  const rootEl = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
});
