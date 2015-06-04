define(['angular'],function (angular) {
'use strict';

var sportControllers = angular.module('winWeb.controllers.share', []);

sportControllers.controller('ShareCtrl', [ '$scope', 'winWebHttpService',
		function($scope, winWebHttpService) {
			$scope.data ={};
			winWebHttpService.querywithParams('ajax/share.json').then(function(data) {

                 //$scope.data['data']=data;
				$scope.data=data;
           
				console.log($scope.data);
			});

		} ]);
});