var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var FavoriteConstants = require('../constants/favorite_constants');

var UserStore = new Store(AppDispatcher);

var _currentUser;

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case FavoriteConstants.FAVORITE_RECEIVED:
      UserStore.addFavorite(payload.favorite.benchId);
      UserStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_REMOVED:
      UserStore.removeFavorite(payload.favorite.benchId);
      UserStore.__emitChange();
      break;
  }
  UserStore.__emitChange();
};

UserStore.addFavorite = function (benchId) {
  _currentUser.favorite_benches.push(parseInt(benchId));
};

UserStore.removeFavorite = function (benchId) {
  var benchIdx = _currentUser.favorite_benches.indexOf(parseInt(benchId));
  _currentUser.favorite_benches.splice(benchIdx, 1);
};


module.exports = UserStore;
