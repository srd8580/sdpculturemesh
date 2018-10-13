app.controller('listCitiesCtrl', function($scope, $http, $routeParams, $location, $window) {
    const listUrl = "https://api.mlab.com/api/1/databases/globalhack7/collections/Enclaves?apiKey=QUkNcQwk7nIkMruEKg_2kBb6eQa2WR8J";

    $scope.isBusy = false;
    $scope.ethnicity = $routeParams["ethnicity"];
    $scope.enclaves = [];

    if (!$scope.ethnicity) {
        $location.path("/");
        return;
    }

    $scope.init = function () {
        var queryParameters = '&q={"ethnicity": "' + $scope.ethnicity + '"}';

        $scope.isBusy = true;

        $http({
            method: 'GET',
            url: listUrl + queryParameters
        })
            .then(function success (response) {
                $scope.enclaves = response.data;
            }, function error (err) {
                $window.alert("Error loading cities!");
            })
            .then(function () {
                $scope.isBusy = false;
            });
    };

    $scope.onRowClick = function (enclave) {
        $location.path("/list-resources").search({ city: enclave.location.city, state: enclave.location.state, ethnicity: enclave.ethnicity });
    };

    $scope.init();
});