define(['angular'],function(){
	
	'use strict';
	
	var module = angular.module('winWeb.controllers.medical',[]);
	
	module.controller('MedicalAskCtrl',['$scope','winWebHttpService','$cookies','$filter',function($scope,winWebHttpService,$cookies,$filter){
	
		$scope.date = '';//预约的 时间
		$scope.orderType = 1;// 预约类型  默认挂号
		$scope.dates = [];// 日期
		$scope.dates2 = [];// 页面现实日期
		
		$scope.pageFlag = true;
		$scope.currentPage = 1;
		$scope.maxSize = 8;
		$scope.itemsPerPage = 5;
		
		// 隐藏导航栏
		if($cookies.isMain == undefined || $cookies.isMain == 1){
			$('#main_menu li:gt(0)').show();
			$('.top-menu.pull-right').show();
			$('#healthManage').show();
		}else{
			$('#main_menu li:gt(0)').hide();
			$('.top-menu.pull-right').hide();
			$('#healthManage').hide();
		}
		
		// 咨询的医生 根据用户名获取问过医生的问题
		winWebHttpService.querywithParams('index/getDoctors',{username:$cookies.name}).then(function(data) {	
			console.log(data);
			$scope.doctors = data;	
		});
		
		
		winWebHttpService.querywithParams('index/getIssues',{username:$cookies.name,page:1}).then(function(data) {	
			console.log(data);
			$scope.issuesCount = data.count;
			$scope.questions = data.issue;
		});

		// 分页
		$scope.pageChanged = function() {
		    winWebHttpService.querywithParams('index/getIssues',{username:$cookies.name,page:$scope.currentPage}).then(function(data) {
				$scope.questions = data.issue;
			});
		 };
		
		_getDates(new Date());// 当前日期为起始值，获取一周日期

		// 选择要咨询的医生
		$scope.selectDoctor = function(id,name,online,doctorPicture){
			if(online === 1){
				$scope.doctorId = id;
				$scope.name = name;
				$scope.doctorPicture = doctorPicture;
			}
		};
		
		/*
		 * _getDates 日获取一周的日期方法
		 * startDate 起始日期
		 */
		function _getDates(startDate){
			for(var i=0; i<7;i++){
				var _nextDay = new Date(startDate.getTime() + i*24*60*60*1000);
				var _date = _nextDay.getFullYear()+'-'+(_nextDay.getMonth()+1) + '-' + _nextDay.getDate();
				var _week = ''; 
				switch(_nextDay.getDay()){
				case 0:_week="星期天";break;
				case 1:_week="星期一";break;
				case 2:_week="星期二";break;
				case 3:_week="星期三";break;
				case 4:_week="星期四";break;
				case 5:_week="星期五";break;
				case 6:_week="星期六";break;
				}
				$scope.dates.push(_date);
				$scope.dates2.push(_date.substr(5) + '<br>' + _week);
			}
		}
		
		// 根据日期获取预约数据
		var index = 1;
		$scope.changeWeeks = function(type){
			var startDate;
			$scope.date = $scope.dates[0];
			if(type ===1){
				startDate = new Date(new Date($scope.date).getTime() - 7*24*60*60*1000);
				index--;
			}else{
				startDate = new Date(new Date($scope.date).getTime() + 7*24*60*60*1000);
				index++;
			}

			$scope.dates = [];
			$scope.dates2 = [];
			
			_getDates(startDate);
			
			// 预约数据 传入起始日期
			winWebHttpService.querywithParams('ajax/orders.json',{'type':$scope.orderType,'startTime':$scope.date}).then(function(data) {	
				console.log(data);
				$scope.orders = data[index];
			});
		};
		
		
		// 选择时间
		$scope.selectDate;
		$scope.selectDateMethod = function(index,type,event){
			
			console.log(event.target);
			if(event.target.className.indexOf('xzOn')>=0){
				$(event.target).removeClass('xzOn');
				$scope.orderTime = "";
				$scope.timeZone ="";
			}else{
				$(".xzOn").removeClass('xzOn');
				$(event.target).addClass('xzOn');
				console.log("selectTime");
				console.log(index + type);
				
				// 获取时间
				var time = $scope.dates[index];
				console.log(time);
				$scope.timeZone = type;
				$scope.orderTime = time;
				$scope.timeIndex = index;
			}
		};
		
		
		$scope.newQuestion = {
			"id":null,
			"doctorName":null,
			"doctorId":null,
			"content":"",
			"answer":""
			
		},
		
		
		// 提问
		$scope.ask = function(){
			
			// 验证
			if($scope.doctorId === undefined){
				$scope.alertOption={content:"请选择医生！",show:true};
				return;
			}
			if($scope.questionContent === undefined){
				$scope.alertOption={content:"请输入您要问的问题！",show:true};
				return;
			}
			if($scope.questionContent.length <=15){
				$scope.alertOption={content:"最少不少于15个字！",show:true};
				return;
			}
			if($scope.questionContent.length > 200){
				$scope.alertOption={content:"最多不超过200个字！",show:true};
				return;
			}

			var question = angular.copy($scope.newQuestion );
			question.doctorId = $scope.doctorId;
			question.doctorName = $scope.name;
			question.content = angular.copy($scope.questionContent);
			question.picture = $scope.doctorPicture;
			question.addTime = $filter('date')(new Date(), 'yyyy-MM-dd');
			console.log(question);
			
			// 数据到后台
			
			
			winWebHttpService.querywithParams('index/saveIssue',{username:$cookies.name},question).then(function(data) {	
				console.log(data);
				$scope.questionContent = '';
				$scope.questions.unshift(question);
			});
			
			// 数据存入sessionStorage
			//sessionStorage.setItem("questions",JSON.stringify($scope.questions));
			
		};
		
		
		$scope.fnSelectUser = function(userName){
			$('.familyMenu img').tooltip('hide');
			console.log(userName);
			winWebHttpService.querywithParams('index/getDoctors',{username:$cookies.name}).then(function(data) {	
				console.log(data);
				$scope.doctors = data;	
			});
			
			
			winWebHttpService.querywithParams('index/getIssues',{username:$cookies.name,page:1}).then(function(data) {	
				console.log(data);
				$scope.questions = data.issue;
				
				$scope.pageFlag = data.count > 1 ? true : false;
			});
		};
		

		// 获取科室
		winWebHttpService.querywithParams('ajax/departments.json',{'type':$scope.orderType}).then(function(data) {	
			console.log(data);
			$scope.departments = data;
		});
		
		// 选择预约类型
		$scope.selectOrderType = function(){
			$scope.orderType;
			console.log($scope.orderType);
			if($scope.orderType == 1){
				winWebHttpService.querywithParams('ajax/departments.json',{'type':$scope.orderType}).then(function(data) {	
					console.log(data);
					$scope.departments = data;
					$scope.orderDoctors = [];
				});
			}else if($scope.orderType == 2){
				winWebHttpService.querywithParams('ajax/checkTypes.json',{'type':$scope.orderType}).then(function(data) {	
					console.log(data);
					$scope.checkTypes = data;
				});
			}
			$scope.orders = [];
		};

		// 选择科室
		$scope.changeDepartment = function(){
			console.log($scope.department);
			$scope.orders = [];
			if($scope.department == null){
				$scope.orderDoctors = [];
				return;
			}
			// 预约医生
			for(var i=0; i<$scope.departments.length; i++){
				if($scope.department.departmentId === $scope.departments[i].departmentId){
					$scope.orderDoctors = $scope.departments[i].doctors;
					return;
				}
			}	
		};

		
		/////////////////////////// 获取预约数据///////////////////////////////
		// 根据选择的预约医生获取预约数据
		$scope.changeOrderDoctor = function(){
			console.log($scope.orderDoctor);
			if($scope.orderDoctor == null){
				$scope.orders = [];
				return;
			}
			// 拿到科室 医生 查询可预约的数据
			winWebHttpService.querywithParams('ajax/orders.json',{'type':$scope.orderType,'startTime':$scope.date}).then(function(data) {	
				console.log(data);
				$scope.orders = data[$scope.orderDoctor.doctorId];
			});
			
		};
		// 根据选择的检查类型获取预约数据
		$scope.changeCheckType = function(){
			console.log($scope.checkType);
			if($scope.checkType == null){
				$scope.orders = [];
				return;
			}
			winWebHttpService.querywithParams('ajax/orders.json',{'type':$scope.orderType,'startTime':$scope.date}).then(function(data) {	
				console.log(data);
				$scope.orders = data[$scope.checkType.checkTypeId];
			});
			
		};
		
		// 预约
		$scope.order = function(){
			
			// 验证
			if($scope.orderType === 1){
				//	医生
				if($scope.orderDoctor == null){
					$scope.alertOption={content:"请选择预约医生",show:true};
					return;
				}
				$scope.alertOption={content:"",show:true};
			}else{
				if($scope.checkType == null){
					$scope.alertOption={content:"请选择检查项目",show:true};
					return;
				}
			}
			if($scope.orderTime == undefined || $scope.orderTime == ''){
				$scope.alertOption={content:"请选择预约时间",show:true};
				return;
			}
			
			// 预约数据发送后台再重新拿数据
			//winWebHttpService.querywithParams('ajax/medicalQuestions.json').then(function(data) {	
				$scope.alertOption={content:"恭喜你，预约成功！你的预约号是8888！",show:true};
				
				$scope.orders[$scope.timeZone][$scope.timeIndex] = $scope.orders[$scope.timeZone][$scope.timeIndex]-1;
				$scope.orders.morning[0] =1;
				
			//});
		};
		
	}]);
	
	
});// end of define