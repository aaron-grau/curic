var dispatcher = require('../dispatcher');

module.exports = {
  createRecipe: function (recipe) {
    dispatcher.dispatch({
      actionType: "CREATE_RECIPE",
      recipe: recipe
    });
  }
}
