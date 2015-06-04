/**
 * Created by freedog on 14-3-20.
 */
;(function($){
    $.fn.freeSlide=function(o){
        o= $.extend(null, $.fn.freeSlide.defaults,o);
        return this.each(function(i){
            var $this=$(this);
            var $wrap=$this.children('div');
            var $ul=$wrap.children();
            var $li=$ul.children();
            var $btn=$this.children(o.prev+','+ o.next);
            var cur= o.start;
            var totalWidth=0;
            
            $li.each(function(){
                totalWidth+=$(this).outerWidth();
            });
            
            
            $ul.css({
                width:totalWidth+20
                
            });
//            console.log(totalWidth);
            $btn.css({
                top:($wrap.height()-$btn.outerHeight())/2
            });
            
            $btn.filter(o.prev).css({
                left:0
            }).click(function(){
                go(-1);
                return false;
            });
            
            $btn.filter(o.next).css({
                right:0
            }).click(function(){
                go(1);
                return false;
            });
            
            
            var go=function(i){
                var mLeft=parseInt($ul.css('left'));
                
                if(
                    (mLeft>=0 && i<0)
                    || ($ul.width()+mLeft<=$wrap.width() && i>0)
                    ){
                    return false;
                }
                
                $ul.stop(1,1).animate({
                    left:(i>0?'-':'+')+'='+Math.abs(i)*$li.first().outerWidth()
                }, o.speed,function(){
                    if(!o.circular){
                        return ;
                    }
                    if(i>0){
                        $li.first().remove().appendTo($ul);
                        $ul.css('marginLeft',0);
                    }if(i<0){
                        $li.last().remove().prependTo($ul);
                        $ul.css('marginLeft',0);
                    }
                    $li=$ul.children();
                });
            };
            go(o.start);
            
            
            
        });
    };
    $.fn.freeSlide.defaults={
        prev:'.prev',
        next:'.next',
        speed:200,
        circular:false,
        start:0,
        visible:5
    };
})(jQuery);
