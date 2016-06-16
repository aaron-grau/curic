var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher');

var _recipes = [];

var RecipeStore = new Store(dispatcher);

RecipeStore.all = function () {
  return _recipes.slice();
};

RecipeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "CREATE_RECIPE":
      _recipes.push(payload.recipe);
      RecipeStore.__emitChange();
      break;
  }
};

module.exports = RecipeStore;
