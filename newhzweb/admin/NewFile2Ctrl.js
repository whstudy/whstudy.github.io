'use strict';
var appModule = angular.module('app', ["ngRoute",'ngGrid','ui.bootstrap']);


appModule.directive('tree',
		function() {
			return {
				require: '?ngModel',
				restrict: 'A',
				link: function($scope, element, attrs, ngModel) {						
					
					$scope.getCheckedNodes=function(){
						var treeObj = $.fn.zTree.getZTreeObj("tree1");
						var nodes = treeObj.getCheckedNodes(true);
						console.log(nodes);
					}
					
					$scope.$watch('node', function(newValue, oldValue) {
						console.log(oldValue);
						console.log(newValue);
						$.fn.zTree.init(element, setting, newValue)
					})
			
					
					var setting = {
						view:{
							dblClickExpand:false
						},
						data: {
							key: {
								title: "t"
							},
							simpleData: {
								enable: true
							}
						},
						callback: {
							onClick: function(event, treeId, treeNode, clickFlag) {
								
								var zTree = $.fn.zTree.getZTreeObj(treeId);
								zTree.expandNode(treeNode);
								
							}
						},
						check: {
							enable: true,
							autoCheckTrigger: true,
							chkboxType: { "Y": "ps", "N": "ps" }
						},
						treeNode:{
							target:"_self",
							url:"www.baidu.com"
						}
					};
					

				}
			}
		});


appModule.controller('MyCtrl', function($scope, $http) {	
	$scope.del=function(){
		alert($scope.mySelections[0].name); 
	}


	 $http.get('admin/largeLoad.json').success(function (data) {
		 
		 $scope.chronicCounts=20;
		 $scope.itemsPerPage=3;
		 $scope.maxSize=8;
		 $scope.currentPage = 1;
		 
	     var pagedData = data.slice(0, 20);
		 $scope.data=pagedData;
         
     });	 
    
});



