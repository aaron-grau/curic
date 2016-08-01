import React from 'react';
// import NoteKeyContainer from './components/note_key_container
import $ from 'jquery';
// import KeyListeners from '../util/key_listeners';

class Piano extends React.Component{
  onComponentDidMount: () => {
    $(document).on('keydown', this.props.keyDown);
    $(document).on('keyup', this.props.keyUp);
  }
  render: () {
    return (
      <div>
      Piano
      </div>
    )
  }
};

export default Piano;
