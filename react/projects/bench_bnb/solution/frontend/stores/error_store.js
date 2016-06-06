const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/error_constants');

const ErrorStore = new Store(AppDispatcher);
let _errors = {};
let _form = "";

ErrorStore.formErrors = form => {
  if (form !== _form) {
    return {};
  }

  let result = {};

  let errors;
  Object.keys(_errors).forEach( field => {
    errors = _errors[field];
    result[field] = Array.from(errors);
  });

  return result;
};

ErrorStore.form = () => Array.from(_form);

ErrorStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _errors = payload.errors;
      _form = payload.form;
      ErrorStore.__emitChange();
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _errors = {};
      _form = "";
      ErrorStore.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
