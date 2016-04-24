'use strict';

angular.module('bayes2016App')
  .controller('MainCtrl', function ($scope, $http) {
    // $scope.selectedState = null;
    $scope.selectedState = 'Wisconsin'; // for a little while...

    $scope.clickState = function(stateId) {
      $scope.selectedState = stateId;
    }


  });