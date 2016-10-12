import {
  POKEMON_ERROR
} from '../actions/pokemon_actions';

const _defaultState = {
  responseJSON: []
};

const PokemonReducer = (state = _defaultState, action) => {
  debugger;
  switch (action.type) {
    case POKEMON_ERROR:
      return action.errors;
    default:
      return state;
  }
};

export default PokemonReducer;
