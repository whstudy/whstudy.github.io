define(['angular'],function (angular) {
	
	'use strict';

	var module = angular.module('winWeb.controllers.healthDiary', ['angularFileUpload','ngCookies']);
	
	module.controller('HealthDiaryCtrl', ['$scope','winWebHttpService','$rootScope','$cookies',function($scope,winWebHttpService,$rootScope,$cookies) {

		// 隐藏导航栏
		if($cookies.isMain == undefined || $cookies.isMain == 1){
			$('#main_menu li:gt(0)').show();
			$('.top-menu.pull-right').show();
			$('#healthManage').show();
		}else{
			$('#main_menu li:gt(0)').hide();
			$('.top-menu.pull-right').hide();
			$('#healthManage').hide();
		}
		
		$scope.charOption=[];
		
		var option = {
	            grid:{x:30,y:20,x2:20,y2:60},
	            title : {text: '',subtext: ''},
	            legend: { data:['健康指数','全国平均健康指数']},
	            tooltip : { trigger: 'axis'},
	            dataZoom:{ show:true,realtime:true,start:50},
	            xAxis : [{type : 'category',boundaryGap : false,data : "" }],
	            yAxis : [{ type : 'value',splitArea : {show : true}}],
	            series : [
	                 {
	                    name:'健康指数',
	                    type:'line',
	                    itemStyle: {
	                        normal: {
	                            lineStyle: {
	                                shadowColor : 'rgba(0,0,0,0.4)'
	                            }
	                        }
	                    },
	                    data:"",
	                    markLine : {
	                        data : [
	                             [
					                {name: '达标线', value: 60, xAxis:-1, yAxis:60},
					                {name: '达标线', xAxis: 1000, yAxis: 60}
					            ]
	                        ],
	                        itemStyle : {
	                            normal: {
	                                borderWidth:2,
	                                lineStyle: {
	                                    type: 'solid',
	                                    color:'#1DCC2A'
	                                }
	                            }
	                        }
	                    }
	                },
	                {
	                    name:'全国平均健康指数',
	                    type:'line',
	                    itemStyle: {
	                        normal: {
	                            lineStyle: {
	                                shadowColor : 'rgba(0,0,0,0.4)'
	                            }
	                        }
	                    },
	                    data:""
	                }
	                
	            ]
	        };

			
			// 获取数据
			getData('');
			function getData(userName){
				winWebHttpService.querywithParams('index/getBeIndex',{userName:userName}).then(function(data) {
	  				option.xAxis[0].data=data.date;
	  				option.series[0].data=data.value;
	  				option.series[1].data=data.averageValue;
	  				//var chart = echarts.init($('#healthDiaryChart')[0]);
	  				
	  				//chart.clear();
	  				$scope.charOption=option;
				});
			}
			
			$scope.fnSelectUserForHealthDiary = function(userName){
				$('.familyMenu img').tooltip('hide');
				console.log(userName);
				getData(userName);
			};
				 
		} ]);
});