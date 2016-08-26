import { createStore, applyMiddleware } from 'redux';
import PokemonReducer from '../reducers/pokemon_reducer';
import PokemonMiddleware from '../middleware/pokemon_middleware';

const configureStore = (preloadedState = {}) => (
  createStore(
    PokemonReducer,
    preloadedState,
    applyMiddleware(PokemonMiddleware)
  )
);

export default configureStore;
