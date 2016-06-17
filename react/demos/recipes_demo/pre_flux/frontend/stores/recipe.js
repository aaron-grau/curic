let _recipes = [], _handlers = [];

const RecipeStore = {
  all() {
    return _recipes.slice();
  },
  create(recipe) {
    _recipes.push(recipe);
    RecipeStore.changed();
  },
  addChangeHandler(handler) {
    _handlers.push(handler);
  },
  removeChangeHandler(handler) {
    let idx = _handlers.indexOf(handler);
    if (idx !== -1){
      _handlers.splice(idx, 1);
    }
  },
  changed() {
    _handlers.forEach(function(handler){
      handler();
    });
  }
};

module.exports = RecipeStore;
