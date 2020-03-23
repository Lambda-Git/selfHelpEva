var toolbox_export_job_js_vars={
};

function toolbox_export_job_js_downloadJob()
{
	var taskid=initialize_ui_js_vars.taskid;
	toolbox_export_job_js_openDownloadJobDialog(taskid);

	var argsdata={taskid:taskid};
	var	data={clazz:'com.lattice.action.proxy.opes.backuprestore.OPESJobExportProxy',service:'generateDownloadJobFile',args:JSON.stringify(argsdata)};
	var success=function(rdata){
		var downloadLink='<a href="'+rdata.filePath+rdata.fileName+'">右击点击链接另存为：'+rdata.fileName+'</a>';
		$('#toolbox_export_job_js_openDownloadJobDialog_div').html(downloadLink);
	};
	invoke_proxy(data,success);
}


function toolbox_export_job_js_openDownloadJobDialog(taskid)
{
	var dialogid='toolbox_export_job_js_openDownloadJobDialog';
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：导入导出工具：导出：数据下载'>"+
			"<div id='toolbox_export_job_js_openDownloadJobDialog_div' >"+
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

