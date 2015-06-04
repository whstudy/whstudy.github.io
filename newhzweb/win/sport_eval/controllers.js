define(['angular'],function (angular) {
'use strict';

var sportControllers = angular.module('winWeb.controllers.sport_eval', []);

sportControllers.controller('SportEvalCtrl', [ '$scope', 'winWebHttpService',
		function($scope, winWebHttpService) {
			$scope.selectedItems={};
			$scope.allItems={};
			$scope.behaviorConsume={};
			$scope.total=0;
			$scope.hzBcDate=dateFormat(new Date(),"yyyy-MM-dd");
			$scope.firstSportItem;
						
			$scope.getBasBehavior=function(bcDate){				
				winWebHttpService.querywithParams('basBehavior/getBasBehavior',{hzBcDate:bcDate}).then(function(data) {						 				
					$scope.sportEvalItems=data.behaviorItemList;
					$scope.behaviorConsume=data.behaviorConsume;
					
					for ( var i = 0; i < $scope.sportEvalItems.length; i++) {
						var singleItem = $scope.sportEvalItems[i];//按种类
						//console.log(singleItem);
						for ( var j = 0; j < singleItem.data.length; j++) {
							if (singleItem.data[j]) {
								$scope.allItems[singleItem.data[j].itemid]=singleItem.data[j];
								if (i == 0 && j ==0) {
									$scope.firstSportItem = singleItem.data[j];
								}
								//console.log(singleItem.data[j]);
							}
						}
						/*if (i == 0) {
							for ( var j = 0; j < singleItem.data.length && j < 1; j++) {
								if (singleItem.data[j]) {
									$scope.selectedItems[singleItem.data[j].itemid]=singleItem.data[j];
								}
							}
						}*/
					}
					if ($scope.behaviorConsume.itemid){
						if ($scope.behaviorConsume.itemid[0] ==""){ 
							$scope.selectedItems[$scope.firstSportItem.itemid] = $scope.firstSportItem;
						} else {
							for ( var j = 0; j < $scope.behaviorConsume.itemid.length; j++) {
								var singleItemId = $scope.behaviorConsume.itemid[j];
								var singleItemTime = $scope.behaviorConsume.itemTime[j];
								var singleItem;
								if (singleItemId) {			
									singleItem=$scope.allItems[singleItemId];
									if (singleItemTime) {
										singleItem.time=singleItemTime;
									} else {
										singleItem.time=0;
									}
									$scope.selectedItems[singleItemId] = singleItem;
								}
							}
						}
					} else {
						$scope.selectedItems[$scope.firstSportItem.itemid] = $scope.firstSportItem;
					}
					$scope.initTitle();
					//console.log($scope.allItems);		
				});
			};
			
			$scope.getBasBehaviorConsume=function(){
				var bcDate = dateFormat($scope.hzBcDate,"yyyy-MM-dd");			
				winWebHttpService.querywithParams('basBehavior/getBehaviorConsume',{hzBcDate:bcDate}).then(function(data) {	
					$scope.behaviorConsume=data;
					$scope.selectedItems={};
					if ($scope.behaviorConsume.itemid){
						if ($scope.behaviorConsume.itemid[0] ==""){ 
							$scope.selectedItems[$scope.firstSportItem.itemid] = $scope.firstSportItem;
						} else {
							for ( var j = 0; j < $scope.behaviorConsume.itemid.length; j++) {
								var singleItemId = $scope.behaviorConsume.itemid[j];
								var singleItemTime = $scope.behaviorConsume.itemTime[j];
								var singleItem;
								if (singleItemId) {			
									singleItem=$scope.allItems[singleItemId];
									if (singleItemTime) {
										singleItem.time=singleItemTime;
									} else {
										singleItem.time=0;
									}
									$scope.selectedItems[singleItemId] = singleItem;
								}
							}
						}
					} else {
						$scope.selectedItems[$scope.firstSportItem.itemid] = $scope.firstSportItem;
					}
					$scope.initTitle();
					//console.log($scope.allItems);
				});
			};
			
			$scope.saveBasBehaviorConsume=function(){
				var i = 0;
				for (var itemid in $scope.selectedItems) {
					$scope.behaviorConsume.itemid[i]=$scope.selectedItems[itemid].itemid;					
					$scope.behaviorConsume.itemTime[i]=$scope.selectedItems[itemid].time;
					i++;
				}
				$scope.behaviorConsume.hzBcDate = dateFormat($scope.hzBcDate,"yyyy-MM-dd");
				//console.log($scope.behaviorConsume);				
				winWebHttpService.querywithParams('basBehavior/saveBehaviorConsume',null,$scope.behaviorConsume).then(function(data) {	
					$scope.alertOption={content:"数据保存成功",show:true};
				},function(){
					$scope.alertOption={content:"数据保存失败",show:true};
				});
			};
			
			$scope.getBasBehavior($scope.hzBcDate);
					
			$scope.initTitle = function (){
				//当膳食摄入为0时，合理能量消耗不显示
				if ($scope.behaviorConsume.mealsEnergy == 0) {
					$scope.normTitle="请录入当日膳食摄入情况。";
					$scope.normTitleUnit="";
					$scope.normTitleUnitClass="";
					$scope.behaviorConsume.normEnergyConsume=null;
					$scope.normLwTitle="";	
					$scope.behaviorConsume.lwNormEnergyConsume=null;
				} else if ($scope.behaviorConsume.mealsEnergy > 0 && $scope.behaviorConsume.mealsEnergy < $scope.behaviorConsume.basicEnergyConsume) {
					//当膳食摄入小于基础代谢时，合理能量消耗不显示
					$scope.normTitle="膳食摄入不足，需补充，以免影响健康。";
					$scope.normTitleUnit="";
					$scope.normTitleUnitClass="";
					$scope.behaviorConsume.normEnergyConsume=null;
					$scope.normLwTitle="";	
					$scope.behaviorConsume.lwNormEnergyConsume=null;
				} else {
					$scope.normTitle="合理的能量消耗/当日：";
					$scope.normTitleUnit="kcal";		
					$scope.normTitleUnitClass="label-danger";
					$scope.normLwTitle="则你合理的能量消耗/当日为：";
					$scope.loseWeightChange();
				}
			};
			
			$scope.total=0;
			$scope.initCalPower = function (){
				var tPower = 0;
				//console.log($scope.selectedItems);
				for ( var singleItem in $scope.selectedItems) {					
					var tTime =parseInt($scope.selectedItems[singleItem].time);
					if (!tTime) tTime = 0;
					tPower = tPower+parseInt($scope.selectedItems[singleItem].power)*tTime;						
				}
				$scope.total = tPower;
			};

			$scope.addItem = function (itemid){	
				var singleItem = $scope.allItems[itemid];
				if (!$scope.selectedItems[singleItem.itemid]) {
					singleItem.time =10;
					$scope.selectedItems[singleItem.itemid]=singleItem;	
				}
			};
			
			$scope.removeItem = function (itemid){								
				delete $scope.selectedItems[itemid];				
			};
			
			$scope.loseWeightChange = function (){
				if ($scope.behaviorConsume.mealsEnergy == 0) return;
				//console.log($scope.behaviorConsume.loseWeightTarget);
				$scope.behaviorConsume.lwNormEnergyConsume=$scope.behaviorConsume.mealsEnergy - $scope.behaviorConsume.basicEnergyConsume + $scope.behaviorConsume.loseWeightTarget*550;
			};
			
			function dateFormat(date,formatStr){
				var date = new Date(date);				
				var opt = {
					'yyyy': date.getFullYear(),
					'MM': addZero(date.getMonth() + 1),
					'M': date.getMonth() + 1,
					'dd': addZero(date.getDate()),
					'd': date.getDate(),
					'hh': addZero(date.getHours()),
					'h': date.getHours(),
					'mm': addZero(date.getMinutes()),
					'm': date.getMinutes(),
					'ss': addZero(date.getSeconds()),
					's': date.getSeconds()
				};
				
				function addZero(value){
					if(value < 10){
						value = '0'+value;
					}
					return value;
				}
				for(var k in opt){
					formatStr = formatStr.replace(k,opt[k]);
				}
				return formatStr;
			}


		} ]);
});