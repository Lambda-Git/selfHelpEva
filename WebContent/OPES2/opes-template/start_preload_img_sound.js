

/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

function start_preload_img_sound_js_doPreLoad_(fundata,callbackargs)
{
	var proobj={};
	proobj.fundata=fundata;
	proobj.callbackargs=callbackargs;
	var imgSrcList=start_preload_img_sound_js_getAllImageSrcList_(proobj);
	____tempImageObjetListForCacheOnlyWillNotBeUsed=start_preload_img_sound_js_loadImages_(imgSrcList,callbackargs);
}

function start_preload_img_sound_js_getAllImageSrcList_(proobj)
{
	var imgSrcList=[];
	
	var tempCallback=proobj.callbackargs.callback;
	while(tempCallback!=null)
	{
		if(tempCallback.func_name=='data_')
		{
			//alert(tempCallback.func_name);
			
			start_preload_img_sound_js_getImgSrcForEachDataStage(tempCallback.params,imgSrcList);
		}
		
		tempCallback=tempCallback.callback;
	}
	
	
	
	return imgSrcList;
}
function start_preload_img_sound_js_getImgSrcForEachDataStage(dataParams,imgSrcList)
{
	var data_row_list=dataParams.data_row_list;
	for(var r=0;r<data_row_list.length;r++)
	{
		var current_row=data_row_list[r];
		var data_column_list=current_row.data_column_list;
		for(var i=0;i<data_column_list.length;i++)
		{
			var column=data_column_list[i];
			if(column.stimulateType==STIMULATE_TYPE_IMAGE)
			{
				imgSrcList.push(column.src);
			}else if(column.stimulateType==STIMULATE_TYPE_SOUND)
			{
				//alert('TODO: for preloading STIMULATE_TYPE_SOUND in data_preload_img_sound.js');
			}else if(column.stimulateType==STIMULATE_TYPE_FLASH)
			{
				alert('TODO: for preloading STIMULATE_TYPE_FLASH in data_preload_img_sound.js');
			}else if(column.stimulateType==STIMULATE_TYPE_VIDEO)
			{
				alert('TODO: for preloading STIMULATE_TYPE_VIDEO in data_preload_img_sound.js');
			}
		}//end column list loop
		
	}//end row list loop
}
function start_preload_img_sound_js_loadImages___________NOTUSED(imgSrcList,callbackargs)
{
	var progress=0;
	var tempImageObjetList=[];
	for(var i=0;i<imgSrcList.length;i++)
	{
		tempImageObjetList[i]=new Image();
		tempImageObjetList[i].onload=function()
	    {
			progress++;
			var tempercent=Math.round(progress/imgSrcList.length*100);
			$('#opes_cotainer_div').append('正在预加载材料 （'+tempercent+'%）...');
			if(tempercent==100)
			{
				window.setTimeout(invoke_callback,30,callbackargs);
			}
		}
		tempImageObjetList[i].onerror=function()
	    {
			progress++;
			var tempercent=Math.round(progress/imgSrcList.length*100);
			$('#opes_cotainer_div').append('正在预加载材料 （'+tempercent+'%）...');
			if(tempercent==100)
			{
				window.setTimeout(invoke_callback,30,callbackargs);
			}
		}
		tempImageObjetList[i].src=imgSrcList[i];
	}
	return tempImageObjetList;
}

var GLOBAL_PRE_LOAD_COUNT=0;

function start_preload_img_sound_js_loadImages_(imgSrcList,callbackargs)
{
	var tempImageObjetList=[];
	var start=getTimestamp();
	var duration=1;//seconds
	var totalcount=imgSrcList.length;
	start_preload_img_sound_js_kickoff_interval_updater_(start, duration, totalcount, callbackargs);
	
	for(var i=0;i<imgSrcList.length;i++)
	{
		tempImageObjetList[i]=new Image();
		tempImageObjetList[i].onload=function()
	    {
			GLOBAL_PRE_LOAD_COUNT++;
			//$("body").append(this.src+' onload.');
		}
		tempImageObjetList[i].onerror=function()
	    {
			GLOBAL_PRE_LOAD_COUNT++;
			//$("body").append(this.src+' onerror.');
		}
		tempImageObjetList[i].src=imgSrcList[i];
	}
	return tempImageObjetList;
}
/****************************预加载进度条************************************/
/*
* 进度显示采用哪个值低用哪个的原则：
* 1. 如果加载进度是10%，默认10s的进度是20%，那么用10%
* 2. 如果加载进度是90%，默认10s的进度是50%，那么用50%
*/

function start_preload_img_sound_js_kickoff_interval_updater_(starttime, duration, totalcount, callbackargs)
{
	var passobj={};
	passobj.starttime=starttime;
	passobj.duration=duration;
	passobj.totalcount=totalcount;
	passobj.callbackargs=callbackargs;
	start_preload_img_sound_js_create_progress_bar_if_does_not_exist_();
	start_preload_img_sound_js_dowhile_check_(passobj);
	
}

function start_preload_img_sound_js_dowhile_check_(passobj)
{
	var temts=getTimestamp();
	var starttime=passobj.starttime;
	var totalcount=passobj.totalcount;
	var callbackargs=passobj.callbackargs;
	var realProgress=Math.round(GLOBAL_PRE_LOAD_COUNT*100/totalcount);
	var duration=passobj.duration;
	var progress=Math.round((temts-starttime)*100/(duration*1000));
	progress=progress>100?100:progress;
	if(progress>=realProgress)
	{
		progress=realProgress;
	}
	start_preload_img_sound_js_update_preload_progress_bar_(progress);
	if(progress<100)
	{
		window.setTimeout(start_preload_img_sound_js_dowhile_check_,1,passobj);
	}else
	{
		//alert('done');
		window.setTimeout(invoke_callback,20,callbackargs);
	}
	
}

function start_preload_img_sound_js_update_preload_progress_text_(progress)
{
	progress=progress>100?100:progress;
	
	var content='<span id="start_preload_img_sound_js_update_preload_progress_div_id" style="font-size:24px;font-weight:bold;color:blue;">Loading material... ('+progress+'%)</span>';
	$("#opes_cotainer_div").html(content);
	$('#start_preload_img_sound_js_update_preload_progress_div_id').position({
		my: 'center center',
		at: 'center center',
		of: $(document)
	});
	
	
}
function start_preload_img_sound_js_create_progress_bar_if_does_not_exist_()
{
	var progressbarid='start_preload_img_sound_js_update_preload_progress_bar_id';
	var progresslabelid='start_preload_img_sound_js_update_preload_progress_label_id';
	
	if($('#'+progressbarid).length==0)
	{
		var progress_div='<div id="'+progressbarid+'"><div id="'+progresslabelid+'">Loading...</div></div>';
		$( "#opes_cotainer_div" ).append(progress_div);
		$( "#"+progressbarid).css({
			'width': '600px',
			'height': '30px'
		});
		$( "#"+progresslabelid).css({
			'position': 'absolute',
			'left': '31%',
			'top': '4px',
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
	
	}
}
function start_preload_img_sound_js_update_preload_progress_bar_(progress)
{
	var progressbarid='start_preload_img_sound_js_update_preload_progress_bar_id';
	var progresslabelid='start_preload_img_sound_js_update_preload_progress_label_id';
	
	progress=progress>100?100:progress;
	$("#"+progressbarid).progressbar( "option", "value", progress );
	$("#"+progresslabelid).text("Loading material... ("+ $("#"+progressbarid).progressbar( "value" ) + "%)");
	
}


