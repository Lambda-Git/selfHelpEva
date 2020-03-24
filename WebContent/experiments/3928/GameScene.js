var GameLayer = cc.Layer.extend({
    bgPanel: null,
    topImage: null,
    scoreText: null,
    gameObj: null,
    ctor:function () {
        this._super();
        var self = this;

        var baseLayer = ccs.load(res.MainScene_json).node;
        self.bgPanel = baseLayer.getChildByName("bgPanel");

        self.topImage = self.bgPanel.getChildByName("topImage");
        self.scoreText = self.bgPanel.getChildByName("scoreText");
		
		var mP = QPool.slice(0,10).shuffle().slice(0,3);
		var nP = QPool.slice(0);
		for(var i=0;i<mP.length;i++){
			nP.removeByValue(mP[i]);
		}
        qPool = mP.concat(nP.shuffle());

        self.gameObj = new GameObj(this);
        // start test
        self.gameObj.newLevel();
        self.scheduleOnce(this.timeUp,totalTime);

        this.addChild(baseLayer);
        return true;
    },
    addKeyListener: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){},
            onKeyReleased:function(keyCode,event){
                event.getCurrentTarget().gameObj.downLeftImage.unReactTimeFunc();

                endTime = new Date();
                rt = endTime - startTime;
                rtsetArray.push(rt);
                duration+=rt;

                if(keyCode == cc.KEY.q){
                    //左边
                    buttonsetArray.push("q");
                    if(a[0]==q[1]){
                        //正确奖励小红花+笑脸
                        correctNum++;
                        event.getCurrentTarget().gameObj.correctAnim(0);
                    }else{
                        //错误显示哭脸
                        wrongNum++;
                       event.getCurrentTarget().gameObj.wrongAnim(0);
                    }
                }
                if(keyCode == cc.KEY.p){
                    //右边
                    buttonsetArray.push("p");
                    if(a[1]==q[1]){
                        //正确奖励小红花+笑脸
                        correctNum++;
                        event.getCurrentTarget().gameObj.correctAnim(1);
                    }else{
                        //错误显示哭脸
                        event.getCurrentTarget().gameObj.wrongAnim(1);
                    }
                }

            }
        },self);
    },
    removeKeyListener: function(){
        cc.eventManager.removeListener(cc.EventListener.KEYBOARD);
    },
    timeUp: function(){
        this.gameObj.timeUp();
    },
    unTimeUp: function(){
        this.unschedule(this.timeUp);
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

