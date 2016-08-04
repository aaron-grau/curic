import React from 'react';
import NoteKey from './note_key';
import $ from 'jquery';
import { NOTES, TONES } from '../constants/tones';
import Note from '../util/note';

class Piano extends React.Component {
  constructor(props) {
     super(props);
     this.notes = NOTES.map(note => {
       return new Note(TONES[note]);
     });
  }

  componentDidMount() {
    $(document).on('keydown', e => this.onKeyDown(e));
    $(document).on('keyup', e => this.onKeyUp(e));
  }

  onKeyUp(e) {
    this.props.keyUp(e.key);
  }

  onKeyDown(e) {
    this.props.keyDown(e.key);

    if (this.props.recording) {
      this.props.addNotes(this.props.notes);
    }
  }

  playNotes () {
    console.log("play", this.props.notes);
    NOTES.forEach((note, idx) => {
      if (this.props.notes.indexOf(note) !== -1) {
        this.notes[idx].start();
      } else {
        this.notes[idx].stop();
      }
    });
  }

  render() {
    this.playNotes();

    return (
      <div>
        Piano
        <ul>
        {
          NOTES.map((note, idx) => {
            return <NoteKey
              note={note}
              key={idx}
              pressed={this.props.notes.indexOf(note) !== -1}/>
          })
        }
        </ul>
      </div>
    );
  }
};

export default Piano;
