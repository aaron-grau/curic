var RecipeWebApiUtil = require('../util/recipe_web_api_util');

var RecipeActions = {
  createRecipe: function (recipe) {
    RecipeWebApiUtil.addRecipe(recipe);

  },
  fetchRecipes: function () {
    RecipeWebApiUtil.getAll();
  }
};

module.exports = RecipeActions;
