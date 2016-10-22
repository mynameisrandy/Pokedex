// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var PokemonAPI = angular.module('PokemonAPI', ['ionic','ngRoute', 'ngSanitize'])

.run(function($ionicPlatform, $rootScope, $location) {

//when clicked, this will set the url to /list. ie function for home button
  $rootScope.goHome = function(){
    $location.path('/home');
  };

  $rootScope.goList = function(){
    $location.path('/list');
  };

  $rootScope.goEgg = function(){
    $location.path('/listEgg');
  };

  $rootScope.goSetting = function(){
    $location.path('/settings');
  };

  $rootScope.goAbout = function(){
    $location.path('/about');
  };


  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// config
PokemonAPI.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/home',{
    templateUrl: 'partials/home.html',
  })
  .when('/list',{
    controller: 'ListController',
    templateUrl: 'partials/list.html',
  })
  .when('/details/:itemId', {
    controller: 'DetailsController',
    templateUrl: 'partials/details.html'
  })
  .when('/listEgg',{
    controller: 'EggController',
    templateUrl: 'partials/egg.html',
  })
  .when('/eggDetails/:eggId',{
    controller: 'EggDetailsDeController',
    templateUrl: 'partials/eggDetails.html',
  })
  .when('/settings',{
    templateUrl: 'partials/settings.html',
  })
  .when('/about',{
    templateUrl: 'partials/about.html',
  })
  .otherwise({redirectTo: '/home'});
}]);



// List Controller - Get all pokemons
PokemonAPI.controller('ListController',['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading){
  $scope.loadPokemon = function(){
    $ionicLoading.show();
    $http.get("http://pokeapi.co/api/v1/pokedex/1")
    .success(function(data) {
      $scope.pokemon = data.pokemon;

      var pokemonID = [];
      var path = [];
      
      $scope.newID = [];
      for (var i = 0; i < data.pokemon.length; i++) {
        pokemonID[i] = data.pokemon[i].resource_uri;
        path[i] = pokemonID[i].substring(15);
        $scope.newID.push(path[i]);

        console.log($scope.newID);
      }
      // console.log($scope.pokemons);
      $ionicLoading.hide();
    })
    .finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  // Loads Pokemon
  $scope.loadPokemon();
}]);

// Details Controller
PokemonAPI.controller('DetailsController', ['$scope', '$http', '$routeParams', '$ionicLoading', function($scope, $http, $routeParams, $ionicLoading) {
  $ionicLoading.show();
  // First Call to get Pokedex
  $http.get("http://pokeapi.co/api/v1/pokemon/"+[$routeParams.itemId])
  .success(function(data) {
    console.log(data.abilities);
    $scope.pokemonDetail = data;
    $ionicLoading.hide();
  });

}]);

// List Controller - Get all Eggs Group
PokemonAPI.controller('EggController',['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading){
  $scope.loadPokemon = function(){
    $ionicLoading.show();
    $http.get("http://pokeapi.co/api/v1/egg/1")
    .success(function(data) {
      $scope.eggs = data.pokemon;
      console.log($scope.eggs);
      $ionicLoading.hide();
    })
    .finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  // Loads Pokemon
  $scope.loadPokemon();
}]);

// Eggs Details Controller
PokemonAPI.controller('EggDetailsDeController', ['$scope', '$http', '$routeParams', '$ionicLoading', function($scope, $http, $routeParams, $ionicLoading) {
  $ionicLoading.show();
  // First Call to get Eggs
   $http.get("http://pokeapi.co/api/v1/egg/1")
  .success(function(data) {
    // $scope.name = data.pokemon[$routeParams.eggId].name;

    // Created a scope that would call the resource_uri
    $scope.resource_uri = data.pokemon[$routeParams.eggId].resource_uri;
    $ionicLoading.hide();

    // Second Call to get Pokemon URI
    $http.get("http://pokeapi.co/" + $scope.resource_uri).success(function(data) {
      // Pokemon Information 
      $scope.name = data.name;
      $scope.hp = data.hp;
      $scope.attack = data.attack;
      $scope.catch_rate = data.catch_rate;
      $scope.defense = data.defense;
      $scope.egg_cycles = data.egg_cycles;
      $scope.sp_atk = data.sp_atk;
      $scope.sp_def = data.sp_def;
      $scope.speed = data.speed;
      $scope.total = data.total;
      $scope.height = data.height;
      $scope.weight = data.weight;
      $scope.exp = data.exp;
      $scope.types = data.types
      $scope.evolutions = data.evolutions;
      $scope.descriptions = data.descriptions;
      // console.log($scope.types = data.types);

      $ionicLoading.hide();
    }); // Second Call

  }); // First Call

}]);