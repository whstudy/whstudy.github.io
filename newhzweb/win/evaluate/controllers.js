define(['angular'],function (angular) {
'use strict';

var evaluateControllers = angular.module('winWeb.controllers.evaluate', []);

evaluateControllers.controller('EvaluateCtrl', [ '$scope', 'winWebHttpService','$http',
		function($scope, winWebHttpService, $http) {
			winWebHttpService.querywithParams('index/getRiskEvalResults').then(function(data) {
				$scope.hasResult = data.length > 0? true:false;
				$scope.evalHis = data.reverse().slice(0,5);// only show five results
			});	
			winWebHttpService.querywithParams('index/getRiskEvalateTopics').then(function(data) {	
				$scope.evalItems=data; 					
			});
		}
]);

var evaluateViewControllers = angular.module('winWeb.controllers.evaluate_view', []);

evaluateViewControllers.controller('EvaluateViewCtrl', [ '$scope', 'winWebHttpService','$routeParams',
		function($scope, winWebHttpService, $routeParams) {	
			winWebHttpService.querywithParams('index/getRiskEvalateSubtopic',{id:$routeParams.id}).then(function(data) {
				$scope.rate = data.data.length;
				$scope.topic = data.title;
				$scope.topicId = data.id;
				$scope = $.extend($scope,data);				
				console.log($scope);
			});	
			winWebHttpService.querywithParams('index/getRiskEvalateTopics').then(function(data) {
				$scope.evalViewItems= data;				
				console.log($scope.evalViewItems);
			});		
	        
			// evil test method
			$scope.evalTest = function(data,index,event){
				if(event.target.type == 'radio'){
					for(var i=0;i<$scope.data.length;i++){
						if($scope.data[i].questionId == data.questionId){
							for(var j=0; j<$scope.data[i].data.length;j++){
								$scope.data[i].data[j].checked = false;
							}
							$scope.data[i].data[index].checked = true;
						}
					}
				}
			};	

			$scope.getResult = function(){
				var  result = [];
				$scope.checkedItems = '';
				for(var i=0; i<$scope.data.length; i++){
					var item = $scope.data[i];
					console.log(item);
					// raido && checkbox
					if(item.type == 'radio' || item.type == 'checkbox'){
						var itemData = "";	
						for(var j=0; j<item.data.length;j++){
							console.log(item.data[j].checked);
							if(item.data[j].checked){
								//itemData.push(item.data[j].value);
								//itemData.push(item.name + j);	
								if($scope.topic == "睡眠质量" || $scope.topic == "老年痴呆"){
									itemData = j;
								}else{
									itemData = itemData+item.name + j + ',';
								}
								
								if(item.name == 'A'){
									$scope.checkedItems += '<p>'+item.data[j].title+'</p>';
								}
							}
						}
						result.push({'topic':$scope.topic,'topicId':$scope.topicId ,'type':item.name,'data':itemData});
					}else{
						var itemData = [];	
						for(var j=0; j<item.data.length;j++){
							itemData.push(item.data[j].value);
						}
						result.push({'name':item.name,'data':itemData});
					}
				}
				//console.log($scope.topic );
				console.log(JSON.stringify(result));
				
				winWebHttpService.querywithParams('index/getRiskEvalateResult',null,result).then(function(data) {
					$scope.result = data;			
					console.log(data);
					
					$scope.color = 'success';
					if($.trim($scope.result.riskNumber) === '低风险'){
						$scope.color = 'success';
					}else if($.trim($scope.result.riskNumber) === '中等风险'){
						$scope.color = 'info';
					}else if($.trim($scope.result.riskNumber) === '较高风险'){
						$scope.color = 'warning';
					}else if($.trim($scope.result.riskNumber) === '高风险'){
						$scope.color = 'danger';
					}
					
					if($scope.topic == '睡眠质量'){
						$scope.sleepQuality = $scope.result.sleepData[0];
						$scope.sleepStartTime = $scope.result.sleepData[1];
						$scope.sleepTime = $scope.result.sleepData[2];
						$scope.sleepEfficiency = $scope.result.sleepData[3];
						$scope.sleepHard = $scope.result.sleepData[4];
						$scope.sleepMedicine = $scope.result.sleepData[5];
						$scope.rijian = $scope.result.sleepData[6];
					}

					// color
					$scope.scoreColor = 'bg-success';
					if($scope.result.score <= 20){
						$scope.scoreColor = 'bg-success';
					}else if($scope.result.score>21 &&$scope.result.score <=50){
						$scope.scoreColor = 'bg-warning';
					}else if($scope.result.score>51 && $scope.result.score <=70){
						$scope.scoreColor = 'bg-important';
					}else{
						$scope.scoreColor = 'bg-danger';
					}	
				});	
				
				// health guide 
				winWebHttpService.querywithParams('ajax/healthGuide.json').then(function(data) {
					for(var i=0; i<data.length; i++){
						if($scope.topic == data[i].topicName){
							$scope.healthGuide = data[i];
						}
					}  
				});

			};
				
		}
]);
});