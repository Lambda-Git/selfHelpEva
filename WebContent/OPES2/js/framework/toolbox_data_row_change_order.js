var toolbox_data_row_change_order_js_vars={
};


function toolbox_data_row_change_order_js_openChangeRowOrderDialog(passobj)
{
	var flowchart_id=passobj.flowchart_id;
	var data_row_id=passobj.data_row_id;
	
	var dialogid='toolbox_data_row_change_order_js_openChangeRowOrderDialog'+flowchart_id+data_row_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：数据工具：数据行：调节顺序'>"+
			"<div id='toolbox_data_row_change_order_js_openChangeRowOrderDialog_div"+flowchart_id+data_row_id+"' >"+
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
				toolbox_data_row_change_order_js_setNewRowOrder(flowchart_id,data_row_id);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$('#'+dialogid).dialog('open');
	toolbox_data_row_change_order_js_refreshCurrentRowOrder(flowchart_id,data_row_id);
	
}
function toolbox_data_row_change_order_js_setNewRowOrder(flowchart_id,data_row_id)
{
	var newOrder=$('#toolbox_data_row_change_order_js_refreshCurrentRowOrder_newOrder_'+flowchart_id+data_row_id).val();
	var rowList=toolbox_data_js_get_data_row_list(flowchart_id);
	var rows=rowList.length;
	if(newOrder<0||newOrder>rows)
	{
		tips('请输入有效的顺序位置，必须大于等于0，小于等于'+rows+'!');
		return;
	}
	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	toolbox_data_js_delete_data_row(flowchart_id,data_row.id);
	rowList.splice(newOrder, 0, data_row);
	
	toolbox_data_row_js_refreshRowList(flowchart_id);
}
function toolbox_data_row_change_order_js_refreshCurrentRowOrder(flowchart_id,data_row_id)
{
	var newcontent = "";
	newcontent+=("<table class='OPES_TABLE_ID' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：数据工具：数据行：调节顺序</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>调整到某条数据之后：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_row_change_order_js_refreshCurrentRowOrder_newOrder_"+flowchart_id+data_row_id+"' style='width:200px;' value='10' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='如果要插入到第一条数据前面，请输入0，如果要插入到最后一条数据后面请输入总的数据个数即可。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_data_row_change_order_js_openChangeRowOrderDialog_div'+flowchart_id+data_row_id).html(newcontent);
	$('#toolbox_data_row_change_order_js_openChangeRowOrderDialog_div'+flowchart_id+data_row_id+' input').css({'height': '16px','width':'200px','padding':'6px 9px'});
	$('.OPES_TABLE_ID').footable();
	initialize_tooltips();
	$('#toolbox_data_row_change_order_js_openChangeRowOrderDialog_div'+flowchart_id+data_row_id+' td').css({'padding': '2px'});
	
	var rowOrder=toolbox_data_js_get_data_row_order(flowchart_id,data_row_id);
	$('#toolbox_data_row_change_order_js_refreshCurrentRowOrder_newOrder_'+flowchart_id+data_row_id).val(rowOrder);
	
}
