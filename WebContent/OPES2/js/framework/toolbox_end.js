var toolbox_end_js_vars={
		
};

function toolbox_end_js_open_toolbox_end_editor(flowchart_id)
{
	var dialogid='toolbox_end_js_toolbox_end_editor';
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：结束工具'>"+
			"<div >" +
				"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
					"<li><a href='#toolbox_end_js_tab_1'><span>常规</span></a></li>"+
					"<li><a href='#toolbox_end_js_tab_3'><span>备注</span></a></li>"+
				"</ul>"+
				"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
					"<div id='toolbox_end_js_tab_1'>"+
						toolbox_end_js_get_general_tab_content(flowchart_id)+
					"</div>"+
					"<div id='toolbox_end_js_tab_3' >"+
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
				toolbox_end_js_save_all_values(flowchart_id);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	
	$('#'+dialogid+' input').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#'+dialogid+' select').css({'height': '30px','width':'300px'});
	$('.OPES_TABLE_ID').footable();
	$('#'+dialogid+' td').css({'padding': '2px'});
	$('#'+dialogid+' tr').css({'display': 'table-row'});
	
	$("#"+dialogid).tabs();
	$('#'+dialogid).dialog('open');
	toolbox_end_js_refreshCommonSettings(flowchart_id);
}
function toolbox_end_js_refreshCommonSettings(flowchart_id)
{
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	
	if(typeof flow.flowtitle != 'undefined')
	{
		$('#toolbox_end_js_general_tab_flowtitle').val(flow.flowtitle);
	}
	if(typeof flow.flowdata.final_feedback != 'undefined')
	{
		$('#toolbox_end_js_general_tab_final_feedback_id').val(flow.flowdata.final_feedback);
	}
	if(typeof flow.flowdata.show_final_result != 'undefined')
	{
		$('#toolbox_end_js_general_tab_show_final_result_id').val(flow.flowdata.show_final_result);
	}
}
function toolbox_end_js_save_all_values(flowchart_id)
{
	var flowtitle=$('#toolbox_end_js_general_tab_flowtitle').val();
	var final_feedback=$('#toolbox_end_js_general_tab_final_feedback_id').val();
	var show_final_result=$('#toolbox_end_js_general_tab_show_final_result_id').val();
	
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	flow.flowdata.final_feedback=final_feedback;
	flow.flowdata.show_final_result=show_final_result;
	flow.flowtitle=flowtitle;
	
	$('#toolbox_end_js_toolbox_end_editor').dialog("close");
	$('#flowchart_tool_title_'+flowchart_id).html(flowtitle);
}
function toolbox_end_js_get_general_tab_content(flowchart_id)
{
	var newcontent = "<div id='toolbox_end_js_general_tab_div_id'>";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=4>测验结果提交参数设置以及提交之后的页面参数设置</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>显示名称（"+flowchart_id+"）:</td>");
	newcontent+=("<td><input type='text' id='toolbox_end_js_general_tab_flowtitle' value='新建工具'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>页面反馈:</td>");
	newcontent+=("<td><input type='text' id='toolbox_end_js_general_tab_final_feedback_id' value='测验结束'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>显示结果：</td>");
	newcontent+=("<td><select id='toolbox_end_js_general_tab_show_final_result_id' ><option selected value=1>显示结果</option><option value=0>不显示结果</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="</table>";
	
	newcontent+="</div>";
	return newcontent;
}