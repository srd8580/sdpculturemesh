app.controller('listResourcesCtrl', function($scope, $http, $routeParams, $location, $window, $timeout) {
    $scope.isBusy = false;
    $scope.city = $routeParams["city"];
    $scope.state = $routeParams["state"];
    $scope.ethnicity = $routeParams["ethnicity"];


    if (!$scope.city || !$scope.state || !$scope.ethnicity) {
        $location.path("/");
        return;
    }
    
    $scope.init = function () {

        $scope.isBusy = true;

        $timeout(function () {
            $scope.isBusy = false;
        }, 1000);
    };



    $scope.init();
});