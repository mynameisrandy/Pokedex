pokeapi.factory('pokeFactory', ['$http', function ($http) {


    var baseUrl = "http://pokeapi.co/api/";

    var _pokeFactory = {};

    // Get All Pokemon from Kanto Region
    _pokeFactory.getkantoRegion = function () {
        return $http.get(baseUrl + "v2/pokedex/2")
            .error(function (data) {
                console.log("data is not here", data);
            });
    };

    // Get Pokemon
    _pokeFactory.getPokemon = function (id) {
        return $http.get("http://pokeapi.co/api/v2/pokemon-species/" + id);
    }


    _pokeFactory.getPokemons = function() {
        return $http.get(baseUrl + "v1/pokedex/1");
    };

    return _pokeFactory;


}]);