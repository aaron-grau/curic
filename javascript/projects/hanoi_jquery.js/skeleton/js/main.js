var HanoiView = //...require appropriate file
var HanoiGame = //...require appropriate file(look in /hanoi-core-solution)

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl); 
});

