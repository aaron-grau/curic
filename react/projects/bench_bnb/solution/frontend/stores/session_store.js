import AppDispatcher from '../dispatcher/dispatcher.js';
import { Store } from 'flux/utils';
import SessionConstants from '../constants/session_constants';
import FavoriteConstants from '../constants/favorite_constants';

const SessionStore = new Store(AppDispatcher);

let _currentUser = {},
    _currentUserHasBeenFetched = false;

const _login = currentUser => {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
};

const _logout = () => {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
};

const _addFavorite = benchId => {
  _currentUser.favorite_benches.push(parseInt(benchId));
};

const _removeFavorite = benchId => {
  const benchIdx = _currentUser.favorite_benches.indexOf(parseInt(benchId));
  _currentUser.favorite_benches.splice(benchIdx, 1);
};

SessionStore.__onDispatch = payload => {
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

SessionStore.currentUser = () => Object.assign({}, _currentUser);

SessionStore.currentUserHasBeenFetched = () => _currentUserHasBeenFetched;

SessionStore.isUserLoggedIn = () => !!_currentUser.id;

export default SessionStore;
