"use strict";

const AppDispatcher = require('../dispatcher');

module.exports = {
  createRecipe: function (recipe) {
    AppDispatcher.dispatch({
      actionType: "CREATE_RECIPE",
      recipe: recipe
    });
  }
}
