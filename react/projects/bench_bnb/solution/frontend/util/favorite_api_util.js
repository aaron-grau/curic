"use strict";

const FavoriteApiUtil = {
  createFavorite: function(data, success) {
    $.ajax({
      url: 'api/favorites',
      type: 'POST',
      data: { favorite: data },
      success
    });
  },

  deleteFavorite: function(data, success) {
    $.ajax({
      url: 'api/favorites',
      type: 'DELETE',
      data: { favorite: data },
      success
    });
  }
};

module.exports = FavoriteApiUtil;
