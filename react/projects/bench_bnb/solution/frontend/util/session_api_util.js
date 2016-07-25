import { receiveCurrentUser, receiveErrors } from '../actions/session_actions';

export const login = function(user, dispatch) {
	$.ajax({
		method: 'POST',
		url: '/api/session',
		data: user,
		success(user){
			dispatch(receiveCurrentUser(user));
		},
		error(xhr) {
			const errors = xhr.responseJSON;
			dispatch(receiveErrors(errors));
		}
	});
};

export const signup = function(user, dispatch) {
	$.ajax({
		method: 'POST',
		url: '/api/user',
		data: user,
		success(user){
			dispatch(receiveCurrentUser(user));
		},
		error(xhr) {
			const errors = xhr.responseJSON;
			dispatch(receiveErrors(errors));
		}
	});
};

export const logout = function(success){
	$.ajax({
		method: 'delete',
		url: '/api/session',
		success,
		error: function () {
		  console.log("Logout error in SessionApiUtil#logout");
		}
	});
};
