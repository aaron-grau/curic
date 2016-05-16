// <script src="/javascripts/game_states.js"></script>
// <script src="/javascripts/battleship.js"></script>
// <script src="/javascripts/battleship_ui.js"></script>
// <script src="/javascripts/ship.js"></script>
// <script src="/javascripts/socket_messages.js"></script>
var Battleship = require('./lib/battleship'),
    BattleshipUI = require('./lib/battleship_ui');

var socket = io();
var game = new Battleship(socket);

$(function(){
  var battleshipUI = new BattleshipUI($('#battleship'), game);
});
