'use strict';

angular.module('bayes2016App')
  .controller('MainCtrl', function($scope) {
    // $scope.selectedState = null;
    $scope.selectedState = 'Wisconsin'; // for a little while...

    // SWIPER

    $scope.swiper = {};

    $scope.next = function() {
      $scope.swiper.slideNext();
    };

    $scope.prev = function() {
      $scope.swiper.slidePrev();
    };

    $scope.onReadySwiper = function(swiper) {
      swiper.on('slideChangeStart', function() {
        console.log('slideChangeStart');
      });
    };

    $scope.clickState = function(stateId) {
      $scope.selectedState = stateId;
    };

    // MAP
    $scope.mapObject = {
      scope: 'usa',
      options: {
        width: 1000,
      },
      geographyConfig: {
        popupOnHover: false,
        highlighBorderColor: '#EAA9A8',
        highlighBorderWidth: 2
      },
      fills: {
        'HIGH': '#CC4731',
        'MEDIUM': '#306596',
        'LOW': '#667FAF',
        'defaultFill': '#DDDDDD'
      },
      data: {
        "AZ": {
          "fillKey": "MEDIUM",
        },
        "CO": {
          "fillKey": "HIGH",
        },
        "DE": {
          "fillKey": "LOW",
        },
        "GA": {
          "fillKey": "MEDIUM",
        }
      },
    };
    $scope.mapPlugins = {
      bubbles: null,
      customLegend: function(layer, data, options) {
        var html = ['<ul class="list-inline">'],
          label = 'asdfasdf';
        for (var fillKey in this.options.fills) {
          html.push('<li class="key" ',
            'style="border-top: 10px solid ' + this.options.fills[fillKey] + '">',
            fillKey,
            '</li>');
        }
        html.push('</ul>');
        d3.select(this.options.element).append('div')
          .attr('class', 'datamaps-legend')
          .html(html.join(''));
      }
    };

    $scope.updateActiveGeography = function(geography) {
      $scope.stateName = geography.properties.name;
      $scope.state = geography.id;
      console.log(geography);

      $scope.$apply();
      $scope.next();
    };

  });
