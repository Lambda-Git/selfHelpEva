
function toolbox_import_job_js_importJob()
{
	var callback=function(){
		var success_func=function (rdata){
			window.location.reload();
		};
		var args_array={upload_url:'/lattice/CommonActionProxy?clazz=com.lattice.action.proxy.opes.backuprestore.OPESJobImportProxy&service=uploadOPESJobFile&args={taskid:'+initialize_ui_js_vars.taskid+'}',success:success_func};
		load_js_then_exec_func_util('/lattice/OPES2/js/framework/web_ui_weidget_file_upload.js','web_ui_weidget_file_upload_js_open_upload_dialog',args_array);

	};
	open_delete_confirm_dialog(callback,{},"导入会覆盖当前实验的所有设计数据，确定要覆盖导入吗");
	
}
function toolbox_import_job_js_importJob______________________________old_upload()
{
	var callback=function(){
		var success_func=function(serverData){
			
			window.location.reload();
		};
		var args_array={upload_url:'/lattice/CommonActionProxy?clazz=com.lattice.action.proxy.opes.backuprestore.OPESJobImportProxy&service=uploadOPESJobFile&args={taskid:'+initialize_ui_js_vars.taskid+'}',success:success_func};
		load_js_then_exec_func_util('js/framework/ajax_upload.js','ajax_upload_js_open_upload_dialog',args_array);

	};
	open_delete_confirm_dialog(callback,{},"导入会覆盖当前实验的所有设计数据，确定要覆盖导入吗");
	
}
