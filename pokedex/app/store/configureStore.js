import { createStore, applyMiddleware } from 'redux';
import app from '../reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import dataSaga from '../Pokemons/redux/saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  /**
   * Redux Thunk
   */
  // let store = createStore(app, applyMiddleware(thunk));

  /**
   * Redux Saga
   */
  const store = createStore(app, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(dataSaga)
  return store;
}
