function prepare_datad_params(datad)
{
	var data_row_list=[];//first generate all data, with repeated, with by sequential or random, with weight, each data in it is a serial list.
	for(var i=1;i<=2;i++)
	{
		var data_row={};
		data_row.id=i;
		comment='';
		data_row.showTimer=false;
		data_row.hasBeenShownOnScreen=false;//use this virtual property (will not been saved to database) to filter the rows not shown on screen (e.g. skipped by custom code) 
		data_row.aliveType=ROW_ALIVE_TYPE_ALIVETIME_RESPONSE_FIRST_COME_FIRST_SERVED;//ROW_ALIVE_TYPE_ALIVETIME_RESPONSE_FIRST_COME_FIRST_SERVED ROW_ALIVE_TYPE_MUST_WAIT_FOR_ALIVE_TIME_REACHED
		data_row.aliveTime=50000;//WAIT_FOREVER_TIME
		
		data_row.responseFlag=1;
		data_row.responseType=RESPONSE_TYPE_RADIOBUTTON;//RESPONSE_TYPE_CHECKBOX RESPONSE_TYPE_TEXTAREA RESPONSE_TYPE_INPUT RESPONSE_TYPE_RADIOBUTTON RESPONSE_TYPE_SINGLEKEY
		data_row.data_column_list=[];
		data_row.correctResult='answer_'+i;
		data_row.userResult=null;
		data_row.comment=null;
		data_row.responseStartTime=null;
		data_row.responseEndTime=null;
		data_row.responseDuration=null;
		data_row.eventOnset=null;
		data_row.logResultFlag=1;
		data_row.rowType=0;
		data_row.trialid=0;
		
		
		data_row.feedbackFlag=1;
		data_row.feedback={};
		data_row.feedback.aliveTime=2000;
		data_row.feedback.cleanupAllColumnsWhenShowFeedback=true;
		data_row.feedback.showCorrectResult=true;
		data_row.feedback.showUserResult=true;
		data_row.feedback.showMsg=true;
		data_row.feedback.showImage=true;
		data_row.feedback.msgImage={};
		data_row.feedback.msgImage.fontsize='30';
		data_row.feedback.msgImage.fontcolor='0FF';
		data_row.feedback.msgImage.imgForWrongResultSrc='/lattice/images/logoicon.png';
		data_row.feedback.msgImage.imgForCorrectResultSrc='/lattice/images/logoicon.png';
		data_row.feedback.msgImage.width=30;
		data_row.feedback.msgImage.height=30;
		data_row.feedback.msgImage.position={};
		data_row.feedback.msgImage.position.my='center bottom';
		data_row.feedback.msgImage.position.at='center bottom';
		data_row.feedback.msgImage.msgForWrongResult='WRONG!WRONG!WRONG!';
		data_row.feedback.msgImage.msgForCorrectResult='CORRECT!CORRECT!CORRECT!';
		

		var d={};
		d.id=i*1000+1344564;
		d.aliveTime=3000;
		d.delayTime=0;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_NULL;
		//data_row.data_column_list.push(d);
		
		var d={};
		d.id=i*1000+1;
		d.aliveTime=100;
		d.delayTime=0;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_PLAINTEXT;
		d.text='a+b=c';
		d.fontsize=i*80;
		d.fontcolor='0FF';
		d.fontfamily='sans-serif';
		d.position={};
		d.position.my='center center';
		d.position.at='center center';
		//data_row.data_column_list.push(d);
		
		var d={};
		d.id=i*102300+1;
		d.aliveTime=3000; 
		d.delayTime=0;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_MOUSE_TYPE;
		d.mousetype='hand';
		d.mouse_type_image='';
		//data_row.data_column_list.push(d);
		
		var d={};
		d.id=i*102300+23;
		d.aliveTime=3000; 
		d.delayTime=4000;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_MOUSE_TYPE;
		d.mousetype='custom_mouse_type';
		d.mouse_type_image='/lattice/images/empty.cur';
		//data_row.data_column_list.push(d);
		
		var d={};
		d.id=i*1030+149;
		d.stimulateType=STIMULATE_TYPE_POST_CUSTOM_CODE;
		d.funName='_23143242341_';
		d.code='var tempa="aaaa_aaa"; alert(tempa);proobj.fundata.current_row_index++;';
		//data_row.data_column_list.push(d);

		var d={};
		d.id=i*12630+149;
		d.stimulateType=STIMULATE_TYPE_PRE_CUSTOM_CODE;
		d.funName='_555_';
		d.code='var tempa="aaaa_aaa"; alert(tempa);';
		//data_row.data_column_list.push(d);
		
		
		d={};
		d.id=i*1000+2;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=2000;
		d.startRecordResponseStartTime=true;
		d.stimulateType=STIMULATE_TYPE_INPUT;
		d.inputType='INPUT_TYPE_NUMBER';//INPUT_TYPE_NUMBER,INPUT_TYPE_TEXT,INPUT_TYPE_COMMENTS
		d.position={};
		d.position.my='left center';
		d.position.at='left center';
		//data_row.data_column_list.push(d);
		
		d={};
		d.id=i*1000+2232231;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=2000;
		d.startRecordResponseStartTime=true;
		d.stimulateType=STIMULATE_TYPE_DATE;
		d.position={};
		d.position.my='center center';
		d.position.at='center center';
		//data_row.data_column_list.push(d);

		d={};
		d.id=i*1000+3;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=2000;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_BUTTON;
		d.text='OKAY';
		d.fontsize='20';
		d.position={};
		d.position.my='right center';
		d.position.at='right center';
		//data_row.data_column_list.push(d);

		d={};
		d.id=i*1000+4;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=2000;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_IMAGE;
		d.src='/lattice/OPES2/imgs/clock_48.png'; 
		d.width=36;
		d.height=36;
		d.position={};
		d.position.my='center center';
		d.position.at='center-50 center-50';
		d.enableOnclickEvent=true;
		d.useGlobalDefinedFunctionForOnclick=false;
		d.onclickFunName='_img_onclick_fun_';
		d.onclickFunCode='var tempa="aaaa_aaa"; alert(tempa);';
		data_row.data_column_list.push(d);
		
		d={};
		d.id=i*100230+4;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=2000;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_IMAGE;
		d.src='/lattice/OPES2/imgs/clock_48.png'; 
		d.width=36;
		d.height=36;
		d.position={};
		d.position.my='center center';
		d.position.at='center+50 center+50';
		d.enableOnclickEvent=false;
		d.useGlobalDefinedFunctionForOnclick=false;
		d.onclickFunName='_img_onclick_fun_';
		d.onclickFunCode='var tempa="aaaa_aaa"; alert(tempa);';
		data_row.data_column_list.push(d);
		
		d={};
		d.id=i*103230230+4;
		d.aliveTime=20000;//WAIT_FOREVER_TIME
		d.delayTime=1000;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_SOUND;
		d.src='/lattice/test/jplayer/air.mp3';//21911102160024.mp3
		d.autoStart=true;
		d.hide=false;
		d.title='title title title';
		d.loops=1;
		d.position={};
		d.position.my='center center';
		d.position.at='center center';
		//data_row.data_column_list.push(d);
		
		d={};
		d.id=i*1000+989;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=1000;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_RADIOBUTTON;
		d.gotoNextOnClick=false;
		d.options=[{name:'A',value:'value for A',score:3},{name:'B',value:'value for B',score:4},{name:'F',value:'value for F',score:7}];
		d.fontsize='20';
		d.fontcolor='0FF';
		d.position={};
		d.position.my='left center';
		d.position.at='left center';
		//data_row.data_column_list.push(d);
		
		d={};
		d.id=i*1000+982139;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=300;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_CHECKBOX;
		d.options=[{name:'A',value:'value for A',score:3},{name:'B',value:'value for B',score:2},{name:'F',value:'value for F',score:5}];
		d.fontsize='20';
		d.fontcolor='0FF';
		d.position={};
		d.position.my='center center';
		d.position.at='center center';
		//data_row.data_column_list.push(d);
		
		d={};
		d.id=i*1000+98439;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=3000;
		d.startRecordResponseStartTime=false;
		d.stimulateType=STIMULATE_TYPE_TEXTAREA;
		d.width='500';
		d.height='200';
		d.position={};
		d.position.my='bottom center';
		d.position.at='bottom center';
		//data_row.data_column_list.push(d);
		
		d={};
		d.id=i*1000+10321;
		d.aliveTime=WAIT_FOREVER_TIME;
		d.delayTime=2000;
		d.startRecordResponseStartTime=true;
		d.stimulateType=STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY;
		d.userDefinedKeys=['p','q','a'];
		//data_row.data_column_list.push(d);
		
		data_row_list.push(data_row);
	}
	datad.params.data_row_list=data_row_list;
	datad.params.randomFlag=1;
	datad.params.current_row_index=-1;//only for index flag, not property of data
	return datad;
}

function _555_(proobj)
{
	//below code will be replaced by column.code string
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	
	alert('_pre_____'+proobj.fundata.current_row_index);
}
function _23143242341_(proobj)
{
	//below code will be replaced by column.code string
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	
	alert('_post____'+proobj.fundata.current_row_index);
}
function _img_onclick_fun_(source)
{
	//below code will be replaced by column.onclickFunCode string
	//alert(source.id+'_____'+source.src);
	var width=$("#"+source.id).css('borderWidth');
	//alert(width);
	if(width=='0px')
	{
		$("#"+source.id).css({"border":"5px solid blue"});
	}else
	{
		$("#"+source.id).css({"border":"0px solid blue"});
	}
	
}
/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

/*
运行步骤：

goto next snapshot conditions:
0. the first snapshot
1. time is up for all the columns in the row，this is set in the window.setTimeout(), invoke automatically
2. user key input
3. user button click

*/

/*
cancel keyboard event conditions:
1. snapshot alive time reaches
2. user type keyboard
3. row alive time reaches
*/

function show_next_snapshot(proobj)
{
	if(proobj.fundata.showtype=='TEST_TYPE_SURVEY_FORM')
	{
		data_surveyform_js_showSurveyForm_(proobj.fundata,proobj.callbackargs);
		return;
	}
	$('#opes_cotainer_div').html('');
	proobj.fundata.current_row_index++;
	
	//var data_row_list=proobj.fundata.data_row_list;
	var randomFlag=proobj.fundata.randomFlag;
	var callback=proobj.callbackargs.callback;
	if (proobj.fundata.data_row_list.length==0)//no rows, call next stage
	{
		exec_func_util(callback.func_name,callback.params,callback);
		return;
	}
	if(proobj.fundata.current_row_index==0)//is the first row
	{
		//console.log(proobj.fundata.current_row_index+JSON.stringify(proobj));
		if(randomFlag==1)
		{
			shuffle_all_items(proobj.fundata.data_row_list);
		}else if(randomFlag==2)//sort by trialid
		{
			sort_by_trialid_all_items(proobj.fundata.data_row_list);
		}else if(randomFlag==3)//shuffle by trialid
		{
			proobj.fundata.data_row_list=shuffle_by_trialid_all_items(proobj.fundata.data_row_list);
		}else if(randomFlag==4)//Trialid组块顺序不变组块内刺激随机
		{
			//$('body').append(JSON.stringify({before:proobj.fundata.data_row_list}));
			//console.log('['+JSON.stringify(proobj.fundata.data_row_list));
			//alert(proobj.fundata.data_row_list[0].id+'---'+proobj.fundata.data_row_list[0].id);
			proobj.fundata.data_row_list=shuffle_all_items_in_one_same_trialid(proobj.fundata.data_row_list);
			//alert(proobj.fundata.data_row_list[0].id+'---'+proobj.fundata.data_row_list[0].id);
			//console.log(','+JSON.stringify(proobj.fundata.data_row_list+']'));
			//$('body').append(JSON.stringify({after:proobj.fundata.data_row_list}));
			//alert(JSON.stringify({data_row_list_3:data_row_list}));
		}else if(randomFlag==5)//Trialid组块顺序随机组块内刺激随机
		{
			proobj.fundata.data_row_list=shuffle_all_items_block_random_itemsofblock_random(proobj.fundata.data_row_list);
		}
	}else //not the first row, save previous results
	{
		//save_previous_result(proobj);
		cleanup_all_column_timeout_ids_for_previous_row(proobj);
	}
	
	if(proobj.fundata.current_row_index==proobj.fundata.data_row_list.length)//all are processed
	{
		exec_func_util(callback.func_name,callback.params,callback);
		return;
	}else  //process next snapshot
	{
		execute_pre_custom_code_ifany(proobj);
		
		var current_row=proobj.fundata.data_row_list[proobj.fundata.current_row_index];
		current_row.responseStartTime=getTimestamp();
		if(current_row.showTimer==true)
		{
			var barobj={width:'600px',height:'30px',duration:current_row.aliveTime,update_interval:60};
			show_progress_bar_util(barobj);
		}
		//var rowTimeoutID=window.setTimeout(show_next_snapshot,current_row.aliveTime,proobj);
		var passobj={};
		passobj.proobj=proobj;
		var rowTimeoutID=window.setTimeout(show_row_feedback,current_row.aliveTime,passobj);
		current_row.rowTimeoutID=rowTimeoutID;
		current_row.hasBeenShownOnScreen=true;
		
		show_all_columns_in_one_row(proobj);
	}
}
function cleanup_all_column_timeout_ids_for_previous_row(proobj)
{
	//todo: suggest to add clear timeout for current_row.rowTimeoutID
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index-1];
	var data_column_list=current_row.data_column_list;
	for(var i=0;i<data_column_list.length;i++)
	{
		var column=data_column_list[i];
		if(column.timeoutIDForDelayTime!=null)
		{
			clearTimeout(column.timeoutIDForDelayTime);
		}
		if(column.timeoutIDForAliveTime!=null)
		{
			clearTimeout(column.timeoutIDForAliveTime);
		}
	}
}
function reset_all_user_defined_keys()
{
	Mousetrap.reset();
}

function process_user_response_single_key(proobj,userTypedKey)
{
	//record the user response end time once the user type the key
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	current_row.responseEndTime=getTimestamp();
	
		
	userTypedKey=userTypedKey.toLowerCase();
	$('#USER_RESULT_ID').remove();
	$('body').append('<input id="USER_RESULT_ID" type=hidden value="'+userTypedKey+'" />');
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	if(current_row.aliveType==ROW_ALIVE_TYPE_ALIVETIME_RESPONSE_FIRST_COME_FIRST_SERVED)
	{
		if(current_row.rowTimeoutID!=null)
		{
			clearTimeout(current_row.rowTimeoutID);//as goto next snapshot via user click, so clear the goto next snapshot timeOut
		}
		//show_next_snapshot(proobj);
		var passobj={};
		passobj.proobj=proobj;
		show_row_feedback(passobj);
	}
}
function process_user_response_sound_switch()
{
	if(temp_Timer_End_Signal_sound_switch==1)
	{
		var proobj=temp_proobj_for_sound_switch;
		var data_row_list=proobj.fundata.data_row_list;
		var current_row=data_row_list[proobj.fundata.current_row_index];
		if(current_row.aliveType==ROW_ALIVE_TYPE_ALIVETIME_RESPONSE_FIRST_COME_FIRST_SERVED)
		{
			if(current_row.rowTimeoutID!=null)
			{
				clearTimeout(current_row.rowTimeoutID);//as goto next snapshot via user click, so clear the goto next snapshot timeOut
			}
			//show_next_snapshot(proobj);
			var passobj={};
			passobj.proobj=proobj;
			temp_Timer_End_Signal_sound_switch=0;
			show_row_feedback(passobj);
			
		}
	}
	
}
function show_all_columns_in_one_row(proobj)
{
	
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	var data_column_list=current_row.data_column_list;
	
	//Note, if put here, one long sound will run 3 or more following simulate, see issue from ShenChaoRan
	//We will control this by userself, not by opes framework
	/*
	if(current_row.responseType==RESPONSE_TYPE_SOUND_SWITCH)
	{
		temp_Timer_End_Signal_sound_switch=1;//Turn on the sound switch. Notes: this is one global variable, which is only used for STIMULATE_TYPE_SOUND_SWITCH
	}else
	{
		temp_Timer_End_Signal_sound_switch=0;//Turn off the sound switch
	}
	*/
	
	for(var i=0;i<data_column_list.length;i++)
	{
		var column=data_column_list[i];
		var passobj={};
		passobj.proobj=proobj;
		passobj.current_row=current_row;
		passobj.column=column;
		var timeoutIDForDelayTime=null;
		var timeoutIDForAliveTime=null;
		if(column.stimulateType==STIMULATE_TYPE_PLAINTEXT)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_text,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_NULL)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_null,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_INPUT)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_input,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_DATE)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_date,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_BUTTON)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_button,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_IMAGE)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_image,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY)
		{
			timeoutIDForDelayTime=window.setTimeout(bind_keys_and_accept_single_key,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_SOUND_SWITCH)
		{
			timeoutIDForDelayTime=window.setTimeout(bind_sound_switch_recorder_and_accept_user_sound,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_TURNON_SOUND_SWITCH)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_turnon_sound_switch,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_TURNOFF_SOUND_SWITCH)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_turnoff_sound_switch,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_RADIOBUTTON)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_radiobutton,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_CHECKBOX)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_checkbox,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_TEXTAREA)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_textarea,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_POST_CUSTOM_CODE)
		{
			
		}else if(column.stimulateType==STIMULATE_TYPE_PRE_CUSTOM_CODE)
		{
			
		}else if(column.stimulateType==STIMULATE_TYPE_SOUND)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_sound,column.delayTime,passobj);
			
		}else if(column.stimulateType==STIMULATE_TYPE_MOUSE_TYPE)
		{
			timeoutIDForDelayTime=window.setTimeout(show_column_mousetype,column.delayTime,passobj);
			
		}else
		{
			alert('TODO: for '+column.stimulateType);
		}
		column.timeoutIDForDelayTime=timeoutIDForDelayTime;
		column.timeoutIDForAliveTime=timeoutIDForAliveTime;
	}
}
function show_column_null(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	
	var timeoutIDForAliveTime=window.setTimeout(hide_column_null,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}

function execute_pre_custom_code_ifany(proobj)
{
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	var data_column_list=current_row.data_column_list;
	for(var i=0;i<data_column_list.length;i++)
	{
		var column=data_column_list[i];
		if(column.stimulateType==STIMULATE_TYPE_PRE_CUSTOM_CODE)
		{
			var temp_func_name=function(args){};
				temp_func_name = eval(column.funName);
				temp_func_name(proobj);
			
		}
	}
}
function execute_post_custom_code_ifany(proobj)
{
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	var data_column_list=current_row.data_column_list;
	for(var i=0;i<data_column_list.length;i++)
	{
		var column=data_column_list[i];
		if(column.stimulateType==STIMULATE_TYPE_POST_CUSTOM_CODE)
		{
			var temp_func_name=function(args){};
				temp_func_name = eval(column.funName);
				temp_func_name(proobj);
			
		}
	}
}
function show_column_turnon_sound_switch()
{
	temp_Timer_End_Signal_sound_switch=1;//Turn on the sound switch. Notes: this is one global variable, which is only used for STIMULATE_TYPE_SOUND_SWITCH
}
function show_column_turnoff_sound_switch()
{
	temp_Timer_End_Signal_sound_switch=0;//Turn off the sound switch. Notes: this is one global variable, which is only used for STIMULATE_TYPE_SOUND_SWITCH
}
function show_row_feedback(passobj)
{
	save_previous_result(passobj.proobj);
	
	var proobj=passobj.proobj;
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	if(current_row.rowTimeoutID!=null)
	{
		clearTimeout(current_row.rowTimeoutID);//as goto next snapshot via user click, so clear the goto next snapshot timeOut
	}
	if(current_row.responseType==RESPONSE_TYPE_SINGLEKEY)
	{
		reset_all_user_defined_keys();
	}
	if(current_row.feedbackFlag==1)
	{
		if(current_row.feedback.cleanupAllColumnsWhenShowFeedback)
		{
			$('#opes_cotainer_div').html('');
		}
		var feedbackContent='<div style="width:99%;border:0px solid;text-align:center;" id="feedback_id">';
			feedbackContent+='	<div><span id="correct_result_span_id"></span><span id="user_result_span_id"></span></div>';
			feedbackContent+='	<div><span id="feedback_img_span_id"></span><span id="feedback_msg_span_id"></span></div>';
			feedbackContent+='</div>';
			
		$('#opes_cotainer_div').append(feedbackContent);
		if(current_row.feedback.showCorrectResult)
		{
			$('#correct_result_span_id').html('正确答案：'+current_row.correctResult+'&nbsp;&nbsp;&nbsp;');
		}
		if(current_row.feedback.showUserResult)
		{
			$('#user_result_span_id').html('你的答案：'+(typeof current_row.userResult== 'undefined'?'':current_row.userResult));
		}
		if(current_row.feedback.showMsg)
		{
			if(current_row.userResult==current_row.correctResult)
			{
				$('#feedback_msg_span_id').html(current_row.feedback.msgImage.msgForCorrectResult);
				if(current_row.feedback.showImage)
				{
					var img='<img id="feedback_img_id" src="'+current_row.feedback.msgImage.imgForCorrectResultSrc+'" />';
					$('#feedback_img_span_id').html(img);
					$('#feedback_img_id').css({'width':current_row.feedback.msgImage.width,'height':current_row.feedback.msgImage.height});
				}
			}else
			{
				$('#feedback_msg_span_id').html(current_row.feedback.msgImage.msgForWrongResult);
				if(current_row.feedback.showImage)
				{
					var img='<img id="feedback_img_id" src="'+current_row.feedback.msgImage.imgForWrongResultSrc+'" />';
					$('#feedback_img_span_id').html(img);
					$('#feedback_img_id').css({'width':current_row.feedback.msgImage.width,'height':current_row.feedback.msgImage.height});
				}
			}
		}
		
		$('#feedback_id').css({'font-size':current_row.feedback.msgImage.fontsize+'px','color':'#'+current_row.feedback.msgImage.fontcolor,'position':'absolute'});
		$('#feedback_id').position({
			my: current_row.feedback.msgImage.position.my,
			at: current_row.feedback.msgImage.position.at,
			collision: "none",
			of: $(document)
		});
		
		execute_post_custom_code_ifany(passobj.proobj);
		var timeoutIDForRowFeedbackAliveTime=window.setTimeout(show_next_snapshot,current_row.feedback.aliveTime,proobj);
		current_row.timeoutIDForRowFeedbackAliveTime=timeoutIDForRowFeedbackAliveTime;
	}else
	{
		execute_post_custom_code_ifany(passobj.proobj);
		show_next_snapshot(proobj);
	}
	
}
function show_column_text(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	var column_span_id='column_id_'+column.id;
	$('#opes_cotainer_div').append('<div id="'+column_span_id+'"></div>');
	$('#'+column_span_id).html(column.text);
	$('#'+column_span_id).css({'font-size':column.fontsize+'px','font-family':'\''+column.fontfamily+'\',sans-serif','color':'#'+column.fontcolor,'position':'absolute','text-align':'center'});
	$('#'+column_span_id).css({'width':column.textDivWidth,'height':column.textDivHeight});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	//$('#'+column_span_id).css({'width':column.textDivWidth,'height':column.textDivHeight,'position':'absolute'});
	
	var timeoutIDForAliveTime=window.setTimeout(hide_column_text,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function show_column_mousetype(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	
	if(column.mousetype=='custom_mouse_type')
	{
		$('body').css({'cursor':'url('+column.mouse_type_image+'), auto'});
	}else
	{
		$('body').css({'cursor':column.mousetype});
	}
	
	var timeoutIDForAliveTime=window.setTimeout(hide_column_mousetype,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function bind_keys_and_accept_single_key(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	var userDefinedKeys=column.userDefinedKeys;
	Mousetrap.bind(userDefinedKeys, function(e) {process_user_response_single_key(proobj,String.fromCharCode(e.keyCode||e.which));});
	
	var timeoutIDForAliveTime=window.setTimeout(reset_all_user_defined_keys,column.aliveTime);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function bind_sound_switch_recorder_and_accept_user_sound(passobj)
{
	temp_proobj_for_sound_switch=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	//TODO
	$('body').append('<div id="flashContainer"></div>');
	//swfobject.registerObject("flashContainer", "6.0.0", "../../../../OPES2/js/soundRecordSwitch/expressInstall.swf");
	swfobject.registerObject("flashContainer", "6.0.0", "/lattice/OPES2/js/soundRecordSwitch/expressInstall.swf");
	
	//20 40 is good..
	//var microLevel=20;//声音阀值
	var microLevel=10;//声音阀值
	var scilenceTime=1;//声音停止后时间
	var functionName="process_user_response_sound_switch";//函数名，可以自己重新定义函数，将自己定义的函数名放在这里
	//var gain=40;//麦克风增益
	var gain=80;//麦克风增益
	var soundRate=22;//声音频率,单位khz
	//出现声音的时候调度，before，声音结束的时候调度，after
	var before=0;
	var after=1;
	var dispatchWay=before;
	//下面的代码一般无需修改，修改参数的话可以改上面
	var params=
	{
		wmode:"transparent"
	};
	//swfobject.embedSWF("../../../../OPES2/js/soundRecordSwitch/WebCamMicStatus.swf", "flashContainer", "220", "140", "6.0.0", "../../../../OPES2/js/soundRecordSwitch/expressInstall.swf", {microLevel:microLevel,scilenceTime:scilenceTime,functionName:functionName,gain:gain,soundRate:soundRate,dispatchWay:dispatchWay},params);
	swfobject.embedSWF("/lattice/OPES2/js/soundRecordSwitch/WebCamMicStatus.swf", "flashContainer", "220", "140", "6.0.0", "/lattice/OPES2/js/soundRecordSwitch/expressInstall.swf", {microLevel:microLevel,scilenceTime:scilenceTime,functionName:functionName,gain:gain,soundRate:soundRate,dispatchWay:dispatchWay},params);
	
	//alert('bind_sound_switch_recorder_and_accept_user_sound')
}
function hide_column_null(column)
{
	
}
function hide_column_text(column)
{
	$('#column_id_'+column.id).remove();
}
function hide_column_radiobutton(column)
{
	$('#column_id_'+column.id).remove();
}
function hide_column_checkbox(column)
{
	$('#column_id_'+column.id).remove();
}
function hide_column_textarea(column)
{
	$('#USER_RESULT_ID').remove();
}
function hide_column_mousetype(column)
{
	$('body').css({'cursor':'auto'});
}
function hide_column_sound(column)
{
	//column.column_sound_player_id=column_sound_player_id;
	//column.column_sound_container_id=column_sound_container_id;
	$('#'+column.column_sound_player_id).jPlayer('stop');
	$('#column_div_id_'+column.id).remove();
}
function show_column_checkbox(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	var radiobtn='<span id="column_id_'+column.id+'">';
	for(var i=0;i<column.options.length;i++)
	{
		var opt=column.options[i];
		radiobtn+='<input type="checkbox" name="USER_RESULT_ID" value="'+opt.name+'"></input>'+opt.value+'&nbsp;&nbsp;';
	}
	radiobtn+='</span>';
	$('#opes_cotainer_div').append(radiobtn);
	$('#column_id_'+column.id).css({'font-size':column.fontsize+'px','color':'#'+column.fontcolor,'position':'absolute','z-index':99999});
	
	$('#column_id_'+column.id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	var timeoutIDForAliveTime=window.setTimeout(hide_column_checkbox,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function show_column_radiobutton(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	
	var radiobtn='<span id="column_id_'+column.id+'">';
	for(var i=0;i<column.options.length;i++)
	{
		var opt=column.options[i];
		radiobtn+='<input type="radio" id="column_radiobutton_option_id_'+column.id+'_'+i+'" name="USER_RESULT_ID" value="'+opt.value+'" style="zoom:190%;" ></input>'+opt.name+'&nbsp;&nbsp;';
	}
	radiobtn+='</span>';
	$('#opes_cotainer_div').append(radiobtn);
	column_radiobutton_onclick(passobj);
	$('#column_id_'+column.id).css({'font-size':column.fontsize+'px','color':'#'+column.fontcolor,'position':'absolute','z-index':99999});
	
	$('#column_id_'+column.id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	var timeoutIDForAliveTime=window.setTimeout(hide_column_radiobutton,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function column_radiobutton_onclick(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	
	for(var i=0;i<column.options.length;i++)
	{
		var opt=column.options[i];
		var column_option_id="column_radiobutton_option_id_"+column.id+"_"+i;
		$('#'+column_option_id).bind({
			click: function()
			{ 
				if(column.gotoNextOnClick)
				{
					if(current_row.rowTimeoutID!=null)
					{
						clearTimeout(current_row.rowTimeoutID);//as goto next snapshot via user click, so clear the goto next snapshot timeOut
					}
					show_row_feedback(passobj);
				}
			}
		});
	}
}
function show_column_date(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	
	$('#opes_cotainer_div').append('<span id="column_date_span_id"><input id="USER_RESULT_ID" value="" /><img src="/lattice/OPES2/imgs/date.png"></img></span>');
	$("#USER_RESULT_ID").datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat: 'yy-mm-dd',
	    yearRange: "1960:2022"
	    
	});
	$('#column_date_span_id').css({'position':'absolute'});
	
	$('#column_date_span_id').position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	var timeoutIDForAliveTime=window.setTimeout(hide_column_text,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function show_column_input(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	
	$('#opes_cotainer_div').append('<input id="USER_RESULT_ID" value="" />');
	$('#USER_RESULT_ID').css({'position':'absolute'});
	show_column_input_addTextChangeEvent('USER_RESULT_ID',column);
	
	$('#USER_RESULT_ID').position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	var timeoutIDForAliveTime=window.setTimeout(hide_column_text,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
	
	$('#USER_RESULT_ID').focus();
	
}
function show_column_input_addTextChangeEvent(input_id,column)
{
	$("#"+input_id).keyup(function()
	{
		var value=$("#"+input_id).val();
		if(column.inputType=='INPUT_TYPE_NUMBER')
		{
			$("#"+input_id).val(value.replace(/[^\d]/g,''));
			
		}else if(column.inputType=='INPUT_TYPE_TEXT')
		{
			
		}else if(column.inputType=='INPUT_TYPE_COMMENTS')
		{
			
		}else
		{
			alert('Invalid column.inputType '+column.inputType);
		}
	});
}
function show_column_button(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	var column_span_id='column_id_'+column.id;
	$('#opes_cotainer_div').append('<input type=button id="'+column_span_id+'" value="'+column.text+'" />');
	$('#'+column_span_id).css({'font-size':column.fontsize+'px','position':'absolute','z-index':99999});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	$('#'+column_span_id).bind({ 
		click: function()
		{ 
			if(current_row.rowTimeoutID!=null)
			{
				clearTimeout(current_row.rowTimeoutID);//as goto next snapshot via user click, so clear the goto next snapshot timeOut
			}
			show_row_feedback(passobj);
		}
	});
	var timeoutIDForAliveTime=window.setTimeout(hide_column_text,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}

function show_column_textarea(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	$('#opes_cotainer_div').append('<textarea id="USER_RESULT_ID" value="" ></textarea>');
	$('#USER_RESULT_ID').css({'width':column.width+'px','height':column.height+'px','position':'absolute'});
	$('#USER_RESULT_ID').position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	var timeoutIDForAliveTime=window.setTimeout(hide_column_textarea,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function show_column_image(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	var column_span_id='column_id_'+column.id;
	var onclickFunc='onclick=javascript:;';
	if(column.enableOnclickEvent)
	{
		__TEMP_GLOBAL_VARIABLE_FOR_IMAGE_ON_CLICK_passobj=passobj;
		if(column.useGlobalDefinedFunctionForOnclick)
		{
			alert('TODO for useGlobalDefinedFunctionForOnclick');
		}else
		{
			onclickFunc='onclick='+column.onclickFunName+'(this)';
		}
		
	}
	$('#opes_cotainer_div').append('<img id="'+column_span_id+'" '+onclickFunc+' src="'+column.src+'" />');
	$('#'+column_span_id).css({'width':column.width,'height':column.height,'position':'absolute'});
	$('#'+column_span_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	var timeoutIDForAliveTime=window.setTimeout(hide_column_text,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
}
function show_column_sound(passobj)
{
	var proobj=passobj.proobj;
	var current_row=passobj.current_row;
	var column=passobj.column;
	if(column.startRecordResponseStartTime)
	{
		current_row.responseStartTime=getTimestamp();
	}
	var column_sound_player_id='column_sound_player_id_'+column.id;
	var column_sound_container_id='column_sound_container_id_'+column.id;
	column.column_sound_player_id=column_sound_player_id;
	column.column_sound_container_id=column_sound_container_id;
	$('#opes_cotainer_div').append(show_column_sound_genPlayerContent(column));
	
	$('#'+column_sound_container_id).position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});
	$('#'+column_sound_player_id).css({'position':'absolute'});
	$('#'+column_sound_container_id).css({'position':'absolute'});
	
	/*
	$('#opes_cotainer_div').append('<img id="testaaa" src="/lattice/images/home/project.png"></img>');
	$('#testaaa').position({
		my: column.position.my,
		at: column.position.at,
		collision: "none",
		of: $(document)
	});*/
	
	if(column.autoStart)
	{
		
		$("#"+column_sound_player_id).jPlayer({
			ready: function (event) {
				$(this).jPlayer("setMedia", {
					title: column.title,
					mp3: column.src
				}).jPlayer("play"); // Attempt to auto play the media;
			},
			ended: function() { // The $.jPlayer.event.ended event
				   // $(this).jPlayer("play"); // Repeat the media
			},
			cssSelectorAncestor: "#"+column_sound_container_id,
			swfPath: "/lattice/OPES2/js/jplayer/jplayer",
			supplied: "m4a, oga,mp3",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: false,
			remainingDuration: true,
			toggleDuration: true
		});
	}else
	{
		$("#"+column_sound_player_id).jPlayer({
			ready: function (event) {
				$(this).jPlayer("setMedia", {
					title: column.title,
					mp3: column.src
				}); // Attempt to auto play the media;
			},
			ended: function() { // The $.jPlayer.event.ended event
				   // $(this).jPlayer("play"); // Repeat the media
			},
			cssSelectorAncestor: "#"+column_sound_container_id,
			swfPath: "/lattice/OPES2/js/jplayer/jplayer",
			supplied: "m4a, oga,mp3",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		});
	}
	if(column.hide)
	{
		$('#column_div_id_'+column.id).css({'display':'none'});
	}
	
	var timeoutIDForAliveTime=window.setTimeout(hide_column_sound,column.aliveTime,column);
	column.timeoutIDForAliveTime=timeoutIDForAliveTime;
	//alert(column.aliveTime+'    timeoutIDForAliveTime'+timeoutIDForAliveTime);
}

//The content please refer to 02.html under /lattice/test/jplayer/02.html
function show_column_sound_genPlayerContent(column)
{
	//alert('show_column_sound_genPlayerContent='+column.column_sound_player_id);
	var column_sound_player_id=column.column_sound_player_id;
	var column_sound_container_id=column.column_sound_container_id;
	var column_div_id='column_div_id_'+column.id;
	var content='';
	content+='<div id="'+column_div_id+'" >';
	content+='<div id="'+column_sound_player_id+'" class="jp-jplayer" ></div>';
	content+='<div id="'+column_sound_container_id+'" class="jp-audio" role="application" aria-label="media player" >';
	content+='	<div class="jp-type-single">';
	content+='		<div class="jp-gui jp-interface">';
	content+='			<div class="jp-controls">';
	content+='				<button class="jp-play" role="button" tabindex="0">play</button>';
	content+='				<button class="jp-stop" role="button" tabindex="0">stop</button>';
	content+='			</div>';
	content+='			<div class="jp-progress">';
	content+='				<div class="jp-seek-bar">';
	content+='					<div class="jp-play-bar"></div>';
	content+='				</div>';
	content+='			</div>';
	content+='			<div class="jp-volume-controls">';
	content+='				<button class="jp-mute" role="button" tabindex="0">mute</button>';
	content+='				<button class="jp-volume-max" role="button" tabindex="0">max volume</button>';
	content+='				<div class="jp-volume-bar">';
	content+='					<div class="jp-volume-bar-value"></div>';
	content+='				</div>';
	content+='			</div>';
	content+='			<div class="jp-time-holder">';
	content+='				<div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>';
	content+='			<div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>';
	content+='				<div class="jp-toggles">';
	content+='					<button class="jp-repeat" role="button" tabindex="0">repeat</button>';
	content+='				</div>';
	content+='			</div>';
	content+='		</div>';
	content+='		<div class="jp-details">';
	content+='			<div class="jp-title" aria-label="title">&nbsp;</div>';
	content+='		</div>';
	content+='	</div>';
	content+='</div>';
	content+='</div>';//end of column div
	return content;
}


function save_previous_result(proobj)
{
	//alert('save_previous_result');
	var data_row_list=proobj.fundata.data_row_list;
	var current_row=data_row_list[proobj.fundata.current_row_index];
	current_row.userResult=null;
	if(current_row.responseFlag==1)
	{
		//alert('current_row.responseFlag='+current_row.responseFlag+'   current_row.responseType='+current_row.responseType);
		if(current_row.responseEndTime==null)//the responseEndTime can be already set, e.g. when the user type the key
		{
			current_row.responseEndTime=getTimestamp();
		}
		current_row.responseDuration=current_row.responseEndTime-current_row.responseStartTime;
		//alert(current_row.responseDuration); 
		current_row.eventOnset=current_row.responseStartTime;
		var first_row=data_row_list[0];
		var first_row_onset=first_row.eventOnset		
		
		if (proobj.fundata.current_row_index>0){
			current_row.eventOnset=current_row.responseStartTime-first_row_onset;
		}  
		
		if(current_row.responseType==RESPONSE_TYPE_SINGLEKEY||current_row.responseType==RESPONSE_TYPE_INPUT||current_row.responseType==RESPONSE_TYPE_DATE||current_row.responseType==RESPONSE_TYPE_TEXTAREA||current_row.responseType==RESPONSE_TYPE_RICHTEXT)
		{
			var result=$('#USER_RESULT_ID').val();
			current_row.userResult=result;
			//current_row.userResult=memo_Temp;
			$('#USER_RESULT_ID').val('');
			
		}else if(current_row.responseType==RESPONSE_TYPE_RADIOBUTTON)
		{
			var result= $("input[name='USER_RESULT_ID'][type='radio']:checked").val();
			current_row.userResult=result;
		}else if(current_row.responseType==RESPONSE_TYPE_CHECKBOX)
		{
			var result= '';
		    $("input[name='USER_RESULT_ID'][type='checkbox']:checked").each(function() {
		    	result=result+$(this).val();
		    });
		    current_row.userResult=result;
		}else if(current_row.responseType==RESPONSE_TYPE_SOUND_SWITCH)
		{
			current_row.userResult='0';
			//alert('save_previous_result');
		}else
		{
			alert('TODO: for '+current_row.responseType);
		}
	}
	//$('#opes_cotainer_div').html('');
}



