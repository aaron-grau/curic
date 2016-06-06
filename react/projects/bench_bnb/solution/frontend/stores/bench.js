const Store = require('flux/utils').Store;
const BenchConstants = require('../constants/bench_constants');
const FavoriteConstants = require('../constants/favorite_constants.js');
const AppDispatcher = require('../dispatcher/dispatcher');
const BenchStore = new Store(AppDispatcher);
let _benches = {};

window.BenchStore = BenchStore;

BenchStore.all = () => Object.assign({}, _benches);

BenchStore.find = id => Object.assign({}, _benches[id]);

BenchStore.addFavorite = (benchId, userId) => {
  _benches[benchId].favorite_users.push(parseInt(userId));
};

BenchStore.removeFavorite = (benchId, userId) => {
  const userIdx = _benches[benchId].favorite_users.indexOf(parseInt(userId));
  _benches[benchId].favorite_users.splice(userIdx, 1);
};

BenchStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      // debugger;
      _benches = payload.benches;
      BenchStore.__emitChange();
      break;
    case BenchConstants.BENCH_RECEIVED:
    // debugger;
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
