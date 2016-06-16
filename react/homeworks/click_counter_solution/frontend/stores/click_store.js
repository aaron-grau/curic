"use strict";

const AppDispatcher = require("../dispatcher/dispatcher.js");
const Store = require("flux/utils").Store;

let _clickCount = 0;

const ClickStore = new Store(AppDispatcher);

ClickStore.count = () => _clickCount;

ClickStore.increment = () => {
  _clickCount++;
  ClickStore.__emitChange();
};

ClickStore.__onDispatch = payload => {
  switch(payload.actionType){
    case 'INCREMENT':
    ClickStore.increment();
    break;
  }
};

module.exports = ClickStore;
