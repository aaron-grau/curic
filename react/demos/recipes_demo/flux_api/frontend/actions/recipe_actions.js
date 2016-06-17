const RecipeWebApiUtil = require('../util/recipe_web_api_util');

const RecipeActions = {
  createRecipe(recipe) {
    RecipeWebApiUtil.addRecipe(recipe);

  },
  fetchRecipes() {
    RecipeWebApiUtil.getAll();
  }
};

module.exports = RecipeActions;
