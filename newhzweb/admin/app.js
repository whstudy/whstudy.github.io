'use strict';
var appModule = angular.module('app', ["ngRoute",'ngGrid','ui.bootstrap']);


appModule.config(["$routeProvider","$locationProvider",function (e, r) {
	r.html5Mode(false).hashPrefix("~");
    e
	  	.when(
			"/index2",
			{
				templateUrl : "admin/NewFile2.html",
				controller : "MyCtrl",
				reloadOnSearch : true
			})
		.when(
			"/index3",
			{
				templateUrl : "admin/NewFile3.html",
				controller : "MyCtrl1",
				reloadOnSearch : true	
			})
			.otherwise({
				redirectTo : "/index2"
			});
    
}]);


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


appModule.directive('leftTree',
		function() {
			return {
				require: '?ngModel',
				restrict: 'A',
				link: function($scope, element, attrs, ngModel) {										
					
					$scope.a=function(){
						var treeObj = $.fn.zTree.getZTreeObj("tree");
						var nodes = treeObj.getCheckedNodes(true);
						console.log(nodes);
					}
					
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
								
//								$scope.$apply(function() {
//									ngModel.$setViewValue(treeNode)
//								})
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
					
					var zNodes = $scope.node;
					
					
					$.fn.zTree.init(element, setting, zNodes)
				}
			}
		});


appModule.controller('MyController',
function($scope) {
	
	 $scope.changeCallName=function(){
//			alert(1111);
			$('.modal.fade').modal('hide');
		 }
	
	$scope.dj=function(){
	
		$scope.node=[{
			id: 1,
			pId: 0,
			name: "系统管理",
			t: "我很普通，随便点我吧",
			open: true
		},
		{
			id: 11,
			pId: 1,
			name: "用户管理",
			t: "我很普通，随便点我吧",						
			checked:true
		}];		
	}
	
	$scope.node=[{
		id: 1,
		pId: 0,
		name: "系统管理",
		t: "我很普通，随便点我吧"
		,open: true
	},
	{
		id: 11,
		pId: 1,
		name: "用户管理",
		t: "我很普通，随便点我吧",
		target:"_self",
		url:"#~/index2",
		checked:true
	},
	{
		id: 12,
		pId: 1,
		name: "角色管理",
		t: "我很普通，随便点我吧",
		target:"_self",
		url:"#~/index3",
		checked:true
	},
	{
		id: 13,
		pId: 1,
		name: "资源管理",
		t: "我很普通，随便点我吧",
		checked:true
	},
	{
		id: 2,
		pId: 0,
		name: "NB的父节点",
		t: "点我可以，但是不能点我的子节点，有本事点一个你试试看？",
		open: true
	},
	{
		id: 21,
		pId: 2,
		name: "叶子节点2 - 1",
		t: "你哪个单位的？敢随便点我？小心点儿..",
		click: false
	},
	{
		id: 22,
		pId: 2,
		name: "叶子节点2 - 2",
		t: "我有老爸罩着呢，点击我的小心点儿..",
		click: false
	},
	{
		id: 23,
		pId: 2,
		name: "叶子节点2 - 3",
		t: "好歹我也是个领导，别普通群众就来点击我..",
		click: false
	}
	];
	
});



appModule.controller('MyCtrl', function($scope, $http) {	
	$scope.del=function(){
		alert($scope.mySelections[0].name); 
	}
	
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true,
        enablePinning: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [20,250, 500, 1000],
        pageSize: 20,
        currentPage: 1
    };	
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;            
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('admin/largeLoad1.json').success(function (largeLoad) {		
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('admin/largeLoad1.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                    
                });
            }
        }, 100);
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
//    $scope.mySelections=[];
//    
    
//    $scope.gridOptions = {
//            data: 'myData',
//            enablePaging: true,
//    		showFooter: true,
//            totalServerItems: 'totalServerItems',
//            pagingOptions: $scope.pagingOptions,
//            filterOptions: $scope.filterOptions,
//            multiSelect: false,
//            selectedItems: $scope.mySelections
//        };
    
	 $http.get('admin/largeLoad.json').success(function (data) {
		 
		 $scope.chronicCounts=20;
		 $scope.itemsPerPage=3;
		 $scope.maxSize=8;
		 $scope.currentPage = 1;
		 
	     var pagedData = data.slice(0, 20);
		 $scope.data=pagedData;
         
     });	 
    
});


appModule.controller('MyCtrl1', function($scope, $http) {	
	
	 $http.get('admin/largeLoad1.json').success(function (largeLoad) {
		 $scope.data=largeLoad;
		 $scope.chronicCounts=10;
		 $scope.itemsPerPage=2;
		 $scope.maxSize=5;
		 $scope.currentPage = 1;
		 
			$scope.pageChanged = function() {
			    winWebHttpService.querywithParams('index/chronicGetCats',{page:$scope.currentPage,type:$routeParams.type}).then(function(data) {
			    	$scope.list = data.data;
					$scope.chronicCounts=data.count;
				});
			 };
     });

	 $scope.changeCallName1=function(){

		 
		 $scope.chronicCounts=4;
		 $scope.itemsPerPage=2;
		 $scope.maxSize=2;
		 $scope.currentPage = 1;
		 
			$scope.data=[{"name": "222", "allowance": 505050505050505050,"aaa":11111},
			             {"name": "Tiancum", "allowance": 53,"aaa":22222},
			             {"name": "Jacob", "allowance": 27,"aaa":11111},
			             {"name": "Nephi", "allowance": 29,"aaa":11111},
			             {"name": "Enos", "allowance": 34,"aaa":11111},
			             {"name": "Ether", "allowance": 42,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111},
			             {"name": "Jared", "allowance": 21,"aaa":11111},
			             {"name": "Moroni", "allowance": 50,"aaa":11111},
			             {"name": "Tiancum", "allowance": 53,"aaa":11111},
			             {"name": "Jacob", "allowance": 27,"aaa":11111},
			             {"name": "Nephi", "allowance": 29,"aaa":11111},
			             {"name": "Enos", "allowance": 34,"aaa":11111},
			             {"name": "Ether", "allowance": 42,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111},
			             {"name": "Alma", "allowance": 43,"aaa":11111}];
			
		 }
	 
	 
});

