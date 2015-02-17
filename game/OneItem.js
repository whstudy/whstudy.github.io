/**
 * Created by Administrator on 2014/11/13.
 */
var OneItem = function()
{
    this.img;
    this.row;
    this.cloum;

    this.loader;

    this.targetX;
    this.targetY;

    //是否正在向target移动
    this.isMoveing = false;
    //移动速度
    this.speed = 4;

    this.type;

    //是否被标记为消除 数字表示消除的种类
    this.gotoRemoveType = -1;

    this.init = function(loader,type,row,cloum)
    {
        this.loader = loader;
        this.row = row;
        this.cloum = cloum;

        this.type = type;
        this.installType(type);
    }

    this.installType = function(type)
    {
        var realType = type+1;
        this.img = new createjs.Bitmap(this.loader.getResult(realType.toString()));
        this.img.regX = this.img.regY = imgSize/2;

        this.img.x = (this.cloum+1)*useSize - useSize/2;
        this.img.y = (this.row+1)*useSize - useSize/2;

    }

    this.tobeX = function()
    {
        return (this.cloum+1)*useSize - useSize/2;
    }
    this.tobeY = function()
    {
        return (this.row+1)*useSize - useSize/2;
    }

}