var AppDispatcher = require("../dispatcher/dispatcher.js");

var ClickActions = {
  increment: function(){
    AppDispatcher.dispatch({
      actionType: 'INCREMENT'
    });
  }
};

module.exports = ClickActions;
