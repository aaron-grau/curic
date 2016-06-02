import { Store } from 'flux/utils';
import BenchConstants from '../constants/bench_constants';
import FavoriteConstants from '../constants/favorite_constants.js';
import AppDispatcher from '../dispatcher/dispatcher';
const BenchStore = new Store(AppDispatcher);
let _benches = {};

BenchStore.all = () => Object.assign({}, _benches);

BenchStore.find = id => Object.assign({}, _benches[id]);

BenchStore.addFavorite = (benchId, userId) => {
  _benches[benchId].favorite_users.push(parseInt(userId));
};

BenchStore.removeFavorite = (benchId, userId) => {
  userIdx = _benches[benchId].favorite_users.indexOf(parseInt(userId));
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

export default BenchStore;
