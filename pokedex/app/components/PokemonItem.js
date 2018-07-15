//@flow
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
	item: {
		padding: 16,
	},
	title: {
    fontWeight: '500',
    color: '#ffffff'
	},
});

type PokemonProps = {
	item: Object,
	getPokemon: Function,
};

type PokemonState = {};

export default class PokemonItem extends Component<PokemonProps, PokemonState> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { name } = this.props.item;

		return (
			<TouchableOpacity style={styles.item} onPress={() => this.props.getPokemon()}>
				<Text style={styles.title}>{name}</Text>
			</TouchableOpacity>
		);
	}
}
