<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="javax.servlet.jsp.jstl.fmt.LocaleSupport" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page language="java" import="com.lattice.entity.*" %>
<%@ page language="java" import="com.lattice.dao.*,java.util.*" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>

<%
	Users u=(Users)request.getSession().getAttribute("cu");
%>

<title><fmt:message key="jsp.menu.head"/></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<SCRIPT src="../../js/wz_jsgraphics/wz_jsgraphics.js" type=text/javascript></SCRIPT>
<SCRIPT src="../../js/utils.js" type=text/javascript></SCRIPT>
	<SCRIPT src="../../js/wz_jsgraphics/wz_jsgraphics.js" type=text/javascript></SCRIPT>
	<SCRIPT src="../../js/utils.js" type=text/javascript></SCRIPT>
	<SCRIPT src="../../js/Statistics/Statistics.js" type=text/javascript></SCRIPT>
	<SCRIPT src="../../js/jquery-1.8.2.min.js" type="text/javascript" ></SCRIPT>
	<SCRIPT src="../../js/jquery-ui-1.9.1.custom.min.js" type="text/javascript" ></SCRIPT>
	<SCRIPT src="../../js/progress_bar.js" type=text/javascript></SCRIPT> 
	<SCRIPT src="../../js/savetolocal.js" type=text/javascript></SCRIPT> 
	 
	
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layout.css" type="text/css"/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/main.css" type="text/css"/>
<style type="text/css"> 
<!--
body {margin: 0px; background-color: #000000;cursor: url(../../images/empty.cur), auto;           }
 
span { font-family: Arial, Helvetica, sans-serif; font-size: 80pt; color: #ffffff; }
span.loading { font-family: Arial, Helvetica, sans-serif; font-size: 20pt; color: #ffffff; }
span.fixation { font-family: Arial, Helvetica, sans-serif; font-size: 80pt; color: #ffffff; }
span.message { font-family: Arial, Helvetica, sans-serif; font-size: 15pt; color: #ffffff; }
span.addsubmildiv{ font-family: Arial, Helvetica, sans-serif; font-size: 80pt; color: #ffffff; }
span.asmdresult{ font-family: Arial, Helvetica, sans-serif; font-size: 50pt; color: #ffffff; }
.stroopnum_tip_div{	margin:0 auto;	background-color: #000000;	clear: both; 	align: center;	height: 30%;	width: 60%;	position: absolute;	left:20%;	top:35%;	line-height:50px;	text-align: center;	font-family: Verdana, Arial, Helvetica, sans-serif;	font-size: 25px;	color: #FFFFFF;}
.stroopnum_relax_tips_div{		background-color: #000000;	clear: both; 	align: center;	height: 100px;	width: 40%;	position: absolute;	left:35%;	right:35%;	top:300px;	text-align: left;	font-family: Verdana, Arial, Helvetica, sans-serif;	font-size: 27px;	color: #FFFFFF;}

span#item1_span {
    position: relative;
    bottom: -120px;
}
span#item4_span {
    position: relative;
    left: -7px;
}
span#target_span {
    position: relative;
    right: -10px;
}
-->
</style> 
</head> 
<body oncontextmenu="return false;" >
<form id="result" name="result" method="post" action="/lattice/OPESHandler?type=formal">

<input type=hidden value="3540" name="taskid" id="taskid"/>
 
<input type=hidden value="<%=request.getParameter("sumitcoids") %>" name="sumitcoids" id="sumitcoids"/>
<input type=hidden value="<%=request.getParameter("targetpagename") %>" name="targetpagename" id="targetpagename"/>
<input type=hidden value="VisualPerceptionCircle" name="taskIdentifier" id="taskIdentifier"/>
<input type=hidden value="<%=request.getParameter("save_to_local_checkbox")%>" name="save_to_local_checkbox" id="save_to_local_checkbox"/>
<input type=hidden value="<%=request.getParameter("save_to_server_checkbox")%>" name="save_to_server_checkbox" id="save_to_server_checkbox"/>
<input type=hidden value="<%=request.getParameter("original_local_saved_disk")%>" name="original_local_saved_disk" id="original_local_saved_disk"/>
<input type=hidden value="<%=u.getUserid() %>" name="userid" id="userid"/>
<input type=hidden value="<%=u.getUserName() %>" name="username" id="username"/>
<input type=hidden value="<%=request.getParameter("projectid") %>" name="projectid" id="projectid"/>
</form>

    <table height="40%" border=0px width="100%" border="0" align="center" >
            <tr>
                <td align="center" valign="middle">
                    <table cellspacing="0" border=0px cellpadding="0"  width="30%" align="center" style="border:0px solid red;">

						<tr style="border:0px solid red;">
							<td align=center height=100px colspan=2>
								<span id="loading" class="loading">
									<img name="imageObj" id="imageObj" src="../../images/black_toosmall.jpg"/>
									<br/>Uploading
								</span>
							</td>
					
							<td align=center height=50px>
								<span id="item1_span" class="asmdresult"> 
								<img   name="item1_image" id="item1_image" src="../../images/black_toosmall.jpg"/>
								</span>
							</td>
							 
							<!--   
							<td align=center height=80px>
								&nbsp;
							</td>
							-->
						</tr>
						<tr style="border:0px solid red;">
							<td style="border:0px solid red;" align=center height=50px width=50px>
								<span id="item2_span" class="asmdresult"> 
								<img name="item2_image" id="item2_image" src="../../images/black_toosmall.jpg"/>
								</span>
							</td> 
							
							
							    
							<td style="border:0px solid red;" align=center height=50px>
								<span id="target_span" class="addsubmildiv">
									<img name="target_image" id="target_image" src="../../images/black_toosmall.jpg"/>
								</span>  
							</td>  
							 
							   
							   
							
							<td style="border:0px solid red;" align=center height=50px>
								<span id="item3_span" class="asmdresult"> 
								
								<img style='margin-top:200px;' name="item3_image" id="item3_image" src="../../images/black_toosmall.jpg"/>
								</span>
							</td>
							<td style="border:0px solid red;" align=center height=50px>
								<span id="item4_span" class="asmdresult"> 
								<img name="item4_image" id="item4_image" src="../../images/black_toosmall.jpg"/>
								</span>
							</td>
							<!--  
							<td style="border:0px solid red;" align=center height=100px width=100px>
								<span id="item2_span___" class="asmdresult"> 
								<img name="item2_image___" id="item2_image___" src="../../images/black_toosmall.jpg"/>
								</span>
							</td>
							-->
						</tr>
                    </table>
                </td>
            </tr>
			<tr>
			<td align=center height=80px>
				<span id="cueing" class="asmdresult"> &nbsp;&nbsp;&nbsp; </span>
			</td>
			</tr>            
            
    </table>

 

<!--  
<div class="left_test_tips_div" style="height=35px;bottom:0px;font-size: 20px;">
<br/>
左边包含结果，就用左手食指按Q/q键
</div>

<div class="right_test_tips_div" style="height=35px;bottom:0px;font-size: 20px;">
<br/>
右边包含结果，就用右手食指按P/p键
</div>
 -->



<div id="stroopnum_tip" style="display:none;" class="stroopnum_tip_div">
</div>
<div id="myCanvas" style="display:none;" class="stroopnum_relax_tips_div">
<br/>
<fmt:message key="jsp.eachtest.rest"/>
</div>    
  
<div id="feed_back_div" style="display:none;" class="stroopnum_relax_tips_div">
<span id="message" class="message"></span>
<span><img name="messageimageObj" id="messageimageObj" src="../../images/black_toosmall.jpg"/></span>
</div> 

<!--张静远：增加了一个table-->
<table id="button_pq" height="15%" border=0px width="100%" border="0" cellspacing="60%" style="display:none;">
	<tr>
		<td align=left width="45%">
			<img name="button_q" id="img_Q" onclick="left_click()" src="../../images/button_Q.png"/>
		</td>
		<td align=right width="45%">
			<img name="button_p" id="img_P" onclick="right_click()" src="../../images/button_P.png"/>
		</td>
	</tr>
</table>
  
</body>
<script type="text/javascript">

var pic_path="../../testpics/VisualPerception/";
var black_image="../../images/black_toosmall.jpg";
var pleased_image="../../images/pleased.JPG";
var depressed_image="../../images/depressed.JPG";
var loading_image="../../images/ajax-loader(2).gif";
var stimidAll =new Array();
var type4All =new Array();

var simple_target=new Array ("108","69","32","35","98","43","88","77","75","59","37","18","65","60","26","70","80","12","90","115","117","105","46","14","55","85","9","93","38","8","101","119","75","90","47","81","118","78","99","31","109","60","33","19","83","1","36","86","11","37","29","1","106","76","11","93","112","3","102","83","33","103","77","113","26","58","20","71","16","91","75","83","42","38","4","51","22","72","94","104","95","72","71","40","54","57","69","11","89","21","112","116","15","20","72","24","6","66","20","6","50","23","29","104","48","89","29","51","8","16","23","108","44","27","74","97","37","54","51","64","138","135","132","124","121","143","127","129","141","129","150","136","125","128","129","128","144","137","145","147","121","147","123","148","126","143","137","143","132","135");
var simple_1=new Array ("47","69","54","23","97","16","85","39","2","90","37","18","65","10","24","103","87","93","89","113","9","105","120","88","107","53","74","93","38","88","71","117","75","15","45","114","63","77","47","105","26","57","33","115","81","7","30","23","33","10","40","1","1","24","25","43","109","68","101","120","20","26","109","13","25","3","25","62","13","5","73","83","41","27","4","49","67","69","91","57","12","106","7","76","3","57","44","9","1","67","52","18","112","17","120","63","46","97","30","5","97","21","29","88","17","82","78","25","68","111","49","108","114","117","37","17","26","53","95","61","142","149","150","124","140","133","144","123","135","145","131","123","150","144","127","138","121","137","130","130","150","129","148","130","126","143","147","133","141","125");
var simple_2=new Array ("78","2","81","76","98","56","86","112","107","96","38","15","66","79","96","22","80","9","90","114","10","106","30","96","58","117","43","94","39","51","10","118","55","48","46","44","101","78","70","84","94","58","34","10","82","28","19","120","55","65","65","2","62","76","13","34","110","33","102","47","34","109","77","58","26","58","83","90","14","96","74","41","42","42","97","50","82","70","109","76","81","72","37","114","77","50","70","10","107","93","12","108","49","18","41","36","6","33","52","6","14","22","30","32","105","60","29","18","31","26","64","82","34","91","87","11","64","54","5","62","144","122","132","128","123","121","138","132","128","139","137","136","131","122","133","128","141","134","149","136","121","146","141","139","130","132","143","134","139","123");
var simple_3=new Array ("59","68","92","80","99","23","87","111","7","19","39","100","67","61","107","82","59","65","91","115","45","107","58","14","80","73","92","95","49","31","21","119","56","102","47","81","19","79","104","103","57","59","35","74","83","119","102","67","58","37","75","3","91","54","11","50","111","99","103","55","8","62","101","78","27","63","92","22","15","41","75","115","43","83","66","51","29","71","32","35","15","118","119","98","34","42","112","11","7","57","112","61","86","19","28","104","116","13","115","7","84","23","31","99","16","113","28","46","105","16","2","17","53","27","86","4","115","55","68","63","135","138","146","135","131","143","136","149","138","148","147","135","125","149","129","142","127","125","145","140","122","142","146","136","129","140","144","139","150","148");
var simple_4=new Array ("13","60","102","66","100","81","88","14","72","42","40","110","68","73","39","36","48","35","92","116","5","108","45","5","82","89","9","96","35","27","111","120","21","106","48","51","38","80","99","31","116","60","36","88","84","76","36","86","17","113","23","4","73","45","94","47","112","98","104","6","33","82","40","18","28","95","89","71","16","9","76","79","44","118","93","52","100","72","84","110","79","98","41","52","6","32","39","12","89","69","119","78","77","20","87","89","73","102","56","8","113","24","32","15","43","85","53","71","28","61","37","64","86","85","110","100","4","56","19","64","121","145","140","148","132","126","126","127","141","133","126","124","127","124","137","134","134","122","124","137","125","147","147","131","128","145","129","143","146","142");
var simple_result=new Array ("P","Q","P","P","Q","P","Q","P","P","P","Q","Q","Q","P","P","P","Q","P","Q","Q","P","Q","P","Q","P","P","Q","Q","Q","P","P","Q","Q","P","Q","Q","P","Q","Q","Q","P","Q","Q","P","Q","P","Q","Q","P","Q","P","Q","P","Q","Q","P","Q","P","Q","P","Q","P","Q","P","Q","Q","P","Q","Q","P","Q","Q","Q","P","Q","Q","P","Q","P","P","P","Q","P","P","P","Q","P","Q","Q","P","Q","P","P","Q","P","P","Q","P","P","Q","P","Q","Q","P","P","P","Q","P","P","Q","P","Q","P","Q","P","P","P","Q","P","Q","P","P","Q","Q","P","Q","P","P","Q","P","P","Q","Q","P","Q","Q","P","Q","Q","P","Q","Q","P","P","Q","Q","P","Q","P","P");

var simple_target=new Array("78","100","80","40","95","37","51","101","9","21","35","82","83","110","41","74","42","32","44","108","12","64","18","117","94","4","27","68","23","28","96","19","69","97","59","13","116","20","113","2","43","102","111","56","25","114","7","15","57","88","53","66","71","16","84","92","49","105","119","79","109","38","17","36","62","99","39","89","8","11","90","85","86","103","73","34","31","47","1","50","45","14","118","3","58","54","30","77","76","115","70","91","112","75","48","60","26","98","67","106","120","10","87","63","65","5","22","6","93","33","81","46","52","72","24","107","61","55","29","104");
var simple_1=new Array("56","100","51","94","119","63","23","101","32","76","46","59","52","69","112","52","34","55","83","13","42","113","40","3","27","4","72","92","58","28","66","19","115","1","15","82","62","20","120","116","70","61","111","53","48","114","39","110","90","50","17","65","37","98","84","109","78","105","75","2","96","91","31","43","7","117","99","108","8","9","97","114","5","89","36","38","73","47","44","104","45","12","105","16","60","106","79","77","80","33","14","71","25","68","95","60","49","86","67","30","103","10","11","102","81","64","26","118","22","6","41","88","54","21","24","107","57","87","29","35");
var simple_2=new Array("115","38","79","97","44","47","16","59","9","71","95","82","11","117","13","74","46","40","114","108","12","57","18","1","34","8","14","70","66","103","86","77","26","85","27","50","111","49","41","10","90","39","43","56","76","107","81","20","7","68","96","3","63","83","75","92","30","72","23","80","33","88","6","36","58","110","35","105","42","89","51","84","31","113","73","17","74","120","32","78","37","65","118","55","58","54","99","56","109","101","69","91","112","21","19","18","25","28","61","106","98","64","87","22","9","5","15","100","93","48","119","102","45","4","29","67","94","73","53","104");
var simple_3=new Array("78","94","22","49","29","37","87","61","24","32","40","108","80","15","99","66","59","70","44","107","67","27","42","95","35","24","85","64","19","4","118","89","69","97","16","23","116","2","11","2","21","102","46","10","26","111","7","54","28","112","53","98","71","82","113","100","57","93","103","77","30","38","110","45","62","13","109","34","39","8","14","85","36","5","116","96","17","84","93","12","92","72","79","31","18","119","106","117","76","43","50","3","20","83","48","88","1","74","101","55","33","115","91","63","51","41","62","6","25","68","81","75","52","65","60","90","120","104","86","47");
var simple_result=new Array("q","q","p","p","p","q","p","q","q","p","p","q","p","p","p","q","p","p","q","q","q","p","q","p","p","q","p","p","p","q","p","q","q","q","p","p","q","q","p","q","p","q","q","q","p","q","q","p","p","p","q","p","q","p","q","q","p","q","p","p","p","q","p","q","q","p","p","p","q","p","p","q","p","p","q","p","p","q","p","p","q","p","q","p","q","q","p","q","q","p","p","q","q","p","q","q","p","p","q","q","p","q","q","q","p","q","p","q","q","p","q","p","q","p","q","q","p","p","q","q");



// var simple_target=new Array("58","13");
// var simple_1=new Array("88","11");
// var simple_2=new Array("29","13");
// var simple_3=new Array("18","16");
// var simple_result=new Array("p","q");



//Simple：
var simple_target_images=new Array();
var simple_1_images=new Array();
var simple_2_images=new Array();
var simple_3_images=new Array();
var simple_4_images=new Array();

var simple_result_images=new Array();

var progress = 0;//loading images progress

var correct_result ;//
var user_result=new Array();
var rc_key = new Array();
var rc_time = new Array();
var user_time= new Array();


var timer_id;
var index = 0;
var trial_interval = 300; // interval between trials in ms
var key_interval = 1000; // interval after key press in ms
var fixation_interval = 400; // 
var blank_interval = 1000; //
var short_blank_interval = 500; // 
var relax_interval=2000;
var feedback_interval=1000;// feedback time
var ifinite_wait_interval=40000000;
var start_delay = 1000; // in ms
var undef_key = "undef";
var undef_time = trial_interval;
var timestamp;
var StartSign=0;

var jg = new jsGraphics("myCanvas");
var midle_relax_interval=20000;//
var progressbar=0;//
var bar_length=300;//
var update_interval=midle_relax_interval/bar_length;//
var current_index=0;
var current_start_time=getTimestamp();
var ristrict_time=1000*60*10;
//var relax_point=new Array("40","80");

var relax_point=new Array("400","800");


var all_a;

function preloadimages()
{
  progress=0;
  
  for (i=0;i<simple_target.length;i++)
  {
    simple_target_images[i]=new Image();
    simple_1_images[i]=new Image();
    simple_2_images[i]=new Image();
    simple_3_images[i]=new Image();
    simple_4_images[i]=new Image();
    
	simple_target_images[i].onload=function()
    {
		progress+=1;
		if (progress==simple_target.length)
		{
  			setTimeout("wait_to_start()",0);	
		}else
		{
			setTimeout("show_load_image_progress("+Math.round(progress/simple_target.length*100)+")",0);
		}	
	}
    simple_target_images[i].src=pic_path+simple_target[i]+".gif";
    simple_1_images[i].src=pic_path+simple_1[i]+".gif";
    simple_2_images[i].src=pic_path+simple_2[i]+".gif";
    simple_3_images[i].src=pic_path+simple_3[i]+".gif";
    simple_4_images[i].src=pic_path+simple_4[i]+".gif";
  }
  blank=new Image();
  blank.src="../../images/black.jpg";  
}

/*
function preloadimages()
{
  
  for (var i=0;i<simple_target.length;i++)
  {
      simple_target_images[i]=new Image();
      simple_target_images[i].src=pic_path+simple_target[i]+".gif";
      simple_1_images[i]=new Image();
      simple_1_images[i].src=pic_path+simple_1[i]+".gif";
      simple_2_images[i]=new Image();
      simple_2_images[i].src=pic_path+simple_2[i]+".gif";
      
      progress = Math.round(100*(i+1)/(simple_target.length));
	  //show_load_image_progress(progress);
      setTimeout("show_load_image_progress("+progress+")",0);//i*50
  }
  setTimeout("wait_to_start()",(simple_target.length)*10);//(simple_target.length+complex_up.length)*50
}
*/

function wait_to_start()
{

		//alert(progress);
		document.getElementById('loading').style.display="none";
		//all_a=new Array(new ari_obj(simple_1_images,simple_2_images,simple_target_images,simple_result),new ari_obj(complex_item1_images,complex_item2_images,complex_target_images,complex_result));
		all_a=new Array(new ari_obj(simple_1_images,simple_2_images,simple_3_images,simple_4_images,simple_target_images,simple_result));
		current_start_time=getTimestamp();
		current_index=0;
		any_key_start();
	
}

function show_load_image_progress(progress)
{
	//stroopnum_tips.style.display="block";
	//dotcomparison_tips.style.display="block";
	//stroopnum_tips.innerHTML="<br/><br/>正在装入程序("+ progress + "%)"+"，稍等... ";
	
    //document.getElementById("loading").innerHTML = "<img  src='../../images/ajax-loader(2).gif'/><br/><br/>正在装入程序("+ progress + "%)"+"，稍等... ";
    document.getElementById("loading").innerHTML = "<br/><br/><fmt:message key="jsp.eachtest.loading"/>("+ progress + "%)";
    
}

/* 按任意键继续 */
function any_key_start()
{

	document.getElementById("myCanvas").style.display = "none";
	var stroopnum_tips=document.getElementById("stroopnum_tip");
	stroopnum_tips.style.display="block";
	stroopnum_tips.innerHTML="<br/><fmt:message key="jsp.eachtest.leftorrighthand"/>";
	document.onkeydown = ignor_key_press;
	//张静远：是ipad的情况下，显示图片，并且添加鼠标响应事件
	if (is_iPad())
	{
		document.getElementById("button_pq").style.display = "block";
		document.getElementById("button_pq").addEventListener("mousedown", ignor_key_press,true);
	}	
}

function ignor_key_press()
{
	current_start_time=getTimestamp();//record part start time
	var stroopnum_tips=document.getElementById("stroopnum_tip");
	stroopnum_tips.style.display="none";
	
	if (StartSign==0)
	{
		setTimeout("show_fixation()", blank_interval);
		StartSign=1;
	}	
	//setTimeout("show_fixation()", blank_interval);
	//张静远
	if(is_iPad()){
		document.getElementById("button_pq").removeEventListener("mousedown",ignor_key_press,true);
	}	
	setTimeout("ifback()", ristrict_time); 	
	
}
/* the beginning method, in actural it is show blank screen */
function show_fixation()
{
	document.getElementById("feed_back_div").style.display="none";
	if(index<all_a.length)//simple and complex
	{
		
			
//alert(ristrict_time);
	
//alert((getTimestamp()-current_start_time));
	
		var need_ralex=false  //(index<all_a.length-1);//the last portion
		if((getTimestamp()-current_start_time>ristrict_time)||current_index>=all_a[index].length)//relax
		{
			index++;
			if(need_ralex)
			{
				document.getElementById("item1_span").style.display = "none";
				document.getElementById("item2_span").style.display = "none";
				document.getElementById("stroopnum_tip").innerHTML = " ";
				document.getElementById("myCanvas").style.display = "block";
				start_progressbar();
				document.onkeydown =null;
				setTimeout("any_key_start()", midle_relax_interval+2000);
			}else if(index==all_a.length)
			{
				post_result();
			}else
			{
				current_index=0;
				setTimeout("change_view()", 0);
			}
		}else
		{
			if(is_in(current_index,relax_point))//relax			
			{
				relax_point=romve_value(current_index,relax_point)//remove it
				//document.getElementById("left_span").style.display = "none";
				//document.getElementById("right_span").style.display = "none";
				document.getElementById("stroopnum_tip").innerHTML = " ";
				document.getElementById("myCanvas").style.display = "block";
				start_progressbar();
				document.onkeydown =null;
				StartSign=0;
				setTimeout("any_key_start()", midle_relax_interval+2000);
			}else	
			{
				setTimeout("change_view()", 0);
			}	
		}
		
	}else
	{
		post_result();
		//alert(" will submit the result.");
	}
}


function change_view()
{
		var stroop=all_a[index];
		document.getElementById("item1_span").style.display = "block";
		document.getElementById("item1_image").src = all_a[index].target_array[current_index].src;		
		document.getElementById("item2_span").style.display = "block";
		document.getElementById("item2_image").src = blank.src;		
		document.getElementById("target_span").style.display = "block";
		document.getElementById("target_image").src = all_a[index].item1_array[current_index].src;		
		document.getElementById("item3_span").style.display = "block";
		document.getElementById("item3_image").src = all_a[index].item2_array[current_index].src;		
		document.getElementById("item4_span").style.display = "block";
		document.getElementById("item4_image").src = all_a[index].item3_array[current_index].src;		
		if(is_iPad()){
			document.getElementById("button_pq").style.display = "block";//张静远：是ipad，显示图片
		}
		
		all_a[index].user_result[current_index]=undef_key;
		rc_time[current_index] = undef_time;		
		timestamp = getTimestamp();
			stimidAll[current_index]=current_index+1;
			type4All[current_index]=0;	
					  
		current_index++;
		document.onkeydown = key_down;
		document.getElementById("cueing").innerHTML = "√&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;×";
		//setTimeout("Disappear()",4000);				
}

function Disappear()
{
	document.getElementById("item1_span").style.display = "none";
	document.getElementById("item2_span").style.display = "none";
	document.getElementById("item3_span").style.display = "none";
	document.getElementById("item4_span").style.display = "none";
	document.getElementById("target_span").style.display = "none";
}
 
//check if a value in a array
function is_in(targ,sour)
{
	for(var i=0;i<sour.length;i++)
	{
		if(targ==sour[i])
		{
			return true;
		}
	}
	return false;
}

//remove a value in a array
function romve_value(targ,sour)
{
	var cop=new Array();
	for(var i=0;i<sour.length;i++)
	{
		if(targ!=sour[i])
		{
			cop.push(sour[i]);
		}
	}
	return cop;
}

function add_result_to_form(id, value)
{
   var elem = document.createElement("input");
   elem.setAttribute("type", "text");
   elem.setAttribute("id", id);
   elem.setAttribute("name", id);
   elem.setAttribute("value", value);
   
   document.getElementById("result").appendChild(elem);
}

function post_result()
{
	var corrects=new Array();
	var users=new Array();
	for(var i=0;i<all_a.length;i++)
	{
		var mdcobj=all_a[i];
		corrects=add_array(corrects,get_related_result(mdcobj.correct_result_array,mdcobj.user_result.length));
		users=add_array(users,mdcobj.user_result);
	}
	/*
	for(var i=0;i<all_a.length;i++)
	{
		var mdcobj=all_a[i];
		add_result_to_form("correct_result", mdcobj.correct_result_array.join(";"));
		add_result_to_form("user_result", mdcobj.user_result.join(";"));
	}
	*/
	add_result_to_form("correct_result",corrects.join(";"));
	add_result_to_form("user_result",users.join(";"));
	add_result_to_form("duration",getTimestamp()-start_time);
	add_result_to_form("user_time", rc_time.join(";"));	
	
	//var corrects=get_related_result(correct_result,user_result.length);
	///////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////
	var type4set=type4All.join(";");
	var stimidset=stimidAll.join(";");
	var correctanswerset= corrects.join(";")
	var buttonset=users.join(";");
	var timeset=rc_time.join(";");
	var timeaverage=getTimestamp()-start_time;
	add_result_to_form("type4set", type4set);
	add_result_to_form("stimidset",stimidset);
	add_result_to_form("correctanswerset",correctanswerset);
	add_result_to_form("buttonset", buttonset);
	add_result_to_form("timeset", timeset);
	add_result_to_form("timeaverage",timeaverage);
	var radioset=""; 
	var numset="";
	var radiolist1set="";
	var radiolist2set="";
	var radiolist3set="";
	var radiolist4set="";
	var radiolist5set="";
	var radiolist6set="";
	var radiolist7set="";
	var radiolist8set="";
	var radiolist9set="";
	var radiolist10set="";
	if (corrects.length>1)
	{
		for (var i=0;i<corrects.length-1;i++)
		{
			radioset=radioset+";"+"";
			numset=numset+";"+"";
			radiolist1set=radiolist1set+";"+"";
			radiolist2set=radiolist2set+";"+"";
			radiolist3set=radiolist3set+";"+"";
			radiolist4set=radiolist4set+";"+"";
			radiolist5set=radiolist5set+";"+"";
			radiolist6set=radiolist6set+";"+"";
			radiolist7set=radiolist7set+";"+"";
			radiolist8set=radiolist8set+";"+"";
			radiolist9set=radiolist9set+";"+"";
			radiolist10set=radiolist10set+";"+"";
		}
	}	
	var countOfCorrectNumber_ByType=getCorrectCountSortByType(numset,correctanswerset,type4set);
	var countOfCorrectButton_ByType=getCorrectCountSortByType(buttonset,correctanswerset,type4set);
	var countOfCorrectRadio_ByType=getCorrectCountSortByType(radioset,correctanswerset,type4set);
	var countOfCorrectButton_ByType_Corrected=getCorrectCountSortByType_Corrected(buttonset,correctanswerset,type4set);
	var percentageCorrectNumber_ByType=getPercentageCorreceSortByType(numset,correctanswerset,type4set);
	var percentageCorrectButton_ByType=getPercentageCorreceSortByType(buttonset,correctanswerset,type4set);
	var percentageCorrectRadio_ByType=getPercentageCorreceSortByType(radioset,correctanswerset,type4set);
	var meanNumber_ByType=getMeanSortByType(numset,type4set);
	
	var sumNumber_ByType=getSumSortByType(numset,type4set);
	var meanRT_ByType=getMeanSortByType(timeset,type4set);
	
	var meanDeviationNumber_ByType=getMeanDeviationSortByType(numset,correctanswerset,type4set);
	var sumWeightedRadio_ByType=getWeightedScoreSortByType(radioset,type4set,radiolist1set,radiolist2set,radiolist3set,radiolist4set,radiolist5set,radiolist6set,radiolist7set,radiolist8set,radiolist9set,radiolist10set);
	var type4_Unique=getType(type4set);
	add_result_to_form("countOfCorrectNumber_ByType", countOfCorrectNumber_ByType);
	add_result_to_form("countOfCorrectButton_ByType", countOfCorrectButton_ByType);
	add_result_to_form("countOfCorrectRadio_ByType", countOfCorrectRadio_ByType);
	add_result_to_form("countOfCorrectButton_ByType_Corrected", countOfCorrectButton_ByType_Corrected);
	add_result_to_form("percentageCorrectNumber_ByType", percentageCorrectNumber_ByType);
	add_result_to_form("percentageCorrectButton_ByType", percentageCorrectButton_ByType);
	add_result_to_form("percentageCorrectRadio_ByType", percentageCorrectRadio_ByType);
	add_result_to_form("meanNumber_ByType", meanNumber_ByType);
	add_result_to_form("sumNumber_ByType", sumNumber_ByType);
	add_result_to_form("meanRT_ByType", meanRT_ByType);
	add_result_to_form("meanDeviationNumber_ByType", meanDeviationNumber_ByType);
	add_result_to_form("sumWeightedRadio_ByType", sumWeightedRadio_ByType);
	add_result_to_form("type4_Unique", type4_Unique);
	add_result_to_form("radioset", radioset);
	add_result_to_form("numset", numset);
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////	

	
	
	var temp_save_to_local_checkbox = document.getElementById("save_to_local_checkbox").value;
	//alert(temp_save_to_local_checkbox);
	if(temp_save_to_local_checkbox=='1') 
	{ 
		  
		var original_local_saved_disk='<%=request.getParameter("original_local_saved_disk")%>';
		var local_saved_disk=original_local_saved_disk.replace('.',':');
		local_saved_disk=local_saved_disk.replace(new RegExp('_',"gm"),'/');
		
		var jsonData={};
		jsonData.userid= document.getElementById('userid').value;
		jsonData.username= document.getElementById('username').value;
		jsonData.taskid=document.getElementById('taskid').value;
		jsonData.radioset=radioset;
		jsonData.buttonset=buttonset;
		jsonData.numset=numset;
		jsonData.commentset="";
		jsonData.timeset=timeset;
		jsonData.correctanswerset=correctanswerset;
		jsonData.timeaverage=timeaverage;
		jsonData.average="";
		jsonData.asum="";
		jsonData.bsum="";
		jsonData.csum="";
		jsonData.dsum="";
		jsonData.esum="";
		jsonData.fsum="";
		jsonData.gsum="";
		jsonData.hsum="";
		jsonData.isum="";
		jsonData.jsum="";
		jsonData.testtime= "";
		jsonData.stimidset=stimidset;
		jsonData.istest="0";
		jsonData.duration="";
		jsonData.userage="";
		jsonData.adminflag="";
		jsonData.numberofcorrecttrial="";
		jsonData.originalscore="";
		jsonData.standardscore="";
		jsonData.percentage="";
		jsonData.stannine="";
		jsonData.eventtime="";
		jsonData.type4set=type4set;
		jsonData.charge="";
		jsonData.projectid=document.getElementById('projectid').value;   
		save_to_local(jsonData,local_saved_disk); //36   
	}
		
	
	
	document.getElementById("result").submit();	
}


//张静远：将key_down函数拆成了key_down和key_input函数
function key_down(e)
{
	//console.log("key_down");
	//console.log(e);
		var keyhit=check_keyhit(e);
		if(!keyhit)
		{
			return;
		}else{
			key_input(keyhit);
		}
}

function key_input(keyhit)
{

	if ( all_a[index].user_result[current_index-1] == undef_key )//if is the first type key q or p
	{
		clearInterval(timer_id);
	
		var key = undef_key;

		if (keyhit == '81')// q
		{	
			key = "q";
		}
		if (keyhit == '87')// w
		{	
			key = "p";
		}
		if (keyhit == '79')// w
		{	
			key = "q";
		}
		if (keyhit == '80')// p
		{	
			key = "p";
		}
	   
		all_a[index].user_result[current_index-1] = key;	   
		rc_time[current_index-1]= getTimestamp() - timestamp;	  
	    show_user_result();
   }
}

//张静远：两个点击函数和判断ipad函数
function right_click()
{

			key_input("80");
}
function left_click()
{
			key_input("79");
}
function is_iPad(){
	//console.log("ispad?");
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/iPad/i)=="ipad") {
        return true;
    } else {
        return false;
    }
}

function show_user_result()
{
	document.getElementById("cueing").innerHTML = "";		
	document.getElementById("item1_span").style.display = "none";
	document.getElementById("item2_span").style.display = "none";
	document.getElementById("item3_span").style.display = "none";
	document.getElementById("item4_span").style.display = "none";
	
	//document.getElementById("item4_span").style.display = "none";	
	document.getElementById("target_span").style.display = "none";
	/*
	document.getElementById("feed_back_div").style.display="block";
	if(all_a[index].user_result[current_index-1]==all_a[index].correct_result_array[current_index-1])
	{
		document.getElementById("message").innerHTML = "<fmt:message key="jsp.eachtest.correctresponse"/>";
		document.getElementById('messageimageObj').src =pleased_image;
	}else
	{
		document.getElementById("message").innerHTML = "<fmt:message key="jsp.eachtest.wrongresponse"/>";
		document.getElementById('messageimageObj').src =depressed_image;
	}
	*/
	setTimeout("show_fixation()",feedback_interval);
	
}
function check_keyhit(e)
{
	var typed_key;
	if (window.event)
	{  
		typed_key = window.event.keyCode;
	}
	else
	{
		typed_key = e.which;
	}
	//alert(typed_key);
	if (typed_key == '81'||typed_key == '80'||typed_key == '79'||typed_key == '87')
	{	
		return typed_key;
	}else
	{
		alert("<fmt:message key="jsp.eachtest.onlyindexfingerPQ"/>");
		document.onkeydown = key_down;
		return false;
	}
	
}
function show_status_bar()
{
	//alert(jg);
	jg.setColor("#ffeeaa");
	jg.drawRect(20,40,bar_length,20);// x-pix y-pix width height
	jg.paint();
	
	jg.setColor("#00aaaa");
	jg.fillRect(20,40,progressbar,20);
	jg.paint();

	
	if(progressbar<bar_length)
	{
		setTimeout("show_status_bar()",update_interval);
	}
	progressbar++;
	
}

function start_progressbar()
{
	jg.clear();
	progressbar=0;
	setTimeout("show_status_bar()",0);
}


function draw_dot()
{
	//alert(event.clientX);
	jg_doc.clear();
	var x=event.clientX;
	var y=event.clientY;
	alert(x);
	jg_doc.setColor("#ffeeaa");
	jg_doc.fillOval(x,y,radius,radius);
	jg_doc.paint();
}

function ari_obj(item1_array,item2_array,item3_array,item4_array,target_array,correct_result_array)
{
	if(item1_array.length!=item2_array.length)
	{
		alert("item1_array.length!=item2_array.length");
	}
	if(target_array.length!=item2_array.length)
	{
		alert("target_array.length!=item2_array.length");
	}
	this.item1_array=item1_array;
	this.item2_array=item2_array;
	this.item3_array=item3_array;
	this.item4_array=item4_array;
	this.target_array=target_array;
	this.correct_result_array=correct_result_array;
	this.length=item1_array.length;
	this.user_result=new Array();
	return this;
}

function getTimestamp()
{
	var now = new Date();
	return now.getTime(); // in ms
}
 
function start()
{
	//document.getElementById('loading').style.display="none";
	start_time=getTimestamp();
	preloadimages();
}
function show_loading()
{
	//alert(1);
	//document.getElementById('imageObj').src =loading_image;
	setTimeout("start()", start_delay);
}

function ifback()    //判断整个测试过程时间是否用完
{
   post_result();
}

//setTimeout("ifback()", ristrict_time); //产生时间触发器ifback

window.onload = show_loading
 
</script>

</html>
