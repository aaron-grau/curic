var FavoriteApiUtil = require('../util/favorite_api_util');
var FavoriteConstants = require('../constants/favorite_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var FavoriteActions = {
  createFavorite: function(data) {
    FavoriteApiUtil.createFavorite(data, this.receiveFavorite);
  },

  deleteFavorite: function(data) {
    FavoriteApiUtil.deleteFavorite(data, this.removeFavorite);
  },

  receiveFavorite: function(favorite){
    AppDispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_RECEIVED,
      favorite: favorite
    });
  },

  removeFavorite: function(favorite){
    AppDispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_REMOVED,
      favorite: favorite
    });
  }
};

module.exports = FavoriteActions;
