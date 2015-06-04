define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.controllers.search', ['ngAnimate'])
.controller('SearchCtrl', ['$scope', 'winWebHttpService',
function($scope, winWebHttpService) {

	// watch change keyword
	$scope.$watch('word', function (newValue, oldValue) {
		if(newValue !== oldValue && $scope.focusFlag){
			if($scope.word !== ''){
	            console.log($scope.kind);
	            console.log($scope.word);
	            winWebHttpService.querywithParams('index/autoCompleteKeywords',{kind:$scope.kind,word:$scope.word},null,true).then(function(newData) {
	            	console.log(newData);
	            	$scope.keywords = newData;
	    		});
			}else{
				$scope.keywords = '';
			}
		}
    }, true); 
	
	$scope.selectKeyword = function(keyword){
		$scope.focusFlag = false;
		$scope.word = keyword;
		winWebHttpService.querywithParams('index/findAnswers',{kind:$scope.kind,word:$scope.word,page:1}).then(function(newData) {
			$scope.queryDatas.push({word:$scope.word,answers:newData.answers,single:newData.single});
			$scope.keywords = '';
		});
		
	};
	
	$scope.focusFlag = false;
	$scope.searchFocus = function(){
		console.log('focus');
		$scope.focusFlag = true;
	};
	
	$scope.queryDatas=[];
	$scope.askForAnswer = function(kind,kindL,word) {
		$('#keyword').blur();
		$scope.focusFlag = false;
		winWebHttpService.querywithParams('index/findAnswers',{kind:kind,kindL:kindL,word:word,page:1}).then(function(newData) {
			//$scope.single=newData.single;
			$scope.queryDatas.push({word:word,answers:newData.answers,single:newData.single});
			//console.log($scope.queryDatas);
			$scope.keywords = '';
			$scope.noResultFlag = newData.answers.length  === 0 ? true:false;
			$scope.resultCounts = newData.count;
		});
		

	};
	$scope.kind="高血压";
	$scope.changeKind = function(kind) {
		$scope.kind=kind;
	};
	$scope.kindL="所有";
	$scope.changeKindL = function(kind) {
		$scope.kindL=kind;
	};
	$scope.predicate = '$$hashKey';
	$scope.reverse = true;
	
	$scope.getOneAnswer = function(answer) {
		$scope.word=answer.title;
		$scope.queryDatas.push({word:$scope.word,answers:[answer],single:true});
		//$scope.queryDatas.push({word:$scope.kind+$scope.word,answers:[answer],single:true});
		//console.log($scope.queryDatas);
	};
	$scope.submitAnswer=function(id,type){
		if(!type)return;
		winWebHttpService.querywithParams('index/submitAnswer',null,{id:id,type:type}).then(function(newData) {
			$scope.alertOption={content:"您提交的反馈我们已经收到，谢谢",show:true};
		},function(newData) {
			$scope.alertOption={content:"系统正忙请稍候再试",show:true};
		});
		
	};
	
}]).animation('.repeated-item', function() {
  return {
    enter : function(element, done) {
	 jQuery(element).hide().slideDown(500);
    } 
  };
}).animation('.winWebViewChange111', function() {
	  return {
		  leave : function(element, done) {
			 //jQuery(element).hide().slideDown(500);
			 jQuery(element).animate({width:'toggle'},450);
		    } 
		  };
 })
.animation('.winwebshow-item', function() {
  return {
      addClass: function(element, className, done) {
      if (className == 'ng-hide') {
        jQuery(element).show(400, done);
      } else {
        done();
      }
    },
     removeClass : function(element, className, done) {
      if(className == 'ng-hide') {

        /* remove it early so you can animate on it since
           it is not possible using element.css() to set
           a style using !important */
        jQuery(element).hide();
        element.removeClass('ng-hide'); 
        jQuery(element).show(400, done);
      }
      else {
        done();
      }
    }
  };
});
});
