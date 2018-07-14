//@flow
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import PokemonItem from '../../components/PokemonItem';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FD1B55'
	},
	listContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
    justifyContent: 'center'
	},
});

export type PokemonProps = {};

export type PokemonState = {
	pokemons: Array<Object>,
	pokemon: Object,
	isLoading: boolean,
};

export default class Pokemons extends Component<PokemonProps, PokemonState> {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: [],
			pokemon: {},
			isLoading: false,
		};
	}

	getPokemons = () => {
		this.setState({ isLoading: true });
		fetch('https://pokeapi.co/api/v2/pokemon/')
			.then(res => {
				res
					.json()
					.then(data => {
						let results = data.results;
						this.setState({
							isLoading: false,
							pokemons: results,
						});
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log('Error', err);
			});
	};

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
		this.getPokemons();
	}

	render() {
		const { isLoading } = this.state;

		const getPokemons = this.state.pokemons.map(item => {
			return <PokemonItem item={item} getPokemon={() => this.getPokemon(item)} key={item.name.toString()} />;
		});

		return (
			<View style={styles.container}>
				{isLoading ? (
					<Text>POKEDEX LOADING</Text>
				) : (
					<ScrollView>
						<View style={styles.listContainer}>{getPokemons}</View>
					</ScrollView>
				)}
			</View>
		);
	}
}
