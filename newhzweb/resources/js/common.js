	function formToJson(data) {		
		data=decodeURIComponent(data,true);
		data=data.replace(/&/g,"\",\"");
		data=data.replace(/=/g,"\":\"");
		data="{\""+data+"\"}";
		return data;
	}
	
	
	$.ajaxSetup({
		type : "POST",
//		error : function(jqXHR, textStatus, errorThrown) {
//			switch (jqXHR.status) {
//			case (500):
//				console.log(jqXHR.responseText);
//				alert("服务器系统内部错误");
//				break;
//			case (401):
//				alert("未登录");
//				break;
//			case (403):
//				alert("无权限执行此操作");
//				break;
//			case (408):
//				alert("请求超时");
//				break;
//			default:
//				alert("未知错误");
//			}
//		},
		//身份验证,http头部设置
		headers : {
			"X-AUTH-TOKEN" : localStorage.getItem('auth_token'),
			"Content-Type" : 'application/json;charset=UTF-8'
		}
	});