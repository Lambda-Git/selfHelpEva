var toolbox_data_sub_plaintext_js_vars={
		
};
/********This js used for column type *********/


/**********************open add data column dialog (Level 3)*****************************/

function toolbox_data_sub_plaintext_js_open_new_data_column_dialog(tempParam)
{
	var flowchart_id=tempParam.flowchart_id;
	var data_row_id=tempParam.data_row_id;
	//var data_column_id=tempParam.flowchart_id;
	
	//if(data_column_id==null)
	{
		var data_column_id=getTimestamp();
	}
	var dialogid='toolbox_data_sub_plaintext_js_new_data_column_dialog_id'+flowchart_id;
	$('#'+dialogid).dialog('destroy');
	$('#'+dialogid).remove();
	
	if($('#'+dialogid).length==0)
	{
		$('body').append("<div id='"+dialogid+"' title='属性：数据工具：新建一条数据系列：ADD新建一条数据'>"+
				"<div >" +
				toolbox_data_sub_plaintext_js_get_data_content_for_new_data_column_dialog(flowchart_id,data_row_id,data_column_id)+
				"</div>" +
		"</div>");
		$('#'+dialogid).dialog({
			resizable: false,
			autoOpen: true,
			height: 500,
			width: 800,
			modal: true,
			buttons:[{
				//id: "toolbox_data_sub_plaintext_js_new_data_column_dialog_ok_button_id"+flowchart_id,
				text: "确定",
				click: function() {
					toolbox_data_sub_plaintext_js_save_or_update_one_data_column(flowchart_id,data_row_id,data_column_id);
				}
			},{
				text: "取消",
				click: function() {
					$(this).dialog("close");
				}
			}]
		});
		opes_utils_add_table_css();
		initialize_jqueryui_color_picker_for_inputs(['toolbox_data_sub_plaintext_js_general_tab_text_color_id'+flowchart_id]);
	}else
	{
		$('#'+dialogid).dialog('open');
	}
	toolbox_data_sub_plaintext_js_set_values_for_one_column(flowchart_id,data_row_id,data_column_id);
}
function toolbox_data_sub_plaintext_js_set_values_for_one_column(flowchart_id,data_row_id,data_column_id)
{
	var column=toolbox_data_js_get_data_column(flowchart_id,data_row_id,data_column_id);
	if(column!=null)
	{
		$('#toolbox_data_sub_plaintext_js_general_tab_text_position_id'+flowchart_id).val(column.position);
		$('#toolbox_data_sub_plaintext_js_general_tab_text_fontsize_id'+flowchart_id).val(column.fontsize);
		$('#toolbox_data_sub_plaintext_js_general_tab_text_textcontent_id'+flowchart_id).val(column.text);
		$('#toolbox_data_sub_plaintext_js_general_tab_text_color_id'+flowchart_id).val(column.fontcolor);
		$('#toolbox_data_sub_plaintext_js_general_tab_text_elapsedtime_id'+flowchart_id).val(column.elapsedtime);
		
	}else
	{
		//alert('column is null');
	}
}
function toolbox_data_sub_plaintext_js_get_data_content_for_new_data_column_dialog(flowchart_id,data_row_id,data_column_id)
{
	var newcontent = "<div id='toolbox_data_sub_plaintext_js_get_data_content_for_new_data_row_dialog_div"+flowchart_id+"'>";
	newcontent+=("<table class='OPES_TABLE_ID' cellspacing='0' ><thead><tr><th scope=col colspan=4>toolbox_data_sub_plaintext_js_get_general_tab_content_for_toolbox_text_editor</th></tr></thead>");
	newcontent+="<tr>";
	newcontent+=("<td>文本内容:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_sub_plaintext_js_general_tab_text_textcontent_id"+flowchart_id+"' style='width:200px;' value='TTTT' ></input></td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>显示位置：</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><select id='toolbox_data_sub_plaintext_js_general_tab_text_position_id"+flowchart_id+"' style='width:200px;'><option selected value='center'>中间</option><option value='left'>左边</option><option value='right'>右边</option></select></td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>字体大小:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_sub_plaintext_js_general_tab_text_fontsize_id"+flowchart_id+"' style='width:200px;' value='30px' ></input></td>");
	newcontent+=("<td>像素</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>字体颜色:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_sub_plaintext_js_general_tab_text_color_id"+flowchart_id+"' style='width:200px;' value='fe9810' ></input></td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>呈现时间:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_sub_plaintext_js_general_tab_text_elapsedtime_id"+flowchart_id+"' style='width:200px;' value='1000' ></input></td>");
	newcontent+=("<td>毫秒</td>");
	newcontent+="</tr>";
	newcontent+="</table>";
	newcontent+="</div>";
	return newcontent;
}

/***********************************save data actions**************************************/

//本方法内的对象schema 必须按照 opes-template/data.js测试运行通过后的定义
function toolbox_data_sub_plaintext_js_save_or_update_one_data_column(flowchart_id,data_row_id,data_column_id)
{
	var position=$('#toolbox_data_sub_plaintext_js_general_tab_text_position_id'+flowchart_id).val();
	var fontsize=$('#toolbox_data_sub_plaintext_js_general_tab_text_fontsize_id'+flowchart_id).val();
	var text=$('#toolbox_data_sub_plaintext_js_general_tab_text_textcontent_id'+flowchart_id).val();
	var fontcolor=$('#toolbox_data_sub_plaintext_js_general_tab_text_color_id'+flowchart_id).val();
	var elapsedtime=$('#toolbox_data_sub_plaintext_js_general_tab_text_elapsedtime_id'+flowchart_id).val();
	
	fontcolor=fontcolor.replace("#","");
	
	var temp_column={};
	temp_column.id=data_column_id;
	temp_column.datatype='text';
	temp_column.fontsize=fontsize;
	temp_column.fontcolor='#'+fontcolor;
	temp_column.position={};
	temp_column.position.my=position;
	temp_column.position.at=position;
	temp_column.elapsedtime=elapsedtime;
	temp_column.timeout=0;
	temp_column.text=text;
	temp_column.answer='AAAAAAAAAAAAAAA';
	temp_column.weight=555555555;
	
	var flow=toolbox_data_js_get_flow(flowchart_id);
	var column=toolbox_data_js_get_data_column(flowchart_id,data_row_id,data_column_id);
	if(column==null)//add
	{
		column=temp_column;
		var row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
		if(row==null)//add
		{
			row={};
			row.id=data_row_id;
			row.data_column_list=[];
			row.data_column_list.push(column);
			var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
			data_row_list.push(row);
			
		}else//update
		{
			row.data_column_list.push(column);
		}
		
	}else//update
	{
		column=temp_column;
		//alert('TODO2');
	}
	
	$('#toolbox_data_sub_plaintext_js_new_data_column_dialog_id'+flowchart_id).dialog("close");
	toolbox_data_js_show_data_column_list(flowchart_id,data_row_id);
}

