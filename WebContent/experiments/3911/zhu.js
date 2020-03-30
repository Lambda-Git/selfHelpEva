//---------------------------------------------------------------------

box_height=$(window).height();
$(".container").css("height",box_height ).css("width",box_height*1.40);


function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}

function jump_end(){
	clearTimeout(setTimeout_id1);
	clearTimeout(setTimeout_id2);
	$(".container").css("display","none")
	$("input:checked").each(function(){
		if( $(this).attr("class")=='right' ){
			score++;
			data.add($(this).attr("name"),1,1,$(this).attr("alt") );
		}else{
			score--;
			wrong_num++;
			data.add($(this).attr("name"),0,-1,$(this).attr("alt") );
		}
	});
	alert("测验结束！您的得分为:"+score+"分，感谢您的参与！");
	post_result();
	return;


}

