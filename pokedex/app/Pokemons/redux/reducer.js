// @flow
import { PokemonsActionTypes } from './actions';

export type State = {
  isLoading: boolean,
  error: Object,
  pokemons: Object,
  pokemon: Object
};

const initialState: State = {
  isLoading: false,
  error: null,
  pokemons: [],
  pokemon: {}
}

export default function pokemonReducers(state: State = initialState, action) {
  switch(action.type) {
    case PokemonsActionTypes.GET_POKEMONS:
      return {
        ...state,
        isLoading: true,
        pokemons: [],
      }
    case PokemonsActionTypes.GET_POKEMONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemons: action.data,
      }
    case PokemonsActionTypes.GET_POKEMON:
      return {
        ...state,
        isLoading: true,
        pokemon: {}
      }
    case PokemonsActionTypes.GET_POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemon: action.data
      }
    case PokemonsActionTypes.GET_POKEMONS_ERROR:
    case PokemonsActionTypes.GET_POKEMON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.err
      }
    default:
      return state;
  }
}
