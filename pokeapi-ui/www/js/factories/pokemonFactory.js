pokeapi.factory('pokeFactory', ['$http', function ($http) {


    var baseUrl = "http://pokeapi.co/api/v2/pokedex/";

    var _pokeFactory = {};


    // Get All Pokemon from Kanto Region
    _pokeFactory.getkantoRegion = function () {
        return $http.get(baseUrl + "2")
            .error(function (data) {
                console.log("data is not here", data);
            });
    };


    // Get Pokemon
    _pokeFactory.getPokemon = function (id) {
        return $http.get("http://pokeapi.co/api/v2/pokemon-species/" + id);
    }

    return _pokeFactory;


}]);