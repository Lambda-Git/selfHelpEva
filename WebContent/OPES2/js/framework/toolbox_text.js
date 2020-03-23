var toolbox_text_js_vars={
		
};


function toolbox_text_js_open_toolbox_text_editor(flowchart_id)
{
	//alert(flowchart_id);
	var dialogid='toolbox_text_js_toolbox_text_editor';
	if($('#'+dialogid).length==0)
	{
		$('body').append("<div id='"+dialogid+"' title='属性：文本工具'>"+
				"<div >" +
					"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
						"<li><a href='#toolbox_text_js_tab_1'><span>常规</span></a></li>"+
						"<li><a href='#toolbox_text_js_tab_2'><span>文本</span></a></li>"+
						"<li><a href='#toolbox_text_js_tab_3'><span>备注</span></a></li>"+
					"</ul>"+
					"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
						"<div id='toolbox_text_js_tab_1'>"+
							toolbox_text_js_get_general_tab_content_for_toolbox_text_editor()+
						"</div>"+
						"<div id='toolbox_text_js_tab_2' >"+
							"<textarea id='"+dialogid+"_text' style='width:99%;height:270px;'></textarea>"+
						"</div>"+
						"<div id='toolbox_text_js_tab_3' >"+
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
					toolbox_text_js_save_all_values(flowchart_id);
				}
			},{
				text: "取消",
				click: function() {
					$(this).dialog("close");
				}
			}]
		});
		opes_utils_add_table_css();
		$("#"+dialogid).tabs();
	}else
	{
		$('#'+dialogid).dialog('open');
	}

}
function toolbox_text_js_save_all_values(flowchart_id)
{
	var position=$('#toolbox_text_js_general_tab_text_position_id').val();
	var fontsize=$('#toolbox_text_js_general_tab_text_fontsize_id').val();
	var text=$('#toolbox_text_js_general_tab_text_textcontent_id').val();
	var fontcolor=$('#toolbox_text_js_general_tab_text_color_id').val();
	var elapsedtime=$('#toolbox_text_js_general_tab_text_elapsedtime_id').val();
	
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	flow.flowdata.position=position;
	flow.flowdata.fontsize=fontsize;
	flow.flowdata.fontcolor=fontcolor;
	flow.flowdata.elapsedtime=elapsedtime;
	flow.flowdata.text=text;
	
	$('#toolbox_text_js_toolbox_text_editor').dialog("close");
}
function toolbox_text_js_get_general_tab_content_for_toolbox_text_editor()
{
	var newcontent = "<div id='toolbox_text_js_general_tab_div_id'>";

	newcontent+=("<table class='footable table toggle-circle toggle-medium' cellspacing='0' ><thead><tr><th scope=col colspan=4>toolbox_text_js_get_general_tab_content_for_toolbox_text_editor</th></tr></thead>");
	newcontent+="<tr>";
	newcontent+=("<td>文本内容:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_text_js_general_tab_text_textcontent_id' style='width:200px;' value='TTTTTTTTTT'></input></td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>显示位置：</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><select id='toolbox_text_js_general_tab_text_position_id' style='width:200px;'><option selected value='center'>中间</option><option value='left'>左边</option><option value='right'>右边</option></select></td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>字体大小:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_text_js_general_tab_text_fontsize_id' style='width:200px;' value='20'></input></td>");
	newcontent+=("<td>像素</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>字体颜色:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_text_js_general_tab_text_color_id' style='width:200px;' value='white'></input></td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>呈现时间:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_text_js_general_tab_text_elapsedtime_id' style='width:200px;' value='3000'></input></td>");
	newcontent+=("<td>毫秒</td>");
	newcontent+="</tr>";
	newcontent+="</table>";
	
	newcontent+="</div>";
	return newcontent;
}


