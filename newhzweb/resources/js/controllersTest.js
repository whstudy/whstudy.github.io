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
			}else if(error.status === 501){
				console.log("异常");
				console.log(error);
			}
			
			// 异常处理
			console.log(error.status);
			console.log(error.data);
			
			
			
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
		});  
	};

	$scope.logout = function () {
		// Just clear the local storage
		TokenStorage.clear();	
		$scope.authenticated = false;
	};
	
	
	
	$scope.menu = function () {
		$http.post('/api/resources/menu').success(function (result, status, headers) {
			console.log('menu');
			console.log(result);
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
	
//	// 角色
//	$scope.role = function () {
//		console.log('role');
//		$http.post('/api/getRoles',null,{page: 1}).success(function (result, status, headers) {
//			console.log('role');
//			console.log(result);
//			// For display purposes only
//			$scope.users = result;
//		}).error(function(reason, status, headers, config) {
//			$scope.users = "权限不足!";
//		});
//		
//	};
	
	// 所有角色
	$scope.role = function () {
		$http.post('/api/role/all').success(function (result, status, headers) {
			console.log('获取所有角色');
			console.log(result);
		});  
	};

	// 修改角色
	$scope.updateRole = function () {
		var role = {roleId:3,name:'test',roleName:'test',description:'test'};
		console.log('修改角色');
		$http.post('/api/role/update',role).success(function (result, status, headers) {
			
		});  
	};
	
	// 新增角色
	$scope.addRole = function () {
		var role = {name:'新增',roleName:'role_add',description:'新增'};
		console.log('新增角色');
		$http.post('/api/role/add',role).success(function (result, status, headers) {
			
		});  
	};
	// 删除角色
	$scope.delRole = function () {
		console.log('删除角色');
		$http.post('/api/role/delete',{roleId:5}).success(function (result, status, headers) {
			console.log('删除角色');
		});  
	};
	
	
	
	
	// 获取资源
	$scope.getResource = function () {
		
		console.log('获取资源');
		$http.post('api/resources/get',{page:1,number:5}).success(function (result, status, headers) {
			console.log(result);
		});  
	};
	
	
	// 修改资源
	$scope.updateResource = function () {
		
		console.log('修改资源');
		$http({
			method : 'post',
			url : 'api/resources/update',
			data:{id:12,type:'MENU',value:'test',text:'text'}
		}).success(function(data, status, headers, config) {
			console.log(data);
		});
		 
	};
	
	// 异常
	$scope.testexc = function () {
		
//		console.log('获取资源');
//		$http.post('api/resources/get').success(function (result, status, headers) {
//			console.log(result);
//		});  
//		
		
		$http({
			method : 'post',
			url : 'api/resources/get',
			params:{page:1,number:5},
		}).success(function(data, status, headers, config) {
			console.log(data);
		});
	};
	
	
	// 获取资源tree
	$scope.treeResource = function () {
		
		console.log('获取资源tree');
		$http.post('api/resources/treeResources1').success(function (result, status, headers) {
			console.log(result);
		});  
	};
	
	// 根据用户id获取角色
	$scope.getRoleByUserId = function () {
		
		console.log('获取资源tree');
		$http({
			method : 'post',
			url : 'api/role/getRolesByUserId',
			params:{userId:2},
		}).success(function(data, status, headers, config) {
			console.log(data);
		});
		 
	};
	
	// 授权角色给用户
	$scope.authorizeRole2User = function () {
		
		console.log('授权角色给用户');
		$http({
			method : 'post',
			url : 'api/user/authorizeRole2User',
			data:{id:2,idList:[1,2]},
		}).success(function(data, status, headers, config) {
			console.log(data);
		});
		 
	};
	
	// 授权资源给角色
	$scope.authorizeResource2Role = function () {
		
		console.log('授权资源给角色');
		$http({
			method : 'post',
			url : 'api/role/authorizeResource2Role',
			data:{id:1,idList:[1,2]},
		}).success(function(data, status, headers, config) {
			console.log(data);
		});
		 
	};
	
	// 条件过滤获取资源
	$scope.getResources = function () {
		
		console.log('条件过滤获取资源');
		$http({
			method : 'post',
			url : 'api/resources/get',
			params:{type:'MENU',value:'',text:'',page:1,number:5}
		}).success(function(data, status, headers, config) {
			console.log(data);
		});
		 
	};
	
	
});