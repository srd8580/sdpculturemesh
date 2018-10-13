app.controller('startCtrl', function($scope, $http, $timeout) {

    $scope.isBusy = false;
    $scope.ethnicity = "";
    $scope.ethnicityList = [];
    $scope.filterEthnicities = [];

    $scope.init = function () {
        $scope.isBusy = true;

        $timeout(function () {
            $scope.isBusy = false;
        }, 2000);
    };

    $scope.complete=function(string){
        
        var output=[];
        angular.forEach($scope.ethnicityList,function(country){
            if(country.toLowerCase().indexOf(string.toLowerCase())>=0){
                output.push(country);
            }
        });
        $scope.filterEthnicities = output;
    };

    $scope.fillTextbox=function(str){
        $scope.ethnicity = str;
        $scope.filterEthnicities= null;
    };

    $scope.init();
});