define(['angular'],function (angular) {
	
	'use strict';

	var search1Controllers = angular.module('winWeb.controllers.search1', ['ngAnimate','ngCookies']);

	search1Controllers.controller('Search1Ctrl', [ '$scope','winWebHttpService','$cookies',
		function($scope,winWebHttpService,$cookies) {
		
			$scope.queryDatas=[];
			$scope.avatar = $cookies.imgUrl;
			$scope.diseases = [
								{
									"name": "高血压",
									"checked": false,
									"value": 11
								},
								{
									"name": "高血脂",
									"checked": false,
									"value": 12
								},
								{
									"name": "冠心病",
									"checked": false,
									"value": 13
								},
								{
									"name": "脂肪肝",
									"checked": false,
									"value": 6
								},
								{
									"name": "痛风",
									"checked": false,
									"value": 17
								},
								{
									"name": "肥胖",
									"checked": false,
									"value": 18
								},
								{
									"name": "糖尿病",
									"checked": false,
									"value": 19
								},
								{
									"name": "贫血",
									"checked": false,
									"value": 29
								},
								{
									"name": "骨质疏松",
									"checked": false,
									"value": 24
								}
							];

			$scope.askForAnswer = function() {
				
				if($('#keyword').val()==""){
					return;
				}
				
				$('#keyword').blur();
				$scope.focusFlag = false;
				//console.log($scope.word,$scope.diseases);
				var ids=[];
				for (var i=0;i<$scope.diseases.length;i++) {
					if ($scope.diseases[i].checked) {
						ids.push($scope.diseases[i].value);
					}
				}
				//console.log({word:$scope.word,ids:ids});
				var word=$scope.word;
				winWebHttpService.querywithParams('index/findSuitAnswers',{word:word,diseases:ids,page:1}).then(function(newData) {
					$scope.queryDatas.push({word:word,answers:newData.answers,single:newData.single});
					$scope.resultCounts=newData.count;
				});
				
		
			};
			
			$scope.predicate = '$$hashKey';
			$scope.reverse = true;
			
			$scope.getOneAnswer = function(answer) {
				//$scope.word=answer.title;
				$scope.queryDatas.push({word:$scope.word,answers:[answer],single:true});
				//console.log($scope.queryDatas);
			};
			
			// watch change keyword
			$scope.$watch('word', function (newValue, oldValue) {
				if(newValue !== oldValue && $scope.focusFlag){
					if($scope.word !== ''){
			            console.log($scope.word);
			            winWebHttpService.querywithParams('index/autoCompleteKeywords',{kind:'food',word:$scope.word},null,true).then(function(newData) {
			            	console.log(newData);
			            	$scope.keywords = newData;
			    		});
					}else{
						$scope.keywords = '';
					}
				}
		    }, false); 
			
			$scope.selectKeyword = function(keyword){
				$scope.focusFlag = false;
				$scope.word = keyword;
				var ids=[];
				for (var i=0;i<$scope.diseases.length;i++) {
					if ($scope.diseases[i].checked) {
						ids.push($scope.diseases[i].value);
					}
				}
				winWebHttpService.querywithParams('index/findSuitAnswers',{word:$scope.word,diseases:ids,page:1}).then(function(newData) {
					$scope.queryDatas.push({word:$scope.word,answers:newData.answers,single:newData.single});
					$scope.keywords = '';
					$scope.resultCounts=newData.count;
					
				});
			};
			
			$scope.focusFlag = false;
			$scope.searchFocus = function(){
				console.log('focus');
				$scope.focusFlag = true;
			};
			 
			
			
		} ]);

});