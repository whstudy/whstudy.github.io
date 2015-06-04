define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.directives.meals', [])
.directive('winWebMealDesk',function() {
		return {
			scope : {
				mealList : '=info',
				mealTime :'@time'
			},
			templateUrl: 'meal.html',
			link : function(scope, element, attrs) {
				scope.delteMeal = function(index,mealTime){
					scope.$parent.mealList[mealTime].splice(index,1);
					if(mealTime == scope.$parent.mealTime){
						scope.$parent.changeMealTime(mealTime);
					}
				};
			}
		};
  }) .directive('winWebMealPanel', function() {
	return function(scope, element, attrs) {
		$(element).click(function() {
			$('#meals-desk').fadeToggle();
		});
	};
}).directive('winWebMealClosePanel', function() {
	return function(scope, element, attrs) {
		element.on('click', function() {
			$(this).parent().fadeOut();
		});
	};
})
.directive('winWebMealFilter', function() {
	return function(scope, element, attrs) {
		    element.on('click','li>a',function(){
	            var $this=$(this);
	            $this.parent().addClass('active-danger').siblings().removeClass('active-danger');
	            return false;
        });
	};
})
.directive('winWebMealAnalysis',['$timeout','winWebHttpService', function($timeout,winWebHttpService) {
	return function(scope, element, attrs) {

		function startEval(charDatas) {
			$('#chart-polygon').each(function() {
				var chart = echarts.init(this);
				chart.setOption({
					tooltip : {
						trigger : 'axis'
					},

					legend : {
						orient : 'vertical',
						x : 'right',
						y : 'bottom',
						textStyle : {
							color : '#f0f0f0'
						},
						data : ['标准值', '实际值']
					},
					polar : [{
						name : {
							textStyle : {
								color : '#f0f0f0'
							}
						},
						indicator : [{
							text : '能量',
							max : 4000
						}, {
							text : '蛋白质',
							max : 2000
						}, {
							text : '脂肪',
							max : 2000
						}, {
							text : '碳水化合物',
							max : 2000
						}]
					}],
					series : [{

						type : 'radar',
						data : charDatas.ns
					}]
				});
			});

			(function() {
				var chart1 = echarts.init($('#chart-power1')[0]);
				chart1.setOption({

					title : {
						text : '标准值',
						textStyle : {
							color : '#f0f0f0'
						},
						x : 'center'
					},
					tooltip : {
						trigger : 'item'
					},
					series : [{
						type : 'pie',
						radius : '60%',
						center : ['50%', '50%'],
						data :charDatas.powerSourceRateNorm
					}]
				});
				var chart2 = echarts.init($('#chart-power2')[0]);
				chart2.setOption({

					title : {
						text : '实际值',
						textStyle : {
							color : '#f0f0f0'
						},
						x : 'center'
					},
					tooltip : {
						trigger : 'item'
					},
					series : [{
						type : 'pie',
						radius : '60%',
						center : ['50%', '50%'],
						data :charDatas.powerSourceRate
					}]
				});

			})();
			(function() {
				var chart1 = echarts.init($('#chart-meals1')[0]);
				chart1.setOption({

					title : {
						text : '标准值',
						textStyle : {
							color : '#f0f0f0'
						},
						x : 'center'
					},
					tooltip : {
						trigger : 'item'
					},
					series : [{
						type : 'pie',
						radius : ['40%', '60%'],
						center : ['50%', '50%'],
						data : charDatas.threePowerRateNorm
					}]
				});
				var chart2 = echarts.init($('#chart-meals2')[0]);
				chart2.setOption({

					title : {
						text : '实际值',
						textStyle : {
							color : '#f0f0f0'
						},
						x : 'center'
					},
					tooltip : {
						trigger : 'item'
					},
					series : [{
						type : 'pie',
						radius : ['40%', '60%'],
						center : ['50%', '50%'],
						data : charDatas.threePowerRate
					}]
				});

			})();

		}


		element.on('click', function() {
			
			console.log(scope.mealList);
			var foods=angular.copy(scope.mealList);
			for (var i = 0; i < foods.breakfast.length; i++) {
				var breakfast=foods.breakfast[i];
				breakfast.value=parseInt(breakfast.value) * parseInt(breakfast.weight);
				//delete breakfast.img;
				delete breakfast.weight;
				delete breakfast.cart;
			}
			for (var i = 0; i < foods.lunch.length; i++) {
				var lunch=foods.lunch[i];
				lunch.value=parseInt(lunch.value) * parseInt(lunch.weight);
				//delete lunch.img;
				delete lunch.weight;
				delete lunch.cart;
			}
			for (var i = 0; i < foods.supper.length; i++) {
				var supper=foods.supper[i];
				supper.value=parseInt(supper.value) * parseInt(supper.weight);
				//delete supper.img;
				delete supper.weight;
				delete supper.cart;
			}
			
			//console.log({breakfastFoods:foods.breakfast,lunchFoods:foods.lunch,supperFoods:foods.supper});
			winWebHttpService.querywithParams('index/mealEval',null,{breakfastFoods:foods.breakfast,lunchFoods:foods.lunch,supperFoods:foods.supper}).then(function(data) {
				//console.log(data);
				scope.foodOk=data.fcOk;
				scope.foodNo=data.fcNotComp;
				var charDatas=data;
				$('#meals-eval').fadeIn();
				startEval(charDatas);
				
				scope.bmi=data.bmi;
				scope.trophicIdx=data.trophicIdx;
				
				scope.bmipercent=(data.bmi.bmi/35)*100;
				if (scope.bmi.bmi<18.5) scope.bmititlebg="warning";
				if (scope.bmi.bmi>=18.5 && scope.bmi.bmi<=23.9) scope.bmititlebg="success";
				if (scope.bmi.bmi>23.9 && scope.bmi.bmi<=27.9) scope.bmititlebg="warning";
				if (scope.bmi.bmi>27.9) scope.bmititlebg="danger";
				
				//console.log(scope.bmipercent);
				$timeout(function() {
					$('.tooltips-show').tooltip({
						trigger : 'manual'
					}).tooltip('show');
				}, 0);
			});
			
			return false;
			 
		});
	};
}]);
});