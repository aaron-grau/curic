var _recipes = [], _handlers = [];
var RecipeStore = {
  all: function () {
    return _recipes.slice();
  },
  create: function(recipe){
    _recipes.push(recipe);
    RecipeStore.changed();
  },
  addChangeHandler: function(handler){
    _handlers.push(handler);
  },
  removeChangeHandler: function(handler){
    var idx = _handlers.indexOf(handler);
    if (idx !== -1){
      _handlers.splice(idx, 1);
    }
  },
  changed: function(){
    _handlers.forEach(function(handler){
      handler();
    });
  }
};

module.exports = RecipeStore;
