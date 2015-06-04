define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.directives.search', []).directive('winWebSearchOneAnswer', function() {
	return {
		replace:true,
		templateUrl : 'oneAnswer.html',
		link : function(scope, element, attrs) {

		}
	};
}).directive('winWebSearchMultiAnswer',['winWebHttpService', function(winWebHttpService) {
	return {
		replace:true,
		templateUrl : 'multiAnswer.html',
		link : function(scope, element, attrs) {
			var word=scope.word;
			var kind=scope.kind;
			scope.currentPage = 1;
			scope.itemsPerPage = 5;
			scope.maxSize = 8;
			scope.pageChanged = function() {
				console.log(11);
				winWebHttpService.querywithParams('index/findAnswers',{kind:kind,word:word,page:scope.currentPage}).then(function(newData) {
					 
					scope.data.answers=newData.answers;
					scope.resultCounts=newData.count;
				});
			 };
		}
	};
}]).directive('winWebSearchUserdialog', function() {
	return {
		 replace:true,
		templateUrl : 'userdialog.html',
		link : function(scope, element, attrs) {
		}
	};
}).directive('winWebSearchNavChange', function() {
	return 	function(scope, element, attrs) {
		 	$(element).on('click','a',function(){
	            var $this=$(this);
	            var src='img/icon/';
	            $this.addClass('active').children('img').attr('src',src+$this.data('img')+'-active.png');
	            
	            $this.parent().siblings().each(function(){
	                var $this=$(this).children('a');
	                $this.removeClass('active')
	                    .children('img').attr('src',src+$this.data('img')+'.png');
	            });
	            return false;
	            
       		 });
	};
}).directive('winWebSearchKeyword',function(){
	return function(scope,element,attrs){
		$(element).on('mouseover',function(){
			//console.log($(this));
			$(this).parents('div').find('li').css('background-color','white').removeClass('keywordSelect');
			$(this).css('background-color','rgba(203, 196, 196, 0.79)').addClass('keywordSelect');
		});
	};
}).directive('winWebSearchKeywordSelect',function(){
	return function(scope,element,attrs){
		$(element).on('keydown',function(e){
			//console.log('KEYCODE:'+e.keyCode);
			switch(e.keyCode){
			case 38:
				console.log('top');
				if($('.keywordSelect').length === 0){
					$('.key:last').css('background-color','rgba(203, 196, 196, 0.79)').addClass('keywordSelect');
					$('#keyword').val($('.keywordSelect').html());
					scope.word = $('.keywordSelect').html();
				}else{
					$('.keywordSelect').parent().prev().find('li').css('background-color','rgba(203, 196, 196, 0.79)').addClass('keywordSelect');
					$('.keywordSelect').parent().next().find('li').css('background-color','white').removeClass('keywordSelect');
					$('#keyword').val($('.keywordSelect').html());
					scope.word = $('.keywordSelect').html();
				}
				break;
			case 40:
				console.log('bottom');
				if($('.keywordSelect').length === 0){
					$('.key:eq(0)').css('background-color','rgba(203, 196, 196, 0.79)').addClass('keywordSelect');
					$('#keyword').val($('.keywordSelect').html());
					scope.word = $('.keywordSelect').html();
				}else{
					$('.keywordSelect').parent().next().find('li').css('background-color','rgba(203, 196, 196, 0.79)').addClass('keywordSelect');
					$('.keywordSelect').parent().prev().find('li').css('background-color','white').removeClass('keywordSelect');
					$('#keyword').val($('.keywordSelect').html());
					scope.word = $('.keywordSelect').html();
				}
				break;
			}
			
		});
	};
});

});