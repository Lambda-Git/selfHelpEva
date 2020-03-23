var toolbox_data_js_vars={
};

/****  open row list dialog  ****/
function toolbox_data_js_open_toolbox_data_editor(flowchart_id)
{
	var dialogid='toolbox_data_js_toolbox_data_editor'+flowchart_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：数据工具'>"+
			"<div >" +
				"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
					"<li><a href='#toolbox_data_js_tab_data"+flowchart_id+"'><span>刺激反应系列</span></a></li>"+
					"<li><a href='#toolbox_data_js_tab_common"+flowchart_id+"'><span>常规设置</span></a></li>"+
					"<li><a href='#toolbox_data_js_tab_comment"+flowchart_id+"'><span>说明备注</span></a></li>"+
				"</ul>"+
				"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
					"<div id='toolbox_data_js_tab_data"+flowchart_id+"' >"+
					"</div>"+
					"<div id='toolbox_data_js_tab_common"+flowchart_id+"' >"+
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
				var temargs={};
				temargs.flowchart_id=flowchart_id;
				temargs.addOrEditFlag='ADD';
				load_js_then_exec_func_util('js/framework/toolbox_data_column.js','toolbox_data_column_js_openColumnListDialog',temargs);
			}
		},{
			text: "复制",
			click: function() {
				toolbox_data_js_copyMultipleRow(flowchart_id);
			}
		},{
			text: "删除",
			click: function() {
				toolbox_data_js_deleteMultipleRow(flowchart_id);
			}
		},{
			text: "下载EXCEL",
			click: function() {
				toolbox_data_js_downloadExcel(flowchart_id);
			}
		},{
			text: "上传EXCEL",
			click: function() {
				toolbox_data_js_uploadExcel(flowchart_id);
			}
		},{
			text: "确定",
			click: function() {
				$(this).dialog("close");
				toolbox_data_js_save_source_data(flowchart_id);
			}
		},{
			text: "关闭",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$("#"+dialogid).tabs();
	$('#'+dialogid).dialog('open');
	
	toolbox_data_js_refreshDataCommonSettings(flowchart_id);
	load_js_then_exec_func_util('js/framework/toolbox_data_row.js','toolbox_data_row_js_refreshRowList',flowchart_id);
}
function toolbox_data_js_save_source_data(flowchart_id)
{
	toolbox_data_js_saveDataCommonSettings(flowchart_id);
	//alert(JSON.stringify(toolbox_data_js_get_flow(flowchart_id)));
}

function toolbox_data_js_copyMultipleRow(flowchart_id)
{
	var temargs={};
	temargs.flowchart_id=flowchart_id;
	temargs.data_row_id_list=[];
	
	$('input[name="toolbox_data_row_js_multipleRowsNeedToCopyCheckboxName'+flowchart_id+'"]:checked').each(function(){
			var data_row_id=$(this).val();
	     	temargs.data_row_id_list.push(data_row_id);
	});
	if(temargs.data_row_id_list.length==0)
	{
		tips('请选择一个或多个记录！');
	}else
	{
		//alert(temargs.data_row_id_list.join(','));
		load_js_then_exec_func_util('js/framework/toolbox_data_row_copy.js','toolbox_data_row_copy_js_openCopyMultipleRowSettingDialog',temargs);
	}
}
function toolbox_data_js_deleteMultipleRow(flowchart_id)
{
	var temargs={};
	temargs.flowchart_id=flowchart_id;
	temargs.data_row_id_list=[];
	
	$('input[name="toolbox_data_row_js_multipleRowsNeedToCopyCheckboxName'+flowchart_id+'"]:checked').each(function(){
			var data_row_id=$(this).val();
	     	temargs.data_row_id_list.push(data_row_id);
	});
	if(temargs.data_row_id_list.length==0)
	{
		tips('请选择一个或多个记录！');
	}else
	{
		//alert(temargs.data_row_id_list.join(','));
		load_js_then_exec_func_util('js/framework/toolbox_data_row_delete.js','toolbox_data_row_delete_js_deleteMultipleRow',temargs);
	}
}
function toolbox_data_js_downloadExcel(flowchart_id)
{
	load_js_then_exec_func_util('js/framework/toolbox_data_row_excel.js','toolbox_data_row_excel_js_downloadExcel',flowchart_id);
}
function toolbox_data_js_uploadExcel(flowchart_id)
{
	load_js_then_exec_func_util('js/framework/toolbox_data_row_excel.js','toolbox_data_row_excel_js_uploadExcel',flowchart_id);
}
function toolbox_data_js_refreshDataCommonSettings(flowchart_id)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：数据工具: 新建一条数据系列：添加数据</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>显示名称（"+flowchart_id+"）:</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_js_refresh_flowtitle_"+flowchart_id+"' value='新建工具'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>是否随机数据:</td>");
	newcontent+=("<td><select id='toolbox_data_js_refreshDataCommonSettings_randomFlag_"+flowchart_id+"' style='width:200px;'><option value='5'>BlockID组块顺序随机组块内刺激随机</option><option value='4'>BlockID组块顺序不变组块内刺激随机</option><option value='3'>BlockID组块随机组块内刺激顺序不变</option><option value='2'>BlockID组按大小排序组内不变</option><option value='1'>全随机排序数据</option><option selected value='0'>按原始数据不随机排序数据</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>呈现类型:</td>");
	newcontent+=("<td>" +
			"<select id='toolbox_data_js_refreshDataCommonSettings_show_type_id_"+flowchart_id+"' >" +
				"<option selected value='TEST_TYPE_TYPICAL'>标准实验类型</option>" +
				"<option value='TEST_TYPE_SURVEY_FORM'>调查问卷类型</option>" +
			"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_data_js_tab_common'+flowchart_id).html(newcontent);
	$('#toolbox_data_js_tab_common'+flowchart_id+' input').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#toolbox_data_js_tab_common'+flowchart_id+' select').css({'height': '30px','width':'300px'});
	$('.OPES_TABLE_ID').footable();
	initialize_tooltips();
	$('#toolbox_data_js_tab_common'+flowchart_id+' td').css({'padding': '2px'});
	
	var flow=toolbox_data_js_get_flow(flowchart_id);
	if(flow!=null)
	{
		if(typeof flow.flowtitle != 'undefined')
		{
			$('#toolbox_data_js_refresh_flowtitle_'+flowchart_id).val(flow.flowtitle);
		}
		if(typeof flow.flowdata.randomFlag != 'undefined')
		{
			$('#toolbox_data_js_refreshDataCommonSettings_randomFlag_'+flowchart_id).val(flow.flowdata.randomFlag);
		}
		if(typeof flow.flowdata.showtype != 'undefined')
		{
			$('#toolbox_data_js_refreshDataCommonSettings_show_type_id_'+flowchart_id).val(flow.flowdata.showtype);
		}
	}
	
}
function toolbox_data_js_saveDataCommonSettings(flowchart_id)
{
	var flow=toolbox_data_js_get_flow(flowchart_id);
	
	var toolbox_data_js_refreshDataCommonSettings_randomFlag_=$('#toolbox_data_js_refreshDataCommonSettings_randomFlag_'+flowchart_id).val();
	var flowtitle=$('#toolbox_data_js_refresh_flowtitle_'+flowchart_id).val();
	var showtype=$('#toolbox_data_js_refreshDataCommonSettings_show_type_id_'+flowchart_id).val();
	
	flow.flowdata.randomFlag=toolbox_data_js_refreshDataCommonSettings_randomFlag_;
	flow.flowdata.current_row_index=-1;
	flow.flowdata.showtype=showtype;
	flow.flowtitle=flowtitle;
	
	$('#flowchart_tool_title_'+flowchart_id).html(flowtitle);
	
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
			
			//var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
			//alert(JSON.stringify(row)+'__66666__'+row.trialid);
			
			return row;
		}
	}
	
	return null;
}
function toolbox_data_js_get_data_row_order(flowchart_id,data_row_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	for(var i=0;i<data_row_list.length;i++)
	{
		var row=data_row_list[i];
		if(row.id==data_row_id)
		{
			return i;
		}
	}
	return -1;
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

function toolbox_data_js_add_data_row(flowchart_id,data_row)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	data_row_list.push(data_row);
}
function toolbox_data_js_delete_data_row(flowchart_id,data_row_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	var delete_index=-1;
	for(var i=0;i<data_row_list.length;i++)
	{
		var row=data_row_list[i];
		if(row.id==data_row_id)
		{
			delete_index=i;
			break;
		}
	}
	data_row_list.splice(delete_index, 1);
	return data_row_list;
}
function toolbox_data_js_delete_data_column(flowchart_id,data_row_id,data_column_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	var delete_index=-1;
	var data_column_list=[];
	for(var i=0;i<data_row_list.length;i++)
	{
		var row=data_row_list[i];
		if(row.id==data_row_id)
		{
			data_column_list=row.data_column_list;
			for(var j=0;j<data_column_list.length;j++)
			{
				var column=data_column_list[j];
				if(column.id==data_column_id)
				{
					delete_index=j;
					break;
				}
			}
		}
	}
	data_column_list.splice(delete_index, 1);
	return data_row_list;
}
//----------------calculate the max id for rowid and columnid------------------
function toolbox_data_js_get_max_value_for_rowid(flowchart_id)
{
	var max=0;
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	for(var i=0;i<data_row_list.length;i++)
	{
		var row=data_row_list[i];
		if(row.id>max)
		{
			max=row.id;
		}
	}
	return max+1;
	
}
function toolbox_data_js_get_max_value_for_columnid_in_all_data_rows(flowchart_id)
{
	var max=0;
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	for(var i=0;i<data_row_list.length;i++)
	{
		var row=data_row_list[i];
		var data_column_list=row.data_column_list;
		for(var j=0;j<data_column_list.length;j++)
		{
			var column=data_column_list[j];
			if(column.id>max)
			{
				max=column.id;
			}
		}
		
	}
	return max+1;
	
}
//should not be used anymore, use above method instead!
function toolbox_data_js_get_max_value_for_columnid(flowchart_id,data_row_id)
{
	var max=0;
	var row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	if(row==null)
	{
		max=0;
	}else
	{
		var data_column_list=row.data_column_list;
		for(var j=0;j<data_column_list.length;j++)
		{
			var column=data_column_list[j];
			if(column.id>max)
			{
				max=column.id;
			}
		}
	}
	return max+1;
}
//---------------------------STIMULATE_TYPE----------------------------------
function toolbox_data_js_get_stimulate_type_short_name(stimulate_type)
{
	if(stimulate_type=='STIMULATE_TYPE_NULL')
	{
		return '空白刺激';
	}else if(stimulate_type=='STIMULATE_TYPE_PLAINTEXT')
	{
		return '简单文本';
	}else if(stimulate_type=='STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY')
	{
		return '绑定按键';
	}else if(stimulate_type=='STIMULATE_TYPE_INPUT')
	{
		return '输入框';
	}else if(stimulate_type=='STIMULATE_TYPE_DATE')
	{
		return '日期';
	}else if(stimulate_type=='STIMULATE_TYPE_TEXTAREA')
	{
		return '输入文本';
	}else if(stimulate_type=='STIMULATE_TYPE_BUTTON')
	{
		return '按钮';
	}else if(stimulate_type=='STIMULATE_TYPE_RADIOBUTTON')
	{
		return '单项选择';
	}else if(stimulate_type=='STIMULATE_TYPE_CHECKBOX')
	{
		return '多项选择';
	}else if(stimulate_type=='STIMULATE_TYPE_RICHTEXT')
	{
		return '丰富文本';
	}else if(stimulate_type=='STIMULATE_TYPE_IMAGE')
	{
		return '图片';
	}else if(stimulate_type=='STIMULATE_TYPE_SOUND')
	{
		return '声音';
	}else if(stimulate_type=='STIMULATE_TYPE_FLASH')
	{
		return '动画';
	}else if(stimulate_type=='STIMULATE_TYPE_VIDEO')
	{
		return '视频';
	}else if(stimulate_type=='STIMULATE_TYPE_PRE_CUSTOM_CODE')
	{
		return '前置代码';
	}else if(stimulate_type=='STIMULATE_TYPE_POST_CUSTOM_CODE')
	{
		return '后置代码';
	}else if(stimulate_type=='STIMULATE_TYPE_MOUSE_TYPE')
	{
		return '鼠标样式';
	}else if(stimulate_type=='STIMULATE_TYPE_SOUND_SWITCH')
	{
		return '绑定声控开关（仅需一次）';
	}else if(stimulate_type=='STIMULATE_TYPE_TURNON_SOUND_SWITCH')
	{
		return '打开声控开关';
	}else if(stimulate_type=='STIMULATE_TYPE_TURNOFF_SOUND_SWITCH')
	{
		return '关闭声控开关';
	}else
	{
		return '刺激类型无法识别：'+stimulate_type;
	}
}

