/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__(2);

	$(function () {
	  var rootEl = $(".hanoi");
	  var game = new HanoiGame();
	  new HanoiView(game, $(".hanoi"));
	});



/***/ },
/* 1 */
/***/ function(module, exports) {

	function View (game, $el) {
	  this.game = game;
	  this.$el = $el;

	  this.fromTowerIdx = null;

	  this.$el.on(
	    "click",
	    "ul",
	    this.clickTower.bind(this)
	  );

	  this.setupTowers();
	  this.render();
	};

	View.prototype.clickTower = function (event) {
	  var clickedTowerIdx = $(event.currentTarget).index();

	  if (this.fromTowerIdx == null) {
	    this.fromTowerIdx = clickedTowerIdx;
	  } else {
	    if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
	      alert("Invalid Move! Try again.");
	    }

	    this.fromTowerIdx = null;
	  }

	  this.render();

	  if (this.game.isWon()) {
	    // Remove click handler when done.
	    this.$el.off("click");
	    this.$el.addClass("game-over");
	    alert("Good work, you!");
	  }
	};

	View.prototype.setupTowers = function () {
	  /*
	  We're setting up the skeleton for our towers
	  here. It consist of three <ul> elements, all
	  floated left, with each three nested <li>s.
	  Because the <ul>s are floated, we need to
	  add the `.group` class, containing the clearfix,
	  to their parent. The <li> elements all will be
	  invisible by default. Adding a disk class to
	  them will make them visible.
	  */

	  this.$el.empty();
	  this.$el.addClass("group");

	  var $tower, $disk;

	  for (var towerIdx = 0; towerIdx < 3; towerIdx++) {
	    $tower = $("<ul>");

	    for (var diskIdx = 0; diskIdx < 3; diskIdx++) {
	      $disk = $("<li>");
	      $tower.append($disk);
	    }

	    this.$el.append($tower);
	  };
	};

	View.prototype.render = function () {
	  /*
	  Rather than removing all our elements from the page
	  and building them up again, we are removing only the
	  classes and re-adding them as necessary. This is a
	  more light-weight approach and will speed up the
	  redrawing in the browser.
	  */
	  var $towers = this.$el.find("ul");
	  $towers.removeClass();

	  if (this.fromTowerIdx !== null) {
	    $towers.eq(this.fromTowerIdx).addClass("selected");
	  }

	  this.game.towers.forEach(function(disks, towerIdx){
	    var $disks = $towers.eq(towerIdx).children();
	    $disks.removeClass();

	    disks.forEach(function(diskWidth, diskIdx) {
	      /*
	      Since our disks are stacked from bottom to top
	      as [3, 2, 1], we have to select from the back
	      of our jQuery object, using negative indices.
	      */
	      $disks.eq(-1 * (diskIdx + 1)).addClass("disk-" + diskWidth);
	    });
	  });
	};

	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};

	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];

	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};

	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};

	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};

	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};

	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};

	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }

	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};

	module.exports = Game;


/***/ }
/******/ ]);