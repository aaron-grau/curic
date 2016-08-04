import React from 'react';
import { TONES } from '../constants/tones';
import Note from '../util/note';

const NoteKey = ({ note, pressed }) => (
  <div className='note-key'>
    {note}
  </div>
);


export default NoteKey;
