import { values } from 'lodash';

export const selectAllPokemon = state => values(state.entities.pokemon);

export const selectPokeItems = (state, poke) => {
  return poke ?
    poke.item_ids.map(id => state.entities.items[id]) :
    [];
}
