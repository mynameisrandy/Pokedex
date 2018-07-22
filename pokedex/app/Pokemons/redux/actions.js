// @flow

export const PokemonsActionTypes = {
  GET_POKEMONS: "[Pokemons] Get Pokemons",
  GET_POKEMONS_SUCCESS: "[Pokemons] Get Pokemons Success",
  GET_POKEMONS_ERROR: "[Pokemons] Get Pokemons Error",
  GET_POKEMON: "[Pokemons] Get Pokemon",
  GET_POKEMON_SUCCESS: "[Pokemons] Get Pokemon Success",
  GET_POKEMON_ERROR: "[Pokemons] Get Pokemon Error",
}


// export const getPokemons = () => {
//   return {
//     type: PokemonsActionTypes.GET_POKEMONS
//   }
// }

// export const getPokemonsSuccess = (data) => {
//   return {
//     type: PokemonsActionTypes.GET_POKEMONS_SUCCESS, data
//   }
// }

// export const getPokemonsError = (err) => {
//   return {
//     type: PokemonsActionTypes.GET_POKEMONS_ERROR, err
//   }
// }

// export const getPokemon = () => {
//   return {
//     type: PokemonsActionTypes.GET_POKEMON
//   }
// }

// export const getPokemonSuccess = (data) => {
//   return {
//     type: PokemonsActionTypes.GET_POKEMON_SUCCESS, data
//   }
// }

// export const getPokemonError = (err) => {
//   return {
//     type: PokemonsActionTypes.GET_POKEMON_ERROR, err
//   }
// }


// export function fetchPokemonData() {
//   return (dispatch) => {
//     dispatch(getPokemons())
//     fetch('https://pokeapi.co/api/v2/pokemon/')
//     .then(res => {
//       res
//         .json()
//         .then(data => {
//           let results = data.results;
//           dispatch(getPokemonsSuccess(results))
//         })
//         .catch(err => {
//           // console.log(err);
//           dispatch(getPokemonsError(err))
//         });
//     })
//     .catch(err => {
//       // console.log('Error', err);
//       dispatch(getPokemonsError(err))
//     });
//   }
// }


/**
 * Redux Saga
 */

export function fetchPokemonData() {
  return {
    type: PokemonsActionTypes.GET_POKEMONS
  }
}
