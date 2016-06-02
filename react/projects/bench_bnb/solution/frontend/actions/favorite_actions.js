import FavoriteApiUtil from '../util/favorite_api_util';
import FavoriteConstants from '../constants/favorite_constants';
import AppDispatcher from '../dispatcher/dispatcher';

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
