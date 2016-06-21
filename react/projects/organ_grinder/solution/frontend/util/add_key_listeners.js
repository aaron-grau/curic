const $ = require('jquery');
const KeyActions = require('../actions/key_actions');
const TONES = require("../constants/tones");

const NOTE_MAP = {};
const tones = Object.keys(TONES);
const validKeys = [
  65, // 'a'
  83, // 's'
  68, // 'd'
  70, // 'f'
  74, // 'j'
  75, // 'k'
  76, // 'l'
  186 // ';'
];
tones.forEach((tone, i) => {
  NOTE_MAP[validKeys[i]] = tone;
});

const _heldKeys = [];

module.exports = () => {
  $(document).on('keydown', e => {
    const code = e.keyCode, valid = validKeys.indexOf(code) !== -1;
    if (_heldKeys.indexOf(code) === -1 && valid) {
      _heldKeys.push(code);
      KeyActions.keyPressed(NOTE_MAP[code]);
    }
  });

  $(document).on('keyup', e => {
    const code = e.keyCode, idx = _heldKeys.indexOf(code);
    if (idx !== -1) {
      _heldKeys.splice(idx, 1);
      KeyActions.keyReleased(NOTE_MAP[code]);
    }
  });
};
