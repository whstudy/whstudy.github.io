define(['angular'],function (angular) {

'use strict';

   angular.module('winWeb.directives.profile', [])
	.directive(
		'winWebProfileFreeSlide', function() {
			return function(scope, element, attrs) {
				//$(element).freeSlide();
			};
		}).directive(
				'winWebProfileCity', function() {
					return function(scope, element, attrs) {
						//$(element).freeSlide();
					};
		})
		.directive('winWebProfileDisease', function() {
					return function(scope, element, attrs) {
						 scope.$watch('noDiseases', function (newValue, oldValue) {
				               if(newValue){
				            	   $('#disease').hide(500);
				               }else{
				            	   $('#disease').show(500);
				               }
				            }, true);

					};
		}).directive('winWebProfileFamilyDisease', function() {
			return function(scope, element, attrs) {
				 scope.$watch('noFamilyDiseases', function (newValue, oldValue) {
		               if(newValue){
		            	   $('#familyDiseases').hide(500);
		               }else{
		            	   $('#familyDiseases').show(500);
		               }
		            }, true);

			};
		}).directive('winWebProfileBmi', function() {
			return function(scope, element, attrs) {
				scope.$watch('profile', function (newValue, oldValue) {
					if(scope.profile){
						if(scope.profile.tall == null){
							scope.bmi = '';
						}else{
							scope.bmi = (scope.profile.weight /(scope.profile.tall*scope.profile.tall/10000)).toFixed(2);
							scope.bmi = scope.bmi != 'Infinity' ? scope.bmi :'';
						}
						if(scope.bmi == ''){
							scope.figture = '';
						}else if(scope.bmi <18.5){
							scope.figture = '偏瘦';
						}else if(scope.bmi>18.5 && scope.bmi<23.9){
							scope.figture = '正常';
						}else if(scope.bmi>24 && scope.bmi<27.9){
							scope.figture = '肥胖';
						}else{
							scope.figture = '超肥胖';
						}
					}
	            }, true);

			};
		});
});