QPool = [[1,0,1],[1,1,1],[2,0,1],[2,1,1],[3,0,1],[3,1,1],[4,0,1],[4,1,1],[5,0,1],[5,1,1],
	[1,0,2],[1,1,2],[2,0,2],[2,1,2],[3,0,2],[3,1,2],[4,0,2],[4,1,2],[5,0,2],[5,1,2],
	[1,0,3],[1,1,3],[2,0,3],[2,1,3],[3,0,3],[3,1,3],[4,0,3],[4,1,3],[5,0,3],[5,1,3],
	[1,0,4],[1,1,4],[2,0,4],[2,1,4],[3,0,4],[3,1,4],[4,0,4],[4,1,4],[5,0,4],[5,1,4],
	[1,0,5],[1,1,5],[2,0,5],[2,1,5],[3,0,5],[3,1,5],[4,0,5],[4,1,5],[5,0,5],[5,1,5],
	[1,0,6],[1,1,6],[2,0,6],[2,1,6],[3,0,6],[3,1,6],[4,0,6],[4,1,6],[5,0,6],[5,1,6]]; 
    
APool = [0,1];
KeyPool = ["q","p"];
var rotAngle = 30;
var pointer = 0;
var correctNum = 0;
var wrongNum = 0;
var qPool = null;
var q = null;
var a = null;

//feedback
var startTime = null;
var endTime = null;
var rt = null;
var totalTime = 4*60;//总时间4分钟
var timePass = 0;//倒计时
var reactTime = 10; //反应时间最长10s

var rtsetArray = [];
var buttonsetArray = [];
var stimidsetArray = [];
var correctanswersetArray = [];
var numsetArray = [];
var type4setArray = [];

var taskid = 3600;
var type4set = "";
var duration = 0;//!!
var timeaverage = 0; // !!取rt集合中的作对题目时间的中位数 没有做对的题目时设置为5s
var rtset = ""; // 每道题做题时间（不管作对做错）
var stimidset = ""; //每道题的唯一编号 从1开始编 自己编
var correctanswerset = ""; //每道题的正确答案 用；隔开
var buttonset = ""; //每道题被试按的数字
var numset = "";//!!每道题的得分

// function
Array.prototype.shuffle = function() {
    for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
}
Array.prototype.indexOf = function (val){
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val)return i;
    }
    return -1;
}
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
String.prototype.replaceAll = function (AFindText,ARepText) {
    var raRegExp = new RegExp(AFindText, "g");
    return this.replace(raRegExp, ARepText);
}