'use strict';

angular.module('bayes2016App')
  .controller('MainCtrl', function($scope) {
    // $scope.selectedState = null;
    $scope.selectedState = 'Wisconsin'; // for a little while...
    $scope.communityColleges = null;

    // SWIPER
    $scope.swiper = {};

    $scope.next = function() {
      $scope.swiper.slideNext(true, 1200);
    };

    $scope.prev = function() {
      $scope.swiper.slidePrev(true, 1200);
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
        "AL": {
          "fillKey": "1",
        },
        "AR": {
          "fillKey": "1",
        },
        "CT": {
          "fillKey": "1",
        },
        "ID": {
          "fillKey": "1",
        },
        "KS": {
          "fillKey": "1",
        },
        "LA": {
          "fillKey": "1",
        },
        "MS": {
          "fillKey": "1",
        },
        "MT": {
          "fillKey": "1",
        },
        "NJ": {
          "fillKey": "1",
        },
        "NM": {
          "fillKey": "1",
        },
        "OK": {
          "fillKey": "1",
        },
        "WY": {
          "fillKey": "1",
        },
        "CA": {
          "fillKey": "2",
        },
        "GA": {
          "fillKey": "2",
        },
        "HI": {
          "fillKey": "2",
        },
        "NE": {
          "fillKey": "2",
        },
        "NH": {
          "fillKey": "2",
        },
        "NY": {
          "fillKey": "2",
        },
        "SD": {
          "fillKey": "2",
        },
        "VT": {
          "fillKey": "2",
        },
        "AK": {
          "fillKey": "3",
        },
        "FL": {
          "fillKey": "3",
        },
        "IL": {
          "fillKey": "3",
        },
        "IN": {
          "fillKey": "3",
        },
        "KY": {
          "fillKey": "3",
        },
        "ME": {
          "fillKey": "3",
        },
        "NC": {
          "fillKey": "3",
        },
        "NV": {
          "fillKey": "3",
        },
        "PA": {
          "fillKey": "3",
        },
        "RI": {
          "fillKey": "3",
        },
        "SC": {
          "fillKey": "3",
        },
        "VA": {
          "fillKey": "3",
        },
        "WA": {
          "fillKey": "3",
        },
        "WI": {
          "fillKey": "3",
        },
        "CO": {
          "fillKey": "4",
        },
        "IA": {
          "fillKey": "4",
        },
        "MD": {
          "fillKey": "4",
        },
        "MI": {
          "fillKey": "4",
        },
        "MO": {
          "fillKey": "4",
        },
        "OH": {
          "fillKey": "4",
        },
        "OR": {
          "fillKey": "4",
        },
        "TN": {
          "fillKey": "4",
        },
        "TX": {
          "fillKey": "4",
        },
        "WV": {
          "fillKey": "4",
        },
        "AZ": {
          "fillKey": "5",
        },
        "DE": {
          "fillKey": "5",
        },
        "MA": {
          "fillKey": "5",
        },
        "MN": {
          "fillKey": "5",
        },
        "ND": {
          "fillKey": "5",
        },
        "UT": {
          "fillKey": "5",
        }
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


    $scope.MoneyFormat = function(number) {
      if (number != undefined) {
        var abs = number;
        var numFinal = parseInt(abs);
      }

     if ( numFinal < Math.pow( 10, 9 ) && numFinal >= Math.pow( 10, 6 ) ) {
        numFinal = ( number / Math.pow( 10, 6 ) ).toFixed( 1 ) + "m";
     } else if ( numFinal < Math.pow( 10, 6 ) && numFinal >= Math.pow( 10, 3 ) ) {
       numFinal = ( number / Math.pow(10, 3) ).toFixed(1) + "k";
    }
      return '$' + numFinal;
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
            $scope.combinedCost = $scope.MoneyFormat(v.combined_costs_attrition);

            $scope.tot_work_prep_rate = Math.round(v.tot_work_prep_rate*100);
            $scope.tot_med_rate = Math.round(v.tot_med_rate*100);

            $scope.data1 = [{
              key: "Community College Spent per Student",
              values: [{
                "label": "State Spend per Student",
                "value": v.cc_spend_per_student
              }, {
                "label": "National Median Spend per Student",
                "value": 504.93
              }]
            }];

            $scope.data2 = [{
              key: "Cumulative Return",
              values: [{
                "label": "2011 Total Medium Skilled Jobs",
                "value": v.tot_med_2011
              }, {
                "label": "2012 Total Medium Skilled Jobs",
                "value": v.tot_med_2012
              }, {
                "label": "2013 Total Medium Skilled Jobs",
                "value": v.tot_med_2013
              }, {
                "label": "2014 Total Medium Skilled Jobs",
                "value": v.tot_med_2014
              }, {
                "label": "Current Total Medium Skilled Jobs",
                "value": v.tot_med_current
              }, {
                "label": "Projected Total Medium Skilled Jobs",
                "value": v.tot_med_projected_2020
              }]
            }];

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
        width: 450,
        height: 190,
        margin: {
          top: 10,
          right: 0,
          bottom: 60,
          left: 55
        },
        x: function(d) {
          return d.label;
        },
        y: function(d) {
          return d.value;
        },
        showValues: false,
        valueFormat: function(d) {
          return d3.format(',.4f')(d);
        }
      }
    };

    // Graph 2
    $scope.options2 = {
      chart: {
        type: 'discreteBarChart',
        width: 1250,
        height: 300,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 80
        },
        x: function(d) {
          return d.label;
        },
        y: function(d) {
          return d.value;
        },
        showValues: false,
        valueFormat: function(d) {
          return d3.format(',.4f')(d);
        },
        transitionDuration: 500
      }
    };

  });
