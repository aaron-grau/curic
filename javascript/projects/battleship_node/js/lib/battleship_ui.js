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
