var DownSprite = cc.Sprite.extend({
    clickListener: null,
    gameObj: null,
    mark:null, // 0表示左，1表示右
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
                    target.correctAnim();
                }else{
                    wrongNum++;
                    target.wrongAnim();
                }
            }
        });
        cc.eventManager.addListener(this.clickListener, this);
    },
    correctAnim: function () {
        cc.eventManager.removeAllListeners();
        var pos = this.gameObj.topImage.getPosition();
        var delt = this.height/2;
        var acf0 = cc.callFunc(this.showFbCorrectCallBack, this);
        this.runAction(cc.sequence(cc.rotateTo(0.15*q[2],0),cc.moveTo(0.5,cc.p(pos.x,pos.y-152+delt)),cc.scaleTo(0.5,1),acf0));
    },
    wrongAnim: function () {
        cc.eventManager.removeAllListeners();
        var pos = this.gameObj.topImage.getPosition();
        var delt = this.height/2;
        var acf0 = cc.callFunc(this.showFbWrongCallBack, this);
        this.runAction(cc.sequence(cc.rotateTo(0.15*q[2],0),cc.moveTo(0.5,cc.p(pos.x,pos.y-152+delt)),cc.scaleTo(0.5,1),acf0));
    },
    notUse: function(){
        var acf = cc.callFunc(this.callBack, this);
        this.runAction(cc.sequence(cc.fadeOut(0.5),acf));
    },
    callBack: function(){
        this.removeFromParent(true);
    },
    showFbCorrectCallBack: function(){
        var flower = new cc.Sprite(res.flower_png);
        flower.attr({
            x: cc.winSize.width * cc.random0To1(),
            y: -200,
            scale: 0,
            rotation:cc.randomMinus1To1()*360
        });
        this.gameObj.gamePanel.addChild(flower);
        var acf1 = cc.callFunc(this.updateScoreTxt, this);
        if(correctNum==1){
            flower.runAction(cc.sequence(cc.spawn(cc.moveTo(0.5,cc.p(cc.winSize.width*0.5,cc.winSize.height*0.5)),cc.scaleTo(0.5,1)),cc.scaleTo(0.1,1),cc.spawn(cc.moveTo(0.5,cc.p(cc.winSize.width*0.45,710)),cc.scaleTo(0.5,0.2)),cc.fadeOut(0.01),acf1));
        }else{
            flower.runAction(cc.sequence(cc.spawn(cc.moveTo(0.5,cc.p(cc.winSize.width*0.5,cc.winSize.height*0.5)),cc.scaleTo(0.5,1)),cc.scaleTo(0.1,1),cc.spawn(cc.moveTo(0.5,cc.p(cc.winSize.width*(0.45+cc.randomMinus1To1()*0.02),710*(1+cc.randomMinus1To1()*0.02))),cc.scaleTo(0.5,0.2)),acf1));
        }
    },
    showFbWrongCallBack: function(){
        this.gameObj.fbSprite = new cc.Sprite(res.wrong_png);
        this.gameObj.fbSprite.attr({
            x: cc.winSize.width * 0.5,
            y: cc.winSize.height * 0.5,
            scale:0
        });
        this.gameObj.gamePanel.addChild(this.gameObj.fbSprite);
        var acf = cc.callFunc(this.nextCallBack, this);
        this.gameObj.fbSprite.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.5),cc.scaleTo(0.5,1)),cc.scaleTo(1,1),acf));
    },
    timeUp: function(){
        cc.eventManager.removeAllListeners();

        endTime = new Date();
        rt = 10000;
        rtsetArray.push(rt);
        duration += rt;

        wrongNum++;
        buttonsetArray.push(" ");

        this.gameObj.fbSprite = new cc.Sprite(res.wrong_png);
        this.gameObj.fbSprite.attr({
            x: cc.winSize.width * 0.5,
            y: cc.winSize.height * 0.5,
            scale:0
        });
        this.gameObj.gamePanel.addChild(this.gameObj.fbSprite);
        var acf = cc.callFunc(this.nextCallBack, this);
        this.gameObj.fbSprite.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.5),cc.scaleTo(0.5,1)),cc.scaleTo(1,1),acf));
    },
    updateScoreTxt: function(){
        this.gameObj.scoreText.setString("× " + correctNum);
        this.gameObj.fbSprite = new cc.Sprite(res.correct_png);
        this.gameObj.fbSprite.attr({
            x: cc.winSize.width * 0.5,
            y: cc.winSize.height * 0.5,
            scale:0
        });
        this.gameObj.gamePanel.addChild(this.gameObj.fbSprite);
        var acf = cc.callFunc(this.nextCallBack, this);
        this.gameObj.fbSprite.runAction(cc.sequence(cc.spawn(cc.fadeIn(0.5),cc.scaleTo(0.5,1)),cc.scaleTo(1,1),acf));
    },
    nextCallBack: function(){
        this.gameObj.newLevel();
    }
});