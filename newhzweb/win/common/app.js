define(
		[ "angular", "angular-route", "angular-resource", "angular-sanitize",
				"angular-animate", "angular-file-upload", "angular-bootstrap","angular-cookies",
				"../common/directives", "../common/services",
				"../chronic/controllers", "../chronic/directives",
				"../diary/controllers", "../diary/directives",
				"../evaluate/controllers", "../evaluate/directives",
				"../favorite/controllers", "../favorite/directives",
				"../how/controllers", "../how/directives",
				"../main/controllers", "../main/directives",
				"../meals/controllers", "../meals/directives",
				"../monitor/controllers", "../monitor/directives",
				"../plan_create/controllers", "../plan_create/directives",
				"../profile/controllers", "../profile/directives",
				"../report/controllers", "../search/controllers",
				"../search/directives", "../search1/controllers",
				"../search1/directives", "../share/controllers",
				"../share/directives", "../sport/controllers",
				"../sport/directives", "../sport_diary/controllers",
				"../sport_diary/directives", "../sport_eval/controllers",
				"../sport_eval/directives", 
				"../medical/controllers",
				"../doctor/controllers","../doctor/directives",
				"../answer/controllers","../answer/directives",
				"../health_diary/controllers",
				"../family_basket/controllers","../family_basket/directives",
				"../profile/family/controllers","../profile/search/controllers",
				"../profile/info/controllers","../profile/addMember/controllers",				
				"../profile/memberInfo/controllers"
				],
		function(e) {
			"use strict";
			e
					.module(
							"winWebApp",
							[ "ngRoute", "ngSanitize", "ngAnimate",'ngCookies',
									"winWeb.directives.common",
									"winWeb.services.common",
									"winWeb.controllers.main",
									"winWeb.directives.main",
									"winWeb.controllers.profile",
									"winWeb.directives.profile",
									"winWeb.controllers.report",
									"winWeb.controllers.monitor",
									"winWeb.directives.monitor",
									"winWeb.controllers.sport",
									"winWeb.directives.sport",
									"winWeb.controllers.meals",
									"winWeb.directives.meals",
									"winWeb.controllers.chronic",
									"winWeb.directives.chronic",
									"winWeb.controllers.evaluate",
									"winWeb.directives.evaluate",
									"winWeb.controllers.evaluate_view",
									"winWeb.controllers.search",
									"winWeb.directives.search",
									"winWeb.controllers.search1",
									"winWeb.directives.search1",
									"winWeb.controllers.plan_create",
									"winWeb.directives.plan_create",
									"winWeb.controllers.sport_diary",
									"winWeb.directives.sport_diary",
									"winWeb.controllers.sport_eval",
									"winWeb.directives.sport_eval",
									"winWeb.controllers.favorite",
									"winWeb.directives.favorite",
									"winWeb.controllers.how",
									"winWeb.directives.how",
									"winWeb.controllers.share",
									"winWeb.directives.share",
									"winWeb.controllers.diary",
									"winWeb.directives.diary",
									"winWeb.controllers.medical",
									"winWeb.controllers.doctor",
									"winWeb.directives.doctor",
									"winWeb.controllers.answer",
									"winWeb.directives.answer",
									"winWeb.controllers.healthDiary",
									"winWeb.controllers.familyBasket",
									"winWeb.controllers.family",
									"winWeb.controllers.familySearch",
									"winWeb.controllers.profileInfo",
									"winWeb.controllers.addMember",
									"winWeb.controllers.profileMemberInfo"
									])
					.config(
							[
									"$routeProvider",
									"$locationProvider",
									function(e, r) {
										r.html5Mode(false).hashPrefix("~");
										e
												.when(
														"/index",
														{
															templateUrl : "win/main/main.html",
															controller : "MainCtrl",
															reloadOnSearch : false
														})
//												.when(
//														"/profile",
//														{
//															templateUrl : "win/profile/profile.html",
//															controller : "ProfileCtrl",
//															reloadOnSearch : false
//														})
												.when(
														"/profile/:id",
														{
															templateUrl : "win/profile/profile.html",
															controller : "ProfileCtrl",
															reloadOnSearch : false
														})
												.when(
														"/report/:type",
														{
															templateUrl : "win/report/report.html",
															controller : "ReportCtrl",
															reloadOnSearch : false
														})
												.when(
														"/report",
														{
															templateUrl : "win/report/report.html",
															controller : "ReportCtrl",
															reloadOnSearch : false
														})
												.when(
														"/monitor",
														{
															templateUrl : "win/monitor/monitor.html",
															controller : "MonitorCtrl",
															reloadOnSearch : false
														})
												.when(
														"/meals",
														{
															templateUrl : "win/meals/meals.html",
															controller : "MealsCtrl",
															reloadOnSearch : false
														})
												.when(
														"/sport",
														{
															templateUrl : "win/sport/sport.html",
															controller : "SportCtrl",
															reloadOnSearch : false
														})
												.when(
														"/chronic",
														{
															templateUrl : "win/chronic/chronic.html",
															reloadOnSearch : false
														})
												.when(
														"/chronicDetail/:id",
														{
															templateUrl : "win/chronic/chronic_view.html",
															reloadOnSearch : false
														})
												.when(
														"/chronicCat/:type",
														{
															templateUrl : "win/chronic/chronic_list.html",
															reloadOnSearch : false
														})
												.when(
														"/plan_create/:id",
														{
															templateUrl : "win/plan_create/plan_create2.html",
															controller : "PlanCreateCtrl",
															reloadOnSearch : false
														})
												.when(
														"/plan_create",
														{
															templateUrl : "win/plan_create/plan_create.html",
															controller : "PlanCreateCtrl",
															reloadOnSearch : false
														})
												.when(
														"/search",
														{
															templateUrl : "win/search/search.html",
															controller : "SearchCtrl",
															reloadOnSearch : false
														})
												.when(
														"/search1",
														{
															templateUrl : "win/search1/search1.html",
															controller : "Search1Ctrl",
															reloadOnSearch : false
														})
												.when(
														"/evaluate",
														{
															templateUrl : "win/evaluate/evaluate.html",
															controller : "EvaluateCtrl",
															reloadOnSearch : false
														})
												.when(
														"/evaluate_view/:id",
														{
															templateUrl : "win/evaluate/evaluate_view.html",
															controller : "EvaluateViewCtrl",
															reloadOnSearch : false
														})
												.when(
														"/sport_diary",
														{
															templateUrl : "win/sport_diary/sport_diary.html",
															controller : "Sport_diaryCtrl",
															reloadOnSearch : false
														})
												.when(
														"/sport_eval",
														{
															templateUrl : "win/sport_eval/sport_eval.html",
															controller : "SportEvalCtrl",
															reloadOnSearch : false
														})
												.when(
														"/favorite",
														{
															templateUrl : "win/favorite/favorite.html",
															controller : "FavoriteCtrl",
															reloadOnSearch : false
														})
												.when(
														"/how",
														{
															templateUrl : "win/how/how.html",
															controller : "HowCtrl",
															reloadOnSearch : false
														})
												.when(
														"/share",
														{
															templateUrl : "win/share/share.html",
															controller : "ShareCtrl",
															reloadOnSearch : false
														})
												.when(
														"/diary",
														{
															templateUrl : "win/diary/diary.html",
															controller : "DiaryCtrl",
															reloadOnSearch : false
														})
												.when(
														"/healthDiary",
														{
															templateUrl : "win/health_diary/healthDiary.html",
															controller : "HealthDiaryCtrl",
															reloadOnSearch : false
														})
												.when(
														"/family_basket",
														{
															templateUrl : "win/family_basket/family_basket.html",
															controller : "FamilyBasketCtrl",
															reloadOnSearch : false
														})			
												.when('/medical',{
															templateUrl : "win/medical/medical.html",
															controller : "MedicalAskCtrl",
															reloadOnSearch : false
												}).when('/doctor',{
															templateUrl : "win/doctor/doctor.html",
															controller : "DoctorCtrl",
															reloadOnSearch : false
												}).when('/answer',{
															templateUrl : "win/answer/answer.html",
															controller : "AnswerCtrl",
															reloadOnSearch : false
												}).when('/profile',{
													templateUrl : "win/profile/family/family.html",
													controller : "FamilyCtrl",
													reloadOnSearch : false
												}).when('/profileInfo',{
													templateUrl : "win/profile/info/info.html",
													controller : "ProfileInfoCtrl",
													reloadOnSearch : false
												}).when('/profileHealthInfo',{
													templateUrl : "win/profile/healthInfo/healthInfo.html",
													controller : "ProfileCtrl",
													reloadOnSearch : false
												}).when('/profileBaseInfo',{
													templateUrl : "win/profile/baseInfo/baseInfo.html",
													controller : "ProfileCtrl",
													reloadOnSearch : false
												}).when('/profileChangPwd',{
													templateUrl : "win/profile/changePwd/changePwd.html",
													controller : "ProfileCtrl",
													reloadOnSearch : false
												}).when('/profileSearch/:keyword',{
													templateUrl : "win/profile/search/search.html",
													controller : "FamilySearchCtrl",
													reloadOnSearch : false
												}).when('/profileSearch',{
													templateUrl : "win/profile/search/search.html",
													controller : "FamilySearchCtrl",
													reloadOnSearch : false
												}).when('/profileMemberInfo/:userName/:call',{
													templateUrl : "win/profile/memberInfo/memberInfo.html",
													controller : "ProfileMemberInfoCtrl",
													reloadOnSearch : false
												}).when('/profileMemberInfo/:userName/',{
													templateUrl : "win/profile/memberInfo/memberInfo.html",
													controller : "ProfileMemberInfoCtrl",
													reloadOnSearch : false
												}).when('/profileMemberInfoNew/:userName/:call',{
													templateUrl : "win/profile/memberInfo/memberInfoNew.html",
													controller : "ProfileMemberInfoCtrl",
													reloadOnSearch : false
												}).when('/profileMemberInfoNew/:userName/',{
													templateUrl : "win/profile/memberInfo/memberInfoNew.html",
													controller : "ProfileMemberInfoCtrl",
													reloadOnSearch : false
												}).when('/profileMemberEdit/:userName/:call',{
													templateUrl : "win/profile/memberEdit/memberEdit.html",
													controller : "ProfileMemberInfoCtrl",
													reloadOnSearch : false
												}).when('/profileMemberEdit/:userName/',{
													templateUrl : "win/profile/memberEdit/memberEdit.html",
													controller : "ProfileMemberInfoCtrl",
													reloadOnSearch : false
												}).when('/profileMemberEditNew/:jump/:userName/:call',{
                                                    templateUrl : "win/profile/memberEdit/memberEditNew.html",
                                                    controller : "ProfileMemberInfoCtrl",
                                                    reloadOnSearch : false
                                                }).when('/profileMemberEditNew/:jump/:userName',{
                                                    templateUrl : "win/profile/memberEdit/memberEditNew.html",
                                                    controller : "ProfileMemberInfoCtrl",
                                                    reloadOnSearch : false
                                                }).when('/profileAddMember',{
													templateUrl : "win/profile/addMember/addMember.html",
													controller : "AddMemberCtrl",
													reloadOnSearch : false
												}).when('/profileAddMemberSuccess',{
													templateUrl : "win/profile/addMember/addMemberSuccess.html",
													controller : "AddMemberCtrl",
													reloadOnSearch : false
												}).otherwise({
															redirectTo : "/index"
												})
									} ])
					.config(
							[
									"$parseProvider",
									"$httpProvider",
									function(e, r) {
										e.unwrapPromises(true);
										r.defaults.headers.common.Accept = "application/json";
										r.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8"
										var token = $("meta[name='_csrf']").attr("content");
										var header = $("meta[name='_csrf_header']").attr("content");
										r.defaults.headers.post[header] = token;
										
									} ])
					.factory('Store', function() {
						return {		
							set : function(key,value) {
								return localStorage.setItem(key, value);
							},
							get : function() {
								return localStorage.getItem(key);
							},
							remove : function() {
								return localStorage.removeItem(key);
							}
						};
					})
					.filter('subFilter',function(){
						return function(str,len){
							return str.length > len ? str.substring(0,len) + '...' : str;
						};
					})
					.run([ "$rootScope", "$window",'$cookies','$rootScope', function(r, l,$cookies,$rootScope) {

                        $rootScope.fnChangeUser = function(userName,i){
                            $rootScope.userNameWatch=userName;
                            $rootScope.iWatch=i;
                            window.location.href = '#~/index';
                        }

						r.chronicRight = "win/chronic/chronicRight.html";
						r.$on("$routeChangeStart", function(r, t) {
							e.element(l).unbind("scroll");
						});
						
						r.$on('$locationChangeSuccess', function(){
							
							if(arguments[1].indexOf('#~/plan_create/') !== -1){
								scroll(0,450);
					        }else{
					        	scroll(0,0);
					        }  
							
							var $navUl = $('.nav.nav-pills.nav-stacked');
							$('li',$navUl).removeClass('active');
							var nav = ['index','healthDiary','report','medical','profileFamily','profileInfo','profileHealthInfo','profileBaseInfo','profileChangPwd'];
							for(var i=0; i<nav.length; i++){
								if(arguments[1].indexOf( '#~/'+ nav[i] ) !== -1){
									$("a[href^='#~/"+ nav[i] +"']",$('.nav.nav-pills.nav-stacked')).parents('li').addClass('active');
									break;
							   }
							}
							
							// 个人中心菜单显示与隐藏
							if(arguments[1].indexOf( '#~/profile' ) !== -1){
								$('.profile-nav ul:eq(0)').hide();
								$('.profile-nav ul:eq(1)').show();
						    	$('.profile-nav.col-xs-5>.panel:eq(1)').hide();
						    	$('.profile-nav.col-xs-5>.panel:eq(2)').hide();
						    }else{
						    	$('.profile-nav ul:eq(0)').show();
						    	$('.profile-nav ul:eq(1)').hide();
						    	$('.profile-nav.col-xs-5>.panel:eq(1)').show();
						    	$('.profile-nav.col-xs-5>.panel:eq(2)').show();
						    }
							
							
						});
					} ]);
			var r = {};
			r.init = function() {
				e.bootstrap(document, [ "winWebApp" ]);
				
				// show hide back
				window.onscroll = function(){  
			        if(window.scrollY > 0){
			            $('#back').fadeIn(100);
			        }else{
			            $('#back').fadeOut(500); 
			        } 
			    };
			    
			    // back
			    $('#back').on('click',function(){
			        $('body,html').animate({scrollTop:0},500);
			    });
			};
			return r;
		});