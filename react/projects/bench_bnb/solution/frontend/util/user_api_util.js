import SessionActions from './../actions/session_actions';
import ErrorActions from './../actions/error_actions';

var UserApiUtil = {
  signup(formData) {
    $.ajax({
      url: '/api/user',
      type: 'POST',
      dataType: 'json',
      data: {user: formData},
      success: SessionActions.receiveCurrentUser, //TODO this work?
      error(xhr) {
        console.log('UserApiUtil#createAccount error');
        const errors = xhr.responseJSON;
        ErrorActions.setErrors("signup", errors);
      }
    });
  }
};

export default UserApiUtil;
