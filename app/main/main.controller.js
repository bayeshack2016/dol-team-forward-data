'use strict';

angular.module('bayes2016App')
  .controller('MainCtrl', function ($scope, $http, $geolocation) {

    var google_api_key = 'AIzaSyCR7pM0PzBpdIchyJ0NZrv2kAQaEff8ZJ4';



    $scope.data = {
      availableOptions: [
        {id: '1', name: 'Option A'},
        {id: '2', name: 'Option B'},
        {id: '3', name: 'Option C'}
      ],
      selectedOption: {id: '3', name: 'Option C'} //This sets the default value of the select in the ui
    };

    $scope.$geolocation = $geolocation;

    // basic usage
    $geolocation.getCurrentPosition().then(function(location) {
      $scope.location = location;
      console.log('>>> location');
      console.log($scope.location.coords.latitude);
      console.log($scope.location.coords.longitude);

      // Simple GET request example:
      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.location.coords.latitude + ',' + $scope.location.coords.longitude + '&key=' + google_api_key
      }).then(function successCallback(response) {
        var metro_string = response.data.results[6].formatted_address;
        $scope.metro = metro_string.substring(0, metro_string.indexOf(','));
        console.log('Metro location is: ' + $scope.metro);

        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    });

    // regular updates
    $geolocation.watchPosition({
      timeout: 60000,
      maximumAge: 2,
      enableHighAccuracy: true
    });
    $scope.coords = $geolocation.position.coords; // this is regularly updated
    $scope.error = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs

    console.log($scope.coords);
  });
