<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <%@ page import="org.springframework.security.authentication.*" %>
            <!DOCTYPE html>
            <html lang="zh_CN">
                
                <head>
                    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta name="description" content="">
                    <meta name="author" content="wincome">
                    <meta name="keyword" content="健康空间">
                    <meta name="_csrf" content="${_csrf.token}" />
                    <meta name="_csrf_header" content="${_csrf.headerName}" />
                    <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
                    <link rel="shortcut icon" href="images/favicon.ico" />
                    <title>
                        健康空间11111
                    </title>
                    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
                    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet"
                    />
                    <link href="assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet"
                    />
                    <link href="assets/bootstrap-timepicker/compiled/timepicker.css" rel="stylesheet"
                    />
                    <link href="assets/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet"
                    />
                    <link href="assets/jquery-multi-select/css/multi-select.css" rel="stylesheet"
                    />
                    <link href="assets/Calendario/css/calendar.css" rel="stylesheet" />
                    <link href="assets/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet"
                    />
                    <link href="assets/Calendario/css/custom_2.css" rel="stylesheet" />
                    <link href="assets/owl-carousel/owl.carousel.css" rel="stylesheet" />
                    <link href="assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet"
                    />
                    <link href="css/angular-csp.css" rel="stylesheet">
                    <link href="css/bootstrap-reset.css" rel="stylesheet">
                    <link href="css/style.css" rel="stylesheet">
                    <!-- <link href="css/style-responsive.css" rel="stylesheet" />
                    -->
                    <style type="text/css">
                        .jiathis_style_32x32 .jiathis_counter.jiathis_bubble_style { width: 60px
                        !important; }
                    </style>
                </head>
                <!-- <body oncontextmenu="return false" onselectstart="return false" ondragstart="return
                false"> -->
                
                <body>
                    <div class="header" style="height:45px;padding-left: 50px;">
                        <div class="container" style="">
                            <div class="row">
                                <div class="col-xs-5">
                                    <a class="logo" href="">
                                        <img src="img/logo.png" alt="" />
                                    </a>
                                </div>
                                <div class="col-xs-3" style="font-size:16px">
                                    <div class="top-menu" style="margin-top:5px">
                                        <a data-toggle="dropdown" data-target="#" style="color:#e9e9e9;font-size:16px;cursor:pointer;
/*                                         background: #B4ACAC; */
                                        ">
                                        
<!--                                             <span class="username" ng-bind="call"></span> -->
                                             <span ng-show="call&&call!=' '">{{call}}</span>
                                             <span ng-show="!call||call==' '">{{name}}</span>
                                            
                                            
                                            <b class="caret caret-inverse">
                                            </b>
                                        </a>
                                        <!-- <span>1111</span>					  	 -->
                                        <ul class="dropdown-menu" role="menu">
                                            <!-- <li><a href="#~/profile">个人资料</a></li> -->
<!--                                              win-web-tooltip -->
<!-- ng-click="fnChangeUser(user.userName,$index)" -->
                                            <li ng-repeat="user in users" ng-click="fnChangeUser(user.userName,$index)">
                                                <a option="user.userName" href="#">
                                                	
                                                	<span ng-show="user.call&&user.call!=' '">{{user.call}}</span>
                                                	<span ng-show="!user.call||user.call==' '">{{user.userName}}</span>
                                                    
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xs-13">
                                    <!-- <ul> -->
                                    <!-- </ul> -->
                                    <ul class="nav top-menu" id="main_menu">
                                        <li>
                                            <a href="#~/index">
                                                <i class="fa fa-home">
                                                </i>
                                                首页
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#~/report">
                                                <i class="fa fa-file-text-o">
                                                </i>
                                                健康档案
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#~/meals">
                                                <i class="fa fa-cutlery">
                                                </i>
                                                营养管理
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#~/sport">
                                                <i class="fa fa-dribbble">
                                                </i>
                                                运动监测
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#~/chronic">
                                                <i class="fa fa-tint">
                                                </i>
                                                慢病管理
                                            </a>
                                        </li>
                                        <!-- <li><a href="#~/diary" title="我的..."> <i class="fa fa-user"></i></a></li> -->
                                    </ul>
                                </div>
                                <div class="col-xs-3">
                                    <div class="top-menu pull-right">
                                        <a data-toggle="dropdown" data-target="#" style="color:#e9e9e9;font-size:16px;cursor:pointer;">
                                            <span class="username">
                                                <small>
                                                    个人中心
                                                </small>
                                            </span>
                                            <b class="caret caret-inverse">
                                            </b>
                                        </a>
                                        <ul class="dropdown-menu" role="menu">
                                            <!-- <li><a href="#~/profile">个人资料</a></li> -->
                                            <li>
                                                <a href="#~/profile">
                                                    个人资料
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" onclick="loginout()">
                                                    注销
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div style="display:none">
<%--                                     <form action="<c:url value=" /logout "/>" method="post" id="logoutForm"> --%>
<%--                                         <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" --%>
<!--                                         /> -->
<!--                                     </form> -->
                                    
                                    <form action="<c:url value="login.jsp"/>" method="post" id="logoutForm">
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"
                                        />
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sub-nav" id="sub-menu">
                        <ul>
                        </ul>
                        <ul>
                        </ul>
                        <ul>
                            <li>
                                <a href="#~/family_basket">
                                    家庭菜篮
                                </a>
                            </li>
                            <li>
                                <a href="#~/search1">
                                    食物宜忌
                                </a>
                            </li>
                            <li>
                                <a href="#~/meals">
                                    饮食日记
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <!-- <li><a href="#~/sport">我的运动签到</a></li>
                            <li><a href="#~/plan_create">我的运动计划</a></li>
                            <li><a href="#~/sport_eval">我的能量消耗</a></li> -->
                        </ul>
                        <ul>
                            <li>
                                <a href="#~/evaluate">
                                    慢病风险评估
                                </a>
                            </li>
                            <li>
                                <a href="#~/search">
                                    三高问答
                                </a>
                            </li>
                            <li>
                                <a href="#~/chronic">
                                    慢病资讯
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="#~/diary">
                                    我的日记
                                </a>
                            </li>
                            <li>
                                <a href="#~/favorite">
                                    我的收藏
                                </a>
                            </li>
                            <li>
                                <a href="#~/share">
                                    我的分享
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="#~/doctor">
                                    指标监控
                                </a>
                            </li>
                            <li>
                                <a href="#~/answer">
                                    处理咨询
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id="container" class="container">
                        <!--main content start-->
                        <div id="main-content">
                            <div class="wrapper">
                                <!-- page start-->
                                <div class="row">
                                    <div class="profile-nav col-xs-5">
                                        <div class="panel ">
                                            <div class="user-heading round">
                                                <a href="#">
                                                    <img ng-src="{{imgUrl}}" alt="">
                                                </a>
                                                <h1 ng-bind="name">
                                                </h1>
                                                <p ng-bind="description">
                                                </p>
                                            </div>
                                            <!-- <ul class="nav nav-pills nav-stacked">
                                            <li><a href="#~/index"> <i class="fa fa-hospital-o"></i><span ng-if="isMain">我</span><span  ng-if="!isMain">他</span>的指标监测 </a></li>
                                            <li><a href="#~/healthDiary"> <i class="fa fa-user"></i><span ng-if="isMain">我</span><span  ng-if="!isMain">他</span>的健康日记 <span class="label label-danger pull-right r-activity">2</span> </a></li>
                                            <li><a href="#~/report"> <i class="fa fa-bookmark"></i><span ng-if="isMain">我</span><span  ng-if="!isMain">他</span>的健康档案 <span class="label label-danger pull-right r-activity">1</span> </a></li>
                                            <li><a href="#~/medical"> <i class="fa fa-hospital-o"></i><span ng-if="isMain">我</span><span  ng-if="!isMain">他</span>的社区医疗 </a></li>
                                            </ul> -->
                                            <ul class="nav nav-pills nav-stacked" style="display: none">
                                                <li>
                                                    <a href="#~/healthDiary">
                                                        <i class="fa fa-user">
                                                        </i>
                                                        健康日记
                                                        <!-- <span class="label label-danger pull-right r-activity">2</span> -->
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#~/medical">
                                                        <i class="fa fa-hospital-o">
                                                        </i>
                                                        家庭医生
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#~/report">
                                                        <i class="fa fa-bookmark">
                                                        </i>
                                                        健康档案
                                                        <!-- <span class="label label-danger pull-right r-activity">1</span> -->
                                                    </a>
                                                </li>
                                                <!-- <li><a href="#~/medical"> <i class="fa fa-hospital-o"></i>收藏 </a></li>
                                                <li><a href="#~/medical"> <i class="fa fa-hospital-o"></i>分享 </a></li> -->
                                            </ul>
                                            <ul class="nav nav-pills nav-stacked" style="display: none">
                                                <li>
                                                    <a href="#~/profile">
                                                        家庭成员
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#~/profileInfo">
                                                        消息
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#~/profileHealthInfo">
                                                        健康信息
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#~/profileBaseInfo">
                                                        基本信息
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#~/profileChangPwd">
                                                        修改密码
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="" onclick="loginout()">
                                                        退出
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="panel">
                                            <div class="panel-body">
                                                <div class="custom-calendar-wrap" win-web-common-calender>
                                                    <div id="custom-inner" class="custom-inner">
                                                        <div class="custom-header clearfix">
                                                            <div class="calendar-nav">
                                                                <span id="custom-prev" class="custom-prev">
                                                                    <i class="fa fa-chevron-left">
                                                                    </i>
                                                                </span>
                                                                <span id="custom-next" class="custom-next">
                                                                    <i class="fa fa-chevron-right">
                                                                    </i>
                                                                </span>
                                                            </div>
                                                            <h2 id="custom-month" class="custom-month">
                                                            </h2>
                                                            <h3 id="custom-year" class="custom-year">
                                                            </h3>
                                                        </div>
                                                        <div id="calendar" class="fc-calendar-container">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel">
                                            <div class="panel-body">
                                                <img src="img/tree.jpg" alt="" width="100%" height="280" />
                                            </div>
                                        </div>
                                    </div>
                                    <div ng-view class="slide-in-left1">
                                    </div>
                                    <!-- back to top-->
                                    <span id="back">
                                        <span class="glyphicon glyphicon-circle-arrow-up">
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="foo" style="display:none; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: #000000; opacity:0.8;filter: alpha(opacity=80);">
                        <div id="spin" style="position:fixed; top: 50%; left:50%;color:white;">
                        </div>
                    </div>
                    <div class="site-footer text-center">
                        <div class=" p10">
                            2014 &copy; 健康空间，版权所有
                            <a href="http://www.miitbeian.gov.cn/" style="color:white">
                                沪ICP备14051941号
                            </a>
                        </div>
                        <div class="linka">
                            <a href="#">
                                关于健康空间
                            </a>
                            |
                            <a href="#">
                                联系我们
                            </a>
                            |
                            <a href="#">
                                免责声明
                            </a>
                            |
                            <a href="#">
                                帮助中心
                            </a>
                        </div>
                    </div>
                    <!--[if lt IE 9]>
                        <script type="text/javascript" src="js/html5shiv.js">
                        </script>
                        <script type="text/javascript" src="js/respond.min.js">
                        </script>
                        <script type="text/javascript" src="js/excanvas.compiled.js">
                        </script>
                    <![endif]-->
                    <script type="text/javascript" src="js/jquery.js">
                    </script>
                    <script src="js/underscore.js">
                    </script>
                    <script src="js/jquery-ui.js">
                    </script>
                    <script type="text/javascript" src="assets/bootstrap/js/bootstrap.min.js">
                    </script>
                    <script type="text/javascript" src="js/bootstrap-switch.js">
                    </script>
                    <script type="text/javascript" src="assets/bootstrap-datepicker/js/bootstrap-datepicker.js">
                    </script>
                    <script type="text/javascript" src="assets/bootstrap-timepicker/js/bootstrap-timepicker.js">
                    </script>
                    <script type="text/javascript" src="assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js">
                    </script>
                    <script type="text/javascript" src="assets/fuelux/js/spinner.min.js">
                    </script>
                    <script type="text/javascript" src="assets/bootstrap-fileupload/bootstrap-fileupload.js">
                    </script>
                    <script type="text/javascript" src="assets/Calendario/js/jquery.calendario.js">
                    </script>
                    <script type="text/javascript" src="assets/infinite-scroll/js/jquery.infinitescroll.js">
                    </script>
                    <script type="text/javascript" src="assets/artTemplate/template.js">
                    </script>
                    <script type="text/javascript" src="assets/artTemplate/template-simple.js">
                    </script>
                    <script type="text/javascript" src="assets/jquery-multi-select/js/jquery.multi-select.js">
                    </script>
                    <script type="text/javascript" src="assets/jquery-multi-select/js/jquery.quicksearch.js">
                    </script>
                    <script type="text/javascript" src="js/jquery.validate.min.js">
                    </script>
                    <script type="text/javascript" src="js/jquery-validate.bootstrap-tooltip.js">
                    </script>
                    <script type="text/javascript" src="js/jquery.validate.addon.js">
                    </script>
                    <script type="text/javascript" src="assets/echarts/echarts-plain-original.js">
                    </script>
                    <script type="text/javascript" src="assets/jquery-knob/js/jquery.knob.js">
                    </script>
                    <script type="text/javascript" src="js/jquery.nicescroll.js">
                    </script>
                    <script type="text/javascript" src="assets/owl-carousel/owl.carousel.js">
                    </script>
                    <script type="text/javascript" src="js/jquery.stepy.js">
                    </script>
                    <script type="text/javascript" src="js/common-scripts.js">
                    </script>
                    <script src="js/spin.js">
                    </script>
                    <script src="js/angular-file-upload-shim.min.js">
                    </script>
                    <script src="js/require.js" data-main="win/common/main.js">
                    </script>
                    <script>
                        function loginout() {
                            //读取cookies 
                            function getCookie(name) {
                                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

                                if (arr = document.cookie.match(reg))

                                return unescape(arr[2]);
                                else return null;
                            }
                            //删除cookies 
                            function delCookie(name) {
                                var exp = new Date();
                                exp.setTime(exp.getTime() - 1);
                                var cval = getCookie(name);
                                if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                            }
                            delCookie('name');
                            document.getElementById('logoutForm').submit();
                        }
                    </script>
                </body>
            
            </html>