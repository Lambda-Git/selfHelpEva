
/*
 * Usage Example: 
 * 
 * function size_admin_results_manage_js_openUploadFileDialogForOneResult(_id)
	{
		var success_func=function (rdata){
			var response=rdata.result;//NOTE: This line is very important!!!!!
			$('#web_ui_weidget_file_upload_js_single_upload_dialog').dialog('close');
			$('#size_admin_results_manage_js_matrixName').val(response.fileName);
			$('#size_admin_results_manage_js_matrixValue').val(response.fileLink);
		};
		var passJsonObj={upload_url:'/exam/CommonActionProxy?clazz=com.action.proxy.size.FileUploadProxy&service=uploadOneFile&args={resultsID:\''+_id+'\'}',success:success_func};
		load_js_then_exec_func_util('/exam/js/oneui/web_ui_weidget_file_upload.js','web_ui_weidget_file_upload_js_open_upload_dialog',passJsonObj);
	
	}

 */


function web_ui_weidget_file_upload_js_open_upload_dialog(passJsonObj)
{
	if($('#web_ui_weidget_file_upload_js_single_upload_dialog').length==0)
	{
		$('body').append('<div id="web_ui_weidget_file_upload_js_single_upload_dialog" title="File Upload">' +
							'<span style="    padding: 5px;border: 1px solid transparent;border-radius: 4px;color: #fff;  background-color: #5cb85c; border-color: #4cae4c;" class="btn btn-success fileinput-button">' +
						 		'<input id="fileupload" type="file" name="files[]" multiple>' +
						 		//'<span style="font-size: 14px;font-weight: 400; line-height: 1.42857143; text-align: center;white-space: nowrap;vertical-align: middle; -ms-touch-action: manipulation;touch-action: manipulation; cursor: pointer;">Select Files</span><input id="fileupload" type="file" name="files[]" multiple>' +
					        '</span>'+
						 '</div>');
		$('#web_ui_weidget_file_upload_js_single_upload_dialog').dialog({
			resizable: false,
			autoOpen: true,
			height: 230,
			width: 380,
			modal: true,
			buttons:[{
				text: "Close",
				click: function() {
					$(this).dialog("close");
				}
			}]
		});
	}else
	{
		$('#web_ui_weidget_file_upload_js_single_upload_dialog').dialog('open');
	}
	
	//if use below line, the new jqueryUI dialog would not on the first layer
	//if not use below line, the upload dialog would not on the first layer?
	//$('.ui-corner-all').css({'z-index': 9999999});   
	
	 $('#fileupload').fileupload({
        url:encodeURI(passJsonObj.upload_url),
    	dataType: 'json',
        done: function (e, data) {
        	//alert(JSON.stringify(e));
        	//$('body').append(JSON.stringify(data));
        	if(typeof passJsonObj.success != "undefined")
    		{
        		//alert(passJsonObj.success);
        		//passJsonObj.success(jQuery.parseJSON(data));
        		passJsonObj.success(data);
    		}
        }
        
    });
	 
}
