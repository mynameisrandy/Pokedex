//@flow
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import PokemonItem from '../../components/PokemonItem';

import { connect } from 'react-redux';
// import { fetchData } from '../../store/actions';
import { fetchPokemonData } from '../redux/actions';

const styles = StyleSheet.create({
	container: {
    flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FD1B55',
  },
	listContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontWeight: '500',
    letterSpacing: 0.5
  }
});

export type PokemonProps = {
  pokemonisLoading: boolean,
  pokemons: Array<Object>,
  pokemonError: Object
};

export type PokemonState = {
	pokemons: Array<Object>,
	pokemon: Object,
	// isLoading: boolean,
};

export class Pokemons extends Component<PokemonProps, PokemonState> {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: [],
			pokemon: {},
			// isLoading: false,
    };
	}

	// getPokemons = () => {
	// 	this.setState({ isLoading: true });
	// 	fetch('https://pokeapi.co/api/v2/pokemon/')
	// 		.then(res => {
	// 			res
	// 				.json()
	// 				.then(data => {
	// 					let results = data.results;
	// 					this.setState({
	// 						isLoading: false,
	// 						pokemons: results,
	// 					});
	// 				})
	// 				.catch(err => {
	// 					console.log(err);
	// 				});
	// 		})
	// 		.catch(err => {
	// 			console.log('Error', err);
	// 		});
	// };

	getPokemon = item => {
		let id = item.url;
		fetch('https://pokeapi.co/api/v2/pokemon/' + id)
			.then(res => {
				this.setState({ pokemon: res });
			})
			.catch(err => {
				console.log('Error', err);
			});

		this.props.navigation.navigate('PokemonDetails', { item });
	};

	componentDidMount() {
    const { fetchPokemonData } = this.props;
    // this.getPokemons();

    // this.props.fetchData();
    fetchPokemonData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pokemons: nextProps.pokemons
    })
  }


	render() {
		// const { isLoading } = this.state;
    const { pokemonisLoading, pokemonError } = this.props;

		const getPokemons = this.state.pokemons.map(item => {
			return <PokemonItem item={item} getPokemon={() => this.getPokemon(item)} key={item.name.toString()} />;
		});

		return (
			<View style={styles.container}>
				{
          pokemonisLoading ? (
            <View style={styles.container}>
					    <Text style={styles.loadingText}>POKEDEX LOADING</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.listContainer}>{getPokemons}</View>
            </View>
          )
        }

				{
          pokemonError &&
          <View style={styles.container}>
            <Text style={styles.loadingText}>{pokemonError.message}</Text>
          </View>
        }

			</View>
		);
	}
}

function mapStateToProps (state) {
  return {
    // appData: state.appData,
    pokemons: state.pokemon.pokemons,
    pokemonisLoading: state.pokemon.isLoading,
    pokemonError: state.pokemon.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // fetchData: () => dispatch(fetchData()),
    fetchPokemonData: () => dispatch(fetchPokemonData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
