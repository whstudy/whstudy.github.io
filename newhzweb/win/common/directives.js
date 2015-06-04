define(
		[ "angular"],
		function(e) {
			"use strict";
			e
					.module("winWeb.directives.common",
							[ "winWeb.services.common" ,"ngCookies"])
							
							.directive('winWebMainFreeSlide1', function() {
	return function(scope, element, attrs) {		
		scope.$watch('option', function(newValue, oldValue) {
			if (newValue != undefined) {
				//var $wrap = $(element);
				var $wrap = $('#home-report');
				if ($wrap.size() < 1) {
					return false;
				}
				
				//$wrap.owlCarousel();
				//$wrap.data('owlCarousel').destroy();
				
				$wrap.owlCarousel();
				if(oldValue){
					for(var i=0; i<oldValue.length;i++){
						$wrap.data('owlCarousel').removeItem();
					}	
				}
				var carousel = $('#home-report').data('owlCarousel');								
				
				
//				//carousel.destroy();
				carousel.reinit({
					items : 5,
					navigation : false
				});
				
				
//				$wrap.parent().on('click', '.fa.fa-chevron-left.prev', function() {
//					carousel.prev();
//				});
//				$wrap.parent().on('click', '.fa.fa-chevron-right.next', function() {
//					carousel.next();
//				});
				
				$(".fa.fa-chevron-left.prev").unbind('click').on('click', function() {
					carousel.prev();
				});
				$(".fa.fa-chevron-right.next").unbind('click').on('click', function() {
					carousel.next();
				});
				
				
				
//				$('.tooltips', $wrap).tooltip({
//					container : 'body'
//				});

				
				
				
				// quick code image
				$('[data-hover-img]').each(function(){
		            var $this=$(this);
		            var $wrap=$this.parent().parent();
		            $wrap.css({
		                position:'relative'
		            });
		            var $img=$('<img class="app-qr" />').attr('src',$this.data('hover-img'));
		            $this.hover(function(){
		                $img.appendTo($wrap).fadeIn();
		            },function(){
		                $img.fadeOut().remove();
		            });		            
		        });

			}

		});

	};
})
							
.directive('jqSortable', ['$parse', function($parse) {   
   return function(scope, element, attrs) {   
 
       var expr = $parse(attrs['jqSortable']);   
       var $oldChildren;   
   
       element.sortable({   
           opacity: 0.7,   
           scroll: false,   
           tolerance: "pointer",   
           start: function() {   
               $oldChildren = element.children('[ng-repeat]');   
           },   
           stop: function(){   
               var newList = [];   
               var oldList = expr(scope);   
               var $children = element.children('[ng-repeat]');   
   
      
               $oldChildren.each(function(i){   
                   var index = $children.index(this);   
                   if(index == -1){ return; }   
   
                   newList[index] = oldList[i];   
               });   
   
      
//               expr.assign(scope, newList);   
   
           
               scope.$digest();
//               console.log('11111111111111111111111111111111111111111111111111111');
               console.log(scope.option);
           }   
       });   
   
       
       scope.$on('$destroy', function(){   
           element.sortable('destroy');   
       });   
   };   
}])   
							
					.directive("winWebCommonChart", function() {
						return {
							scope : {
								option : "="
							},
							link : function(e, t, n) {								
								var o = echarts.init(t[0]);
								o.setOption(e.option);
								e.$watch("option", function(e, t) {
									o.clear();
									o.setOption(e);
								},true);
							}
						}
					})
					.directive("winWebCommonCalender", function() {
						return function(e, t, n) {
							var o = $("#custom-inner");
							var i = $("#calendar");
							if (!i.size()) {
								return false
							}
							var r = i.calendario({
								displayWeekAbbr : true
							});
							var a = $("#custom-month").html(r.getMonthName());
							var l = $("#custom-year").html(r.getYear());
							$("#custom-next").on("click", function() {
								r.gotoNextMonth(c)
							});
							$("#custom-prev").on("click", function() {
								r.gotoPreviousMonth(c)
							});
							function c() {
								a.html(r.getMonthName());
								l.html(r.getYear())
							}
						}
					})
					.directive(
							"winWebCommonStar",
							function() {
								return {
									scope : {
										stars : "@"
									},
									link : function(e, t, n) {
										e.$watch('stars',function(newValue, oldValue){
											$(t).each(function() {
												var val = parseInt(e.stars);
												$('>span:lt(' + val + ')', $(this)).addClass('hover');
											});
										});
										
										
									}
								}
							})
					.directive(
							"winWebCommonSpinner",
							function() {
								return {
									scope : {
										min : "@",
										max : "@",
										step : "@",
										value : "="
									},
									link : function(e, t, n) {
										if (!e.value) {
											e.value = e.min
										}
										e.increase = function() {
											if (e.value == e.max) {
												return
											}
											e.value = parseInt(e.value)
													+ parseInt(e.step);
											console.log(e.value)
										};
										e.decrease = function() {
											if (e.value == e.min) {
												return
											}
											e.value -= e.step
										}
									},
									templateUrl : "win/template/spinner.html"
								}
							})
					.directive(
							"winWebCommonAlert",
							function() {
								return {
									scope : {
										option : "="
									},
									link : function(e, t, n) {
										var o = $(t);
										e
												.$watch(
														"option",
														function(e, t) {
															if (!e) {
																return
															}
															var n = e;
															n.type = !n.type ? "success"
																	: n.type;
															n.title = !n.title ? "\u7cfb\u7edf\u63d0\u793a"
																	: n.title;
															if (e && e.show) {
																o.modal("show")
															} else {
																o.hide()
															}
														});
										o.on("hidden.bs.modal", function(t) {
											if (e.option
													&& e.option.afterHideFun) {
												e.option.afterHideFun()
											}
										})
									},
									templateUrl : "win/template/alert.html",
									replace : true
								}
							})
					.directive(
							"winWebCommonInfiStrol",
							[
									"$window",
									"$document",
									"winWebHttpService","$cookies",
									function(t, n, o,$cookies) {
										return {
											scope : {
												data : "=",
												onData : "&",
												url : "@",
												start : "@"
											},
											link : function(i, r, a) {
												i.scrollPage = parseInt(i.start);
												i.scrollFlag = 0;
												var l = e.element(t);
												var c = e.element(n);
												l.scroll(function() {
													if (l.scrollTop()
															+ l.height() == c
															.height()) {
														u()
													}
												});
												var u = function() {
													if (i.scrollFlag == 1) {
														return
													}
													o
															.querywithParams(
																	i.url,
																	{	username:$cookies.name,
																		page : i.scrollPage
																	})
															.then(
																	function(e) {
																		if (e
																				&& e.length < 1) {
																			i.scrollFlag = 1;
																			return
																		}
																		for ( var t = 0; t < e.length; t++) {
																			i.data
																					.push(i
																							.onData({
																								newData : e[t]
																							}))
																		}
																		console
																				.log(i.data);
																		i.scrollPage++
																	})
												}
											}
										}
									} ])
		});