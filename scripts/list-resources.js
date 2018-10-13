app.controller('listResourcesCtrl', function($scope, $http, $routeParams, $location, $window, $timeout) {
    const listUrl = "https://api.mlab.com/api/1/databases/globalhack7/collections/Enclaves?apiKey=QUkNcQwk7nIkMruEKg_2kBb6eQa2WR8J";

    $scope.isBusy = false;
    $scope.city = $routeParams["city"];
    $scope.state = $routeParams["state"];
    $scope.ethnicity = $routeParams["ethnicity"];
    $scope.resources = [];

    if (!$scope.city || !$scope.state || !$scope.ethnicity) {
        $location.path("/");
        return;
    }
    
    $scope.init = function () {
        var queryParameters = '&q={ "$and": [ {"ethnicity": "' + $scope.ethnicity + '"}, {"location.city": "' + $scope.city + '"}, { "location.state": "' + $scope.state + '" }] }';

        $scope.isBusy = true;

        $http({
            method: 'GET',
            url: listUrl + queryParameters
        })
            .then(function success (response) {
                if (response.data && response.data.length)
                    $scope.resources = response.data[0].resources;
                else
                    $scope.resources = [];
            }, function error (err) {
                $window.alert("Error loading resources!");
            })
            .then(function () {
                $scope.isBusy = false;
            });
    };

    $scope.onRowClick = function (resource) {
        var url = "https://www.google.com/search?q=" + escape(resource.name) + " " + escape(resource.address || "") + " " + escape(resource.zip || "");
        $window.open(url, "_blank");
    };

    $scope.init();
});