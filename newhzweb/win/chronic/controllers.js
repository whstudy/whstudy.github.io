
define(['angular'],function (angular) {


'use strict';

angular.module('winWeb.controllers.chronic', ['ui.bootstrap'])
.controller('ChronicMainCtrl', [ '$scope', 'winWebHttpService',
		function($scope, winWebHttpService) {
			$scope.types = [
		              {"id":1,"name":"糖尿病"},
		              {"id":2,"name":"高血压"},
		              {"id":3,"name":"高血脂"},
		              {"id":4,"name":"痛风"},
		              {"id":5,"name":"脂肪肝"},
		              {"id":6,"name":"冠心病"},
		              {"id":7,"name":"肥胖"},
		              {"id":8,"name":"骨质疏松"},
		              {"id":9,"name":"贫血"}
	  			];
		
	  			$scope.typePic={ 1:"img/ceping01.jpg",
							2:"img/ceping02.jpg",
  							3:"img/ceping03.jpg",
  							4:"img/ceping04.jpg",
  							5:"img/ceping05.jpg",
  							6:"img/ceping06.jpg",
  							7:"img/ceping07.jpg",
  							8:"img/ceping08.jpg",
  							9:"img/ceping09.jpg"
						};
	  			$scope.typeName = { 1:"糖尿病",
		  							2:"高血压",
		  							3:"高血脂",
		  							4:"痛风",
		  							5:"脂肪肝",
		  							6:"冠心病",
		  							7:"肥胖",
		  							8:"骨质疏松",
		  							9:"贫血"
	  						};
		winWebHttpService.querywithParams('index/chronicGetMain').then(function(data) {
				$scope.chronicData = data;
			});
            
		} ]).controller('ChronicTopCtrl', [ '$scope', 'winWebHttpService',
		function($scope, winWebHttpService) {
			$scope.types = [
				              {"id":1,"name":"糖尿病"},
				              {"id":2,"name":"高血压"},
				              {"id":3,"name":"高血脂"},
				              {"id":4,"name":"痛风"},
				              {"id":5,"name":"脂肪肝"},
				              {"id":6,"name":"冠心病"},
				              {"id":7,"name":"肥胖"},
				              {"id":8,"name":"骨质疏松"},
				              {"id":9,"name":"贫血"}
			  			];
		winWebHttpService.querywithCache('index/chronicGetTop').then(function(data) {
			 $scope.top10 = data;
			 for(var i=0; i<$scope.top10.length; i++){
         	 	if($scope.top10[i].title.length >10){
         	 		$scope.top10[i].title = $scope.top10[i].title.substring(0,12) +'...';
         	 	}
         	}
			 
			});
            
		} ]).controller('ChronicCatCtrl', [ '$scope', 'winWebHttpService','$routeParams',
		function($scope, winWebHttpService,$routeParams) {
			$scope.currentPage = 1;
			$scope.maxSize = 8;
			$scope.itemsPerPage = 3;
			$scope.pageChanged = function() {
			    winWebHttpService.querywithParams('index/chronicGetCats',{page:$scope.currentPage,type:$routeParams.type}).then(function(data) {
			    	$scope.list = data.data;
					$scope.chronicCounts=data.count;
				});
			 };
			winWebHttpService.querywithParams('index/chronicGetCats',{page:1,type:$routeParams.type}).then(function(data) {
				$scope.list = data.data;
				console.log($scope.list);
				$scope.chronicCounts=data.count;
			});
            
		} ]).controller('ChronicDetalCtrl', [ '$scope', 'winWebHttpService','$routeParams',
		                            		function($scope, winWebHttpService,$routeParams) {
			$scope.typeName = { 1:"糖尿病",
						2:"高血压",
						3:"高血脂",
						4:"痛风",
						5:"脂肪肝",
						6:"冠心病",
						7:"肥胖",
						8:"骨质疏松",
						9:"贫血"
				};
			winWebHttpService.querywithParams('index/chronicGetDetail',{id:$routeParams.id}).then(function(data) {
					 $scope.article = data;
					 //console.log($scope.article.source);
					 if(!$scope.article.source){
	            	 	$scope.article.source = '本站';
	            	 }
	            	 
	            	 var detail={views:1,id:$routeParams.id};
	            	 winWebHttpService.querywithParams('index/chronicUpdate',null,detail);
				});
			
			$scope.detail={ups:null,downs:null,views:null};
			$scope.operation=function(id,type,e){
				e.target.disabled=true;
				//$("#upsid,#downsid").attr("disabled",true);				
				var detail={};
				detail.id=id;
				if (type=='up') {
					detail.ups=1; 
				} else if(type=='down') {
					detail.downs=1;
				}
				winWebHttpService.querywithParams('index/chronicUpdate',null,detail).then(function(data) {
					//alert("success");
					if (type=='up') {
						$scope.article.ups +=1; 
					} else if(type=='down') {
						$scope.article.downs +=1;
					}
				});
			};
						
			$scope.favorite={id:null,title:null};
			$scope.addfavorite=function(id,title,e){
				e.target.disabled=true;							
				var favorite={};
				favorite.id=id;
				favorite.title=title;
				winWebHttpService.querywithParams('index/chronicFavorite',null,favorite).then(function(data) {
					 //alert("success");					 
					 $scope.article.favorites +=1;			
				});
			};
			
	            
			} ]);

});
