var toolbox_data_row_copy_js_vars={
};


function toolbox_data_row_copy_js_openCopyRowSettingDialog(passobj)
{
	var flowchart_id=passobj.flowchart_id;
	var data_row_id=passobj.data_row_id;
	
	var dialogid='toolbox_data_row_copy_js_openCopyRowSettingDialog'+flowchart_id+data_row_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：数据工具：数据行：复制'>"+
			"<div id='toolbox_data_row_copy_js_openCopyRowSetting_div"+flowchart_id+data_row_id+"' >"+
			"</div>"+
	"</div>");
	$('#'+dialogid).dialog({
		resizable: false,
		autoOpen: true,
		height: 280,
		width: 500,
		modal: false,
		buttons:[{
			text: "确定",
			click: function() {
				$(this).dialog("close");
				toolbox_data_row_copy_js_copyRow(flowchart_id,data_row_id);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$('#'+dialogid).dialog('open');
	toolbox_data_row_copy_js_refreshCopyRowSettings(flowchart_id,data_row_id);
	
}
function toolbox_data_row_copy_js_copyRow(flowchart_id,data_row_id)
{
	var copys=$('#toolbox_data_row_copy_js_refreshCopyRowSettings_copys_'+flowchart_id+data_row_id).val();
	var position=$('#toolbox_data_row_copy_js_refreshCopyRowSettings_position_'+flowchart_id+data_row_id).val();
	
	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	//var new_data_row_id=getTimestamp();
	var new_data_row_id=toolbox_data_js_get_max_value_for_rowid(flowchart_id);
	for(var i=0;i<copys;i++)
	{
		var newrow=$.extend(true,{},data_row);
		newrow.id=new_data_row_id+i;
		for(var c=0;c<newrow.data_column_list.length;c++)
		{
			var newcolumn=newrow.data_column_list[c];
			//newcolumn.id=newrow.id+c;//Note: suggest to use toolbox_data_js_get_max_value_for_columnid_in_all_data_rows() in the future! or there will be duplicate values!
			newcolumn.id=toolbox_data_js_get_max_value_for_columnid_in_all_data_rows(flowchart_id)+c;//as the row has not bee added, so add "c"
			if(newcolumn.stimulateType=='STIMULATE_TYPE_PRE_CUSTOM_CODE')
			{
				newcolumn.funName='_'+flowchart_id+'_PRE_'+newrow.id+'_'+newcolumn.id+'_';
			}else if(newcolumn.stimulateType=='STIMULATE_TYPE_POST_CUSTOM_CODE')
			{
				newcolumn.funName='_'+flowchart_id+'_POST_'+newrow.id+'_'+newcolumn.id+'_';
			}else if(newcolumn.stimulateType=='STIMULATE_TYPE_IMAGE')
			{
				newcolumn.onclickFunName='_'+flowchart_id+'_IMG_ONCLICK_'+newrow.id+'_'+newcolumn.id+'_';
			}
		}
		toolbox_data_js_add_data_row(flowchart_id,newrow);
	}
	
	toolbox_data_row_js_refreshRowList(flowchart_id);
}
function toolbox_data_row_copy_js_refreshCopyRowSettings(flowchart_id,data_row_id)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：数据工具：数据行：复制</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>输入要复制的条数：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_row_copy_js_refreshCopyRowSettings_copys_"+flowchart_id+data_row_id+"' style='width:200px;' value='10' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>新数据插入的位置:</td>");
	newcontent+=("<td><select id='toolbox_data_row_copy_js_refreshCopyRowSettings_position_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value='INSERT_TO_FRONT'>追加到最前面</option><option value='INSERT_TO_END'>追加到最后面</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_data_row_copy_js_openCopyRowSetting_div'+flowchart_id+data_row_id).html(newcontent);
	$('#toolbox_data_row_copy_js_openCopyRowSetting_div'+flowchart_id+data_row_id+' input').css({'height': '16px','width':'200px','padding':'6px 9px'});
	$('#toolbox_data_row_copy_js_openCopyRowSetting_div'+flowchart_id+data_row_id+' select').css({'height': '30px','width':'220px'});
	$('.OPES_TABLE_ID').footable();
	$('#toolbox_data_row_copy_js_openCopyRowSetting_div'+flowchart_id+data_row_id+' td').css({'padding': '2px'});
	
}
/*******************************************copy multiple rows****************************************/
function toolbox_data_row_copy_js_openCopyMultipleRowSettingDialog(passobj)
{
	var flowchart_id=passobj.flowchart_id;
	var data_row_id_list=passobj.data_row_id_list;
	
	var dialogid='toolbox_data_row_copy_js_openCopyMultipleRowSettingDialog'+flowchart_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：数据工具：数据行：复制'>"+
			"<div id='toolbox_data_row_copy_js_openCopyMultipleRowSetting_div"+flowchart_id+"' >"+
			"</div>"+
	"</div>");
	$('#'+dialogid).dialog({
		resizable: false,
		autoOpen: true,
		height: 280,
		width: 500,
		modal: false,
		buttons:[{
			text: "确定",
			click: function() {
				$(this).dialog("close");
				toolbox_data_row_copy_js_copyMultipleRow(flowchart_id,data_row_id_list);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$('#'+dialogid).dialog('open');
	toolbox_data_row_copy_js_refreshCopyMultipleRowSettings(flowchart_id,data_row_id_list);
}
function toolbox_data_row_copy_js_copyMultipleRow(flowchart_id,data_row_id_list)
{
	var copys=$('#toolbox_data_row_copy_js_refreshCopyMultipleRowSettings_copys_'+flowchart_id).val();
	
	//var new_data_row_id=getTimestamp();
	var new_data_row_id=toolbox_data_js_get_max_value_for_rowid(flowchart_id);
	for(var i=0;i<copys;i++)
	{
		for(var dr=0;dr<data_row_id_list.length;dr++)
		{
			var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id_list[dr]);
			
			var newrow=$.extend(true,{},data_row);
			newrow.id=new_data_row_id++;
			newrow.trialid=newrow.id;
			for(var c=0;c<newrow.data_column_list.length;c++)
			{
				var newcolumn=newrow.data_column_list[c];
				newcolumn.id=newrow.id+c;
				if(newcolumn.stimulateType=='STIMULATE_TYPE_PRE_CUSTOM_CODE')
				{
					newcolumn.funName='_'+flowchart_id+'_PRE_'+newrow.id+'_'+newcolumn.id+'_';
				}else if(newcolumn.stimulateType=='STIMULATE_TYPE_POST_CUSTOM_CODE')
				{
					newcolumn.funName='_'+flowchart_id+'_POST_'+newrow.id+'_'+newcolumn.id+'_';
				}else if(newcolumn.stimulateType=='STIMULATE_TYPE_IMAGE')
				{
					newcolumn.onclickFunName='_'+flowchart_id+'_IMG_ONCLICK_'+newrow.id+'_'+newcolumn.id+'_';
				}
			}
			toolbox_data_js_add_data_row(flowchart_id,newrow);
		}
	}
	
	toolbox_data_row_js_refreshRowList(flowchart_id);
}
function toolbox_data_row_copy_js_refreshCopyMultipleRowSettings(flowchart_id,data_row_id_list)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：数据工具：数据行：复制</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>输入要复制的条数：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_row_copy_js_refreshCopyMultipleRowSettings_copys_"+flowchart_id+"' style='width:200px;' value='10' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_data_row_copy_js_openCopyMultipleRowSetting_div'+flowchart_id).html(newcontent);
	$('#toolbox_data_row_copy_js_openCopyMultipleRowSetting_div'+flowchart_id+' input').css({'height': '16px','width':'200px','padding':'6px 9px'});
	$('#toolbox_data_row_copy_js_openCopyMultipleRowSetting_div'+flowchart_id+' select').css({'height': '30px','width':'220px'});
	$('.OPES_TABLE_ID').footable();
	$('#toolbox_data_row_copy_js_openCopyMultipleRowSetting_div'+flowchart_id+' td').css({'padding': '2px'});
	
}

