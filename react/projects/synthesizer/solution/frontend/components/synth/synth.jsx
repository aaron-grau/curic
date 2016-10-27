import React from 'react';
import NoteKey from './note_key';
import $ from 'jquery';
import { NOTE_NAMES, TONES } from '../../util/tones';
import Note from '../../util/note';

class Synth extends React.Component {
  constructor(props) {
     super(props);
     this.notes = NOTE_NAMES.map(note => new Note(TONES[note])); // array of Note instances
  }

  componentDidMount() {
    $(document).on('keydown', e => this.onKeyDown(e));
    $(document).on('keyup', e => this.onKeyUp(e));
  }

  onKeyUp(e) {
    this.props.keyReleased(e.key);

    if (this.props.isRecording) {
      this.props.addNotes(this.props.notes);
    }
  }

  onKeyDown(e) {
    this.props.keyPressed(e.key);

    if (this.props.isRecording) {
      this.props.addNotes(this.props.notes);
    }
  }

  playNotes() {
    NOTE_NAMES.forEach((note, idx) => {
      if (this.props.notes.indexOf(note) !== -1) { // play notes present in state
        this.notes[idx].start();
      } else {
        this.notes[idx].stop();
      }
    });
  }

  render() {
    this.playNotes();
    const noteKeys = NOTE_NAMES.map((note, idx) => (
      <NoteKey key={idx} note={note} pressed={this.props.notes.includes(note)}/>
    ));

    return (
      <div className="synth">
        <div className="synth-title">
          Redux Synthesizer
        </div>
        <div className='note-key-list'>
          {noteKeys}
        </div>
      </div>
    );
  }
};

export default Synth;
