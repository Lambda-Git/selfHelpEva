var toolbox_data_row_js_vars={
		
};


function toolbox_data_row_js_refreshRowList(flowchart_id)
{
	var divid='toolbox_data_js_tab_data'+flowchart_id;
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' cellspacing='0' ><thead><tr><th scope=col><input type='checkbox' id='toolbox_data_row_js_multipleRowsNeedToCopyCheckboxName_head_id_"+flowchart_id+"' onclick='toolbox_data_row_js_checkUncheckAll(\""+flowchart_id+"\")' />选择</th><th scope=col>顺序</th><th scope=col>修改</th><th scope=col>调序</th><th scope=col>ID</th><th scope=col>子集数</th><th data-sort-ignore='true' scope=col>响应</th><th data-sort-ignore='true' scope=col>反馈</th><th data-sort-ignore='true' scope=col>时长</th><th scope=col>状态</th><th data-sort-ignore='true' scope=col>复制</th><th data-sort-ignore='true' scope=col>删除</th></tr></thead>");
	if(data_row_list==null||data_row_list.length==0)
	{
		newcontent+="<tr>";
		newcontent+=("<td colspan='100%' style='text-align:center'>暂时没有数据</td>");
		newcontent+="</tr>";
	}else
	{
		$.each(data_row_list,function(i){
			newcontent+="<tr>";
			newcontent+=("<td><input type='checkbox' name='toolbox_data_row_js_multipleRowsNeedToCopyCheckboxName"+flowchart_id+"' value='"+ data_row_list[i].id +"' /></td>");
			newcontent+=("<td>"+ (i+1) +"</td>");
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_row_js_editRow(\""+flowchart_id+"\","+ data_row_list[i].id +") width=22px height=22px border=0 src='imgs/edit.png' ></img></a></td>";
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_row_js_changeRowOrder(\""+flowchart_id+"\","+ data_row_list[i].id +") width=22px height=22px border=0 src='imgs/update_icon2.png' ></img></a></td>";
			//newcontent+=("<td>"+ (data_row_list[i].id+'').substring(9,13) +"</td>");
			newcontent+=("<td>"+ data_row_list[i].id +"</td>");
			newcontent+=("<td>"+ data_row_list[i].data_column_list.length +"</td>");
			newcontent+=("<td>"+ (data_row_list[i].responseFlag==1?'有':'无') +"</td>");
			newcontent+=("<td>"+ (data_row_list[i].feedbackFlag==1?'有':'无') +"</td>");
			newcontent+=("<td>"+ data_row_list[i].aliveTime +"</td>");
			newcontent+="<td><a class='opes2_tooltip' href='javascript:;' title='已完成本条数据' href='javascript:;'><img width=24px height=24px border=0 src='imgs/accepted_48.png' ></img></a></td>";
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_row_js_copyRow(\""+flowchart_id+"\","+ data_row_list[i].id  +") width=24px height=24px border=0 src='imgs/copy_1.jpg' ></img></a></td>";
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_row_js_deleteRow(\""+flowchart_id+"\","+ data_row_list[i].id  +") width=24px height=24px border=0 src='imgs/cancel_48.png' ></img></a></td>";
			
			newcontent+="</tr>";
		});
	}
	
	newcontent+="</tbody></table>";
	
	$('#'+divid).html(newcontent);
	$('.OPES_TABLE_ID').footable();
	//$(".aImgButton").button();
	//initialize_tooltips();
}
function toolbox_data_row_js_changeRowOrder(flowchart_id,data_row_id)
{
	var temargs={};
	temargs.flowchart_id=flowchart_id;
	temargs.data_row_id=data_row_id;
	load_js_then_exec_func_util('js/framework/toolbox_data_row_change_order.js','toolbox_data_row_change_order_js_openChangeRowOrderDialog',temargs);
}
function toolbox_data_row_js_editRow(flowchart_id,data_row_id)
{
	var temargs={};
	temargs.flowchart_id=flowchart_id;
	temargs.data_row_id=data_row_id;
	temargs.addOrEditFlag='EDIT';
	load_js_then_exec_func_util('js/framework/toolbox_data_column.js','toolbox_data_column_js_openColumnListDialog',temargs);
}
function toolbox_data_row_js_copyRow(flowchart_id,data_row_id)
{
	var temargs={};
	temargs.flowchart_id=flowchart_id;
	temargs.data_row_id=data_row_id;
	load_js_then_exec_func_util('js/framework/toolbox_data_row_copy.js','toolbox_data_row_copy_js_openCopyRowSettingDialog',temargs);
	
}
function toolbox_data_row_js_deleteRow(flowchart_id,data_row_id)
{
	toolbox_data_js_delete_data_row(flowchart_id,data_row_id);
	toolbox_data_row_js_refreshRowList(flowchart_id);
}
function toolbox_data_row_js_checkUncheckAll(flowchart_id)
{
	var headCheck=$('#toolbox_data_row_js_multipleRowsNeedToCopyCheckboxName_head_id_'+flowchart_id);
	if(headCheck.attr("checked"))
	{
		$("[name='toolbox_data_row_js_multipleRowsNeedToCopyCheckboxName"+flowchart_id+"']").attr("checked",'true');
	}else
	{
		$("[name='toolbox_data_row_js_multipleRowsNeedToCopyCheckboxName"+flowchart_id+"']").removeAttr("checked");
	}
	
	
}