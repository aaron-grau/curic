var Util = require("./util");
var MovingObject = require("./movingObject");
var Ship = require("./ship");

var DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 25,
	SPEED: 4
};

var Asteroid = function (options = {}) {
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};


Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Ship") {
    otherObject.relocate();
  }
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.type = "Asteroid";

module.exports = Asteroid;