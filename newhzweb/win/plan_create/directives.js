define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.directives.plan_create', [])

.directive('winWebPlanShow', function() {
        return function(scope, element, attrs) {
            scope.$watch('showPlan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $("#panel-create").slideToggle();
                }
            });
        };
}).directive('winWebAddItemShow', function() {
        return function(scope, element, attrs) {
            $(element).on('click', function() {
                $("#modal-items").modal();
                return false;
            });
        };
}).directive('winWebPlasS',function($timeout) {
    return function(scope, element, attrs) {
    	scope.$watch('plans', function (newValue, oldValue) {
            console.log("aaaaaaaaaaaaaaaaaaaaaaa");
        }, true);
    };
}).directive('winWebSportItemHide',function($timeout) {
        return function(scope, element, attrs) {
            $(element).on('click', function() {
                $("#modal-items").modal('hide');
                return false;
            });

        };
}).directive('bDatepicker', function () {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, element, attr,ngModelCtrl) {
                element.datepicker({
                    dateFormat:'yyyy-mm-dd'
                }).on('changeDate', function(e) {
                        // var outputDate = new Date(e.date);
                        // var n = outputDate.getTime();
                        ngModelCtrl.$setViewValue(e.date);
                        scope.$apply();
                    });
                var component = element.siblings('[data-toggle="datepicker"]');
                if (component.length) {
                    component.on('click', function () {
                        element.trigger('focus');
                    });
                }
            }
        };       
}).directive('winWebSwitch',function() {
       return {
                scope:{
                    on: '='
                },
                link: function(scope, element, attrs) {
                           scope.switchClick = function(on){
                                console.log('before switch value: ' + scope.on);
                                scope.on = scope.on == '1'? '0' : '1';
                                console.log('after switch value: ' + scope.on);
                            };
                      },    
                templateUrl:'win/template/switch.html'
        };
});

});
