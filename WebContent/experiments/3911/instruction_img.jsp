<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.lattice.entity.*"%>
<%@ page language="java" import="com.lattice.dao.*,java.util.*"%>
<%@ page import="javax.servlet.jsp.jstl.fmt.LocaleSupport"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>


<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="jquery-3.2.1.min.js"></script>
    <script src="font-size.js"></script>
</head>


<%
    

Users u=(Users)request.getSession().getAttribute("cu");
int uid=u.getUserid();
int taskid=Integer.parseInt(request.getParameter("taskid"));

int codematerial=0;

String lan=request.getParameter("lan");
String targetpagename=request.getParameter("targetpagename");


int projectid=0;
if (!(request.getParameter("projectid")==null))	{
projectid=Integer.parseInt(request.getParameter("projectid"));
}

int sumitcoids=u.getCoid();


Vector<OPES_Task> ots=OPES_TaskDAO.getOPES_aTask(Integer.parseInt(request.getParameter("taskid")),lan);
if (ots.size()==0)
{
	response.sendRedirect("/lattice/"+targetpagename);
	return;	
}
ots.get(0).setProjectid(Integer.parseInt(request.getParameter("projectid")));
request.getSession().setAttribute("ot",ots.get(0));

%>


<body style="width:100%;height:100%;overflow:hidden; margin:0; padding:0;">
	<div id='top' style="background-color:floralwhite;height:20%;width:100%">
	</div>
	<div id="left" style="float:left;background-color:floralwhite;height:80%;width:10%">
		</div>
		
	<div id="mid" style="float:left;color:#0000FF;background-color:floralwhite;height:80%;width:80%;text-align: center;">
		<div id="textArea" style="font-size:32px; float:left; height:75%;width:100%;background-color: floralwhite;">
		    <p id="contentText" style="color: black; font-size:48px; margin-top:10px;height: auto;text-align:center;"></p>
		    <img id="targetpic" hidden="true"  src="test.jpg" style=" align: center;" />
		    <img id="targetpic1" hidden="true"  src="test1.png" style=" align: center;" />
		    <img id="targetpic2" hidden="true"  src="test2.png" style=" align: center;" />
			 
		</div>
		<div id="clickArea" style="float:left;margin-top:10px;height:60%;width:100%;text-align:center;">
			<input type="radio" id="ansA" value="" onclick="userClick(1)"/>
			<label id='radioA' for="ansA"></label>
			<br />
			<input type="radio" id="ansB" value="" onclick="userClick(2)" style="margin-top: 50px;"/>
			<label id='radioB' for="ansB"></label>
			<br />
			<!--
			<audio id="myaudio" controls="controls" autoplay="true" style="margin-top: 10px;">
				 <source src="test.mp3" type="audio/mp3" />
			</audio>
			-->
			
		</div>
	</div>
	<div id="right" style="float:right;background-color:floralwhite;height:80%;width:10%">
		
	</div>	
</body>
</html>
<script>
	var index = 0;
    var words = new Array ("您所在的环境是否是安静的？需要在安静的环境中完成测验。","您是否一个人或者只有一位监护人陪同您进行测验？","您是否可以做到一个人独立完成测验？需要独立完成,保证数据真实性。","监护人要做到不干扰不提示不暗示测试者答题,只能在答题前讲解指导语。","这是一个1分钟的练习；请认真完成练习。","下面会出现各种组合的图形,您需要选择“圆”+“正方形”的组合图形。在图形消失前,可以做更改。","样例展示","样例展示");
    var answerA = new Array("环境是安静的。","我独自一人或者我只有一位监护人陪同我。","我能一个人独立完成测验（监护人可以在答题前讲解指导语）","监护人可以做到不干扰不提示不暗示,只是在答题前讲解指导语！","我知道是练习,也会认真完成。","我理解了指导语,开始答题。","下一页","进入练习");
    var answerB = new Array("环境是嘈杂的,退出。","有很多人,退出。","不能独立完成,退出。","不能做到,退出。","不明白,退出。","不理解,退出。","退出","退出");
    window.onload=function(){ 
    	fontsetting();
		$("#contentText").text(words[index]);
		$("#radioA").text(answerA[index]);
		$("#radioB").text(answerB[index]);
		
		
	}
    function userClick(para){
		//alert(index);
    	index++;
    	if(para == 2){
    		//window.open('new_fileB.html','_self');
			window.history.go(-1);
    	}else if (index >= 8){
    		if(para == 1){
    			window.open('test.jsp?taskid=<%=taskid%>&lan=<%=lan%>&targetpagename=<%=targetpagename%>&codematerial=0&projectid=<%=projectid%>&endValue=0&speed=1&num1=1&num2=4','_self');


    		}
			
    		if(para == 2){
				window.history.go(-1);
				//window.open('new_fileB.html','_self');
    		}
			
			
			
			
		}
		
		if(index == 5){
    		$("#targetpic").show();
    	}

    	if(index == 6){
	    	$("#targetpic").hide();
    		$("#targetpic1").show();
    	}

    	if(index == 7){
	    	$("#targetpic").hide();
    		$("#targetpic1").hide();
    		$("#targetpic2").show();
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