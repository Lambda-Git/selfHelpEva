var toolbox_code_js_vars={
};

function toolbox_code_js_open_toolbox_code_editor(flowchart_id)
{
	var dialogid='toolbox_code_js_toolbox_code_editor'+flowchart_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：代码工具'>"+
			"<div >" +
				"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
					"<li><a href='#toolbox_code_js_tab_common"+flowchart_id+"'><span>常规设置</span></a></li>"+
					"<li><a href='#toolbox_code_js_tab_comment"+flowchart_id+"'><span>说明备注</span></a></li>"+
				"</ul>"+
				"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
					"<div id='toolbox_code_js_tab_common"+flowchart_id+"' style='padding:0px;' >"+
					"</div>"+
					"<div id='toolbox_code_js_tab_comment"+flowchart_id+"' >"+
						"<textarea id='"+dialogid+"_note' style='width:99%;height:270px;'></textarea>"+
					"</div>"+
				"</div>"+	
			"</div>" +
	"</div>");
	$('#'+dialogid).dialog({
		resizable: false,
		autoOpen: true,
		height: 500,
		width: 800,
		modal: true,
		buttons:[{
			text: "确定",
			click: function() {
				$(this).dialog("close");
				toolbox_code_js_save_source_data(flowchart_id);
			}
		}]
	});
	$("#"+dialogid).tabs();
	$('#'+dialogid).dialog('open');
	
	toolbox_code_js_refreshDataCommonSettings(flowchart_id);
}
function toolbox_code_js_save_source_data(flowchart_id)
{
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	var flowtitle=$('#toolbox_data_code_js_refresh_flowtitle_'+flowchart_id).val();
	var toolbox_data_code_js_refresh_custom_code_=$('#toolbox_data_code_js_refresh_custom_code_'+flowchart_id).val();
	flow.flowdata.funName='_CUSTOM_'+flowchart_id+'_'+getTimestamp()+'_';
	flow.flowdata.code=toolbox_data_code_js_refresh_custom_code_;
	flow.flowtitle=flowtitle;
	
	$('#flowchart_tool_title_'+flowchart_id).html(flowtitle);
}

function toolbox_code_js_refreshDataCommonSettings(flowchart_id)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：代码工具: 自定义代码</th></tr></thead>");

	newcontent+="<tr>";
	newcontent+=("<td>显示名称（"+flowchart_id+"）:</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_code_js_refresh_flowtitle_"+flowchart_id+"' value='新建工具'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td colspan=100%><textarea id='toolbox_data_code_js_refresh_custom_code_"+flowchart_id+"' style='width:100%;height:270px;' value='' >//add your code here.....\n//Here you can access all the variables: \n//e.g. OPES_T2.func_name OPES_T3.params.code ... \n\n</textarea></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_code_js_tab_common'+flowchart_id).html(newcontent);
	$('.OPES_TABLE_ID').footable();
	$('#toolbox_code_js_toolbox_code_editor'+flowchart_id+' input').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#toolbox_code_js_tab_common'+flowchart_id+' td').css({'padding': '2px'});
	
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	if(typeof flow.flowtitle != 'undefined')
	{
		$('#toolbox_data_code_js_refresh_flowtitle_'+flowchart_id).val(flow.flowtitle);
	}
	if(typeof flow.flowdata.code != 'undefined')
	{
		$('#toolbox_data_code_js_refresh_custom_code_'+flowchart_id).val(flow.flowdata.code);
	}
	
}
