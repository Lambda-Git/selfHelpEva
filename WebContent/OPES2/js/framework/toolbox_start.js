var toolbox_start_js_vars={
		
};

// body background, page title , cursor, font-size:  color: 
function toolbox_start_js_open_toolbox_start_editor(flowchart_id)
{
	var dialogid='toolbox_start_js_toolbox_start_editor';
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：开始工具'>"+
			"<div >" +
				"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
					"<li><a href='#toolbox_start_js_tab_1'><span>常规</span></a></li>"+
					"<li><a href='#toolbox_start_js_tab_3'><span>备注</span></a></li>"+
				"</ul>"+
				"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
					"<div id='toolbox_start_js_tab_1'>"+
						toolbox_start_js_get_general_tab_content(flowchart_id)+
					"</div>"+
					"<div id='toolbox_start_js_tab_3' >"+
						"<textarea id='"+dialogid+"_note' style='width:99%;height:270px;'></textarea>"+
					"</div>"+
				"</div>"+	
			"</div>" +
	"</div>");
	$('#'+dialogid).dialog({
		resizable: false,
		autoOpen: true,
		height: 500,
		width: 800,
		modal: true,
		buttons:[{
			text: "确定",
			click: function() {
				toolbox_start_js_save_all_values(flowchart_id);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	
	$('#'+dialogid+' input').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#'+dialogid+' select').css({'height': '30px','width':'300px'});
	initialize_jqueryui_color_picker_for_inputs(['toolbox_start_js_general_tab_page_background_id','toolbox_start_js_general_tab_text_color_id']);
	$('.OPES_TABLE_ID').footable();
	$('#'+dialogid+' td').css({'padding': '2px'});
	$('#'+dialogid+' tr').css({'display': 'table-row'});
	
	$("#"+dialogid).tabs();
	$('#'+dialogid).dialog('open');
	toolbox_start_js_refreshCommonSettings(flowchart_id);
}
function toolbox_start_js_refreshCommonSettings(flowchart_id)
{
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	
	if(typeof flow.flowtitle != 'undefined')
	{
		$('#toolbox_start_js_general_tab_flowtitle').val(flow.flowtitle);
	}
	if(typeof flow.flowdata.pagetitle != 'undefined')
	{
		$('#toolbox_start_js_general_tab_page_title_id').val(flow.flowdata.pagetitle);
	}
	if(typeof flow.flowdata.pagebackground != 'undefined')
	{
		$('#toolbox_start_js_general_tab_page_background_id').val(flow.flowdata.pagebackground);
	}
	if(typeof flow.flowdata.mousetype != 'undefined')
	{
		$('#toolbox_start_js_general_tab_mouse_type_id').val(flow.flowdata.mousetype);
	}
	if(typeof flow.flowdata.mouse_type_image != 'undefined')
	{
		$('#toolbox_start_js_general_tab_mouse_type_image_id').val(flow.flowdata.mouse_type_image);
	}
	if(typeof flow.flowdata.fontcolor != 'undefined')
	{
		$('#toolbox_start_js_general_tab_text_color_id').val(flow.flowdata.fontcolor);
	}
	if(typeof flow.flowdata.fontsize != 'undefined')
	{
		$('#toolbox_start_js_general_tab_text_fontsize_id').val(flow.flowdata.fontsize);
	}
	if(typeof flow.flowdata.doPreload != 'undefined')
	{
		$('#toolbox_start_js_general_tab_doPreload_id').val(flow.flowdata.doPreload?1:0);
	}
	if(typeof flow.flowdata.setbackgroundimg != 'undefined')
	{
		$('#toolbox_start_js_general_tab_set_background_img_id').val(flow.flowdata.setbackgroundimg?1:0);
	}
	if(typeof flow.flowdata.backgroundimgsrc != 'undefined')
	{
		$('#toolbox_start_js_general_tab_background_img_src_id').val(flow.flowdata.backgroundimgsrc);
	}
	
}
function toolbox_start_js_save_all_values(flowchart_id)
{
	var flowtitle=$('#toolbox_start_js_general_tab_flowtitle').val();
	var pagetitle=$('#toolbox_start_js_general_tab_page_title_id').val();
	var pagebackground=$('#toolbox_start_js_general_tab_page_background_id').val();
	var setbackgroundimg=$('#toolbox_start_js_general_tab_set_background_img_id').val();
	var backgroundimgsrc=$('#toolbox_start_js_general_tab_background_img_src_id').val();
	var mousetype=$('#toolbox_start_js_general_tab_mouse_type_id').val();
	var mouse_type_image=$('#toolbox_start_js_general_tab_mouse_type_image_id').val();
	var fontcolor=$('#toolbox_start_js_general_tab_text_color_id').val();
	var fontsize=$('#toolbox_start_js_general_tab_text_fontsize_id').val();
	var doPreload=$('#toolbox_start_js_general_tab_doPreload_id').val();
	
	
	var flow=initialize_ui_js_getFlowObject(flowchart_id);
	flow.flowdata.pagetitle=pagetitle;
	flow.flowdata.pagebackground=pagebackground;
	flow.flowdata.setbackgroundimg=(setbackgroundimg==1?true:false);
	flow.flowdata.backgroundimgsrc=backgroundimgsrc;
	flow.flowdata.mousetype=mousetype;
	flow.flowdata.mouse_type_image=mouse_type_image;
	flow.flowdata.fontcolor=fontcolor;
	flow.flowdata.fontsize=fontsize;
	flow.flowdata.doPreload=(doPreload==1?true:false);
	flow.flowtitle=flowtitle;
	
	
	$('#toolbox_start_js_toolbox_start_editor').dialog("close");
	$('#flowchart_tool_title_'+flowchart_id).html(flowtitle);
	
}
function toolbox_start_js_get_general_tab_content(flowchart_id)
{
	var newcontent = "<div id='toolbox_start_js_general_tab_div_id'>";
	newcontent+=("<table class='footable table toggle-circle toggle-medium'  data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=4>测验页面全局参数设置（针对于整个测验过程）</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>显示名称（"+flowchart_id+"）:</td>");
	newcontent+=("<td><input type='text' id='toolbox_start_js_general_tab_flowtitle' value='新建工具'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>页面标题:</td>");
	newcontent+=("<td><input type='text' id='toolbox_start_js_general_tab_page_title_id' value='多维心理网络版心理实验系统'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>页面背景：</td>");
	newcontent+=("<td><input type='text' id='toolbox_start_js_general_tab_page_background_id' value='000000'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>背景图片：</td>");
	newcontent+=("<td>" +
			"<select id='toolbox_start_js_general_tab_set_background_img_id' >" +
				"<option selected value='0'>不设置背景图片</option>" +
				"<option value='1'>设置背景图片</option>" +
			"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>背景图片：</td>");
	newcontent+=("<td><input type='text' id='toolbox_start_js_general_tab_background_img_src_id' style='width:200px;' value='/lattice/images/empty.cur' ></input><button onclick='toolbox_start_js_selectImageForMouseType(\"toolbox_start_js_general_tab_background_img_src_id\");' type='button' value='选择图片' >选择图片</button></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>预先加载：</td>");
	newcontent+=("<td>" +
				"<select id='toolbox_start_js_general_tab_doPreload_id' >" +
					"<option selected value='0'>不预先加载材料</option>" +
					"<option value='1'>预先加载材料</option>" +
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>鼠标样式：</td>");
	newcontent+=("<td>" +
				"<select id='toolbox_start_js_general_tab_mouse_type_id' >" +
					"<option value='url(/lattice/images/empty.cur), auto'>隐藏</option>" +
					"<option selected value='auto'>标准</option>" +
					"<option value='hand'>手型</option>" +
					"<option value='crosshair'>十字形</option>" +
					"<option value='wait'>等待</option>" +
					"<option value='help'>问号</option>" +
					"<option value='not-allowed'>禁止</option>" +
					"<option value='progress'>进度</option>" +
					"<option value='custom_mouse_type'>自定义鼠标图片</option>" +
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>鼠标图片：</td>");
	newcontent+=("<td><input type='text' id='toolbox_start_js_general_tab_mouse_type_image_id' style='width:200px;' value='/lattice/images/empty.cur' ></input><button onclick='toolbox_start_js_selectImageForMouseType(\"toolbox_start_js_general_tab_mouse_type_image_id\");' type='button' value='选择图片' >选择图片</button></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>字体颜色：</td>");
	newcontent+=("<td><input type='text' id='toolbox_start_js_general_tab_text_color_id' value='FFFFFF'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>字体大小:</td>");
	newcontent+=("<td><input type='text' id='toolbox_start_js_general_tab_text_fontsize_id' value='30px'></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	
	newcontent+="</table>";
	
	newcontent+="</div>";
	return newcontent;
}


function toolbox_start_js_selectImageForMouseType(inputIDToBeChanged)
{
	load_js_then_exec_func_util('js/framework/img_viewer.js','img_viewer_js_open_img_view_dialog',inputIDToBeChanged);
}