export const NoteConstants = {
  KEY_PRESSED: "KEY_PRESSED",
  KEY_RELEASED: "KEY_RELEASED",
  GROUP_UPDATE: "GROUP_UPDATE",
}

export const groupUpdate = notes => ({
  type: NoteConstants.GROUP_UPDATE,
  notes
});

export const keyPressed = note => ({
  type: NoteConstants.KEY_PRESSED,
  note
});

export const keyReleased = note => ({
  type: NoteConstants.KEY_RELEASED,
  note
});
