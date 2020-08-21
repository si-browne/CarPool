angular.module("RouteModule").controller("RouteController", function ($scope, $http) {

    // *** VARIABLE DEFINITIONS *** //
    $scope.routes = [];
    $scope.isAdding = false;

    // *** FUNCTION DEFINITIONS *** //
    $scope.init = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route")
            .success(function (a) {
                $scope.routes = a;
                $scope.isAdding = false;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.displaySingleRoute = function (routeID) {
        // empty the array
        $scope.routes = [];
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route/" + routeID)
            .success(function (response) {
                // populate the first element in the array with the single returned item
                $scope.routes[0] = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    // *** beginning of functions to do with adding a new route item *** //
    $scope.showRouteAddForm = function () {
        $scope.addRouteForm.$setPristine();
        $scope.isAdding = true;
    };

    $scope.add = function () {

        var newRoute = {
            RouteStartPoint: $scope.a,
            RouteEndPoint: $scope.b
        };

        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route", newRoute)
            .success(function (response) {
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    };

    $scope.cancelRouteAddition = function () {
        $scope.a = "";
        $scope.b = "";
        $scope.routeStartPoint = "";
        $scope.routeEndPoint = "";
        $scope.isAdding = false;
    };
    // *** end of functions to do with adding a new route item *** //

    $scope.remove = function (routeItem) {
        // Still accepting the whole route item into the function. Append only the Id of the route to the web service URL
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route/" + routeItem.Id)
            .success(function (response) {
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    };

    // *** INIT FUNCTION INVOCATION *** //
    $scope.init();

});