
function toolbox_copy_stage_js_copyStage()
{
	//alert(JSON.stringify(connectionList));
	//$.parseJSON( jsonstr );
	
	var toolid=initialize_ui_js_vars.current_selected_tool_id;
	if(toolid=='')
	{
		tips('请选择一个要复制的控件');
	}else
	{
		if(!window.localStorage)
		{
			tips('请使用IE8以上的浏览器或者谷歌Chrome浏览器');
		}else
		{
			var source=initialize_ui_js_getFlowObject(toolid)

			localStorage.setItem("toolbox_copy_stage_js_copyStage",JSON.stringify(source));
			tips('已成功复制当前控件，可以在本页面或者当前浏览器其他页面（Tab标签页）点击粘贴来创建一个新的相同的控件');
		}
	}
}
//this is to use cookie to save data
function toolbox_copy_stage_js_copyStage_______________________cookie()
{
	//alert(JSON.stringify(connectionList));
	//$.parseJSON( jsonstr );
	
	var toolid=initialize_ui_js_vars.current_selected_tool_id;
	if(toolid=='')
	{
		tips('请选择一个要复制的控件');
	}else
	{
		var source=initialize_ui_js_getFlowObject(toolid)

		var cookietime = new Date(); 
		cookietime.setTime(cookietime.getTime() + (60*1000));//coockie保存60s 
		$.cookie("toolbox_copy_stage_js_copyStage", JSON.stringify(source),{expires:cookietime});
		alert(JSON.stringify(source).length);
		//alert(typeof $.cookie("example") =='undefined');
		alert($.cookie("toolbox_copy_stage_js_copyStage"));
		tips('已成功复制当前控件，可以在本页面或者当前浏览器其他页面（Tab标签页）点击粘贴来创建一个新的相同的控件');
	}
}