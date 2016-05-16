var $ = require('jquery')
    KeyActions = require('../actions/KeyActions'),
    TONES = require("../constants/Tones");

$(function () {
  var NOTE_MAP = {}, tones = Object.keys(window.TONES);
  var validKeys = [
    65, // 'a'
    83, // 's'
    68, // 'd'
    70, // 'f'
    74, // 'j'
    75, // 'k'
    76, // 'l'
    186 // ';'
  ];
  tones.forEach(function(tone, i) {
    NOTE_MAP[validKeys[i]] = tone;
  });

  var _heldKeys = [];

  $(document).on('keydown', function (e) {
    var code = e.keyCode,
        valid = validKeys.indexOf(code) !== -1;
    if (_heldKeys.indexOf(code) === -1 && valid) {
      _heldKeys.push(code);
      KeyActions.keyPressed(NOTE_MAP[code]);
    }
  });

  $(document).on('keyup', function (e) {
    var code = e.keyCode,
        idx = _heldKeys.indexOf(code);
    if (idx !== -1) {
      _heldKeys.splice(idx, 1);
      KeyActions.keyReleased(NOTE_MAP[code]);
    }
  });
});
