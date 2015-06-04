define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.directives.evaluate', [])
.directive('winWebEvaluateHis',['$timeout',
		function($timeout) {	        
	        return {
				templateUrl : 'winwebEvalHis.html',
				transclude : true,
				link : function(scope, element, attrs) {				
					scope.$watch('evalHis', function(newValue, oldValue) {
						$timeout(function(){
							$(".knob",$(element)).each(function(){
								$(this).knob();
							});						
							$(element).children('.panel-body').slideDown();
						}, 0);
					});
				}
			};
		}])
.directive('winWebEvaluateItems',
		function() {	        
	        return {
				templateUrl : 'winwebEvalItems.html',
				transclude : true
			};
		})
.directive('winWebRadioCheck',
		function() {	        
	        return{
	        	link : function(scope, element, attrs) {
	        		element.on('click',function(){
	        			$(element).prev().click();
	        		});
	        	}
	        };
		})		
		
		
		
.directive('winWebResult',function(){
	return {
		link : function(scope, element, attrs) {
			element.on('click',function(){
				var nowElement = $("[id^=result]").not('.ng-hide');
				var preElement = nowElement.prev();
				var nextElement = nowElement.next();
				if(element.hasClass('fa-chevron-left')){
					if(preElement.attr('id') != undefined) {
                        nowElement.fadeOut('slow', function () {
                            nowElement.addClass('ng-hide');
                            preElement.removeClass('ng-hide').css('display', 'block');
                        });
                    }else{
                        alert('这已经是最早的评估了');
//                        scope.alertOption={content:"保存成功",show:true};
                    }
				}else if(element.hasClass('fa-chevron-right')){
					if(nextElement.attr('id') != undefined){
						nowElement.fadeOut('slow',function(){
							nowElement.addClass('ng-hide');
							nextElement.removeClass('ng-hide').css('display','block');
						});
						
					}else{
                        alert("这已经是最新的评估了");
//                        scope.alertOption={content:"保存成功",show:true};
                    }
				}else if(element.hasClass('fa-times')){
					console.log('close');
					$('#eval-history').fadeOut("slow");
				};
			});
			
		}
	};
})
.directive('winWebEvalViewItems',
		function() {	        
	        return {
				templateUrl : 'evalViewItems.html',
				transclude : true
			};
		})
.directive('winWebEvalViewQuestion',
		function() {
	        return function(scope, element, attrs) {
				if($('#evaluate-main').size()<1){
					return false;
				}
				var finished=false;
				var viewed=false;
				element.on('click','button[data-id]',function(){
					if($(this).parent().find('input[type="radio"]:visible').length !== 0){
						if($(this).hasClass('down') && !$(this).parent().find('input[type="radio"]:visible').is(':checked')){
							$.alert("请完成此题！");
							return;
						}
					}
					
					if($('.form-group',$('#evaluate-form')).hasClass('ng-hide')){
						$('.form-group',$('#evaluate-form')).removeClass('ng-hide');
					}
					gotoItem($(this).data('id'));
					return false;
				});
				
				$('#btn-result',element).click(function(){
					if($(this).prev().find('.control-group:last input[type="radio"]:visible').length !== 0){
						if(!$(this).prev().find('.control-group:last input[type="radio"]:visible').is(':checked')){
							$.alert("请完成此题！");
							return;
						}
					}
					
					finished = true;
					$('a[data-toggle="tab"]',$('#evaluate-main')).eq(1).tab('show');
				});
				
				element.on('show.bs.tab','a[data-toggle="tab"]',function(){
					if($(this).attr('href')=='#tc-3'){
						if(!finished){
							$.alert('请先完成所有测试题目。');
							return false;
						}
					}
				}).on('shown.bs.tab','a[data-toggle="tab"]',function(){
					if($(this).attr('href')=='#tc-2' && !viewed){
						gotoItem(1);
					}
					viewed=true;
				});
				
				function gotoItem(i){
					var $target=$('[data-index="'+i+'"]',$('#evaluate-view'));
					if($target.size()<1){
						return false;
					}
					
					var rate=($target.index()+1)/$('#evaluate-form').children().length*100;
					
					$('#evaluate-view').animate({
						height:$target.outerHeight()+15
					},500);
					$('#evaluate-form').animate({
						marginTop:-$target.position().top
					},500,function(){
						
					});
			
					$('div.progress-bar',$('#evaluate-view').parent()).width(rate+'%');
					if(i>=$('#evaluate-form').children().length-1){
						$('#btn-result').slideDown();
					}else{
						$('#btn-result').slideUp();
					}
					
				};
			};
			
		});

});

