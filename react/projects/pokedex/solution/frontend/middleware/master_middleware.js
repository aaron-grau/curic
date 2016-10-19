import { applyMiddleware } from 'redux';
import PokemonMiddleware from './pokemon_middleware';

export default applyMiddleware(PokemonMiddleware);
