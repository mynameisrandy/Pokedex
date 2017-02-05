pokeapi.controller('pokemonCtrl', ['$scope', 'pokeFactory', function ($scope, pokeFactory) {

    console.log('Pokemon Controller');
    pokeFactory.getkantoRegion().success(function (data) {
        // console.log(data);
        $scope.pokemons = data.pokemon_entries;
        console.log($scope.pokemons);
    });

}]);


// Kanto Region Controller 
pokeapi.controller('kantoRegionCtrl', ['$scope', function ($scope) {

    console.log('Kanto Region Controller');

}]);


// Kanto Region Details Controller
pokeapi.controller('kantoPokemonCtrl', ['$scope', function ($scope) {

    console.log('Kanto Pokemon Controller');


}]);


