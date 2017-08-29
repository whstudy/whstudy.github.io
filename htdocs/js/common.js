/**
 * Common js
 */
domainUrl="http://whstudy.github.io/htdocs/";
// serviceUrl="http://122.152.208.113";
serviceUrl="http://www.jinhuishengwu.cn";
// imageNginxUrl="http://122.152.208.113:8080/";
imageNginxUrl="http://www.jinhuishengwu.cn:8080/";

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

window.messageShow = function(message, icon, timeout) {
  $.message({
    type : icon || 'info',
    content : message,
    timeout : timeout
  });
};

window.messageFlash = function(message, timeout) {
  $.dialog(message + '', timeout || 2);
};

window.messageAlert = function(message, button) {
  $.dialog({
    content : message,
    btn : [ button || '我知道了' ],
    btnCancel : null
  });
};

window.pushDialog = function(dialog, callback) {
  $('body').find('article').hide();
  $(dialog).css({
    'left' : '100%',
    'display' : 'none'
  }).appendTo($('body')).show().animate({
    'left' : 0
  }, 300, function() {
    if ($.isFunction(callback)) {
      callback.call($(dialog), window.jQuery || window.Zepto)
    }
  });
}
window.pullDialog = function(dialog, callback) {
  $(dialog).animate({
    'left' : '100%'
  }, 300, function() {
    $('body').find('article').show();
    if ($.isFunction(callback)) {
      callback.call($(dialog), window.jQuery || window.Zepto)
    }
  });
}

$.ajaxSetup({
  xhrFields: {
    withCredentials:true
  },
  traditional:true,
  // contentType:"application/json;charset=UTF-8",
  // contentType:"multipart/form-data;;charset=UTF-8",
}); 

// $.ajaxTransport(function( options, originalOptions, jqXHR ){
//   options.url=serviceUrl+options.url;
// })

// $.ajaxPrefilter(function( options, originalOptions, jqXHR ){
//   options.url=serviceUrl+options.url;
// })

// $(document).ajaxSend(function (o, xhr, property) {
//   // xhr['withCredentials'] = true;
//   // property.url=serviceUrl+property.url;
//   // property.xhrFields={
//   //   withCredentials:true
//   // };
// })

$(function() {
  
  $.fn.serializeObject = function(para){
    var serializeObj={}; // 目标对象 
    var tempObj={};//临时对象
    var array=this.serializeArray(); // 转换数组格式
    if(para!=null&&para!=undefined){
      $.each(para,function(name,value) {
        array.push({"name":name,"value":value});
      });
    }
    // console.log(para);
    // console.log(array);
    $(array).each(function(){ // 遍历数组的每个元素 {name : xx , value : xxx} 
        if(serializeObj[this.name]){ // 判断对象中是否已经存在 name，如果存在name 
              if($.isArray(serializeObj[this.name])){ 
                 serializeObj[this.name].push(this.value); // 追加一个值 hobby : ['音乐','体育'] 
              }else{ 
                // 将元素变为 数组 ，hobby : ['音乐','体育'] 
                serializeObj[this.name]=[serializeObj[this.name],this.value]; 
              } 
        }else{ 
            serializeObj[this.name]=this.value; // 如果元素name不存在，添加一个属性 name:value 
        } 
    });     
    return serializeObj;    
  };

  /* 处理移动端click事件 */
  if(typeof(FastClick) != 'undefined') {
    FastClick.attach(document.body);
  }

  /* 全局的ajax访问，处理ajax清求时sesion超时 */
  $(document).ajaxComplete(function(event, XMLHttpRequest, textStatus) {
    //console.log("XMLHttpRequest.responseText=" + XMLHttpRequest.responseText);
    switch (XMLHttpRequest.status) {
      case 401: /* 未登录提示 */
        var result = JSON.parse(XMLHttpRequest.responseText);
        // if(result.message=='Bad credentials'){
        //   // messageFlash('账号或密码不正确');
        // }else if(result.message=='username not found'){
        //   // messageFlash('帐号不存在');
        // }else{
        //   showLogin(result.data);
        // }

        if(XMLHttpRequest.responseJSON.message=='No message available'){
          showLogin(XMLHttpRequest.responseJSON.data); 
        }
        // location.href=domainUrl+'login.html';
        //messageFlash('您还没有登录, 请先登录');
        break;
      // case 403:
      //   messageShow('您没有权限执行该操作', 'error');
      //   break;
      case 500:
        if(XMLHttpRequest.responseText.indexOf("您的账号尚未认证,正在为您认证..请稍后")!=-1){
          XMLHttpRequest.responseText="您的账号尚未认证,正在为您认证..请稍后";
        }
        messageFlash(XMLHttpRequest.responseText);
        break;
      // default:
      //   break;
    }
  });
  
  var showLogin = function(url){
    // asideHtml 
    //   = '<aside id="asideLogin" class="fix-lt size-100p hide zindex-100">'
    //   +   '<div class="aside-mask fix-lt size-100p zindex-100" style="background-color:rgba(0, 0, 0, 0.8)"></div>'
    //   +   '<a href="javascript:;" class="btn-close abs-rt p-15 zindex-100"><i class="fa fa-times-circle font-white fs-20"></i></a>'
    //   +   '<div class="abs-mm text-center zindex-100">'
    //   +     '<p class="font-white fs-15 lh-30">您还没有登录，请先登录</p>'
    //   +     '<a class="btn green mt-15 width-200 round-2" href="' + url + '"><i class="fa fa-weixin font-white"></i> 去授权登录</a>'
    //   +     '<a class="btn default mt-15 width-200 round-2" href="${ctx}/login">手机密码登录</a>'
    //   +   '</div>'
    //   + '</aside>';

    asideHtml 
      = '<aside id="asideLogin" class="fix-lt size-100p hide zindex-100">'
      +   '<div class="aside-mask fix-lt size-100p zindex-100" style="background-color:rgba(0, 0, 0, 0.8)"></div>'
      // +   '<a href="javascript:;" class="btn-close abs-rt p-15 zindex-100"><i class="fa fa-times-circle font-white fs-20"></i></a>'
      +   '<div class="abs-mm text-center zindex-100">'
      +     '<p class="font-white fs-15 lh-30">您的登录已超时，请重新登录</p>'
      // +     '<a class="btn green mt-15 width-200 round-2" href="' + url + '"><i class="fa fa-weixin font-white"></i> 去授权登录</a>'
      +     '<a class="btn default mt-15 width-200 round-2" href="login.html">登录</a>'
      +   '</div>'
      + '</aside>';
    $('body').addClass('o-hidden');
    $(asideHtml).appendTo($('body')).fadeIn(300).find('a.btn-close').click(function(){
      $('body').removeClass('o-hidden');
      $('#asideLogin').fadeOut(300, function(){
        $('#asideLogin').remove();
      });
    });
  };
  
  /* 回到顶部按钮 */
  if($('.go-top').length > 0) {
    
    $('.go-top').click(function() {
      $("html, body").animate({
        scrollTop : 0
      }, 200);
    });
    
    var showTopButton = function() {
      h = $(window).height();
      t = $(document).scrollTop();
      if (t >= 200) {
        $('.go-top').show();
      } else {
        $('.go-top').hide();
      }
    };
    showTopButton();
    $(window).scroll(function(e) {
      showTopButton();
    });
  }
  
});

/**
 * Debug print
 * @param object
 */
function log(object) {
  var s = '{';
  for ( var k in object) {
    s += '\n\t' + k + ': \'' + object[k] + '\'';
  }
  s += '\n}';
  console.log(s);
}
