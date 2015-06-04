var app = angular.module('statelessApp', []).factory('TokenStorage', function() {
	var storageKey = 'auth_token';
	return {		
		store : function(token) {
			return localStorage.setItem(storageKey, token);
		},
		retrieve : function() {
			return localStorage.getItem(storageKey);
		},
		clear : function() {
			return localStorage.removeItem(storageKey);
		}
	};
}).factory('TokenAuthInterceptor', function($q, TokenStorage) {
	return {
		request: function(config) {
			var authToken = TokenStorage.retrieve();
			if (authToken) {
				config.headers['X-AUTH-TOKEN'] = authToken;
			}
			return config;
		},
		responseError: function(error) {
			if (error.status === 401 || error.status === 403) {
				TokenStorage.clear();
			}
			return $q.reject(error);
		}
	};
}).config(function($httpProvider) {
	$httpProvider.interceptors.push('TokenAuthInterceptor');
});

app.controller('AuthCtrl', function ($scope, $http, TokenStorage) {
	$scope.authenticated = false;
	$scope.token; // For display purposes only
	
	$scope.init = function () {
		$http.get('/api/users/current').success(function (user) {
			if(user.username !== 'anonymousUser'){
				$scope.authenticated = true;
				$scope.username = user.username;
				
				// For display purposes only
				$scope.token = JSON.parse(atob(TokenStorage.retrieve().split('.')[0]));
			}
		});
	};

	$scope.login = function () {
		$http.post('/api/login', { username: $scope.username, password: $scope.password }).success(function (result, status, headers) {
			$scope.authenticated = true;
			TokenStorage.store(headers('X-AUTH-TOKEN'));
			
			// For display purposes only
			$scope.token = JSON.parse(atob(TokenStorage.retrieve().split('.')[0]));
			
			window.location.href="complex.html";
		});  
	};

	$scope.logout = function () {
		// Just clear the local storage
		TokenStorage.clear();	
		$scope.authenticated = false;
	};
	
	
	
	$scope.menu = function () {
		$http.get('/api/users/main', { }).success(function (result, status, headers) {
			console.log('menu');
			// For display purposes only
			$scope.users = result;
		}).error(function(reason, status, headers, config) {
			$scope.users = "权限不足!";
		});		
	};
	
	$scope.test = function () {
		$http.post('/admin/api/users', { }).success(function (result, status, headers) {			
			// For display purposes only
			$scope.users = result;
		}).error(function(reason, status, headers, config) {
			$scope.users = "权限不足!";
		});
		
	};
});