/*
 * 1. json2.js
 * 2. jquery.pagination.js
 * 3. getTimestamp()
 * 4. show_loading_msg()
 * 5. jquery.bgiframe-2.1.2.js
 * 6. jquery-ui-timepicker-addon-0.5.min.js
 * 7. invoke_proxy()
 * 8. GetRequest()
 * 9. goto_bottom()
 * 10. xheditor loadJS()
 * 11. initialize_rich_editor()
 * 12. tips()
 * 13. open_delete_confirm_dialog()
 * 14. load_js_then_exec_func_util()
 * 15. initialize_jqueryui_color_picker_for_inputs()
 * 16. getRandomInt(100)
 * 17. getCookie(name)
 */

/***********************   initialize_jqueryui_color_picker_for_inputs() ************************************/
function initialize_jqueryui_color_picker_for_inputs(input_id_array)
{
	for(var i=0;i<input_id_array.length;i++)
	{
		$('#'+input_id_array[i]).colorpicker(
			{
				/*title:'AAAAAAAA',
				color:'#fe9810',
				showCloseButton:true,
				select: function(event, color) {
					$('#'+input_id_array[i]).val('#'+color.formatted);
					alert('#'+color.formatted);
				}*/

			}
		);
	}
}
/***********************************    show_loading_msg ********************************************/

var main_page_processing_tips='<img style="width: 20px;height: 20px;" src="/lattice/OPES2/imgs/processing.gif"></img><span >加载中..</span>';
var main_page_success_tips='<img style="width: 16px;height: 16px;" src="/lattice/OPES2/imgs/check.gif"></img><span >&nbsp;&nbsp;处理成功</span>';
var main_page_error_tips='<img style="width: 14px;height: 14px;" src="/lattice/OPES2/imgs/cross.png"></img><span >&nbsp;&nbsp;处理失败,请重试</span>';

var main_processing_msg_timeout_id=null;
var main_user_msg_timeout_id=null;
function show_loading_msg()
{
	var msg_div_id='main_processing_div';
	var msg_div='<div style="left: 600px; display:none;color:black; font-size: 12px;font-weight: bold;position: absolute;top: 0;line-height: 23px;padding: 3px 16px 0px 16px;border: 1px #C0FF3E;border-top:0px; border-radius: 0 0 3px 3px;background:#C0FF3E;" id="'+msg_div_id+'"  >';
	$('#'+msg_div_id).remove();
	$('body').append(msg_div);
	
	if(main_processing_msg_timeout_id!=null)
	{
		clearTimeout(main_processing_msg_timeout_id);
	}
	$('#'+msg_div_id).html(main_page_processing_tips);
	$('#'+msg_div_id).css({"top":document.body.scrollTop});
	$('#'+msg_div_id).fadeIn();
}
function show_success_msg()
{
	var msg_div_id='main_processing_div';
	var msg_div='<div style="left: 600px; display:none;color:black; font-size: 12px;font-weight: bold;position: absolute;top: 0;line-height: 23px;padding: 3px 16px 0px 16px;border: 1px #C0FF3E;border-top:0px; border-radius: 0 0 3px 3px;background:#C0FF3E;" id="'+msg_div_id+'"  >';
	$('#'+msg_div_id).remove();
	$('body').append(msg_div);
	
	if(main_processing_msg_timeout_id!=null)
	{
		clearTimeout(main_processing_msg_timeout_id);
	}
	$('#'+msg_div_id).html(main_page_success_tips);
	$('#'+msg_div_id).css({"top":document.body.scrollTop});
	$('#'+msg_div_id).fadeIn();
	
	main_processing_msg_timeout_id=window.setTimeout("$('#"+msg_div_id+"').fadeOut();",5000);
}
function show_error_msg()
{
	var msg_div_id='main_processing_div';
	var msg_div='<div style="left: 600px; display:none;color:black; font-size: 12px;font-weight: bold;position: absolute;top: 0;line-height: 23px;padding: 3px 16px 0px 16px;border: 1px #C0FF3E;border-top:0px; border-radius: 0 0 3px 3px;background:#C0FF3E;" id="'+msg_div_id+'"  >';
	$('#'+msg_div_id).remove();
	$('body').append(msg_div);
	
	if(main_processing_msg_timeout_id!=null)
	{
		clearTimeout(main_processing_msg_timeout_id);
	}
	$('#'+msg_div_id).html(main_page_error_tips);
	$('#'+msg_div_id).css({"top":document.body.scrollTop});
	$('#'+msg_div_id).fadeIn();
	
	main_processing_msg_timeout_id=window.setTimeout("$('#"+msg_div_id+"').fadeOut();",5000);
}
function show_user_msg(msg)
{
	if($('#main_page_user_msg_tips_div').length==0)
	{
		var main_page_user_msg_tips='<img style="width: 16px;height: 16px;" src="../images/exclamation.png"></img>&nbsp;&nbsp;<span id="main_page_msg_tips_span_id">信息提示</span>';
		var tem_user_msg_div='';
		tem_user_msg_div+='<div style="display:none;left: 800px; display: block;color:black; font-size: 12px;font-weight: bold;position: absolute;top: 0;line-height: 23px;padding: 3px 16px 0px 16px;border: 1px #C0FF3E;border-top:0px; border-radius: 0 0 3px 3px;background:#C0FF3E;" id="main_page_user_msg_tips_div"  >';
		tem_user_msg_div+=main_page_user_msg_tips;
		tem_user_msg_div+='</div>';
		$('body').append(tem_user_msg_div);
	}
	$('#main_page_msg_tips_span_id').html(msg);
	$('#main_page_user_msg_tips_div').css({"top":document.body.scrollTop});
	$('#main_page_user_msg_tips_div').fadeIn();
	if(main_user_msg_timeout_id!=null)
	{
		clearTimeout(main_user_msg_timeout_id);
	}
	main_user_msg_timeout_id=window.setTimeout("$('#main_page_user_msg_tips_div').fadeOut();",5000);
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

/***********************************    open_delete_confirm_dialog() ********************************************/

function open_delete_confirm_dialog(callback,entityid,message)//message is OPTIONAL, entityid could be an array or any json object
{
	if(typeof message == 'undefined'|| message==null || message =='')
	{
		message='确定要删除这条记录吗';
	}
	var item_dialog_div_id='delete_dialog_confirm';
	if($('#'+item_dialog_div_id).length==0)
	{
		$('body').append("<div id='"+item_dialog_div_id+"' title='信息确认'><p><span class='ui-icon ui-icon-alert' style='float:left; margin:5px 5px 5px 0;'></span><span id='initialize_ui_js_confirm_msg_span'>"+message+"</span>?</p></div>");
		$('#'+item_dialog_div_id).dialog({
			resizable: false,
			autoOpen: true,
			height: 180,
			width: 320,
			modal: true,
			buttons:[{
						id: "delete-bt-of-delete-dialog",
			            text: "确定",
			            click: function() {
			            	$(this).dialog("close");
			            	callback(entityid);
			            }
		    		},{
			            text: "取消",
			            click: function() {
			            	$(this).dialog("close");
			            }
		    		}]
		});
	}else
	{
		$('#'+item_dialog_div_id).dialog('open');
		$('#delete-bt-of-delete-dialog').unbind('click');
		$('#delete-bt-of-delete-dialog').click(function (){
			$('#'+item_dialog_div_id).dialog('close');
			callback(entityid);
		});
		$('#initialize_ui_js_confirm_msg_span').html(message);
	}
}
/***********************************    invoke_proxy ********************************************/

function invoke_proxy(data,success_callback)
{
	//alert(JSON.stringify(data).length);
	var url="/lattice/CommonActionProxy";
	if(JSON.stringify(data).length>1501566)
	{
		url="/lattice/CommonActionLargeJsonProxy";
	}
	$.ajax({
		type:"POST",
		async:true,
		cache: false,
		dataType:"json",//which is expected from the sever
		url:url,
		data:data,
		beforeSend:function(XMLHttpRequestObject)
		{
			show_loading_msg();
		},
		success:function(rdata, textStatus, XMLHttpRequest)
		{
			//alert($.isEmptyObject(rdata)); 
			//if 200 ok, Even if the server do not return json object (e.g. return nothing), it will go into this success function.
			show_success_msg();
			success_callback(rdata);
		},
		error:function(jqXHR,textStatus,errorThrown)
		{
			show_error_msg();
			show_user_msg("Error Msg: textStatus="+textStatus+"  errorThrown="+errorThrown);
		},
		complete:function(jqXHR,textStatus)
		{
			
		}
	}); 
}


function third_party_invoke_proxy(data,success_callback)
{
	$.ajax({
		type:"POST",
		async:true,
		cache: false,
		dataType:"json",//which is expected from the sever
		url:"/lattice/CommonActionThirdPartyProxy",
		data:data,
		beforeSend:function(XMLHttpRequestObject)
		{
			show_loading_msg();
		},
		success:function(rdata, textStatus, XMLHttpRequest)
		{
			//alert($.isEmptyObject(rdata)); 
			//if 200 ok, Even if the server do not return json object (e.g. return nothing), it will go into this success function.
			show_success_msg();
			success_callback(rdata);
		},
		error:function(jqXHR,textStatus,errorThrown)
		{
			show_error_msg();
			show_user_msg("Error Msg: textStatus="+textStatus+"  errorThrown="+errorThrown);
		},
		complete:function(jqXHR,textStatus)
		{
			
		}
	}); 
}

/***********************************   load_js_then_exec_func_util() ********************************************/
/*
 * this is used to load dynamic exam js files
 * Usage:
   $.cachedScript("ajax/test.js").done(function(script, textStatus) {
	  console.log( textStatus );
	});
 */
jQuery.cachedScript = function(url, options) {

	  // allow user to set any option except for dataType, cache, and url
	  options = $.extend(options || {}, {
	    dataType: "script",
	    cache: false,
	    url: url
	  });
	  // Use $.ajax() since it is more flexible than $.getScript
	  // Return the jqXHR object so we can chain callbacks
	  return jQuery.ajax(options);
};
//this is used to load static libs
jQuery.loadCachedStaticScript = function(url, options) {
	  options = $.extend(options || {}, {
	    dataType: "script",
	    cache: true,
	    url: url
	  });
	  return jQuery.ajax(options);
};

function load_js_then_exec_func_util(js_file_name,func_name,func_param_name)//string,string,anytype
{
	//var g_param_name=get_g_param_string_from_js_file_name(js_file_name);
	var temp_func_name=function(data){};
	try{
		temp_func_name = eval(func_name);
		temp_func_name(func_param_name);
	}catch(e)
	{
		show_loading_msg();
		//show_user_msg(func_name+' is undefined, need to load js file '+js_file_name);
		$.cachedScript(js_file_name).done(function(script, textStatus){
			show_success_msg();
			temp_func_name = eval(func_name);
			temp_func_name(func_param_name);
		});
	}
	
}

/***********************************   getTimestamp() ********************************************/

function getTimestamp()
{
	var now = new Date();
	return now.getTime(); // in ms
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


/***********************************   goto_bottom goto_top ********************************************/
function goto_bottom()
{
	window.scrollBy(0,$(document).height()); // horizontal and vertical scroll increments
}
function goto_top()
{
	window.scrollBy(0,0); // horizontal and vertical scroll increments
}


/***********************************    xheditor loadJS() ********************************************/
//for xheditor
function loadJS(url,callback,charset)
{
	var script = document.createElement('script');
	script.onload = script.onreadystatechange = function ()
	{
		if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
		script.onload = script.onreadystatechange = null;
		script.src = '';
		script.parentNode.removeChild(script);
		script = null;
		if(callback)callback();
	};
	script.charset=charset || document.charset || document.characterSet;
	script.src = url;
	try {document.getElementsByTagName("head")[0].appendChild(script);} catch (e) {}
}


/***********************************    initialize_rich_editor ********************************************/

//In the future, all xheditor should use this method!!!!
function initialize_rich_editor(id_array,handler_url)
{
	loadJS('../xheditor/xheditor-1.1.7/xheditor-1.1.7/xheditor-1.1.7-zh-cn.min.js',function(){
		for(var i=0;i<id_array.length;i++)
		{
			$('#'+id_array[i]).xheditor({
				skin:'o2007blue',tools:'full',
				upImgUrl:handler_url+"?immediate=1",upImgExt:"jpg,jpeg,gif,png",
				upFlashUrl:handler_url+"?immediate=1",upFlashExt:"swf",
				upMediaUrl:handler_url+"?immediate=1",upMediaExt:"mp3,avi,mp4"
			});
		}
	});
}




/***********************************    jquery.bgiframe-2.1.2.js ********************************************/
(function($){

$.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
    s = $.extend({
        top     : 'auto', // auto == .currentStyle.borderTopWidth
        left    : 'auto', // auto == .currentStyle.borderLeftWidth
        width   : 'auto', // auto == offsetWidth
        height  : 'auto', // auto == offsetHeight
        opacity : true,
        src     : 'javascript:false;'
    }, s);
    var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                   'style="display:block;position:absolute;z-index:-1;'+
                       (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
                       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
                       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
                       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
                       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
                '"/>';
    return this.each(function() {
        if ( $(this).children('iframe.bgiframe').length === 0 )
            this.insertBefore( document.createElement(html), this.firstChild );
    });
} : function() { return this; });

// old alias
$.fn.bgIframe = $.fn.bgiframe;

function prop(n) {
    return n && n.constructor === Number ? n + 'px' : n;
}

})(jQuery);

/***********************************    json2.js  ********************************************/
var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {


            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }


            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {


                j = eval('(' + text + ')');


                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }


            throw new SyntaxError('JSON.parse');
        };
    }
}());


/***********************************    jquery-ui-timepicker-addon-0.5.min.js  ********************************************/
/*
* jQuery timepicker addon
* By: Trent Richardson [http://trentrichardson.com]
* Version 0.5
* Last Modified: 6/16/2010
* 
* Copyright 2010 Trent Richardson
* Dual licensed under the MIT and GPL licenses.
* http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
* http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
* 
* HERES THE CSS:
* #ui-timepicker-div dl{ text-align: left; }
* #ui-timepicker-div dl dt{ height: 25px; }
* #ui-timepicker-div dl dd{ margin: -25px 0 10px 65px; }
*/
(function($){function Timepicker(){}Timepicker.prototype={$input:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,hour:0,minute:0,second:0,ampm:'',formattedDate:'',formattedTime:'',formattedDateTime:'',defaults:{holdDatepickerOpen:true,showButtonPanel:true,timeOnly:false,showHour:true,showMinute:true,showSecond:false,showTime:true,stepHour:.05,stepMinute:.05,stepSecond:.05,ampm:false,hour:0,minute:0,second:0,timeFormat:'hh:mm tt',alwaysSetTime:true},addTimePicker:function(dp_inst){var tp_inst=this;var currDT=this.$input.val();var regstr=this.defaults.timeFormat.toString().replace(/h{1,2}/ig,'(\\d?\\d)').replace(/m{1,2}/ig,'(\\d?\\d)').replace(/s{1,2}/ig,'(\\d?\\d)').replace(/t{1,2}/ig,'(am|pm|a|p)?').replace(/\s/g,'\\s?')+'$';if(!this.defaults.timeOnly){regstr='\\S{'+this.defaults.timeFormat.length+',}\\s+'+regstr;}var order=this.getFormatPositions();var treg=currDT.match(new RegExp(regstr,'i'));if(treg){if(order.t!==-1)this.ampm=((treg[order.t]==undefined||treg[order.t].length==0)?'':(treg[order.t].charAt(0).toUpperCase()=='A')?'AM':'PM').toUpperCase();if(order.h!==-1){if(this.ampm=='AM'&&treg[order.h]=='12')this.hour=0;else if(this.ampm=='PM'&&treg[order.h]!='12')this.hour=(parseFloat(treg[order.h])+12).toFixed(0);else this.hour=treg[order.h];}if(order.m!==-1)this.minute=treg[order.m];if(order.s!==-1)this.second=treg[order.s];}tp_inst.timeDefined=(treg)?true:false;setTimeout(function(){tp_inst.injectTimePicker(dp_inst,tp_inst);},10);},getFormatPositions:function(){var finds=this.defaults.timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|t{1,2})/g);var orders={h:-1,m:-1,s:-1,t:-1};if(finds){for(var i=0;i<finds.length;i++){if(orders[finds[i].toString().charAt(0)]==-1)orders[finds[i].toString().charAt(0)]=i+1;}}return orders;},injectTimePicker:function(dp_inst,tp_inst){var $dp=$('#'+$.datepicker._mainDivId);var hourMax=23-(23%tp_inst.defaults.stepHour);var minMax=59-(59%tp_inst.defaults.stepMinute);var secMax=59-(59%tp_inst.defaults.stepSecond);if($dp.find("div#ui-timepicker-div").length==0){var html='<div id="ui-timepicker-div">'+'<dl>'+'<dt id="ui_tpicker_time_label"'+((tp_inst.defaults.showTime)?'':' style="display:none;"')+'>时间</dt>'+'<dd id="ui_tpicker_time"'+((tp_inst.defaults.showTime)?'':' style="display:none;"')+'></dd>'+'<dt id="ui_tpicker_hour_label"'+((tp_inst.defaults.showHour)?'':' style="display:none;"')+'>时</dt>'+'<dd id="ui_tpicker_hour"'+((tp_inst.defaults.showHour)?'':' style="display:none;"')+'></dd>'+'<dt id="ui_tpicker_minute_label"'+((tp_inst.defaults.showMinute)?'':' style="display:none;"')+'>分</dt>'+'<dd id="ui_tpicker_minute"'+((tp_inst.defaults.showMinute)?'':' style="display:none;"')+'></dd>'+'<dt id="ui_tpicker_second_label"'+((tp_inst.defaults.showSecond)?'':' style="display:none;"')+'>秒</dt>'+'<dd id="ui_tpicker_second"'+((tp_inst.defaults.showSecond)?'':' style="display:none;"')+'></dd>'+'</dl>'+'</div>';$tp=$(html);if(tp_inst.defaults.timeOnly==true){$tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">选择时间</div></div>');$dp.find('.ui-datepicker-header, .ui-datepicker-calendar, .ui-datepicker-current').hide();}tp_inst.hour_slider=$tp.find('#ui_tpicker_hour').slider({orientation:"horizontal",value:tp_inst.hour,min:0,max:hourMax,step:tp_inst.defaults.stepHour,slide:function(event,ui){tp_inst.hour_slider.slider("option","value",ui.value);tp_inst.onTimeChange(dp_inst,tp_inst);}});tp_inst.minute_slider=$tp.find('#ui_tpicker_minute').slider({orientation:"horizontal",value:tp_inst.minute,min:0,max:minMax,step:tp_inst.defaults.stepMinute,slide:function(event,ui){tp_inst.minute_slider.slider("option","value",ui.value);tp_inst.onTimeChange(dp_inst,tp_inst);}});tp_inst.second_slider=$tp.find('#ui_tpicker_second').slider({orientation:"horizontal",value:tp_inst.second,min:0,max:secMax,step:tp_inst.defaults.stepSecond,slide:function(event,ui){tp_inst.second_slider.slider("option","value",ui.value);tp_inst.onTimeChange(dp_inst,tp_inst);}});$dp.find('.ui-datepicker-calendar').after($tp);tp_inst.$timeObj=$('#ui_tpicker_time');if(dp_inst!=null){var timeDefined=tp_inst.timeDefined;tp_inst.onTimeChange(dp_inst,tp_inst);tp_inst.timeDefined=timeDefined;}}},onTimeChange:function(dp_inst,tp_inst){var hour=tp_inst.hour_slider.slider('value');var minute=tp_inst.minute_slider.slider('value');var second=tp_inst.second_slider.slider('value');var ampm=(tp_inst.hour<12)?'AM':'PM';var hasChanged=false;if(tp_inst.hour!=hour||tp_inst.minute!=minute||tp_inst.second!=second||(tp_inst.ampm.length>0&&tp_inst.ampm!=ampm))hasChanged=true;tp_inst.hour=parseFloat(hour).toFixed(0);tp_inst.minute=parseFloat(minute).toFixed(0);tp_inst.second=parseFloat(second).toFixed(0);tp_inst.ampm=ampm;tp_inst.formatTime(tp_inst);tp_inst.$timeObj.text(tp_inst.formattedTime);if(hasChanged){tp_inst.updateDateTime(dp_inst,tp_inst);tp_inst.timeDefined=true;}},formatTime:function(inst){var tmptime=inst.defaults.timeFormat.toString();var hour12=((inst.ampm=='AM')?(inst.hour):(inst.hour%12));hour12=(hour12==0)?12:hour12;if(inst.defaults.ampm==true){tmptime=tmptime.toString().replace(/hh/g,((hour12<10)?'0':'')+hour12).replace(/h/g,hour12).replace(/mm/g,((inst.minute<10)?'0':'')+inst.minute).replace(/m/g,inst.minute).replace(/ss/g,((inst.second<10)?'0':'')+inst.second).replace(/s/g,inst.second).replace(/TT/g,inst.ampm.toUpperCase()).replace(/tt/g,inst.ampm.toLowerCase()).replace(/T/g,inst.ampm.charAt(0).toUpperCase()).replace(/t/g,inst.ampm.charAt(0).toLowerCase());}else{tmptime=tmptime.toString().replace(/hh/g,((inst.hour<10)?'0':'')+inst.hour).replace(/h/g,inst.hour).replace(/mm/g,((inst.minute<10)?'0':'')+inst.minute).replace(/m/g,inst.minute).replace(/ss/g,((inst.second<10)?'0':'')+inst.second).replace(/s/g,inst.second);tmptime=$.trim(tmptime.replace(/t/gi,''));}inst.formattedTime=tmptime;return inst.formattedTime;},updateDateTime:function(dp_inst,tp_inst){var dt=this.$input.datepicker('getDate');if(dt==null)this.formattedDate=$.datepicker.formatDate($.datepicker._get(dp_inst,'dateFormat'),new Date(),$.datepicker._getFormatConfig(dp_inst));else this.formattedDate=$.datepicker.formatDate($.datepicker._get(dp_inst,'dateFormat'),dt,$.datepicker._getFormatConfig(dp_inst));if(this.defaults.alwaysSetTime){this.formattedDateTime=this.formattedDate+' '+this.formattedTime;}else{if(dt==null||!tp_inst.timeDefined||tp_inst.timeDefined==false){this.formattedDateTime=this.formattedDate;}else{this.formattedDateTime=this.formattedDate+' '+this.formattedTime;}}if(this.defaults.timeOnly==true)this.$input.val(this.formattedTime);else this.$input.val(this.formattedDateTime);}};jQuery.fn.datetimepicker=function(o){var tp=new Timepicker();if(o==undefined)o={};tp.defaults=$.extend({},tp.defaults,o);tp.defaults=$.extend({},tp.defaults,{beforeShow:function(input,inst){tp.hour=tp.defaults.hour;tp.minute=tp.defaults.minute;tp.second=tp.defaults.second;tp.ampm='';tp.$input=$(input);tp.inst=inst;tp.addTimePicker(inst);if($.isFunction(o['beforeShow']))o.beforeShow(input,inst);},onChangeMonthYear:function(year,month,inst){tp.updateDateTime(inst,tp);if($.isFunction(o['onChangeMonthYear']))o.onChangeMonthYear(year,month,inst);},onClose:function(dateText,inst){tp.updateDateTime(inst,tp);if($.isFunction(o['onClose']))o.onClose(dateText,inst);}});$(this).datepicker(tp.defaults);};jQuery.fn.timepicker=function(o){o=$.extend(o,{timeOnly:true});$(this).datetimepicker(o);};$.datepicker._selectDate=function(id,dateStr){var target=$(id);var inst=this._getInst(target[0]);var holdDatepickerOpen=(this._get(inst,'holdDatepickerOpen')===true)?true:false;dateStr=(dateStr!=null?dateStr:this._formatDate(inst));if(inst.input)inst.input.val(dateStr);this._updateAlternate(inst);var onSelect=this._get(inst,'onSelect');if(onSelect)onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst]);else if(inst.input)inst.input.trigger('change');if(inst.inline)this._updateDatepicker(inst);else if(holdDatepickerOpen){}else{this._hideDatepicker();this._lastInput=inst.input[0];if(typeof(inst.input[0])!='object')inst.input.focus();this._lastInput=null;}this._notifyChange(inst);};$.datepicker._base_updateDatepicker=$.datepicker._updateDatepicker;$.datepicker._updateDatepicker=function(inst){this._base_updateDatepicker(inst);this._beforeShow(inst.input,inst);};$.datepicker._beforeShow=function(input,inst){var beforeShow=this._get(inst,'beforeShow');if(beforeShow)beforeShow.apply((inst.input?inst.input[0]:null),[inst.input,inst]);};$.datepicker._doKeyPress=function(event){var inst=$.datepicker._getInst(event.target);if($.datepicker._get(inst,'constrainInput')){var dateChars=$.datepicker._possibleChars($.datepicker._get(inst,'dateFormat'));var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<' '||!dateChars||dateChars.indexOf(chr)>-1||event.keyCode==58||event.keyCode==32);}};})(jQuery);


/***********************************    jquery.pagination.js  ********************************************/

/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.mypagination = function(maxentries, opts){
	opts = jQuery.extend({
		items_per_page:10,
		num_display_entries:10,
		current_page:0,
		num_edge_entries:2,
		link_to:"#",
		prev_text:"上一页",
		next_text:"下一页",
		ellipse_text:"...",
		prev_show_always:true,
		next_show_always:true,
		callback:function(){return false;}
	},opts||{});
	
	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		}
		
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @return {Array}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		}
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		/**
		 * This function inserts the pagination links into the container element
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			}
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
				}
				else
				{
					var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));
						
						
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				panel.append(lnk);
			}
			// Generate "Previous"-Link
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			// Generate starting points
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			}
			// Generate interval links
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
				
			}
			// Generate "Next"-Link
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}
		}
		
		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		drawLinks();
        // call callback function
        opts.callback(current_page, this);
	});
}

/***********************************    opes_utils_add_table_css()  ********************************************/

function opes_utils_add_table_css()
{
	$(".OPES_TABLE_ID tr:even").css("background-color", "#FFF");
	$(".OPES_TABLE_ID tr:odd").css("background-color", "#ebfefd");
	$('.OPES_TABLE_ID tr').hover(
		function () {
			$(this).css("background-color", "#7FFFD4");//7FFFD4 FFDEAD E0FFFF FFF0F5 F6F9FB
		 },
		function () {
			$(".OPES_TABLE_ID tr:even").css("background-color", "#FFF");
			$(".OPES_TABLE_ID tr:odd").css("background-color", "#ebfefd");
		}
	);
}

/***********************************    getRandomInt()  ********************************************/

function getRandomInt(X) 
{
	return Math.floor(X * (Math.random() % 1));
}

/***********************************   getCookie(name) ********************************************/

function getCookie(name)
{
 var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 if(arr=document.cookie.match(reg))
 return unescape(arr[2]);
 else
 return null;
}
