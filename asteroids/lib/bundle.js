/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(7);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const Bullet = __webpack_require__(6);
	const Ship = __webpack_require__(5);
	const Util = __webpack_require__(3);
	
	const Game = function () {
	  this.asteroids = [];
	  this.bullets = [];
	  this.ships = [];
	
	  this.addAsteroids();
	};
	
	Game.BG_COLOR = "#000000";
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.FPS = 32;
	Game.NUM_ASTEROIDS = 10;
	
	Game.prototype.add = function (object) {
	  if (object instanceof Asteroid) {
	    this.asteroids.push(object);
	  } else if (object instanceof Bullet) {
	    this.bullets.push(object);
	  } else if (object instanceof Ship) {
	    this.ships.push(object);
	  } else {
	    throw "wtf?";
	  }
	};
	
	Game.prototype.addAsteroids = function () {
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this.add(new Asteroid({ game: this }));
	  }
	};
	
	Game.prototype.addShip = function () {
	  const ship = new Ship({
	    pos: this.randomPosition(),
	    game: this
	  });
	
	  this.add(ship);
	
	  return ship;
	};
	
	Game.prototype.allObjects = function () {
	  return [].concat(this.ships, this.asteroids, this.bullets);
	};
	
	Game.prototype.checkCollisions = function () {
	  const allObjects = this.allObjects();
	  for (let i = 0; i < allObjects.length; i++) {
	    for (let j = 0; j < allObjects.length; j++) {
	      const obj1 = allObjects[i];
	      const obj2 = allObjects[j];
	
	      if (obj1.isCollidedWith(obj2)) {
	        const collision = obj1.collideWith(obj2);
	        if (collision) return;
	      }
	    }
	  }
	};
	
	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  this.allObjects().forEach((object) => {
	    object.draw(ctx);
	  });
	};
	
	Game.prototype.isOutOfBounds = function (pos) {
	  return (pos[0] < 0) || (pos[1] < 0) ||
	    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
	};
	
	Game.prototype.moveObjects = function (delta) {
	  this.allObjects().forEach((object) => {
	    object.move(delta);
	  });
	};
	
	Game.prototype.randomPosition = function () {
	  return [
	    Game.DIM_X * Math.random(),
	    Game.DIM_Y * Math.random()
	  ];
	};
	
	Game.prototype.remove = function (object) {
	  if (object instanceof Bullet) {
	    this.bullets.splice(this.bullets.indexOf(object), 1);
	  } else if (object instanceof Asteroid) {
	    this.asteroids.splice(this.asteroids.indexOf(object), 1);
	  } else if (object instanceof Ship) {
	    this.ships.splice(this.ships.indexOf(object), 1);
	  } else {
	    throw "wtf?";
	  }
	};
	
	Game.prototype.step = function (delta) {
	  this.moveObjects(delta);
	  this.checkCollisions();
	};
	
	Game.prototype.wrap = function (pos) {
	  return [
	    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
	  ];
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	const Ship = __webpack_require__(5);
	const Bullet = __webpack_require__(6);
	
	const DEFAULTS = {
		COLOR: "#505050",
		RADIUS: 25,
		SPEED: 4
	};
	
	const Asteroid = function (options = {}) {
	  options.color = DEFAULTS.COLOR;
	  options.pos = options.pos || options.game.randomPosition();
	  options.radius = DEFAULTS.RADIUS;
	  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
	
	  MovingObject.call(this, options);
	};
	
	Util.inherits(Asteroid, MovingObject);
	
	Asteroid.prototype.collideWith = function (otherObject) {
	  if (otherObject instanceof Ship) {
	    otherObject.relocate();
			return true;
	  } else if (otherObject instanceof Bullet) {
			this.remove();
			otherObject.remove();
			return true;
		}
	};
	
	
	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	  inherits (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass; }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  },
	
	  wrap (coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  }
	};
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	
	const MovingObject = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
	  // default do nothing
	};
	
	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  );
	  ctx.fill();
	};
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  const centerDist = Util.dist(this.pos, otherObject.pos);
	  return centerDist < (this.radius + otherObject.radius);
	};
	
	MovingObject.prototype.isWrappable = true;
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	MovingObject.prototype.move = function (timeDelta) {
	  //timeDelta is number of milliseconds since last move
	  //if the computer is busy the time delta will be larger
	  //in this case the MovingObject should move farther in this frame
	  //velocity of object is how far it should move in 1/60th of a second
	  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	      offsetX = this.vel[0] * velocityScale,
	      offsetY = this.vel[1] * velocityScale;
	
	  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	
	  if (this.game.isOutOfBounds(this.pos)) {
	    if (this.isWrappable) {
	      this.pos = this.game.wrap(this.pos);
	    } else {
	      this.remove();
	    }
	  }
	};
	
	MovingObject.prototype.remove = function () {
	  this.game.remove(this);
	};
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(4);
	var Util = __webpack_require__(3);
	var Bullet = __webpack_require__(6);
	
	function randomColor() {
	  var hexDigits = "0123456789ABCDEF";
	
	  var color = "#";
	  for (var i = 0; i < 3; i ++) {
	    color += hexDigits[Math.floor((Math.random() * 16))];
	  }
	
	  return color;
	}
	
	var Ship = function (options) {
	  options.radius = Ship.RADIUS;
	  options.vel = options.vel || [0, 0];
	  options.color = options.color || randomColor();
	
	  MovingObject.call(this, options);
	};
	
	Ship.RADIUS = 15;
	
	Util.inherits(Ship, MovingObject);
	
	Ship.prototype.fireBullet = function () {
	  var norm = Util.norm(this.vel);
	
	  if (norm == 0) {
	    // Can't fire unless moving.
	    return;
	  }
	
	  var relVel = Util.scale(
	    Util.dir(this.vel),
	    Bullet.SPEED
	  );
	
	  var bulletVel = [
	    relVel[0] + this.vel[0], relVel[1] + this.vel[1]
	  ];
	
	  var bullet = new Bullet({
	    pos: this.pos,
	    vel: bulletVel,
	    color: this.color,
	    game: this.game
	  });
	
	  this.game.add(bullet);
	};
	
	Ship.prototype.power = function (impulse) {
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
	};
	
	Ship.prototype.relocate = function () {
	  this.pos = this.game.randomPosition();
	  this.vel = [0, 0];
	};
	
	module.exports = Ship;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
	const Bullet = function (options) {
	  options.radius = Bullet.RADIUS;
	
	  MovingObject.call(this, options);
	};
	
	Bullet.RADIUS = 2;
	Bullet.SPEED = 15;
	
	Util.inherits(Bullet, MovingObject);
	
	Bullet.prototype.isWrappable = false;
	
	module.exports = Bullet;


/***/ },
/* 7 */
/***/ function(module, exports) {

	const GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  this.ship = this.game.addShip();
	};
	
	GameView.MOVES = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  const ship = this.ship;
	
	  Object.keys(GameView.MOVES).forEach((k) => {
	    let move = GameView.MOVES[k];
	    key(k, function () { ship.power(move); });
	  });
	
	  key("space", function () { ship.fireBullet() });
	};
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	  this.lastTime = 0;
	  //start the animation
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function(time){
	  const timeDelta = time - this.lastTime;
	
	  this.game.step(timeDelta);
	  this.game.draw(this.ctx);
	  this.lastTime = time;
	
	  //every call to animate requests causes another call to animate
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map