function Coord (i, j) {
  this.i = i;
  this.j = j;
}

Coord.prototype.equals = function(coord2) {
	return (this.i == coord2.i) && (this.j == coord2.j);
}; 

Coord.prototype.isOpposite = function (coord2) {
  return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
};

Coord.prototype.plus = function (coord2) {
  return new Coord(this.i + coord2.i, this.j + coord2.j);
};

module.exports = Coord;
