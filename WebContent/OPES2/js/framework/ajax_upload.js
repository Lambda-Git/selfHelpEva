
/********************************* AJAX UPLOAD ***************************************/
/*
    Example:
    
    var courseid=t_course_dev_klg_js_vars.current_selected_courseid;
	var success_func=function(){
		tips('处理完成，如果刷新后没有发现新上传的试卷，请仔细检查每个题目的KID是否正确。');
	};
	
	var args_array={upload_url:'/exam/UploadItemHandler?action=upload_temp_item_for_a_testpaer&courseid='+courseid+'&tpid='+tpid,success:success_func};
	load_js_then_exec_func_util("../js/oneui/ajax_upload.js","ajax_upload_js_open_upload_dialog",args_array);
 
 */

/********************************* AJAX UPLOAD ***************************************/

function ajax_upload_js_open_upload_dialog(args_array)
{
	if($('#ajax_upload_js_single_upload_dialog').length==0)
	{
		$('body').append('<div id="ajax_upload_js_single_upload_dialog" title="文件上传">' +
						 '正在加载...'+
						 '</div>');
		$('#ajax_upload_js_single_upload_dialog').dialog({
			resizable: false,
			autoOpen: true,
			height: 230,
			width: 380,
			modal: true,
			buttons:[{
				text: "关闭窗口",
				click: function() {
					$(this).dialog("close");
				}
			}]
		});
	}else
	{
		$('#ajax_upload_js_single_upload_dialog').dialog('open');
	}
	
	load_js_then_exec_func_util('/lattice/OPES2/js/upload/swf/js/swfupload/swfupload_merge_two.js','ajax_upload_js_initial_upload',args_array);
	
}


function ajax_upload_js_initial_upload(args_array)
{
	var upload_url=args_array.upload_url;
	//var upload_url='/exam/UploadItemHandler?action=upload_temp_item_for_a_testpaer&useType=1&starttime='+starttime+'&endtime='+endtime+'&testpapertype='+testpapertype+'&tpscope='+tpscope+'&timelimit='+duration+'&courseid='+courseid+'&uid='+uid;
	$('#ajax_upload_js_single_upload_dialog').empty();
	var upload_control='<div id="t_course_dev_testpaper_js_swfupload-control"><input type="button" id="ajax_upload_js_upload_button" /></div>';
	$('#ajax_upload_js_single_upload_dialog').append(upload_control);
	
	$('#t_course_dev_testpaper_js_swfupload-control').swfupload({
		upload_url:encodeURI(upload_url),
		file_post_name: 'uploadfile',
		file_size_limit : "102400",
		file_types : "*.*;",
		file_types_description : "doc files",
		file_upload_limit : 15,
		flash_url : "/lattice/OPES2/js/upload/swf/js/swfupload/swfupload.swf",
		button_image_url : '/lattice/OPES2/js/upload/swf/js/swfupload/wdp_buttons_upload_114x29.png',
		button_width : 70,
		button_height : 25,
		button_placeholder : $('#ajax_upload_js_upload_button')[0],
		debug: false
	})
	.bind('fileQueued', function(event, file){
		var listitem='<li id="'+file.id+'" >'+
		'File: <em>'+file.name+'</em> ('+Math.round(file.size/1024)+' KB) <span class="progressvalue" ></span>'+
		'<div class="progressbar" ><div class="progress" ></div></div>'+
		'<p class="status" >Pending</p>'+
		'<span class="cancel" >&nbsp;</span>'+
		'</li>';
		$('#log').append(listitem);
		$('li#'+file.id+' .cancel').bind('click', function(){
			var swfu = $.swfupload.getInstance('#swfupload-control');
			swfu.cancelUpload(file.id);
			$('li#'+file.id).slideUp('fast');
		});
		// start the upload since it's queued
		$(this).swfupload('startUpload');
	})
	.bind('fileQueueError', function(event, file, errorCode, message){
		tips('文件 '+file.name+' 请不要超过1024K，谢谢');
	})
	.bind('fileDialogComplete', function(event, numFilesSelected, numFilesQueued){
	})
	.bind('uploadStart', function(event, file){
		show_loading_msg();
	})
	.bind('uploadProgress', function(event, file, bytesLoaded){
	})
	.bind('uploadSuccess', function(event, file, serverData){
		//alert(serverData);
		show_success_msg();
		if(typeof args_array.success != "undefined")
		{
			args_array.success(serverData);
		}
	})
	.bind('uploadComplete', function(event, file){
		$(this).swfupload('startUpload');
	})
}
