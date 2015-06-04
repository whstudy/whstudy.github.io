'use strict';

/* Services */

var userServices = angular.module('winWeb.services.main', ['ngResource']);

userServices.factory('Users', ['$q','$http',function($q, $http) {

			var userService = {};
			 
			userService.queryMainData = function(url,params) {
				var deferred = $q.defer();
				$http({
					method : 'post',
					url : url,
					params:params
				}).success(function(data, status, headers, config) {
					deferred.resolve(data);
				}).error(function(reason, status, headers, config) {
					deferred.reject(reason);
				});
				return deferred.promise;
			};	
			return userService;

} ]);

userServices.factory('Scroll', function($http, $q) {

	var scroll = {};
	scroll.getActs = function(dataUrl,page) {
		var deferred = $q.defer();
		$http({
			method : 'POST',
			url : dataUrl,
			params:{page:page}
		}).success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).error(function(reason, status, headers, config) {
			deferred.reject(reason);
		});
		return deferred.promise;
	};

	return scroll;
});

 

