import merge from 'lodash/merge';

import {
  RECEIVE_ALL_POKEMON,
  RECEIVE_SINGLE_POKEMON
} from '../actions/pokemon_actions';

const defaultState = {
  entities: {},
  currentPoke: null,
};

const PokemonReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
    console.log(action.pokemon);
      return merge({}, state, { entities: action.pokemon });
    case RECEIVE_SINGLE_POKEMON:
      const poke = action.payload.pokemon;
      return merge({}, state, {
        entities: { [poke.id]: poke },
        currentPoke: poke.id
      });
    default:
      return state;
  }
};

export default PokemonReducer;
