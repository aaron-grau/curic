var dispatcher = require('../dispatcher');

var RecipeServerActions = {
  receiveRecipes: function (recipes) {
    dispatcher.dispatch({
      actionType: "RECEIVE_RECIPES",
      recipes: recipes
    });
  },
  receiveSingleRecipe: function (recipe) {
    dispatcher.dispatch({
      actionType: "ADD_RECIPE",
      recipe: recipe
    });
  }
};

module.exports = RecipeServerActions;
