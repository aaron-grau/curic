var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var UserStore = new Store(AppDispatcher);

var _currentUser, _errors;

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "LOGIN":
    	UserStore.login(payload.user);
      break;
    case "LOGOUT":
    	UserStore.logout();
      break;
    case "ERROR":
      UserStore.setErrors(payload.errors);
      break;
    case "FAVORITE_RECEIVED":
      UserStore.addFavorite(payload.favorite.benchId);
      UserStore.__emitChange();
      break;
    case "FAVORITE_REMOVED":
      UserStore.removeFavorite(payload.favorite.benchId);
      UserStore.__emitChange();
      break;
  }
  UserStore.__emitChange();
};

UserStore.addFavorite = function(benchId) {
  _currentUser.favorite_benches.push(parseInt(benchId));
};

UserStore.removeFavorite = function(benchId) {
  var benchIdx = _currentUser.favorite_benches.indexOf(parseInt(benchId));
  _currentUser.favorite_benches.splice(benchIdx, 1);
};

UserStore.login = function(user){
	_currentUser = user;
  _errors = null;
};

UserStore.logout = function(){
  _currentUser = null;
  _errors = null;
};

UserStore.currentUser = function(){
  if (_currentUser) {
  	return $.extend({}, _currentUser);
  }
};

UserStore.setErrors = function(errors){
  _errors = errors;
};

UserStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
};

module.exports = UserStore;
