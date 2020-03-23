

function toolbox_data_copy_js_copyData(passobj)
{
	//tips(passobj.toolid);
	var source=initialize_ui_js_getFlowObject(passobj.toolid)
	//alert(JSON.stringify(source));
	
	var tooltype=source.flowtype;
	var flowchart_id='OPES_T'+get_max_value_for_toolid();
	
	var Y = $('#'+passobj.toolid).position().top;
	var X = $('#'+passobj.toolid).position().left;
	X=parseInt(X+270);
	Y=parseInt(Y+100);
	
	var position={};
	position.top=Y;
	position.left=X;
	var flowtitle=null;
	add_new_window(flowchart_id,tooltype,position,flowtitle);
	
	initialize_ui_js_deleteFlowObject(flowchart_id);
	
	var flow={};
	$.extend(true, flow,source);
	
	flow.flowid=flowchart_id;
	flow.floworder=flow.floworder+1;
	initialize_ui_js_vars.flow_object_list.push(flow);
	
	//TODO: 前置代码后置代码图片事件的方法名复制，需要改名
	//var temptar=initialize_ui_js_getFlowObject(flowchart_id)
	//alert(JSON.stringify(temptar));
}