var AppDispatcher = require("../dispatcher/dispatcher.js"),
    Store = require("flux/utils").Store,
    _clickCount = 0;

var ClickStore = new Store(AppDispatcher);

ClickStore.count = function () {
    return _clickCount;
};

ClickStore.increment = function () {
  _clickCount++;
  ClickStore.__emitChange();
};

ClickStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case 'INCREMENT':
    ClickStore.increment();
    break;
  }
};

module.exports = ClickStore;
