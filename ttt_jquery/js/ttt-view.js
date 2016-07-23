function View (game, $el) {
  this.game = game;
  this.$el = $el;

  this.setupBoard();
  this.bindEvents();
}

View.prototype.bindEvents = function () {
  // install a handler on the `li` elements inside the board.
  this.$el.on("click", "li", ( event => {
    const $square = $(event.currentTarget);
    this.makeMove($square);
  }));
};

View.prototype.makeMove = function ($square) {
  var pos = $square.data("pos");
  var currentPlayer = this.game.currentPlayer;

  try {
    this.game.playMove(pos);
  } catch (e) {
    alert("Invalid move! Try again.");
    return;
  }

  $square.addClass(currentPlayer);

  if (this.game.isOver()) {
    // cleanup click handlers.
    this.$el.off("click");
    this.$el.addClass("game-over");

    const winner = this.game.winner();
    const $figcaption = $("<figcaption>");

    if (winner) {
      this.$el.addClass("winner-" + winner);
      $figcaption.html("You win, " + winner + "!");
    } else {
      $figcaption.html("It's a draw!");
    }

    this.$el.append($figcaption);
  }
};

View.prototype.setupBoard = function () {
  const $ul = $("<ul>");
  $ul.addClass("group");

  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      let $li = $("<li>");
      $li.data("pos", [rowIdx, colIdx]);

      $ul.append($li);
    }
  }

  this.$el.append($ul);
};

module.exports = View;
