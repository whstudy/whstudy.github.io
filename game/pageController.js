/**
 * Created by Administrator on 2014/11/15.
 */

function showFenShu(score)
{
    var ss = score.toString();
    $("#scoreT img").remove();
    for(var i = 0;i<ss.length;i++)
    {
        $("#scoreT").append(("<img src='assets/End/"+ss.charAt(i)+".png'/>"));
    }
}

function tryReStart()
{
    reStart();
}

function showGuiZhe()
{
    $("#introPage").show();
    backui.pause(true);
}
function hideGuiZhe()
{
    $("#introPage").hide();
    backui.pause(false);
}

function showPaiHangBang()
{
    //去服务器拉数据
    var option = {
        url:"chengji.php",
        type:'get',
        dataType:'text',
        data:{},
        success:function(data1)
        {
            var returnD = JSON.parse(data1.toString());
            installTop10(returnD);
        }
    };
    $.ajax(option);


    $("#topPage").show();
    backui.pause(true);
}
function installTop10(data)
{
    $("#topContent ul").html("");
    for(var i = 0;i<data.length;i++)
    {
        var con = "<li><img src='assets/End/h"+(i+1).toString()+".png'/><span class='name'>"+data[i].name+":</span><span class='score'>"+data[i].score.toString()+"</span></li>";
        $("#topContent ul").append(con);
    }
}

function hidePaiHangBang()
{
    $("#topPage").hide();
    backui.pause(false);
}