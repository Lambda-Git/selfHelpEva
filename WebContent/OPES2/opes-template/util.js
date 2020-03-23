
/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

	
/*
IE是不支持在setTimeout中给被调用的函数传参数的，为了兼容各个浏览器，我们可以把函数调用参数包裹进新的匿名函数中。示例：
        function f(a){
            alert(a);
        }
        var str={};
        setTimeout(function(){f(str)},50); //通用
        
        example:
        var trial={};
        setTimeout(show_blank, 2500,trial);
*/
function overrideTM()
{
	if(!+[1,]) { 
	    (function(overrideFun){  
	        window.setTimeout = overrideFun(window.setTimeout);  
	        window.setInterval = overrideFun(window.setInterval);  
	    })(
	        function(originalFun){  
	            return function(code, delay){  
	                var args = [].slice.call(arguments, 2);  
	                return originalFun(
	                    function(){
	                        if (typeof code == 'string') {
	                            eval(code);
	                        }
	                        else {
	                            code.apply(this, args);
	                        }
	                    }, 
	                    delay
	                )  
	            }  
	        }
	    );  
	}
}
overrideTM();

function exec_func_util(func_name,func_param_name,callback)//string,anytype
{
	var temp_func_name=function(data){};
	//try{
		temp_func_name = eval(func_name);
		temp_func_name(func_param_name,callback);
	//}catch(e)
	//{
		//$('body').html(JSON.stringify(callback)+'______'+e);
		//alert('func_name='+func_name+'  func_param_name='+func_param_name+'  callback='+callback+' not defined. '+ e);
	//}
	
}
function invoke_callback(callbackargs)
{
	
	//------------callback----------------
	//alert(callbackargs);
	//alert(callbackargs);
	//return;
	var callback=callbackargs.callback;
	exec_func_util(callback.func_name,callback.params,callback);
}

function getTimestamp()
{
	var now = new Date();
	return now.getTime(); // in ms
}

//been tested
function shuffle_all_items(all_items)
{
	var random_items = new Array();
	var item_count = all_items.length;
	for ( var i = 0; i < item_count; i++) 
	{
		if (all_items.length == 0) 
		{
			break;
		} else 
		{
			var rani = getRandomInt(all_items.length);
			var deli = all_items.splice(rani, 1);// 删除从指定位置deletePos开始的指定数量deleteCount的元素，数组形式返回所移除的元素
			if (deli.length > 0) 
			{
				random_items.push(deli[0]);
			} else 
			{
				alert('function: shuffle_all_items: deli.length=' + deli.length);
			}
		}
	}
	all_items.splice(0,all_items.length);//清空数组 
	for(var i=0;i<random_items.length;i++)
	{
		all_items.push(random_items[i]);
	}
	return all_items;
}
function sort_by_trialid_all_items(all_items)
{
	//$('body').append(JSON.stringify({all_items:all_items}));
	all_items.sort(
            function(a, b)
            {
                if(a.trialid < b.trialid) return -1;
                if(a.trialid > b.trialid) return 1;
                return 0;
            }
        );
	//$('body').append(JSON.stringify({all_items:all_items}));
	
}
//组块顺序不变，组块内刺激随机
function shuffle_all_items_in_one_same_trialid(all_items)
{
	if (!Array.prototype.shuffle) {
	    Array.prototype.shuffle = function() {
	        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
	        return this;
	    };
	}
	
	var unique_trialids=new Array();
	for(var i=0;i<all_items.length;i++)
	{
		//alert(all_items[i].trialid+'___'+unique_trialids+'=____'+$.inArray(all_items[i].trialid, unique_trialids));
		if($.inArray(all_items[i].trialid, unique_trialids)==-1)
		{
			unique_trialids.push(all_items[i].trialid);
		}
	}
	
	var temp_all_items=[];
	for(var i=0;i<unique_trialids.length;i++)
	{
		var temptrid=unique_trialids[i];
		var tempids=new Array();
		for(var k=0;k<all_items.length;k++)
		{
			if(all_items[k].trialid==temptrid)
			{
				tempids.push(all_items[k].id);
			}
		}
		//alert(tempids);
		tempids.shuffle();
		//alert(tempids);
		for(var t=0;t<tempids.length;t++)
		{
			for(var k=0;k<all_items.length;k++)
			{
				if(all_items[k].id==tempids[t])
				{
					temp_all_items.push(all_items[k]);
				}
			}
		}
	}
	
	all_items=temp_all_items;
	return all_items;
	
}
//组块顺序随机，组块内刺激随机
function shuffle_all_items_block_random_itemsofblock_random(all_items)
{
	all_items=shuffle_by_trialid_all_items(all_items);//组块顺序随机
	all_items=shuffle_all_items_in_one_same_trialid(all_items);//组块内刺激随机
	
	return all_items;
	
}
function shuffle_by_trialid_all_items(all_items)
{
	if (!Array.prototype.shuffle) {
	    Array.prototype.shuffle = function() {
	        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
	        return this;
	    };
	}
	
	var unique_trialids=new Array();
	for(var i=0;i<all_items.length;i++)
	{
		//alert(all_items[i].trialid+'___'+unique_trialids+'=____'+$.inArray(all_items[i].trialid, unique_trialids));
		if($.inArray(all_items[i].trialid, unique_trialids)==-1)
		{
			unique_trialids.push(all_items[i].trialid);
		}
	}
	
	//alert(unique_trialids);
	unique_trialids.shuffle();
	//alert(unique_trialids);
	
	var temp_all_items=[];
	for(var i=0;i<unique_trialids.length;i++)
	{
		var temtrialid=unique_trialids[i];
		for(var k=0;k<all_items.length;k++)
		{
			if(all_items[k].trialid==temtrialid)
			{
				var tempobj={};
				$.extend(true, tempobj,all_items[k]);  
				temp_all_items.push(tempobj);
			}
		}
	}
	//alert(JSON.stringify({temp_all_items:temp_all_items}));
	/*all_items.splice(0,all_items.length);//清空数组 
	for(var i=0;i<temp_all_items.length;i++)
	{
		all_items.push(temp_all_items[i]);
	}*/
	
	//all_items=[];
	all_items=temp_all_items;
	return all_items;
	
}
//Math.floor(Math.random()*(max-min+1)+min);//[min, max], contains min and contains max
function getRandomInt(X) 
{
	return Math.floor(X * (Math.random() % 1));
}
/*
function bind_key(proobj)
{
	Mousetrap.bind('p', function() { show_answer(proobj,'p'); });
	Mousetrap.bind('q', function() { show_answer(proobj,'q'); });
}
function unbind_key()
{
	Mousetrap.unbind('p');
	Mousetrap.unbind('q');
}
function reset_all_key()
{
	Mousetrap.reset();
}
*/

//-----------------------progressbar----------------------------


//var barobj={width:'600px',height:'30px',duration:5000,update_interval:60};
function show_progress_bar_util(barobj)
{
	var starttime = new Date().getTime();
	var progressbarid='progress_bar_'+starttime;
	var progresslabelid='progress_label_'+starttime;
	$( "#"+progressbarid ).remove();
	
	var progress_div='<div id="'+progressbarid+'"><div id="'+progresslabelid+'">Loading...</div></div>';
	$( "#opes_cotainer_div" ).append(progress_div);
	
	$( "#"+progressbarid).css({
		'width': barobj.width,
		'height': barobj.height
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
	
	barobj.timeout_id=null;
	barobj.starttime=starttime;
	barobj.progressbarid=progressbarid;
	barobj.progresslabelid=progresslabelid;
	update_progress_bar_util(barobj);
}

function update_progress_bar_util(barobj)
{
	if($( "#"+barobj.progressbarid ).length == 0)
	{
		return;
	}
	var now = new Date();
	var time=now.getTime();
	var elapset=(time-barobj.starttime);
	if(elapset<barobj.duration)
	{
		var showv=parseInt(elapset*100/barobj.duration);
		$("#"+barobj.progressbarid).progressbar( "option", "value", showv );
		$("#"+barobj.progresslabelid).text( $("#"+barobj.progressbarid).progressbar( "value" ) + "%" );
		if(barobj.timeout_id!=null)
		{
			clearTimeout(barobj.timeout_id);
		}
		timeout_id= window.setTimeout(update_progress_bar_util,barobj.update_interval,barobj); 

	}else
	{
		$("#"+barobj.progressbarid).progressbar( "option", "value", 100 );
		$("#"+barobj.progresslabelid).text( "100%" );
		$("#"+barobj.progressbarid ).remove();
	}
}


function invoke_proxy(data,success_callback)
{
	$.ajax({
		type:"POST",
		async:true,
		cache: false,
		dataType:"json",//which is expected from the sever
		url:"/lattice/CommonActionProxy",
		data:data,
		beforeSend:function(XMLHttpRequestObject)
		{
		},
		success:function(rdata, textStatus, XMLHttpRequest)
		{
			//alert($.isEmptyObject(rdata)); 
			//if 200 ok, Even if the server do not return json object (e.g. return nothing), it will go into this success function.
			success_callback(rdata);
		},
		error:function(jqXHR,textStatus,errorThrown)
		{
		},
		complete:function(jqXHR,textStatus)
		{
		}
	}); 
}
/***********************************   GetRequest() ********************************************/

function GetRequest()
{
	var url = location.search; 
	var theRequest = new Object();
	if(url.indexOf("?") != -1)
	{ 
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++)
		{ 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/***********************************  时间对象的格式化; ********************************************/

Date.prototype.format = function(format) 
{  
    /* 
     * 使用例子:format="yyyy-MM-dd hh:mm:ss"; 
     */  
    var o = {  
        "M+" : this.getMonth() + 1, // month  
        "d+" : this.getDate(), // day  
        "h+" : this.getHours(), // hour  
        "m+" : this.getMinutes(), // minute  
        "s+" : this.getSeconds(), // second  
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S" : this.getMilliseconds()  
        // millisecond  
    }  
    
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
                        - RegExp.$1.length));  
    }  
    
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1  
                            ? o[k]  
                            : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}

/***********************************    tips() ********************************************/
function tips(message)
{
	var temts=getTimestamp();
	var alert_div_id='RANDOM_ALERT_DIV_ID_JQUERYUI'+temts;
	$('body').append("<div id='"+alert_div_id+"' title='系统信息提示'>"+message+"</div>");
	$('#'+alert_div_id).dialog({
		resizable: false,
		autoOpen: true,
		height: 210,
		width: 390,
		modal: true,
		buttons:{'关闭窗口':function(){
				$('#'+alert_div_id).dialog('close');
				$('#'+alert_div_id).remove();
			}
		}
	});
	
}