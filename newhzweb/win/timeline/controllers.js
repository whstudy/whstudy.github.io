'use strict';

var timelineControllers = angular.module('winWeb.controllers.timeline', []);

timelineControllers
.filter('isStr', function () {
    return function (input) {      
            //console.log(input + ' is string =' + angular.isString(input));
            return angular.isString(input);
    };
})
.controller('TimelineCtrl', [ '$scope', 'Scroll', 'Timeline','$http',
		function($scope, Scroll, Timeline,$http) {
            //alert('repotr ctrl');
			$scope.charOption = {
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					data : [ '最高', '最低' ]
				},
				toolbox : {
					show : true,
					feature : {
						mark : true,
						dataZoom : true,
						dataView : true,
						magicType : [ 'line', 'bar' ],
						restore : true,
						saveAsImage : true
					}
				},
				calculable : true,
				dataZoom : {
					show : true,
					realtime : true,
					start : 20,
					end : 80
				},
				xAxis : [ {
					type : 'category',
					boundaryGap : false,
					data : function() {
						var list = [];
						for ( var i = 1; i <= 30; i++) {
							list.push('2013-03-' + i);
						}
						return list;
					}()
				} ],
				yAxis : [ {
					type : 'value',
					splitArea : {
						show : true
					}
				} ],
				series : [ {
					name : '最高',
					type : 'line',
					data : function() {
						var list = [];
						for ( var i = 1; i <= 30; i++) {
							list.push(Math.round(Math.random() * 30));
						}
						return list;
					}()
				}, {
					name : '最低',
					type : 'line',
					data : function() {
						var list = [];
						for ( var i = 1; i <= 30; i++) {
							list.push(Math.round(Math.random() * 10));
						}
						return list;
					}()
				} ]
			};
			$scope.scrollData = [];

			$scope.scrolling = function() {
				var result = Scroll.getActs('ajax/timeline.json');
				
				result.then(function(newData) {
					//console.log('newData.length'+newData.length);
					for ( var i = 0; i < newData.length; i++) {		
						//console.log(newData[i] + ',isString=' +angular.isString(newData[i])+ ',length=' +newData[i].length);
						$scope.scrollData.push(newData[i]);
					}
					
				});

			};
			$scope.scrolling();
			
			
			
		} ]);
