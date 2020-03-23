var toolbox_data_js_vars={
};


//TODO : 1. Add all ids with flowchart_id 2. add data window and update data window messup
/**********************open editor dialog (Level 1)*****************************/

function toolbox_data_js_open_toolbox_data_editor(flowchart_id)
{
	var dialogid='toolbox_data_js_toolbox_data_editor'+flowchart_id;
	if($('#'+dialogid).length==0)
	{
		$('body').append("<div id='"+dialogid+"' title='属性：数据工具'>"+
				"<div >" +
					"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
						"<li><a href='#toolbox_data_js_tab_data"+flowchart_id+"'><span>数据</span></a></li>"+
						"<li><a href='#toolbox_data_js_tab_general"+flowchart_id+"'><span>常规</span></a></li>"+
						"<li><a href='#toolbox_data_js_tab_comment"+flowchart_id+"'><span>备注</span></a></li>"+
					"</ul>"+
					"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
						"<div id='toolbox_data_js_tab_general"+flowchart_id+"'>"+
						"</div>"+
						"<div id='toolbox_data_js_tab_data"+flowchart_id+"' >"+
						"</div>"+
						"<div id='toolbox_data_js_tab_comment"+flowchart_id+"' >"+
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
				text: "新增",
				click: function() {
					//toolbox_data_js_open_new_data_row_dialog(flowchart_id);
					load_js_then_exec_func_util('js/framework/toolbox_data_column.js','toolbox_data_column_js_refreshColumnList',flowchart_id);
				}
			},{
				text: "确定",
				click: function() {
					$(this).dialog("close");
					//toolbox_data_js_save_source_data(flowchart_id);
				}
			}]
		});
		$("#"+dialogid).tabs();
	}else
	{
		$('#'+dialogid).dialog('open');
	}
	
	load_js_then_exec_func_util('js/framework/toolbox_data_row.js','toolbox_data_row_js_refreshRowList',flowchart_id);
}
function toolbox_data_js_save_source_data______________(flowchart_id)
{
	//alert(JSON.stringify(toolbox_data_js_get_flow(flowchart_id)));
}






























function toolbox_data_js_get_data_content_for_editor(flowchart_id)
{
	//var data_row_id=getTimestamp();
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	
	var newcontent = "<div id='toolbox_data_js_get_data_content_for_editor_div_id"+flowchart_id+"'>";
	//newcontent+="<div style='float:right;'>" ;
	//newcontent+="<a href='javascript:;' onclick='toolbox_data_js_open_new_data_row_dialog(\""+flowchart_id+"\")' class='aImgButton'  ><img src='imgs/add_16.png'></img>新建<a/></div>";
	newcontent+=("<table class='OPES_TABLE_ID' cellspacing='0' ><thead><tr><th scope=col>修改</th><th scope=col>ID</th><th scope=col>子集个数</th><th scope=col>响应设置</th><th scope=col>删除</th><th scope=col>状态</th><th scope=col>状态</th></tr></thead>");
	if(data_row_list==null||data_row_list.length==0)
	{
		newcontent+="<tr>";
		newcontent+=("<td colspan='100%' style='text-align:center'>暂时没有数据</td>");
		newcontent+="</tr>";
	}else
	{
		$.each(data_row_list,function(i){
			newcontent+="<tr>";
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_js_open_new_data_row_dialog(\""+flowchart_id+"\","+ data_row_list[i].id +") width=30px height=30px border=0 src='imgs/edit.png' ></img></a></td>";
			newcontent+=("<td>"+ data_row_list[i].id +"</td>");
			newcontent+=("<td>"+ data_row_list[i].data_column_list.length +"</td>");
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_js_open_set_response_for_one_data_row_dialog(\""+flowchart_id+"\","+ data_row_list[i].id +") width=25px height=25px border=0 src='imgs/smile_grin_48.png' ></img></a></td>";
			newcontent+="<td><a href='javascript:;'><img onclick=aaa("+ data_row_list[i].id  +") width=24px height=24px border=0 src='imgs/cancel_48.png' ></img></a></td>";
			
			newcontent+="<td><a class='opes2_tooltip' href='javascript:;' title='未完成本条数据' href='javascript:;'><img width=24px height=24px border=0 src='imgs/processing.gif' ></img></a></td>";
			newcontent+="<td><a class='opes2_tooltip' href='javascript:;' title='已完成本条数据' href='javascript:;'><img width=24px height=24px border=0 src='imgs/accepted_48.png' ></img></a></td>";
			
			newcontent+="</tr>";
		});
	}
	
	newcontent+="</tbody></table>";
	newcontent+="</div>";
	
	return newcontent;
}

/**********************open one data row response settings dialog (Level 2)*****************************/

function toolbox_data_js_open_set_response_for_one_data_row_dialog(flowchart_id,data_row_id)
{
	var dialogid='toolbox_data_js_set_response_for_one_data_row_dialog_id'+flowchart_id+'_'+data_row_id;
	if($('#'+dialogid).length==0)
	{
		$('body').append("<div id='"+dialogid+"' title='属性：数据工具：数据系列：响应设置'>"+
				"<div >" +
				toolbox_data_js_get_data_content_for_set_response_for_one_data_row_dialog(flowchart_id,data_row_id)+
				"</div>" +
		"</div>");
		$('#'+dialogid).dialog({
			resizable: false,
			autoOpen: true,
			height: 500,
			width: 800,
			modal: true,
			buttons:[{
				//id: "toolbox_data_js_new_data_column_dialog_ok_button_id"+flowchart_id,
				text: "确定",
				click: function() {
					toolbox_data_js_update_response_for_one_data_row(flowchart_id,data_row_id);
				}
			},{
				text: "取消",
				click: function() {
					$(this).dialog("close");
				}
			}]
		});
		opes_utils_add_table_css();
		initialize_tooltips();
		initialize_jqueryui_color_picker_for_inputs(['toolbox_data_js_set_response_for_one_data_row_answerfontcolor_id'+flowchart_id+data_row_id]);
	}else
	{
		$('#'+dialogid).dialog('open');
	}
}
function toolbox_data_js_get_data_content_for_set_response_for_one_data_row_dialog(flowchart_id,data_row_id)
{
	var newcontent = "<div>";
	newcontent+=("<table class='OPES_TABLE_ID' cellspacing='0' ><thead><tr><th scope=col colspan=4>toolbox_data_js_get_general_tab_content_for_toolbox_text_editor</th></tr></thead>");
	newcontent+="<tr>";
	newcontent+=("<td>显示答案:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><select id='toolbox_data_js_set_response_for_one_data_row_showanswer_id"+flowchart_id+data_row_id+data_row_id+"' style='width:200px;'><option selected value='1'>是</option><option value='0'>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>答案类型:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_js_set_response_for_one_data_row_answertype_id"+flowchart_id+data_row_id+"' style='width:200px;' value='text' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>答案内容:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_js_set_response_for_one_data_row_answercontent_id"+flowchart_id+data_row_id+"' style='width:200px;' value='TTTT' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>呈现时间：</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_js_set_response_for_one_data_row_answerelapsedtime_id"+flowchart_id+data_row_id+"' style='width:200px;' value='3000' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>隐藏刺激:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><select id='toolbox_data_js_set_response_for_one_data_row_hidequestion_id"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value='1'>是</option><option value='0'>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>顺序呈现:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><select id='toolbox_data_js_set_response_for_one_data_row_showonebyone_id"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value='allinone'>同时呈现</option><option value='onebyone'>顺序呈现</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>显示位置：</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><select id='toolbox_data_js_set_response_for_one_data_row_answerposition_id"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value='center'>中间</option><option value='left'>左边</option><option value='right'>右边</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>字体大小:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_js_set_response_for_one_data_row_answerfontsize_id"+flowchart_id+data_row_id+"' style='width:200px;' value='30px' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>字体颜色:</td>");
	newcontent+=("<td>&nbsp;</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_js_set_response_for_one_data_row_answerfontcolor_id"+flowchart_id+data_row_id+"' style='width:200px;' value='30px' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	newcontent+="</div>";
	return newcontent;
}
//本方法内的对象schema 必须按照 opes-template/data.js测试运行通过后的定义
function toolbox_data_js_update_response_for_one_data_row(flowchart_id,data_row_id)
{
	var row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	
	var show_answer=$('#toolbox_data_js_set_response_for_one_data_row_showanswer_id'+flowchart_id+data_row_id).val();
	var datatype=$('#toolbox_data_js_set_response_for_one_data_row_answertype_id'+flowchart_id+data_row_id).val();
	var answer=$('#toolbox_data_js_set_response_for_one_data_row_answercontent_id'+flowchart_id+data_row_id).val();
	var show_answer_time=$('#toolbox_data_js_set_response_for_one_data_row_answerelapsedtime_id'+flowchart_id+data_row_id).val();
	var hide_question_if_show_answer=$('#toolbox_data_js_set_response_for_one_data_row_hidequestion_id'+flowchart_id+data_row_id).val();
	var onebyone=$('#toolbox_data_js_set_response_for_one_data_row_showonebyone_id'+flowchart_id+data_row_id).val();
	var position=$('#toolbox_data_js_set_response_for_one_data_row_answerposition_id'+flowchart_id+data_row_id).val();
	var fontsize=$('#toolbox_data_js_set_response_for_one_data_row_answerfontsize_id'+flowchart_id+data_row_id).val();
	var fontcolor=$('#toolbox_data_js_set_response_for_one_data_row_answerfontcolor_id'+flowchart_id+data_row_id).val();
	
	row.show_answer=true;
	row.show_answer_time=show_answer_time;
	row.hide_question_if_show_answer=true;
	row.onebyone=false;
	row.answer=answer;
	row.datatype=datatype;
	row.fontsize=fontsize;
	row.fontcolor='#'+fontcolor;
	row.position={};
	row.position.my=position;
	row.position.at=position;
	
	$('#toolbox_data_js_set_response_for_one_data_row_dialog_id'+flowchart_id+'_'+data_row_id).dialog('close');
	
}
/**********************open add data row dialog (Level 2)*****************************/

function toolbox_data_js_open_new_data_row_dialog(flowchart_id)
{
	var dialogid='toolbox_data_js_new_data_row_dialog_id'+flowchart_id;
	$('#'+dialogid).dialog('destroy');
	$('#'+dialogid).remove();
	if($('#'+dialogid).length==0)
	{
		$('body').append("<div id='"+dialogid+"' title='属性：数据工具：ADD新建一条数据系列'>"+
				"<div >" +
					toolbox_data_js_get_data_content_for_new_data_row_dialog(flowchart_id)+
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
					//alert(JSON.stringify(toolbox_data_js_get_flow(flowchart_id)));
					toolbox_data_js_show_data_row_list(flowchart_id);
				}
			},{
				text: "取消",
				click: function() {
					$(this).dialog("close");
				}
			}]
		});
		opes_utils_add_table_css();
		$("#toolbox_data_js_new_data_row_dialog_id"+flowchart_id+" .aImgButton").button();
	}else
	{
		$('#'+dialogid).dialog('open');
	}
	var data_row_id=getTimestamp();
	//var data_column_id=null;
	toolbox_data_js_bind_click_even_for_sub_data_type_buttons(flowchart_id,data_row_id);
	toolbox_data_js_show_data_column_list(flowchart_id,data_row_id);
}
function toolbox_data_js_bind_click_even_for_sub_data_type_buttons(flowchart_id,data_row_id)
{
	var tempParam={flowchart_id:flowchart_id,data_row_id:data_row_id};
	
	$("#toolbox_data_js_add_data_column_sub_plaintext_button"+flowchart_id).unbind("click");
	$("#toolbox_data_js_add_data_column_sub_plaintext_button"+flowchart_id).click(
		function(){
			//var data_column_id=null;//generate it dynamically every time when openning the toolbox_data_js_open_new_data_column_dialog
			//toolbox_data_js_open_new_data_column_dialog(flowchart_id,data_row_id,data_column_id);
			load_js_then_exec_func_util('js/framework/toolbox_data_sub_plaintext.js','toolbox_data_sub_plaintext_js_open_new_data_column_dialog',tempParam);
		}
	);
	
	$("#toolbox_data_js_add_data_column_sub_richtext_button"+flowchart_id).unbind("click");
	$("#toolbox_data_js_add_data_column_sub_richtext_button"+flowchart_id).click(
		function(){
			tips('TODO');
		}
	);
	
	$("#toolbox_data_js_add_data_column_sub_image_button"+flowchart_id).unbind("click");
	$("#toolbox_data_js_add_data_column_sub_image_button"+flowchart_id).click(
		function(){
			tips('TODO');
		}
	);
	
	$("#toolbox_data_js_add_data_column_sub_flash_button"+flowchart_id).unbind("click");
	$("#toolbox_data_js_add_data_column_sub_flash_button"+flowchart_id).click(
		function(){
			tips('TODO');
		}
	);
	
	$("#toolbox_data_js_add_data_column_sub_sound_button"+flowchart_id).unbind("click");
	$("#toolbox_data_js_add_data_column_sub_sound_button"+flowchart_id).click(
		function(){
			tips('TODO');
		}
	);
	
}
function toolbox_data_js_get_data_content_for_new_data_row_dialog(flowchart_id)
{
	
	var newcontent = "";
	newcontent+="<div style='float:right;'>"; 
	newcontent+="<a id='toolbox_data_js_add_data_column_sub_plaintext_button"+flowchart_id+"' href='javascript:;' class='aImgButton'  ><img src='imgs/add_16.png'></img>简单文本<a/>";
	newcontent+="<a id='toolbox_data_js_add_data_column_sub_richtext_button"+flowchart_id+"' href='javascript:;' class='aImgButton'  ><img src='imgs/add_16.png'></img>丰富文本<a/>";
	newcontent+="<a id='toolbox_data_js_add_data_column_sub_image_button"+flowchart_id+"' href='javascript:;' class='aImgButton'  ><img src='imgs/add_16.png'></img>图片<a/>";
	newcontent+="<a id='toolbox_data_js_add_data_column_sub_flash_button"+flowchart_id+"' href='javascript:;' class='aImgButton'  ><img src='imgs/add_16.png'></img>动画<a/>";
	newcontent+="<a id='toolbox_data_js_add_data_column_sub_sound_button"+flowchart_id+"' href='javascript:;' class='aImgButton'  ><img src='imgs/add_16.png'></img>声音<a/>";
	newcontent+="</div>";
	
	newcontent+="<div id='toolbox_data_js_data_column_list_div"+flowchart_id+"' >";
	newcontent+=("<table class='OPES_TABLE_ID' cellspacing='0' ><thead><tr><th scope=col>ID</th><th scope=col>修改</th><th scope=col>weight</th><th scope=col>text</th><th scope=col>answer</th></tr></thead>");
	newcontent+="<tr>";
	newcontent+=("<td colspan='100%' align='center'>暂时没有数据</td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	newcontent+="</div>";
	
	return newcontent;
}

/***************************************show data actions******************************************/

function toolbox_data_js_show_data_column_list(flowchart_id,data_row_id)
{
	var row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	var columns=[];
	if(row!=null)
	{
		columns=row.data_column_list;
	}
	var newcontent="";
	newcontent+=("<table class='OPES_TABLE_ID' cellspacing='0' ><thead><tr><th scope=col>修改</th><th scope=col>ID</th><th scope=col>text</th><th scope=col>fontsize</th><th scope=col>fontcolor</th><th scope=col>elapsedtime</th><th scope=col>position</th><th scope=col>删除</th></tr></thead>");
	if(columns.length==0)
	{
		newcontent+="<tr>";
		newcontent+=("<td colspan='100%' align='center'>暂时没有数据</td>");
		newcontent+="</tr>";
	}else
	{
		$.each(columns,function(i){
			newcontent+="<tr>";
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_js_open_new_data_column_dialog(\""+flowchart_id+"\","+data_row_id+","+ columns[i].id  +") width=30px height=30px border=0 src='imgs/edit.png' ></img></a></td>";
			newcontent+=("<td>"+ columns[i].id +"</td>");
			newcontent+=("<td>"+ columns[i].text +"</td>");
			newcontent+=("<td>"+ columns[i].fontsize +"</td>");
			newcontent+=("<td>"+ columns[i].fontcolor +"</td>");
			newcontent+=("<td>"+ columns[i].elapsedtime +"</td>");
			newcontent+=("<td>"+ columns[i].position +"</td>");
			newcontent+="<td><a href='javascript:;'><img onclick=aaa("+ columns[i].id  +") width=24px height=24px border=0 src='imgs/cancel_48.png' ></img></a></td>";
			newcontent+="</tr>";
		});
	}
	newcontent+="</tbody></table>";
	$('#toolbox_data_js_data_column_list_div'+flowchart_id).html(newcontent);
	opes_utils_add_table_css();
}
function toolbox_data_js_show_data_row_list(flowchart_id)
{
	var newcontent=toolbox_data_js_get_data_content_for_editor(flowchart_id);
	$('#toolbox_data_js_tab_data'+flowchart_id).html(newcontent);
	opes_utils_add_table_css();
	$(".aImgButton").button();
	
	$('#toolbox_data_js_new_data_row_dialog_id'+flowchart_id).dialog("close");
}
/************************************************** Utils *****************************************/
function toolbox_data_js_get_flow(flowchart_id)
{
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	return flow;
}
function toolbox_data_js_get_data_row_list(flowchart_id)
{
	var flow=toolbox_data_js_get_flow(flowchart_id);
	var data_row_list=flow.flowdata.data_row_list;
	if(data_row_list==null||data_row_list=='undefined')
	{
		flow.flowdata.data_row_list=[];
		data_row_list=[];
	}
	return data_row_list;
}
function toolbox_data_js_get_data_row(flowchart_id,data_row_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	for(var i=0;i<data_row_list.length;i++)
	{
		var row=data_row_list[i];
		if(row.id==data_row_id)
		{
			return row;
		}
	}
	return null;
}

function toolbox_data_js_get_data_column(flowchart_id,data_row_id,data_column_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	for(var i=0;i<data_row_list.length;i++)
	{
		var row=data_row_list[i];
		if(row.id==data_row_id)
		{
			var data_column_list=row.data_column_list;
			for(var j=0;j<data_column_list.length;j++)
			{
				var column=data_column_list[j];
				if(column.id==data_column_id)
				{
					return column;
				}
			}
		}
	}
	return null;
}

