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
