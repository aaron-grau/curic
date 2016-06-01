/* jshint esversion: 6 */

import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher';
import ErrorConstants from '../constants/error_constants';

const ErrorStore = new Store(AppDispatcher);
let _errors = {};
let _form = "";

ErrorStore.formErrors = function (form) {
  if (form !== _form) {
    return {};
  }

  var result = {};

  var errors;
  Object.keys(_errors).forEach(function (field) {
    errors = _errors[field];
    result[field] = errors.slice();
  });

  return result;
};

ErrorStore.form = function () {
  return _form.slice();
};


ErrorStore.__onDispatch = function (payload) {
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
