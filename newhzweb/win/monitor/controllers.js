define(['angular'],function (angular) {
'use strict';

var monitorControllers = angular.module('winWeb.controllers.monitor', ['ngCookies']);

monitorControllers.controller('MonitorCtrl', [ '$scope','winWebHttpService','$route','$window','$filter','$cookies',
		function($scope,winWebHttpService,$route,$window,$filter,$cookies) {
	
			var formatterFunc= function(params,ticket,callback) {
                var res = '当前记录 : <br/>时间：' + params[0][1];
                for (var i = 0, l = params.length; i < l; i++) {
                    res += '<br/>' + params[i][0] + ' : ' + params[i][2];
                }
                setTimeout(function(){
                    callback(ticket, res);
                    $scope.$apply(function(){
                   	 $scope.params=params;
                   });
                }, 0)
                return 'loading';
               
                
            };
			
		var monitorCharOptions = {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                grid:{
	                x:'0',                
	                y:'0',
	                x2:'100%',
	                y2:'100%',
	                width:'100%',
	                height:'100%'
	            },
                calculable: true,
                dataZoom: {
                    show: true,
                    realtime: true,
                    start: 0
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data:[]
                    }
                ],

                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} '
                        },
                        splitArea: {show: true}
                    }
                ],
                series: [],
                animation:true,
                addDataAnimation:true
            };
			
			 
			winWebHttpService.querywithParams('index/getMonitor').then(function(newData) {	
					 
					var options=[];
					var monitorDetails=newData.details;
					
					for(var i=0 ;i<monitorDetails.length;i++){
						
						var monitorDetail=monitorDetails[i];
						var option=angular.copy(monitorCharOptions);
						
						option.tooltip.formatter=formatterFunc;
						option.legend.data=monitorDetail.legend;
						option.xAxis[0].data=monitorDetail.xAxis;
						if(monitorDetail.xAxis.length<1){
							option.xAxis[0].data.push('0.0');
							option.xAxis[0].data.push('0.0');
						}
						if(monitorDetail.xAxis.length==1){
							option.xAxis[0].data.splice(0,0,'0.0');
						}
						var series=monitorDetail.series;
						if(series.length>0){
							for(var j = 0 ;j<series.length;j++){
								series[j].type="line";
	                            series[j].showAllSymbol=true;
								series[j].itemStyle={
				                    normal: {
				                        lineStyle: {
				                            shadowColor: 'rgba(0,0,0,0.4)'
				                        }
				                    }
				                };
				               // series[j].code=monitorDetail.code;
							}
							if(series[0].data.length === 1){
								for(var j = 0 ;j<monitorDetail.legend.length;j++){
									series[j].data.splice(0,0,0);
								}	 
							}
						}else{
							for(var j = 0 ;j<monitorDetail.legend.length;j++){
								series.push({
									type:"line",
									showAllSymbol:true,
									itemStyle:{
					                    normal: {
					                        lineStyle: {
					                            shadowColor: 'rgba(0,0,0,0.4)'
					                        }
					                    }
						             },
						             name:monitorDetail.legend[j],
						             data:[0.0,0.0]
								});
							}	 
						}
						
						// 腰臀比
						if(monitorDetail.name === '腰臀比'){
							option.legend.data = ['腰臀比'];
							var yaowei = series[0].data;
							var tunwei = series[1].data;
							var yaotunbi = [];
							if(monitorDetail.xAxis[monitorDetail.xAxis.length-1] == $filter('date')(new Date(), 'M.d')){
								$scope.yaowei = series[0].data[series[0].data.length-1];
								$scope.tunwei = series[1].data[series[0].data.length-1];
							}
							for(var j= 0; j<yaowei.length; j++){
								yaotunbi.push(tunwei[j] == 0 ? 0 : (yaowei[j] / tunwei[j] ).toFixed(2)); 
							}
							series[0].data = yaotunbi;
							series[0].name = '腰臀比';
							series = [series[0]];
						}else if(monitorDetail.name === '贫血' ){
							option.yAxis = [{ name:'血红蛋白',type : 'value'},{ name:'红细胞计数',type : 'value'}];
							monitorDetail.series[1].yAxisIndex = 1;
						}
						
						option.code=monitorDetail.code;
						option.series=series;
						options.push({
							name:monitorDetail.name,
							option:option
						});
						 
					}
					//console.log(options);
					//console.log(JSON.stringify(options));
					$scope.monitorCharOptions=options;
					
					var categorys= newData.categorys;
					var monitorsLeft=[]; 
					
					var nowTypes=[];
					for(var j in monitorDetails){
						nowTypes.push(monitorDetails[j].name);	
					}
					
					for (var i in categorys) {
						if (jQuery.inArray( categorys[i].name, nowTypes)<0) {
							monitorsLeft.push(categorys[i]);
						}
					}
//					for (var i=0;i<monitorsLeft.length;i++) {
//						for(var j = 0 ;j<monitorDetails.length;j++){
//							if (monitorDetails[j].name==monitorsLeft[i].name) {
//								monitorsLeft.splice(i,1);
//								//delete monitorDetails[i];
//								break;
//							}
//						}
//					}
					$scope.monitorsLeft=monitorsLeft;
					//console.log(monitorsLeft);
			});		
			$scope.addMonitorTypes=function (monitorsToAdd) {
				winWebHttpService.querywithParams('index/addMonitorType',{types:monitorsToAdd,userName:$cookies.name}).then(function(newData) {	
					$scope.alertOption={content:"增加成功",show:true,afterHideFun:function(){
						window.location.reload();
					}};
					
				}, function() {
					$scope.alertOption={content:"增加失败",show:true};
				});
			};
			
		} ]);
});