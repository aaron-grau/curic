import AppDispatcher from '../dispatcher/dispatcher';
import ErrorConstants from '../constants/error_constants';

var ErrorActions = {
  setErrors: function (form, errors) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      form: form,
      errors: errors
    });
  },

  clearErrors: function () {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS
    });
  }
};

module.exports = ErrorActions;
