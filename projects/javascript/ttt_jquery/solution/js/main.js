var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');

$(function () {
  var rootEl = $('.ttt');
  var game = new Game();
  new View(game, rootEl);
});

