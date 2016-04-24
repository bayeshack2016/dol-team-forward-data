'use strict';

angular.module('bayes2016App')
  .controller('MainCtrl', function($scope) {
    // $scope.selectedState = null;
    $scope.selectedState = 'Wisconsin'; // for a little while...

    $scope.swiper = {};
    $scope.next = function() {
      $scope.swiper.slideNext();
    };
    $scope.onReadySwiper = function(swiper) {
      swiper.on('slideChangeStart', function() {
        console.log('slideChangeStart');
      });
    };

    $scope.clickState = function(stateId) {
      $scope.selectedState = stateId;
    };

  });
