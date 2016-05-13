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
