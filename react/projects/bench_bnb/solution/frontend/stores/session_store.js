/* jshint esversion: 6 */

import AppDispatcher from '../dispatcher/dispatcher.js';
import { Store } from 'flux/utils';
import SessionConstants from '../constants/session_constants';
import FavoriteConstants from '../constants/favorite_constants';

const SessionStore = new Store(AppDispatcher);

let _currentUser = {},
    _currentUserHasBeenFetched = false;

function _login(currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
}

function _logout() {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
}

function _addFavorite(benchId) {
  _currentUser.favorite_benches.push(parseInt(benchId));
};

function _removeFavorite(benchId) {
  var benchIdx = _currentUser.favorite_benches.indexOf(parseInt(benchId));
  _currentUser.favorite_benches.splice(benchIdx, 1);
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
    	_logout();
      SessionStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_RECEIVED:
      _addFavorite(payload.favorite.benchId);
      SessionStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_REMOVED:
      _removeFavorite(payload.favorite.benchId);
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function () {
	return $.extend({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

module.exports = SessionStore;
