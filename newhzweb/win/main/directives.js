define(['angular'],function (angular) {

'use strict';

angular.module('winWeb.directives.main', ['ngCookies'])
.directive("winWebTooltip", function($rootScope,$cookies) {
	return {
		scope : {
			option : "="
		},
		link : function(scope, element, attrs) {
			element.tooltip({container:'.header',placement:'right'});
			element.on('click',function(){
				
				$('.familyMenu img').removeClass('select').addClass('unselect');
				element.removeClass('unselect').addClass('select');
				console.log('option:'+scope.option);
				$rootScope.evalShow = false;
				$("#monitorDetail").hide();
		 		console.log(angular.fromJson($cookies.users));
		 		var users = angular.fromJson($cookies.users);
		 		for(var i=0; i<users.length; i++){
		 			var item = users[i];
		 			
	 				// 资料完成度判断
	 				if(!item.isCompleted){
//	 					window.location.href = '#~/profile/'+item.userName;
//	 					alert('#~/profileMemberEdit/'+item.userName);
	 					window.location.href = '#~/profileMemberEdit/'+scope.option;
	 					return;
	 				}
		 			
	 				//window.location.href = '#~/index';
	 					 				
		 			if(item.userName === scope.option){
		 				item.isMain === 1 ? console.log('主显帐号') : console.log('不是主显帐号');
		 				
		 				if(item.isMain === 1){
		 					$('#main_menu li:gt(0)').show();
		 					$('.top-menu.pull-right').show();
		 				}else{
		 					$('#main_menu li:gt(0)').hide();
		 					$('.top-menu.pull-right').hide();
		 				}
		 				
		 				setTimeout(function(){
		 					$('.familyMenu img').tooltip('hide');
							$('.tooltip').hide();
		 				},0);
						
						
		 				$cookies.isMain = item.isMain;
		 				
		 				$rootScope.isMain = item.isMain === 1 ? true : false;
		 				$rootScope.name = item.userName;
		 				$cookies.name = item.userName;
		 				$rootScope.username = item.name;
		 				$cookies.username = item.name;
		 				$cookies.imgUrl = item.pic;
		 				
		 				
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
						scope.$apply();
						
						return;
		 			}
		 		}
		 		console.log($rootScope.username);
			});
		}
	};
}).directive('winWebMainFreeSlide', function() {
	return function(scope, element, attrs) {
		scope.$watch('reportData', function(newValue, oldValue) {
			if (newValue != undefined) {
				var $wrap = $(element);
				if ($wrap.size() < 1) {
					return false;
				}
				$wrap.owlCarousel({
					items : 5,
					navigation : false
				});
				 
				//get carousel instance data and store it in variable owl
				var carousel = $wrap.data('owlCarousel');
				$wrap.parent().on('click', '>.prev', function() {
					carousel.prev();
				});
				$wrap.parent().on('click', '>.next', function() {
					carousel.next();
				});
				
				//carousel.destroy();
				carousel.reinit({
					items : 5,
					navigation : false
				});
				$('.tooltips', $wrap).tooltip({
					container : 'body'
				});

				
				
				
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

		},true);

	};
});
});