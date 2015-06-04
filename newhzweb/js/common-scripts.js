

(function () {
    
    $("html,#meals-desk,#meals-eval").niceScroll({
    	autohidemode:false,
        styler:"fb",
        cursorcolor:"#e8403f", 
        cursorwidth: '12', 
        cursorborderradius: '10px', 
        background: '#404040', 
        spacebarenabled:true,  
        cursorborder: '',
        zindex: '99999999'
    });
    
    $.fn.renderJSON=function(url,tpl,replace,callback){
        var $this=$(this);
        $.getJSON(url,function(data){
            $this.render(tpl,data,replace);
            if(callback){
                callback();
            }
        });
    };
    
    $.fn.render=function(tpl,data,replace){
        var html=template.render('tpl-'+tpl,{"data":data});
        if(!replace){
            $(this).append(html);
        }else{
            $(this).html(html);
        }
    };
    
    $.fn.countTo=function(num){
        var $this=$(this);
        var step=1;
        var current=parseInt($this.text());
        if(isNaN(current)){
            current=0;
        }   
        var opt=num>=current?1:-1;
        var intv=setInterval(function(){
            step=Math.max(1,parseInt(Math.abs(num-current)/5));
            $this.text(current+=opt*step);
            if((opt>0 && current>=num)||(opt<0 && current<=num)){
                $this.text(num);
                clearInterval(intv);
            }
        },10);
    };
    
    $.fn.buildForm=function(key,callback){
        var $this=$(this);
        $.getJSON('ajax/form.json',function(data){
            var ele,html;
            if(!data[key]){
                return false;
            }
            ele=data[key];
            ele["key"]=key;
            html=template.render('tpl-form',ele);
            $this.html(html);
            checkbox();
            if(callback){
                callback(key);
            }
        });
    };

    /**
     * 基于bootstrap modal做的提示框
     * 
     * @param type 样式类型 success/danger/warning
     * @param title 提示框标题
     * @param content 提示框内容
     * 
     */
    $.alert=function(content,type,title){
        type=!type?'success':type;
        title=!title?'系统提示':title;
        var $ele=$(template.render('tpl-modal-alert',{
            "type":type,
            "title":title,
            "content":content
        }));
        $ele.modal('show');
        $('[data-dismiss="modal"]',$ele).click(function(){
            $ele.modal('destory');
        });
        $ele.draggable({
            handle:'.modal-header'
        });
        
    };
    
    
    
    $.extend($.infinitescroll.defaults,{
        pixelsFromNavToBottom:50,
        appendCallback:false,
        dataType:'json'
    });

    //common
    (function(){
        jQuery('.panel .tools .fa-chevron-down').click(function () {
            var el = jQuery(this).parents(".panel").children(".panel-body");
            if (jQuery(this).hasClass("fa-chevron-down")) {
                jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
                el.slideDown(200);
            }
        });

        jQuery('.panel .tools .fa-times').click(function () {
            jQuery(this).parentsUntil(".panel").parent().remove();
        });

        $(function(){
            
            
        });

        $(".knob").each(function(){
            $(this).knob();
        });

        
        
        if ($(".custom-bar-chart")) {
            $(".bar").each(function () {
                var i = $(this).find(".value").html();
                $(this).find(".value").html("");
                $(this).find(".value").animate({
                    height: i
                }, 2000)
            })
        }
        $('.go-top').click(function(){
            $('body').animate({
                scrollTop:0
            },300);
            return false;
        });
        $('form.ajax').each(function(){
            var $this=$(this);
            var $submit=$('.fa-search',$this);
            $this.submit(function(){
                submit();
                return false;
            });
            $submit.click(function(){
                submit();
            });
            function submit(){
//                console.log('submit');
            }
        });
        
/*        $(document).on('click','[data-toggle=slide]',function(){
            var $target=$($(this).attr('href'));
            $target.slideToggle();
            return false;
        });*/
        
        
        $('.auto-tpl').each(function(){
            var $this=$(this);
            var $tpl=$('#tpl-'+$this.attr('id'));
            
            if($tpl.size()>0){
                $this.renderJSON($this.data('url'),$this.attr('id'),1);
            }
        });
        
        $('.fb-timeliner').on('click','li>a',function(){
            var $this=$(this);
            var $target=$('a[name="'+$this.attr('href').substr(1)+'"]');
            $this.parent().addClass('active').siblings().removeClass('active');
            if($target.size()<1){
                return false;
            }
            $('body').animate({
                scrollTop:$target.offset().top-80
            },500);
            return false;
        });
        
    })();

    //main menu
    (function(){
        var $this=$('#main_menu');
        var $sub=$('#sub-menu');
        var $menus=$('>li>a',$this);
        var $uls=$('>ul',$sub);
        if(!$this.size()){return false;}
        $('>li>a',$this).tooltip({
            placement:'bottom',
            container:'.header',
            trigger:'manual'
        });
        
        
        $('>li>a',$this).hover(function(){
            var i=$(this).parent().index();
            var x=$(this).offset().left;
            var $ul=$uls.eq(i);
//            $menus.tooltip('hide');
            
            $(this).tooltip('show').parent().siblings().children().tooltip('hide');
            if($ul.children().size()<1){
                $sub.hide();
                
            }else{
                $sub.show();
            }
            $uls.hide();
            $ul.css({
                marginLeft:x-$ul.width()/2+30
            }).show();
        },function(){
            $(this).tooltip('hide');
        });
    })();

    //calendar
    (function(){
        var $wrapper = $( '#custom-inner' );
        var $calendar = $( '#calendar' );
        if(!$calendar.size()){ return false; }
        var cal = $calendar.calendario( {
            displayWeekAbbr : true
        } );
        var $month = $( '#custom-month' ).html( cal.getMonthName() );
        var $year = $( '#custom-year' ).html( cal.getYear() );
        $( '#custom-next' ).on( 'click', function() {
            cal.gotoNextMonth( updateMonthYear );
        } );
        $( '#custom-prev' ).on( 'click', function() {
            cal.gotoPreviousMonth( updateMonthYear );
        } );
        function updateMonthYear() {
            $month.html( cal.getMonthName() );
            $year.html( cal.getYear() );
        }
    })();
    
    //checkbox/radio
    var checkbox=function(){
        $('label.checkbox-inline,.checkbox').addClass('label_check');
        $('label.radio-inline,.radio').addClass('label_radio');
        var sel='label.label_check,label.label_radio';
        
        $(sel).each(function(){
            var $this=$(this);
            var $target=$('#'+$this.attr('for'));
            var type=$this.is('.label_check')?'check':'radio';
            var name=$target.attr('name');
            applyStyle(name);
            function applyStyle(name){
                var $eles=$('[name="'+name+'"]');
                $eles.each(function(){
                    var stat=$(this).prop('checked');
                    var prefix=type=='check'?'c':'r';
                    var cls=prefix+'_'+(stat?'on':'off');
                    var clsElse=prefix+'_'+(stat?'off':'on');
                    $(this).parent().addClass(cls).removeClass(clsElse);
                });
                
            }
            
            $target.on('change',function(){
                applyStyle($(this).attr('name'));
            })//.change();
        });
    };

    //applyForm
    var applyForm=function(){
        $('.datepicker').datepicker();
        $('.timepicker').timepicker();
        $('.datetime').datetimepicker();
        checkbox();
        $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
        
        
        $('img.clickToRefresh').click(function(){
            var src=$(this).attr('src');
            //下面这句根据需要修改，防止验证码缓存
            src=src.replace(/(\?.*)/i,'')+'?_rnd='+Math.random();
            $(this).attr('src',src);
        });

        var checkin = $('.dpd1').datepicker({
            onRender: function(date) {
                return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function(ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date)
                newDate.setDate(newDate.getDate() + 1);
                checkout.setValue(newDate);
            }
            if(ev.viewMode=='days'){
            
                checkin.hide();
                $('.dpd2')[0].focus();
            }
        }).data('datepicker');
        var checkout = $('.dpd2').datepicker({
            onRender: function(date) {
                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function(ev) {
            if(ev.viewMode=='days'){
                checkout.hide();
            }
        }).data('datepicker');
    };
    applyForm();
    
    
    //refresh
    function refresh(){
        $('.rating[data-value]').each(function(){
            var val=parseInt($(this).data('value'));
            $('>span:lt('+val+')',$(this)).addClass('hover');
        });
        $('.tooltips').tooltip({
            container:'body'
        });
        $('.tooltips-show').tooltip({
            trigger:'manual'
        }).tooltip('show');
        
    }
    refresh();

    //home-activity
    (function(){
        
        var loadCount=2; //一共加载次数
        var sel='#home-act';
        var $wrap=$(sel);
        var cur=0;
        if($wrap.size()<1){return false;}
        $wrap.renderJSON('ajax/activity.json','act');
        $wrap.infinitescroll({},function(data){
            $wrap.render('act',data);
            if(++cur>=loadCount){
                $wrap.infinitescroll('pause');
            }
        });
        
    })();

//    //home-report
//    (function(){
//        var $wrap=$('#home-report');
//        if($wrap.size()<1){
//            return false;
//        }
//        $wrap.renderJSON($wrap.data('url'),$wrap.attr('id'),true,function(){
//            $wrap.owlCarousel({
//                items:5,
//                navigation:false
//            });
//            $('.tooltips',$wrap).tooltip({
//                container:'body'
//            });
//            
//            var carousel=$wrap.data('owlCarousel');
//            $wrap.parent().on('click','>.prev',function(){
//                carousel.prev();
//            });
//            $wrap.parent().on('click','>.next',function(){
//                carousel.next();
//            });
//        });
//    })();

    //report
    (function(){
        var loadCount=3; //一共加载次数
        var sel='#report-list';
        var $wrap=$(sel);
        var cur=0;
        if(!$wrap.size()){return false;}
        $wrap.render('report',{"data":{
            "color":"purple",
            "date":"此时此刻",
            "content":"我的报告我来传 <a href=\"#modal-upload\" data-toggle=\"modal\">立即上传</a>",
            "pos":"right"
        }});
        $wrap.renderJSON('ajax/report.json','report',0,refresh);
        
        
        $wrap.infinitescroll({},function(data){
            $wrap.render('report',data);
            refresh();
            if(++cur>=loadCount){
                $wrap.infinitescroll('pause');
            }
        });
        
    })();

    //profile  
    (function(){
        if($('#tc_profile_1').size()<1){
            return false;
        }
        $('#tc_profile_1>form').validate({
            rules:{
                nick:{
                    required:true,
                    rangelength:[3,20],
                    remote:"ajax/chkNick"   //检测用户名是否可用的URL
                },
                
                gender:"required",
                
                birth:"required",
                mobile:{
                    mobile:true
                },
                email:{
                    
                    email:true
                },
            }
        });
        $('#tc_profile_2>form').validate({
            rules:{
                email:{
                    
                    email:true
                },
                mobile:{
                    mobile:true
                }
            }
        });
        $('#tc_profile_3>form').validate({
            rules:{
                height:{
                    required:true,
                    number:true,
                    min:10,
                    max:300
                },
                weight:{
                    required:true,
                    number:true,
                    min:10,
                    max:500
                }
                
            }
        });
        $('#tc_profile_4>form').validate({
            rules:{
                password:{
                    required:true,
                    rangelength:[6,30]
                },
                newPassword:{
                    required:true,
                    rangelength:[6,30]
                },
                newPassword2:{
                    required:true,
                    equalTo:"newPassword",
                    rangelength:[6,30]
                }
                
            }
        });
//        $('#tc_profile_2').addClass('active').siblings().removeClass('active');
//        $('.nav-tabs>li:eq(2)>a').click();
        $('[data-form]').each(function(){
            var $this=$(this);
            $this.buildForm($(this).data('form'),function(key){
                if(key=='diseases'){
                    var $labelNone=$('>:first',$this);
                    $labelNone.addClass('label-none');
                    $labelNone.children().change(function(){
                        if($(this).prop('checked')){
                            $(this).parent().siblings().hide().children().prop("checked",false);
                        }else{
                            $(this).parent().siblings().fadeIn();
                        }
                    }).change();
                }
            });
        });
        
       
    })();

    //profile-city
    (function(){
        $('#f_prov').change(function(){
            var $city=$('#f_city');
            $city.renderJSON('ajax/city.json?provId='+$(this).val(),'city',true);
        });
    })();
    
    //app
    (function(){//app
        $('[data-hover-img]').each(function(){
            var $this=$(this);
            var $wrap=$this.parent().parent();
            $wrap.css({
                position:'relative'
            });
            var $img=$('<img class="app-qr" />').attr('src',$this.data('hover-img'));
            $this.hover(function(){
                $img.appendTo($wrap).fadeIn();
            },function(){
                $img.fadeOut().remove();
            });
//            $this.tooltip({
//                trigger:'hover',
//                placement:'auto top',
//                html:true,
//                title:'<img src="'+$this.data('hover-img')+'" height="80" />'
//            });
//            
        });
    })();
    
    //home-chart
    (function(){
        if(!$('#home-trend').size()){return false;}
        var chart=echarts.init($('#home-trend')[0]);
        var days=[];
        var d=null;
        var date=new Date();
        for(var t=-30;t<=0;t++){
            d=new Date(date.getTime()+t*86400000);
            days.push((d.getMonth()+1)+'月'+d.getDate()+'日');
        }
        
        var option = {
            grid:{
                x:30,x2:10,y:30
            },
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:["我的指数","全国平均指数"]
            },
            dataZoom:{
                show:true,
                realtime:true,
                start:50
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : days
                }
            ],
            
            yAxis : [
                {
                    type : 'value',
//                    scale:true,
                    splitArea : {show : true}
                }
            ],
            series : [
                {
                    name:'我的指数',
                    type:'line',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor : 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    showAllSymbol:true,
                    data:function(){
                        var list = [];
                        for (var i = 1; i <= days.length; i++) {
                            list.push(Math.round(Math.random()* 30 +50));
                        }
                        
                        return list;
                    }()
                },
                {
                    name:'全国平均指数',
                    type:'line',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor : 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    data:function(){
                        var list = [];
                        for (var i = 1; i <= days.length; i++) {
                            list.push(Math.round(Math.random()* 10 +60));
                        }
                        return list;
                    }()
                }
                
                
            ]
        };
        chart.setOption(option);
    })();
    
    //login/rigister
    (function(){
        $('#form-login').validate({
            rules:{
                username:{
                    required:true,
                    rangelength:[3,20]
                },
                password:{
                    required:true,
                    rangelength:[6,30]
                }
            }
        });
        $('#form-register').validate({
            rules:{
                username:{
                    required:true,
                    rangelength:[3,20]
                },
                password:{
                    required:true,
                    rangelength:[6,30]
                },
                password2:{
                    required:true,
                    equalTo:"password"
                },
                accept:"required"
            },
            messages:{
                accept:"必须同意健康空间注册协议才能注册"
            }
        });
        
    })();

    
    //monitor-params
    (function(){
        $('#ms-params').each(function(){
            $(this).multiSelect({
                selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='搜索...'>",
                selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='搜索...'>",
                afterInit: function (ms) {
                    var that = this,
                        $selectableSearch = that.$selectableUl.prev(),
                        $selectionSearch = that.$selectionUl.prev(),
                        selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                        selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

                    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                        .on('keydown', function (e) {
                            if (e.which === 40) {
                                that.$selectableUl.focus();
                                return false;
                            }
                        });

                    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                        .on('keydown', function (e) {
                            if (e.which == 40) {
                                that.$selectionUl.focus();
                                return false;
                            }
                        });
                },
                afterSelect: function () {
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect: function () {
                    this.qs1.cache();
                    this.qs2.cache();
                }
            });
        });
    })();

    //monitor
    (function(){
        if(!$('#monitor-stat').size()){return false;}
        var chart=echarts.init($('#monitor-stat')[0]);
        
        
        var days=[];
        var d=null;
        var date=new Date();
        for(var t=-30;t<=0;t++){
            d=new Date(date.getTime()+t*86400000);
            days.push((d.getMonth()+1)+'月'+d.getDate()+'日');
        }
        
        var lastDay=days.pop();
        
        var options = {
            "1": {
                
                title: {
                    text: '',
                    x:'center',
                    subtext: 'Tip: 点击某一天的数据点可查看当天的详细评估结果'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ["舒张压", "收缩压"]
                },
                
                dataZoom: {
                    show: true,
                    realtime: true,
                    start: 0
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: days
                    }
                ],

                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} mmHg'
                        },
                        splitArea: {
                            show: true
                        }
                    }
                ],
                series: [
                    
                    {
                        name: '收缩压',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        showAllSymbol:true,
                        sections:{
                            min:0,
                            max:200,
                            name:['偏低','正常','偏高'],
                            value:[90,130,200],
                            type:['danger','success','danger'],
                            h2:['指数偏低。。。','恭喜！完全正常','偏高了。'],
                            p:['偏低应该怎么做。。。','继续保持','偏高应该怎么做。。。。']
                        },
                        data: function () {
                            var list = [];
                            for (var i = 1; i <= days.length; i++) {
                                list.push(Math.round(Math.random() * 50 + 90));
                            }
                            return list;
                        }()
                    },
                    {
                        name: '舒张压',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        showAllSymbol:true,
                        sections:{
                            min:0,
                            max:160,
                            name:['偏低','正常','偏高'],
                            value:[60,90,160],
                            type:['danger','success','danger'],
                            h2:['指数偏低。。。','恭喜！完全正常','偏高了。'],
                            p:['偏低应该怎么做。。。','继续保持','偏高应该怎么做。。。。']
                        },

                        data: function () {
                            var list = [];
                            for (var i = 1; i <= days.length; i++) {
                                list.push(Math.round(Math.random() * 30 + 60));
                            }
                            return list;
                        }()
                    }
                    

                ]
            },
            "2": {
                title: {
                    text: '',
                    x:'center',
                    subtext: 'Tip: 点击某一天的数据点可查看当天的详细评估结果'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ["体重"]
                },
                dataZoom: {
                    show: true,
                    realtime: true

                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: days
                    }
                ],

                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} kg'
                        },
                        splitArea: {show: true}
                    }
                ],
                series: [
                    {
                        name: '体重',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        showAllSymbol:true,
                        sections:{
                            min:0,
                            max:200,
                            name:['偏瘦','正常','偏胖','超重'],
                            value:[50,70,80,200],
                            type:['warning','success','warning','danger'],
                            h2:['哎呀！您有点偏瘦了。','恭喜！您的体重完全正常','哎呀。您好像有点偏胖了。','。。您还是赶紧减肥吧！'],
                            p:['多吃肉！！！！','继续保持','多吃蔬菜少吃肉吧。','少吃、多运动。']
                            
                        },
                        data: function () {
                            var list = [];
                            for (var i = 1; i <= days.length; i++) {
                                list.push(Math.round(Math.random() * 3+80-i*1.5));
                                
                            }
                            return list;
                        }()
                    }
                ]
            }
        };
        
        var $param=$('[data-value]',$('#params'));
        var $result=$('#monitor-eval-result');
        var $btnAdd=$('#btn-add-data');
        
        chart.on('click',function(data){
            
            renderData(data.seriesIndex,data.name,data.value);
            
        });
        function getStat(sections,value){
            var ret;
            var i;
            for(i=0;i<sections.value.length;i++){
                if(value<sections.value[i]){
                    break;
                }
            }
            ret={
                name:sections.name[i],
                type:sections.type[i],
                h2:sections.h2[i],
                p:sections.p[i]
            };
            
            return ret;
        }
        function renderData(index,name,value){
            var ret={};
            
            var param=chart.getOption();
            var series=chart.getSeries()[index];
            
            var sections=series.sections;
            sections["range"]=[];
            var _last=sections.min;
            for(var k in sections.value){
                sections.range.push((sections.value[k]-_last)/sections.max*100);
                _last=sections.value[k];
            }
            ret['name']=series.name;
            ret['value']=param.yAxis[0].axisLabel.formatter.replace('{value}',value);
            ret['date']=name;
            ret['stat']=getStat(sections,value);
            ret['percent']=value/sections.max*100;
            ret['sections']=sections;
            
            $result.render($result.attr('id'),ret,1);
            refresh();
        }
        $('#params').on('click','[data-value]',function(){
            var param= $.trim($(this).data('value'));
            var option=options[param];
            chart.clear();
            chart.setOption(option);
            window.currentParam=param;
            
            var index,name,data,series;
            index=0;
            series=chart.getSeries()[index];
            name=option.xAxis[0].data[series.data.length-1];
            data=series.data.pop();
            
            renderData(index,name,data);
            
            $('fieldset[data-param="'+param+'"]').show().siblings().hide();
        });
        $('#params').on('click','[data-value] + button',function(){
            $(this).parent().remove();
        });
        
        
        $param.first().click();
        
        
        $('#modal-add-data .submit').click(function(){
            var $fields=$('fieldset.params:visible :input');
            var data=[];
            $fields.each(function(i){
                data.push([i,$(this).val()]);
            });
            chart.addData(data);
            $('#modal-add-data').modal('hide');
            return false;
        });
        
        
    })();

    //evaluate
    (function(){
        $('#eval-all').each(function(){
            var days=[];
            var d=null;
            for(var t=Date.parse('2014-3-20');t<new Date();t+=86400000){
                d=new Date(t);
                days.push((d.getMonth()+1)+'.'+d.getDate());
            }
            var chart=echarts.init(this);
            chart.setOption({
                grid:{
                    x:20,
                    y:20,
                    x2:20,
                    y2:20
                },
                
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLine:{ show:false },
                        axisLabel:{ show:false },
                        axisTick:{show:false},
                        data: days
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine:{ show:false },
                        axisLabel:{ show:false },
                        scale:true,
                        splitArea: {show: true}
                    }
                ],
                
                series: [
                    {
                        name: '健康指数',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data: function () {
                            var list = [];
                            for (var i = 1; i <= days.length; i++) {
                                list.push(Math.round(Math.random() * 40 + 60));
                            }
                            return list;
                        }()
                    }

                ]
            });
        });

        $('.eval-item').each(function(){
            var days=[];
            var d=null;
            for(var t=(new Date())-86400000*5;t<new Date();t+=86400000){
                d=new Date(t);
                days.push((d.getMonth()+1)+'.'+d.getDate());
            }
            var chart=echarts.init(this);
            chart.setOption({
                grid:{
                    x:5,y:5,x2:5,y2:5,borderWidth:0
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel:{show:false},
                        axisLine:{show:false},
                        axisTick:{show:false},
                        splitNumber:1,
                        splitArea: {show: false},
                        splitLine:{show:false},
                        data: days
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLabel:{show:false},
                        axisLine:{show:false},
                        axisTick:{show:false},
                        splitNumber:1,
                        scale:true,
                        splitLine:{show:false},
                        splitArea: {show: false}
                    }
                ],
                series: [
                    {
                        name: '健康指数',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data: function () {
                            var list = [];
                            for (var i = 1; i <= days.length; i++) {
                                list.push(Math.round(Math.random() * 40 + 60));
                            }
                            return list;
                        }()
                    }

                ]
            });
        });
    })();
    
    //sport
    (function(){

        var $this=$('#sport-slide');
        if($this.size()<1){
            return false;
        }
        
        var $desc=$('#sport-desc');
        var jsonPath='ajax/sport1.json';
        var $filter=$('#filter-sport');
        var param={};
        $filter.renderJSON('ajax/sport-filter.json',$filter.attr('id'),1);
        $filter.on('click','ul>li>a',function(){
            var $a=$(this);
            $a.parent().addClass('active-danger').siblings().removeClass('active-danger');
            param=buildParam();
            applyFunction(param);
            return false;
        });
        
        function buildParam(){
            var ret={};
            $('>ul',$filter).each(function(){
                ret[$(this).data('field')]=$('.active-danger>a',$(this)).data('value');
            });
            return ret;
        }
        
        applyFunction(param);
        
        function applyFunction(param){
            var url=jsonPath+'?'+$.param(param);
            
            $.getJSON(url,function(data){
                //data=data.slice(parseInt(Math.random()*data.length));
                //console.log(data.length);
                $desc.render($desc.attr('id'),data,true);
                $this.render($this.attr('id'),data,true);
                afterInit();
            });
            
        }
        function afterInit(){
            var options={
                afterInit:function(){
                    this.goTo(1);
                    $('li',$this).each(function(i){
                        $('>a',$(this)).click(function(){
                            carousel.goTo(i-1);
                            return false;
                        });
                    });

                },
                afterMove:function(){
                    var $items=this.$userItems;
                    var cur=this.currentItem+1;
                    var $cur=$($items[cur]);
                    $items.removeClass('active');
                    $cur.addClass('active');
                    $desc.children().hide().eq(cur-1).fadeIn();
                },
                items:3,
                rewindNav:false,
                pagination:false,
                navigation:false
            };
            var carousel=$this.data('owlCarousel')
            if(carousel){
                carousel.reinit(options);
            }else{
                $this.owlCarousel(options);
                carousel=$this.data('owlCarousel')
            }
            

            

            $this.parent().on('click','>.prev',function(){
                carousel.prev();
            });
            $this.parent().on('click','>.next',function(){
                carousel.next();
            });
        }
            
        
    })();
    
    //sport_eval
    (function(){//sport_eval
        
        
        var $fields=$('#sport-fields');
        if($fields.size()<1){
            return false;
        }
//        $fields.renderJSON('ajax/sport-fields.json','diary-item',true);
        

        var $th=$fields; //tab head
        var $modal=$('#modal-items');
        var $result=$('#eval-result');
        var $list=$('#sport-items-list');
        var $tab=$('#tab-sport-eval');
        
//        $.getJSON('ajax/sport-eval.json',function(data){
//            var cats=[];
//            for(var k in data){
//                if($.inArray(cats,data[k])){
//                    cats.push({"name":data[k]});
//                }
//            }
//            $tab.render($(this).attr('id'),cats,1);
//            
//        });
//        $list.renderJSON('ajax/sport-items.json','sport-items-list',true,function(){
////            $('>li>a',$list).click();
//        });

        setTimeout(function(){
            $('#tc-1 a:lt(3)').click();
            cal();
        },100);
        
        $list.on('click','li>a',function(){
            addItem($(this).data());
            return false;
        });
        $fields.on('click','a.remove',function(){
            $(this).parent().parent().remove();
            cal();
            return false;
        });
        
        function addItem(data){
            if($('[data-id="'+data.id+'"]',$th).size()>0){
                return false;
            }
            $th.render('diary-item',[data]);
            cal();
        }
        
        
        $th.on('change keyup','[data-power]',function(){
            if(isNaN($(this).val())){
                $(this).val(0);
            }
            cal();
            
        });
        
        function cal(){
            var power=0;
            $('[data-power]',$th).each(function(){
                var val=$(this).val();
                if(!val){
                    val=0;
                }
                power+=parseFloat(val)*parseFloat($(this).data('power'));
            });
            
            $('h1',$result).countTo(power);
//            .text(power);
        }
        
        $('#btn-eval').click(function(){
            cal();
            $result.hide().fadeIn();
            return false;
        });
        
        
        
    })();
    
    
    //meals
    (function(){//meals
        
        var $mContent=$('#meals-content');
        if($mContent.size()<1){
            return false;
        }
        var myMeals=[];
        var $num=$('#meals-panel>span');
        var $tab=$('#meals-tabs');
        
        $('>div',$mContent).renderJSON('ajax/meals.json','meals');
        $('>div',$mContent).renderJSON('ajax/meals.json','meals',false,function(){
            $('.adtocart:first').click();
        });
        
        $('#meals-category>li>a').click(function(){
            var $this=$(this);
            var $panel=$('#meals-content>div:visible');
            $this.parent().addClass('active-danger').siblings().removeClass('active-danger');
            $panel.renderJSON('ajax/meals.json?cid='+$this.data('cid'),'meals',true);
            return false;
        });
        $('#meals-search .fa-search').click(function(){
            var kw= encodeURIComponent($.trim($('#meals-kw').val()));
            if(kw.length<1){
                return false;
            }
            var $this=$(this);
            var $panel=$('#meals-content>div:visible');
            var cid=$('#meals-category>li.active-danger>a').data('cid') || "";
            $panel.renderJSON('ajax/meals.json?cid='+cid+'&kw='+kw,'meals',true);
            return false;
        });


        $('#meals-panel').click(function(){
            $('#meals-desk').fadeToggle();
        });

        $mContent.on('click','a.adtocart',function(){
            var data=$(this).data();
            var index=$('>.active',$tab).index()+1;
            
            var $target=$('#meals-desk-'+index);
            if($('>[data-id="'+data.id+'"]',$target).size()>0){
                return false;
            }
            if($.inArray(data.id,myMeals)<0){
                myMeals.push(data.id);
            }
            $target.render('meals-desk',{
                "data":data
            });

            update();

            return false;
        });
        
        $('#meals-desk').on('click','a.close-desk',function(){
            $(this).parent().remove();
            var i= $.inArray($(this).parent().data('id'),myMeals);
            if(i>-1){
                myMeals.splice(i,1);
            }
            update();
            return false;
        });
        
        $("a.meals-close").click(function(){
            $(this).parent().fadeOut();
            return false;
        });
        
        function update(){
            $('div.spinner-meals').spinner({value:0, step: 0.5, min: 0, max:10});
            var num=$('div.meals-desk-list').size();
            
            $num.text(num).animate({
                top:-70,
                left:-8,
                fontSize:50
            },100).animate({
                top:0,
                left:0,
                fontSize:18
            },300);
            
            $('.panel',$mContent).removeClass('active');
            $('img.adtocart-img',$mContent).attr('src','img/cart-orange.png');
            for(var k in myMeals){
                var id=myMeals[k];
                var $obj=$('[data-id="'+id+'"]',$mContent);
                var $target=$obj.parent().parent();
                $('>img',$obj).attr('src','img/cart-blue.png');
                $target.addClass('active');
            }
        }
        
        
        function startEval(){
            $('#chart-polygon').each(function(){
                var chart=echarts.init(this);
                chart.setOption({
                    tooltip : {
                        trigger: 'axis'
                    },

                    legend: {
                        orient : 'vertical',
                        x : 'right',
                        y : 'bottom',
                        textStyle:{color:'#f0f0f0'},
                        data:['标准值','实际值']
                    },
                    polar : [
                        {
                            name:{
                                textStyle:{color:'#f0f0f0'}
                            },
                            indicator : [
                                { text: '能量', max: 1000},
                                { text: '蛋白质', max: 1000},
                                { text: '碳水化合物', max: 1000},
                                { text: '脂肪', max: 1000}
                            ]
                        }
                    ],
                    series : [
                        {

                            type: 'radar',
                            data : [
                                {
                                    value : [600, 700, 800, 300],
                                    name : '标准值'
                                },
                                {
                                    value : [400, 200, 700, 200],
                                    name : '实际值'
                                }
                            ]
                        }
                    ]
                });
            });

            (function(){
                var chart=echarts.init($('#chart-power1')[0]);
                chart.setOption({

                    title : {
                        text: '标准值',
                        textStyle:{
                            color:'#f0f0f0'
                        },
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    series : [
                        {
                            type:'pie',
                            radius : '60%',
                            center: ['50%', '50%'],
                            data:[
                                {value:32, name:'碳水化合物'},
                                {value:50, name:'蛋白质'},
                                {value:18, name:'脂肪'}
                            ]
                        }
                    ]
                });
                var chart=echarts.init($('#chart-power2')[0]);
                chart.setOption({

                    title : {
                        text: '实际值',
                        textStyle:{
                            color:'#f0f0f0'
                        },
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    series : [
                        {
                            type:'pie',
                            radius : '60%',
                            center: ['50%', '50%'],
                            data:[
                                {value:22, name:'碳水化合物'},
                                {value:45, name:'蛋白质'},
                                {value:33, name:'脂肪'}
                            ]
                        }
                    ]
                });

            })();

            (function(){
                var chart=echarts.init($('#chart-meals1')[0]);
                chart.setOption({

                    title : {
                        text: '标准值',
                        textStyle:{
                            color:'#f0f0f0'
                        },
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    series : [
                        {
                            type:'pie',
                            radius : ['40%','60%'],
                            center: ['50%', '50%'],
                            data:[
                                {value:32, name:'早餐'},
                                {value:50, name:'中餐'},
                                {value:18, name:'晚餐'}
                            ]
                        }
                    ]
                });
                var chart=echarts.init($('#chart-meals2')[0]);
                chart.setOption({

                    title : {
                        text: '实际值',
                        textStyle:{
                            color:'#f0f0f0'
                        },
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    series : [
                        {
                            type:'pie',
                            radius : ['40%','60%'],
                            center: ['50%', '50%'],
                            data:[
                                {value:22, name:'早餐'},
                                {value:45, name:'中餐'},
                                {value:33, name:'晚餐'}
                            ]
                        }
                    ]
                });

            })();
            refresh();
        }
        
        $('#btn-eval').click(function(){
            $('#meals-eval').fadeIn();
            startEval();
            return false;
        });
        
    })();
    
    //plan_create
    (function(){//plan_create
        
        var $th=$('#sport-items-tab'); //tab head
        if($th.size()<1){
            return true;
        }
        var $tc=$('#sport-items-config'); //tab content
        var $modal=$('#modal-items');
        var $list=$('#sport-items-list');
        var $arr=$('.arrow-up',$tc).first();
        var $pc=$('#panel-create');
        $tc.each(function(){
            var $this=$(this);
            
        });
        
        $list.renderJSON($list.data('url'),$list.attr('id'),true,function(){
            var id=(location.search.match(/\Wid=(\d+)/i) || [0]).pop();
            if(id<1){
                return true;
            }
            $pc.fadeIn();
            $('body').animate({
                scrollTop:$pc.offset().top-50
            },1000);
            $('a[data-id="'+id+'"]',$list).first().click();
        });
        
        
        $list.on('click','li>a',function(){
            addItem($(this).data());
            return false;
        });
         
        $th.on('show.bs.tab','>li>a',function(){
            var $this=$(this);
            var $li=$(this).parent();
            var cls='border-hover';
            
            $this.addClass(cls).parent().siblings().children('a').removeClass(cls);
            var l=$li.position().left+100+$li.width()/2;
            
            $arr.show().animate({
                left:l
            },300);
        });
        $th.on('click','>li>.close',function(){
            var $tc,$th;
            var $rel;
            $tc=$($(this).prev().attr('href'));
            $th=$(this).parent();
            $rel=$th.siblings().first();
            $th.remove();
            $tc.remove();
            
            $('>a:first',$rel).click();
        });
        
        
        function addItem(data){
            
            if($('[data-id="'+data.id+'"]',$th).size()>0){
                $modal.modal('hide');
                return false;
            }
            data.week="日 一 二 三 四 五 六".split(' ');
            for( var k in data.week){
                data.week[k]='星期'+data.week[k];
            }
            var $th_item=$(template.render('tpl-sport-tab',data));
            var $td_item=$(template.render('tpl-sport-item',data));
            
            $th.children().last().before($th_item);
            $tc.append($td_item);
            $td_item.each(function(){
                $("[data-toggle='switch']",$(this)).wrap('<div class="switch" />').parent().bootstrapSwitch();
                $('.spinner-plan-time').spinner({step: 5, min: 0, max:120});
                checkbox();
            });
            
            $th_item.children().first().click();
            $modal.modal('hide');
        }
        
        
        
        
    })();
    
    //how
    (function(){
        
        if($('.how').size()<1){
            return false;
        }
        
        (function(){
            var chart=echarts.init($('#chart-power')[0]);
            chart.setOption({
                title : {
                    
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter:"{b} {c}%"
                },
                series : [
                    {
                        type:'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        data:[
                            {value:32, name:'碳水化合物'},
                            {value:50, name:'蛋白质'},
                            {value:18, name:'脂肪'}
                        ]
                    }
                ]
            });
        })();

        (function(){
            var chart=echarts.init($('#chart-meals')[0]);
            chart.setOption({
                title : {
                    textStyle:{
                        color:'#f0f0f0'
                    },
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter:"{b} {c}%"
                },
                series : [
                    {
                        type:'pie',
                        radius : ['40%','60%'],
                        center: ['50%', '50%'],
                        data:[
                            {value:32, name:'早餐'},
                            {value:50, name:'中餐'},
                            {value:18, name:'晚餐'}
                        ]
                    }
                ]
            });
        })();
        
        $('#how-menu').each(function(){
            var $this=$(this);
            $.getJSON('ajax/how-menu.json',function(data){
                var html='<tr>\
                    <th>餐次</th>\
                    <th>菜名</th>\
                    <th>食材名称</th>\
                    <th>食材量</th>\
                </tr>';
                
                
                for(var i in data){
                    
                    var cat=data[i][0];
                    
                    html+='<tr>';
                    for(var j in data[i]){
                        if(j>0){
                            cat=data[i][0]+'-'+data[i][1]
                        }
                        html+='<td data-cat="'+cat+'" data-text="'+data[i][j]+'">'+data[i][j]+'</td>';
                    }
                    html+='</tr>';
                }
                $this.html(html);
                $('td',$this).each(function(i){
                    var index=i%4;
                    if(index>1){
                        return true;
                    }
                    var $td=$(this);
                    var i=1;
                    var $rel=$td;
                    
                    while(1){
                        $rel=$rel.parent().next().children(index)
                            .filter('[data-text="'+$rel.data('text')+'"][data-cat="'+$rel.data('cat')+'"]');
                        if($rel && $rel.size()>0){
                            i++;
                            $rel.attr('data-del',true);
                        }else{
                            if(i>1){
                                $td.attr('data-rows',i);
                            }
                            break;
                        }
                    }
                });
                $('td[data-del]').remove();
                $('td[data-rows]').each(function(){
                    $(this).attr('rowspan',$(this).data('rows'));
                });
            });
        });
        
    })();
    
    //chronic
    (function(){
        var $wrap=$('#chronic-cats');
        if($wrap.size()<1){
            return false;
        }
        $wrap.renderJSON($wrap.data('url'),$wrap.attr('id'),true,function(){
            var colors=['#09f','#0cf','#0cf','#0cf','#39d','#90c5f0','#90a0dd','#90c5f0','#a0ddff','#99ccee','#aab5f0'];
            $('a>span',$wrap).each(function(){
                var fs=13+parseInt(Math.random()*25);
                var color=colors[parseInt(Math.random()*colors.length)];
                $(this).css({
                    color:color,
                    fontSize:fs
                });
            });
        });
        
        var param={};
        $('.sort-item').click(function(){
            var $this=$(this);
            $this.data('order-way',$this.data('order-way')=='desc'?'asc':'desc');
            $('>i',$this).toggleClass('fa-angle-down fa-angle-up');
            update($this.data());
            return false;
        });
        update(param);
        function update(param){
            $('#article-list').each(function(){
                $(this).renderJSON('ajax/article.json?'+ $.param(param),$(this).attr('id'),true);
            });
        }
        
    })();
    
    //evaluate_view
    (function(){
        $(function() {
            $('#default').stepy({
                backLabel: 'Previous',
                block: true,
                nextLabel: 'Next',
                titleClick: true,
                titleTarget: '.stepy-tab'
            });
        });
    })();
    
    
    //chronic_view
    (function(){
        $('#btn-fav').click(function(){
            var $this=$(this);
            var $num=$('>span',$this);
            $num.text(parseInt($num.text())+1);
            $this.prop('disabled',true);
        });
        $('#btn-thumb').click(function(){
            var $this=$(this);
            var $num=$('>span',$this);
            $num.text(parseInt($num.text())+1);
            $this.prop('disabled',true);
        });
        
    })();
    
   /* //search
    (function(){
        var $this=$('#form-search');
        if($this.size()<1){
            return false;
        }
        var $dialog=$('#dialog-window');
        var $nav=$('div.search-nav');
        var tpl='tpl-'+$dialog.attr('id')+'-';
        var $kw=$('[name="keyword"]',$this);
        $nav.on('click','a',function(){
            var $this=$(this);
            var src='img/icon/';
            $this.addClass('active').children('img').attr('src',src+$this.data('img')+'-active.png');
            
            $this.parent().siblings().each(function(){
                var $this=$(this).children('a');
                $this.removeClass('active')
                    .children('img').attr('src',src+$this.data('img')+'.png');
            });
            return false;
            
        });
        $('a:first',$nav).click();
        showDialog('tip',{
            "title":' <i class="fa fa-smile-o"></i> 专业搜索使用小贴士',
            "description":"<ul>" +
                "<li>1. 选择一类疾病</li>" +
                "<li>2. 在搜索框输入问题描述(不含疾病名称)</li>" +
                "<li>3. 按下键盘上的回车键或点击右侧的搜索图标进行搜索</li>" +
                "</ul>"
        });
        $this.submit(function(){
            var post={};
            post["keyword"]=$kw.val();
            post["avatar"]=$this.data('avatar');
            post["type"]=$('a.active',$nav).data('type');
            
            if(post.keyword.length<1){
                return false;
            }
            
            showDialog('user',post);
            setTimeout(function(){
                $.getJSON('ajax/search.json',post,function(data){
                    data.keyword=post.keyword;
                    showDialog(data.type,data);
                    
                });
            },500);
            return false;
            
        });
        
        $dialog.on('click','ul>li>a',function(){
            $kw.val($(this).data('keyword'));
            $this.submit();
            return false;
        });
        
        function showDialog(type,data){
            var $ele=$(template.render(tpl+type,data));
            $ele.hide().prependTo($dialog).slideDown(500);
            checkbox();
            
            if(type=='single'){
                var $feedback=$('.feedback',$ele);
                var $input=$('.feedback-input',$ele);
                var $form=$('form',$input);

                $form.validate({
                    rules:{
                        content:{
                            required:true,
                            rangelength:[3,256]
                        }
                    }
                });
                $form.submit(function(){
                    //TODO ajax
                    var post=$(this).serialize();
                    var content=$('[name="content"]',$(this)).val();
                    if(content.length<1){
                        return false;
                    }
                    $input.slideUp();
                    $.alert('提交成功，感谢您的反馈，我们会尽快完善。');
                    return false;
                });
                $(':radio',$feedback).change(function(){
                    if($(this).prop('checked') && $(this).val()>1){
                        $input.slideDown();
                    }else{
                        $input.slideUp();
                    }
                });
                
            }
        }
        
    })();*/
    
   /* //search1
    (function(){
        var $filter=$('[data-form="chronic"]');
        var $this=$('#form-search1');
        if($this.size()<1){
            return false;
        }
        var $dialog=$('#dialog-window');
        
        var tpl='tpl-'+$dialog.attr('id')+'-';
        var $kw=$('[name="keyword"]',$this);
        
        showDialog('tip',{
            "title":' <i class="fa fa-smile-o"></i> 食物宜忌使用小贴士',
            "description":"<ul>" +
                "<li>1. 选择一些慢病</li>" +
                "<li>2. 在搜索框输入问题描述(不含疾病名称)</li>" +
                "<li>3. 按下键盘上的回车键或点击右侧的搜索图标进行搜索</li>" +
                "</ul>"
        });
        $this.submit(function(){
            var post={};
            post["keyword"]=$kw.val();
            post["avatar"]=$this.data('avatar');
            post["chronic"]=[];
            $(':checked',$filter).each(function(){
                post["chronic"].push($(this).val());
            });
            
            if(post.keyword.length<1){
                return false;
            }
            
            showDialog('user',post);
            setTimeout(function(){
                $.getJSON('ajax/search1.json',post,function(data){
                    data.keyword=post.keyword;
                    showDialog(data.type,data);
                });
            },500);
            return false;

        });
        $dialog.on('click','ul>li>a',function(){
            $kw.val($(this).data('keyword'));
            $this.submit();
            return false;
        });

        function showDialog(type,data){
            var $ele=$(template.render(tpl+type,data));
            $ele.hide().prependTo($dialog).slideDown(500);
            checkbox();
            refresh();
            if(type=='single'){
                var $feedback=$('.feedback',$ele);
                var $input=$('.feedback-input',$ele);
                var $form=$('form',$input);

                $form.validate({
                    rules:{
                        content:{
                            required:true,
                            rangelength:[3,256]
                        }
                    }
                });
                $form.submit(function(){
                    //TODO ajax
                    var post=$(this).serialize();
                    var content=$('[name="content"]',$(this)).val();
                    if(content.length<1){
                        return false;
                    }
                    $input.slideUp();
                    $.alert('提交成功，感谢您的反馈，我们会尽快完善。');
                    return false;
                });
                $(':radio',$feedback).change(function(){
                    if($(this).prop('checked') && $(this).val()>1){
                        $input.slideDown();
                    }else{
                        $input.slideUp();
                    }
                });

            }
        }
        $filter.each(function(){
            var $this=$(this);
            $this.buildForm('chronic',function(){
                
            });
        });
        
    })();*/
    
    //evaluate
    (function(){
        var $this=$('#eval-history');
        if($this.size()<1){
            return false;
        }
        
        var url='ajax/eval-history.json';
        $this.on('click','a.prev,a.next',function(){
            var $a=$(this);
            
            $this.renderJSON(url+'?id='+$a.data('id'),$this.attr('id'),true,function(){
                afterRander();
            });
            
            return false;
        });
        
        $this.renderJSON(url,$this.attr('id'),true,function(){
            afterRander();
        });
        
        function afterRander(){
            $(".knob",$this).each(function(){
                $(this).knob();
            });
            $this.children('.panel-body').slideDown();
        }
    })();
    
    //evaluate_view
    (function(){
        var $view=$('#evaluate-view');
        var $form=$('#evaluate-form');
        if($view.size()<1){
            return false;
        }
        $form.renderJSON('ajax/evaluate.json',$form.attr('id'),true,function(){
            checkbox();
        });
        
    })();
    
})();
