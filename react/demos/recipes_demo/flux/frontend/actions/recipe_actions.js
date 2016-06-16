"use strict";

const Dispatcher = require('../dispatcher');

module.exports = {
  createRecipe: function (recipe) {
    Dispatcher.dispatch({
      actionType: "CREATE_RECIPE",
      recipe: recipe
    });
  }
}
