<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="jquery-3.2.1.min.js"></script>
    <script src="font-size.js"></script>
</head>
<body style="width:100%;height:100%;overflow:hidden; margin:0; padding:0;">
	<div id='top' style="background-color:floralwhite;height:5%;width:100%">
	</div>
	<div id="left" style="float:left;background-color:floralwhite;height:95%;width:10%">
		</div>
	<div id="mid" style="float:left;color:#0000FF;background-color:floralwhite;height:95%;width:80%;text-align: center;">
		<div id="textArea" style="float:left;height:60%;width:100%;background-color: floralwhite;overflow:hidden">
		    <p id="contentText" style="color: black; font-size:18px;margin-top:10px;height: auto;text-align:center;"></p>
		    <div>
		    	<img id='image' hidden="true" src="test.jpg" style=" max-width: 100%;height:50%;" />	
		    </div>
		    
		</div>
		<div id="clickArea" style="float:left;margin-top:10px;height:40%;width:100%;text-align:center;">
			<input type="radio" id="ansA" value="" onclick="userClick(1)"/>
			<label id='radioA' for="ansA"></label>
			<br />
			<br />
			<input type="radio" id="ansB" value="" onclick="userClick(2)" style="margin-top: 50px;"/>
			<label id='radioB' for="ansB"></label>
			<br />
			<audio id="myaudio" controls="controls" autoplay="true" style="margin-top: 10px;">
				 <source src="test.mp3" type="audio/mp3" />
			</audio>
			
		</div>
	</div>
	<div id="right" style="float:right;background-color:floralwhite;height:95%;width:10%">
		
	</div>	
</body>
</html>
<script>
	var index = 0;
    var words = new Array ("您是否已经完成了练习？只有完成了练习，才能参加正式测验。","您所在的环境是否是安静的？需要在安静的环境中完成测验。","您是否一个人或者只有一位监护人陪同您进行测验？","您是否可以做到一个人独立完成测验？需要独立完成，保证数据真实性。","监护人要做到不干扰不提示不暗示测试者答题，只能在答题前讲解指导语。","这是一个1分钟的练习测验；请认真对待。要求既快速又准确！","下面会出现各种组合的图形，您需要选择“圆”+“正方形”的组合图形。在图形消失前，可以做更改。");
    var answerA = new Array("完成了！","环境是安静的。","我独自一人或者我只有一位监护人陪同我。","我能一个人独立完成测验（监护人可以在答题前讲解指导语）","监护人可以做到不干扰不提示不暗示，只是在答题前讲解指导语！","我知道这是练习，也会认真对待。","我理解了指导语，开始答题。");
    var answerB = new Array("没有完成，退出。","环境是嘈杂的，退出。","有很多人，退出。","不能独立完成，退出。","不能做到，退出。","不明白，退出。","不理解，退出。");
    window.onload=function(){ 
    	fontsetting();
		$("#contentText").text(words[index]);
		$("#radioA").text(answerA[index]);
		$("#radioB").text(answerB[index]);
		
	}
    function userClick(para){
    	index++;
    	if(para == 2){
    		window.open('new_fileB.html','_self');
    	}
    	if(index >= 7){
    		if(para == 1){
    			window.open('new_fileA.html','_self');
    		}
    		if(para == 2){
    			window.open('new_fileB.html','_self');
    		}
		}
    	if(index == 6){
    		$("#image").show();
    	}
    	$("#contentText").text(words[index]);
    	$("#radioA").text(answerA[index]);
		$("#radioB").text(answerB[index]);
		$("#ansA").prop("checked",false);
		$("#ansB").prop("checked",false);
		
    }
</script>

<style type="text/css">
        html
        {
         height:100%;
         margin:0;
        }
        body
        {
            height:100%;
            margin:0; 
        }
</style>