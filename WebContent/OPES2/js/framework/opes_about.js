var opes_about_js_vars={
		
};


function opes_about_js_open_about_dialog()
{
	var dialogid='opes_about_js_open_about_dialog_id';
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='关于版本'>"+
					 "</div>");
	$('#'+dialogid).dialog({
		resizable: false,
		autoOpen: true,
		height: 250,
		width: 400,
		modal: true,
		buttons:[{
			text: "确定",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$('#'+dialogid).dialog('open');
	opes_about_js_getAboutContent();
}

function opes_about_js_getAboutContent()
{
	var newcontent = "";
	newcontent+=("<div style='padding-top:40px;padding-left:0px;font-size:12px;'>");

	newcontent+=("<p style='float:center;text-align:center;width:99%;color:#999'><img height='20' width='20' src='/lattice/images/crud/1938.gif' style='vertical-align:middle;'/>版本号: V2.0 2018-07-30</p>");
	newcontent+=("<p style='float:center;text-align:center;width:99%;color:#999'><img height='20' width='20' src='/lattice/images/crud/12735.gif' style='vertical-align:middle;'/>版权所有  工业和信息化部：京ICP备11037460号</p>");
	newcontent+=("<p style='float:center;text-align:center;width:99%;color:#999'><img height='20' width='20' src='/lattice/images/crud/511936.gif' style='vertical-align:middle;'/>Copyright © 2008 - 2018 在线心理学实验设计系统</p>");
	
	
	newcontent+="</div>";
	
	$('#opes_about_js_open_about_dialog_id').html(newcontent);
	
}

