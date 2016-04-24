'use strict';

angular.module('bayes2016App')
  .controller('MainCtrl', function($scope) {
    // $scope.selectedState = null;
    $scope.selectedState = 'Wisconsin'; // for a little while...
    $scope.communityColleges = null;

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

    /**
     * SLIDE 1
     */

    // MAP
    $scope.mapObject = {
      scope: 'usa',
      options: {
        width: 950,
      },
      geographyConfig: {
        popupTemplate: function(geography, data) { // This function should just return a string
          return geography.properties.name;
        },
        popupOnHover: true, // True to show the popup while hovering
        highlightOnHover: true,
        highlightFillColor: '#000000',
        highlightBorderColor: '#00FF00',
        highlightBorderWidth: 1,
        highlightBorderOpacity: 1
      },
      fills: {
        '5': '#9a1201',
        '4': '#cc1c01',
        '3': '#e16667',
        '2': '#ec999a',
        '1': '#f5cdcc',
        'defaultFill': '#DDDDDD'
      },
      data: {
        "AR": {
          "fillKey": "1",
        },
        "WY": {
          "fillKey": "1",
        },
        "AL": {
          "fillKey": "1",
        },
        "NV": {
          "fillKey": "1",
        },
        "ND": {
          "fillKey": "1",
        },
        "CT": {
          "fillKey": "1",
        },
        "OK": {
          "fillKey": "1",
        },
        "NM": {
          "fillKey": "1",
        },
        "IL": {
          "fillKey": "1",
        },
        "PA": {
          "fillKey": "1",
        },
        "NC": {
          "fillKey": "1",
        },
        "OH": {
          "fillKey": "1",
        },
        "OR": {
          "fillKey": "2",
        },
        "GA": {
          "fillKey": "2",
        },
        "VT": {
          "fillKey": "2",
        },
        "NY": {
          "fillKey": "2",
        },
        "OH": {
          "fillKey": "2",
        },
        "SD": {
          "fillKey": "2",
        },
        "HI": {
          "fillKey": "2",
        },
        "CA": {
          "fillKey": "2",
        },
        "ND": {
          "fillKey": "3",
        },
        "NH": {
          "fillKey": "3",
        },
        "NC": {
          "fillKey": "3",
        },
        "RI": {
          "fillKey": "3",
        },
        "RI": {
          "fillKey": "3",
        },
        "VA": {
          "fillKey": "3",
        },
        "WI": {
          "fillKey": "3",
        },
        "SC": {
          "fillKey": "3",
        },
        "AK": {
          "fillKey": "3",
        },
        "IN": {
          "fillKey": "3",
        },
        "NV": {
          "fillKey": "3",
        },
        "FL": {
          "fillKey": "3",
        },
        "OK": {
          "fillKey": "3",
        },
        "WA": {
          "fillKey": "3",
        },
        "PA": {
          "fillKey": "4",
        },
        "ID": {
          "fillKey": "4",
        },
        "OR": {
          "fillKey": "4",
        },
        "WV": {
          "fillKey": "4",
        },
        "TN": {
          "fillKey": "4",
        },
        "NM": {
          "fillKey": "4",
        },
        "NJ": {
          "fillKey": "4",
        },
        "TX": {
          "fillKey": "4",
        },
        "NH": {
          "fillKey": "4",
        },
        "CO": {
          "fillKey": "4",
        },
        "NE": {
          "fillKey": "5",
        },
        "AZ": {
          "fillKey": "5",
        },
        "NJ": {
          "fillKey": "5",
        },
        "UT": {
          "fillKey": "5",
        },
        "DE": {
          "fillKey": "5",
        },
        "NY": {
          "fillKey": "5",
        },
      }
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
      // console.log(geography);

      $.getJSON("app/state_data.json", function(json) {
        console.log(json); // this will show the info it in firebug console

        $.each(json, function(i, v) {
          if (v.postal_cd == $scope.state) {
            $scope.communityColleges = v.num_com_college;
            $scope.combinedCost = v.combined_costs_attrition;
            $scope.$apply();
            return false; // stops the loop
          }
        });
      });
      // console.log(json);

      $scope.$apply();
      $scope.next();
    };

    /**
     * SLIDE 2
     */

    // Graph 1
    $scope.options1 = {
      chart: {
        type: 'discreteBarChart',
        width: 200,
        height: 150,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 55
        },
        x: function(d) {
          return d.label;
        },
        y: function(d) {
          return d.value;
        },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 30
        }
      },
      title: {
        enable: true,
        text: 'Title1'
      },
      subtitle: {
        enable: true,
        text: 'Subtitle2',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      }
    };

    $scope.data1 = [{
      key: "Cumulative Return",
      values: [{
        "label": "2011 Total Medium Skilled Jobs",
        "value": 2
      }, {
        "label": "2012 Total Medium Skilled Jobs",
        "value": 4
      }]
    }];

    // Graph 2
    $scope.options2 = {
      chart: {
        type: 'discreteBarChart',
        width: 600,
        height: 200,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 55
        },
        x: function(d) {
          return d.label;
        },
        y: function(d) {
          return d.value;
        },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 30
        }
      },
      title: {
        enable: true,
        text: 'Title2'
      },
      subtitle: {
        enable: true,
        text: 'Subtitle2',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      }
    };

    $scope.data2 = [{
      key: "Cumulative Return",
      values: [{
        "label": "2011 Total Medium Skilled Jobs",
        "value": 2
      }, {
        "label": "2012 Total Medium Skilled Jobs",
        "value": 4
      }, {
        "label": "2013 Total Medium Skilled Jobs",
        "value": 6
      }, {
        "label": "2014 Total Medium Skilled Jobs",
        "value": 8
      }, {
        "label": "Current Total Medium Skilled Jobs",
        "value": 10
      }, {
        "label": "Projected Total Medium Skilled Jobs",
        "value": 12
      }]
    }];

  });
