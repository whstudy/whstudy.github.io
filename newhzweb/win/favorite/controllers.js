define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.controllers.favorite', ['ui.bootstrap']).controller('FavoriteCtrl', [ '$scope', 'winWebHttpService',
		function($scope, winWebHttpService) {
			
			$scope.itemColors = ["success","warning","primary"];
			$scope.currentPage = 1;
			$scope.maxSize = 8;
			$scope.itemsPerPage = 15;	
			winWebHttpService.querywithParams('index/getFavorite',{page:1}).then(function(data) {
				$scope.data=data.data;
				$scope.favoriteCounts=data.count;
				console.log($scope.data);
			});
			
			$scope.pageChanged = function() {
			    winWebHttpService.querywithParams('index/getFavorite',{page:$scope.currentPage}).then(function(data) {
					$scope.data=data.data;
				});
			 };
			
		} ]);

});