import { createStore, applyMiddleware } from 'redux';
import IndexReducer from '../reducers/index_reducer';
import PokemonMiddleware from '../middleware/pokemon_middleware';

const configureStore = (preloadedState = {}) => (
  createStore(
    IndexReducer,
    preloadedState,
    applyMiddleware(PokemonMiddleware)
  )
);

export default configureStore;
