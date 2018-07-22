/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Pokemons from './app/Pokemons/containers/Pokemons';
import PokemonDetails from './app/Pokemons/containers/PokemonDetails';

import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore';

const store = configureStore();

const RootStack =  createStackNavigator(
  {
    Pokemons: { screen: Pokemons },
    PokemonDetails: { screen: PokemonDetails },
  },
  {
    initialRouteName: 'Pokemons',
    headerMode: 'none',
  });


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
