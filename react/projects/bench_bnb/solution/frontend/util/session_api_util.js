import SessionActions from './../actions/session_actions';
import ErrorActions from './../actions/error_actions';

const SessionApiUtil = {
	login(credentials) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: {user: credentials},
			success: SessionActions.receiveCurrentUser(currentUser), //TODO this work?
			error(xhr) {
        const errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
			}
		});
	},

	logout() {
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success: function () {
        console.log("Logout success (SessionApiUtil#logout)");
        SessionActions.removeCurrentUser();
      },
			error: function () {
			  console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	fetchCurrentUser(complete) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success: function (currentUser) {
			  SessionActions.receiveCurrentUser(currentUser);
			},
			error: function (xhr) {
			  console.log("Error in SessionApiUtil#fetchCurrentUser");
			},
      complete: function(){
				complete();
			}
		});
	}
};

export default SessionApiUtil;
