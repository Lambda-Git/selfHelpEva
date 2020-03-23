
function prepare_datad_params(datad)
{
	var data_row_list=[];//first generate all data, with repeated, with by sequential or random, with weight, each data in it is a serial list.
	for(var i=1;i<=2;i++)
	{
		var data_row={};
		data_row.id=i;
		data_row.show_answer=true;
		data_row.show_answer_time=2000;
		data_row.hide_question_if_show_answer=true;
		data_row.onebyone=false;
		data_row.data_column_list=[];
		data_row.answer='answer_'+i;
		data_row.datatype='text';
		data_row.fontsize=i*10+'px';
		data_row.fontcolor='#FFF';
		data_row.position={};
		data_row.position.my='center center';
		data_row.position.at='center center';


		var d={};
		d.datatype='text';
		d.fontsize=i*10+'px';
		d.fontcolor='#FFF';
		d.position={};
		d.position.my='left center';
		d.position.at='left center';
		d.elapsedtime=2000;
		d.timeout=0;
		d.text=i+'+left=26';
		d.answer=i+'Q';
		d.weight=5;
		data_row.data_column_list.push(d);

		var d={};
		d.datatype='text';
		d.fontsize=i*10+'px';
		d.fontcolor='#FFF';
		d.position={};
		d.position.my='center center';
		d.position.at='center center';
		d.elapsedtime=2000;
		d.timeout=0;
		d.text=i+'+center=26';
		d.answer=i+'Q';
		d.weight=5;
		data_row.data_column_list.push(d);


		data_row_list.push(data_row);
	}
	datad.params.data_row_list=data_row_list;
	return datad;
}



/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

function reset_alldata_status(data_row_list)//used to mark which serial and which serial_row is processing
{
	for(var i=0;i<data_row_list.length;i++)
	{
		var oneserial=data_row_list[i];
		oneserial.processing=false;
		for(var j=0;j<oneserial.data_column_list.length;j++)
		{
			var oneserial_row=oneserial.data_column_list[j];
			oneserial_row.processing=false;
		}
	}
}
function get_to_be_processed_serial(data_row_list)
{
	//alert(data_row_list.length);
	for(var i=0;i<data_row_list.length;i++)
	{
		var oneserial=data_row_list[i];
		//alert(oneserial.processed);
		if(typeof oneserial.processed== 'undefined')//has NOT been processed
		{
			//alert(oneserial.processed);
			return oneserial;
		}
	}
	return null;
}
function get_been_processing_serial(data_row_list)
{
	for(var i=0;i<data_row_list.length;i++)
	{
		var oneserial=data_row_list[i];
		if(oneserial.processing==true)
		{
			return oneserial;
		}
	}
	return null;
}
function show_question(proobj)
{
	var data_row_list=proobj.fundata.data_row_list;
	$('body').html('');
	bind_key(proobj);
	reset_alldata_status(data_row_list);
	var oneserial=get_to_be_processed_serial(data_row_list);
	
	if(oneserial==null)
	{
		//alert('show_question()  all_are_processed');
		//alert(proobj.callbackargs.func_name+'  '+proobj.callbackargs.params);
		var callback=proobj.callbackargs.callback;
		exec_func_util(callback.func_name,callback.params,callback);
	}else
	{
		oneserial.processed=true;//mark this serial has been processed
		oneserial.processing=true;//mark this serial is processing
		if(oneserial.onebyone)
		{
			alert('TODO 1');
		}else //show all serial_row at the same time
		{
			for(var j=0;j<oneserial.data_column_list.length;j++)
			{
				var oneserial_row=oneserial.data_column_list[j];
				$('body').append('<span id="question_id_'+j+'"></span>');
				$('#question_id_'+j).html(oneserial_row.text);
				$('#question_id_'+j).css({'font-size':oneserial_row.fontsize,'color':oneserial_row.fontcolor});
				$('#question_id_'+j).position({
					my: oneserial_row.position.my,
					at: oneserial_row.position.at,
					collision: "none",
					of: $(document)
				});
			}
		}
	}
}
function show_answer(proobj,userIputKey)
{
	var data_row_list=proobj.fundata.data_row_list;
	unbind_key();
	var oneserial=get_been_processing_serial(data_row_list);
	oneserial.user_answer=userIputKey;
	if(oneserial==null)
	{
		//Will never go here
		alert('show_answer()  all_are_processed');
	}else
	{
		oneserial.processing=false;
		if(oneserial.show_answer)
		{
			if(oneserial.hide_question_if_show_answer)
			{
				$('body').html('');
				$('body').append('<span id="answer_id"></span>');
				$('#answer_id').html(oneserial.answer);
				$('#answer_id').css({'font-size':oneserial.fontsize,'color':oneserial.fontcolor});
				$('#answer_id').position({
					my: oneserial.position.my,
					at: oneserial.position.at,
					collision: "none",
					of: $(document)
				});
			}else
			{
				alert('TODO2');
			}
		}
		
		setTimeout(show_question,oneserial.show_answer_time,proobj);
	}
	
}


