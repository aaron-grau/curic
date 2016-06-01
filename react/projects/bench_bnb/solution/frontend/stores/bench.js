/* jshint esversion: 6 */

import { Store } from 'flux/utils';
import BenchConstants from '../constants/bench_constants';
import FavoriteConstants from '../constants/favorite_constants.js';
import AppDispatcher from '../dispatcher/dispatcher';
const BenchStore = new Store(AppDispatcher);
let _benches = {};

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
