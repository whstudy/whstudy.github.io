/**
 * Created with JetBrains WebStorm.
 * User: MUHE
 * Date: 14-11-13
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */

var stage;
var circle;
var scaleRoot;

var desginW = 640;
var desginH = 1008;
var fps = 30;

//倒计时30秒
var time = 30;
//8行5列
var row = 8;
var cloum = 5;
//总共有几种图参与消除
var imageType = 6;
//图的大小
var imgSize = 94;
//图间距
var useSize = 108;

//总时间是多少
var totalTime = 120;

var backui;
var board;

function startGame(){

    showOrHideFirstPage(false);

    var canvas=document.getElementById("mainCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    $(".widths").html(canvas.width);
    $(".heights").html(canvas.height);


    stage = new createjs.Stage("mainCanvas");
    stage.enableDOMEvents(true);
    createjs.Touch.enable(stage);

    /*circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0,0,5);
    stage.addChild(circle);*/

    scaleRoot = new createjs.Container();
    stage.addChild(scaleRoot);
    scaleRoot.scaleX = stage.canvas.width/desginW;

    scaleRoot.scaleY = stage.canvas.height/desginH;
    //scaleRoot.scaleY = scaleRoot.scaleX;
    //自动根据屏幕宽高比，来计算下使用的行数
    //row = Math.floor((stage.canvas.height-100)/useSize);
    //console.log("row is "+row);

    /*stage.on("stagemousemove", function(evt) {
        lastMouseX = evt.stageX;
        lastMouseY = evt.stageY;
        circle.x = evt.stageX;
        circle.y = evt.stageY;
    });*/

    backui = new BackUI();
    backui.init(preloader);
    scaleRoot.addChild(backui.container);
    backui.start();

    board = new Board();
    board.init(preloader);
    scaleRoot.addChild(board.container);
    board.container.x = (desginW-cloum*useSize)/2;
    board.container.y = 75;

    startUpadte();
}

function reStart()
{
    board.resetAllItems();
    backui.start();
}

var timeNow;
function update()
{
    var date = new Date();
    deltime = date.getTime()-timeNow;
    timeNow = date.getTime();
    date = null;
    $('#fps').html(Math.round(1000/deltime));


    backui.update();
    stage.update();
}

function startUpadte() {
    createjs.Ticker.addEventListener("tick", update);
    createjs.Ticker.setFPS(fps);
}

//////////////////////页面直接控制部分逻辑////////////////////////////////////

function showProgress(p)
{
    $("#progressBar").width(p*445);
    $("#progressCar").css("left",p*455-78);
}

function showOrHideFirstPage(show)
{
    if(show)
    {
        $("#preloading").show();
    }else
    {
        $("#preloading").hide();
    }
}

////////////////////////////////资源加载部分///////////////////////////////////////
var mainfest = [
    {id:"background",src:"Game/background.jpg"},
    {id:"top",src:"Game/top.png"},
    {id:"1",src:"1.png"},
    {id:"2",src:"2.png"},
    {id:"3",src:"3.png"},
    {id:"4",src:"4.png"},
    {id:"5",src:"5.png"},
    {id:"6",src:"6.png"},
    {id:"xg",src:"Game/xg.png"},
    {id:"b",src:"Game/b.png"},
    {id:"b1",src:"Game/b1.png"},
    {id:"top2",src:"Game/top2.png"},
    {id:"bomb",src:"sound/s_bomb.ogg"},
    {id:"cool",src:"sound/s_cool.ogg"},
    {id:"disappear5",src:"sound/s_disappear5.ogg"},
    {id:"timeover",src:"sound/s_timeover.ogg"},
];
var RR = 'assets/';
var preloader;
//开始下载资源
function startLoading()
{
    preloader = new createjs.LoadQueue(true,RR);
    preloader.installPlugin(createjs.Sound);
    preloader.on("complete",com);
    preloader.on("progress",progress);
    preloader.loadManifest(mainfest);
}

function com()
{
    $("#startBtn").show();
}

function progress(evt)
{
    showProgress(evt.progress);
}

////////////////////////////////////////////////////////////////////////////////////////