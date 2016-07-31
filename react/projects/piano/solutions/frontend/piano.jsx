import React from 'react';
import ReactDOM from 'react-dom';
import Note from './util/note';

// const Piano = require('./components/piano');
// const $ = require('jquery');
//
// $(function () {
//   const root = document.getElementById('root');
//   console.log(root);
//   // ReactDOM.render(<Organ/>, root);
// });


document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  window.Note = Note;
  // ReactDOM.render(<Root store={store}/>, root);
  console.log(root);
});
