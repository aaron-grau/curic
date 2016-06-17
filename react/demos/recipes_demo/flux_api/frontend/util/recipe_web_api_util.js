const RecipeServerActions = require('../actions/recipe_server_actions');

const RecipeWebApiUtil = {
  getAll: function () {
    $.ajax({
      url: "/api/recipes",
      dataType: "json",
      success: function(recipes){
        RecipeServerActions.receiveRecipes(recipes);
      }
    });
  },
  addRecipe: function(recipe){
    $.post("/api/recipes", {recipe: recipe}, function(recipe){
      RecipeServerActions.receiveSingleRecipe(recipe);
    });
  }
};

module.exports = RecipeWebApiUtil;
