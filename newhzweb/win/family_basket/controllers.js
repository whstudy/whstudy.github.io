define(['angular'],function (angular) {
'use strict';

var module = angular.module('winWeb.controllers.familyBasket', ['ui.bootstrap']);

module.controller('FamilyBasketCtrl', [ '$scope','winWebHttpService','$filter',
		function($scope,winWebHttpService,$filter) {
			 
			winWebHttpService.querywithParams('index/getFoods',{page:1,number:15}).then(function(data) {
				$scope.foods=data.foods;
				$scope.foodsCounts=data.count;
				//copyFoods();
				filterFoods();
			});
			winWebHttpService.querywithParams('index/getFoodTypes').then(function(data) {
				$scope.foodTypes=data;
			});
			$scope.currentPage = 1;
			$scope.maxSize = 8;
			$scope.itemsPerPage = 15;
			$scope.searchFood=function(type) {
				$scope.currentPage = 1;
				if (type) {
					$scope.foodType=type;
					winWebHttpService.querywithParams('index/searchFoods',{page:1,typeId:type,number:15}).then(function(data) {
						$scope.foods=data.foods;
						$scope.foodsCounts=data.count;
						//copyFoods();
						filterFoods();
					});
				}else{
					$scope.foodType=null;
					winWebHttpService.querywithParams('index/getFoods',{page:1,number:15}).then(function(data) {
						$scope.foods=data.foods;
						$scope.foodsCounts=data.count;
						//copyFoods();
						filterFoods();
					});
				}
				
			};
			$scope.pageChanged = function() {
			    winWebHttpService.querywithParams('index/searchFoods',{page:$scope.currentPage,typeId:$scope.foodType,number:15}).then(function(data) {
					$scope.foods=data.foods;
					//copyFoods();
					filterFoods();
				});
			 };
			
			$scope.mealList={'breakfast':[],'lunch':[],'supper':[]};
			$scope.mealTime='breakfast';
			$scope.changeMealTime=function(time) {
				$scope.mealTime = time;
				var addedMealList = angular.copy($scope.mealList[time]);
				var foods = angular.copy($scope.foods);
				$scope.foods2  = [];

				for(var i=0; i<foods.length; i++){
					foods[i].cart = 'cart-orange.png';
					for(var j=0; j<addedMealList.length; j++){
						if(addedMealList[j].id === foods[i].id){
							foods[i].cart = 'cart-blue.png';
							break;
						}
					}
					$scope.foods2.push(foods[i]);
				}	
			};
			$scope.addMealToDesk = function(data){
				if(data.cart !== 'cart-blue.png'){
					data.cart = 'cart-blue.png';
					$scope.mealList[$scope.mealTime].push(data);
					//console.log($scope.mealList);
				}else{
					data.cart = 'cart-orange.png';
					for(var i=0; i<$scope.mealList[$scope.mealTime].length;i++){
						if($scope.mealList[$scope.mealTime][i].id == data.id){
							$scope.mealList[$scope.mealTime].splice(i,1);
						}
					}
				}
			};
			 
			var copyFoods=function(){
				$scope.foods2=[];
				var foods = angular.copy($scope.foods);
				for(var i=0; i<foods.length; i++){
					foods[i].cart = 'cart-orange.png';
					$scope.foods2.push(foods[i]);
				}
			};
			
			var filterFoods = function(){
				var addedMealList = angular.copy($scope.mealList[$scope.mealTime]);
				var foods = angular.copy($scope.foods);
				$scope.foods2  = [];
				for(var i=0; i<foods.length; i++){
					foods[i].cart = 'cart-orange.png';
					for(var j=0; j<addedMealList.length; j++){
						if(addedMealList[j].id == foods[i].id){
							foods[i].cart = 'cart-blue.png';
							break;
						}
					}
					$scope.foods2.push(foods[i]);
				}	
			};
			
		  $scope.open = function($event) {
			    $event.preventDefault();
			    $event.stopPropagation();
			    $scope.opened = true;
		  };
		  $scope.format = 'yyyy-MM-dd';
		  $scope.chosenDate=new Date();
		   
		  
		  $scope.saveRecord = function() {
			  var foods=angular.copy($scope.mealList);
			  winWebHttpService.querywithParams('index/saveMealEval',{data:foods,dateStr:$filter('date')($scope.chosenDate, "yyyy-MM-dd")}).then(function(data) {
				  $scope.alertOption={content:"保存成功",show:true};
				},function(data) {
					$scope.alertOption={content:data.errMsg,show:true};
					
				});
		  };
		  $scope.findRecord = function() {
			  winWebHttpService.querywithParams('index/getMealEval',{dateStr:$filter('date')($scope.chosenDate, "yyyy-MM-dd")}).then(function(data) {
					 $scope.mealList=data;
					 $("#meals-desk").fadeIn(); 
					 $scope.changeMealTime($scope.mealTime);
							
				},function(data) {
					$scope.alertOption={content:data.errMsg,show:true};
					$scope.mealList={'breakfast':[],'lunch':[],'supper':[]};
					$scope.changeMealTime($scope.mealTime);
				});
			 
		  };
		  
		  
		} ]);



});