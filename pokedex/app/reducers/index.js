import { combineReducers } from 'redux';
import appData from './dataReducer';
import pokemonReducers, { type State as PokemonState } from '../Pokemons/redux/reducer';

export type Reducers = {
  pokemon: PokemonState
}

const rootReducer = combineReducers({
  appData,
  pokemon: pokemonReducers
});

export default rootReducer;
