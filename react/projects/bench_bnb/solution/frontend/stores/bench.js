var Store = require('flux/utils').Store;
var _benches = {};
var BenchConstants = require('../constants/bench_constants');
var FavoriteConstants = require('../constants/favorite_constants.js');
var AppDispatcher = require('../dispatcher/dispatcher');
var BenchStore = window.BenchStore = new Store(AppDispatcher);

BenchStore.all = function () {
  return Object.assign({}, _benches);
};

BenchStore.find = function(id){
  return Object.assign({}, _benches[id]);
};

BenchStore.addFavorite = function(benchId, userId) {
  _benches[benchId].favorite_users.push(parseInt(userId));
};

BenchStore.removeFavorite = function(benchId, userId) {
  userIdx = _benches[benchId].favorite_users.indexOf(parseInt(userId));
  _benches[benchId].favorite_users.splice(userIdx, 1);
};

BenchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      payload.benches.forEach(function(bench){
        _benches[bench.id] = bench;
      });
      BenchStore.__emitChange();
      break;
    case BenchConstants.BENCH_RECEIVED:
      _benches[payload.bench.id] = payload.bench;
      BenchStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_RECEIVED:
      BenchStore.addFavorite(payload.favorite.benchId, payload.favorite.userId);
      BenchStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_REMOVED:
      BenchStore.removeFavorite(payload.favorite.benchId, payload.favorite.userId);
      BenchStore.__emitChange();
      break;
  }
};

module.exports = BenchStore;
