var audio_video_viewer_js_vars={
		current_selected_img_name:null
};

//TODO, need to add and test
function audio_video_viewer_js_open_img_view_dialog(inputIDToBeChanged)
{
	var dialogid='audio_video_viewer_js_open_img_view_dialog_id';
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
					audio_video_viewer_js_removeAllImages();
			}
		},{
			text: "上传",
			click: function() {
				var courseid=0;
				var success_func=function(){
					$('#ajax_upload_js_single_upload_dialog').dialog('close');
					audio_video_viewer_js_refreshImageList();
				};
				var args_array={upload_url:'/lattice/CommonActionProxy?clazz=com.lattice.action.proxy.opes.FileUploadProxy&service=uploadZipFile&args={taskid:'+initialize_ui_js_vars.taskid+'}',success:success_func};
				load_js_then_exec_func_util('js/framework/ajax_upload.js','ajax_upload_js_open_upload_dialog',args_array);
			}
		},{
			text: "刷新",
			click: function() {
				audio_video_viewer_js_refreshImageList();
			}
		},{
			text: "确定",
			click: function() {
				audio_video_viewer_js_selectImgAndClose(inputIDToBeChanged);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$('#'+dialogid).dialog('open');
	audio_video_viewer_js_refreshImageList(inputIDToBeChanged);
}
function audio_video_viewer_js_selectImgAndClose(inputIDToBeChanged)
{
	if(audio_video_viewer_js_vars.current_selected_img_name==null)
	{
		tips('请选择一个文件！');
	}else
	{
		var dialogid='audio_video_viewer_js_open_img_view_dialog_id';
		$('#'+inputIDToBeChanged).val(audio_video_viewer_js_vars.current_selected_img_name);
		$('#'+dialogid).dialog('close');
	}
}
function audio_video_viewer_js_removeAllImages()
{
	var argsdata={taskid:initialize_ui_js_vars.taskid};
	var	data={clazz:'com.lattice.action.proxy.opes.FileViewerProxy',service:'removeAllImagesForOneTask',args:JSON.stringify(argsdata)};
	var success=function(rdata){
		audio_video_viewer_js_showImageList([]);
	};
	invoke_proxy(data,success);
	audio_video_viewer_js_vars.current_selected_img_name=null;
}
function audio_video_viewer_js_refreshImageList()
{
	var argsdata={taskid:initialize_ui_js_vars.taskid};
	var	data={clazz:'com.lattice.action.proxy.opes.FileViewerProxy',service:'listAllImgFilesForOneTask',args:JSON.stringify(argsdata)};
	var success=function(rdata){
		audio_video_viewer_js_showImageList(rdata);
	};
	invoke_proxy(data,success);
	audio_video_viewer_js_vars.current_selected_img_name=null;
}

function audio_video_viewer_js_showImageList(rdata)
{
	var dialogid='audio_video_viewer_js_open_img_view_dialog_id';
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
		var tempcount=0;
		for(var i=0;i<rows;i++)
		{
			newcontent+="<tr>";
			for(var j=0;j<4;j++)
			{
				if(tempcount<rdata.length)
				{
					newcontent+="<td><a href='javascript:;'><img id='audio_video_viewer_js_showImageList_imgid_"+tempcount+"' width=55px height=55px border=0 src='/lattice"+rdata[tempcount].filePath+rdata[tempcount].fileName+"' ></img></a><br />"+ rdata[tempcount].fileName +"</td>";
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
		$("#audio_video_viewer_js_showImageList_imgid_"+i).click(function(){
			$('#'+dialogid+' img').css({'border': '0'});
			$('#audio_video_viewer_js_showImageList_imgid_'+i).css({'border': '5px solid blue'});
			audio_video_viewer_js_vars.current_selected_img_name=rdata[i].fileName;
		});
	});
	
	$('.OPES_TABLE_ID').footable();
	//$('.OPES_TABLE_ID td').css({'text-align': 'center'});
	//$('.OPES_TABLE_ID tr').css({'display': 'table-row'});
}

