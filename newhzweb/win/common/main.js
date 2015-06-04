require.config({
	
  baseUrl: 'js',
  
  paths: {
       'angular' : 'angular.min',
       "angular-route":'angular-route.min',
       "angular-resource":'angular-resource.min',
	   "angular-sanitize":'angular-sanitize.min',
	   "angular-animate":'angular-animate.min',
	   "angular-locale_zh-cn":'angular-locale_zh-cn',
	   "angular-file-upload":'angular-file-upload.min',
	   "angular-bootstrap":'ui-bootstrap-0.11.0.min',
	   "angular-cookies":'angular-cookies.min',
	   'jquery':'jquery',
	   'bootstrap':'bootstrap',
	   'bootstrap-switch':'bootstrap-switch',
	   'calendario':'jquery.calendario'
  },
  shim: {
      "angular-route":{
      		deps:['angular']  		
  		},
  		"angular-resource":{
      		deps:['angular']  		
  		},
  		"angular-sanitize":{
  			deps:['angular']  		
  		},
  		"angular-animate":{
  			deps:['angular']  		
  		},
  		"angular-locale_zh-cn":{
  			deps:['angular']  		
  		},
  		"angular-file-upload":{
  			deps:['angular']  		
  		},
  		"angular-bootstrap":{
  			deps:['angular','angular-locale_zh-cn']  		
  		},
  		"angular-resource":{
  			deps:['angular']  		
  		},
  		"angular-cookies":{
      		deps:['angular']  		
  		},
	    'angular': {
	          exports : 'angular'
	     },
	     'bootstrap':{
	    	 deps:['jquery']
	     },
	     'bootstrap-switch':{
	    	 deps:['jquery']
	     }     
  }
  
});

require(['../win/common/app'], function (app) {
	
  app.init();
  
//spin
	require(['js/spin.js'],function(Spinner){
		var opts = {
	            lines: 12,
	            length: 7,
	            width: 5,
	            radius: 10,
	            color: '#ffffff',
	            speed: 1, 
	            trail: 100,
	            shadow: true
	        };
		var target = document.getElementById('spin');
		var spinner = new Spinner(opts).spin(target);
	});	
	
});