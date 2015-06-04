define(['angular'],function(){
	
	'use strict';
	
	var answerModule = angular.module('winWeb.controllers.answer',[])
	
	answerModule.controller('AnswerCtrl',['$scope','winWebHttpService',function($scope,winWebHttpService){
		console.log("aaaaaaaaaaaaaaaaaaaaaaa");
		
		// 从session中拿出数据
		var questions = sessionStorage.getItem("questions");
		//console.log(JSON.parse(questions));
		
		
		if(questions){
			$scope.questions = JSON.parse(questions);
			
		}else{
			winWebHttpService.querywithParams('ajax/medicalQuestions.json').then(function(data) {	
				console.log(data);
				$scope.questions = data;
			});
		}
		
		
		// 回复
		$scope.reply = function(id,index){
			console.log('id:'+id);
			
			for(var i=0; i<$scope.questions.length; i++){
				if($scope.questions[i].id === id){
					$scope.questions[i].answer = $scope.questions[i].answerTemp;
				}
			}
			$('#replay_'+index).hide();
			
			// 数据到后台
			
			
//			console.log(answerTemp);
//			console.log($scope.questions);
//			console.log($('#replay_'+e).find('.dxTextbox').html());
////			console.log(1111);
//			console.log(e);
//			console.log($(e).parents('.lableBar').find('textarea').html());
//			console.log($scope.answer);
			// answer   id  
			//$('#replay_'+e).hide();
			
		};
		
		
		
		
	}]);
	
});