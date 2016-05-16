(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GameStates = require('./game_states.js'),
    SocketMessages = require('./socket_messages.js'),
    Ship = require('./ship.js');
var Sock

function Battleship(socket){
  this.state = GameStates.WAITING_FOR_OPPONENT;
  this.socket = socket;
  this.ships = [];
  this.myShots = [];
  this.enemyShots = [];
  this.shipsToPlace = [
    new Ship(Ship.Types.DESTROYER),
    new Ship(Ship.Types.CRUISER),
    new Ship(Ship.Types.SUBMARINE),
    new Ship(Ship.Types.BATTLESHIP),
    new Ship(Ship.Types.AIRCRAFT_CARRIER)
  ];
  this.registerSocketEvents();
}

$.extend(Battleship.prototype, {
  registerSocketEvents: function(){
    var that = this;
    this.socket.on(SocketMessages.CHANGE_STATE, function(newState){ 
      console.log(SocketMessages.CHANGE_STATE, newState);
      that.changeState(newState);
    });
    this.socket.on(SocketMessages.SHOT_ATTEMPT, function(loc){
      console.log(SocketMessages.SHOT_ATTEMPT, loc);
      var results = that.processEnemyShot(loc);
      that.socket.emit(SocketMessages.SHOT_FEEDBACK, results);
    });
    this.socket.on(SocketMessages.SHOT_RESPONSE, function(data){
      console.log(SocketMessages.SHOT_RESPONSE, data);
      if(data.allShipsSunk){
        alert("YOU WON!!!");
      }
      that.handleShotFeedback(data);
    });
  },
  changeState: function(newState){
    console.log("new state: " + newState);
    this.stateChanged(newState);
    this.state = newState;
  },
  processEnemyShot: function(loc){
    var results = {
      col: loc.col, 
      row: loc.row, 
      hit: false, 
      allShipsSunk: true
    };
    this.enemyShots.push(loc);
    this.ships.forEach(function(ship){
      ship.segments.forEach(function(segment){
        if(segment.row == loc.row && segment.col == loc.col){
          segment.hit = true;
          results.hit = true;
        }
        //if any segment isn't hit the game is not yet over!
        if(segment.hit === false){
          results.allShipsSunk = false;
        }
      });
    });

    this.changed();
    this.socket.emit(SocketMessages.SHOT_RESPONSE, results);
    return results;
  },
  handleShotFeedback: function(data){
    this.myShots.push(data);
    this.changed();
  },
  placeShip: function(loc){
    if (this.state !== GameStates.PLACE_SHIPS){
      return;
    }
    //placing ship in beginning of this.shipsToPlace
    if (this.firstClick){
      if (this.shipsToPlace[0].place(this.firstClick, loc)){
        this.ships.push(this.shipsToPlace.shift());
        if (this.shipsToPlace.length == 0) { 
          this.changeState(GameStates.WAIT_FOR_ENEMY_SHIPS);
          this.socket.emit(SocketMessages.SHIPS_PLACED);
        }
      }
      delete this.firstClick;
    } else {
      this.firstClick = loc;
    }
    this.changed();
  },
  shoot: function(loc){
    if(this.state == GameStates.SHOOT){
      this.socket.emit(SocketMessages.SHOT_ATTEMPT, loc);
    }
  },
});

module.exports = Battleship;

},{"./game_states.js":3,"./ship.js":4,"./socket_messages.js":5}],2:[function(require,module,exports){
function BattleshipUI($el, game, socketManager){
  this.$root = $el;
  this.game = game;
  this.socketManager = socketManager;
  //a render callbak
  this.game.changed = this.render.bind(this);
  this.game.stateChanged = this.updateState.bind(this);
  this.createGrids();
}

$.extend(BattleshipUI.prototype, {
  updateState: function(state){
    this.$root.find('.game-state').val(state);
  },
  render: function(){
    var that = this;
    //draw the ship segments
    this.game.ships.forEach(function(ship){
      ship.segments.forEach(function(segment){
        var tile = that.tileByLoc(segment, true);
        tile.css('background-color', 'grey');
      });
    });
    //draw our shots on enemy's grid
    this.game.myShots.forEach(function(shot){
      var tile = that.tileByLoc(shot, false);
      tile.html('x');
      if(shot.hit){
        tile.css('background-color', 'grey')
      }
    });
    //draw enemy's shots on our grid
    this.game.enemyShots.forEach(function(shot){
      var tile = that.tileByLoc(shot, true);
      tile.html('x');
    });
  },
  createGrids: function(){
    this.$root.html("<div class='grid primary-grid'/><div class='grid enemy-grid'/>");
    var grid = this.$root.find('.grid');
    var string = "";
    _.times(10, function(row){
      _.times(10, function(col){
        string += "<div class='tile' data-row='" + row; 
        string += "' data-col='" + col + "'></div>";
      });
    });
    grid.html(string);
    var stateInput = "<input value='" + this.game.state; 
    stateInput += "' type='text' disabled='true' class='game-state'/>";

    this.$root.prepend(stateInput);
    this.friendlyClick = this.tileClicked.bind(this, true);
    this.enemyClick = this.tileClicked.bind(this, false);
    this.$root.find('.primary-grid').on('click', '.tile', this.friendlyClick);
    this.$root.find('.enemy-grid').on('click', '.tile', this.enemyClick);
  },
  tileByLoc: function(loc, friendly){
    var gridSelector = friendly ? ".primary-grid" : ".enemy-grid";
    var $grid = this.$root.find(gridSelector);
    var sel = ".tile[data-row='" + loc.row + "']";
    sel += "[data-col='" + loc.col + "']";
    return $grid.find(sel);
  },
  tileClicked: function(friendly, e){
    var $tile = $(e.currentTarget);
    var loc = {
      row: $tile.data('row'),
      col: $tile.data('col'),
    };
    if(friendly){
      this.game.placeShip(loc);
    } else {
      this.game.shoot(loc);
    }
  },
});

module.exports = BattleshipUI;

},{}],3:[function(require,module,exports){
GameStates = {
  WAITING_FOR_OPPONENT: "WAITING_FOR_OPPONENT",
  PLACE_SHIPS: "PLACE_SHIPS",
  WAIT_FOR_ENEMY_SHIPS: "WAIT_FOR_ENEMY_SHIPS",
  SHOOT: "SHOOT",
  WAIT_FOR_ENEMY_SHOT: "WAIT_FOR_ENEMY_SHOT" 
}

module.exports = GameStates;

},{}],4:[function(require,module,exports){
function Ship(options){
  this.segments = new Array(options.length);
}

Ship.Types = {
  DESTROYER: {length: 2}, 
  CRUISER: {length: 3},
  SUBMARINE: {length: 3},
  BATTLESHIP: {length: 4},
  AIRCRAFT_CARRIER: {length: 5}
}

$.extend(Ship.prototype, {
  place: function(start, end){
    if(this.validCoords(start, end)){
      var segments = this.segments, nextRow, nextCol;
      _.times(this.segments.length, function(i){
        if (start.row === end.row){
          nextRow = start.row;
          nextCol = start.col + i;
        } else {
          nextRow = start.row + i;
          nextCol = start.col;
        }
        segments[i] = {row: nextRow, col: nextCol, hit: false};
      });
      return true;
    } else {
      return false;
    }
  },
  validCoords: function(start, end){
    //is it not diagonal and proper length?
    if (start.row == end.row) {
      return (end.col - start.col) === this.segments.length - 1;
    } else if (start.col == end.col ){
      return (end.row - start.row) === this.segments.length - 1;
    }
  },
});

module.exports = Ship;

},{}],5:[function(require,module,exports){
SocketMessages = {
  CHANGE_STATE: "CHANGE_STATE",
  SHOT_ATTEMPT: "SHOT_ATTEMPT",
  SHOT_RESPONSE: "SHOT_RESPONSE",
  SHIPS_PLACED: "SHIPS_PLACED",
}


if(typeof(module) !== 'undefined'){
  module.exports = SocketMessages
}

},{}],6:[function(require,module,exports){
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

},{"./lib/battleship":1,"./lib/battleship_ui":2}]},{},[6]);
