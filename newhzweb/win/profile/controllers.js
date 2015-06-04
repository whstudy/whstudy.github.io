/**
 * 个人中心模块
 */
define(['angular'],function (angular) {

	'use strict';

	var profileControllers = angular.module('winWeb.controllers.profile', ['angularFileUpload','ui.bootstrap','ngCookies']);

	profileControllers.controller('ProfileCtrl', [ '$scope', 'winWebHttpService','$upload','$rootScope','$filter','$cookies','$routeParams',
		function($scope, winWebHttpService,$upload,$rootScope,$filter,$cookies,$routeParams) {
		
		$scope.cancleAttention=function(userName){
			// 取消关注
			winWebHttpService.querywithParams('index/cancleAttention',{target:userName}).then(function(newData) {						
				location.reload();
			});
		}	
		
		fnGetUser($routeParams.userName);	


//		alert(22222222222);
		
		winWebHttpService.querywithParams('address/findAllProvince').then(function(newData) {						
			$scope.provinces=newData;
		});
		
		
		$scope.changeProvince = function(){
			winWebHttpService.querywithParams('address/findAllByProvinceId',{provinceId:''}).then(function(newData) {						
				$scope.citys=newData;
			});
		}
		
		
		// 根据用户名获取用户信息
//		$scope.fnGetUser = function(username){
		function fnGetUser(username){
			console.log(username);			
			winWebHttpService.querywithParams('index/getProfileByUsername',{username:username}).then(function(newData) {
				console.log('2222222222222');
				console.log(newData);				
				$scope.smoke = 0;
				$scope.job = 0;
				$scope.sport = 0;
				$scope.drink = 0;
				$scope.sleep = 0;
				$scope.profile=newData;			
				if(newData.imgUrl){
					$scope.profile.imgUrl="file/processDownload?file="+newData.imgUrl;
				}else{
					$scope.profile.imgUrl="img/pro-ac-1.png";
				}
//				$rootScope.imgUrl = $scope.profile.imgUrl;
//  				$rootScope.username=$scope.profile.realnameZh;
//  				$rootScope.description = $scope.profile.description;
  				
				console.log($scope.profile);
				
				var copyDiseases = angular.copy(diseases);
				for ( var i in newData.disIds) {
					 for ( var j in copyDiseases) {
						if(copyDiseases[j].id==newData.disIds[i]){
							copyDiseases[j].checked=true;
						}
					}
				}
				var copyFamilyDiseases = angular.copy(familyDiseases);
				for ( var i in newData.familyDisIds) {
					 for ( var j in copyFamilyDiseases) {
						if(copyFamilyDiseases[j].id==newData.familyDisIds[i]){
							copyFamilyDiseases[j].checked=true;
						}
					}
				}
				
				$scope.diseases=copyDiseases;
				$scope.noDiseases = true;
				for(var i=0;i<$scope.diseases.length; i++){
					if($scope.diseases[i].checked){
						$scope.noDiseases = false;
						break;
					}
				}
				
				$scope.familyDiseases = copyFamilyDiseases;
				$scope.noFamilyDiseases = true;
				for(var i=0;i<$scope.familyDiseases.length; i++){
					if($scope.familyDiseases[i].checked){
						$scope.noFamilyDiseases = false;
						break;
					}
				}

				/*$scope.provinces = [];
				var index = 0;
				for(var i in $scope.provincesAndCitys){
					$scope.provinces.push({'name':i});
					if($scope.profile.locationName == i){
						$scope.province = $scope.provinces[index];
					}
					index++;
				}
				  
				$scope.citys = [];
				var temp = [];
				if($scope.provinces.length !== 0 && $scope.province){
					temp = $scope.provincesAndCitys[$scope.province.name];
				}
				var cityFlag = 0;
				for(var i=0; i<temp.length; i++){
					  $scope.citys.push({'name':temp[i]});
					  if(temp[i] === $scope.profile.cityName){
						  $scope.city = $scope.citys[i];
					  }
					  cityFlag++;
				}*/
								
				
				// job smoke drink sport sleep values
				for(var i=0; i<$scope.jobs.length; i++){
					if($scope.jobs[i].id === $scope.profile.jobId){
						$scope.job = $scope.jobs[i];
					}
				}
				
				for(var i=0; i<$scope.smokes.length; i++){
					if($scope.smokes[i].id === $scope.profile.smokeId){
						$scope.smoke = $scope.smokes[i];
					}
				}
			
				for(var i=0; i<$scope.sports.length; i++){
					if($scope.sports[i].id === $scope.profile.sportId){
						$scope.sport = $scope.sports[i];
					}
				}
				
				for(var i=0; i<$scope.drinks.length; i++){
					if($scope.drinks[i].id === $scope.profile.drinkId){
						$scope.drink = $scope.drinks[i];
					}
				}
				
				for(var i=0; i<$scope.sleeps.length; i++){
					if($scope.sleeps[i].id === $scope.profile.sleepId){
						$scope.sleep = $scope.sleeps[i];
					}
				}
				
			});
		}
		
		
//			$rootScope.isMain = true; // 是否为主显帐号
		
			// 疾病情况
			var diseases=[
			              {id:11, checked:false, name:'高血压'},
			              {id:12, checked:false, name:'高血脂'},
			              {id:13, checked:false, name:'冠心病'},
			              {id:6, checked:false, name:'脂肪肝'},
			              {id:17, checked:false, name:'痛风'},
			              {id:18, checked:false, name:'肥胖'},
			              {id:19, checked:false, name:'糖尿病'},
			              {id:29, checked:false, name:'贫血'},
			              {id:24, checked:false, name:'骨质疏松'},
			              {id:1, checked:false, name:'慢性胃炎'},
			              {id:2, checked:false, name:'胃食管反流'},
			              {id:3, checked:false, name:'消化性溃疡'},
			              {id:4, checked:false, name:'便秘'},
			              {id:5, checked:false, name:'慢性腹泻'},
			              {id:7, checked:false, name:'慢性肝炎'},
			              {id:8, checked:false, name:'胆囊炎'},
			              {id:9, checked:false, name:'胆结石'},
			              {id:10, checked:false, name:'肝硬化'},
			              {id:14, checked:false, name:'慢性肾病'},
			              {id:16, checked:false, name:'尿路结石'},
			              {id:20, checked:false, name:'甲亢'},
			              {id:21, checked:false, name:'哮喘'},
			              {id:22, checked:false, name:'慢性阻塞性肺病'},
			              {id:25, checked:false, name:'骨关节炎'},
			              {id:26, checked:false, name:'椎间旁突出'},
			              {id:30, checked:false, name:'肿瘤康复期'}
			             ];
			
			$scope.diseases = angular.copy(diseases);
			
			// 家族史
			var familyDiseases=[
			                    {id:1,checked:false,name:'高血压'},
			                    {id:2,checked:false,name:'糖尿病'},
			                    {id:3,checked:false,name:'冠心病'},
			                    {id:4,checked:false,name:'肥胖'},
			                    {id:5,checked:false,name:'痛风'},
			                    {id:6,checked:false,name:'肿瘤'},
			                    {id:7,checked:false,name:'中风'},
			                    {id:8,checked:false,name:'高血脂'},
			                    {id:9,checked:false,name:'骨质疏松'}
			                   ];
			$scope.familyDiseases = angular.copy(familyDiseases);			

			// job 
			$scope.jobs = [{'id':99,'name':'请选择'},
			               {'id':0,'name':'企事业高管'},
			               {'id':1,'name':'办公室职员'},
			               {'id':2,'name':'一线工人'},
			               {'id':3,'name':'教师'},
			               {'id':4,'name':'公检法人员'},
			               {'id':5,'name':'医务人员'},
			               {'id':6,'name':'外勤人员'},
			               {'id':7,'name':'特殊作业人员'},
			               {'id':8,'name':'自由职业'},
			               {'id':9,'name':'农民'},
			               {'id':10,'name':'学生'},
			               {'id':11,'name':'其他'},
			             ];
			
			// smoke 
			$scope.smokes = [
			                   {'id':99,'name':'请选择'},
				               {'id':0,'name':'无（不吸烟）'},
				               {'id':1,'name':'偶尔（平均每日少于3支）'},
				               {'id':2,'name':'一般（平均每日少于10支）'},
				               {'id':3,'name':'嗜好（平均每日10支以上）'},
				               {'id':4,'name':'最近一个月刚戒烟'}
			             ];
			
			//drink 
			$scope.drinks = [{'id':99,'name':'请选择'},
				               {'id':0,'name':'无（不喝酒）'},
				               {'id':1,'name':'偶尔（平均每日少于1两白酒或1瓶啤酒）'},
				               {'id':2,'name':'一般（平均每日少于3两白酒或3瓶啤酒）'},
				               {'id':3,'name':'嗜好（平均每日3两白酒或3瓶啤酒以上）'},
				            ];
			
			// sport 
			$scope.sports = [{'id':99,'name':'请选择'},
				               {'id':0,'name':'从不运动或者每天运动时间不足10分钟，或运动时心率低于110次/分钟'},
				               {'id':1,'name':'运动偏少，平均每日运动时间不足30分钟'},
				               {'id':2,'name':'经常运动，平均每天运动时间超过30分钟且运动时心率大于110次/分钟'},
				               {'id':3,'name':'运动过量，连续大运动量或运动量增加过快导致全身乏力、运动性头痛等'},
				          ];
			
			// sleep 
			$scope.sleeps = [{'id':99,'name':'请选择'},
				               {'id':0,'name':'睡眠时间保证或睡觉醒来精力充沛'},
				               {'id':1,'name':'入睡困难，入睡时间超过30分钟'},
				               {'id':2,'name':'每日睡眠时间不足6小时'},
				               {'id':3,'name':'睡眠时间充足，但醒来后身体疲劳感还是没有得到改善'},
				          ];
			// address
			$scope.provincesAndCitys = {
					"北京": ["北京"],
					"广东": ["广州", "深圳", "珠海", "汕头", "韶关", "佛山", "江门", "湛江", "茂名", "肇庆", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"],
					"上海": ["上海"],
					"天津": ["天津"],
					"重庆": ["重庆"],
					"辽宁": ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
					"江苏": ["南京", "苏州", "无锡", "常州", "镇江", "南通", "泰州", "扬州", "盐城", "连云港", "徐州", "淮安", "宿迁"],
					"湖北": ["武汉", "黄石", "十堰", "荆州", "宜昌", "襄樊", "鄂州", "荆门", "孝感", "黄冈", "咸宁", "随州", "恩施土家族苗族自治州", "仙桃", "天门", "潜江", "神农架林区"],
					"四川": ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"],
					"陕西": ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"],
					"河北": ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"],
					"山西": ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
					"河南": ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店", "焦作"],
					"吉林": ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边朝鲜族自治州"],
					"黑龙江": ["哈尔滨", "齐齐哈尔", "鹤岗", "双鸭山", "鸡西", "大庆", "伊春", "牡丹江", "佳木斯", "七台河", "黑河", "绥化", "大兴安岭地区"],
					"内蒙古": ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "锡林郭勒盟", "兴安盟", "阿拉善盟"],
					"山东": ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州", "聊城", "滨州", "菏泽"],
					"安徽": ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳", "宿州", "巢湖", "六安", "亳州", "池州", "宣城"],
					"浙江": ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"],
					"福建": ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"],
					"湖南": ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西土家族苗族自治州"],
					"广西": ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左"],
					"江西": ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"],
					"贵州": ["贵阳", "六盘水", "遵义", "安顺", "铜仁地区", "毕节地区", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"],
					"云南": ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "大理白族自治州", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州"],
					"西藏": ["拉萨", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区"],
					"海南": ["海口", "三亚", "五指山", "琼海", "儋州", "文昌", "万宁", "东方", "澄迈县", "定安县", "屯昌县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"],
					"甘肃": ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "酒泉", "张掖", "庆阳", "平凉", "定西", "陇南", "临夏回族自治州", "甘南藏族自治州"],
					"宁夏": ["银川", "石嘴山", "吴忠", "固原", "中卫"],
					"青海": ["西宁", "海东地区", "海北藏族自治州", "海南藏族自治州", "黄南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
					"新疆": ["乌鲁木齐", "克拉玛依", "吐鲁番地区", "哈密地区", "和田地区", "阿克苏地区", "喀什地区", "克孜勒苏柯尔克孜自治州", "巴音郭楞蒙古自治州", "昌吉回族自治州", "博尔塔拉蒙古自治州", "石河子", "阿拉尔", "图木舒克", "五家渠", "伊犁哈萨克自治州"],
					"香港": ["中西区", "湾仔区", "东区", "南区", "深水埗区", "油尖旺区", "九龙城区", "黄大仙区", "观塘区", "北区", "大埔区", "沙田区", "西贡区", "元朗区", "屯门区", "荃湾区", "葵青区", "离岛区"],
					"澳门": ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路凼"],
					"台湾": ["台北市", "高雄市", "台北县", "桃园县", "新竹县", "苗栗县", "台中县", "彰化县", "南投县", "云林县", "嘉义县", "台南县", "高雄县", "屏东县", "宜兰县", "花莲县", "台东县", "澎湖县", "基隆市", "新竹市", "台中市", "嘉义市", "台南市"]
				};
			
			
			// 获取家庭成员
			winWebHttpService.querywithParams('index/getFamilyUsers',{userName:$cookies.name}).then(function(newData) {
				$scope.familyUsers = newData;												
				if($routeParams.id){
					for(var i=0; i<$scope.familyUsers.length; i++){
						if($scope.familyUsers[i].userName == $routeParams.id){
							$scope.familyUsers[i].active = true;
							break;
						}
					}
				}else{
					$scope.familyUsers[0].active = true;
					$cookies.users = angular.toJson(newData);
					$cookies.name = newData[0].userName;
				}

			});
			
			// 新增用户下一步
			$scope.fnAddUserNext = function(){
				// 跳转之前先验证
				$('.panel-heading.tab-bg-green li:eq(1) a').tab('show');
				scroll(0,0);
			};
			
			// 根据用户名获取用户信息
//			$scope.fnGetUser = function(username){
//				console.log(username);
//				$scope.addUserFlag = false;
//				$('.panel-heading.tab-bg-green li:eq(0) a').tab('show');
//				$cookies.name = username;
//				
//				winWebHttpService.querywithParams('index/getProfileByUsername',{username:username}).then(function(newData) {
//					console.log(newData);
//					$scope.smoke = 0;
//					$scope.job = 0;
//					$scope.sport = 0;
//					$scope.drink = 0;
//					$scope.sleep = 0;
//					$scope.profile=newData;			
//					if(newData.imgUrl){
//						$scope.profile.imgUrl="file/processDownload?file="+newData.imgUrl;
//					}else{
//						$scope.profile.imgUrl="img/pro-ac-1.png";
//					}
//					$rootScope.imgUrl = $scope.profile.imgUrl;
//	  				$rootScope.username=$scope.profile.realnameZh;
//	  				$rootScope.description = $scope.profile.description;
//	  				
//					console.log($scope.profile);
//					
//					var copyDiseases = angular.copy(diseases);
//					for ( var i in newData.disIds) {
//						 for ( var j in copyDiseases) {
//							if(copyDiseases[j].id==newData.disIds[i]){
//								copyDiseases[j].checked=true;
//							}
//						}
//					}
//					var copyFamilyDiseases = angular.copy(familyDiseases);
//					for ( var i in newData.familyDisIds) {
//						 for ( var j in copyFamilyDiseases) {
//							if(copyFamilyDiseases[j].id==newData.familyDisIds[i]){
//								copyFamilyDiseases[j].checked=true;
//							}
//						}
//					}
//					
//					$scope.diseases=copyDiseases;
//					console.log('*******************************************************');
//					console.log($scope.diseases);
//					$scope.noDiseases = true;
//					for(var i=0;i<$scope.diseases.length; i++){
//						if($scope.diseases[i].checked){
//							$scope.noDiseases = false;
//							break;
//						}
//					}
//					
//					$scope.familyDiseases = copyFamilyDiseases;
//					$scope.noFamilyDiseases = true;
//					for(var i=0;i<$scope.familyDiseases.length; i++){
//						if($scope.familyDiseases[i].checked){
//							$scope.noFamilyDiseases = false;
//							break;
//						}
//					}
//
//					$scope.provinces = [];
//					var index = 0;
//					for(var i in $scope.provincesAndCitys){
//						$scope.provinces.push({'name':i});
//						if($scope.profile.locationName == i){
//							$scope.province = $scope.provinces[index];
//						}
//						index++;
//					}
//					  
//					$scope.citys = [];
//					var temp = [];
//					if($scope.provinces.length !== 0 && $scope.province){
//						temp = $scope.provincesAndCitys[$scope.province.name];
//					}
//					var cityFlag = 0;
//					for(var i=0; i<temp.length; i++){
//						  $scope.citys.push({'name':temp[i]});
//						  if(temp[i] === $scope.profile.cityName){
//							  $scope.city = $scope.citys[i];
//						  }
//						  cityFlag++;
//					}
//					
//					// job smoke drink sport sleep values
//					for(var i=0; i<$scope.jobs.length; i++){
//						if($scope.jobs[i].id === $scope.profile.jobId){
//							$scope.job = $scope.jobs[i];
//						}
//					}
//					
//					for(var i=0; i<$scope.smokes.length; i++){
//						if($scope.smokes[i].id === $scope.profile.smokeId){
//							$scope.smoke = $scope.smokes[i];
//						}
//					}
//				
//					for(var i=0; i<$scope.sports.length; i++){
//						if($scope.sports[i].id === $scope.profile.sportId){
//							$scope.sport = $scope.sports[i];
//						}
//					}
//					
//					for(var i=0; i<$scope.drinks.length; i++){
//						if($scope.drinks[i].id === $scope.profile.drinkId){
//							$scope.drink = $scope.drinks[i];
//						}
//					}
//					
//					for(var i=0; i<$scope.sleeps.length; i++){
//						if($scope.sleeps[i].id === $scope.profile.sleepId){
//							$scope.sleep = $scope.sleeps[i];
//						}
//					}
//					
//				});
//			};
			
			$scope.addUserFlag = false;
			// 创建用户
			$scope.fnAddUser = function(username){
				console.log('创建用户');
				console.log(username);
				$scope.addUserFlag = true;
			};
			
			var url = $routeParams.id ? 'index/getProfileByUsername' : 'index/getProfile';
			winWebHttpService.querywithParams(url,{username:$routeParams.id}).then(function(newData) {
					console.log(newData);
					$scope.profile=newData;	
					
					$scope.province=newData.location;
					
					
					if(newData.imgUrl){
						$scope.profile.imgUrl="file/processDownload?file="+newData.imgUrl;
					}else{
						$scope.profile.imgUrl="img/pro-ac-1.png";
					}
					
					$rootScope.imgUrl = $scope.profile.imgUrl;
	  				$rootScope.username=$scope.profile.realnameZh;
	  				$rootScope.description = $scope.profile.description;
					
					console.log($scope.profile);
					var copyDiseases = angular.copy(diseases);
					for ( var i in newData.disIds) {
						 for ( var j in copyDiseases) {
							if(copyDiseases[j].id==newData.disIds[i]){
								copyDiseases[j].checked=true;
							}
						}
					}
					var copyFamilyDiseases = angular.copy(familyDiseases);
					for ( var i in newData.familyDisIds) {
						 for ( var j in copyFamilyDiseases) {
							if(copyFamilyDiseases[j].id==newData.familyDisIds[i]){
								copyFamilyDiseases[j].checked=true;
							}
						}
					}
					
					$scope.diseases=copyDiseases;
					$scope.noDiseases = false;
                    if(newData.disIds[0]==0){
                        $scope.noDiseases = true;
                    }
					for(var i=0;i<$scope.diseases.length; i++){
						if($scope.diseases[i].checked){
							$scope.noDiseases = false;
							break;
						}
					}
					
					$scope.familyDiseases = copyFamilyDiseases;
					$scope.noFamilyDiseases = false;
                    if(newData.familyDisIds[0]==0){
                        $scope.noFamilyDiseases = true;
                    }
					for(var i=0;i<$scope.familyDiseases.length; i++){
						if($scope.familyDiseases[i].checked){
							$scope.noFamilyDiseases = false;
							break;
						}
					}

					/*$scope.provinces = [];
					var index = 0;
					for(var i in $scope.provincesAndCitys){
						$scope.provinces.push({'name':i});
						if($scope.profile.locationName == i){
							$scope.province = $scope.provinces[index];
						}
						index++;
					}
					  
					$scope.citys = [];
					var temp = [];
					if($scope.provinces.length !== 0 && $scope.province){
						temp = $scope.provincesAndCitys[$scope.province.name];
					}
					var cityFlag = 0;
					for(var i=0; i<temp.length; i++){
						  $scope.citys.push({'name':temp[i]});
						  if(temp[i] === $scope.profile.cityName){
							  $scope.city = $scope.citys[i];
						  }
						  cityFlag++;
					}*/

					// job smoke drink sport sleep values
					for(var i=0; i<$scope.jobs.length; i++){
						if($scope.jobs[i].id === $scope.profile.jobId){
							$scope.job = $scope.jobs[i];
						}
					}
					
					for(var i=0; i<$scope.smokes.length; i++){
						if($scope.smokes[i].id === $scope.profile.smokeId){
							$scope.smoke = $scope.smokes[i];
						}
					}
				
					for(var i=0; i<$scope.sports.length; i++){
						if($scope.sports[i].id === $scope.profile.sportId){
							$scope.sport = $scope.sports[i];
						}
					}
					
					for(var i=0; i<$scope.drinks.length; i++){
						if($scope.drinks[i].id === $scope.profile.drinkId){
							$scope.drink = $scope.drinks[i];
						}
					}
					
					for(var i=0; i<$scope.sleeps.length; i++){
						if($scope.sleeps[i].id === $scope.profile.sleepId){
							$scope.sleep = $scope.sleeps[i];
						}
					}
				
			});// get profile end
			
			/*$scope.changeProvince = function(){
			  $scope.citys = [];
			  if($scope.province == null){
				  return;
			  }
			  var temp = $scope.provincesAndCitys[$scope.province.name];
			  for(var i=0; i<temp.length; i++){
				  $scope.citys.push({'name':temp[i]}); 
			  }
			  if($scope.citys.length === 1){
				  console.log(11111);
				  $scope.city = $scope.citys[0];
			  }
			};*/

			$scope.addUser=function(){
				$scope.profile.birthday=$filter('date')($scope.profile.birthday, "yyyy-MM-dd");
				
				var users = angular.fromJson($cookies.users);
				for(var i=0; i<users.length; i++){
						if(users[i].isMain === 1){
							$cookies.name = users[i].userName;
							break;
						}
				}
				
				var disIds=[];
				for ( var id in $scope.diseases) {
					if($scope.diseases[id].checked==true){
						disIds.push($scope.diseases[id].id);
					}
				}
				
				var familyDisIds=[];
				for ( var id in $scope.familyDiseases) {
					if($scope.familyDiseases[id].checked==true){
						familyDisIds.push($scope.familyDiseases[id].id);
					}
				}
				
				var jobid = '';
				if($scope.job){
					jobid = $scope.job.id;
				}
				
				// 数据验证
				
				var health={
						nickname:$scope.profile.nickname,
						realnameZh:$scope.profile.realnameZh,
						idCode:$scope.profile.idCode,
						birthday:$scope.profile.birthday,
						description:$scope.profile.description,
						gender:$scope.profile.gender,
						locationName:$scope.province ? $scope.province.name : '',
						cityName:$scope.province && $scope.city? $scope.city.name:'',
						email:$scope.profile.email,
						mobile:$scope.profile.mobile,
						password:$scope.profile.password,
						name:$scope.profile.username,
						tall:$scope.profile.tall,
						weight:$scope.profile.weight,
						isPregnant:$scope.profile.isPregnant ? $scope.profile.isPregnant : 0,
						pregnatWeeks:$scope.profile.pregnatWeeks,
						operationHis:$scope.profile.operationHis,
						disIds:disIds,
						jobId:jobid,
						smokeId:$scope.smoke ? $scope.smoke.id : '',
						drinkId:$scope.drink ? $scope.drink.id : '',
						sportId:$scope.sport ? $scope.sport.id : '',
						sleepId:$scope.sleep ? $scope.sleep.id : '',
						familyDisIds:familyDisIds?familyDisIds : '',
						createUsername:$cookies.name
					};
				
				console.log(health);
				
				winWebHttpService.querywithParams('index/addUser',health).then(function(newData) {
					//$scope.alertOption={content:"创建用户成功",show:true};
					var msg = newData.errMsg; 
					console.log(newData);
            		$scope.alertOption={content:msg,show:true};
            		
            		// 获取家庭成员
        			winWebHttpService.querywithParams('index/getFamilyUsers',{userName:$cookies.name}).then(function(newData) {
        				console.log(newData);
        				$scope.familyUsers = newData;
        			});

				},function(){
					$scope.alertOption={content:"创建用户失败",show:true};
				});
			};
			
			$scope.submitPerson=function(){
				
				if($("#tc_profile_1>form .tooltip-inner").length>0){
					$scope.alertOption={content:"请填写有效信息",show:true};
					return;
				}
				
				$scope.profile.birthday = $filter('date')($scope.profile.birthday, "yyyy-MM-dd");
				var health={nickname:$scope.profile.nickname,realnameZh:$scope.profile.realnameZh,
						idCode:$scope.profile.idCode,birthday:$scope.profile.birthday,description:$scope.profile.description,
						gender:$scope.profile.gender,
						locationName:$scope.province ? $scope.province.name : '',
						cityName:$scope.province && $scope.city? $scope.city.name:'',
						email:$scope.profile.email,
						mobile:$scope.profile.mobile,
						username:$cookies.name
					};
				console.log(health);
				winWebHttpService.querywithParams('index/updateProfilePerson',health).then(function(newData) {
					$scope.alertOption={content:"数据更新成功",show:true};
	  				$rootScope.username=$scope.profile.realnameZh;
	  				$rootScope.description = $scope.profile.description;
	  				$rootScope.imgUrl = $scope.profile.imgUrl;
					
				},function(){
					$scope.alertOption={content:"数据更新失败",show:true};
				});
			};
			$scope.submitContact=function(){
				var contact={email:$scope.profile.email,qq:$scope.profile.qq,
						weibo:$scope.profile.weibo,weixin:$scope.profile.weixin,mobile:$scope.profile.mobile};
				winWebHttpService.querywithParams('index/updateProfileContact',contact).then(function(newData) {
					$scope.alertOption={content:"数据更新成功",show:true};
				},function(){
					$scope.alertOption={content:"数据更新失败",show:true};
				});
			};
			$scope.submitHealth=function(){
				console.log('验证');
				if(!$('#tc_profile_3>form').valid()){
					$scope.alertOption={content:"请填写有效信息",show:true};
					return;
				}
				
				var disIds=[];
				for ( var id in $scope.diseases) {
					if($scope.diseases[id].checked==true){
						disIds.push($scope.diseases[id].id);
					}
				}
                if(!$scope.noDiseases&&disIds.length==0){
                    disIds=[99]
                }
				if(disIds.length ===0) disIds.push('0');
				
				var familyDisIds=[];
				for ( var id in $scope.familyDiseases) {
					if($scope.familyDiseases[id].checked==true){
						familyDisIds.push($scope.familyDiseases[id].id);
					}
				}
                if(!$scope.noFamilyDiseases&&familyDisIds.length==0){
                    familyDisIds=[99]
                }
				if(familyDisIds.length === 0 ) familyDisIds.push('0');

				
				console.log($scope.familyDiseases);
				
				var jobid = '';
				if($scope.job){
					jobid = $scope.job.id;
				}
				
				var healthJson = {
						tall:$scope.profile.tall,
						weight:$scope.profile.weight,
						isPregnant:$scope.profile.isPregnant,
						pregnatWeeks:$scope.profile.pregnatWeeks,
						operationHis:$scope.profile.operationHis,
						disIds:disIds,
						jobId:jobid,
						smokeId:$scope.smoke ? $scope.smoke.id : '',
						drinkId:$scope.drink ? $scope.drink.id : '',
						sportId:$scope.sport ? $scope.sport.id : '',
						sleepId:$scope.sleep ? $scope.sleep.id : '',
						familyDisIds:familyDisIds,
						username:$cookies.name
				};
				console.log(healthJson);
				winWebHttpService.querywithParams('index/updateProfileHeath',healthJson).then(function(newData) {
					$scope.alertOption={content:"数据更新成功",show:true};
					$rootScope.username=$scope.profile.realnameZh;
	  				$rootScope.description = $scope.profile.description;
	  				$rootScope.imgUrl = $scope.profile.imgUrl;
				},function(){
					$scope.alertOption={content:"数据更新失败",show:true};
				});
			};
			
			/**
			 * 修改密码 
			 */
			$scope.submitSafety=function(){
				
				if(!$('#tc_profile_4>form').valid()){
					$scope.alertOption={content:"请填写有效信息",show:true};
					return;
				}
				
				winWebHttpService.querywithParams('index/updateProfileSafety',{'currentPwd':$scope.currentPwd,'newPwd':$scope.newPwd,'userName':$cookies.name}).then(function(newData) {
					$scope.alertOption={content:newData.errMsg,show:true};
					$scope.currentPwd = '';
					$scope.newPwd = '';
					$scope.confirmwd = '';
				},function(){
					$scope.alertOption={content:"数据更新失败",show:true};
				});
			};
			
			$scope.onFileSelect = function($files) {
			    for (var i = 0; i < $files.length; i++) {
			      var file = $files[i];
			      $scope.upload = $upload.upload({
			    	url: 'index/uploadUserPic',
			        file: file, 
			        data: {username:$cookies.name}
			      }).progress(function(evt) {
			    	 $scope.uploadState='正在上传，完成'+parseInt(100.0 * evt.loaded / evt.total)+'%';
			    	 console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			      }).success(function(data, status, headers, config) {
			    	 console.log(data);
			    	 var imgUrl=data.slice(1,data.length-1);//去掉前后引号
					 $scope.profile.imgUrl="file/processDownload?file="+imgUrl;
					 $rootScope.imgUrl="file/processDownload?file="+imgUrl;
					 document.cookie = "imgUrl="+escape($rootScope.imgUrl)+";expires=0";
					 //$rootScope.$digest();
			      });
			    }
			  };
			  $scope.open = function($event) {
				    $event.preventDefault();
				    $event.stopPropagation();
				    $scope.opened = true;
			  };
			  
			  $scope.noDiseasesMethod = function(){
				  for ( var i=0;i<$scope.diseases.length; i++) {
					  $scope.diseases[i].checked = false;
				  }
			  };
			  
			  $scope.noFamilyDiseasesMethod = function(){
				  for ( var i=0;i<$scope.familyDiseases.length; i++) {
					  $scope.familyDiseases[i].checked = false;
				  }
			  };
			  
			  $scope.fnVlidateConfirmPwd = function(){
					if($scope.profile.password != $scope.profile.confirmPwd){
						$scope.confirmPwdMsg = "两次密码不同";
					}else{
						$scope.confirmPwdMsg = "";
					}
			  };
			  
			  // 注册
			  $scope.fnRegister = function(){
				  console.log('注册');
				  console.log($scope.newName);
				  console.log($scope.newIdCode);
				  console.log($scope.newPassword);
				  console.log($scope.newConfirmPassword);
				  
				  var newUser={
							realnameZh:$scope.newName,
							idCode:$scope.newIdCode,
							password:$scope.newPassword,
							createUsername:$cookies.name
				  	};
				  
				  winWebHttpService.querywithParams('index/addUser',newUser).then(function(newData) {
	            		$scope.alertOption={content:newData.errMsg,show:true};
	            		if(newData.errCode === 0){
	            			window.location.reload();
	            		}
	            		
				  },function(){
						$scope.alertOption={content:"创建用户失败",show:true};
				  });
				  
			  };
			  
			  
			  
			  
		} ]);
});
