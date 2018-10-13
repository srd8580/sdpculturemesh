app.controller('startCtrl', function($scope, $http, $timeout, $window, $location) {
    const commandsUrl = "https://api.mlab.com/api/1/databases/globalhack7/runCommand?apiKey=QUkNcQwk7nIkMruEKg_2kBb6eQa2WR8J";

    $scope.isBusy = false;
    $scope.ethnicity = "";
    $scope.ethnicityList = [];
    $scope.filterEthnicities = [];
    $scope.isEthnicityValid = false;

    $scope.init = function () {
        var postQueryData = {
            distinct: "Enclaves",
            key: "ethnicity"
        };

        $scope.isBusy = true;

        $http({
            method: 'POST',
            url: commandsUrl,
            data: postQueryData
        })
            .then(function success (response) {
                if (response.data && response.data.values)
                    $scope.ethnicityList = response.data.values;
                else
                    $scope.ethnicityList = [];
            }, function error (err) {
                $window.alert("Error loading ethnicities!");
            })
            .then(function () {
                $scope.isBusy = false;
            });
    };

    $scope.complete = function(string){
        var output=[];

        angular.forEach($scope.ethnicityList,function(country){
            if(country.toLowerCase().indexOf(string.toLowerCase())>=0){
                output.push(country);
            }
        });
        $scope.filterEthnicities = output;
    };

    $scope.fillTextbox = function(str){
        $scope.ethnicity = str;
        $scope.filterEthnicities= null;
    };

    $scope.onGoClicked = function () {
        $location.path("/list-cities").search({ "ethnicity": $scope.ethnicity });
    };

    $scope.$watchGroup(['ethnicityList', 'ethnicity'], function () {
        $scope.isEthnicityValid = $scope.ethnicityList.indexOf($scope.ethnicity) > -1;
    });

    $scope.init();
});