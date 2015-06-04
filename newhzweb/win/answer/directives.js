define(['angular'],function (angular) {
	
	'use strict';

	angular.module('winWeb.directives.answer', [])
	.directive('winWebReplay',
		function() {
	        return {
				
				link : function(scope, element, attrs) {
					element.on('click',function(){
						
						$(this).parents('.aminQAlist').find('.lableBar').show();

						
					});
					
				}
			};
		});

});
