/**
 * 个人中心模块
 */
define(['angular'],function (angular) {

	'use strict';

	var profileControllers = angular.module('winWeb.controllers.family', ['angularFileUpload','ui.bootstrap','ngCookies']);

	profileControllers.controller('FamilyCtrl', [ '$scope', 'winWebHttpService','$upload','$rootScope','$filter','$cookies','$routeParams',
		function($scope, winWebHttpService,$upload,$rootScope,$filter,$cookies,$routeParams) {



        var getFamily=function(){

            // 获取家庭成员
            winWebHttpService.querywithParams('index/getFamilyUsers',{userName:$cookies.name}).then(function(newData) {

                $scope.familyUsers = newData;
                console.log('11111111111111111111111111111111111111111111111111111');
                console.log(newData);
                if($routeParams.id){
                    for(var i=0; i<$scope.familyUsers.length; i++){
                        if($scope.familyUsers[i].userName == $routeParams.id){
                            $scope.familyUsers[i].active = true;
                            break;
                        }
                    }
                }else{
                    $scope.familyUsers[0].active = true;
                    $cookies.users = angular.toJson(newData);
//				$rootScope.users = angular.toJson(newData);
                    $cookies.name = newData[0].userName;
                }


                $scope.wgzFamily=[];
                $scope.wcjFamily=[];

                for(var o in $scope.familyUsers){
                    if($scope.familyUsers[o].userType==0&&$scope.familyUsers[o].call!="我"){
                        $scope.wgzFamily.push($scope.familyUsers[o]);
                    }else if($scope.familyUsers[o].userType==1){
                        $scope.wcjFamily.push($scope.familyUsers[o]);
                    }
                }
                console.log($scope.wcjFamily);
                $rootScope.users = angular.fromJson($cookies.users); // use angular cookie
            });

        }

        getFamily();
		
	
			
		$scope.cancleAttention=function(){	

			var userName=$("#userName").val();
			
			// 取消关注
			winWebHttpService.querywithParams('index/cancleAttention',{target:userName}).then(function(newData) {						
//				location.reload();
                getFamily();
                $('.modal.fade').modal('hide');
			},function(){
				$scope.alertOption={content:"数据更新失败",show:true};
			});
		}

		$scope.changeCallName=function(){
			
			var callName=$scope.callName;
			var userName=$("#userName").val();
			
			winWebHttpService.querywithParams('index/changeCallName',{target:userName,callName:callName}).then(function(newData) {

                $scope.callName=null;
                getFamily();
                $('.modal.fade').modal('hide');
			
			},function(){
				$scope.alertOption={content:"数据更新失败",show:true};
			});
			
		}				
			  
		} ]);
});
