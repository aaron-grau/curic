"use strict";

const AppDispatcher = require("../dispatcher/dispatcher.js");

const ClickActions = {
  increment() {
    AppDispatcher.dispatch({
      actionType: 'INCREMENT'
    });
  }
};

module.exports = ClickActions;
