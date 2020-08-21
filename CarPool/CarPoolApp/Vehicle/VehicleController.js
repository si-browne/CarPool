angular.module("VehicleModule").controller("VehicleController", function ($scope, $http) {

    // *** VARIABLE DEFINITIONS *** //
    $scope.vehicles = [];
    $scope.isAdding = false;
    $scope.isUpdating = false;
    var vehID;

    // *** FUNCTION DEFINITIONS *** //
    $scope.init = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
            .success(function (a) {
                $scope.vehicles = a;
                $scope.isAdding = false;
                $scope.isUpdating = false;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.displaySingleVehicle = function (vehicID) {
        // empty the array
        $scope.vehicles = [];
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + vehicID)
            .success(function (response) {
                // populate the first element in the array with the single returned item
                $scope.vehicles[0] = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    // *** beginning of functions to do with adding a new vehicle item *** //
    $scope.showVehicleAddForm = function () {
        $scope.addVehicleForm.$setPristine();
        $scope.isAdding = true;
    };

    $scope.addVeh = function () {
        var newVehicle = {
            Capacity: $scope.a,
            Driver: $scope.b,
            Make: $scope.c,
            Model: $scope.d,
            Registration: $scope.e
        };

        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/", newVehicle)
            .success(function (response) {
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.cancelVehicleAddition = function () {
        $scope.a = "";
        $scope.b = "";
        $scope.c = "";
        $scope.d = "";
        $scope.e = "";
        $scope.vechCapacity = "";
        $scope.vechDriver = "";
        $scope.vechMake = "";
        $scope.vechModel = "";
        $scope.vechRegistration = "";
        $scope.isAdding = false;
    };
    // *** end of functions to do with adding a new vehicle item *** //


    // *** beginning of functions to do with editing a vehicle item *** //
    $scope.displayVehForEdit = function (vehItemEditid) {
        $scope.isUpdating = true;
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + vehItemEditid)
            .success(function (response) {
                vehID = vehItemEditid;
                $scope.editVehCapacity = response.Capacity;
                $scope.editVehDriverName = response.Driver;
                $scope.editVehMake = response.Make;
                $scope.editVehModel = response.Model;
                $scope.editVehRegistration = response.Registration;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.vehEdit = function () {

        var changeVehicle = {
            Id: vehID,
            Capacity: $scope.editVehCapacity,
            Driver: $scope.editVehDriverName,
            Make: $scope.editVehMake,
            Model: $scope.editVehModel,
            Registration: $scope.editVehRegistration,
        };

        $http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle", changeVehicle)
            .success(function (response) {
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.cancelEdit = function () {
        // no need to initialise the edit fields - they are populated appropriately when the vehicle Edit form is shown
        $scope.isUpdating = false;
    };
    // *** end of functions to do with editing a vehicle item *** //


    $scope.remove = function (vehicleItem) {
        // Still accepting the whole vehicle item into the function. Append only the Id of the vehicle to the web service URL
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + vehicleItem.Id) //delete selected item
            .success(function (response) {
                //re-display items
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    };

    // *** FUNCTION INVOCATION *** //
    $scope.init();

});