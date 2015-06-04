define(['angular'],function (angular) {

	'use strict';

	var profileControllers = angular.module('winWeb.controllers.profileInfo', ['angularFileUpload','ui.bootstrap','ngCookies']);

	profileControllers.controller('ProfileInfoCtrl', [ '$scope', 'winWebHttpService','$upload','$rootScope','$filter','$cookies','$routeParams',
		function($scope, winWebHttpService,$upload,$rootScope,$filter,$cookies,$routeParams) {

            var sendMessages=function(){
                // 获取家庭成员
                winWebHttpService.querywithParams('index/sendMessages').then(function(newData) {

                    console.log("消息列表");
                    console.log(newData);

                    $scope.sendMessages = newData.sendMessages;
                    $scope.receiveMessages = newData.receiveMessages;

                    console.log($scope.sendMessages);
                    console.log($scope.receiveMessages);

                });
            }

            sendMessages();
						
			$scope.jsxx=function(o){
				$scope.djdxx=o;
			}


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

			$scope.attention=function(sendId,status){				
				winWebHttpService.querywithParams('index/attention',{sendId:sendId,status:status}).then(function(newData) {
                        getFamily();
                        sendMessages();
                        $('.modal.fade').modal('hide');
				});
				
			}
			

		} ]);
});
