define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.directives.search1', [])
.directive('winWebSearchhOneAnswer', function() {
	return {
		replace:true,
		templateUrl : 'oneAnswer1.html',
		link : function(scope, element, attrs) {

		}
	};
}).directive('winWebSearchhMultiAnswer',['winWebHttpService', function(winWebHttpService) {
	return {
		replace:true,
		templateUrl : 'multiAnswer1.html',
		link : function(scope, element, attrs) {
			var word=scope.word;
			scope.currentPage = 1;
			scope.itemsPerPage = 3;
			scope.pageChanged = function() {
				var ids=[];
				for (var i=0;i<scope.diseases.length;i++) {
					if (scope.diseases[i].checked) {
						ids.push(scope.diseases[i].value);
					}
				}
				winWebHttpService.querywithParams('index/findSuitAnswers',{word:word,diseases:ids,page:scope.currentPage}).then(function(newData) {
					 
					scope.data.answers=newData.answers;
					scope.resultCounts=newData.count;
				});
			 };
			
		}
	};
}]).directive('winWebSearchhUserdialog', function() {
	return {
		 replace:true,
		templateUrl : 'userdialog1.html',
		link : function(scope, element, attrs) {
		}
	};
}).directive('winWebSlide', function() {
	return {
		link : function(scope, element, attrs) {
			element.on('click',function(){
				$('#search1-chronic').slideToggle();
			});
		}
	};
});

});