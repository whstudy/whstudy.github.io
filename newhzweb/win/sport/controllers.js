define(['angular'],function (angular) {
	
	'use strict';

	var module = angular.module('winWeb.controllers.sport', ['ngCookies']);
	
	// sport controller
	module.controller('SportCtrl', [ '$scope', 'winWebHttpService','$filter','$cookies',
			function($scope, winWebHttpService,$filter,$cookies) {
					
				// 时间
				$scope.sportDate = $filter('date')(new Date(), 'yyyy-MM-dd');	
				
				// 运动提醒设置
				$scope.week = [];
				var sWeek = "日 一 二 三 四 五 六".split(' ');
	            for( var k in sWeek){
	                $scope.week[k]='星期'+sWeek[k];
	            };
	            
				// 进入页面加载数据
	            loadData();
	            function loadData(){
	            	winWebHttpService.querywithParams("basBehavior/getConsumes",{username:$cookies.name,signDate:$filter('date')($scope.sportDate, 'yyyy-MM-dd')}).then(function (newData) {
						console.log('我的能量消耗');
						console.log(newData);
						$scope.consumes = newData;
						
						$scope.consumes.consumes.allEnergyRice = $scope.consumes.consumes.allEnergyRice.toFixed(0);
						$scope.consumes.consumes.todayEnergyRice = $scope.consumes.consumes.todayEnergyRice.toFixed(0);
						$scope.consumes.consumes.weekEnergyRice = $scope.consumes.consumes.weekEnergyRice.toFixed(0);
						
						// 根据运动时间进行降序排序
						$scope.consumes.consumes.todayBeahviorConsumeList = $filter('orderBy')($scope.consumes.consumes.todayBeahviorConsumeList, 'itemTime', true);
						$scope.consumes.consumes.weekBeahviorConsumeList = $filter('orderBy')($scope.consumes.consumes.weekBeahviorConsumeList, 'itemTime', true);
						$scope.consumes.consumes.allBeahviorConsumeList = $filter('orderBy')($scope.consumes.consumes.allBeahviorConsumeList, 'itemTime', true);
						$scope.todayConsumes = $scope.consumes.consumes.todayBeahviorConsumeList;
						$scope.weekConsumes = $scope.consumes.consumes.weekBeahviorConsumeList;
						$scope.allConsumes = $scope.consumes.consumes.allBeahviorConsumeList;
						$scope.todayConsumesPage = $scope.consumes.consumes.todayBeahviorConsumeList.slice(0,5);
						$scope.weekConsumesPage = $scope.consumes.consumes.weekBeahviorConsumeList.slice(0,5);
						$scope.allConsumesPage = $scope.consumes.consumes.allBeahviorConsumeList.slice(0,5);
						// 运动日统计趋势图
						$scope.charOption=  {
								title : {text: '我的能量消耗趋势图',x:'center'},
								legend: { data:['消耗能量','消耗米饭'],x:'center',y:35},
							    tooltip : { trigger: 'axis'},
							    yAxis : [{ type : 'value',splitArea : {show : true}}],
							    dataZoom : { show : true,realtime : true,start : 0,end : 100},
							    xAxis :  [{type : 'category',data : $scope.consumes.chartData.date}],
							    series : [{name : '消耗能量',type:'line',data:$scope.consumes.chartData.energy},
							              {name : '消耗米饭',type:'line',data:$scope.consumes.chartData.energyRice}
							    		]
						};
					});
	            };
				
	            // 能量消耗统计分页
	            $scope.todayPage = 0;
	            $scope.weekPage = 0;
	            $scope.allPage = 0;
	            $scope.fnConsumePage = function(type,index){
	            	if(type == 'today'){
	            		if(index === 0){// --
	            			if($scope.todayPage === 0) return;
	            			$scope.todayPage = $scope.todayPage - 1;
	            		}else{// ++
	            			if($scope.todayPage*5 + 5 >= $scope.todayConsumes.length) return;
	            			$scope.todayPage = $scope.todayPage + 1;
	            		}
	            		$scope.todayConsumesPage = $scope.todayConsumes.slice($scope.todayPage*5,$scope.todayPage*5+5);
	            	}else if(type == 'week'){
	            		if(index === 0){
	            			if($scope.weekPage === 0) return;
	            			$scope.weekPage = $scope.weekPage - 1;
	            		}else{
	            			if($scope.weekPage*5 + 5 >= $scope.weekConsumes.length) return;
	            			$scope.weekPage = $scope.weekPage + 1;
	            		}
	            		$scope.weekConsumesPage = $scope.weekConsumes.slice($scope.weekPage*5,$scope.weekPage*5+5);
	            	}else if(type === 'all'){
	            		if(index === 0){
	            			if($scope.allPage === 0) return;
	            			$scope.allPage = $scope.allPage - 1;
	            		}else{
	            			if($scope.allPage*5 + 5 >= $scope.allConsumes.length) return;
	            			$scope.allPage = $scope.allPage + 1;
	            		}
	            		$scope.allConsumesPage = $scope.allConsumes.slice($scope.allPage*5,$scope.allPage*5+5);
	            	}
	            };
	            
	            
	            $scope.fnGetSports = function(){
	            	console.log($scope.searchParams.date);
	            	$scope.searchParams.date = $filter('date')($scope.sportDate, 'yyyy-MM-dd');
	            	getSports($scope.searchParams);
	            	loadData();
	            };
	            
	            $scope.$watch('consumes.loseWeightTarget', function (newValue, oldValue) {
	            	if(newValue != undefined){
	            		/*var reg = new RegExp("^[0-9]+([.][0-9]+){0,1}$");
						if(!reg.test(String($scope.consumes.loseWeightTarget).charAt($scope.consumes.loseWeightTarget.length-1))){
							$scope.consumes.loseWeightTarget = $scope.consumes.loseWeightTarget.substr(0,$scope.consumes.loseWeightTarget.length-1);
						}*/
	            		$scope.consumes.normEnergyConsume = ($scope.consumes.mealsEnergy - $scope.consumes.basicEnergyConsume + $scope.consumes.loseWeightTarget*550).toFixed(0);
	            		if($scope.consumes.normEnergyConsume < 0){
	            			$scope.consumes.normEnergyConsume = 0;
	            		}
	            		if($scope.consumes.normEnergyConsume < $scope.consumes.consumes.todayEnergy){
	            			$scope.consumePic = 'img/xiaolian.png';
	            		}else{
	            			$scope.consumePic = 'img/kulian.png';
	            		}
	            	}
	               
	            }, true);

	            
				$scope.searchParams={'sportField':'','sportCrowd':'','sportTarget':'','sportDiseaseId':'','date':$scope.sportDate};
				var getSports=function (params) {
					winWebHttpService.querywithParams("index/getSport",params).then(function (newData) {
						console.log('运动');
						console.log(newData);
						$scope.sports=newData;
					});
				};
				getSports($scope.searchParams);
				winWebHttpService.querywithParams("index/getSportFilter",$scope.searchParams).then(function (newData) {
					$scope.sportFilters=newData;
				});
				$scope.searchSport=function(field,param){
					$scope.searchParams[field]=param;
					getSports($scope.searchParams);
				};
				
				// 运动方案
				$scope.fnSportDetail = function(id){
					console.log('运动');
					console.log(id);
					for(var i=0; i<$scope.sports.length; i++){
						if(id == $scope.sports[i].sid){
							$scope.sportDetail = $scope.sports[i];
							break;
						}
					}
					$('#sportDeatil').modal();	
				};
				
				// 设置运动(暂时不做，隐藏)
				$scope.fnSetSport = function(id){
					$('#setSport').modal();	
				};
				
				// 运动签到弹出框
				$scope.fnSignSport = function(data){
					console.log(data);
					$scope.time = '';
					$scope.alertContent = '';
					$scope.sportDetail = data;
					$('#signSport').modal();	
				};
				
				// 签到
				$scope.fnSaveAmount = function(){
					// 输入运动量 验证 保存到后台 然后拉数据
					console.log('运动量'+$scope.time + '运动id' + $scope.sportId + '单位时间消耗' + $scope.energyConsumption);
					
					// 有效性验证
					var reg = new RegExp("^[0-9]+?");				
					if(!reg.test($scope.time)){
						$scope.alertContent="请输入数字";
						return;
					}
					
					console.log($scope.sportDetail );
					$scope.sportDetail.signNumer = $scope.sportDetail.signNumer+1;
					console.log($scope.sportDetail );
					// 计算公式
					console.log('date:' +$filter('date')($scope.sportDate, 'yyyy-MM-dd'));
					console.log('运动计算结果：' +$scope.time * $scope.energyConsumption);
					var data = {};
					
					if($scope.sportDetail.sid){// 运动  消耗能量=met*3.5*min*kg/200
						data = {
								itemId : $scope.sportDetail.sid,
								itemTime :$scope.sportDetail.signVo == null ? $scope.time : parseInt($scope.sportDetail.signVo.itemTime) + parseInt($scope.time), // 之前的基础上添加
								signDate: $filter('date')($scope.sportDate, 'yyyy-MM-dd'),
								itemType: 0,
								itemEnergy :$scope.sportDetail.signVo == null ? parseInt($scope.sportDetail.energyConsumption) * parseInt($scope.time) : $scope.sportDetail.signVo.itemEnergy + parseInt($scope.sportDetail.energyConsumption) * parseInt($scope.time), // 需要计算
								itemEnergyRice : $scope.sportDetail.signVo == null ? parseInt($scope.sportDetail.energyConsumption) * parseInt($scope.time)/116 *100 : ($scope.sportDetail.signVo.itemEnergyRice + parseInt($scope.sportDetail.energyConsumption) * parseInt($scope.time)) /116 *100
							};
					}else{ // 行为
						data = {
								itemId : $scope.sportDetail.itemid,
								itemTime:$scope.sportDetail.itemTime == null ? $scope.time : parseInt($scope.sportDetail.itemTime) + parseInt($scope.time),
								signDate: $filter('date')($scope.sportDate, 'yyyy-MM-dd'),
								itemType: 1,
								itemEnergy : $scope.sportDetail.itemEnergy == null ? parseFloat($scope.sportDetail.power)*parseInt($scope.time) : parseFloat($scope.sportDetail.power)*parseInt($scope.time) + parseFloat($scope.sportDetail.itemEnergy),
								itemEnergyRice : $scope.sportDetail.itemEnergy == null ? parseFloat($scope.sportDetail.power)*parseInt($scope.time)/116 *100 : (parseFloat($scope.sportDetail.power)*parseInt($scope.time) + parseFloat($scope.sportDetail.itemEnergyRice))/116 *100
							};
					}
					
					winWebHttpService.querywithParams("basBehavior/saveBehaviorSign",null,data).then(function (newData) {
						console.log('运动量');
						console.log(newData);
						$scope.consumes = newData;
						$('#signSport').modal('hide');
						
						loadData();
						getSports($scope.searchParams);
						$scope.getBasBehavior($filter('date')($scope.sportDate, 'yyyy-MM-dd'));
					});
					
					
				};
				
				// 保存减肥体重
				$scope.fnSaveLostWeight = function(){
					// 验证减肥体重的输入
					console.log('减肥体重: ' + $scope.consumes.loseWeightTarget);
					var reg = new RegExp("^[0-9]+?");				
					if(!reg.test($scope.consumes.loseWeightTarget)){
						$scope.$parent.alertOption={content:"请输入数字",show:true};
						return;
					}
					winWebHttpService.querywithParams("basBehavior/saveLostWeight",null,$scope.consumes).then(function(newData) {
						$scope.alertOption={content:"数据更新成功",show:true};
					},function(){
						$scope.alertOption={content:"数据更新失败",show:true};
					});
				};
				
				
				
				// 行为
				$scope.selectedItems={};
				$scope.allItems={};
				$scope.behaviorConsume={};
				$scope.total=0;
				$scope.hzBcDate=dateFormat(new Date(),"yyyy-MM-dd");
				$scope.firstSportItem;
							
				$scope.getBasBehavior=function(bcDate){				
					winWebHttpService.querywithParams('basBehavior/getBasBehavior',{hzBcDate:bcDate}).then(function(data) {		
						console.log('行为');
						console.log(data);
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

				
				
				
				
				
				
			} 
	]);
	
});