import React from 'react';
import NoteKey from './note_key';
import $ from 'jquery';
import { NOTES, TONES } from '../constants/tones';
import Note from '../util/note';

class Piano extends React.Component {
  constructor(props) {
     super(props);
     this.notes = NOTES.map(note => new Note(TONES[note])); // array of Note instances
  }

  componentDidMount() {
    $(document).on('keydown', e => this.onKeyDown(e));
    $(document).on('keyup', e => this.onKeyUp(e));
  }

  onKeyUp(e) {
    this.props.keyUp(e.key);

    if (this.props.recording) {
      this.props.addNotes(this.props.notes);
    }
  }

  onKeyDown(e) {
    this.props.keyDown(e.key);

    if (this.props.recording) {
      this.props.addNotes(this.props.notes);
    }
  }

  playNotes () {
    NOTES.forEach((note, idx) => {
      if (this.props.notes.indexOf(note) !== -1) { // play notes present in state
        this.notes[idx].start();
      } else {
        this.notes[idx].stop();
      }
    });
  }

  render() {
    this.playNotes();
    const noteKeys = NOTES.map((note, idx) => (
      <NoteKey
        key={idx}
        note={note}
        pressed={this.props.notes.indexOf(note) !== -1} />
    ));

    return (
      <div className="piano">
        <div className='note-key-list'>
          {noteKeys}
        </div>
      </div>
    );
  }
};

export default Piano;
