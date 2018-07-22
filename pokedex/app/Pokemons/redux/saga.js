import { PokemonsActionTypes } from './actions';
import { put, takeEvery } from 'redux-saga/effects';

function getPokemonData() {
  return new Promise((resolve, reject) => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(res => {
        res
          .json()
          .then(data => {
            let results = data.results;
            return resolve(results)
          })
          .catch(err => {
            reject(err)
          });
      })
      .catch(err => {
        reject(err)
      });
  })
}

function* fetchPokemonData(action) {
	try {
    const data = yield getPokemonData();
		yield put({ type: PokemonsActionTypes.GET_POKEMONS_SUCCESS, data });
	} catch (e) {
		yield put({ type: PokemonsActionTypes.GET_POKEMONS_ERROR });
	}
}

function* dataSaga() {
	yield takeEvery(PokemonsActionTypes.GET_POKEMONS, fetchPokemonData);
}

export default dataSaga;
