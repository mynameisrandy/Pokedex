//@flow
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FD1B55'
  },
  scrollContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FD1B55'
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  name: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  statsContainerInner: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    paddingBottom: 3,
    fontWeight: '500'
  },
  statBody: {
    lineHeight: 20,
    fontWeight: '300'
  },
  flatListCont: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  }
});

type PokemonProps = {
};

type PokemonState = {
	pokemon: string,
	pokemonData: Object,
	isLoading: boolean,
};

export default class PokemonDetails extends Component<PokemonProps, PokemonState> {
	constructor(props) {
		super(props);

		let data = this.props.navigation.getParam('item');
		this.state = {
			pokemon: data.url,
			pokemonData: [],
      isLoading: false,
      sprites: []
		};
	}

	getPokemonData = () => {
		this.setState({ isLoading: true });
    let pokemonData = this.state.pokemon;

		fetch(pokemonData)
			.then(res => {
				res.json().then(data => {
					this.setState({ isLoading: false });
					this.setState({
            pokemonData: data,
            sprites: data.sprites
					});
				});
			})
			.catch(err => {
				console.log('Error', err);
			});
	};

	componentDidMount() {
		this.getPokemonData();
	}

	render() {
		const { isLoading } = this.state;
		const { base_experience, height, name, weight, sprites } = this.state.pokemonData;

		let pokemonAbilities = this.state.pokemonData.abilities;
    let pokemonMoves = this.state.pokemonData.moves;
    let pokemonTypes = this.state.pokemonData.types;
    let pokemonStats = this.state.pokemonData.stats;
    let spritesImages = this.state.pokemonData.sprites;
    console.log(spritesImages);

		return (
			<View style={styles.container}>
				{
          isLoading ? (
					  <Text>POKEMON DATA INCOMING.....</Text>
				  ) : (
            <ScrollView style={styles.scrollContainer}>

              {
                spritesImages &&
                <View style={{ width: '100%', height: 200 }}>
                  <Image
                    source={{uri: sprites.front_default}}
                    style={styles.pokemonImage}
                  />
                </View>
              }

              <Text style={styles.name}>{name}</Text>

              <View style={styles.statsContainer}>

                <View style={styles.statsContainerInner}>
                  <Text style={styles.statTitle}>Height</Text>
                  <Text style={styles.statBody}>{height}</Text>
                </View>

                <View style={styles.statsContainerInner}>
                  <Text style={styles.statTitle}>Weight</Text>
                  <Text style={styles.statBody}>{weight}</Text>
                </View>

                <View style={styles.statsContainerInner}>
                  <Text style={styles.statTitle}>Base Experience</Text>
                  <Text style={styles.statBody}>{base_experience}</Text>
                </View>

              </View>

              <Text style={styles.title}>Types</Text>
              <FlatList
                style={styles.flatListCont}
                data={pokemonTypes}
                renderItem={({item}) => <Text style={styles.statBody}>{item.type.name}</Text> }
              />

              <Text style={styles.title}>Stats</Text>
              <FlatList
                style={styles.flatListCont}
                data={pokemonStats}
                renderItem={({item}) => <Text style={styles.statBody}>{item.stat.name} - <Text>{item.base_stat}</Text></Text> }
              />

              <Text style={styles.title}>Moves</Text>
              <FlatList
                style={styles.flatListCont}
                data={pokemonMoves}
                renderItem={({item}) => <Text style={styles.statBody}>{item.move.name}</Text> }
              />

              <Text style={styles.title}>Abilities</Text>
              <FlatList
                style={styles.flatListCont}
                data={pokemonAbilities}
                renderItem={({item}) => <Text style={styles.statBody}>{item.ability.name}</Text> }
              />

            </ScrollView>
          )
        }
			</View>
		);
	}
}
