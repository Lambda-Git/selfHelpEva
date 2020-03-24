<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.lattice.entity.*"%>
<%@ page language="java" import="com.lattice.dao.*,java.util.*"%>
<%@ page import="javax.servlet.jsp.jstl.fmt.LocaleSupport"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>图形选择测验</title>
  <link rel="stylesheet" type="text/css" href="./style.css">
</head>

<%--  --%>
<%--<%--%>

<%--Users u=(Users)request.getSession().getAttribute("cu");--%>
<%--int uid=u.getUserid();--%>
<%--int taskid=Integer.parseInt(request.getParameter("taskid"));--%>

<%--int codematerial=0;--%>

<%--String lan=request.getParameter("lan");--%>
<%--String targetpagename=request.getParameter("targetpagename");--%>



<%--int projectid=0;--%>
<%--if (!(request.getParameter("projectid")==null))	{--%>
<%--projectid=Integer.parseInt(request.getParameter("projectid"));--%>
<%--}--%>

<%--int sumitcoids=u.getCoid();--%>


<%--Vector<OPES_Task> ots=OPES_TaskDAO.getOPES_aTask(Integer.parseInt(request.getParameter("taskid")),lan);--%>
<%--if (ots.size()==0)--%>
<%--{--%>
<%--	response.sendRedirect("/lattice/"+targetpagename);--%>
<%--	return;	--%>
<%--}--%>
<%--ots.get(0).setProjectid(Integer.parseInt(request.getParameter("projectid")));--%>
<%--request.getSession().setAttribute("ot",ots.get(0));--%>

<%--%>--%>



<body>    
  <div class="container" align="center">
  	<br/><br/>
  	<p style="font-size:18px;font-weight:bold;padding:25px">测验指导语:尽快找出目标图形。限时4分钟。</p>


    <div class="information">
      <p style="font-size:32px;font-weight:bold">图形选择实验</p>
      <br/><br/>
      <p>目标：请选择出 <span id="num1" style="color:red" ></span> 和 <span id="num2" style="color:red" ></span>的组合</p>


      <div class="fayin_control"><input type="number" min="1" max="10" id="speed" value='1'>单击速度设置</input></div>
      <br/><br/>

      <button id="start_test" style="padding:15px;font-size:24px;margin-top:10px">开始测试</button>
    </div>

  </div>
</body>
<script src="./jquery-2.1.4.js"></script>
<script src="./zhu.js"></script>
</html>
<script type="text/javascript">
  var num1=1,num2=4;
  var pic1,pic2;
  gen_seed();

  switch(num1){
    case 1:
    pic1='圆形';
    break;
    case 2:
    pic1='扇形';
    break;
    case 3:
    pic1='三角形';
    break;
    case 4:
    pic1='正方形';
    break;
    case 5:
    pic1='五边形';
    break;
    case 6:
    pic1='梯形';
    break;
  }

  switch(num2){
    case 1:
    pic2='圆形';
    break;
    case 2:
    pic2='扇形';
    break;
    case 3:
    pic2='三角形';
    break;
    case 4:
    pic2='正方形';
    break;
    case 5:
    pic2='五边形';
    break;
    case 6:
    pic2='梯形';
    break;
  }
  $("#num1").html(pic1);
  $("#num2").html(pic2);

  $("#start_test").click(function(){
    para=$("#speed").val();
<%--    window.location.href="instruction_img.html?taskid=<%=taskid%>&lan=<%=lan%>&targetpagename=<%=targetpagename%>&codematerial=0&projectid=<%=projectid%>&endValue=0&taskid=3782&speed="+para+"&num1="+num1+"&num2="+num2;--%>
    window.location.href="instruction_img.html"
  });

 
  
  function gen_seed(){
    var seed=[1,2,3,4,5,6];
    while(num1==num2){
      num1=1;
      num2=4;
    }
  }


</script>