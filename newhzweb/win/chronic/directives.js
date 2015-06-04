
define(['angular'],function (angular) {
'use strict';

angular.module('winWeb.directives.chronic', [])
.directive('winWebChronicContent',
		function() {
	        return {
				scope : {
					option : '='
				},
				link : function(scope, element, attrs) {
				}
			};
		}).directive('winWebChronicWord',
				function() {
		    return {
				link : function(scope, element, attrs) {
					var colors = ['#09f','#0cf','#0cf','#0cf','#39d','#90c5f0','#90a0dd','#90c5f0','#a0ddff','#99ccee','#aab5f0'];
		        	var fs = 13+parseInt(Math.random()*25);
		        	var color = colors[parseInt(Math.random()*colors.length)];
		            element.css({
		                color:color,
		                fontSize:fs
		            });
				}
			};
		}).directive('winWebChronicShare',
				function(){
					return {
						link: function(scope,element,attrs){
							element.on('click',function(){
								console.log('share');
								var t = element.attr('id');
								var links = {
				                    	 'sina':'http://service.weibo.com/share/share.php?',
				                     	 'tx':'http://share.v.t.qq.com/index.php?c=share&a=index&',
				                      	 'qq':'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
				                 	};
								var  options = ['title='+ $('#articleId').html(),'&pic='+$('#articlePic').attr('src'),'&url='+window.location.href];
								var  parms = ['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(window.screen.width-440)/2,',top=',(window.screen.height-430)/2];
								window.open(links[t]+options.join(''),null,parms.join(''));
							});
						}
					}
		});

});
