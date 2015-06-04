define(['angular'],function (angular) {
'use strict';

var plan_createControllers = angular.module('winWeb.controllers.plan_create', []);

plan_createControllers.controller('PlanCreateCtrl', [ '$scope','winWebHttpService','$routeParams',
    function ($scope, winWebHttpService,$routeParams) {
	
	$scope.dateformat = function (date,formatStr) {  
		if (date == undefined) return;
		//var date = this;
		if (typeof(date)=='string'){
			return date;
		}
		/*  
		函数：填充0字符  
		参数：value-需要填充的字符串, length-总长度  
		返回：填充后的字符串  
		*/ 
		var zeroize = function (value, length) {  
			if (!length) {  
				length = 2;  
			}  
			value = new String(value);  
			for (var i = 0, zeros = ''; i < (length - value.length); i++) {  
				zeros += '0';  
			}  
				return zeros + value;  
		};  
		return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function($0) {  
			switch ($0) {  
				case 'd': return date.getDate();  
				case 'dd': return zeroize(date.getDate());  
				case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];  
				case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];  
				case 'M': return date.getMonth() + 1;  
				case 'MM': return zeroize(date.getMonth() + 1);  
				case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];  
				case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];  
				case 'yy': return new String(date.getFullYear()).substr(2);  
				case 'yyyy': return date.getFullYear();  
				case 'h': return date.getHours() % 12 || 12;  
				case 'hh': return zeroize(date.getHours() % 12 || 12);  
				case 'H': return date.getHours();  
				case 'HH': return zeroize(date.getHours());  
				case 'm': return date.getMinutes();  
				case 'mm': return zeroize(date.getMinutes());  
				case 's': return date.getSeconds();  
				case 'ss': return zeroize(date.getSeconds());  
				case 'l': return date.getMilliseconds();  
				case 'll': return zeroize(date.getMilliseconds());  
				case 'tt': return date.getHours() < 12 ? 'am' : 'pm';  
				case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';  
			}  
		});  
	};
		$scope.nowDate = function(){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			if(month<10){
                month = '0' + month;
            }
            if(day<10){
                day = '0' + day;
            };
			return year +'-'+month+'-'+day;
		};

        $scope.plans = {};
        $scope.allPlanSportsItem = {};
        $scope.allCanSelPlanSports = {};
        $scope.planSports={};
        $scope.showPlan = false;
        $scope.modifyFlag = false;
        $scope.tabidx = 0;
        //$scope.onePlan = {};
        $scope.itemColors = ["success","warning","primary","danger"];
        $scope.week={};
        $scope.showItem = false;
        $scope.newPlan={
            "planid":0,
            "title":"New Plan。",
            "items":[""],
            "time":[],
            "timeDis":[],
            "remind":"0",
            "detail":[]
        };
        $scope.newItem={
            "sid":0,
            "freq":["0", "0", "0", "0", "0", "0", "0"],
            "sportid":0,
            "name":"",
            "pic":"",
            "iscycle":"0",
            "time":10
        };

		winWebHttpService.querywithParams('sportplan/getPlanSports').then(function(data) {
		//winWebHttpService.querywithParams('ajax/plan-sports.json').then(function(data) {
				for ( var i = 0; i < data.length; i++) {
				    var singleItem = data[i];
				    $scope.planSports[singleItem.typeid]=singleItem;
				    for ( var j = 0; j < singleItem.data.length; j++) {
				        if (singleItem.data[j]) {
				            $scope.allPlanSportsItem[singleItem.data[j].itemid]=singleItem.data[j];
				        }
				        // 新建运动项目不为空
				        if($routeParams.id !== undefined){
				        	if(singleItem.data[j].itemid === $routeParams.id){
				        		$scope.oneItem = angular.copy($scope.newItem);
				                $scope.oneItem.sportid = $routeParams.id;
				                $scope.oneItem.pic = singleItem.data[j].pic;
				           	 	$scope.oneItem.name = singleItem.data[j].name;
				           	 	$scope.showItem = true;
				            }
				        }
				    }
				}
		});
        
        winWebHttpService.querywithParams('sportplan/getSportPlans').then(function(data) {
        //winWebHttpService.querywithParams('ajax/sport-plans.json').then(function(data) {
            for ( var i = 0; i < data.length; i++) {
                 $scope.plans[data[i].planid]=data[i];
                 if($routeParams.id !== undefined){
                	 if(data[i].timeDis[1] > $scope.nowDate() ){
                    	 $scope.onePlan = data[i];
                    	 checkAddItem();
                     }
                 }   
            }
            
            if(!$scope.onePlan){
               	 $scope.onePlan = angular.copy($scope.newPlan);
               	 checkAddItem();
            }   
            
            var sWeek = "日 一 二 三 四 五 六".split(' ');
            for( var k in sWeek){
                $scope.week[k]='星期'+sWeek[k];
            }
            //console.log($scope.week);
            //console.log($scope.plans[1].detail[0].freq);
            //console.log($scope.plans);
        });

        function checkAddItem(){
	       	 var containFlag = true;
	       	 for(var j=0; j<$scope.onePlan.detail.length; j++){
	       		 if($routeParams.id == $scope.onePlan.detail[j].sportid){
	       			 containFlag = false;
	       		 }
	       	 }
	       	 if(containFlag){
	       		 $scope.onePlan.detail.push($scope.oneItem); 
	       	 }else{
	       		$scope.oneItem = $scope.onePlan.detail[0];
	       	 }
        }
        

        $scope.updateSportPlan = function (id){
            console.log("修改:" + id);
            $scope.onePlan = angular.copy($scope.plans[id]);
            $scope.tabidx = 0;

            if($scope.onePlan.detail.length > 0){
                $scope.oneItem = $scope.onePlan.detail[$scope.tabidx];
                $scope.showItem = true;
            }
            //console.log($scope.showItem);
            
            //console.log($scope.oneItem );
            $scope.modifyFlag = true;
            
            if($routeParams.id == undefined){
            	if (!$scope.showPlan) $scope.showPlan=true;
            }
            //console.log($scope.onePlan);

            //winWebHttpService.querywithParams('sportplan/updatePlan',{'plan':$scope.onePlan});
        };

        $scope.delSportPlan = function (id){
            console.log("删除:" + id);
            console.log($scope.plans);            
            
            winWebHttpService.querywithParams('sportplan/delSportPlan',{id:id}).then(function(newData){
            	var msg = newData.errMsg;            		
        		$scope.alertOption={content:msg,show:true};
        		
            	delete $scope.plans[id];
	            console.log($scope.plans);
	            if($scope.onePlan!=undefined && $scope.onePlan.planid === id){
	                //console.log('check');
	                $scope.onePlan = {};
	                $scope.oneItem = {};
	                $scope.showPlan = false;
	                $scope.modifyFlag = false;
	            }				
			}, function() {
				$scope.alertOption={content:"删除运动计划失败",show:true};
			}); 

        };

        // remove sport item
        $scope.removeSportItem = function (index){
            console.log("delete sport item:" + index);
            $scope.onePlan.detail.splice(index,1);
            console.log($scope.onePlan.detail);
            if($scope.onePlan.detail.length > 0){
                $scope.oneItem = $scope.onePlan.detail[0];
            }else{
                $scope.showItem = false;
            }
        };

        $scope.showSportItems=function (){
            //$scope.planSports
            $scope.allCanSelPlanSports = angular.copy($scope.planSports);

            for ( var i = 0; i < $scope.onePlan.detail.length; i++) {
                var sportid = $scope.onePlan.detail[i].sportid;
                for(var planSport in $scope.allCanSelPlanSports) {
                    var onePlanSport = $scope.allCanSelPlanSports[planSport];
                    for ( var j=0 ;j< onePlanSport.data.length ; j++) {
                        var planSportItem = onePlanSport.data[j];
                        if ( planSportItem.itemid == sportid) {
                            onePlanSport.data.splice(j,1);
                        }
                    }
                }
            }
            //console.log($scope.allCanSelPlanSports);

        };

        $scope.addItem = function (id){
            //console.log(id);
            var singleItem = $scope.allPlanSportsItem[id];

            var newItem = angular.copy($scope.newItem);

            newItem.sportid = singleItem.itemid;
            newItem.name = singleItem.name;
            newItem.pic = singleItem.pic;
            //console.log(newItem);
            $scope.tabidx = $scope.onePlan.detail.length;
            $scope.onePlan.detail.push(newItem);

            $scope.oneItem = $scope.onePlan.detail[$scope.onePlan.detail.length-1];
            $scope.showItem = true;
            //console.log($scope.onePlan.detail);
        };

        $scope.btnShow = function (){
            $scope.onePlan = angular.copy($scope.newPlan);

            if($scope.modifyFlag){
                $scope.modifyFlag = false;
            }else{
                $scope.showPlan = !$scope.showPlan;
            }
            
            $scope.showItem = false;
        };
        //for debug start
        $scope.freqChange= function(v) {
            console.log("freq_change:" + v);
            console.log($scope.onePlan.detail[0].freq);
        };
        $scope.dateChange= function() {
            console.log("dateChange:" );
            console.log($scope.onePlan.timeDis);
        };
        //for debug end

        // $scope.valueChange= function(idex,vtime) {
        //     //console.log($scope.onePlan.detail[idex].time);
        //     $scope.onePlan.detail[idex].time= vtime;
        //     console.log($scope.onePlan.detail[idex].time);
        // };
        // $scope.iscycleChange= function(idx,stat) {
        //     console.log("iscycle Change:");
        //     console.log($scope.onePlan.detail[idx].iscycle);
        //     $scope.onePlan.detail[idx].iscycle=stat;
        //     console.log($scope.onePlan.detail[idx].iscycle);
        // };
        // $scope.remindChange= function(stat) {
        //     console.log("remindChange Change:");
        //     console.log($scope.onePlan.remind);
        //     $scope.onePlan.remind = stat;
        //     console.log($scope.onePlan.remind);
        // };


        $scope.showSportItem = function(index){
            //console.log(index);
            $scope.oneItem = $scope.onePlan.detail[index];
            //console.log($scope.oneItem);
        };

        $scope.saveSportPlan = function(){
            console.log('save sport plan');
            console.log($scope.onePlan);
            // time format
            for(var i=0; i<2; i++){
                //console.log($scope.onePlan.timeDis[i]);
                var date1 = new Date($scope.onePlan.timeDis[i]);
                var year = date1.getFullYear();
                var month = date1.getMonth()+1;
                var day = date1.getDate();
                $scope.onePlan.time[i] = year +'年'+month+'月'+day+'日';
                
                if(month<10){
                    month = '0' + month;
                }
                if(day<10){
                    day = '0' + day;
                };
                
                $scope.onePlan.timeDis[i] = year +'-'+month+'-'+day;
                //console.log('after format ' +$scope.onePlan.timeDis[i]); 
            }
            // sport item
            $scope.onePlan.items = [];
            for(var i=0; i<$scope.onePlan.detail.length; i++){
                $scope.onePlan.items.push($scope.onePlan.detail[i].name);
            }

            
            if ($scope.onePlan.planid === 0) 
            	winWebHttpService.querywithParams('sportplan/saveSportPlan',null,$scope.onePlan).then(function(newData){		            
					var msg = newData.errMsg; 
					console.log(msg);
            		$scope.alertOption={content:msg,show:true};
					$scope.plans[$scope.onePlan.planid] = angular.copy($scope.onePlan);
					console.log($scope.onePlan);
				}, function() {
					$scope.alertOption={content:"增加运动计划失败",show:true};
				});
            else 
            	winWebHttpService.querywithParams('sportplan/updatePlan',null,$scope.onePlan).then(function(newData){
            		var msg = newData.errMsg;            		
            		$scope.alertOption={content:msg,show:true};
            		$scope.plans[$scope.onePlan.planid] = angular.copy($scope.onePlan);
		            //console.log($scope.onePlan);
            	}, function() {            		
            		$scope.alertOption={content:"更新运动计划失败",show:true};
            	});
        };
    } ]);

});