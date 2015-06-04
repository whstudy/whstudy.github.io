define(['angular'],function (angular) {
	
	'use strict';

	angular.module('winWeb.directives.sport', []).directive('winWebSportSlide', ['$timeout','winWebHttpService',
	function(timer,winWebHttpService) {
		return {
	
			templateUrl : 'winwebSport.html',
			transclude : true,
			link : function(scope, element, attrs) {
				scope.$watch('sports', function(newValue, oldValue) {
					//console.log($(element).html());
					//return true;
					if (newValue != undefined) {
						var $this = $(element);
						var $desc = $('#sport-desc');
						var carousel = $this.data('owlCarousel');
						var options = {
							afterInit : function() {
								this.goTo(1);
								$('li', $this).each(function(i) {
									$('>a', $(this)).click(function() {
										carousel.goTo(i - 1);
										return false;
									});
								});
	
								var $items = this.$userItems;
								if ($items.length <= 3) {
									var cur = this.currentItem + 1;
									var $cur = $($items[cur]);
									$items.removeClass('active');
									$cur.addClass('active');
									$desc.children().hide().eq(cur - 1).fadeIn();
								}
	
							},
							afterMove : function() {
								var $items = this.$userItems;
								var cur = this.currentItem + 1;
								var $cur = $($items[cur]);
								$items.removeClass('active');
								$cur.addClass('active');
								$desc.children().hide().eq(cur - 1).fadeIn();
							},
							items : 3,
							rewindNav : false,
							pagination : false,
							navigation : false
						};
	
						if (carousel) {
							$('.owl-item,.owl-wrapper-outer,.owl-wrapper', $this).remove();
							$this.prepend('<li></li>');
							$this.append('<li></li>');
							carousel.reinit(options);
	
						} else {
							$this.owlCarousel(options);
							carousel = $this.data('owlCarousel')
						}
	
						$this.parent().on('click', '>.prev', function() {
							carousel.prev();
						});
						$this.parent().on('click', '>.next', function() {
							carousel.next();
						});
	
					}
	
				});
			}
		};
	
	}]).directive('winWebSportSearchShow', function() {
		return function(scope, element, attrs) {
			$(element).on('click', function() {
				$("#filter-sport").slideToggle();
				return false;
			});
	
		};
	}).directive('winWebSportFilter', function() {
		return function(scope, element, attrs) {
			    element.on('click','ul>li>a',function(){
	            var $a=$(this);
	            $a.parent().addClass('active-danger').siblings().removeClass('active-danger');
	            return false;
	        });
		};
	}).directive('winWebCreatePlan',function(){
		 return {
             scope:{
                 option: '='
             },
             link: function(scope, element, attrs) {
            	 element.on('click',function(){
            		 $('#sportDeatil').modal('hide');
            		 $('.modal-backdrop').hide();
            		 window.location.href = '#~/plan_create/' + scope.option;
            	 });
             }
		 };
		
	})
});