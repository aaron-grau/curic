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
     })
  }

  componentDidMount() {
    $(document).on('keydown', e => {
      this.props.keyDown(e.key)
    });
    $(document).on('keyup', e => {
      this.props.keyUp(e.key)
    });
  }

  render() {
    NOTES.forEach((note, idx) => {
      if (this.props.notes.indexOf(note) !== -1) {
        this.notes[idx].start();
      } else {
        this.notes[idx].stop();
      }
    });
    return (
      <div>
        <ul>
        {
          NOTES.map((note, idx) => {
            return <NoteKey
              note ={note}
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
