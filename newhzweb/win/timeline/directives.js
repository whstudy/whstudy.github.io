'use strict';

angular.module('winWeb.directives.timeline', [])
 .directive('winWebTimelineInfiStrol',['$window','$document', function($window,$document) {
	 //alert('timeline1a');
	return {
		scope : {
			option : '=',
			scroll:'&scroll'
		},
		link : function(scope, element, attrs) {
			 var range = 50;             //距下边界长度/单位px  
		        var maxnum = 20;            //设置加载最多次数  
		        var num = 1;  
		        var totalheight = 0;  
			$(window).scroll(function(){  
				var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
	            //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());  
	            //console.log("页面的文档高度 ："+$(document).height());  
	            //console.log('浏览器的高度：'+$(window).height());  
	            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);  
	            if(($(document).height()-range) <= totalheight  && num != maxnum) {  
	               scope.scroll();
	                num++;  
	            }  
	        });  		
		}
	};
}]);