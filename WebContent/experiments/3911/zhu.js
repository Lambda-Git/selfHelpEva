//---------------------------------------------------------------------

box_height=$(window).height();
$(".container").css("height",box_height ).css("width",box_height*1.40);


function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 
function jump_end(){
}

