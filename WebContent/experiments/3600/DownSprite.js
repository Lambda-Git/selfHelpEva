var DownSprite = cc.Sprite.extend({
    clickListener: null,
    gameObj: null,
    mark:null, 
    clickListener: null,

    ctor: function (mark, gameObj) {
        this.mark = mark;
        this._super("res/images/shapes/type" + q[0] + "_down" + a[mark] + ".png");
        this.attr({
            x: cc.winSize.width * (0.3 + mark * 0.4),
            y: 150,
            rotation: q[2] * rotAngle * Math.pow(-1,a[mark])
        });

        this.gameObj = gameObj;
        this.addClickListener();

    },
    reactTimeFunc: function(){
        this.scheduleOnce(this.timeUp,reactTime);
    },
    unReactTimeFunc: function(){
        this.unschedule(this.timeUp);
    },
    addClickListener: function(){
        this.clickListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0,0, s.width, s.height);
                if(cc.rectContainsPoint(rect, locationInNode)){
                    return true;
                }
                return false;
            },
            onTouchMoved: function(touch, event){
            },
            onTouchEnded: function(touch, event){
                endTime = new Date();
                rt = endTime - startTime;
                rtsetArray.push(rt);
                duration += rt;

                var target = event.getCurrentTarget();
                target.gameObj.downLeftImage.unReactTimeFunc();
                buttonsetArray.push(KeyPool[target.mark]);
                if(a[target.mark] == q[1]){
                    correctNum++;
                    target.matchAnim();
                }else{
                    wrongNum++;
                    target.matchAnim();
                }
            }
        });
        cc.eventManager.addListener(this.clickListener, this);
    },
    matchAnim: function(){
        cc.eventManager.removeAllListeners();
        var pos = this.gameObj.topImage.getPosition();
        var delt = this.height/2;
        var acf = cc.callFunc(this.nextCallBack, this);
        this.runAction(cc.sequence(cc.rotateTo(0.15*q[2],0),cc.moveTo(0.5,cc.p(pos.x,pos.y-152+delt)),cc.scaleTo(0.5,1),acf));
    },
    notUse: function(){
        var acf = cc.callFunc(this.callBack, this);
        this.runAction(cc.sequence(cc.fadeOut(0.5),acf));
    },
    callBack: function(){
        this.removeFromParent(true);
    },
    timeUp: function(){
        cc.eventManager.removeAllListeners();

        endTime = new Date();
        rt = 10000;
        rtsetArray.push(rt);
        duration += rt;

        wrongNum++;
        buttonsetArray.push("");

        this.nextCallBack();
    },
    nextCallBack: function(){
        this.gameObj.newLevel();
    }
});