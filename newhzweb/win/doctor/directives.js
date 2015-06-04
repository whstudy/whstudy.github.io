define(['angular'],function(){
	
	'use strict';
	
	var doctorModule = angular.module('winWeb.directives.doctor',[]);
	
	
	doctorModule.directive('bDatepicker', function () {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, element, attr,ngModelCtrl) {
				element.on('click', function () {
	                element.datepicker({format: 'yyyy-mm-dd'})
	                		.on('changeDate', function(e) {
			                       ngModelCtrl.$setViewValue(e.date);
			                       scope.$apply();	
			                       element.datepicker("hide");
			                })
			                .trigger('focus');
                });
            }
        };       
	})
	

});