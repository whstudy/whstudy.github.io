/**
 * Created by Administrator on 2014/11/13.
 */
var BackUI = function()
{
    //背景
    this.background;
    //游戏规则说明按钮
    this.shuoming;
    //排行榜按钮
    this.paihangbang;
    //剩余时间
    this.shengyushijian;
    //积分
    this.score = 0;
    this.scoreText;

    this.loader;

    this.container;

    this.paihangbang;
    this.guizhe;
    this.time;

    this.pro;

    //游戏进行了多长时间
    this.startTime = 0;

    this.init = function(loader)
    {
        this.loader = loader;
        this.container = new createjs.Container();

        this.background = new createjs.Bitmap(loader.getResult("background"));
        this.container.addChild(this.background);

        this.scoreText = new createjs.Text("Hello World", "20px Arial", "#ffffff");
        this.container.addChild(this.scoreText);
        this.scoreText.text = this.score.toString();
        this.scoreText.x = 90;
        this.scoreText.y = 20;

        this.paihangbang =  new createjs.Bitmap(loader.getResult("top"));
        this.container.addChild(this.paihangbang);
        this.paihangbang.y = 12;
        this.paihangbang.x = 240;
        this.paihangbang.addEventListener("click",showPaiHangBang);

        this.guizhe = new createjs.Bitmap(loader.getResult("top2"));
        this.container.addChild(this.guizhe);
        this.guizhe.y = 12;
        this.guizhe.x = 440;
        this.guizhe.addEventListener("click",showGuiZhe);

        this.time = new createjs.Container();
        stage.addChild(this.time);
        this.time.y = stage.canvas.height-70;
        this.time.x = 50;

        var lastTime = new createjs.Text("剩余时间","20px Arial bold","#aaaa00");
        this.time.addChild(lastTime);
        var bp = new createjs.Bitmap(loader.getResult("b"));
        this.time.addChild(bp);
        bp.y = 25;

        this.pro = new createjs.Bitmap(loader.getResult("b1"));
        this.time.addChild(this.pro);
        this.pro.y = 25;
        this.pro.scaleX = 0.5;

        var text0 = new createjs.Text("0'","20px Arial bold","#aaaaaa");
        this.time.addChild(text0);
        text0.y = 35;

        var text1 = new createjs.Text(totalTime.toString()+"'","20px Arial bold","#aaaaaa");
        this.time.addChild(text1);
        text1.y = 35;
        text1.x = 130;
    }

    this.start = function()
    {
        var date = new Date();
        this.startTime = 0;
        $("#endPage").hide();
        this.score = 0;
        this.lastTime = (new Date()).getTime();
        this.isPaused = false;
    }

    this.lastTime;
    this.update = function()
    {
        if(this.isPaused)
        {
            return;
        }
        this.scoreText.text = this.score.toString();

        var date = new Date();
        var pass = date.getTime() - this.lastTime;
        this.lastTime = date.getTime();
        this.startTime += pass;

        var passed = Math.floor((this.startTime)/1000);
        var pro = (this.startTime)/(1000*totalTime);
        pro = (pro>1?1:pro);

        this.pro.scaleX = pro;
        if(passed > totalTime)
        {
            //时间到了，弹出结束。结算分数
            $("#endPage").show();
            showFenShu(this.score);
            createjs.Sound.play("timeover");
            this.isPaused = true;
        }
    }

    this.isPaused = false;
    this.pause = function(p)
    {
        this.isPaused = p;
        scaleRoot.mouseEnabled = !this.isPaused;
        if(!this.isPaused)
        {
            //如果从暂停打开，需要重置时间
            this.lastTime = (new Date()).getTime();
        }
    }
}