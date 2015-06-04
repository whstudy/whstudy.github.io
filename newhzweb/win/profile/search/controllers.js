/**
 * 个人中心模块
 */
define(['angular'],function (angular) {

	'use strict';

	var profileControllers = angular.module('winWeb.controllers.familySearch', ['angularFileUpload','ui.bootstrap','ngCookies']);

	profileControllers.controller('FamilySearchCtrl', [ '$scope', 'winWebHttpService','$upload','$rootScope','$filter','$cookies','$routeParams',
		function($scope, winWebHttpService,$upload,$rootScope,$filter,$cookies,$routeParams) {
		$scope.users = null;
		if($routeParams.keyword){
			console.log('hhhhhhhhhhhhh');
			console.log($routeParams.keyword);
			// 获取家庭成员			
			winWebHttpService.querywithParams('index/findUsers',{keyword:$routeParams.keyword}).then(function(newData) {
	
				$scope.keyword=$routeParams.keyword;
				console.log(newData);
				$scope.users = newData;
	
			});
		}
		
		$scope.requestAttention=function(){
			
			var requestedUsername=$(".modal-dialog #requestedUsername").val();
			var requestMessage=$scope.requestMessage;			
			
			if(requestMessage==undefined){
				requestMessage='';
			}
			
			winWebHttpService.querywithParams('index/requestAttention',{requestUsername:$cookies.name,requestedUsername:requestedUsername,requestMessage:requestMessage}).then(function(newData) {				
				
				$scope.keyword=$routeParams.keyword;
				
				console.log(newData);
//				$scope.users = newData;
								
				$('#modal-set').modal('hide');
				
				$(addFriendBtn).parent().html(newData);
				
//				$scope.newData=newData;
				
			});  

		}
		
		} ]);
});
