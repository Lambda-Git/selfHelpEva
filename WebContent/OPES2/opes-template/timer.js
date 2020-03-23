

/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

function timer_js_show_progress_bar(proobj)
{
	var starttime = new Date();
	var int_starttime=starttime.getTime();
	var progressbarid='timer_js_progress_bar_'+int_starttime;
	var progresslabelid='timer_js_progress_label_'+int_starttime;
	$( "#"+progressbarid ).remove();
	
	var progress_div='<div id="'+progressbarid+'"><div id="'+progresslabelid+'">Loading...</div></div>';
	$( "body" ).append(progress_div);
	//$('body').css({'background-color':'#000'});
	//$('body').css({'color':'#FFF'});
	
	$( "#"+progressbarid).css({
		'width': '600px',
		'height': '30px'
	});
	$( "#"+progresslabelid).css({
		'position': 'absolute',
		'left': '50%',
		'top': '6px',
		'font-weight': 'bold',
		'font-size': '20px',
		'text-shadow': '1px 1px 0 #fff'
	});
	$('#'+progressbarid).position({
		my: 'center top',
		at: 'center top',
		collision: "none",
		of: $(document)
	});
	
	$( "#"+progressbarid).progressbar({
		value: 0
	});
	//for all the definitions, pls check toolbox_timer.js
	var duration=proobj.fundata.timelimit;//in ms
	var timeout_id=null;
	var bar_obj={};
	bar_obj.int_starttime=int_starttime;
	bar_obj.duration=duration;
	bar_obj.progressbarid=progressbarid;
	bar_obj.progresslabelid=progresslabelid;
	bar_obj.timeout_id=timeout_id;
	bar_obj.proobj=proobj;
	timer_js_update_progress_bar(bar_obj);
	
	//call next stage
	var callback=proobj.callbackargs.callback;
	exec_func_util(callback.func_name,callback.params,callback);
	
}

function timer_js_update_progress_bar(bar_obj)
{
	var starttime=bar_obj.int_starttime;
	var duration=bar_obj.duration;
	var progressbarid=bar_obj.progressbarid;
	var progresslabelid=bar_obj.progresslabelid;
	var timeout_id=bar_obj.timeout_id;
	var proobj=bar_obj.proobj;
	
	var now = new Date();
	var time=now.getTime();
	var elapset=(time-starttime);
	if(elapset<duration)
	{
		var showv=parseInt(elapset*100/duration);
		$("#"+progressbarid).progressbar( "option", "value", showv );
		$("#"+progresslabelid).text( $("#"+progressbarid).progressbar( "value" ) + "%" );
		if(timeout_id!=null)
		{
			clearTimeout(timeout_id);
		}
		var update_interval=300;
		timeout_id=window.setTimeout(timer_js_update_progress_bar,update_interval,bar_obj);
		//timeout_id= window.setTimeout("update_progress_bar("+starttime+","+duration+",\""+progressbarid+"\",\""+progresslabelid+"\","+timeout_id+")",update_interval); 

	}else
	{
		$("#"+progressbarid).progressbar( "option", "value", 100 );
		$("#"+progresslabelid).text( "100%" );
		$("#"+progressbarid ).remove();
		//clearTimeout(progress_bar_vars.progress_bar_timeout_id);
		//alert('done');
		
		//call next stage
		//var callback=proobj.callbackargs.callback;
		//exec_func_util(callback.func_name,callback.params,callback);
		post_result();
	}
}


