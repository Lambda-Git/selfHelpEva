
//This function used to prepare the test data
//总体执行流程：前一个stage执行完了，调用它的callback,一直调用到end_ stage, end_ stage不再调用它的callbac，直接提交结果。所以不需要while循环。
function prepare_()
{
	var endd={};
	endd.func_name='end_';
	endd.params={"show_final_result":"1","final_feedback":"THANKS."};
	endd.callback=null;
	
	
	var textd2={};
	textd2.func_name='text_';
	textd2.params=prepare_textd_params();
	textd2.callback=endd;
	
	var datad={};
	datad.func_name='data_';
	datad.params={};
	datad.callback=endd;
	prepare_datad_params(datad);
	
	var datad2={};
	datad2.func_name='data_';
	datad2.params={};
	datad2.callback=datad;
	prepare_datad_params(datad2);
	
	var coded={};
	coded.func_name='code_';
	coded.params={};
	coded.callback=endd;
	prepare_coded_params(coded);
	
	var waitd={};
	waitd.func_name='wait_';
	waitd.params={"duration":5000,"show_elapsed_time":true};//TODO, add position, width, text etc.
	waitd.callback=coded;
	
	var textd1={};
	textd1.func_name='text_';
	textd1.params=prepare_textd_params();
	textd1.callback=coded;
	
	var startd={};
	startd.func_name='start_';
	startd.params={"doPreload":false,"mousetype":"url(../../images/empty.cur1), auto","pagebackground":"#fff","fontcolor":"#000","fontsize":"12px","pagetitle":"多维心理网络版心理实验系统"};
	startd.callback=datad2;
	
	return startd;
}

/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

function start_(fundata,callbackargs)
{
	//$('body').css({'margin':'0px','background-color':'#000','font-size':'80pt','color':'#FFF','cursor':'url(../../images/empty.cur1), auto'});
	$(document).attr("title", fundata.pagetitle);
	$('body').css({'margin':'0px'});
	$('body').css({'background-color':fundata.pagebackground});
	$('body').css({'font-size':fundata.fontsize});
	$('body').css({'color':fundata.fontcolor});
	if(fundata.mousetype=='custom_mouse_type')
	{
		$('body').css({'cursor':'url('+fundata.mouse_type_image+'), auto'});
	}else
	{
		$('body').css({'cursor':fundata.mousetype});
	}
	if(fundata.setbackgroundimg)
	{
		$('body').css({'background-size':'100%','background':'url('+fundata.backgroundimgsrc+') no-repeat'});
	}
	//$('body').css({'cursor':'url(../../images/empty.cur1), auto'});
	//$('body').html('<div style="width:100%;height:100%;" id="opes_cotainer_div"></div>');
	$('body').html('<div style="" id="opes_cotainer_div"></div>');
	if(fundata.doPreload)
	{
		start_preload_img_sound_js_doPreLoad_(fundata,callbackargs);
	}else
	{
		window.setTimeout(invoke_callback,30,callbackargs);
	}
}

function data_(fundata,callbackargs)
{
	var proobj={};
	proobj.fundata=fundata;
	proobj.callbackargs=callbackargs;
	show_next_snapshot(proobj);
}

function wait_(fundata,callbackargs)
{
	var proobj={};
	proobj.fundata=fundata;
	proobj.callbackargs=callbackargs;
	show_progress_bar(proobj);
}

function timer_(fundata,callbackargs)
{
	var proobj={};
	proobj.fundata=fundata;
	proobj.callbackargs=callbackargs;
	timer_js_show_progress_bar(proobj);
}

function text_(fundata,callbackargs)
{
	$('body').html('');
	$('body').append('<span id="text_id_'+fundata.id+'"></span>');
	$('#text_id_'+fundata.id).html(fundata.text);
	$('#text_id_'+fundata.id).css({'font-size':fundata.fontsize,'color':fundata.fontcolor,'position':'absolute'});
	$('#text_id_'+fundata.id).position({
		my: fundata.position.my,
		at: fundata.position.at,
		of: $(document)
	});
	
	window.setTimeout(invoke_callback,2000,callbackargs);
}
function end_(fundata,callbackargs)
{
	post_result();
}