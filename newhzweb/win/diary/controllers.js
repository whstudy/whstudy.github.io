define(['angular'],function (angular) {
'use strict';

var sportControllers = angular.module('winWeb.controllers.diary', []);

sportControllers.controller('DiaryCtrl', [ '$scope', 'winWebHttpService',
		function($scope, winWebHttpService) {
			$scope.data ={};
			winWebHttpService.querywithParams('ajax/diary.json').then(function(data) {

                 //$scope.data['data']=data;
				$scope.data=data;
           
				console.log($scope.data);
			});
		} ]);
});