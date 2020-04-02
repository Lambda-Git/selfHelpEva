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
	<script src="/lattice/js/jquery.3.4.1.js"></script>
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


<body style="width:100%;height:100%;overflow:hidden; margin:0; padding:0;display: flex;align-items:center;justify-content:center;">
		
	<div id="mid" style="width: 80%;height: 90%;font-size:14px; ">
		<div id="textArea" style="height:70%;width:100%;">
		    <p style="color: black; height: 30%;font-size: 1.6em;display: flex;align-items:center;justify-content:center;">
				<span id="contentText" style="display: inline-block;width: 80%;text-indent: 2em;"></span>
			</p>
		    <div style="height: 70%;width: 100%;display: flex;align-items:center;justify-content:center;">
				<img id="targetpic" hidden="true"  src="" style=" align: center;max-height:90%" />
				<img id="targetpic1" hidden="true"  src="z2.png" style=" align: center;max-height:90%" />
				<img id="targetpic2" hidden="true"  src="z3.png" style=" align: center;max-height:90%" />
			</div>
			 
		</div>
		<div id="clickArea" style="height:30%;width:100%;text-align:center;font-size: 1.6em;">
			<input type="radio" id="ansA" value="" onclick="userClick(1)"/>
			<label id='radioA' for="ansA"></label>
			<br />
			<input type="radio" id="ansB" value="" onclick="userClick(2)" style="margin-top: 50px;"/>
			<label id='radioB' for="ansB"></label>
			<br />
			
		</div>
	</div>
</body>
</html>
<script>
	var index = 0;
    var words = new Array ("您是否已经完成了练习？只有完成了练习，才能参加正式测验。","您所在的环境是否是安静的？需要在安静的环境中完成测验。","您是否一个人或者只有一位监护人陪同您进行测验？","您是否可以做到一个人独立完成测验？需要独立完成,保证数据真实性。","监护人要做到不干扰不提示不暗示测试者答题,只能在答题前讲解指导语。","这是一个限时6分钟的测验，分2部分。要求既快速又准确！","第一部分：判断当前出现的位置与先于当前位置2个出现的位置是否相同，如果相同，请点击“相同”按钮，如果不同，请点击“不同”按钮。","第二部分：判断当前出现的位置与先于当前位置3个出现的位置是否相同，如果相同，请点击“相同”按钮，如果不同，请点击“不同”按钮。");
    var answerA = new Array(" 完成了！","环境是安静的。","我独自一人或者我只有一位监护人陪同我。","我能一个人独立完成测验（监护人可以在答题前讲解指导语）","监护人可以做到不干扰不提示不暗示,只是在答题前讲解指导语！","我知道要求既快速又准确。","我理解了指导语,开始答题。","进入测试");
    var answerB = new Array("没有完成，退出。","环境是嘈杂的,退出。","有很多人,退出。","不能独立完成,退出。","不能做到,退出。","不明白,退出。","不理解,退出。","退出");
    window.onload=function(){
		$("#contentText").text(words[index]);
		$("#radioA").text(answerA[index]);
		$("#radioB").text(answerB[index]);
		
		
	};
    function userClick(para){
		//alert(index);
    	index++;
    	if(para == 2){
    		//window.open('new_fileB.html','_self');
			window.history.go(-1);
    	}else if (index >= 8){
    		if(para == 1){
    			window.open('nback.jsp?taskid=<%=taskid%>&lan=<%=lan%>&targetpagename=<%=targetpagename%>&codematerial=0&projectid=<%=projectid%>&endValue=0&speed=1&num1=1&num2=4','_self');

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