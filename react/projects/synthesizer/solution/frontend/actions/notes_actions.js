export const NotesConstants = {
  KEY_PRESSED: "KEY_PRESSED",
  KEY_RELEASED: "KEY_RELEASED",
  GROUP_UPDATE: "GROUP_UPDATE",
};

export const keyPressed = key => ({
  type: NotesConstants.KEY_PRESSED,
  key
});

export const keyReleased = key => ({
  type: NotesConstants.KEY_RELEASED,
  key
});

export const groupUpdate = notes => ({
  type: NotesConstants.GROUP_UPDATE,
  notes
});
