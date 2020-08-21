angular.module("authentModule").controller("authentController", function ($scope, $http) {

    // *** VARIABLE DEFINITIONS *** //
    $scope.LoginSuccess = false;
    $scope.name = "";
    $scope.showbookings = false;
    $scope.showroutes = false;
    $scope.showvehicles = false;

    // *** FUNCTION DEFINITIONS *** //
    $scope.login = function () {
        var authenticationDetails = {
            username: $scope.username,
            password: $scope.password,
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/login", authenticationDetails)
            .success(function (response) {
                $scope.name = response.name;
                $scope.LoginSuccess = response.authenticated; //boolean return value shows and hides divs
                
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.logout = function () {
        //If invoking logout, hide booking, route, vehicle controllers.
        $scope.showbookings = false;
        $scope.showroutes = false;
        $scope.showvehicles = false;
        var authenticationDetails = {
            username: "",
            password: "",
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/login", authenticationDetails)
            .success(function (response) {
                $scope.name = response.name;
                $scope.role = response.role;
                $scope.LoginSuccess = response.authenticated; //Should be false, as user pass = ""
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.showB = function () {
        $scope.showbookings = true;
        $scope.showroutes = false;
        $scope.showvehicles = false;
    }

    $scope.showR = function () {
        $scope.showbookings = false;
        $scope.showroutes = true;
        $scope.showvehicles = false;
    }

    $scope.showV = function () {
        $scope.showbookings = false;
        $scope.showroutes = false;
        $scope.showvehicles = true;
    }

});