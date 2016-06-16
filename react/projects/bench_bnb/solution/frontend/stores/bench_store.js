"use strict";

const Store = require('flux/utils').Store;
const BenchConstants = require('../constants/bench_constants');
const FavoriteConstants = require('../constants/favorite_constants.js');
const AppDispatcher = require('../dispatcher/dispatcher');
const BenchStore = new Store(AppDispatcher);
let _benches = {};

window.BenchStore = BenchStore;

BenchStore.all = function(){
  return Object.assign({}, _benches);
};

BenchStore.find = function(id){
  return Object.assign({}, _benches[id]);
};

BenchStore.addFavorite = function(benchId, userId) {
  _benches[benchId].favorite_users.push(parseInt(userId));
  BenchStore.__emitChange();
};

BenchStore.removeFavorite = function(benchId, userId) {
  const userIdx = _benches[benchId].favorite_users.indexOf(parseInt(userId));
  _benches[benchId].favorite_users.splice(userIdx, 1);
  BenchStore.__emitChange();
};

function resetAllBenches(benches){
  _benches = benches;
  BenchStore.__emitChange();
}

function resetSingleBench(bench){
  _benches[bench.id] = bench;
  BenchStore.__emitChange();
}

BenchStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
      resetAllBenches(payload.benches);
      break;
    case BenchConstants.BENCH_RECEIVED:
      resetSingleBench(payload.bench);
      break;
    case FavoriteConstants.FAVORITE_RECEIVED:
      BenchStore.addFavorite(payload.favorite.benchId, payload.favorite.userId);
      break;
    case FavoriteConstants.FAVORITE_REMOVED:
      BenchStore.removeFavorite(payload.favorite.benchId, payload.favorite.userId);
      break;
  }
};

module.exports = BenchStore;
