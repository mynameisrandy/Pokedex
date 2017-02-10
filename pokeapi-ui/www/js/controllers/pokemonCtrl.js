pokeapi.controller('pokemonCtrl', ['$scope', 'pokeFactory', function ($scope, pokeFactory) {

    console.log('Pokemon Controller');
    pokeFactory.getkantoRegion().success(function (data) {
        console.log(data);
        $scope.pokemons = data.pokemon_entries;
        console.log($scope.pokemons);
    });

}]);


pokeapi.controller('pokemonsCtrl', ['$scope', '$stateParams', 'pokeFactory', function ($scope, $stateParams, pokeFactory) {
    console.log('Pokemons List Controller');

}]);


pokeapi.controller('pokemonDetailsCtrl', ['$scope', '$stateParams', 'pokeFactory', function ($scope, $stateParams, pokeFactory) {

}]);
