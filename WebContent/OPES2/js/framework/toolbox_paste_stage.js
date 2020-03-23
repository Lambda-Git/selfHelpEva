
function toolbox_paste_stage_js_pasteStage()
{
	if(!window.localStorage)
	{
		tips('请使用IE8以上的浏览器或者谷歌Chrome浏览器');
	}else
	{
		if(typeof localStorage.getItem("toolbox_copy_stage_js_copyStage") =='undefined')
		{
			tips('请先从本页面或者当前浏览器其他页面（Tab标签页）复制一个控件');
		}else
		{
			var source=$.parseJSON( localStorage.getItem("toolbox_copy_stage_js_copyStage") );
			
			var tooltype=source.flowtype;
			var flowchart_id='OPES_T'+get_max_value_for_toolid();
			
			var position={};
			position.top=200;
			position.left=370;
			var flowtitle=null;
			add_new_window(flowchart_id,tooltype,position,flowtitle);
			
			initialize_ui_js_deleteFlowObject(flowchart_id);
			
			var flow={};
			$.extend(true, flow,source);
			
			flow.flowid=flowchart_id;
			flow.floworder=flow.floworder+1;
			initialize_ui_js_vars.flow_object_list.push(flow);
			
			//TODO: 前置代码后置代码图片事件的方法名复制，需要改名
		}
	}
}
function toolbox_paste_stage_js_pasteStage____________________________cookie()
{
	if(typeof $.cookie("toolbox_copy_stage_js_copyStage") =='undefined')
	{
		tips('请先从本页面或者当前浏览器其他页面（Tab标签页）复制一个控件');
	}else
	{
		var source=$.parseJSON( $.cookie("toolbox_copy_stage_js_copyStage") );
		
		var tooltype=source.flowtype;
		var flowchart_id='OPES_T'+get_max_value_for_toolid();
		
		var position={};
		position.top=200;
		position.left=370;
		var flowtitle=null;
		add_new_window(flowchart_id,tooltype,position,flowtitle);
		
		initialize_ui_js_deleteFlowObject(flowchart_id);
		
		var flow={};
		$.extend(true, flow,source);
		
		flow.flowid=flowchart_id;
		flow.floworder=flow.floworder+1;
		initialize_ui_js_vars.flow_object_list.push(flow);
		
		//TODO: 前置代码后置代码图片事件的方法名复制，需要改名
	}
}