var toolbox_data_row_delete_js_vars={
};


function toolbox_data_row_delete_js_deleteMultipleRow(passobj)
{
	var callback=function(passobj){
		var flowchart_id=passobj.flowchart_id;
		var data_row_id_list=passobj.data_row_id_list;
		for(var dr=0;dr<data_row_id_list.length;dr++)
		{
			var rowid=data_row_id_list[dr];
			toolbox_data_js_delete_data_row(flowchart_id,rowid);
		}
		
		toolbox_data_row_js_refreshRowList(flowchart_id);
	};
	open_delete_confirm_dialog(callback,passobj,"确定要删除选择的所有数据吗");
}


