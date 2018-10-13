var app = angular.module('app', [
    'ngRoute'
  ])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
  
    $routeProvider
        .when('/start', {
            templateUrl: 'views/start.html',
            controller: 'startCtrl'
        })
        .when('/list-cities', {
            templateUrl: 'views/list-cities.html',
            controller: 'listCitiesCtrl'
        })
        .when('/list-resources', {
            templateUrl: 'views/list-resources.html',
            controller: 'listResourcesCtrl'
        })
        .otherwise({redirectTo: '/start'});
  }]);