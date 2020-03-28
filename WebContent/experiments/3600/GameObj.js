GameObj = function(gameScene){
    this.gameScene = gameScene;
    this.gamePanel = gameScene.bgPanel;
    this.topImage = gameScene.topImage;
    this.downLeftImage = null;
    this.downRightImage = null;

    this.newLevel= function(){
        if(wrongNum<5){
            if(pointer < qPool.length){
                q = qPool[pointer];
                a = APool.slice(0).shuffle();
                startTime=new Date();
                stimidsetArray.push(QPool.indexOf(q));
                correctanswersetArray.push(KeyPool[a.indexOf(q[1])]);
                type4setArray.push(0);
				
				
                this.gameScene.addKeyListener();

                this.topImage.loadTexture("res/images/shapes/type"+q[0]+"_top"+q[1]+".png");
                if(this.downLeftImage!=null || this.downRightImage!=null){
                    this.downLeftImage.removeFromParent(true);
                    this.downRightImage.removeFromParent(true);
                }
                this.downLeftImage = new DownSprite(0,this);
                this.downRightImage = new DownSprite(1,this);

                this.gamePanel.addChild(this.downLeftImage);
                this.gamePanel.addChild(this.downRightImage);
				
				this.topImage.opacity = 0;
                this.downLeftImage.opacity = 0;
                this.downRightImage.opacity = 0;

                this.topImage.runAction(cc.sequence(cc.delayTime(0.9),cc.fadeIn(0.1)));
                this.downLeftImage.runAction(cc.sequence(cc.delayTime(0.9),cc.fadeIn(0.1)));
                this.downRightImage.runAction(cc.sequence(cc.delayTime(0.9),cc.fadeIn(0.1)));
                this.downLeftImage.reactTimeFunc();
				
                pointer++;
            }else{
                this.gameScene.unTimeUp();
                this.gamePanel.removeAllChildren();
                var result = new cc.Sprite(res.success_png);
                result.attr({
                    x: cc.winSize.width * 0.5,
                    y: cc.winSize.height * 0.5
                });
                this.gamePanel.addChild(result);
                this.gameScene.unschedule();
                this.sendMsg();
            }
        }else{
            //测试失败
            this.gameScene.unTimeUp();
            this.gamePanel.removeAllChildren();
            var result = new cc.Sprite(res.fail_png);
            result.attr({
                x: cc.winSize.width * 0.5,
                y: cc.winSize.height * 0.5
            });
            this.gamePanel.addChild(result);
            this.sendMsg();
        }
    };
    this.correctAnim = function(mark){
        if(mark==0){
            this.downLeftImage.matchAnim();
        }else{
            this.downRightImage.matchAnim();
        }
    };
    this.wrongAnim = function(mark){
        if(mark==0){
            this.downLeftImage.matchAnim();
        }else{
            this.downRightImage.matchAnim();
        }
    };
    this.timeUp = function(){  
        this.gamePanel.removeAllChildren();
        var result = new cc.Sprite(res.fail_png);
        result.attr({
            x: cc.winSize.width * 0.5,
            y: cc.winSize.height * 0.5
        });
        this.gamePanel.addChild(result);
        this.sendMsg();
    };
    this.sendMsg = function(){
		

		//add by Zhou Xinlin 
		if (type4setArray.length>buttonsetArray.length){
			buttonsetArray.push("undef");
		}	
		
        rtset = (rtsetArray.toString()).replaceAll(",",";");
        stimidset = (stimidsetArray.toString()).replaceAll(",",";");
        correctanswerset = (correctanswersetArray.toString()).replaceAll(",",";");
        buttonset = (buttonsetArray.toString()).replaceAll(",",";");
        type4set = (type4setArray.toString()).replaceAll(",",";");
        numset = "";
        timeaverage = duration/(correctNum+wrongNum);

        var x = {
            rtset: rtset,
            stimidset:stimidset,
            correctanswerset:correctanswerset,
            buttonset:buttonset,
            numset:numset,
            duration:duration,
            taskid:taskid,
            type4set:type4set,
            timeaverage:timeaverage
        };


        var opes_result_data={};
        opes_result_data.taskid=taskid;
        opes_result_data.sumitcoids=sumitcoids;
        opes_result_data.targetpagename=targetpagename;
        opes_result_data.codematerial=codematerial;
        opes_result_data.uid=uid;
        opes_result_data.lan=lan;
        opes_result_data.projectid=projectid;

        //////////////////////////////////////////////////////////////////
        opes_result_data.duration=x.duration;
        opes_result_data.timeaverage=Math.round(x.timeaverage);
        ///////////////////////////////////////////////////////////////////
        opes_result_data.type4set = x.type4set;
        opes_result_data.stimidset = x.stimidset;
        opes_result_data.correctanswerset = x.correctanswerset;
        opes_result_data.numset=x.numset;
        opes_result_data.timeset=x.rtset;
        opes_result_data.radioset="";
        opes_result_data.buttonset = x.buttonset;
        opes_result_data.commentset="";
        opes_post_result_util_js_opes_post_result(opes_result_data);
    };
}