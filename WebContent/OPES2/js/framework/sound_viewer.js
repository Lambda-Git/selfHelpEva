var sound_viewer_js_vars={
		current_selected_file_name:null
};

function sound_viewer_js_open_file_view_dialog(inputIDToBeChanged)
{
	var dialogid='sound_viewer_js_open_file_view_dialog_id';
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='工具：文件查看、选择'>"+
					 "</div>");
	$('#'+dialogid).dialog({
		resizable: false,
		autoOpen: true,
		height: 500,
		width: 800,
		modal: true,
		buttons:[{
			text: "清空",
			click: function() {
					sound_viewer_js_removeAllSounds();
			}
		},{
			text: "上传",
			click: function() {
				/*
				var courseid=0;
				var success_func=function(){
					$('#ajax_upload_js_single_upload_dialog').dialog('close');
					sound_viewer_js_refreshFileList();
				};
				var args_array={upload_url:'/lattice/CommonActionProxy?clazz=com.lattice.action.proxy.opes.FileUploadProxy&service=uploadZipFile&args={taskid:'+initialize_ui_js_vars.taskid+'}',success:success_func};
				load_js_then_exec_func_util('js/framework/ajax_upload.js','ajax_upload_js_open_upload_dialog',args_array);
				*/
				var success_func=function(serverData){
					$('#web_ui_weidget_file_upload_js_single_upload_dialog').dialog('close');
					sound_viewer_js_refreshFileList();
				};
				var args_array={upload_url:'/lattice/CommonActionProxy?clazz=com.lattice.action.proxy.opes.FileUploadProxy&service=uploadZipFile&args={taskid:'+initialize_ui_js_vars.taskid+'}',success:success_func};
				load_js_then_exec_func_util('/lattice/OPES2/js/framework/web_ui_weidget_file_upload.js','web_ui_weidget_file_upload_js_open_upload_dialog',args_array);

			
			}
		},{
			text: "刷新",
			click: function() {
				sound_viewer_js_refreshFileList();
			}
		},{
			text: "确定",
			click: function() {
				sound_viewer_js_selectFileAndClose(inputIDToBeChanged);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$('#'+dialogid).dialog('open');
	sound_viewer_js_refreshFileList();
}
function sound_viewer_js_selectFileAndClose(inputIDToBeChanged)
{
	//alert(sound_viewer_js_vars.current_selected_img_name+"============"+inputIDToBeChanged);
	if(sound_viewer_js_vars.current_selected_file_name==null)
	{
		tips('请选择一个文件！');
	}else
	{
		var dialogid='sound_viewer_js_open_file_view_dialog_id';
		$('#'+inputIDToBeChanged).val(sound_viewer_js_vars.current_selected_file_name);
		$('#'+dialogid).dialog('close');
	}
}
function sound_viewer_js_removeAllSounds()
{
	var argsdata={taskid:initialize_ui_js_vars.taskid};
	var	data={clazz:'com.lattice.action.proxy.opes.FileViewerProxy',service:'removeAllSoundsForOneTask',args:JSON.stringify(argsdata)};
	var success=function(rdata){
		sound_viewer_js_showFileList([]);
	};
	invoke_proxy(data,success);
	sound_viewer_js_vars.current_selected_img_name=null;
}
function sound_viewer_js_refreshFileList()
{
	var argsdata={taskid:initialize_ui_js_vars.taskid};
	var	data={clazz:'com.lattice.action.proxy.opes.FileViewerProxy',service:'listAllSoundFilesForOneTask',args:JSON.stringify(argsdata)};
	var success=function(rdata){
		sound_viewer_js_showFileList(rdata);
	};
	invoke_proxy(data,success);
	sound_viewer_js_vars.current_selected_file_name=null;
}

function sound_viewer_js_showFileList(rdata)
{
	var dialogid='sound_viewer_js_open_file_view_dialog_id';
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' cellspacing='0' ><thead><tr><th data-sort-ignore='true' scope=col colspan=100%>PIC</th></tr></thead>");
	if(rdata.length==0)
	{
		newcontent+="<tr>";
		newcontent+=("<td colspan='100%' style='text-align:center'>暂时没有数据</td>");
		newcontent+="</tr>";
	}else
	{
		var additional=(rdata.length%4)>0?1:0;
		var rows=Math.floor(rdata.length/4)+additional;//19/4=5 20/4=5 21/4=6
		//alert(rows);
		var tempcount=0;
		for(var i=0;i<rows;i++)
		{
			newcontent+="<tr>";
			for(var j=0;j<4;j++)
			{
				if(tempcount<rdata.length)
				{
					newcontent+="<td><a href='javascript:;'><img id='sound_viewer_js_showFileList_id_"+tempcount+"' width=55px height=55px border=0 src='/lattice/OPES2/imgs/sound_icon2.jpg' ></img></a><br />"+ rdata[tempcount].fileName +"</td>";
					tempcount++;
				}else
				{
					newcontent+="<td>&nbsp;</td>";
				}
			}
			newcontent+="</tr>";
		}
		
	}
	newcontent+="</tbody></table>";
	$('#'+dialogid).html(newcontent);
	
	$.each(rdata,function(i){
		$("#sound_viewer_js_showFileList_id_"+i).click(function(){
			$('#'+dialogid+' img').css({'border': '0'});
			$('#sound_viewer_js_showFileList_id_'+i).css({'border': '5px solid blue'});
			sound_viewer_js_vars.current_selected_file_name=rdata[i].fileName;
		});
	});
	
	
	$('.OPES_TABLE_ID').footable();
	//$('.OPES_TABLE_ID td').css({'text-align': 'center'});
	//$('.OPES_TABLE_ID tr').css({'display': 'table-row'});
}

