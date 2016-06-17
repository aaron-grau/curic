const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher');

let _recipes = [];

const RecipeStore = new Store(AppDispatcher);

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
