// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
//
// import App from './components/app';
// import pianoApp from './reducers';
//
// import PianoContainer from './components/piano_container';
//
// const store = createStore(pianoApp);
//
// document.addEventListener('DOMContentLoaded', function() {
//   const rootEl = document.getElementById('root');
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     rootEl
//   );
// });

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/store';
import App from './components/app';

document.addEventListener('DOMContentLoaded', function() {
  const store = configureStore();
  const rootEl = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
});
