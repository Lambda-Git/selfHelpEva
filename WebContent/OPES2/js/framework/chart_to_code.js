var chart_to_code_js_vars={
		compileFlag:false
};



function chart_to_code_js_convert_chart_to_code()
{
	var connectionList = jsPlumb.getAllConnections();
	//alert(JSON.stringify(connectionList));
	//alert(connectionList.length);
	var flowlist=initialize_ui_js_vars.flow_object_list;
	//alert(JSON.stringify(flowlist));
	var compileFlag=chart_to_code_js_compile_chart(flowlist,connectionList);
	//TODO:验证各个组件数据完整性和有效性
	chart_to_code_js_vars.compileFlag=compileFlag;
	if(compileFlag)
	{
		tips('编译成功!可以运行设计好的测验或实验了。');
	}
	
	
	var tempstr='';
	for(var i=0;i<flowlist.length;i++)
	{
		tempstr+=flowlist[i].flowid+'__';
		var Y = $('#'+flowlist[i].flowid).position().top;
		var X = $('#'+flowlist[i].flowid).position().left;
		X=parseInt(X+170);
		Y=parseInt(Y+100);
		tempstr+=X+'__';
		tempstr+=Y+'__=======';
		
		flowlist[i].x=X;
		flowlist[i].y=Y;
	}
	//alert(tempstr);
}

function chart_to_code_js_compile_chart(flowlist,connectionList)
{
	var conncountFlag=chart_to_code_js_validate_connections(flowlist,connectionList);
	if(!conncountFlag)
	{
		return false;
	}
	var startendCountFlag=chart_to_code_js_validate_start_end_count(flowlist);
	if(!startendCountFlag)
	{
		return false;
	}
	var startendPositionFlag=chart_to_code_js_validate_start_end_position(flowlist,connectionList);
	if(!startendPositionFlag)
	{
		return false;
	}
	
	chart_to_code_js_reset_floworder(flowlist,connectionList);
	return true;
}
function chart_to_code_js_validate_connections(flowlist,connectionList)
{
	var connCount=connectionList.length;
	//alert(connCount+'___'+(flowlist.length-1));
	if(connCount!=(flowlist.length-1))
	{
		tips('编译错误: 您设计的测验无法成功编译，请确保所有流程已经连接完整！');
		return false;
	}
	return true;
}
function chart_to_code_js_validate_start_end_count(flowlist)
{
	var startFlowCount=0;
	var endFlowCount=0;
	for(var i=0;i<flowlist.length;i++)
	{
		if(flowlist[i].flowtype=='TOOLBOX_TYPE_START')
		{
			startFlowCount++;
		}
		if(flowlist[i].flowtype=='TOOLBOX_TYPE_END')
		{
			endFlowCount++;
		}
	}
	if(startFlowCount!=1)
	{
		tips('编译错误:（开始）节点必须同时最多只能有一个！');
		return false;
	}
	if(endFlowCount!=1)
	{
		tips('编译错误:（结束）节点必须同时最多只能有一个！');
		return false;
	}
	return true;
}
function chart_to_code_js_validate_start_end_position(flowlist,connectionList)
{
	var startf=chart_to_code_js_get_start_flow(flowlist);
	var endf=chart_to_code_js_get_end_flow(flowlist);
	
	var firstconn=chart_to_code_js_get_connection_by_targetId(startf.flowid,connectionList);
	var endconn=chart_to_code_js_get_connection_by_sourceId(endf.flowid,connectionList);
	if(firstconn!=null)
	{
		tips('编译错误:（开始）节点必须处于最开始的位置！');
		return false;
	}
	if(endconn!=null)
	{
		tips('编译错误:（结束）节点必须处于最末尾的位置！');
		return false;
	}
	return true;
}
/*
 * Reset Method:
 * The connectionList is not ordered from jsplumb API,
 * need to the first point from START flow, then go to next...
 */
function chart_to_code_js_reset_floworder(flowlist,connectionList)
{
	//alert(connectionList.length);
	//return;
	
	var startf=chart_to_code_js_get_start_flow(flowlist);
	var firstconn=chart_to_code_js_get_connection_by_sourceId(startf.flowid,connectionList);
	if(startf==null||firstconn==null)
	{
		return;
	}else
	{
		startf.floworder=0;
		chart_to_code_js_update_one_floworder(firstconn,1,flowlist,connectionList);
	}
	
	//alert(JSON.stringify(flowlist));
}
function chart_to_code_js_update_one_floworder(connection,order,flowlist,connectionList)
{
	for(var i=0;i<flowlist.length;i++)
	{
		if(flowlist[i].flowid==connection.targetId)
		{
			flowlist[i].floworder=order;
			order++;
			break;
		}
	}
	var nextconn=chart_to_code_js_get_connection_by_sourceId(connection.targetId,connectionList);
	if(nextconn!=null)
	{
		chart_to_code_js_update_one_floworder(nextconn,order,flowlist,connectionList)
	}
	
}
function chart_to_code_js_get_start_flow(flowlist)
{
	for(var i=0;i<flowlist.length;i++)
	{
		if(flowlist[i].flowtype=='TOOLBOX_TYPE_START')
		{
			return flowlist[i];
		}
	}
	
	return null;
}
function chart_to_code_js_get_end_flow(flowlist)
{
	for(var i=0;i<flowlist.length;i++)
	{
		if(flowlist[i].flowtype=='TOOLBOX_TYPE_END')
		{
			return flowlist[i];
		}
	}
	
	return null;
}
function chart_to_code_js_get_connection_by_sourceId(sourceflowid,connectionList)
{
	var connCount=connectionList.length;
	for(var i=0;i<connCount;i++)
	{
		var con=connectionList[i];
		if(con.sourceId==sourceflowid)
		{
			return con;
		}
	}
	return null;
}
function chart_to_code_js_get_connection_by_targetId(targetId,connectionList)
{
	var connCount=connectionList.length;
	for(var i=0;i<connCount;i++)
	{
		var con=connectionList[i];
		if(con.targetId==targetId)
		{
			return con;
		}
	}
	return null;
}

