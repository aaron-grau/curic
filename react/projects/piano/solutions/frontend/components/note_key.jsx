import React from 'react';
import { TONES } from '../constants/tones';
import Note from '../util/note';

const NoteKey = ({ note, pressed }) => (
  <li>{note}</li>
);


export default NoteKey;
