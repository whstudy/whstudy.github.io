define(['angular'],function(){
	
	'use strict';
	
	var doctorModule = angular.module('winWeb.controllers.doctor',[]);
	
	doctorModule.controller('DoctorCtrl',['$scope','winWebHttpService',function($scope,winWebHttpService){
	
		winWebHttpService.querywithParams('ajax/monitors.json').then(function(data) {	
			console.log(data);
			$scope.monitors = data;	
		});
		
		$scope.selectChart = function(id){	
			for(var i=0;i<$scope.monitors.length;i++){
				if($scope.monitors[i].monitorId == id){
					$scope.monitor = $scope.monitors[i];
					$scope.feedback = $scope.monitors[i].feedback;
					console.log($scope.chartData);
					break;
				}
			}
		};
		
		// 保存评估
		$scope.saveEvalute = function(){
			$scope.monitor.feedback =$scope.feedback;
		};
		
		
		// 图标
		$scope.selectChart1 = function(id){
			for(var i=0;i<$scope.monitors.length;i++){
				if($scope.monitors[i].monitorId == id){
					$scope.monitor = $scope.monitors[i];
					$scope.monitorType = $scope.monitors[i].monitorType;
					console.log($scope.chartData);
					break;
				}
			}
			winWebHttpService.querywithParams('ajax/monitors.json').then(function(data) {	

				var chart = echarts.init($('#monitor-stat')[0]);
				
				var days=[];
		        var d=null;
		        var date=new Date();
		        for(var t=-30;t<=0;t++){
		            d=new Date(date.getTime()+t*86400000);
		            days.push((d.getMonth()+1)+'月'+d.getDate()+'日');
		        }
		        
		        var lastDay=days.pop();
		        
		        var options = {
		            "高血压": {
		                title: {
		                    text: '',
		                    x:'center',
		                
		                },
		                tooltip: {
		                    trigger: 'axis'
		                },
		                legend: {
		                    data: ["舒张压", "收缩压"]
		                },
		                xAxis: [
		                    {
		                        type: 'category',
		                        boundaryGap: false,
		                        data: days
		                    }
		                ],

		                yAxis: [
		                    {
		                        type: 'value',
		                        axisLabel: {
		                            formatter: '{value} mmHg'
		                        },
		                        splitArea: {
		                            show: true
		                        }
		                    }
		                ],
		                series: [
		                    
		                    {
		                        name: '收缩压',
		                        type: 'line',
		                        itemStyle: {
		                            normal: {
		                                lineStyle: {
		                                    shadowColor: 'rgba(0,0,0,0.4)'
		                                }
		                            }
		                        },
		                        showAllSymbol:true,
		                        sections:{
		                            min:0,
		                            max:200,
		                            name:['偏低','正常','偏高'],
		                            value:[90,130,200],
		                            type:['danger','success','danger'],
		                            h2:['指数偏低。。。','恭喜！完全正常','偏高了。'],
		                            p:['偏低应该怎么做。。。','继续保持','偏高应该怎么做。。。。']
		                        },
		                        data: function () {
		                            var list = [];
		                            for (var i = 1; i <= days.length; i++) {
		                                list.push(Math.round(Math.random() * 50 + 90));
		                            }
		                            return list;
		                        }()
		                    },
		                    {
		                        name: '舒张压',
		                        type: 'line',
		                        itemStyle: {
		                            normal: {
		                                lineStyle: {
		                                    shadowColor: 'rgba(0,0,0,0.4)'
		                                }
		                            }
		                        },
		                        showAllSymbol:true,
		                        sections:{
		                            min:0,
		                            max:160,
		                            name:['偏低','正常','偏高'],
		                            value:[60,90,160],
		                            type:['danger','success','danger'],
		                            h2:['指数偏低。。。','恭喜！完全正常','偏高了。'],
		                            p:['偏低应该怎么做。。。','继续保持','偏高应该怎么做。。。。']
		                        },

		                        data: function () {
		                            var list = [];
		                            for (var i = 1; i <= days.length; i++) {
		                                list.push(Math.round(Math.random() * 30 + 60));
		                            }
		                            return list;
		                        }()
		                    }
		                    

		                ]
		            },
		            "体重": {
		                title: {
		                    text: '',
		                    x:'center',
		                },
		                tooltip: {
		                    trigger: 'axis'
		                },
		                legend: {
		                    data: ["体重"]
		                },
		                
		                xAxis: [
		                    {
		                        type: 'category',
		                        boundaryGap: false,
		                        data: days
		                    }
		                ],

		                yAxis: [
		                    {
		                        type: 'value',
		                        axisLabel: {
		                            formatter: '{value} kg'
		                        },
		                        splitArea: {show: true}
		                    }
		                ],
		                series: [
		                    {
		                        name: '体重',
		                        type: 'line',
		                        itemStyle: {
		                            normal: {
		                                lineStyle: {
		                                    shadowColor: 'rgba(0,0,0,0.4)'
		                                }
		                            }
		                        },
		                        showAllSymbol:true,
		                        sections:{
		                            min:0,
		                            max:200,
		                            name:['偏瘦','正常','偏胖','超重'],
		                            value:[50,70,80,200],
		                            type:['warning','success','warning','danger'],
		                            h2:['哎呀！您有点偏瘦了。','恭喜！您的体重完全正常','哎呀。您好像有点偏胖了。','。。您还是赶紧减肥吧！'],
		                            p:['多吃肉！！！！','继续保持','多吃蔬菜少吃肉吧。','少吃、多运动。']
		                            
		                        },
		                        data: function () {
		                            var list = [];
		                            for (var i = 1; i <= days.length; i++) {
		                                list.push(Math.round(Math.random() * 3+80-i*1.5));
		                                
		                            }
		                            return list;
		                        }()
		                    }
		                ]
		            }
		        };

				chart.setOption(options[$scope.monitorType]);
			});
		};
		
	
	}]);
	
	
});