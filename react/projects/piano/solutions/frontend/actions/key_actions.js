export const KeyConstants = {
  KEY_PRESSED: "KEY_PRESSED",
  KEY_RELEASED: "KEY_RELEASED",
  GROUP_UPDATE: "GROUP_UPDATE",
}

export const groupUpdate = keys => ({
  type: KeyConstants.GROUP_UPDATE,
  keys
});

export const keyPressed = key => ({
  type: KeyConstants.KEY_PRESSED,
  key
});

export const keyReleased = key => ({
  type: KeyConstants.KEY_RELEASED,
  key
});
