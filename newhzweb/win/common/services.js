define(['angular'],function (angular) {

	'use strict';

	angular.module('winWeb.services.common', ['ngResource','ngCookies'])
	.factory('winWebHttpService', ['$q','$http','$cacheFactory','$rootScope','$cookies',function($q, $http,$cacheFactory,$rootScope,$cookies) {
			var httpService = {};
			
    		//读取cookies 
    		function getCookie(name) 
    		{ 
    		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    		    if(arr=document.cookie.match(reg))
    		        return unescape(arr[2]); 
    		    else 
    		        return null; 
    		} 
    		//删除cookies 
    		function delCookie(name) 
    		{ 
    		    var exp = new Date(); 
    		    exp.setTime(exp.getTime() - 1); 
    		    var cval=getCookie(name); 
    		    if(cval!=null) 
    		        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    		} 
			
    		httpService.querywithMethod = function(method,url,params,data,shade) {
				if(shade == undefined){
					$('#foo').show();
				}
				
				var deferred = $q.defer();
				
				console.log('--------------------------ajax 请求-----------------------------------------');
				console.log('name:' + $cookies.name);
				
				var head = {'Content-Type': 'application/json;charset=UTF-8','X-Requested-With':'XMLHttpRequest','AuthName':getCookie('name')};
				
				$http({
					timeout:60000,
					method : method,
					url : url,
					params:params,
					data:data,
					headers: head,
				}).success(function(data, status, headers, config) {
					console.log($cookies.name);
					
					if(document.cookie.length>0){
						$rootScope.call = getCookie("call");
						$rootScope.username = getCookie("username");
	  					$rootScope.name = getCookie("name");
	  					$rootScope.description = getCookie("description");
	  					$rootScope.imgUrl = getCookie("imgUrl");
	  					$rootScope.tall = getCookie("tall");
	  					$rootScope.gender = getCookie("gender");
	  					$rootScope.users = angular.fromJson($cookies.users); // use angular cookie
	  				}
					
					deferred.resolve(data);
					$('#foo').hide();
				}).error(function(reason, status, headers, config) {
					if(status==403){	
//						alert("服务端错误");
//						window.location.reload();						
//						window.location.href="login.jsp";
					}else if(status===310){
//						window.location.href="#~/profile";
					}
					deferred.reject(reason);
					$('#foo').hide();
				});
				
				return deferred.promise;
			};
    		
    		
    		
			httpService.querywithParams = function(url,params,data,shade) {
				if(shade == undefined){
					$('#foo').show();
				}
				
				var deferred = $q.defer();
				
				console.log('--------------------------ajax 请求-----------------------------------------');
				console.log('name:' + $cookies.name);
				
				var head = {'Content-Type': 'application/json;charset=UTF-8','X-Requested-With':'XMLHttpRequest','AuthName':getCookie('name')};
				
				$http({
                    timeout:60000,
					method : 'post',
					url : url,
					params:params,
					data:data,
					headers: head,
				}).success(function(data, status, headers, config) {
					console.log($cookies.name);
					
					if(document.cookie.length>0){
						$rootScope.call = getCookie("call");
						$rootScope.username = getCookie("username");
	  					$rootScope.name = getCookie("name");
	  					$rootScope.description = getCookie("description");
	  					$rootScope.imgUrl = getCookie("imgUrl");
	  					$rootScope.tall = getCookie("tall");
	  					$rootScope.gender = getCookie("gender");
	  					$rootScope.users = angular.fromJson($cookies.users); // use angular cookie
	  				}
					
					deferred.resolve(data);
					$('#foo').hide();
				}).error(function(reason, status, headers, config) {
					if(status==403){
//						window.location.reload();						
//						window.location.href="login.jsp";
					}else if(status===310){
//						window.location.href="#~/profile";
						/*alert("请先完善信息");*/
						window.location.href="#~/profileHealthInfo";
					}
					deferred.reject(reason);
					$('#foo').hide();
				});
				
				return deferred.promise;
			};
			httpService.querywithCache = function(url,params,data) {
				var httpcache=$cacheFactory.get('$http');
				var cachedData= httpcache.get(url);
				var deferred = $q.defer();
				if(cachedData){
					deferred.resolve(cachedData);
				}else{
					$http({
						timeout:60000,
						method : 'post',
						url : url,
						params:params,
						data:data,
						cache:true,
						headers: {'Content-Type': 'application/json;charset=UTF-8','X-Requested-With':'XMLHttpRequest','AuthName':$cookies.name},
					}).success(function(data, status, headers, config) {
						/*try{
							angular.fromJson(data);
						}catch(e){
							window.location.reload();
						}*/
						httpcache.put(url,data);
						deferred.resolve(data);
					}).error(function(reason, status, headers, config) {
						console.log(status);
						if(status==403){							
//							window.location.reload();
//							window.location.href="login.jsp";
						}else if(status===310){
//							window.location.href="#~/profile";
						}
						deferred.reject(reason);
					});
				}
				
				return deferred.promise;
			};	
			return httpService;

	}]);
});
 

