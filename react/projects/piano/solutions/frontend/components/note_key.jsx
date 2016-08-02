import React from 'react';
import { TONES } from '../constants/tones';
import Note from '../util/note';

class NoteKey extends React.Component {
  constructor(props) {
     super(props);
    //  this.note = new Note(TONES[this.props.note]);
  }

  render() {
    return (
      <li>{this.props.note}</li>
    );
  }
};

export default NoteKey;
