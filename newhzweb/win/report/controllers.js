define(['angular'],function (angular) {
	
	'use strict';

	var reportControllers = angular.module('winWeb.controllers.report', ['angularFileUpload']);

	reportControllers.controller('ReportCtrl', [ '$scope','$upload','winWebHttpService','$rootScope','$cookies','$routeParams',
		function($scope, $upload,winWebHttpService,$rootScope,$cookies,$routeParams) {							
		
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
		
			// 页面数据
			$scope.scrollData = [];	
			
			// 资料袋对象
			$scope.newFolder = {	
					forderId: null,
					healthDocList:[],
					time: null,
					title: null,
					userId: null
			};
			
			// 加载数据方法
			loadData();
			function loadData(){
				
				$scope.type=$routeParams.type;
				
				if(!$routeParams.type){
					$routeParams.type=''
				}
				winWebHttpService.querywithParams('healthdoc/getHealthDoc',{username:$cookies.name,folderType:$routeParams.type,page:1}).then(function(newData){
					console.log(newData);
					$scope.scrollData = newData;
				});
			}
			
			// 打开新增资料袋模态框
			$scope.fnOpenModal = function(){
				$scope.folder = angular.copy($scope.newFolder);
			};
			
			// 新增资料袋
			$scope.onFileSelect = function($files) {
			    for (var i = 0; i < $files.length; i++) {
			      var file = $files[i];
			      
			      // 文件判断 不能超过3M
			      if(file.size >+ 3*1024*1024){
			    	  $scope.alertOption={content:"上传文件不能超过3M",show:true};
			    	  return;
			      }
			      $scope.upload = $upload.upload({ 
			    	  url: 'healthdoc/uploadHealthDoc',
			    	  file: file, 
			    	  data: {username:$cookies.name},
			      }).progress(function(evt) {
			    	 $scope.uploadState='正在上传，完成'+parseInt(100.0 * evt.loaded / evt.total)+'%';
			    	 console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			      }).success(function(data, status, headers, config) {
			    	  data = data.substr(1);
			    	  data = data.substr(0,data.length-1);
			    	  $scope.uploadState=data;
			    	  console.log(file);
			    	  $scope.folder.healthDocList.push(
			    			  {
			    				  path: data,
			    				  name: file.name,
			    				  suffix:file.name.substr(file.name.indexOf('.')+1)})
			      	 });
			    }
			  };
			  
			  // 删除上传资料袋中的文件
			  $scope.fnDeleteAddFile = function(index){
				  $scope.folder.healthDocList.splice(index,1);
				  // 需要删除mongodb中的文件
			  };
			  
			  // 确定新增资料袋
			  $scope.uploadConfirm = function(){
					// 资料袋名称的验证
					if($scope.folder.title == null || $scope.folder.title.length <= 0 || $scope.folder.title.length > 10){
						$scope.alertOption={content:"请输入10个字以内的名称",show:true};
						return;
					}
					console.log('上传资料名称');
					console.log($scope.folder);										
					
					// 保存数据到后台
					winWebHttpService.querywithParams('healthdoc/saveHealthFiles',{username:$cookies.name},$scope.folder).then(function(newData){
						$('#modal-upload').modal('hide');
						console.log(newData);
						// 前台添加数据
//						window.location.reload();
                        loadData();
					});
					
				};
			  
			//根据文件id删除文件
			$scope.fnDeleteFile = function(forderId,docId){
				console.log('delete file by docId');
				winWebHttpService.querywithParams('healthdoc/deleteHealthFile',{docId:docId}).then(function(newData){
					$scope.alertOption={content:"删除成功",show:true};
					for(var i=0; i<$scope.scrollData.length; i++){
						if($scope.scrollData[i].forderId === forderId){
							for(var j=0; j<$scope.scrollData[i].healthDocList.length; j++){
								if($scope.scrollData[i].healthDocList[j].docId === docId){
									$scope.scrollData[i].healthDocList.splice(j,1);
									console.log('delete health file ok');
									return;
								}
							}
						}
					}
				},function(){
					//$scope.alertOption={content:"删除失败",show:true};
				});
			};

            // 删除资料袋
            $scope.fnDelFile = function(forderId){

                // 保存数据到后台
                winWebHttpService.querywithParams('healthdoc/deleteHealthDoc',{forderId:forderId}).then(function(newData){
                    loadData();
                });

            };


			// 根据文件夹id修改文件
			$scope.fnAddFile = function(forderId){
				console.log('add file');
				for(var i=0; i<$scope.scrollData.length; i++){
					if($scope.scrollData[i].forderId === forderId){
						$scope.folder = angular.copy($scope.scrollData[i]);
					}
				}
				$('#modal-upload').modal();
			};
			   
			//滚动
			$scope.dataHandle=function(newData){		
				return newData;
			};
			
			// 根据文件id查看图片
			$scope.fnCheckPicture = function(forderId,docId){
				for(var i=0; i<$scope.scrollData.length; i++){
					if($scope.scrollData[i].forderId === forderId){
						for(var j=0; j<$scope.scrollData[i].healthDocList.length; j++){
							if($scope.scrollData[i].healthDocList[j].docId === docId){
								$scope.picture =  'file/processDownload?file=' + $scope.scrollData[i].healthDocList[j].path;
								console.log($scope.picture);
								// test
								//$scope.picture = "img/pro3.jpg";
								$('#checkPicture').modal();
								return;
							}
						}
					}
				}
			};
			
			// 家庭成员切换
			$scope.fnChangeUserGetReports = function(username){
				console.log('家庭成员切换' );
				$('.familyMenu img').tooltip('hide');
				loadData();
			};
			
			
		} ]);
});