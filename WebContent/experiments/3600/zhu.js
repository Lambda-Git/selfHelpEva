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


	// alert("测验结束！您的得分为:"+score+"分，感谢您的参与！");
	// console.log(data);
	post_result();
	return;


}

function post_result () {
	//代码缺失 临时给个返回
	setTimeout(function () {
		mui.openWindow({
			url: '../../../task_1/task_list.html',
			createNew: true,
			styles: {
				cachemode:"noCache",
			}
		});
	},10);
}