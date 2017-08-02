import merge from 'lodash/merge';

import { RECEIVE_SINGLE_POKEMON } from '../actions/pokemon_actions';

const ItemsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SINGLE_POKEMON:
      const items = action.payload.items.reduce((acc, item) => { 
        acc[item.id] = item;
        return acc;
      }, {});
      return merge({}, state, items);
    default:
      return state;
  }
}

export default ItemsReducer;
