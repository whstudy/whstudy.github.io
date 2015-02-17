/**
 * Created by Administrator on 2014/11/13.
 */
var Board = function()
{
    //itemsArray 行列的内容表示
    this.ia;

    this.loader;
    this.container;
    this.itemsLayer;
    this.effectLayer;

    this.init = function(loader)
    {
        this.loader = loader;
        this.container = new createjs.Container();

        this.itemsLayer = new createjs.Container();
        this.effectLayer = new createjs.Container();
        this.container.addChild(this.itemsLayer);
        this.container.addChild(this.effectLayer);

        this.resetAllItems();

        this.container.addEventListener("mousedown",this.mouseDown);
        this.container.addEventListener("pressup",this.mouseUp);

        //测试动画
        /*var animation = this.createAnimation();
        animation.regX = animation.regY = 75;
        this.effectLayer.addChild(animation);*/
    }

    this.first = null;
    this.second = null;
    //选中第一个，和最后一个，是否是一次操作。中间鼠标没有离开。
    this.noup = false;

    this.mouseDown = function(evt)
    {
        //这个函数里不能用this。只能用board
        //console.log("mouse down "+evt.localX+" "+evt.localY);
        var xx = Math.floor(evt.localX/useSize);
        xx = (xx>=cloum?cloum-1:xx);
        var yy = Math.floor(evt.localY/useSize);
        yy = (yy>=row?row-1:yy);
        //console.log("xx "+xx+" yy"+yy);
        if(board.first == null)
        {
            board.first = board.ia[yy][xx];
            board.first.img.scaleX = board.first.img.scaleY= 1.1;
        }else
        {
            /*if(Math.abs(xx-board.first.cloum) + Math.abs(yy - board.first.row) == 1)
            {
                //相邻的，尝试交换
                board.tryChange(yy,xx);
            }else*/
            {
                //不相邻，换选择
                board.first.img.scaleX = board.first.img.scaleY = 1;
                board.first = board.ia[yy][xx];
                board.first.img.scaleX = board.first.img.scaleY= 1.1;
            }
        }
        this.noup = true;
    }

    this.mouseUp = function(evt)
    {
        //console.log("mouse up "+evt.localX+" "+evt.localY);
        if(board.first != null)
        {
            var xx = Math.floor(evt.localX/useSize);
            var yy = Math.floor(evt.localY/useSize);
            //console.log("xx "+xx+" yy"+yy);
            if(this.noup)
            {
                if(Math.abs(xx-board.first.cloum)>Math.abs(yy-board.first.row))
                {
                    yy = board.first.row;
                    if(xx>board.first.cloum)
                    {
                        xx = board.first.cloum+1;
                    }else{
                        xx = board.first.cloum-1;
                    }
                }else
                {
                    xx = board.first.cloum;
                    if(yy>board.first.row)
                    {
                        yy = board.first.row+1;
                    }else
                    {
                        yy = board.first.row-1;
                    }
                }
            }
            xx = (xx>=cloum?cloum-1:xx);
            xx = (xx>=0?xx:0);
            yy = (yy>=row?row-1:yy);
            yy = (yy>=0?yy:0);
            if(Math.abs(xx-board.first.cloum) + Math.abs(yy - board.first.row) == 1)
            {
                //相邻的，尝试交换
                board.tryChange(yy,xx);
            }else
            {
                //不相邻，换选择
                board.first.img.scaleX = board.first.img.scaleY = 1;
                board.first = board.ia[yy][xx];
                board.first.img.scaleX = board.first.img.scaleY= 1.1;
            }
        }else
        {
            this.noup = false;
        }
    }

    //尝试交换两个图标。如果可以交换，则交换。如果不可以交换。则转动一圈，还回到原来的位置。
    //继续默认选择第一个
    this.tryChange = function(row,cloum)
    {
        //先判断是否可以交换，以及交换后的消除情况
        this.second = this.ia[row][cloum];
        var canChange = false;
        if(this.first.type == this.second.type)
        {
            canChange = false;
        }else
        {
            var firstCanChange = this.canBeThree(this.second.row,this.second.cloum,this.first.type,this.first.row,this.first.cloum);
            var secondCanChange = this.canBeThree(this.first.row,this.first.cloum,this.second.type,this.second.row,this.second.cloum);
            console.log("fc:"+firstCanChange+ " ss:"+secondCanChange);
            canChange = firstCanChange||secondCanChange;
        }
        if(!canChange)
        {
            console.log("can't change ")
            //进入动画过程
            this.container.mouseEnabled = false;
            createjs.Tween.get(this.first.img).to({x:this.second.tobeX(),y:this.second.tobeY()},200).call(function() {
                createjs.Tween.get(board.first.img).to({x:board.first.tobeX(),y:board.first.tobeY()},200).call(function()
                {
                   board.container.mouseEnabled = true;
                });
            });
            createjs.Tween.get(this.second.img).to({x:this.first.tobeX(),y:this.first.tobeY()},200).call(function()
            {
                createjs.Tween.get(board.second.img).to({x:board.second.tobeX(),y:board.second.tobeY()},200);
            });
        }else
        {
            console.log("can cange");
            board.container.mouseEnabled = false;
            //换位，消除，补充，（消除，补充） 静止 ，查找是否死局
            var fc = this.first.cloum;
            var fr = this.first.row;
            this.first.cloum = this.second.cloum;
            this.first.row = this.second.row;
            this.second.cloum = fc;
            this.second.row = fr;
            this.ia[this.first.row][this.first.cloum]= this.first;
            this.ia[this.second.row][this.second.cloum] = this.second;
            createjs.Tween.get(this.first.img).to({x:this.first.tobeX(),y:this.first.tobeY()},200).call(function()
            {
                board.xiaochu();
            });
            createjs.Tween.get(this.second.img).to({x:this.second.tobeX(),y:this.second.tobeY()},200);
        }
    }

    //根据当前的情况，进行消除
    this.xiaochu = function()
    {
        /*var animation = this.createAnimation();
        animation.regX = animation.regY = 75;
        animation.x = this.first.tobeX();
        animation.y = this.first.tobeY();
        this.effectLayer.addChild(animation);
        animation.play();
        animation.addEventListener("animationend",this.buchong);*/

        var haveMoreToXiaochu = false;
        var canRemove = new Array();
        //横向计算
        for(var i = 0;i<row;i++)
        {
            var lasttype = -1;
            var num = 1;
            for(var j = 0;j<cloum;j++)
            {
                if(this.ia[i][j].type == lasttype)
                {
                    ++num;
                    if(num >= 3)
                    {
                        if(this.ia[i][j].gotoRemoveType == -1)
                        {
                            canRemove.push(this.ia[i][j]);
                        }
                        this.ia[i][j].gotoRemoveType = lasttype;
                        if(this.ia[i][j-1].gotoRemoveType == -1)
                        {
                            canRemove.push(this.ia[i][j-1]);
                        }
                        this.ia[i][j-1].gotoRemoveType = lasttype;
                        if(this.ia[i][j-2].gotoRemoveType == -1)
                        {
                            canRemove.push(this.ia[i][j-2]);
                        }
                        this.ia[i][j-2].gotoRemoveType = lasttype;
                        //不用考虑往前第四个，因为它在组成3个的时候，已经被搞定了
                        haveMoreToXiaochu = true;
                    }
                }else
                {
                    lasttype = this.ia[i][j].type;
                    num = 1;
                }
            }
        }
        //竖向计算
        for(var j = 0;j<cloum;j++)
        {
            var lasttype = -1;
            var num = 1;
            for(var i = 0;i<row;i++)
            {
                if(this.ia[i][j].type == lasttype)
                {
                    ++num;
                    if(num>=3)
                    {
                        if(this.ia[i][j].gotoRemoveType == -1)
                        {
                            canRemove.push(this.ia[i][j]);
                        }
                        this.ia[i][j].gotoRemoveType=lasttype;
                        if(this.ia[i-1][j].gotoRemoveType == -1)
                        {
                            canRemove.push(this.ia[i-1][j]);
                        }
                        this.ia[i-1][j].gotoRemoveType = lasttype;
                        if(this.ia[i-2][j].gotoRemoveType == -1)
                        {
                            canRemove.push(this.ia[i-2][j]);
                        }
                        this.ia[i-2][j].gotoRemoveType = lasttype;
                        haveMoreToXiaochu = true;
                    }
                }else
                {
                    lasttype = this.ia[i][j].type;
                    num = 1;
                }
            }
        }

        //遍历所有能消除的，播放动画，并且移除
        if(haveMoreToXiaochu)
        {
            //进行消除行为
            for(var i = 0;i<canRemove.length;i++)
            {
                var item = canRemove[i];
                var animation = this.createAnimation();
                animation.x = item.tobeX();
                animation.y = item.tobeY();
                animation.play();
                this.effectLayer.addChild(animation);
                if(i == 0)
                {
                    animation.addEventListener("animationend",board.buchong);
                }
                this.ia[item.row][item.cloum] = null;
                this.itemsLayer.removeChild(item.img);
                backui.score += 100;
            }
            createjs.Sound.play("disappear5");
        }else
        {
            //检查是否进入死局
            this.chazhaosiju();
        }
    }
    //补充掉消除掉的
    this.buchong = function()
    {
        board.effectLayer.removeAllChildren();
        var maxTime = 0;
        for(var j=0;j<cloum;j++)
        {
            //这是第几个要添加的。越考上，越久
            var cnum = 0;
            for(var i = row-1;i>=0;i--)
            {
                if(board.ia[i][j] == null)
                {
                    //如果这一项删除了，则向上查找，并且将上面的落下来
                    var findOne = null;
                    for(var x = i-1;x>=0;x--)
                    {
                        if(board.ia[x][j] != null)
                        {
                            findOne = board.ia[x][j];
                            board.ia[x][j] = null;
                            findOne.row = i;
                            break;
                        }
                    }
                    if(findOne == null)
                    {
                        findOne = new OneItem();
                        findOne.init(preloader,Math.floor(Math.random()*imageType),i,j);
                        findOne.img.y = -useSize/2-(useSize*cnum);
                        board.itemsLayer.addChild(findOne.img);
                        ++cnum;
                    }
                    board.ia[i][j] = findOne;
                    var time = (i-x+cnum)*100;
                    maxTime = Math.max(time,maxTime);
                    createjs.Tween.get(findOne.img).to({y:findOne.tobeY()},time);
                }
            }
        }
        createjs.Tween.get(board).wait(maxTime).call(function()
        {
           board.xiaochu();
        });
    }
    //计算是否进入了死局
    this.chazhaosiju = function()
    {
        //这里检查是否有死局，如果有，则重置。否则让用户继续操作。
        //先检查行，有两种形状可以检查 如果两个相连，则检查左右是否有可以拿到的。左边有3个方向可以来，右边也是3个方向
        //如果两个相同的相隔一个，则中间的这个有两个方向可以来。
        //列也是同理
        var haveMoreChaozuo = false;
        var changeOne,changeTwo;
        for(var i = 0;i<row;i++)
        {
            //先判断右边的情况
            for(var j = 0;j<cloum-2;j++)
            {
                if(board.ia[i][j].type == board.ia[i][j+1].type)
                {
                    if(i>=1)
                    {
                        if(board.ia[i-1][j+2].type == board.ia[i][j].type)
                        {
                            changeOne = board.ia[i-1][j+2];
                            changeTwo = board.ia[i][j+2];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                    if(i<row-1)
                    {
                        if(board.ia[i+1][j+2].type == board.ia[i][j].type)
                        {
                            changeOne = board.ia[i+1][j+2];
                            changeTwo = board.ia[i][j+2];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                    if(j<cloum-3)
                    {
                        if(board.ia[i][j+3].type == board.ia[i][j].type)
                        {
                            changeOne = board.ia[i][j+3];
                            changeTwo = board.ia[i][j+2];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                }
            }
            if(haveMoreChaozuo)
            {
                break;
            }
            //如果右边没有找到，找左边的试试
            for(var j = 2;j<cloum;j++)
            {
                if(board.ia[i][j-1].type == board.ia[i][j].type)
                {
                    var ctype = board.ia[i][j].type;
                    if(i>=1)
                    {
                        if(board.ia[i-1][j-2].type == ctype)
                        {
                            changeOne = board.ia[i-1][j-2];
                            changeTwo = board.ia[i][j-2];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                    if(i<row-1)
                    {
                        if(board.ia[i+1][j-2].type == ctype)
                        {
                            changeOne = board.ia[i+1][j-2];
                            changeTwo = board.ia[i][j-2];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                    if(j>2)
                    {
                        if(board.ia[i][j-3].type == ctype)
                        {
                            changeOne = board.ia[i][j-3];
                            changeTwo = board.ia[i][j-2];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                }
            }
            if(haveMoreChaozuo)
            {
                break;
            }
            //如果右边也没有，找中间
            for(var j = 0;j<cloum-2;j++)
            {
                if(board.ia[i][j].type == board.ia[i][j+2].type)
                {
                    var ctype = board.ia[i][j].type;
                    if(i>=1)
                    {
                        if(board.ia[i-1][j+1].type == ctype)
                        {
                            changeOne = board.ia[i-1][j+1];
                            changeTwo = board.ia[i][j+1];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                    if(i<row-1)
                    {
                        if(board.ia[i+1][j+1].type == ctype)
                        {
                            changeOne = board.ia[i+1][j+1];
                            changeTwo = board.ia[i][j+1];
                            haveMoreChaozuo = true;
                            break;
                        }
                    }
                }
            }
            if(haveMoreChaozuo)
            {
                break;
            }
        }
        if(!haveMoreChaozuo)
        {
            //查找完行，查找列.
            for(var j = 0;j<cloum;j++)
            {
                //先检查上上(上面两个连续，往下查看)
                for(var i = 0;i<row-2;i++)
                {
                    if(board.ia[i][j].type == board.ia[i+1][j].type)
                    {
                        var ctype = board.ia[i][j].type;
                        if(j>=1)
                        {
                            if(board.ia[i+2][j-1].type == ctype)
                            {
                                changeOne = board.ia[i+2][j-1];
                                changeTwo = board.ia[i+2][j];
                                haveMoreChaozuo = true;
                                break;
                            }
                        }
                        if(j<cloum-1)
                        {
                            if(board.ia[i+2][j+1].type == ctype)
                            {
                                changeOne = board.ia[i+2][j+1];
                                changeTwo = board.ia[i+2][j];
                                haveMoreChaozuo =true;
                                break;
                            }
                        }
                        if(i<row -3)
                        {
                            if(board.ia[i+3][j].type == ctype)
                            {
                                changeOne = board.ia[i+3][j];
                                changeTwo = board.ia[i+2][j];
                                haveMoreChaozuo = true;
                                break;
                            }
                        }
                    }
                }
                //如果上上没有，检查下下
                if(haveMoreChaozuo)
                {
                    break;
                }
                for(var i = 2;i<row;i++)
                {
                    if(board.ia[i][j].type == board.ia[i-1][j].type)
                    {
                        var ctype = board.ia[i][j].type;
                        if(j>=1)
                        {
                            if(board.ia[i-2][j-1].type == ctype)
                            {
                                changeOne = board.ia[i-2][j-1];
                                changeTwo = board.ia[i-2][j];
                                haveMoreChaozuo =true;
                                break;
                            }
                        }
                        if(j<cloum-1)
                        {
                            if(board.ia[i-2][j+1].type == ctype)
                            {
                                changeOne = board.ia[i-2][j+1];
                                changeTwo = board.ia[i-2][j];
                                haveMoreChaozuo = true;
                                break;
                            }
                        }
                        if(i>2)
                        {
                            if(board.ia[i-3][j].type == ctype)
                            {
                                changeOne = board.ia[i-3][j];
                                changeTwo = board.ia[i-2][j];
                                haveMoreChaozuo = true;
                                break;
                            }
                        }
                    }
                }
                //如果下下也没有，检查中间
                if(haveMoreChaozuo)
                {
                    break;
                }
                for(var i = 0;i<row-2;i++)
                {
                    if(board.ia[i][j].type == board.ia[i+2][j].type)
                    {
                        var ctype = board.ia[i][j].type;
                        if(j>=1)
                        {
                            if(board.ia[i+1][j-1].type == ctype)
                            {
                                changeOne = board.ia[i+1][j-1];
                                changeTwo = board.ia[i+1][j];
                                haveMoreChaozuo = true;
                                break;
                            }
                        }
                        if(j<cloum-1)
                        {
                            if(board.ia[i+1][j+1].type == ctype)
                            {
                                changeOne = board.ia[i+1][j+1];
                                changeTwo = board.ia[i+1][j];
                                haveMoreChaozuo = true;
                                break;
                            }
                        }
                    }
                }
                //如果中间查到，break。否者继续循环下一列
                if(haveMoreChaozuo)
                {
                    break;
                }
            }
        }
        if(haveMoreChaozuo)
        {
            /*createjs.Tween.removeAllTweens();
            createjs.Tween.get(changeOne.img).to({scaleX:1.2,scaleY:1.2},1000).loop = true;
            createjs.Tween.get(changeTwo.img).to({scaleX:1.2,scaleY:1.2},1000).loop = true;
            */board.container.mouseEnabled = true;
        }else
        {
            board.resetAllItems();
        }

    }

    //生成一个animation
    this.createAnimation = function()
    {
        var data = {
            framerate:10,
            images: ["assets/Game/xg.png"],
            frames: {width:150, height:150},
            animations: {exp:[0,6]}
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var animation = new createjs.Sprite(spriteSheet, "exp");
        animation.regX = animation.regY = 75;
        return animation;
    }


    //特定的位置特定的类型是否可以构成3个或者三以上
    this.canBeThree = function(row1,cloum1,type1,fromrow,fromcloum)
    {
        var canbe = false;
        //先横向
        for(var i = cloum1;i<=cloum1+2;i++)
        {
            if(i<cloum && i-1>=0 && i-2>=0)
            {
                if((i == cloum1)&&(this.ia[row1][i-2].type ==type1 && i-2 != fromcloum )&&( this.ia[row1][i-1].type == type1 && i-1 != fromcloum))
                {
                    return true;
                }
                if((i==cloum1+1) && (this.ia[row1][i-2].type == type1 && i-2 != fromcloum)&&(type1 == this.ia[row1][i].type && i != fromcloum))
                {
                    return true;
                }
                if((i==cloum1+2)&&(type1 == this.ia[row1][i-1].type && i-1 != fromcloum)&&(type1 == this.ia[row1][i].type && i!=fromcloum))
                {
                    return true;
                }
            }
        }
        for(var j = row1;j<=row1+2;j++)
        {
            if(j<row && j-1>=0 && j-2>=0)
            {
                if((j == row1)&&(this.ia[j-2][cloum1].type ==type1 && j-2 != fromrow)&&( this.ia[j-1][cloum1].type == type1 && j-1!=fromrow))
                {
                    return true;
                }
                if((j == row1+1) && (this.ia[j-2][cloum1].type == type1 && j-2!=fromrow)&&(type1 == this.ia[j][cloum1].type && j!=fromrow))
                {
                    return true;
                }
                if((j == row1+2)&&(type1 == this.ia[j-1][cloum1].type&&j-1!=fromrow)&&(j!=fromrow && type1 == this.ia[j][cloum1].type))
                {
                    return true;
                }
            }
        }
        return false;
    }

    this.resetAllItems = function()
    {
        this.itemsLayer.removeAllChildren();
        this.effectLayer.removeAllChildren();

        this.ia = new Array(row);
        for(var i = 0;i<row;i++)
        {
            var clo = new Array(cloum);
            this.ia[i] = clo;
        }

        //初始化一下，要求是：没有直接三个相连的。
        for(var i = 0;i<row;i++)
        {
            for(var j= 0;j<cloum;j++)
            {
                var m = 0;
                var value = Math.floor(Math.random()*imageType);
                while(!this.canUse(i,j,value))
                {
                    console.log(value);
                    var value = Math.floor(Math.random()*imageType);
                    m++;
                    if(m>20)
                    {
                        console.log(i.toString()+" "+ j.toString()+" too many try");
                        break;
                    }
                }
                var item = new OneItem();
                item.init(this.loader,value,i,j);
                this.itemsLayer.addChild(item.img);
                this.ia[i][j] = item;
            }
        }

        this.chazhaosiju();
    }
    //根据左边和上边的情况，判断初始化的时候，是否可以使用此图标
    //两个参数分别是这一个行和列,第三个参数是value
    this.canUse = function(ri,ci,value)
    {
        if(ri<2 && ci<2)
        {
            return true;
        }
        if(ri<2)
        {
            //只判断横向的
            if(this.ia[ri][ci-1].type != value || this.ia[ri][ci-2].type != value)
            {
                return true;
            }
            return false;
        }
        if(ci<2)
        {
            //之判断纵向的
            if(this.ia[ri-1][ci].type != value || this.ia[ri-2][ci].type != value)
            {
                return true;
            }
            return false;
        }
        //横向纵向都需要判断
        var same = ((this.ia[ri][ci-1].type == value && this.ia[ri][ci-2].type == value) ||
            (this.ia[ri-1][ci].type == value && this.ia[ri-2][ci].type == value));

        return !same;
    }

    this.update = function()
    {

    }
}