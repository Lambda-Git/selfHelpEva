var toolbox_timer_js_vars={
};

function toolbox_timer_js_open_toolbox_timer_editor(flowchart_id)
{
	var dialogid='toolbox_timer_js_toolbox_timer_editor'+flowchart_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：时间控制工具'>"+
			"<div >" +
				"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
					"<li><a href='#toolbox_timer_js_tab_common"+flowchart_id+"'><span>常规设置</span></a></li>"+
					"<li><a href='#toolbox_timer_js_tab_comment"+flowchart_id+"'><span>说明备注</span></a></li>"+
				"</ul>"+
				"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
					"<div id='toolbox_timer_js_tab_common"+flowchart_id+"' style='padding:0px;' >"+
					"</div>"+
					"<div id='toolbox_timer_js_tab_comment"+flowchart_id+"' >"+
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
				toolbox_timer_js_save_source_data(flowchart_id);
			}
		}]
	});
	$("#"+dialogid).tabs();
	$('#'+dialogid).dialog('open');
	
	toolbox_timer_js_refreshDataCommonSettings(flowchart_id);
}
function toolbox_timer_js_save_source_data(flowchart_id)
{
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	var toolbox_timer_js_general_tab_timelimit=$('#toolbox_timer_js_general_tab_timelimit'+flowchart_id).val();
	var toolbox_timer_js_general_tab_flowtitle=$('#toolbox_timer_js_general_tab_flowtitle'+flowchart_id).val();
	flow.flowdata.timelimit=toolbox_timer_js_general_tab_timelimit;
	flow.flowtitle=toolbox_timer_js_general_tab_flowtitle;
	
	$('#flowchart_tool_title_'+flowchart_id).html(toolbox_timer_js_general_tab_flowtitle);
}

function toolbox_timer_js_refreshDataCommonSettings(flowchart_id)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：中断休息工具</th></tr></thead>");

	newcontent+="<tr>";
	newcontent+=("<td>显示名称（"+flowchart_id+"）:</td>");
	newcontent+=("<td><input type='text' id='toolbox_timer_js_general_tab_flowtitle"+flowchart_id+"' value='新建工具'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>时间限制:</td>");
	newcontent+=("<td><input type='text' id='toolbox_timer_js_general_tab_timelimit"+flowchart_id+"' value='4000'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_timer_js_tab_common'+flowchart_id).html(newcontent);
	$('#toolbox_timer_js_tab_common'+flowchart_id+' input').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#toolbox_timer_js_tab_common'+flowchart_id+' select').css({'height': '30px','width':'300px'});
	$('.OPES_TABLE_ID').footable();
	$('#toolbox_timer_js_tab_common'+flowchart_id+' td').css({'padding': '2px'});
	
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	
	if(typeof flow.flowtitle != 'undefined')
	{
		$('#toolbox_timer_js_general_tab_flowtitle'+flowchart_id).val(flow.flowtitle);
	}
	if(typeof flow.flowdata.sleeptime != 'undefined')
	{
		$('#toolbox_timer_js_general_tab_timelimit'+flowchart_id).val(flow.flowdata.timelimit);
	}
	
}
