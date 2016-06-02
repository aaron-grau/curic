import FavoriteApiUtil from '../util/favorite_api_util';
import FavoriteConstants from '../constants/favorite_constants';
import AppDispatcher from '../dispatcher/dispatcher';

const FavoriteActions = {
  createFavorite(data) {
    FavoriteApiUtil.createFavorite(data, this.receiveFavorite);
  },

  deleteFavorite(data) {
    FavoriteApiUtil.deleteFavorite(data, this.removeFavorite);
  },

  receiveFavorite(favorite) {
    AppDispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_RECEIVED,
      favorite: favorite
    });
  },

  removeFavorite(favorite) {
    AppDispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_REMOVED,
      favorite: favorite
    });
  }
};

export default FavoriteActions;
