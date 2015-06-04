/**
 * 指标指令
 */
define(['angular'],function (angular) {
	
	'use strict';

angular.module('winWeb.directives.monitor', ['ngCookies']).directive('winWebDMonitorChart', ['$timeout', 'winWebHttpService','$rootScope','$filter','$cookies',
function($timeout, winWebHttpService,$rootScope,$filter,$cookies) {	
	return {
		scope : {
			option : '='
		},
		templateUrl : 'win/template/monitor.html',
		link : function(scope, element, attrs) {
			var shousuoyaRange ={
					"type": ["success","warning","danger"],
					"value": [ 85,100,140],
					"min": 0,
					'max':140
			};
			var xueyaRange ={
					"type": ["success","warning","danger"],
					"value": [130,160,300],
					"min": 0,
					'max':300
			};
			var  danguchunRange={
					"type": ["warning","success","danger"],
					"value": [3.11,5.18,10],
					"min": 0.01,
					'max':10
			};
			var  ganyouRange={
					"type": ["warning","success","danger"],
					"value": [0.22,1.65,5],
					"min": 0,
					'max':5
			};
			var  maiboRange={
					"type": ["warning","success","danger"],
					"value": [60,100,200],
					"min": 0,
					'max':200
			};
			var  kongfuBloodRange={
					"type": ["warning","success","danger"],
					"value": [3.89,6.1,15],
					"min": 0.01,
					'max':15
			};
			var  canhouBloodRange={
					"type": ["warning","success","danger"],
					"value": [3.89,7.78,25],
					"min": 0.01,
					'max':25
			};			
			var chart = echarts.init($('#monitor-stat')[0]);
			chart.clear();
			function getStat(sections, value) {
				var ret;
				var i;
				for ( i = 0; i < sections.value.length; i++) {
					if (value < sections.value[i]) {
						break;
					}
				}
				ret = {
					name : sections.name[i],
					type : sections.type[i],
					h2 : sections.h2[i],
					p : sections.p[i]
				};

				return ret;
			}
			function calRange(sections) {
				var range = [];
				var _last = sections.min;
				for (var k in sections.value) {
					range.push((sections.value[k] - _last) / sections.max * 100);
					_last = sections.value[k];
				}
				return range;
			}
			function calUnit(name) {				
				var unit="";
				if(name=='血压'){
					unit='mmHg';
				}else if(name=='空腹血糖'||name=='餐后血糖' || name=='血清总胆固醇'||name=='血清甘油三酯'||name=='血尿素'){
					unit='mmol/L';
				}else if(name=='体重'){
					unit='kg';
				}else if(name=='脉搏'){
					unit='次/分';
				}else if(name=='白蛋白'){
					unit='g/L';
				}else if(name=='血肌酐'||name=='血尿酸'){
					unit = 'μmol/L';
				}else if(name == '谷丙转移酶（ALT）' || name == '谷草转移酶（AST）'){
					unit =  'U/L';
				}else if(name=='腰臀比'){
					unit='cm';
				}else if(name == '血氧'){
					unit = '%';
				}
				return unit;
			}
			function renderData(index, name, value) {					
				scope.data={
						"stat": {"num":0,"name":"","h2":"","type":""},
						"sections": {},
						"name": "",
						"value":"",
						"percent":0
				};
				
				var result=scope.data;												
				var monitorName=scope.monitorName;
				var params=scope.$parent.params;//当前点击的指标数据
				if(monitorName=='血压'){
					
					scope.data1={};
					scope.data1.sections=shousuoyaRange;
					scope.data1.sections.range=calRange(shousuoyaRange);
					scope.data1.name=params[1][0];
					scope.data1.value=params[1][2];
					scope.data1.percent=scope.data1.value / shousuoyaRange.max * 100;
					result.stat.num=2;//子指标个数
					result.sections=xueyaRange;	
					result.sections.range=calRange(xueyaRange);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / xueyaRange.max * 100;
					var sz=parseFloat(params[1][2]);//舒张压
					var ss=parseFloat(params[0][2]);//收缩压
					var highyaP="<p>血压升高存在生理性和病理性升高两种情况</p><p>生理性升高可能见于</p><p>1、随着年龄的增长，血压也有可能会升高；</p>"
								+"<p>2、食盐摄入过多、钾摄入过低或者饱和脂肪酸摄入越高可能会引起血压增高；<p>"
								+"<p>3、体重超重或者肥胖，腰围超过正常值，腹部脂肪聚集多；<p>"
								+"<p>4、长期过量饮酒或者饮烈度酒；<p>"
								+"<p>5、人在长期精神紧张、压力、焦虑或长期环境噪音、视觉刺激下也可引起高血压<p>"
								+"<p>6、家族遗传，双亲均有高血压的正常血压子女，以后发生高血压的比例增高；<p>"
								+"<p>7、高强度体力活动或者运动过后。<p>";
					 
					
					if(ss >=90 && ss< 120 && sz >=60 && sz < 80){
						result.stat.name="正常";
						result.stat.h2="理想血压";
						result.stat.type="success";
						result.stat.p="理想血压：恭喜，您的血压非常理想";
					}else if( ss >= 150 && sz <90 ){
						result.stat.name="偏高";
						result.stat.h2="单纯收缩期高血压";
						result.stat.type="danger";
						result.stat.p=highyaP;
					}else if( ss >= 140 && ss < 150 && sz < 90 ){
						result.stat.name="偏高";
						result.stat.h2="亚组：临界收缩期高血压";
						result.stat.type="danger";
						result.stat.p=highyaP;
					}else if( ss >= 180 || sz >= 110 ){
						result.stat.name="偏高";
						result.stat.h2="Ⅲ级高血压（重度）";
						result.stat.type="danger";
						result.stat.p=highyaP;
					}else if( ss >= 160 && ss < 180 || sz >= 100 && sz < 110 ){
						result.stat.name="偏高";
						result.stat.h2="Ⅱ级高血压（中度）";
						result.stat.type="danger";
						result.stat.p=highyaP;
					}else if( ss >= 150 && ss < 160 || sz >= 95 && sz < 100 ){
						result.stat.name="偏高";
						result.stat.h2="Ⅰ级高血压（轻度）";
						result.stat.type="danger";
						result.stat.p=highyaP;
					}else if( ss >= 140 && ss < 150 || sz >= 90 && sz < 95 ){
						result.stat.name="偏高";
						result.stat.h2="亚组：临界高血压";
						result.stat.type="danger";
						result.stat.p=highyaP;
					}else if( ss >= 130 && ss < 140 || sz >= 85 && sz < 90 ){
						result.stat.name="正常";
						result.stat.h2="正常高值";
						result.stat.type="success";
						result.stat.p='正常高值：您的血压虽然正常，但已处于临界范围，需提高警惕！';
					}else if( ss >= 120 && ss < 130 || sz >= 80 && sz < 85 ){
						result.stat.name="正常";
						result.stat.h2="正常血压";
						result.stat.type="success";
						result.stat.p='正常血压：恭喜，您的血压正常！';
					}else if((ss < 90 && sz < 60) || ( sz>0 && sz<60 && ss>90 && ss<120) || (60>0 && sz<80 && ss>0 && ss<90)){
						result.stat.name="偏低";
						result.stat.h2="血压偏低";
						result.stat.type="warning";
						result.stat.p='<p>血压偏低可能存在生理性降低和病理性降低两种情况。<p>'
							+'<p>1.生理性低血压状态<p>'
							+'<p>除血压偏低外，人体各系统器官无缺血和缺氧等异常，也不影响寿命。<p>'
							+'<p>2.病理性低血压病<p>'
							+'<p>除血压降低外，常伴有不同程度的症状以及某些疾病。<p>'
							+'<p>（1）原发性低血压病，多见于体质瘦弱的老人、女性。<p>'
							+'<p>（2）继发性低血压病，可在短期内迅速发生，如大出血、急性心肌梗死、严重创伤、感染、过敏等原因所致血压急剧降低。大多数情况下，低血压为缓慢发生，可逐渐加重，如继发于严重的肺结核、恶性肿瘤、营养不良、恶病质等的低血压。 <p>';
					}
				}else if(monitorName=='血清总胆固醇'){
					result.stat.num=1;				
					result.sections=danguchunRange;					
					result.sections.range=calRange(danguchunRange);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / danguchunRange.max * 100;
					var value=parseFloat(params[0][2]);// 值
					if (value>5.18 && value <= 6.47) {
						result.stat.type="danger";
						result.stat.name="偏高";
						result.stat.h2="血清总胆固醇轻度增高";
						result.stat.p="<p>1、正常的生理水平规律：血清总胆固醇水平可随年龄上升而增高，70岁以后开始逐渐下降；中青年期女性低于男性，50岁后女性略高于男性。<p><p>2、与疾病的部分相关性：高胆固醇症、甲状腺机能减退、糖尿病等存在血清总胆固醇升高的可能。<p>  ";
					}else if(value > 6.47 && value <= 7.75) {
						result.stat.type="danger";
						result.stat.name="偏高";
						result.stat.h2="高胆固醇血症";
						result.stat.p = "<p>1、正常的生理水平规律：血清总胆固醇水平可随年龄上升而增高，70岁以后开始逐渐下降；中青年期女性低于男性，50岁后女性略高于男性。<p><p>2、与疾病的部分相关性：高胆固醇症、甲状腺机能减退、糖尿病等存在血清总胆固醇升高的可能。<p> " ;
					}else if(value > 7.75) {
						result.stat.type="danger";
						result.stat.name="偏高";
						result.stat.h2="严重高胆固醇血症";
						result.stat.p = "<p>1、正常的生理水平规律：血清总胆固醇水平可随年龄上升而增高，70岁以后开始逐渐下降；中青年期女性低于男性，50岁后女性略高于男性。<p><p>2、与疾病的部分相关性：高胆固醇症、甲状腺机能减退、糖尿病等存在血清总胆固醇升高的可能。<p> " ;
					}else if(value >= 3.11 && value <= 5.18) {
						result.stat.type="success";
						result.stat.name="正常";
						result.stat.h2="血清总胆固醇正常";
						result.stat.p = "恭喜，您的血清总胆固醇正常" ;
					}else if(value < 3.11){
						result.stat.type="warning";
						result.stat.name="偏低";
						result.stat.h2="血清胆固醇偏低";
						result.stat.p="血清总胆固醇降低可能见于营养不良、慢性消耗性疾病等，低胆固醇症、甲亢等也可引起总胆固醇降低。";
					}
					
				}else if(monitorName=='血清甘油三酯'){
					result.stat.num=1;				
					result.sections=ganyouRange;					
					result.sections.range=calRange(ganyouRange);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / ganyouRange.max * 100;
					var value=parseFloat(params[0][2]);// 值
					if (value > 1.65 && value < 2.26) {
						result.stat.type="danger";
						result.stat.name="偏高";
						result.stat.h2="血清甘油三酯偏高";
						result.stat.p="<p>1、饮食原因：长期高脂、高热、高糖、酗酒等不良饮食习惯，会带来血清甘油三脂的增高。<p><p>2、与疾病的部分相关性：高甘油三酯症、糖尿病、甲状腺功能减退、肾病综合征等存在引起血清甘油三脂升高的可能。<p> ";
					} else if (value >= 2.26) {
						result.stat.type="danger";
						result.stat.name="偏高";
						result.stat.h2="血清甘油三酯较高";
						result.stat.p="<p>1、饮食原因：长期高脂、高热、高糖、酗酒等不良饮食习惯，会带来血清甘油三脂的增高。<p><p>2、与疾病的部分相关性：高甘油三酯症、糖尿病、甲状腺功能减退、肾病综合征等存在引起血清甘油三脂升高的可能。<p> ";
					} else if(value >= 0.22 && value <= 1.65) {
						result.stat.type="success";
						result.stat.name="正常";
						result.stat.h2="血清甘油三酯正常";
						result.stat.p="恭喜，您的血清甘油三酯正常！";
					}else if(value < 0.22){
						result.stat.type="warning";
						result.stat.name="偏低";
						result.stat.h2="血清甘油三酯偏低";
						result.stat.p="血清甘油三酯减低常见于营养吸收不良、甲状腺功能亢进、肾上腺皮质功能减退等情况。";
					}
				}else if(monitorName=='脉搏'){
					result.stat.num=1;
					result.sections=maiboRange;					
					result.sections.range=calRange(maiboRange);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / maiboRange.max * 100;
					
					var value=parseFloat(params[0][2]);// 值
					if (value>100) {
						result.stat.type="danger";
						result.stat.name="偏高";
						result.stat.h2="脉搏过快";
						result.stat.p="1、过量饮酒或者饮烈度酒<br/>2、精神过度紧张，或者从事高度精神紧张工作者<br/>3、高强度体力活动过后";
					} else if(value<=100&&value>=60) {
						result.stat.type="success";
						result.stat.name="正常";
						result.stat.h2="脉搏正常";
						result.stat.p="";
					}else{
						result.stat.type="warning";
						result.stat.name="偏低";
						result.stat.h2="脉搏偏慢";
						result.stat.p="1、游泳运动员或者长期游泳者<br/>2、体力虚弱女性或者中老年女性<br/>3、心动过缓";
					}
					
				}else if(monitorName=='体重'){
					
					result.stat.num=1;
					var tallH=parseFloat(($rootScope.tall-105)*1.10).toFixed(2);
					var tallL=parseFloat(($rootScope.tall-105)*0.90).toFixed(2);
					var  weightRange={
							"type": ["warning","success","danger"],
							"value": [tallL,tallH,150],
							"min": 0,
							'max':150
					};
					result.sections=weightRange;					
					result.sections.range=calRange(weightRange);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / weightRange.max * 100;
					var value=parseFloat(params[0][2]);// 值
					if (value>tallH) {
						result.stat.type="danger";
						result.stat.name="偏高";
						result.stat.h2="体重超重";
						result.stat.p="1、家族遗传<br/>2、不良饮食习惯，摄入过多的能量，体力活动少，导致能量摄入大于消耗<br/>3、服用激素或者某种药物引起的<br/>" +
								"4、因某些疾病而引起<br/>5、中老年内分泌代谢功能下降，导致人体合成分解代谢失去平衡";
					} else if(value<=tallH&&value>=tallL) {
						result.stat.type="success";
						result.stat.name="正常";
						result.stat.h2="体重正常";
						result.stat.p="";
					}else{
						result.stat.type="warning";
						result.stat.name="偏低";
						result.stat.h2="体重偏低";
						result.stat.p="1、家族遗传<br/>2、摄入过低的能量，体力活动多，导致能量消耗大于摄入<br/>3、服用某种药物引起的<br/>" +
								"4、因某些疾病而引起";
					}
					
				}else if(monitorName=='血糖'){
					
					scope.data1={};
					scope.data1.sections=canhouBloodRange;
					scope.data1.sections.range=calRange(canhouBloodRange);
					scope.data1.name=params[1][0];
					scope.data1.value=params[1][2];
					scope.data1.percent=scope.data1.value / canhouBloodRange.max * 100;
					result.stat.num=2;//子指标个数
					result.sections=kongfuBloodRange;
					result.sections.range=calRange(kongfuBloodRange);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / kongfuBloodRange.max * 100;
					var kf=parseFloat(params[0][2]);//kongfu
					var ch=parseFloat(params[1][2]);//canhou		
					if(kf <3.89 && ch>=7.78){
						result.stat.name="异常";
						result.stat.h2="空腹血糖偏低,餐后血糖偏高 ";
						result.stat.type="warning";
						result.stat.p="空腹血糖降低：<p>1、空腹血糖偏低可能存在生理性降低和病理性降低两种情况。</p><p>2、生理性降低可能见于饥饿时、剧烈运动后等。</p><p>3、病理性降低可能见于胰岛β细胞增生、垂体前叶功能减退、肾上腺皮质功能减退、肝病等。<p>"
										+"餐后血糖升高：" +	'<p>1、餐后血糖偏高存在生理性升高和病理性升高两种情况。</p><p>2、生理性升高可能见于饭后1~2小时、吃过高糖食物后、精神紧张等。<p>'
										+'3、病理性升高可能见于糖尿病、呕吐、腹泻、发高烧等。';
					}else if(kf <3.89 && ch>=3.89 && ch<7.78){
						result.stat.name="偏低";
						result.stat.h2="空腹血糖偏低,餐后血糖正常 ";
						result.stat.type="warning";
						result.stat.p='空腹血糖降低：<p>1、空腹血糖偏低存在生理性降低和病理性降低两种。</p><p>2、生理性降低可能见于饥饿时、剧烈运动后等。</p><p>3、病理性降低可能见于胰岛β细胞增生、垂体前叶功能减退、肾上腺皮质功能减退、肝病等。<p>';
					}else if(kf >= 3.89 && kf <= 6.11 && ch >= 3.89 && ch < 7.78){
						result.stat.name="正常";
						result.stat.h2="正常血糖 ";
						result.stat.type="success";
						result.stat.p="恭喜，您的血糖正常！" ;
					}else if(kf > 6.11 &&  ch >= 7.78){
						result.stat.name="偏高";
						result.stat.h2="空腹血糖偏高，餐后血糖偏高 ";
						result.stat.type="danger";
						result.stat.p='升高说明：<p>1、血糖偏高存在生理性升高和病理性升高两种情况。</p><p>2、生理性升高可能见于饭后1~2小时、吃过高糖食物后、精神紧张等。</p><p>3、病理性升高可能见于糖尿病、呕吐、腹泻、发高烧等。</p>' ;
					}else if(kf < 3.89 && ch < 3.89){
						result.stat.name="偏低";
						result.stat.h2="空腹血糖偏低，餐后血糖偏低 ";
						result.stat.type="danger";
						result.stat.p='降低说明：<p>血糖偏低可能见于胰腺B细胞瘤、功能性胰岛素分泌过多、倾倒综合征、胰岛素或其他降血糖药物用量过多、皮质类固醇激素分泌不足（如垂体前叶功能减退、肾上腺皮质功能减退等）、甲状腺功能减退症（如呆小症、黏液性水肿等）、血糖来源减少（如严重肝炎或肝硬化、长期营养不良、糖原贮积病、酒精中毒等）等。</p>' ;
					}else if(kf >= 3.89 && kf<= 6.11 &&  ch >= 7.78){
						result.stat.name="偏高";
						result.stat.h2="空腹血糖正常，餐后血糖升高 ";
						result.stat.type="danger";
						result.stat.p='升高说明：<p>1、餐后血糖升高存在生理性升高和病理性升高两种情况。</p><p>2、生理性升高可能见于饭后1~2小时、吃过高糖食物后、精神紧张等。</p><p>3、病理性升高可能见于糖尿病、呕吐、腹泻、发高烧等。</p>' ;
					}
				 
				}else if(monitorName=='白蛋白'){
					result.stat.num=1;
					var  range={
							"type": ["warning","success","danger"],
							"value": [35,50,75],
							"min": 0,
							'max':75
					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<35){
						result.stat.name="偏低";
						result.stat.h2="白蛋白偏低 ";
						result.stat.type="warning";
						result.stat.p='降低说明：<p>白蛋白病理性降低可能见于肝脏合成白蛋白的减少（如各种慢性肝病、蛋白质营养缺乏等）、蛋白质特别是白蛋白的丢失（如肾病综合征、急性和慢性肾小球肾炎等）、蛋白质消耗的增加（如有结核病、甲状腺功能亢进等）等。<p>';
					}else if(value>=35 && value <=50){
						result.stat.name="正常";
						result.stat.h2="白蛋白正常 ";
						result.stat.type="success";
						result.stat.p='恭喜，您的白蛋白正常！'
					}else if(value>50){
						result.stat.name="偏高";
						result.stat.h2="白蛋白偏高 ";
						result.stat.type="danger";
						result.stat.p='升高说明：<p>白蛋白生理性增高可能见于脱水所致的血液浓缩等。<p>';
					}
				}else if(monitorName=='谷丙转移酶（ALT）'){
					result.stat.num=1;
					var  range={
							"type": ["success","danger"],
							"value": [40,1000],
							"min": 0,
							'max':1000
					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<=40 && value>=0){
						result.stat.name="正常";
						result.stat.h2="谷丙转移酶正常 ";
						result.stat.type="success";
						result.stat.p='恭喜，您的谷丙转移酶正常！';
					}else if(value>40){
						result.stat.name="偏高";
						result.stat.h2="谷丙转移酶偏高 ";
						result.stat.type="danger";
						result.stat.p='升高说明：<p>1、谷丙转移酶偏高存在生理性升高和病理性升高两种情况。</p><p>2、生理性升高可能见于肥胖、酗酒/睡眠不足/身体疲劳引起的肝细胞受损等。</p><p>3、病理性增多常见肝脏疾病（黄疸型肝炎、脂肪肝、酒精性肝病等）、急性胰腺炎、溃疡病、肌肉疾病、全身感染等。</p>'
					}
				}else if(monitorName=='谷草转移酶（AST）'){
					result.stat.num=1;
					var  range={
							"type": ["success","danger"],
							"value": [40,1000],
							"min": 0,
							'max':1000
					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<=40 && value>=0){
						result.stat.name="正常";
						result.stat.h2="谷草转移酶正常 ";
						result.stat.type="success";
						result.stat.p='恭喜，您的谷草转移酶正常！';
					}else if(value>40){
						result.stat.name="偏高";
						result.stat.h2="谷草转移酶偏高 ";
						result.stat.type="danger";
						result.stat.p='升高说明：<p>1、谷草转移酶偏高存在生理性升高和病理性升高两种情况。</p><p>2、生理性升高可能见于肥胖、酗酒/睡眠不足/身体疲劳引起的肝细胞受损等。</p><p>3、病理性增多常见肝脏疾病（黄疸型肝炎、脂肪肝、酒精性肝病等）、急性胰腺炎、溃疡病、肌肉疾病、全身感染等。</p>';
					}
				}else if(monitorName=='血尿素'){
					result.stat.num=1;
					var  xueniaoxuRange={
							"type": ["warning","success","danger"],
							"value": [3.10,7.10,10],
							"min": 0,
							'max':10
					};
					result.sections=xueniaoxuRange;					
					result.sections.range=calRange(xueniaoxuRange);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / xueniaoxuRange.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<3.10){
						result.stat.name="偏低";
						result.stat.h2="血尿素偏低 ";
						result.stat.type="warning";
						result.stat.p='降低说明：<p>1、血尿素偏低存在生理性降低和病理性降低两种。<p><p>2、生理性降低可能见于低蛋白高糖饮食者等。<p><p>3、病理性降低可能见于肝功能减退者。<p>'
					}else if(value>=3.10 && value <=7.10){
						result.stat.name="正常";
						result.stat.h2="血尿素正常 ";
						result.stat.type="success";
						result.stat.p='恭喜，您的血尿素正常！'
					}else if(value>7.10){
						result.stat.name="偏高";
						result.stat.h2="血尿素偏高 ";
						result.stat.type="danger";
						result.stat.p='升高说明：<p>1、血尿素偏高存在生理性升高和病理性升高两种情况。<p><p>2、生理性升高可能见于蛋白饮食。一般来说，如果肝肾都很好只是尿素轻微升高，则饮食上的原因较大。<p><p>3、病理性增多可能见于活动性肺结核、细菌性炎症、急性感染的恢复期等。<p>'
					}
				}else if(monitorName=='血肌酐'){
					result.stat.num=1;
					var  range={
							"type": ["warning","success","danger"],
							"value": [44.0,132,500],
							"min": 0,
							'max':500
					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					var p = '升高说明：<p>1、血肌酐偏高存在生理性升高和病理性升高两种情况。</p><p>2、生理性升高可能见于服用降血压药物。</p><p>3、病理性升高可能见于肾脏实质性损害等。</p>';
					if(value<44.0){
						result.stat.name="偏低";
						result.stat.h2="血肌酐偏低 ";
						result.stat.type="warning";
						result.stat.p='降低说明：<p>血肌酐偏低可能见于摄入过量水分。</p>';
					}else if(value>=44.0&& value <=132){
						result.stat.name="正常";
						result.stat.h2="血肌酐正常 ";
						result.stat.type="success";
						result.stat.p='恭喜，您的血肌酐正常！';
					}else if(value>132 && value<=186){
						result.stat.name="偏高";
						result.stat.h2="血肌酐偏高，炎症损伤期 ";
						result.stat.type="danger";
						result.stat.p = p;
					}else if(value>186 && value<=451){
						result.stat.name="偏高";
						result.stat.h2="血肌酐偏高，肾功能损伤期 ";
						result.stat.type="danger";
						result.stat.p = p;
					}else if( value > 451 ){
						result.stat.name="偏高";
						result.stat.h2="血肌酐偏高，肾功能衰竭期 ";
						result.stat.type="danger";
						result.stat.p = p;
					}
				}else if(monitorName=='血尿酸'){
					result.stat.num=1;
					var  range={
							"type": ["warning","success","danger"],
							"value": [150,420,600],
							"min": 0,
							'max':600
					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<150){
						result.stat.name="偏低";
						result.stat.h2="血尿酸偏低 ";
						result.stat.type="warning";
						result.stat.p='降低说明：<p>血尿酸偏低可能见于摄入的食物中含锌过低；服用其他药物而引起；多发性硬化症。<p>';
					}else if(value>=150 && value <=420){
						result.stat.name="正常";
						result.stat.h2="血尿酸正常 ";
						result.stat.type="success";
						result.stat.p='恭喜，您的血尿酸正常！'
					}else if(value>420){
						result.stat.name="偏高";
						result.stat.h2="血尿酸偏高 ";
						result.stat.type="danger";
						result.stat.p='升高说明：<p>1、血尿酸偏高存在生理性升高和病理性升高两种情况。<p><p>2、生理性升高可能见于短时间大量地吃嘌呤含量高的海鲜和啤酒。<p><p>3、病理性增多可能见于痛风、肾脏疾病、年龄老化、血液病、血压高等。值的说明的是，有痛风临床表现同时血清尿酸增高，可诊断为痛风，但不是所有尿酸增高就是痛风。<p>';
					}
				}else if(monitorName=='血氧'){
					result.stat.num=1;
					var  range={
							"type": ["warning","success","danger"],
							"value": [95,98,120],
							"min": 0,
							'max':120					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<95){
						result.stat.name="偏低";
						result.stat.h2="血氧饱和度偏低 ";
						result.stat.type="warning";
						result.stat.p='提示低氧血症，见于通气功能障碍（如慢性阻塞性肺气肿、支气管哮喘）、成人型呼吸窘迫综合征、吸烟者、一氧化碳中度及麻醉者。';
					}else if(value >=95 && value <=98){
						result.stat.name="正常";
						result.stat.h2="血氧饱和度正常";
						result.stat.type="success";
						result.stat.p='恭喜，您的血氧饱和度正常！'
					}else if(value>98){
						result.stat.name="偏高";
						result.stat.h2="血氧饱和度偏高 ";
						result.stat.type="danger";
						result.stat.p='见于吸入高氧气体。测定氧分压的一个重要意义在于氧疗时，避免出现氧中毒。';
					}
				}else if(monitorName=='空腹血糖'){
					result.stat.num=1;
					var  range={
							"type": ["warning","success","danger"],
							"value": [3.89,6.11,30],
							"min": 0,
							'max':30
					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<3.89){
						result.stat.name="偏低";
						result.stat.h2="空腹血糖偏低 ";
						result.stat.type="warning";
						result.stat.p='<p>1、空腹血糖偏低可能存在生理性降低和病理性降低两种情况。<p><p>2、生理性降低可能见于饥饿时、剧烈运动后等。<p>  <p>3、病理性降低可能见于胰岛β细胞增生、垂体前叶功能减退、肾上腺皮质功能减退、肝病等。<p>';
					}else if(value >=3.89 && value <=6.11){
						result.stat.name="正常";
						result.stat.h2="空腹血正常";
						result.stat.type="success";
						result.stat.p='恭喜，您的空腹血糖正常！';
					}else if(value>6.11){
						result.stat.name="偏高";
						result.stat.h2="空腹血偏高 ";
						result.stat.type="danger";
						result.stat.p='<p>1、可见于1型、2型糖尿病和妊娠型糖尿病、其他特殊类型糖尿病。<p>2、颅内出血、颅脑外伤、脑膜炎等可导致颅内压升高时；呕吐、腹泻、发高烧等导致脱水使血液浓缩，血糖轻度升高。<p>';
					}
				}else if(monitorName=='餐后血糖'){
					result.stat.num=1;
					var  range={
							"type": ["warning","success","danger"],
							"value": [3.89,7.78,30],
							"min": 0,
							'max':30
					};
					result.sections=range;					
					result.sections.range=calRange(range);
					result.name=params[0][0];
					result.value=params[0][2];
					result.percent=result.value / range.max * 100;
					var value=parseFloat(params[0][2]);
					if(value<3.89){
						result.stat.name="偏低";
						result.stat.h2="餐后血糖偏低 ";
						result.stat.type="warning";
						result.stat.p='无明显临床意义，需结合其它指标判断。';
					}else if(value >=3.89 && value <7.78){
						result.stat.name="正常";
						result.stat.h2="餐后血糖正常";
						result.stat.type="success";
						result.stat.p='恭喜，您的餐后血糖正常！'
					}else if(value>=7.78){
						result.stat.name="偏高";
						result.stat.h2="餐后血糖偏高 ";
						result.stat.type="danger";
						result.stat.p='<p>1、餐后血糖偏高存在生理性升高和病理性升高两种情况。<p><p>2、生理性升高可能见于饭后1~2小时、吃过高糖食物后、精神紧张等。<p>3、病理性升高可能见于糖尿病、呕吐、腹泻、发高烧等。';
					}
				}else if(monitorName=='贫血'){
					// 判断男女
					if($rootScope.gender == '1'){
						var  range2={
								"type": ['warning',"success","danger"],
								"value": [120,160,200],
								"min": 0,
								'max':200
						};
						var  range1={
								"type": ['warning',"success","danger"],
								"value": [400,550,5500],
								"min": 0,
								'max':5500
						};
						
						scope.data1={};
						scope.data1.sections=range1;
						scope.data1.sections.range=calRange(range1);
						scope.data1.name=params[0][0];
						scope.data1.value=params[0][2];
						scope.data1.percent=scope.data1.value / range1.max * 100;
						
						result.stat.num=2;//子指标个数
						result.sections=range2;
						
						result.sections.range=calRange(range2);
						result.name=params[1][0];
						result.value=params[1][2];
						result.percent=result.value / range2.max * 100;
						
						var red = parseFloat(params[1][2]);
						var white = parseFloat(params[0][2]);
						var p = '降低说明：<p>血红蛋白偏低可能存在生理性减少和病理性减少两种情况。<p><p>1、生理性减少可能见于某些造血功能减退的老年人等。<p><p>2、病理性减少见于临床上各种疾病引起的贫血，请做进一步的医疗检查。<p><p>红细胞计数病理性降低可能见于肾脏疾病、内分泌疾病、溶血性贫血、再生障碍性贫血等。<p>';
						result.stat.name="偏低";
						result.stat.type="danger";
						result.stat.p= p;
						if(white>=90 && white <120 && red < 400){
							result.stat.h2="轻度贫血，红细胞计数偏低 ";
						}else if(white>=60 && white <90 && red < 400){							
							result.stat.h2="中度贫血，红细胞计数偏低 ";								
						}else if(white>=30 && white <60 && red < 400){								
							result.stat.h2="重度贫血，红细胞计数偏低 ";					
						}else if(white <30 && red < 400){
							result.stat.h2="极重度贫血，红细胞计数偏低 ";			
						}else if(white >=120 && white <= 160 && red >= 400 && red <=550){
							result.stat.name="正常";
							result.stat.h2="血红蛋白正常，红细胞计数正常 ";	
							result.stat.type="success";
							result.stat.p= '恭喜，您的血红蛋白和红细胞计数正常！';
						}else if(white > 160 && red > 550){
							result.stat.name="偏高";
							result.stat.h2="血红蛋白偏高，红细胞计数偏高 ";	
							result.stat.type="danger";
							result.stat.p= '升高说明：<p>血红蛋白偏高的原因可能是：<p><p>1、生理性增多，可能见于兴奋、恐惧等精神因素，剧烈运动和强体力劳动，高山、高原缺氧等。<p><p>2、假性增多，可能见于呕吐、严重腹泻、多汗、多尿等，因血液中的水分丢失导致血液被浓缩，血液中的有形成分相对增多，而致血红蛋白也相对增多。<p><p>红细胞计数病理性增多可能见于各种增生性贫血。<p>';	
						}
						
					}else{
						var  range2={
								"type": ['warning',"success","danger"],
								"value": [110,150,200],
								"min": 0,
								'max':200
						};
						var  range1={
								"type": ['warning',"success","danger"],
								"value": [350,500,5500],
								"min": 0,
								'max':5500
						};
						scope.data1={};
						scope.data1.sections=range1;
						scope.data1.sections.range=calRange(range1);
						scope.data1.name=params[1][0];
						scope.data1.value=params[1][2];
						scope.data1.percent=scope.data1.value / range1.max * 100;
						
						result.stat.num=2;//子指标个数
						result.sections=range2;
						
						result.sections.range=calRange(range2);
						result.name=params[0][0];
						result.value=params[0][2];
						result.percent=result.value / range2.max * 100;
						
						var red = parseFloat(params[1][2]);
						var  white = parseFloat(params[0][2]);
						var p = '降低说明：<p>血红蛋白偏低可能存在生理性减少和病理性减少两种情况。<p><p>1、生理性减少可能见于某些造血功能减退的老年人等。<p><p>2、病理性减少见于临床上各种疾病引起的贫血，请做进一步的医疗检查。<p><p>红细胞计数病理性降低可能见于肾脏疾病、内分泌疾病、溶血性贫血、再生障碍性贫血等。<p>';
						result.stat.name="偏低";
						result.stat.type="danger";
						result.stat.p= p;
						if(white>=90 && white <120 && red < 400){
							result.stat.h2="轻度贫血，红细胞计数偏低 ";
						}else if(white>=60 && white <90 && red < 400){							
							result.stat.h2="中度贫血，红细胞计数偏低 ";								
						}else if(white>=30 && white <60 && red < 400){								
							result.stat.h2="重度贫血，红细胞计数偏低 ";					
						}else if(white <30 && red < 400){
							result.stat.h2="极重度贫血，红细胞计数偏低 ";			
						}else if(white >=110 && white <= 150 && red >= 400 && red <=550){
							result.stat.name="正常";
							result.stat.h2="血红蛋白正常，红细胞计数正常 ";	
							result.stat.type="success";
							result.stat.p= '恭喜，您的血红蛋白和红细胞计数正常！';
						}else if(white > 150 && red > 500){
							result.stat.name="偏高";
							result.stat.h2="血红蛋白偏高，红细胞计数偏高 ";	
							result.stat.type="danger";
							result.stat.p= '升高说明：<p>血红蛋白偏高的原因可能是：<p><p>1、生理性增多，可能见于兴奋、恐惧等精神因素，剧烈运动和强体力劳动，高山、高原缺氧等。<p><p>2、假性增多，可能见于呕吐、严重腹泻、多汗、多尿等，因血液中的水分丢失导致血液被浓缩，血液中的有形成分相对增多，而致血红蛋白也相对增多。<p><p>红细胞计数病理性增多可能见于各种增生性贫血。<p>';	
						}
					}

				}else if(monitorName=='腰臀比'){
					result.stat.num=1;
					// 判断男女
					if($rootScope.gender == '1'){
						var  range={
								"type": ["success","danger"],
								"value": [0.9,1.5],
								"min": 0,
								'max':1.5
						};
						result.sections=range;					
						result.sections.range=calRange(range);
						result.name=params[0][0];
						result.value=params[0][2];
						result.percent=result.value / range.max * 100;
						var value=parseFloat(params[0][2]);
						if(value<0.9){
							result.stat.name="正常";
							result.stat.h2="腰臀比正常 ";
							result.stat.type="success";
							result.stat.p='恭喜，您的腰臀比正常！';
						}else{
							result.stat.name="偏高";
							result.stat.h2="腰臀比偏高 ";
							result.stat.type="danger";
							result.stat.p='升高说明：<p>腰臀比偏高说明存在腹型肥胖或中心性肥胖的风险。</p>';
						}
					}else{
						var  range={
								"type": ["success","danger"],
								"value": [0.8,1.5],
								"min": 0,
								'max':1.5
						};
						result.sections=range;					
						result.sections.range=calRange(range);
						result.name=params[0][0];
						result.value=params[0][2];
						result.percent=result.value / range.max * 100;
						var value=parseFloat(params[0][2]);
						if(value<0.8){
							result.stat.name="正常";
							result.stat.h2="腰臀比正常 ";
							result.stat.type="success";
							result.stat.p='恭喜，您的腰臀比正常！';
						}else{
							result.stat.name="偏高";
							result.stat.h2="腰臀比偏高 ";
							result.stat.type="danger";
							result.stat.p='升高说明：<p>腰臀比偏高说明存在腹型肥胖或中心性肥胖的风险。</p>';
						}
					}
					
				}
			}
			
			 
			

			function reRenderData(index, name, value) {
				renderData(index, name, value);
				$timeout(function() {
					$('.tooltips-show').tooltip({
						trigger : 'manual'
					}).tooltip('show');
				}, 0);
			}


			chart.on('click', function(data) {
				scope.$apply(function() {
					scope.evalShow=true;	
					$("#monitorDetail").show();
					reRenderData(data.seriesIndex, data.name, data.value);
				});
			});

			scope.newMonitor = {
				monTypeCode : '',
				monScore1 : '',
				monScore2 : '',
				monScore3 : '',
				monScore4 : '',
				monScore5 : '',
				monScore1Name : '',
				monScore2Name : '',
				monScore3Name : '',
				monScore4Name : '',
				monScore5Name : '',
				time : $filter('date')(new Date(), 'yyyy-MM-dd'),
				userName : 'jay'
				
			};
			scope.$watch('option', function(newValue, oldValue) {								
				if (newValue != undefined) {
					//chart = echarts.init($('#monitor-stat')[0]);
					chart.clear();
					chart.setOption(newValue[0].option);
					scope.series = newValue[0].option.series;
					scope.legends= newValue[0].option.legend.data;
					scope.monitorName=newValue[0].name;					
					scope.unit=calUnit(scope.monitorName);					
					
					for (var i = 0; i < scope.legends.length; i++) {
						scope.newMonitor['monScore' + (i + 1) + 'Name'] = scope.legends[i];
					}
					scope.newMonitor.monTypeCode = scope.option[0].option.code;//新增记录的类型
					scope.data={};
					scope.data.stat={};
					
					
					//显示当天已经填写的记录
					var series = chart.getSeries();
					var lastDataIndex=series[0].data.length-1;
					var time = chart.getOption().xAxis[0].data[lastDataIndex];
					var lastCharVal=series[0].data[lastDataIndex];
					var today=$filter('date')(new Date(), 'M.d');
					if(lastCharVal&&time==today ){
						for (var i = 0; i < scope.legends.length; i++) {
							scope.newMonitor['monScore' + (i + 1)]  = series[i].data[lastDataIndex];
						}
					}

				}
			});
			
			scope.setChartData = function(target,name) {								
				
				scope.monitorName=name; // TODO
				
				scope.unit=calUnit(name);
				
				if (!$('#monitor-stat').size()) {
					return false;
				}

				chart.clear();
				//console.log(JSON.stringify(scope.$parent.monitorCharOptions[target].option));
				chart.setOption(scope.$parent.monitorCharOptions[target].option);
				
				//chart.setOption(scope.option[target].option);
				scope.series = scope.option[target].option.series;
				scope.legends=scope.option[target].option.legend.data;
				scope.newMonitor.monTypeCode = scope.option[target].option.code;
				for (var i = 1; i < 6; i++) {
					scope.newMonitor['monScore' + i] = '';
					//每次点击清空数值
					scope.newMonitor['monScore' + i + 'Name'] = '';
				}
				if(scope.monitorName == '腰臀比'){
					scope.legends = ['腰围','臀围'];
				}
				for (var i = 0; i < scope.legends.length; i++) {
					scope.newMonitor['monScore' + (i + 1) + 'Name'] = scope.legends[i];
				}

				if (!scope.series[0]) {
					return;
				}
			
				//显示当天已经填写的记录
				var series = chart.getSeries();
				var lastDataIndex=series[0].data.length-1;
				var time = chart.getOption().xAxis[0].data[lastDataIndex];
				var lastCharVal=series[0].data[lastDataIndex];
				var today=$filter('date')(new Date(), 'M.d');
				if(scope.monitorName !== '腰臀比'){				
					if(lastCharVal&&time==today ){
						for (var i = 0; i < scope.legends.length; i++) {
							scope.newMonitor['monScore' + (i + 1)]  = series[i].data[lastDataIndex];
						}
					}
					var monitorForParams = angular.copy(scope.newMonitor);
					for (var i = 0; i < scope.legends.length; i++) {
						monitorForParams['monScore' + (i + 1)]  = series[i].data[lastDataIndex];
					}
					scope.$parent.params = [
					                        [monitorForParams.monScore1Name,scope.addMonitorDate,monitorForParams.monScore1],
					                        [monitorForParams.monScore2Name,scope.addMonitorDate,monitorForParams.monScore2]
					                       ];
				}else{
					if(lastCharVal&&time==today ){
						scope.newMonitor['monScore1'] = scope.$parent.yaowei;
						scope.newMonitor['monScore2'] = scope.$parent.tunwei;
					}
					scope.$parent.params = [
					                        ['',scope.addMonitorDate,series[0].data[lastDataIndex]]
					                       ];
				}
				
				//scope.evalShow=true;
				
				renderData();
				$timeout(function() {
					$('.tooltips-show').tooltip({
						trigger : 'manual'
					}).tooltip('show');
				}, 0);
				
			};

			
			scope.addMonitor = function() {
				// 时间判断
				if(new Date(scope.newMonitor.time) - new Date() > 0){
					scope.$parent.alertOption={content:"时间输入错误",show:true};
					return;
				}
				
				var input1 = $('#f_field0');
				var input2 = $('#f_field1');
				var reg = new RegExp("^[0-9]+(\.[0-9]{2})?");				
				if(!reg.test(input1.val())){
					scope.$parent.alertOption={content:"请输入数字",show:true};
					return;
				}
				if( input2.length !==0 && !reg.test(input2.val())){
					scope.$parent.alertOption={content:"请输入数字",show:true};
					return;
				}
				
				
				switch(parseInt(scope.newMonitor.monTypeCode)){
				// 血压
				case 1:
					if(scope.newMonitor.monScore1 <= 0 || scope.newMonitor.monScore1 > 200 || scope.newMonitor.monScore2 <= 0 || scope.newMonitor.monScore2 > 200){
						scope.$parent.alertOption={content:"请输入合法血压！",show:true};
						return;
					}
					break;
				// 血糖
				case 2:
					if(scope.newMonitor.monScore1 <= 1.7 || scope.newMonitor.monScore1 > 28.3){
						scope.$parent.alertOption={content:"请输入合法血糖1.70-28.30之间！",show:true};
						return;
					}
					break;
				// 血清总胆固醇
				case 3:
					if(scope.newMonitor.monScore1 < 1 || scope.newMonitor.monScore1 > 10){
						scope.$parent.alertOption={content:"请输入合法血清总胆固醇1-10之间！",show:true};
						return;
					}
					break;
				// 血清甘油三酯
				case 4:
					if(scope.newMonitor.monScore1 < 0.1 || scope.newMonitor.monScore1 > 5){
						scope.$parent.alertOption={content:"请输入合法血清甘油三酯0.1-5之间！",show:true};
						return;
					}
					break;
				// 体重
				case 5:
					if(scope.newMonitor.monScore1 <= 30 || scope.newMonitor.monScore1 > 150){
						scope.$parent.alertOption={content:"请输入合法体重30-150之间！",show:true};
						return;
					}
					break;
				// 心率
				case 6:
					if(scope.newMonitor.monScore1 <= 30 || scope.newMonitor.monScore1 > 180){
						scope.$parent.alertOption={content:"请输入合法心率30-180之间！",show:true};
						return;
					}
					break;
				// 腰臀比
				case 9:
					if(input1.val() < 40 || input1.val() > 200 || input2.val() < 40 || input2.val() > 250){
						scope.$parent.alertOption={content:"请输入合法腰围臀围 40-200之间！",show:true};
						return;
					}
					break;
				// 血尿素
				case 11:
					if(scope.newMonitor.monScore1 <= 1 || scope.newMonitor.monScore1 > 10){
						scope.$parent.alertOption={content:"请输入合法血尿素1-10之间！",show:true};
						return;
					}
					break;
				// 血肌酐
				case 12:
					if(scope.newMonitor.monScore1 <= 30 || scope.newMonitor.monScore1 > 500){
						scope.$parent.alertOption={content:"请输入合法血肌酐30-500之间！",show:true};
						return;
					}
					break;
				// 血肌酐
				case 13:
					if(scope.newMonitor.monScore1 <= 50 || scope.newMonitor.monScore1 > 600){
						scope.$parent.alertOption={content:"请输入合法血尿酸50-600之间！",show:true};
						return;
					}
					break;
				// 白蛋白
				case 14:
					if(scope.newMonitor.monScore1 <= 5 || scope.newMonitor.monScore1 > 75){
						scope.$parent.alertOption={content:"请输入合法白蛋白5-75之间！",show:true};
						return;
					}
					break;
				// 谷丙转移酶（ALT）
				case 15:
					if(scope.newMonitor.monScore1 <= 0 || scope.newMonitor.monScore1 > 1000){
						scope.$parent.alertOption={content:"请输入合法谷丙转移酶（ALT）0-1000之间！",show:true};
						return;
					}
					break;
				// 谷草转移酶（AST）
				case 16:
					if(scope.newMonitor.monScore1 <= 0 || scope.newMonitor.monScore1 > 1000){
						scope.$parent.alertOption={content:"请输入合法谷草转移酶（AST）0-1000之间！",show:true};
						return;
					}
					break;
				// 贫血
				case 17:
					if(scope.newMonitor.monScore1 <= 10 || scope.newMonitor.monScore1 > 200 || scope.newMonitor.monScore2 < 0 || scope.newMonitor.monScore2 > 5500){
						scope.$parent.alertOption={content:"请输入合法值！",show:true};
						return;
					}
					break;
				// 餐后血糖
				case 18:
					if(scope.newMonitor.monScore1 <= 1.7 || scope.newMonitor.monScore1 > 28.3){
						scope.$parent.alertOption={content:"请输入合法血糖1.70-28.30之间！",show:true};
						return;
					}
					break;
				// 血氧
				case 19:
					if(scope.newMonitor.monScore1 < 0 || scope.newMonitor.monScore1 > 200){
						scope.$parent.alertOption={content:"请输入合法血氧0-200之间！",show:true};
						return;
					}
					break;
				}
				
				scope.newMonitor.time = $filter('date')(scope.newMonitor.time, 'yyyy-MM-dd');
				scope.newMonitor.userName = $cookies.name;
				winWebHttpService.querywithParams("index/saveMonitoWithDate", scope.newMonitor).then(function(data) {
					//console.log(data.details);
					//scope.$parent.alertOption={content:"增加成功",show:true};
					
					// 腰臀比
					var data = data.details[0];
					if(data.name === '腰臀比'){
						data.legend = ['腰臀比'];
						var yaowei = data.series[0].data;
						var tunwei = data.series[1].data;
						var yaotunbi = [];
						if(data.xAxis[data.xAxis.length-1] == $filter('date')(new Date(), 'M.d')){
							scope.$parent.yaowei = data.series[0].data[data.series[0].data.length-1];
							scope.$parent.tunwei = data.series[1].data[data.series[0].data.length-1];
						}
						for(var j= 0; j<yaowei.length; j++){
							yaotunbi.push((yaowei[j] / tunwei[j] ).toFixed(2)); 
						}
						data.series = [{
								name : '腰臀比',
								data : yaotunbi
						}];
						scope.$parent.params = [['',scope.addMonitorDate,(scope.newMonitor.monScore1 / scope.newMonitor.monScore2).toFixed(2)]];
					}else{
						scope.$parent.params = [
						                        [scope.newMonitor.monScore1Name,scope.addMonitorDate,scope.newMonitor.monScore1],
						                        [scope.newMonitor.monScore2Name,scope.addMonitorDate,scope.newMonitor.monScore2]
						                       ];
					}
					
					//scope.evalShow=true;
					
					scope.alertOption="增加成功";
					var $fields=$('fieldset.params:visible :input');
		            var option; //= chart.getOption();
		            
		            for(var x = 0; x<scope.$parent.monitorCharOptions.length; x++){
		            	if(scope.$parent.monitorCharOptions[x].name == data.name){
		            		option = scope.$parent.monitorCharOptions[x].option ;
		            		break;
		            	}
		            }
		            
		            if(data.xAxis.length == 1 ){
		            	option.xAxis[0].data[1] = data.xAxis[0];
		            	for(var k =0; k<option.series.length; k++){
		            		option.series[k].data[1] = data.series[k].data[0];
		            	}
		            }else{		            	
		            	option.xAxis[0].data = data.xAxis;
		            	option.series = data.series;
		            }
		            
		            for(var x = 0; x<scope.$parent.monitorCharOptions.length; x++){
		            	if(scope.$parent.monitorCharOptions[x].name == data.name){
		            		scope.$parent.monitorCharOptions[x].option = option;
		            		break;
		            	}
		            }
		            
		            scope.$parent.monitorCharOptions[x].option.series[0].type = "line" ;
		            if(scope.$parent.monitorCharOptions[x].option.series.length === 2){
		            	scope.$parent.monitorCharOptions[x].option.series[1].type = "line" ;
		            }
		            
		            chart.setOption(option);
 
					// 添加成功后隐藏
					$('#modal-add-data').modal('hide');
					
					renderData();
					$timeout(function() {
						$('.tooltips-show').tooltip({
							trigger : 'manual'
						}).tooltip('show');
					}, 0);
					
				}, function() {
					//scope.$parent.alertOption={content:"增加失败",show:true};
					scope.alertOption = "增加失败";
				});
			};
			
			scope.addMonitorTypes1=function (monitorsToAdd) {	
				console.log(scope.option);
				winWebHttpService.querywithParams('index/addMonitorType2222',{types:scope.option,userName:$cookies.name}).then(function(newData) {
					scope.alertOption={content:"增加成功",show:true,afterHideFun:function(){
						getMonitor(scope.name);
						$('#modal-add').modal('hide');
						window.location.reload();
					}};
					
				}, function() {
					scope.alertOption={content:"增加失败",show:true};
				});
			};
			
			scope.fnDeleteTypeConfirm = function(index,name){
				$('#modal-del').modal();
				scope.deleteTypeIndex = index;
				scope.deleteTypeName = name;
			};
			
			scope.deleteMonitorType = function(index,name) {
				var index = scope.deleteTypeIndex;
				var name = scope.deleteTypeName;
	
				if(scope.deleteTypeName == chart.getOption().series[0].name){
					chart.clear();
				}
				 
				var monitorTypes =[];
				var code=scope.option[index].option.code;
				monitorTypes.push(code);
				winWebHttpService.querywithParams("index/deleteMonitorType", {types:monitorTypes,userName:$cookies.name}).then(function() {
					scope.$parent.alertOption={content:"删除成功",show:true};
					scope.option.splice(index,1);
					scope.$parent.monitorsLeft.push({id:code,name:name});
					//console.log(scope.$parent.monitorsLeft);
				}, function() {
					scope.$parent.alertOption={content:"删除失败",show:true};
				});
			};
			

		}
	};
}]).directive('winWebDMonitorMultiSelect',['$timeout', function($timeout) {
	return {

		link : function(scope, element, attrs) {

			scope.$watchCollection('monitorsLeft', function(newValue, oldValue) {
				scope.monitorsToAdd=[];
				if (newValue != undefined) {
					$timeout(function() {
						 
							$(element).multiSelect({
								selectableHeader : "<input type='text' class='form-control search-input' autocomplete='off' placeholder='搜索...'>",
								selectionHeader : "<input type='text' class='form-control search-input' autocomplete='off' placeholder='搜索...'>",
								afterInit : function(ms) {
									var that = this, $selectableSearch = that.$selectableUl.prev(), $selectionSearch = that.$selectionUl.prev(), selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)', selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

									that.qs1 = $selectableSearch.quicksearch(selectableSearchString).on('keydown', function(e) {
										if (e.which === 40) {
											that.$selectableUl.focus();
											return false;
										}
									});

									that.qs2 = $selectionSearch.quicksearch(selectionSearchString).on('keydown', function(e) {
										if (e.which == 40) {
											that.$selectionUl.focus();
											return false;
										}
									});
								},
								afterSelect : function(value) {
									this.qs1.cache();
									this.qs2.cache();
									scope.monitorsToAdd.push(value[0]);
									//console.log(scope.monitorsToAdd);
								},
								afterDeselect : function(value) {
									this.qs1.cache();
									this.qs2.cache();
									for (var i = 0; i < scope.monitorsToAdd.length; i++) {
										 if( scope.monitorsToAdd[i]==value[0]){
											 scope.monitorsToAdd.splice(i,1);
										 }
									}
									//console.log(scope.monitorsToAdd);
								}
							});
							$(element).multiSelect('refresh');
						 
						
					}, 0);
				}
			});

		}
	};
}]);

});