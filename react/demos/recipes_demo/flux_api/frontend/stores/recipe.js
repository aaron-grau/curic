var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher');

var _recipes = [];
var RecipeStore = new Store(dispatcher);

RecipeStore.all = function () {
  return _recipes.slice();
};

RecipeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ADD_RECIPE":
      _recipes.push(payload.recipe);
      RecipeStore.__emitChange();
      break;
    case "RECEIVE_RECIPES":
      resetRecipes(payload.recipes);
      RecipeStore.__emitChange();
  }
};

function resetRecipes(recipes) {
  _recipes = recipes;
}
module.exports = RecipeStore;
