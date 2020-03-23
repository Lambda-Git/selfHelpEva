

/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

function data_surveyform_js_showSurveyForm_(fundata,callbackargs)
{
	$('#opes_cotainer_div').html('');
	var proobj={};
	proobj.fundata=fundata;
	proobj.callbackargs=callbackargs;
	data_surveyform_js_showSurveyForm_showAllRowsInOnePage_(proobj);
}

function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_(proobj)
{
	var data_row_list=proobj.fundata.data_row_list;
	for(var r=0;r<data_row_list.length;r++)
	{
		var current_row=data_row_list[r];
		var data_column_list=current_row.data_column_list;
		for(var i=0;i<data_column_list.length;i++)
		{
			var column=data_column_list[i];
			var passobj={};
			passobj.proobj=proobj;
			passobj.current_row=current_row;
			passobj.column=column;
			if(column.stimulateType==STIMULATE_TYPE_PLAINTEXT)
			{
				data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_text_(passobj);
				
			}else if(column.stimulateType==STIMULATE_TYPE_NULL)
			{
				alert('TODO: for '+column.stimulateType+'  of data_surveyform_js.');
			}else if(column.stimulateType==STIMULATE_TYPE_INPUT)
			{
				data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_input_(passobj);
				
			}else if(column.stimulateType==STIMULATE_TYPE_BUTTON)
			{
				data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_button_(passobj);
				
			}else if(column.stimulateType==STIMULATE_TYPE_IMAGE)
			{
				data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_image_(passobj);
				
			}else if(column.stimulateType==STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY)
			{
				alert('TODO: for '+column.stimulateType+'  of data_surveyform_js.');
			}else if(column.stimulateType==STIMULATE_TYPE_RADIOBUTTON)
			{
				data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_radiobutton_(passobj);
				
			}else if(column.stimulateType==STIMULATE_TYPE_CHECKBOX)
			{
				data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_checkbox_(passobj);
				
			}else if(column.stimulateType==STIMULATE_TYPE_TEXTAREA)
			{
				data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_textarea_(passobj);
				
			}else if(column.stimulateType==STIMULATE_TYPE_POST_CUSTOM_CODE)
			{
				alert('TODO: for '+column.stimulateType+'  of data_surveyform_js.');
			}else if(column.stimulateType==STIMULATE_TYPE_PRE_CUSTOM_CODE)
			{
				alert('TODO: for '+column.stimulateType+'  of data_surveyform_js.');
			}else if(column.stimulateType==STIMULATE_TYPE_SOUND)
			{
				alert('TODO: for '+column.stimulateType+'  of data_surveyform_js.');
			}else if(column.stimulateType==STIMULATE_TYPE_MOUSE_TYPE)
			{
				alert('TODO: for '+column.stimulateType+'  of data_surveyform_js.');
			}else
			{
				alert('TODO: for '+column.stimulateType+'  of data_surveyform_js.');
			}
		}//end column list loop
		
	}//end row list loop
}
function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_input_(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	
	var user_result_id='USER_RESULT_ID_'+current_row.id+'_'+column.id;
	$('#opes_cotainer_div').append('<input id="'+user_result_id+'" value="" />');
	$('#'+user_result_id).css({'position':'absolute'});
	$('#'+user_result_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
}
function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_text_(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	var column_span_id='USER_RESULT_ID_'+current_row.id+'_'+column.id;
	$('#opes_cotainer_div').append('<span id="'+column_span_id+'"></span>');
	$('#'+column_span_id).html(column.text);
	$('#'+column_span_id).css({'font-size':column.fontsize+'px','color':'#'+column.fontcolor,'position':'absolute'});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
}

function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_textarea_(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	var user_result_id='USER_RESULT_ID_'+current_row.id+'_'+column.id;
	
	$('#opes_cotainer_div').append('<textarea id="'+user_result_id+'" value="" ></textarea>');
	$('#'+user_result_id).css({'width':column.width+'px','height':column.height+'px','position':'absolute'});
	$('#'+user_result_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
}

function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_image_(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	var column_span_id='USER_RESULT_ID_'+current_row.id+'_'+column.id;
	$('#opes_cotainer_div').append('<img id="'+column_span_id+'" src="'+column.src+'" />');
	$('#'+column_span_id).css({'width':column.width,'height':column.height,'position':'absolute'});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
}

function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_checkbox_(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	
	var column_span_id='COLUMN_SPAN_ID_'+current_row.id+'_'+column.id;
	var user_result_id='USER_RESULT_ID_'+current_row.id+'_'+column.id;
	
	var radiobtn='<span id="'+column_span_id+'">';
	for(var i=0;i<column.options.length;i++)
	{
		var opt=column.options[i];
		radiobtn+='<input type="checkbox" name="'+user_result_id+'" value="'+opt.name+'"></input>'+opt.value+'&nbsp;&nbsp;';
	}
	radiobtn+='</span>';
	$('#opes_cotainer_div').append(radiobtn);
	$('#'+column_span_id).css({'font-size':column.fontsize+'px','color':'#'+column.fontcolor,'position':'absolute'});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
}
function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_radiobutton_(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	
	var column_span_id='COLUMN_SPAN_ID_'+current_row.id+'_'+column.id;
	var user_result_id='USER_RESULT_ID_'+current_row.id+'_'+column.id;
	
	var radiobtn='<span id="'+column_span_id+'">';
	for(var i=0;i<column.options.length;i++)
	{
		var opt=column.options[i];
		radiobtn+='<input type="radio" name="'+user_result_id+'" value="'+opt.name+'"  ></input>'+opt.value+'&nbsp;&nbsp;';
	}
	radiobtn+='</span>';
	$('#opes_cotainer_div').append(radiobtn);
	column_radiobutton_onclick(passobj);
	$('#'+column_span_id).css({'font-size':column.fontsize+'px','color':'#'+column.fontcolor,'position':'absolute'});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
}

function data_surveyform_js_showSurveyForm_showAllRowsInOnePage_show_column_button_(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	var column_span_id='COLUMN_SPAN_ID_'+current_row.id+'_'+column.id;
	$('#opes_cotainer_div').append('<input type=button id="'+column_span_id+'" value="'+column.text+'" />');
	$('#'+column_span_id).css({'font-size':column.fontsize+'px','position':'absolute'});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	$('#'+column_span_id).bind({ 
		click: function()
		{ 
			data_surveyform_js_showSurveyForm_collect_result_(passobj);
		}
	});
}

//One problem here is: if there are 2 inputs in 1 row, it will only save the last one as the userResult for this row.
function data_surveyform_js_showSurveyForm_collect_result_(passobj)
{
	var proobj=passobj.proobj;
	var data_row_list=proobj.fundata.data_row_list;
	for(var r=0;r<data_row_list.length;r++)
	{
		var current_row=data_row_list[r];
		var data_column_list=current_row.data_column_list;
		for(var i=0;i<data_column_list.length;i++)
		{
			var column=data_column_list[i];
			var passobj={};
			passobj.proobj=proobj;
			passobj.current_row=current_row;
			passobj.column=column;
			var user_result_id='USER_RESULT_ID_'+current_row.id+'_'+column.id;
			if(column.stimulateType==STIMULATE_TYPE_INPUT||column.stimulateType==STIMULATE_TYPE_TEXTAREA)
			{
				var result=$('#'+user_result_id).val();
				current_row.userResult=result;
				if( current_row.userResult == undefined || current_row.userResult=='undefined'|| current_row.userResult=='')
				{
					alert('请认真填写所有结果！');
					return;
				}
				
			}else if(column.stimulateType==STIMULATE_TYPE_RADIOBUTTON)
			{
				var result= $("input[name='"+user_result_id+"'][type='radio']:checked").val();
				current_row.userResult=result;
				if( current_row.userResult == undefined || current_row.userResult=='undefined'|| current_row.userResult=='')
				{
					alert('请认真填写所有结果！');
					return;
				}
				
			}else if(column.stimulateType==STIMULATE_TYPE_CHECKBOX)
			{
				var result= '';
			    $("input[name='"+user_result_id+"'][type='checkbox']:checked").each(function() {
			    	result=result+$(this).val();
			    });
			    current_row.userResult=result;
			    if( current_row.userResult == undefined || current_row.userResult=='undefined'|| current_row.userResult=='')
				{
			    	alert('请认真填写所有结果！');
					return;
				}
			    
			}
		}
	}
	
	//$('#opes_cotainer_div').html(JSON.stringify(passobj));
	//return;
	var callback=proobj.callbackargs.callback;
	exec_func_util(callback.func_name,callback.params,callback);
	
}



