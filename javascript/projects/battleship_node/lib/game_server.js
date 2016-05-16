var socketio = require('socket.io'),
    GameStates = require("../js/lib/game_states.js"),
    SocketMessages = require("../js/lib/socket_messages.js"),
    _ = require('lodash');

var games = [], 
    waitingUsers = [],
    gameId = 1, 
    userGames = {};

function handleDisconnection(socket, io) {
  socket.on('disconnect', function () {
    console.log(socket.id + " has disconnected");
    var index = _.indexOf(waitingUsers, socket.id);
    if(index !== -1){
      //remove the user from list of waiting
      waitingUsers.splice(index, 1);
    }
  });
};
function createGame(socket, io){
  var gameName = "game" + games.length;
  var waitingUser = waitingUsers.shift();
  var newGame = {
    name: gameName, 
    //both users will now need to place their ships
    waitingForShips: [waitingUser.id, socket.id],
    players: [waitingUser.id, socket.id]
  };
  console.log(newGame);
  //make a simple table to connect socket ids to the game object
  userGames[waitingUser.id] = newGame;
  userGames[socket.id] = newGame;
  //make a new room and add both users
  waitingUser.join(gameName);
  socket.join(gameName);
  //inform both users to start placing their ships
  console.log(SocketMessages.CHANGE_STATE, GameStates.PLACE_SHIPS);
  io.to(gameName).emit(SocketMessages.CHANGE_STATE, GameStates.PLACE_SHIPS);
}

function handleConnection(socket, io){
    //if there is at least one user waiting for an opponent
    if(waitingUsers.length > 0){
      //create a new game and let them begin
      createGame(socket, io);
    } else {
      waitingUsers.push(socket);
    }
};

function handleShipsPlaced(socket, io){
  socket.on(SocketMessages.SHIPS_PLACED, function(data){
    var game = userGames[socket.id];
    _.remove(game.waitingForShips, function(id){
      return id === socket.id;
    });
    //both players have placed their battleships, the game can begin!
    if (game.waitingForShips.length === 0) {
      console.log(game.name + " both players ready");
      signalTurn(game, io);
    }
  });
};
function swapPlayers(game){
   game.players.push(game.players.shift());
}
function signalTurn(game, io){
   io.to(game.players[0]).emit(SocketMessages.CHANGE_STATE, GameStates.SHOOT);
   io.to(game.players[1]).emit(SocketMessages.CHANGE_STATE, GameStates.WAIT_FOR_ENEMY_SHOT);
}

function handleShot(socket, io){
  socket.on(SocketMessages.SHOT_ATTEMPT, function(data){
    console.log('shot!!!');
    console.log(data);
    var game = userGames[socket.id];
    io.to(game.players[1]).emit(SocketMessages.SHOT_ATTEMPT, data);
  });
  socket.on(SocketMessages.SHOT_RESPONSE, function(data){
    console.log("shot feedback");
    console.log(data);
    var game = userGames[socket.id];
    io.to(game.players[0]).emit(SocketMessages.SHOT_RESPONSE, data);
    swapPlayers(game);
    signalTurn(game, io);
  });
}
function startGameServer(server){
  var io = socketio.listen(server);
  io.sockets.on('connection', function(socket){
    handleConnection(socket, io);
    handleShipsPlaced(socket, io);
    handleShot(socket, io);
    handleDisconnection(socket, io);
  });
}

module.exports = startGameServer;
