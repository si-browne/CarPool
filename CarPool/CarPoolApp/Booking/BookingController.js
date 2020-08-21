angular.module("BookingModule").controller("BookingController", function ($scope, $http) {

    // *** VARIABLE DEFINITIONS *** //
    $scope.bookings = [];
    $scope.isUpdating = false;
    $scope.isAdding = false;
    var bookID;


    // *** FUNCTION DEFINITIONS *** //
    $scope.init = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking")
            .success(function (a) {
                $scope.bookings = a;
                $scope.isAdding = false;
                $scope.isUpdating = false;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.displaySingleBooking = function (bookingID) {
        // empty the array
        $scope.bookings = [];
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/" + bookingID)
            .success(function (response) {
                // populate the first element in the array with the single returned item
                $scope.bookings[0] = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    // *** beginning of functions to do with adding a new booking item *** //
    $scope.showBookingAddForm = function () {
        $scope.addBookingForm.$setPristine();
        $scope.isAdding = true;
    };

    $scope.addBooking = function () {

        var newBooking = {
            CurrentPassenger: $scope.a,
            DropOffLocation: $scope.b,
            PassengerName: $scope.c,
            PickupLocation: $scope.d,
            VehicleId: $scope.e
        };

        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/", newBooking)
            .success(function (response) {
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    };

    $scope.cancelBookingAddition = function () {
        $scope.a = "";
        $scope.b = "";
        $scope.c = "";
        $scope.d = "";
        $scope.e = "";
        $scope.bookCurrentPassengerNum = "";
        $scope.bookDropOffLocation = "";
        $scope.bookPassengerName = "";
        $scope.bookPickupLocation = "";
        $scope.bookVehicleId = "";
        $scope.isAdding = false;
    };
    // *** end of functions to do with adding a new booking item *** //

    // *** beginning of functions to do with editing a booking item *** //
    $scope.displayBookingForEdit = function (bookingItemEditId) {
        $scope.isUpdating = true;
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/" + bookingItemEditId)
            .success(function (response) {
                bookID = bookingItemEditId;
                $scope.bookCurrPassenger = response.CurrentPassenger;
                $scope.bookDropOffLoc = response.DropOffLocation;
                $scope.bookPassgrName = response.PassengerName;
                $scope.bookPickupLoc = response.PickupLocation;
                $scope.bookVehID = response.VehicleId;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.bookEdit = function () {

        var changeBooking = {
            Id: bookID,
            CurrentPassenger: $scope.bookCurrPassenger,
            DropOffLocation: $scope.bookDropOffLoc,
            PassengerName: $scope.bookPassgrName,
            PickupLocation: $scope.bookPickupLoc,
            VehicleId: $scope.bookVehID,
        };

        $http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking", changeBooking)
            .success(function (response) {
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.cancelEdit = function () {
        // no need to initialise the edit fields - they are populated appropriately when the Edit form is shown
        $scope.isUpdating = false;
    };
    // *** end of functions to do with editing a booking item *** //

    $scope.remove = function (bookingItem) {
        // Still accepting the whole booking item into the function. Append only the Id of the booking to the web service URL
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/" + bookingItem.Id) //delete selected item
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