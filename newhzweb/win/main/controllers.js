define(['angular'],function (angular) {
	
	'use strict';
	
	var module = angular.module('winWeb.controllers.main', ['angularFileUpload','ngCookies']);
	
	module.controller('MainCtrl', [ '$scope','winWebHttpService','$upload','$rootScope','$cacheFactory','$filter','$cookies','Store',
		function($scope,winWebHttpService,$upload,$rootScope,$cacheFactory,$filter,$cookies,Store) {
			
//			$rootScope.isMain=true;
		
		
			findHealthDocCount($cookies.name);
		
			function findHealthDocCount(userName){
				winWebHttpService.querywithParams('healthdoc/findHealthDocCount',{username:userName}).then(function(data) {
//					data=[{"docCount":4,"forderType":"健康管理报告"},{"docCount":10,"forderType":"其他"},{"docCount":8,"forderType":"日常检查"}];
					$scope.tjbg=_.findWhere(data,{forderType: "体检及病历报告"});
					$scope.jkglbg=_.findWhere(data,{forderType: "化验单"});
					$scope.rcjc=_.findWhere(data,{forderType: "影像检查"});
					$scope.qt=_.findWhere(data,{forderType: "其他"});
				});
			}
		
		
			//Store.set('jay','wang');
		
	 		//$rootScope.isMain = true;
	 		$scope.healthChartFlag = false;

			$scope.charOption=[];
			var reportData=[];
			
			// 隐藏导航栏
			if($cookies.isMain == undefined || $cookies.isMain == 1){
				$('#main_menu li:gt(0)').show();
				$('.top-menu.pull-right').show();
				$('#healthManage').show();
			}else{
				/*$('#main_menu li:gt(0)').hide();*/
				$('.top-menu.pull-right').hide();
				$('#healthManage').hide();
			}			
			
			getMainData($cookies.name);
			function getMainData(userName){
				winWebHttpService.querywithParams('index/getMainPageData',{userName:userName}).then(function(data) {
					$scope.mainData=data;
					console.log("主页数据");
					console.log(data);
					
					// 家庭成员						
					
					$cookies.users = angular.toJson($scope.mainData.familyMember);
			 		$rootScope.users = $scope.mainData.familyMember;
			 		
			 		for(var i=0; i<$rootScope.users.length; i++){
			 			if($rootScope.users[i].userName == $cookies.name){
			 				var user = $rootScope.users[i];

			 				$rootScope.name = user.userName;
			  				$rootScope.username = user.name;
			  				$rootScope.call = user.call;
			  				$rootScope.description = user.description;
			  				$rootScope.tall = user.tall;
			  				$rootScope.weight = user.weight;
			  				$rootScope.imgUrl = user.pic ? "file/processDownload?file=" + user.pic : "img/pro-ac-1.png";
//			  				$rootScope.imgUrl = 1111111111;
//			  				o.pic? 'file/processDownload?file=' +o.pic:'img/pro-ac-1.png'
			  				$cookies.username = user.name; // nickname
			  				$cookies.name = user.userName;		 // login username
			  				$cookies.call = user.call;
			  				$cookies.description = user.description;
			  				$cookies.imgUrl = $rootScope.imgUrl;
			  				$cookies.gender =user.gender;
			  				$cookies.tall = user.tall;
			  				
			  				break;
			 			}
			 		}

	  				var reports=data.physicalReports;
					for ( var i = 0; i < reports.length; i++) {
						var report={};
						report.title=reports[i].prCreateDate;
						report.url='file/processDownload?file='+reports[i].prPath;
						if (reports[i].type==1) {
							report.type='jk';
						}else{
							report.type='tj';
						}
						
						reportData.push(report);
					}
					$scope.reportData=reportData; 
	  			});
			}
				
				 
			
				
				winWebHttpService.querywithCache('index/chronicGetTop3').then(function(data) {
					 $scope.top3 = data;
					 for(var i=0; i<$scope.top3.length; i++){
		         	 	if($scope.top3[i].title.length >10){
		         	 		$scope.top3[i].title = $scope.top3[i].title.substring(0,13) +'...';
		         	 	}
		         	 	if($scope.top3[i].abstracts.length >40){
		         	 		$scope.top3[i].abstracts = $scope.top3[i].abstracts.substring(0,30) +'...';
		         	 	}
		         	 }
				});
				
				winWebHttpService.querywithCache('index/chronicGetNew3').then(function(data) {
					 $scope.new3 = data;
					 for(var i=0; i<$scope.new3.length; i++){
		         	 	if($scope.new3[i].title.length >10){
		         	 		$scope.new3[i].title = $scope.new3[i].title.substring(0,13) +'...';
		         	 	}
		         	 	if($scope.new3[i].abstracts.length >40){
		         	 		$scope.new3[i].abstracts = $scope.new3[i].abstracts.substring(0,30) +'...';
		         	 	}
		         	 }
				});
				
				winWebHttpService.querywithParams('index/chronicGetMain').then(function(data) {
					$scope.chronicData = data;
				});
				
				
			 
			$scope.onFileSelect = function($files) {
			    for (var i = 0; i < $files.length; i++) {
			      var file = $files[i];
			      $scope.upload = $upload.upload({
			        url: 'file/processUpload', 
			        file: file, 
			      }).progress(function(evt) {
			    	 $scope.uploadState='正在上传，完成'+parseInt(100.0 * evt.loaded / evt.total)+'%';
			    	 console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			      }).success(function(data, status, headers, config) {
			        $scope.uploadState=data;
			    	  console.log(data);
			      });
			    }
			  };
			  
			  
			  // 我的指标监测
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
	                }, 0);
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
	                addDataAnimation:true,
	                tips:3
	            };
				
				 
				// 获取指标
				if($cookies.name){
					getMonitor($cookies.name);
				}else{
					getMonitor('');
				}
				
				function getMonitor(username){						
					$rootScope.evalShow = false;
					winWebHttpService.querywithParams('index/getMonitor',{username:username}).then(function(newData) {	
						console.log('monitor');
						console.log(newData);
												
						
						$scope.types = newData.categorys;
						
						var options=[];
						var monitorDetails=newData.details;
						
						for(var i=0 ;i<monitorDetails.length;i++){
							
							var monitorDetail=monitorDetails[i];
							var option=angular.copy(monitorCharOptions);
							
							option.tooltip.formatter=formatterFunc;
							option.legend.data=monitorDetail.legend;
							option.xAxis[0].data=monitorDetail.xAxis;
							option.tips = monitorDetail.tips;							
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
								option:option,
								tips:option.tips
							});
							 
						}
						console.log("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★")
						console.log(options);
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
						$scope.monitorsLeft=monitorsLeft;
				});	
				}
					
				// 显示录入记录模态框
				$scope.showAddMonitor = function(){
					$scope.alertOption = '';
					$('#modal-add-data').modal();
					$('#modal-add-data input:eq(1)').focus();
				};
				
				// 保存我的指标类型
				$scope.saveMyMonitorType=function () {

					var types = [];
					// jquery
					$("#params .btn-success input").each(function(){
						types.push($(this).val());
					});
					console.log(types.join(','));
					// angularjs
//					for(var i=0; i<$scope.types.length; i++){
//						if($scope.types[i].selected){
//							types.push($scope.types[i].id);
//						}
//					}
					var data = {
							myMonitorTypes : types.join(','),
							username : $cookies.name
					};
					console.log(types);
					winWebHttpService.querywithParams('index/saveMyMonitorType',data).then(function(newData) {
						$scope.alertOption={content:"增加成功",show:true,afterHideFun:function(){
							getMonitor($scope.name);
							$('#modal-add').modal('hide');
							window.location.reload();
						}};
						
					}, function() {
						$scope.alertOption={content:"增加失败",show:true};
					});

				};
			  
				$scope.fnSelectType = function(id){
					console.log(id);
					for(var i=0; i<$scope.types.length; i++){
						if(id == $scope.types[i].id){
							$scope.types[i].selected = !$scope.types[i].selected;
							return;
						}
					}
				};


				// 家庭成员切换获取指标等数据
				$rootScope.fnChangeUser1 = function(userName,i){

					// 当前用户则不切换
					if(userName == $rootScope.name) return;

					var users = angular.fromJson($cookies.users);
					$rootScope.call=users[i].call;
					$cookies.call=users[i].call;

					$rootScope.evalShow = false;
					$("#monitorDetail").hide();


			 			var item = users[i];

		 				// 资料完成度判断
		 				if(!item.isCompleted){
			 				$cookies.name = users[0].userName;
			 				$cookies.username = users[0].name;
			 				$cookies.call = users[0].call;
			 				$rootScope.name = users[0].userName;
			 				$rootScope.username = users[0].name;
			 				$rootScope.call = users[0].call;
			 				$('#main_menu li:gt(0)').show();
		 					$('.top-menu.pull-right').show();
		 					window.location.href = '#~/profileMemberEdit/'+userName;
		 					return;
		 				}

		 				console.log(item);

			 			if(item.userName === userName){
			 				item.isMain === 1 ? console.log('主显帐号') : console.log('不是主显帐号');

			 				if(item.isMain === 1){
			 					$('#main_menu li:gt(0)').show();
			 					$('.top-menu.pull-right').show();
			 				}else{
			 					$('#main_menu li:gt(0)').hide();
			 					$('.top-menu.pull-right').hide();
			 				}


			 				$cookies.isMain = item.isMain;
			 				$cookies.name = item.userName;
			 				$cookies.username = item.name;
			 				$cookies.call = item.call;
			 				$cookies.imgUrl = item.pic;
			 				$rootScope.isMain = item.isMain === 1 ? true : false;
			 				$rootScope.name = item.userName;
			 				$rootScope.username = item.name;
			 				$rootScope.call = item.call;
			 				$rootScope.gender = item.gender;

			 				if(item.pic){
			 					$cookies.imgUrl ="file/processDownload?file="+item.pic;
							}else{
								$cookies.imgUrl ="img/pro-ac-1.png";
							}

			 				$rootScope.description = item.description;
			 				$rootScope.imgUrl = $cookies.imgUrl ;
			 				$rootScope.tall = item.tall;
			 				$rootScope.gender = item.gender;
			 				$rootScope.imgUrl = item.pic;

			 				document.cookie = "description="+escape($rootScope.description)+";expires=0";
			  				document.cookie = "tall="+escape($rootScope.tall)+";expires=0";
			  				document.cookie = "gender="+$rootScope.gender+";expires=0";

							$rootScope.description = item.description;
//							$scope.$apply();

			 			}





					console.log(' 家庭成员切换获取指标等数据' );

//					$('.familyMenu img').tooltip('hide');
//					$('.tooltip').hide();


					// 资料完成度判断
					//window.location.href = '#~/profile';


					// 隐藏导航栏
//					if($cookies.isMain == undefined || $cookies.isMain == 1){
//						$('#main_menu li:gt(0)').show();
//						$('.top-menu.pull-right').show();
//						$('#healthManage').show();
//					}else{
//						$('#main_menu li:gt(0)').hide();
//						$('.top-menu.pull-right').hide();
//						$('#healthManage').hide();
//					}

					console.log(userName);
					getMonitor(userName);

//					getMainData(username);


					/*winWebHttpService.querywithParams('index/getPhysicalReports',{username:userName}).then(function(data) {
						var reports = [];
						if(data.length !== 0){
							reports = data;
						}

		  				console.log('报告'+ reports);
		  				reportData = [];
						for ( var i = 0; i < reports.length; i++) {
							var report={};
							report.title=reports[i].prCreateDate;
							report.url='file/processDownload?file='+reports[i].prPath;
							if (reports[i].type==1) {
								report.type='jk';
							}else{
								report.type='tj';
							}

							reportData.push(report);
						}
						$scope.reportData=reportData;

		  			});*/

	 				window.location.href = '#~/index';
//	 				window.location.reload();

				};

                $scope.$watch('userNameWatch',function(n,o){
                    if(n!=undefined){
//                        getMonitor(n);
                        $rootScope.fnChangeUser1($rootScope.userNameWatch,$rootScope.iWatch)
                    }
                })

		} ]);
});