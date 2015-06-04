define(['angular'],function (angular) {

	'use strict';

	var profileControllers = angular.module('winWeb.controllers.addMember', ['angularFileUpload','ui.bootstrap','ngCookies']);

	profileControllers.controller('AddMemberCtrl', [ '$scope', 'winWebHttpService','$upload','$rootScope','$filter','$cookies','$routeParams',
		function($scope, winWebHttpService,$upload,$rootScope,$filter,$cookies,$routeParams) {
		
		debugger;
		
		$scope.call=$routeParams.call;
		
		if(!$routeParams.call){
			$scope.call=$routeParams.userName;
		}
		
		$scope.addUser=function (){
			
			location.href="#~/profileAddMemberSuccess";
			
//			winWebHttpService.querywithParams('index/addUser',{keyword:$routeParams.keyword}).then(function(newData) {
//				
//				
//				
//			});
		}
				
		} ]);
});
