var toolbox_data_row_excel_js_vars={
};

function toolbox_data_row_excel_js_downloadExcel(flowchart_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	if(data_row_list.length==0)
	{
		tips('请先准备好模板数据！');
	}else
	{
		toolbox_data_row_excel_js_openDownloadExcelDialog(flowchart_id);
		
		var argsdata={data_row_list:data_row_list,taskid:initialize_ui_js_vars.taskid};
		var	data={clazz:'com.lattice.action.proxy.opes.excel.DataRowListExcelDownloadProxy',service:'generateDownloadExcelFile',args:JSON.stringify(argsdata)};
		var success=function(rdata){
			var downloadLink='<a href="'+rdata.filePath+rdata.fileName+'" >点击这里下载：'+rdata.fileName+'</a>';
			$('#toolbox_data_row_excel_js_openDownloadExcelDialog_div'+flowchart_id).html(downloadLink);
		};
		invoke_proxy(data,success);
	}
}


function toolbox_data_row_excel_js_openDownloadExcelDialog(flowchart_id)
{
	var dialogid='toolbox_data_row_excel_js_openDownloadExcelDialog'+flowchart_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：数据工具：数据行：数据下载'>"+
			"<div id='toolbox_data_row_excel_js_openDownloadExcelDialog_div"+flowchart_id+"' >"+
				"正在生成下载链接...."+
			"</div>"+
	"</div>");
	$('#'+dialogid).dialog({
		resizable: false,
		autoOpen: true,
		height: 280,
		width: 500,
		modal: false,
		buttons:[{
			text: "关闭",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$('#'+dialogid).dialog('open');
	
}


function toolbox_data_row_excel_js_uploadExcel(flowchart_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	if(data_row_list.length==0)
	{
		tips('请先准备好模板数据！');
	}else
	{
		var success_func=function(serverData){
			$('#web_ui_weidget_file_upload_js_single_upload_dialog').dialog('close');
			toolbox_data_row_excel_js_refreshRowList(flowchart_id);
		};
		var args_array={upload_url:'/lattice/CommonActionProxy?clazz=com.lattice.action.proxy.opes.excel.DataRowListExcelUploadProxy&service=uploadDataRowListExcelFile&args={taskid:'+initialize_ui_js_vars.taskid+'}',success:success_func};
		load_js_then_exec_func_util('/lattice/OPES2/js/framework/web_ui_weidget_file_upload.js','web_ui_weidget_file_upload_js_open_upload_dialog',args_array);
	}
	
}
function toolbox_data_row_excel_js_uploadExcel_____________________________old_upload(flowchart_id)
{
	var data_row_list=toolbox_data_js_get_data_row_list(flowchart_id);
	if(data_row_list.length==0)
	{
		tips('请先准备好模板数据！');
	}else
	{
		var success_func=function(serverData){
			toolbox_data_row_excel_js_refreshRowList(flowchart_id);
		};
		var args_array={upload_url:'/lattice/CommonActionProxy?clazz=com.lattice.action.proxy.opes.excel.DataRowListExcelUploadProxy&service=uploadDataRowListExcelFile&args={taskid:'+initialize_ui_js_vars.taskid+'}',success:success_func};
		load_js_then_exec_func_util('js/framework/ajax_upload.js','ajax_upload_js_open_upload_dialog',args_array);
	
	}
	
}
function toolbox_data_row_excel_js_refreshRowList(flowchart_id)
{
	var argsdata={taskid:initialize_ui_js_vars.taskid};
	var	data={clazz:'com.lattice.action.proxy.opes.excel.DataRowListExcelUploadProxy',service:'getUploadedExcelContent',args:JSON.stringify(argsdata)};
	var success=function(rdata){
		var rowList=rdata.rowList;
		
		for(var r=0;r<rowList.length;r++)
		{
			var row=rowList[r];
			var rowid=row.rowid;
			var correctResult=row.correctResult;
			var rowType=row.rowType;
			var trialid=row.trialid;
			var columnList=row.columnList;
			var currentClientRow=toolbox_data_js_get_data_row(flowchart_id,rowid);
			currentClientRow.correctResult=correctResult;
			currentClientRow.rowType=rowType;
			currentClientRow.trialid=trialid;
			for(var c=0;c<columnList.length;c++)
			{
				var column=columnList[c];
				var colid=column.columnid;
				var simulateType=column.simulateType;
				var valueList=column.valueList;
				
				var currentClientColumn=toolbox_data_js_get_data_column(flowchart_id,rowid,colid);
				if(currentClientColumn==null)
				{
					tips('查不到rowid='+rowid+'  colid='+colid+'  的数据，请不要修改EXCEL中的ID信息！');
				}else
				{
					if(simulateType=='STIMULATE_TYPE_PLAINTEXT')
					{
						currentClientColumn.text=valueList[0];
					}else if(simulateType=='STIMULATE_TYPE_IMAGE')
					{
						currentClientColumn.src=valueList[0];
						currentClientColumn.aliveTime=valueList[1];
						currentClientColumn.delayTime=valueList[2];
						currentClientColumn.width=valueList[3];
						currentClientColumn.height=valueList[4];
						currentClientColumn.position.my=valueList[5];
						currentClientColumn.position.at=valueList[6];
					}else if(simulateType=='STIMULATE_TYPE_SOUND')
					{
						currentClientColumn.src=valueList[0];
					}else if(simulateType=='STIMULATE_TYPE_VIDEO')
					{
						currentClientColumn.src=valueList[0];
					}else if(simulateType=='STIMULATE_TYPE_RADIOBUTTON')
					{
						currentClientColumn.options=valueList[0];
					}else if(simulateType=='STIMULATE_TYPE_CHECKBOX')
					{
						currentClientColumn.options=valueList[0];
					}else if(simulateType=='STIMULATE_TYPE_PRE_CUSTOM_CODE')
					{
						currentClientColumn.code=valueList[0];
					}else if(simulateType=='STIMULATE_TYPE_POST_CUSTOM_CODE')
					{
						currentClientColumn.code=valueList[0];
					}else if(simulateType=='STIMULATE_TYPE_MOUSE_TYPE')
					{
						currentClientColumn.mousetype=valueList[0];
					}else
					{
						tips('simulateType='+simulateType+'  暂不支持!');
					}
				}
				
			}
		}
		$('#ajax_upload_js_single_upload_dialog').dialog('close');
		toolbox_data_row_js_refreshRowList(flowchart_id);
	};
	invoke_proxy(data,success);
	
}