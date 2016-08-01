import React from 'react';
// import NoteKeyContainer from './components/note_key_container
import $ from 'jquery';
// import KeyListeners from '../util/key_listeners';

class Piano extends React.Component {
  constructor(props) {
     super(props);
   }
  componentDidMount() {
    console.log(this);
  }
  render() {
    return (
      <div>
        Piano
      </div>
    );
  }
};

export default Piano;
