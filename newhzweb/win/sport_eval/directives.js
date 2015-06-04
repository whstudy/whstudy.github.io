define(['angular'],function (angular) {

'use strict';

angular.module('winWeb.directives.sport_eval', [])
.directive('winWebSportEval1',
    function () {
        return function (scope, element, attrs) {

            scope.$watch('selectedItems', function (newValue, oldValue) {
                scope.initCalPower();
                countTo(scope.total);
            }, true);

            function countTo(num) {
                var $result = $('#eval-result');
                var $this = $('h1', $result);
                var step = 1;
                var current = parseInt($this.text());
                if (isNaN(current)) {
                    current = 0;
                }
                var opt = num >= current ? 1 : -1;
                var intv = setInterval(function () {
                    step = Math.max(1, parseInt(Math.abs(num - current) / 5));
                    $this.text(current += opt * step);
                    if ((opt > 0 && current >= num) || (opt < 0 && current <= num)) {
                        $this.text(num);
                        clearInterval(intv);
                    }
                }, 10);
            }
        };
    })
.directive('bDatepicker', function () {
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
						element.datepicker("hide");
						$('.datepicker').css('z-index',"0");
                    });
				element.on('click', function () {
                        element.trigger('focus');
                        $('.datepicker').css('z-index',"1000000000000");
                    });
            }
        };       
	});
});