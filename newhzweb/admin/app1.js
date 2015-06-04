'use strict';
var appModule = angular.module('app', ["ngRoute",'ngGrid']);


appModule.config(["$routeProvider","$locationProvider",function (e, r) {
	r.html5Mode(false).hashPrefix("~");
    e
	  	.when(
			"/index2",
			{
				templateUrl : "NewFile2.html",
				controller : "MyCtrl",
				reloadOnSearch : false
			})
		.when(
			"/index3",
			{
				templateUrl : "NewFile3.html",
				controller : "MyCtrl1",
				reloadOnSearch : false
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
						
//						$scope.$apply(function() {
//							ngModel.$setViewValue(treeNode)
//						})
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
			
			var zNodes = [{
				id: 1,
				pId: 0,
				name: "普通的父节点",
				t: "我很普通，随便点我吧",
				open: true
			},
			{
				id: 11,
				pId: 1,
				name: "叶子节点 - 1",
				t: "我很普通，随便点我吧",
				target:"_self",
				url:"#~/index2"
			},
			{
				id: 12,
				pId: 1,
				name: "叶子节点 - 2",
				t: "我很普通，随便点我吧",
				target:"_self",
				url:"#~/index3"
			},
			{
				id: 13,
				pId: 1,
				name: "叶子节点 - 3",
				t: "我很普通，随便点我吧"
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
			},
			{
				id: 3,
				pId: 0,
				name: "郁闷的父节点",
				t: "别点我，我好害怕...我的子节点随便点吧...",
				open: true,
				click: false
			},
			{
				id: 31,
				pId: 3,
				name: "叶子节点3 - 1",
				t: "唉，随便点我吧"
			},
			{
				id: 32,
				pId: 3,
				name: "叶子节点3 - 2",
				t: "唉，随便点我吧"
			},
			{
				id: 33,
				pId: 3,
				name: "叶子节点3 - 3",
				t: "唉，随便点我吧"
			}];	
			
			
			$.fn.zTree.init(element, setting, zNodes)
		}
	}
});

appModule.controller('MyController',
function($scope) {});



appModule.controller('MyCtrl', function($scope, $http) {	
	alert(111111);
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
                $http.get('largeLoad1.json').success(function (largeLoad) {		
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('largeLoad1.json').success(function (largeLoad) {
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
	
    $scope.mySelections=[];
    
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        multiSelect: false,
        selectedItems: $scope.mySelections
    };
});


appModule.controller('MyCtrl1', function($scope, $http) {
	alert(2222222);
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
                $http.get('largeLoad2.json').success(function (largeLoad) {		
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('largeLoad2.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
//    $scope.$watch('pagingOptions', function (newVal, oldVal) {
//        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
//          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//        }
//    }, true);
//    $scope.$watch('filterOptions', function (newVal, oldVal) {
//        if (newVal !== oldVal) {
//          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//        }
//    }, true);
	
    $scope.mySelections=[];
    
    $scope.gridOptions1 = {
        data: 'myData',
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        multiSelect: false,
        selectedItems: $scope.mySelections
    };
});


