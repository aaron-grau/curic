export const NoteConstants = {
  KEY_PRESSED: "KEY_PRESSED",
  KEY_RELEASED: "KEY_RELEASED",
  GROUP_UPDATE: "GROUP_UPDATE",
};

export const keyPressed = key => ({
  type: NoteConstants.KEY_PRESSED,
  key
});

export const keyReleased = key => ({
  type: NoteConstants.KEY_RELEASED,
  key
});

export const groupUpdate = notes => ({
  type: NoteConstants.GROUP_UPDATE,
  notes
});
