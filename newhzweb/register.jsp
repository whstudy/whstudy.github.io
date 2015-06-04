<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="org.springframework.security.authentication.*"%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="zztac">
    <meta name="keyword" content="健康空间">
    
    <title>健康空间</title>

    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
    <link href="assets/bootstrap-timepicker/compiled/timepicker.css" rel="stylesheet" />
    
    <link href="assets/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet" />
    <link href="assets/jquery-multi-select/css/multi-select.css" rel="stylesheet" />
    <link href="assets/Calendario/css/calendar.css" rel="stylesheet" />
    <link href="assets/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
    <link href="assets/Calendario/css/custom_2.css" rel="stylesheet" />
    <link href="assets/owl-carousel/owl.carousel.css" rel="stylesheet" />
    <link href="assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" />

    <link href="css/bootstrap-reset.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
<!--    <link href="css/style-responsive.css" rel="stylesheet" />-->

    
    
</head>
<body class="">
<div id="container" class="container">

    
    <!--main content start-->
    <div id="main-content">
        <div class="">
            <!-- page start-->
            <div class="row">
                
            
<style>
    body{background: url(img/loginbg.jpg) no-repeat 0 center fixed;}
    .site-footer {position: fixed;bottom: 0;width:100%;}
</style>

    <a href="" class="logo logo-signin">
        <img src="img/login-logo.png" alt=""/>
    </a>

<form class="form-signin" id="form-register" action="demo/userRegister" method="post">
    <h2 class="form-signin-heading">健康空间 - 注册</h2>
    <div class="login-wrap">
        <input type="text" name="userName" class="form-control" placeholder="用户名" autofocus>
        <input type="password" name="passWord" autocomplete="off" class="form-control" placeholder="密码">
        <input type="password" name="password2" class="form-control" placeholder="重复密码">
         <input type="text" name="email" class="form-control" placeholder="邮箱">
        <label class="checkbox">
            <input type="checkbox" name="accept" value="1"> 我已阅读并同意
            <a href="">健康空间注册协议</a>
        </label>
        <div class="row">
            <button class="btn btn-default btn-shadow col-xs-10" type="reset">重置</button>
            <button class="btn btn-danger btn-shadow col-xs-10 pull-right" type="submit">注册</button>
        </div>
        
        <div class="registration">
            已经有一个账号?
            <a class="" href="login.jsp">
                立即登录
            </a>
        </div>

    </div>

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
        2014 &copy; 健康空间，版权所有
        
    </div>
    <div class="linka">
        <a href="">关于健康空间</a> | <a href="">联系我们</a> | <a href="">免责声明</a> | <a href="">帮助中心</a>
    </div>
    <a href="#" class="go-top">
        <i class="fa fa-angle-up"></i>
    </a>
    
</div>
<!--[if lt IE 9]>
<script type="text/javascript" src="js/html5shiv.js"></script>
<script type="text/javascript" src="js/respond.min.js"></script>
<script type="text/javascript" src="js/excanvas.compiled.js"></script>
<![endif]-->
<script type="text/javascript" src="js/jquery.js"></script>
<!--<script type="text/javascript" src="js/jquery-ui-1.9.2.custom.min.js"></script>-->
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
<style type="text/css">
    .jiathis_style_32x32 .jiathis_counter.jiathis_bubble_style{
        width:60px !important;
    }
</style>
</body>
</html>
