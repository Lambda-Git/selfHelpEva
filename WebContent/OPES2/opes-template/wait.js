

/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

function show_progress_bar(proobj)
{
	var starttime = new Date();
	var int_starttime=starttime.getTime();
	var progressbarid='progress_bar_'+int_starttime;
	var progresslabelid='progress_label_'+int_starttime;
	var progress_sleepmsgid='progress_sleepmsgid'+int_starttime;
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
		my: 'center center',
		at: 'center center',
		collision: "none",
		of: $(document)
	});
	
	$( "#"+progressbarid).progressbar({
		value: 0
	});
	//for all the definitions, pls check toolbox_wait.js
	var duration=proobj.fundata.sleeptime;//in ms
	var msgflag=proobj.fundata.msgflag;
	var msgcontent=proobj.fundata.msgcontent;
	proobj.fundata.progress_sleepmsgid=progress_sleepmsgid;
	var timeout_id=null;
	var bar_obj={};
	bar_obj.int_starttime=int_starttime;
	bar_obj.duration=duration;
	bar_obj.progressbarid=progressbarid;
	bar_obj.progresslabelid=progresslabelid;
	bar_obj.progress_sleepmsgid=progress_sleepmsgid;
	bar_obj.timeout_id=timeout_id;
	bar_obj.proobj=proobj;
	update_progress_bar(bar_obj);
	
	progress_bar_show_sleep_message(proobj);
}

function update_progress_bar(bar_obj)
{
	var starttime=bar_obj.int_starttime;
	var duration=bar_obj.duration;
	var progressbarid=bar_obj.progressbarid;
	var progresslabelid=bar_obj.progresslabelid;
	var progress_sleepmsgid=bar_obj.progress_sleepmsgid;
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
		var update_interval=60;
		
		timeout_id=window.setTimeout(update_progress_bar,update_interval,bar_obj);
		//timeout_id= window.setTimeout("update_progress_bar("+starttime+","+duration+",\""+progressbarid+"\",\""+progresslabelid+"\","+timeout_id+")",update_interval); 

	}else
	{
		$("#"+progressbarid).progressbar( "option", "value", 100 );
		$("#"+progresslabelid).text( "100%" );
		$("#"+progressbarid ).remove();
		$("#"+progress_sleepmsgid ).remove();
		//clearTimeout(progress_bar_vars.progress_bar_timeout_id);
		//alert('done');
		
		//call next stage
		var callback=proobj.callbackargs.callback;
		exec_func_util(callback.func_name,callback.params,callback);
	}
}
function progress_bar_show_sleep_message(proobj)
{
	var progress_sleepmsgid=proobj.fundata.progress_sleepmsgid;
	var msgflag=proobj.fundata.msgflag;
	var msgcontent=proobj.fundata.msgcontent;
	
	$( "#"+progress_sleepmsgid ).remove();

	var progress_sleepmsg_div='<div id="'+progress_sleepmsgid+'">'+msgcontent+'</div>';
	$( "body" ).append(progress_sleepmsg_div);

	$( "#"+progress_sleepmsgid).css({
		'width': '600px',
		'height': '30px',
		'font-weight': 'bold',
		'font-size': '20px',
		'text-align':'center'
	});
	
	$('#'+progress_sleepmsgid).position({
		my: 'center center',
		at: 'center center-50',
		collision: "none",
		of: $(document)
	});
}

