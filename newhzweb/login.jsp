<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="org.springframework.security.authentication.*"%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="wincome">
    <meta name="keyword" content="健康空间">
    <title>健康空间</title>
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="css/bootstrap-reset.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
	<!--<link href="css/style-responsive.css" rel="stylesheet" />-->
	<style>
    	body {background: url(img/loginbg.jpg) no-repeat 0 center fixed;}
    	.site-footer {position: fixed;bottom: 0;width:100%;}
    	.jiathis_style_32x32 .jiathis_counter.jiathis_bubble_style{width:60px !important;}
	</style>
</head>
<body oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
<div id="container" class="container">
    <!--main content start-->
    <div id="main-content">
        <div class="">
            <!-- page start-->
            <div class="row">
			    <a href="" class="logo logo-signin">
			        <img src="img/login-logo.png" alt=""/>
			    </a>

<form class="form-signin" id="form-login" action="<c:url value="/loginzone"/>" method="post">
    <h2 class="form-signin-heading">健康空间 - 登录</h2>
    <div class="login-wrap">
        <input type="text" name="username" id="username" class="form-control" placeholder="用户名" autofocus>
        <input type="password" name="password" class="form-control" placeholder="密码">
        <input type="hidden"    name="${_csrf.parameterName}"  value="${_csrf.token}"/>
       <!--  <label class="checkbox">
            <input id="remember_me" name="remember_me" type="checkbox" value="true"/>   记住我
                <span class="pull-right">
                    <a data-toggle="modal" href="#myModal"> 忘记密码?</a>
                </span>
        </label>   -->
           <!--  <input id="remember_me" name="remember_me" type="checkbox" value="true"/>   记住我 -->
                <!-- <span class="pull-right">
                    <a data-toggle="modal" href="#myModal"> 忘记密码?</a>
                </span> -->
		 <%-- <img style="width:200px;height:70px" src="<c:url value="captcha.png" />" onclick="this.src='captcha.png?d='+new Date()*1"><br />--%>
		<label> 
			<c:if test="${not empty param.error }">
				<font color="red">${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</font>
			</c:if> 
		</label> <br>
		<%--<input type="text" name="captcha" class="form-control" placeholder="验证码"><br />--%>
        <div class="row">
            <div class="col-xs-12 col-xs-offset-6">
                <div class="row">
                    <button class="btn btn-default btn-shadow col-xs-11 " type="reset">重置</button>
                    <button class="btn btn-primary btn-shadow col-xs-11 pull-right" type="" id="login">登录</button>
                </div>  
            </div>
            
        </div>
      <!--   <div class="row text-center">
        	<a class=" " href="register.jsp">还没帐号，立即注册!</a>
        </div> -->
    </div>

    <!-- Modal -->
    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">忘记密码了 ?</h4>
                </div>
                <div class="modal-body">
                    <p>请输入账户的邮箱地址：</p>
                    <input type="text" name="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">

                </div>
                <div class="modal-footer">
                    <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                    <button class="btn btn-success" type="button">提交</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- modal -->
</form>
<div class="row app">
    <div class="col-xs-11 text-right">
        <i class="fa fa-android fa-xl fa-inverse " data-hover-img="img/qr.jpg"></i>
    </div>
    <div class="col-xs-11 pull-right">
        <i class="fa fa-apple fa-xl fa-inverse" data-hover-img="img/qr.jpg"></i>
    </div>
</div>
</div>
<!-- page end-->
</div>
</div>
</div>
<div class="site-footer text-center">
    <div class=" p10">
        2014 &copy; 健康空间，版权所有 <a href="http://www.miitbeian.gov.cn/" style="color:white">沪ICP备14051941号</a>
    </div>
    <div class="linka">
        <a href="">关于健康空间</a> | <a href="">联系我们</a> | <a href="">免责声明</a> | <a href="">帮助中心</a>
    </div>
</div>
<!--[if lt IE 9]>
<script type="text/javascript" src="js/html5shiv.js"></script>
<script type="text/javascript" src="js/respond.min.js"></script>
<script type="text/javascript" src="js/excanvas.compiled.js"></script>
<![endif]-->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="assets/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-switch.js"></script>
<script type="text/javascript" src="assets/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="assets/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
<script type="text/javascript" src="assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
<script type="text/javascript" src="assets/fuelux/js/spinner.min.js"></script>
<script type="text/javascript" src="assets/bootstrap-fileupload/bootstrap-fileupload.js"></script>
<script type="text/javascript" src="assets/Calendario/js/jquery.calendario.js"></script>
<script type="text/javascript" src="assets/infinite-scroll/js/jquery.infinitescroll.js"></script>
<script type="text/javascript" src="assets/artTemplate/template.js"></script>
<script type="text/javascript" src="assets/artTemplate/template-simple.js"></script>
<script type="text/javascript" src="assets/jquery-multi-select/js/jquery.multi-select.js"></script>
<script type="text/javascript" src="assets/jquery-multi-select/js/jquery.quicksearch.js"></script>
<script type="text/javascript" src="js/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery-validate.bootstrap-tooltip.js"></script>
<script type="text/javascript" src="js/jquery.validate.addon.js"></script>
<script type="text/javascript" src="assets/echarts/echarts-plain.js"></script>
<script type="text/javascript" src="assets/jquery-knob/js/jquery.knob.js"></script>
<script type="text/javascript" src="js/jquery.nicescroll.js"></script>
<script type="text/javascript" src="assets/owl-carousel/owl.carousel.min.js"></script>
<script type="text/javascript" src="js/jquery.stepy.js"></script>
<script type="text/javascript" src="js/common-scripts.js"></script>
<script>
	//读取cookies 
	function getCookie(name) 
	{ 
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if(arr=document.cookie.match(reg))
	        return unescape(arr[2]); 
	    else 
	        return null; 
	} 
	//删除cookies 
	function delCookie(name) 
	{ 
	    var exp = new Date(); 
	    exp.setTime(exp.getTime() - 1); 
	    var cval=getCookie(name); 
	    if(cval!=null) 
	        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
	} 
	var keys = ['name','tall','gender','imgUrl','username','users','description','isMain'];
	for(var k in keys){
		delCookie(keys[k]);
	}
	//提交表单
	$("#login").on('click',function(){
		var exp = new Date();
	    exp.setTime(exp + 24*3600*1000);//应该改为exp.getTime(),否则cookie有效期总失效。
		document.cookie = "name=" + $("#username").val() + ";expires=" + exp.toGMTString();
		$('form').submit();
	});
</script>
</body>
</html>
