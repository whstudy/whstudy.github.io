define(['angular'],function (angular) {
'use strict';

var sportControllers = angular.module('winWeb.controllers.how', []);

sportControllers.controller('HowCtrl', [ '$scope', 'winWebHttpService',
		function($scope, winWebHttpService) {
            $scope.howMenu = [];
            $scope.howTags = [];

            
            winWebHttpService.querywithParams('index/getMealRecommend').then(function(data) {
               
            	$scope.powerCharOption= {
                    title : {
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter:"{b} {c}%"
                    },
                    series : [
                        {
                            type:'pie',
                            radius : '60%',
                            center: ['50%', '50%'],
                            data:data.threePowerRate
                        }
                    ]
                };
            	
            	
            	
                $scope.mealsCharOption = {
                        title : {
                            textStyle:{
                                color:'#f0f0f0'
                            },
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter:"{b} {c}%"
                        },
                        series : [
                            {
                                type:'pie',
                                radius : ['40%','60%'],
                                center: ['50%', '50%'],
                                data: data.powerSourceRate
                            }
                        ]
                    };
                
                $scope.howMenu=data.howMenu;
                $scope.howTags = data.howTags;
            });
            
            
           /* winWebHttpService.querywithParams('ajax/how-menu.json').then(function(data) {
                $scope.howMenu = data;
            });

            winWebHttpService.querywithParams('ajax/how-tags.json').then(function(data) {
                $scope.howTags = data;
            });
*/
            $scope.isLast= function(idx){
                if(idx>=($scope.howTags.length-1))
                    return "text-danger";
                else
                    return "";
            }

		} ]);

});