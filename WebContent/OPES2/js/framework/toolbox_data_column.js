var toolbox_data_column_js_vars={
		
};

function toolbox_data_column_js_openColumnListDialog(funargs)
{
	var flowchart_id=funargs.flowchart_id;
	var addOrEditFlag=funargs.addOrEditFlag;
	var data_row_id=null;
	if(addOrEditFlag=='ADD')
	{
		//data_row_id=getTimestamp();
		data_row_id=toolbox_data_js_get_max_value_for_rowid(flowchart_id);
	}else if(addOrEditFlag=='EDIT')
	{
		data_row_id=funargs.data_row_id;
	}

	var dialogid='toolbox_data_column_js_refreshColumnList'+flowchart_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：数据工具: 新建一条数据系列'>"+
			"<div >" +
				"<ul style='-moz-border-radius-bottomleft: 0; -moz-border-radius-bottomright: 0;'>"+
					"<li><a href='#toolbox_data_column_js_tab_row_column_list"+flowchart_id+"'><span>刺激元素</span></a></li>"+
					"<li><a href='#toolbox_data_column_js_tab_row_common"+flowchart_id+"'><span>常规设置</span></a></li>"+
					"<li><a href='#toolbox_data_column_js_tab_row_resoponse"+flowchart_id+"'><span>响应设置</span></a></li>"+
					"<li><a href='#toolbox_data_column_js_tab_row_feedback"+flowchart_id+"'><span>反馈设置</span></a></li>"+
				"</ul>"+
				"<div class='ui-layout-content ui-widget-content ui-corner-bottom' style='border-top: 0; padding-bottom: 1em;'>"+
					"<div id='toolbox_data_column_js_tab_row_column_list"+flowchart_id+"' >"+
					"</div>"+
					"<div id='toolbox_data_column_js_tab_row_common"+flowchart_id+"' >"+
					"</div>"+
					"<div id='toolbox_data_column_js_tab_row_resoponse"+flowchart_id+"' >"+
					"</div>"+
					"<div id='toolbox_data_column_js_tab_row_feedback"+flowchart_id+"' >"+
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
			text: "新增",
			click: function() {
				//var data_column_id=getTimestamp();
				var data_column_id=toolbox_data_js_get_max_value_for_columnid_in_all_data_rows(flowchart_id);
				toolbox_data_column_js_openAddOrEditColumnDialog(flowchart_id,data_row_id,data_column_id);
			}
		},{
			text: "确定",
			click: function() {
				toolbox_data_column_js_addOrEditRow(flowchart_id,data_row_id);
				toolbox_data_row_js_refreshRowList(flowchart_id);
				
				$(this).dialog("close");
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$("#"+dialogid).tabs();
	$('#'+dialogid).dialog('open');
	toolbox_data_column_js_refreshColumnListResponseFeedback(flowchart_id,data_row_id);
}
function toolbox_data_column_js_refreshColumnListResponseFeedback(flowchart_id,data_row_id)
{
	toolbox_data_column_js_refreshColumnList(flowchart_id,data_row_id);
	toolbox_data_column_js_refreshRowCommonSettings(flowchart_id,data_row_id);
	toolbox_data_column_js_refreshRowResponseSettings(flowchart_id,data_row_id);
	toolbox_data_column_js_refreshRowFeedbackSettings(flowchart_id,data_row_id);
	
}
function toolbox_data_column_js_refreshColumnList(flowchart_id,data_row_id)
{
	var divid='toolbox_data_column_js_tab_row_column_list'+flowchart_id;
	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	var data_column_list=[];
	if(data_row!=null)
	{
		data_column_list=data_row.data_column_list;
	}
	//alert(data_column_list.length);
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' cellspacing='0' ><thead><tr><th data-sort-ignore='true' scope=col>修改</th><th scope=col>顺序</th><th data-sort-ignore='true'  scope=col>ID</th><th data-sort-ignore='true' scope=col>刺激类型</th><th data-sort-ignore='true' scope=col>呈现时间</th><th data-sort-ignore='true' scope=col>延迟时间</th><th scope=col>完成状态</th><th data-sort-ignore='true' scope=col>删除</th></tr></thead>");
	if(data_column_list.length==0)
	{
		newcontent+="<tr>";
		newcontent+=("<td colspan='100%' style='text-align:center'>暂时没有数据</td>");
		newcontent+="</tr>";
	}else
	{
		$.each(data_column_list,function(i){
			newcontent+="<tr>";
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_column_js_openAddOrEditColumnDialog(\""+flowchart_id+"\","+data_row_id+","+ data_column_list[i].id +") width=22px height=22px border=0 src='imgs/edit.png' ></img></a></td>";
			newcontent+=("<td>"+ (i+1) +"</td>");
			//newcontent+=("<td>"+ (data_column_list[i].id+'').substring(9,13)  +"</td>");
			newcontent+=("<td>"+ data_column_list[i].id +"</td>");
			newcontent+=("<td>"+ toolbox_data_js_get_stimulate_type_short_name(data_column_list[i].stimulateType) +"</td>");
			newcontent+=("<td>"+ data_column_list[i].aliveTime +"</td>");
			newcontent+=("<td>"+ data_column_list[i].delayTime +"</td>");
			newcontent+="<td><a class='opes2_tooltip' href='javascript:;' title='已完成本条数据' href='javascript:;'><img width=24px height=24px border=0 src='imgs/accepted_48.png' ></img></a></td>";
			newcontent+="<td><a href='javascript:;'><img onclick=toolbox_data_column_js_deleteColumn(\""+flowchart_id+"\","+data_row_id+","+ data_column_list[i].id  +") width=24px height=24px border=0 src='imgs/cancel_48.png' ></img></a></td>";
			
			newcontent+="</tr>";
		});
	}
	newcontent+="</tbody></table>";
	$('#'+divid).html(newcontent);
	$('.OPES_TABLE_ID').footable();
}
function toolbox_data_column_js_deleteColumn(flowchart_id,data_row_id,data_column_id)
{
	toolbox_data_js_delete_data_column(flowchart_id,data_row_id,data_column_id);
	toolbox_data_column_js_refreshColumnList(flowchart_id,data_row_id);
}
function toolbox_data_column_js_openAddOrEditColumnDialog(flowchart_id,data_row_id,data_column_id)
{
	
	var dialogid='toolbox_data_column_js_openAddOrEditColumnDialog'+flowchart_id;
	if($('#'+dialogid).length!=0)
	{
		$('#'+dialogid).dialog('destroy');
		$('#'+dialogid).remove();
	}
	$('body').append("<div id='"+dialogid+"' title='属性：数据工具: 新建一条数据系列：添加数据'>"+
			"<div >" +
				"<div id='toolbox_data_column_js_openAddOrEditColumnDialog_div_"+flowchart_id+"' >"+
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
				toolbox_data_column_js_addOrEditColumn(flowchart_id,data_row_id,data_column_id);
				$(this).dialog("close");
				toolbox_data_column_js_refreshColumnList(flowchart_id,data_row_id);
			}
		},{
			text: "取消",
			click: function() {
				$(this).dialog("close");
			}
		}]
	});
	$("#"+dialogid).tabs();
	$('#'+dialogid).dialog('open');
	toolbox_data_column_js_refreshColumnCommonSettings(flowchart_id,data_row_id,data_column_id);
}
function toolbox_data_column_js_setShowTimeToMaximum(target_input_id)
{
	$("#"+target_input_id).val(99999999);
}
//TODO: add data_column_id to each id like mousetype, to avoid error (e.g.)if there are 2 text in one row
function toolbox_data_column_js_refreshColumnCommonSettings(flowchart_id,data_row_id,data_column_id)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：数据工具: 新建一条数据系列：添加数据</th></tr></thead>");
	
	newcontent+="<tr id='STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_aliveTime_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>呈现时间：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_aliveTime_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='3000' ></input><input type='checkbox' onclick='toolbox_data_column_js_setShowTimeToMaximum(\"toolbox_data_column_js_refreshColumn_aliveTime_"+flowchart_id+data_row_id+data_column_id+"\");' ></input>无限时间</td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr id='STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_delayTime_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>延迟时间：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_delayTime_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='1000' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr id='STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>记录开始时间:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;'><option selected value='1'>是</option><option value='0'>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>刺激类型:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshColumn_stimulateType_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;'>" +
					"<option value='STIMULATE_TYPE_MOUSE_TYPE'>自定义鼠标样式</option>" +	
					"<option value='STIMULATE_TYPE_PRE_CUSTOM_CODE'>自定义前置代码</option>" +		
					"<option selected value='STIMULATE_TYPE_PLAINTEXT'>简单文本</option>" +
					"<option value='STIMULATE_TYPE_NULL'>空白刺激</option>" +
					"<option value='STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY'>绑定键盘按键</option>" +
					"<option value='STIMULATE_TYPE_SOUND_SWITCH'>绑定声控开关(仅需一次)</option>" +
					"<option value='STIMULATE_TYPE_TURNON_SOUND_SWITCH'>打开声控开关</option>" +
					"<option value='STIMULATE_TYPE_TURNOFF_SOUND_SWITCH'>关闭声控开关</option>" +
					"<option value='STIMULATE_TYPE_INPUT'>输入框-单行</option>" +
					"<option value='STIMULATE_TYPE_DATE'>输入框-日期</option>" +
					"<option value='STIMULATE_TYPE_TEXTAREA'>输入文本-多行</option>" +
					"<option value='STIMULATE_TYPE_BUTTON'>按钮</option>" +
					"<option value='STIMULATE_TYPE_RADIOBUTTON'>单选按钮</option>" +
					"<option value='STIMULATE_TYPE_CHECKBOX'>多选按钮</option>" +
					"<option value='STIMULATE_TYPE_RICHTEXT'>复杂文本框-多行</option>" +
					"<option value='STIMULATE_TYPE_IMAGE'>图片</option>" +
					"<option value='STIMULATE_TYPE_SOUND'>声音</option>" +
					"<option value='STIMULATE_TYPE_FLASH'>动画</option>" +
					"<option value='STIMULATE_TYPE_VIDEO'>视频</option>" +
					"<option value='STIMULATE_TYPE_POST_CUSTOM_CODE'>自定义后置代码</option>" +	
				"</select></td>");
	
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	
	newcontent+="<tr id='STIMULATE_TYPE_MOUSE_TYPE_mousetype_toolbox_data_column_js_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>鼠标样式：</td>");
	newcontent+=("<td>" +
				"<select id='toolbox_data_column_js_mouse_type_"+flowchart_id+data_row_id+data_column_id+"' >" +
					"<option value='url(/lattice/images/empty.cur), auto'>隐藏-不再使用这个</option>" +
					"<option value='none'>隐藏</option>" +
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
	
	newcontent+="<tr id='STIMULATE_TYPE_MOUSE_TYPE_mouse_type_image_toolbox_data_column_js_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>鼠标图片：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_mouse_type_image_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='/lattice/images/empty.cur' ></input><button onclick='toolbox_data_column_js_open_img_list_dialog(\"toolbox_data_column_js_mouse_type_image_"+flowchart_id+data_row_id+data_column_id+"\");' type='button' value='选择图片' >选择图片</button></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr id='STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>文本内容：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_text_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='P + Q = X' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_width_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>文本框宽度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_text_width_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='900' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_height_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>文本框高度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_text_height_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='100' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontsize_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>字体大小：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_fontsize_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='30' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontcolor_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>字体颜色：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_fontcolor_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='000000' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontfamily_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>字体样式：</td>");
	newcontent+=("<td>" +
				"<select id='toolbox_data_column_js_refreshColumn_fontfamily_"+flowchart_id+data_row_id+data_column_id+"'>" +
					"<option selected value='sans-serif'>系统默认字体</option>" +
					"<option value='楷体_GB2312'>楷体_GB2312</option>" +
					"<option value='Times New Roman'>Times New Roman</option>" +
					"<option value='Courier'>Courier</option>" +
					"<option value='黑体'>黑体</option>" +
					"<option value='宋体'>宋体</option>" +
					"<option value='Microsoft YaHei'>Microsoft YaHei</option>" +
					"<option value='Helvetica'>Helvetica</option>" +
					"<option value='Tahoma'>Tahoma</option>" +
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="<tr id='STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY_toolbox_data_column_js_refreshColumn_userDefinedKeys_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>自定义按键：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_userDefinedKeys_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='[\"p\",\"q\",\"a\",\"space\"]' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="<tr id='STIMULATE_TYPE_BUTTON_toolbox_data_column_js_refreshColumn_button_text_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>按钮文字：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_button_text_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='下一刺激' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr id='STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_src_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>选择图片：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_image_src_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='imgs/help.png' ></input><button onclick='toolbox_data_column_js_open_img_list_dialog(\"toolbox_data_column_js_refreshColumn_image_src_"+flowchart_id+data_row_id+data_column_id+"\");' type='button' value='选择图片' >选择图片</button></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_width_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>图片宽度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_image_width_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='200' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_height_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>图片高度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_image_height_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='200' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>添加单击事件：</td>");
	newcontent+=("<td>" +
				"<select id='toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_"+flowchart_id+data_row_id+data_column_id+"' onchange='toolbox_data_column_js_onchangeForImageEnableOnclickEvent(\""+flowchart_id+"\","+data_row_id+","+data_column_id+")'>" +
					"<option selected value=0>不添加单击事件</option>" +
					"<option value=1>添加单击事件</option>" +
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>使用全局定义方法：</td>");
	newcontent+=("<td>" +
				"<select id='toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_"+flowchart_id+data_row_id+data_column_id+"' >" +
					"<option selected value=0>否</option>" +
					"<option value=1>是</option>" +
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_onclickFunCode_"+flowchart_id+data_row_id+data_column_id+"' >";
	newcontent+=("<td colspan=2><textarea id='toolbox_data_column_js_refreshColumn_image_onclickFunCode_"+flowchart_id+data_row_id+data_column_id+"' style='width:100%;height:270px;' value='' >//add your code here.....\nalert(proobj.id+'_____'+proobj.src);\nalert(JSON.stringify(__TEMP_GLOBAL_VARIABLE_FOR_IMAGE_ON_CLICK_passobj));</textarea></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="<tr id='STIMULATE_TYPE_RADIOBUTTON_toolbox_data_column_js_refreshColumn_radiobutton_options_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>单选框选项：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_radiobutton_options_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='[{name:\"A\",value:\"value for A\",score:3},{name:\"B\",value:\"value for B\",score:3},{name:\"F\",value:\"value for F\",score:3}]' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_RADIOBUTTON_toolbox_data_column_js_refreshColumn_radiobutton_options_onclick_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>选中触发事件：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshColumn_radiobutton_options_onclick_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;'><option value='1'>选择后立即触发下一刺激</option><option selected value='0'>选择后不触发任何操作</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="<tr id='STIMULATE_TYPE_CHECKBOX_toolbox_data_column_js_refreshColumn_checkbox_options_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>多选框选项：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_checkbox_options_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='[{name:\"A\",value:\"value for A\",score:3},{name:\"B\",value:\"value for B\",score:3},{name:\"F\",value:\"value for F\",score:3}]' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="<tr id='STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_input_type_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>单行文本框类型：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshColumn_input_type_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;'>" +
					"<option selected value='INPUT_TYPE_TEXT'>仅能输入文本</option>" +
					"<option value='INPUT_TYPE_NUMBER'>仅能输入数字</option>" +
					"<option value='INPUT_TYPE_COMMENTS'>作为备注类型</option>" +	
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	
	newcontent+="<tr id='STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_sound_src_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>选择声音：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_sound_src_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='imgs/help.png' ></input><button onclick='toolbox_data_column_js_open_sound_list_dialog(\"toolbox_data_column_js_refreshColumn_sound_src_"+flowchart_id+data_row_id+data_column_id+"\");' type='button' value='选择声音' >选择声音</button></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_auto_start_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>自动播放：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshColumn_auto_start_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;'>" +
					"<option selected value='1'>自动播放声音</option>" +
					"<option value='0'>手动播放声音</option>" +	
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_hide_sound_player_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>隐藏控件：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshColumn_hide_sound_player_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;'>" +
					"<option value='1'>隐藏声音播放控件</option>" +
					"<option selected value='0'>显示声音播放控件</option>" +	
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_sound_title_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>显示标题：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_sound_title_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='声音标题' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	
	
	
	
	newcontent+="<tr id='STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_textarea_width_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>输入框宽度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_textarea_width_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='500' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_textarea_height_"+flowchart_id+data_row_id+data_column_id+"'>";
	newcontent+=("<td>输入框宽度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_textarea_height_"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='200' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr id='STIMULATE_TYPE_position_my_"+flowchart_id+data_row_id+data_column_id+"' >";
	newcontent+=("<td>呈现位置点（本控件）：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_position_my"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='center center' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='必须填写两个字符串：第一个可以填写的字符串是（横向方向）: left, center, right。第二个可以填写的字符串是（纵向方向）: top, center, bottom。例子：left top 或者 center center 或者 right+10 top-25%'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_position_at_"+flowchart_id+data_row_id+data_column_id+"' >";
	newcontent+=("<td>呈现位置点（所在页面）：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshColumn_position_at"+flowchart_id+data_row_id+data_column_id+"' style='width:200px;' value='center center' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='与前面的定义相同'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="<tr id='STIMULATE_TYPE_PRE_CUSTOM_CODE_tr_id_"+flowchart_id+data_row_id+data_column_id+"' >";
	newcontent+=("<td colspan=2><textarea id='toolbox_data_column_js_refreshColumn_pre_custom_code_"+flowchart_id+data_row_id+data_column_id+"' style='width:100%;height:270px;' value='' >//add your code here.....</textarea></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr id='STIMULATE_TYPE_POST_CUSTOM_CODE_tr_id_"+flowchart_id+data_row_id+data_column_id+"' >";
	newcontent+=("<td colspan=2><textarea id='toolbox_data_column_js_refreshColumn_post_custom_code_"+flowchart_id+data_row_id+data_column_id+"' style='width:100%;height:270px;' value='' >//add your code here.....</textarea></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	newcontent+="</table>";
	
	$('#toolbox_data_column_js_openAddOrEditColumnDialog_div_'+flowchart_id).html(newcontent);
	$('#toolbox_data_column_js_openAddOrEditColumnDialog_div_'+flowchart_id+' input[type="text"]').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#toolbox_data_column_js_openAddOrEditColumnDialog_div_'+flowchart_id+' select').css({'height': '30px','width':'300px'});
	initialize_jqueryui_color_picker_for_inputs(['toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id]);
	$('.OPES_TABLE_ID').footable();
	initialize_tooltips();
	$('#toolbox_data_column_js_openAddOrEditColumnDialog_div_'+flowchart_id+' td').css({'padding': '2px'});
	
	
	var data_column=toolbox_data_js_get_data_column(flowchart_id,data_row_id,data_column_id);
	if(data_column==null)
	{
	}else
	{
		$('#toolbox_data_column_js_refreshColumn_aliveTime_'+flowchart_id+data_row_id+data_column_id).val((typeof data_column.aliveTime == 'undefined')?3000:data_column.aliveTime);
		$('#toolbox_data_column_js_refreshColumn_delayTime_'+flowchart_id+data_row_id+data_column_id).val((typeof data_column.delayTime == 'undefined')?0:data_column.delayTime);
		$('#toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_'+flowchart_id+data_row_id+data_column_id).val((typeof data_column.delayTime == 'undefined')?1:(data_column.startRecordResponseStartTime?1:0));
		$('#toolbox_data_column_js_refreshColumn_stimulateType_'+flowchart_id+data_row_id+data_column_id).val(data_column.stimulateType);
		
		if(data_column.stimulateType=='STIMULATE_TYPE_PLAINTEXT')
		{
			$('#toolbox_data_column_js_refreshColumn_text_'+flowchart_id+data_row_id+data_column_id).val(data_column.text);
			$('#toolbox_data_column_js_refreshColumn_text_width_'+flowchart_id+data_row_id+data_column_id).val(data_column.textDivWidth);
			$('#toolbox_data_column_js_refreshColumn_text_height_'+flowchart_id+data_row_id+data_column_id).val(data_column.textDivHeight);
			$('#toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontsize);
			$('#toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontcolor);
			$('#toolbox_data_column_js_refreshColumn_fontfamily_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontfamily);
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY')
		{
			$('#toolbox_data_column_js_refreshColumn_userDefinedKeys_'+flowchart_id+data_row_id+data_column_id).val(JSON.stringify(data_column.userDefinedKeys));
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_INPUT')
		{
			$('#toolbox_data_column_js_refreshColumn_input_type_'+flowchart_id+data_row_id+data_column_id).val(data_column.inputType);
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_DATE')
		{
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_TEXTAREA')
		{
			$('#toolbox_data_column_js_refreshColumn_textarea_width_'+flowchart_id+data_row_id+data_column_id).val(data_column.width);
			$('#toolbox_data_column_js_refreshColumn_textarea_height_'+flowchart_id+data_row_id+data_column_id).val(data_column.height);
			
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_BUTTON')
		{
			$('#toolbox_data_column_js_refreshColumn_button_text_'+flowchart_id+data_row_id+data_column_id).val(data_column.text);
			$('#toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontsize);
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_RADIOBUTTON')
		{
			$('#toolbox_data_column_js_refreshColumn_radiobutton_options_'+flowchart_id+data_row_id+data_column_id).val(JSON.stringify(data_column.options));
			$('#toolbox_data_column_js_refreshColumn_radiobutton_options_onclick_'+flowchart_id+data_row_id+data_column_id).val((typeof data_column.gotoNextOnClick == 'undefined')?1:(data_column.gotoNextOnClick?1:0));
			$('#toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontsize);
			$('#toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontcolor);
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_CHECKBOX')
		{
			//alert(data_column.options);
			$('#toolbox_data_column_js_refreshColumn_checkbox_options_'+flowchart_id+data_row_id+data_column_id).val(JSON.stringify(data_column.options));
			$('#toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontsize);
			$('#toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).val(data_column.fontcolor);
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_IMAGE')
		{
			$('#toolbox_data_column_js_refreshColumn_image_src_'+flowchart_id+data_row_id+data_column_id).val(data_column.src);
			$('#toolbox_data_column_js_refreshColumn_image_width_'+flowchart_id+data_row_id+data_column_id).val(data_column.width);
			$('#toolbox_data_column_js_refreshColumn_image_height_'+flowchart_id+data_row_id+data_column_id).val(data_column.height);
			
			$('#toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_'+flowchart_id+data_row_id+data_column_id).val(data_column.enableOnclickEvent?1:0);
			$('#toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_'+flowchart_id+data_row_id+data_column_id).val(data_column.useGlobalDefinedFunctionForOnclick?1:0);
			//$('#toolbox_data_column_js_refreshColumn_image_onclickFunName_'+flowchart_id+data_row_id+data_column_id).val(data_column.onclickFunName);
			$('#toolbox_data_column_js_refreshColumn_image_onclickFunCode_'+flowchart_id+data_row_id+data_column_id).val(data_column.onclickFunCode);
			
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_PRE_CUSTOM_CODE')
		{
			$('#toolbox_data_column_js_refreshColumn_pre_custom_code_'+flowchart_id+data_row_id+data_column_id).val(data_column.code);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_POST_CUSTOM_CODE')
		{
			$('#toolbox_data_column_js_refreshColumn_post_custom_code_'+flowchart_id+data_row_id+data_column_id).val(data_column.code);
			
		}else if(data_column.stimulateType=='STIMULATE_TYPE_MOUSE_TYPE')
		{
			$('#toolbox_data_column_js_mouse_type_'+flowchart_id+data_row_id+data_column_id).val(data_column.mousetype);
			$('#toolbox_data_column_js_mouse_type_image_'+flowchart_id+data_row_id+data_column_id).val(data_column.mouse_type_image);
		}else if(data_column.stimulateType=='STIMULATE_TYPE_SOUND')
		{
			$('#toolbox_data_column_js_refreshColumn_sound_src_'+flowchart_id+data_row_id+data_column_id).val(data_column.src);
			$('#toolbox_data_column_js_refreshColumn_auto_start_'+flowchart_id+data_row_id+data_column_id).val(data_column.autoStart?1:0);
			$('#toolbox_data_column_js_refreshColumn_hide_sound_player_'+flowchart_id+data_row_id+data_column_id).val(data_column.hide?1:0);
			$('#toolbox_data_column_js_refreshColumn_sound_title_'+flowchart_id+data_row_id+data_column_id).val(data_column.title);
			$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val(data_column.position.my);
			$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val(data_column.position.at);
		}
	}
	
	
	toolbox_data_column_js_bindActionToColumnStimulateType(flowchart_id,data_row_id,data_column_id);
	var selectedType='STIMULATE_TYPE_PLAINTEXT';
	if(data_column==null)
	{
		selectedType='STIMULATE_TYPE_PLAINTEXT';
	}else
	{
		selectedType=data_column.stimulateType;
	}
	toolbox_data_column_js_bindActionToColumnStimulateTypeShowSpecifiedType(flowchart_id,data_row_id,data_column_id,selectedType);
}
function toolbox_data_column_js_bindActionToColumnStimulateTypeHideAll(flowchart_id,data_row_id,data_column_id)
{
	$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_height_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_width_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontfamily_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY_toolbox_data_column_js_refreshColumn_userDefinedKeys_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_BUTTON_toolbox_data_column_js_refreshColumn_button_text_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_src_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_width_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_height_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_onclickFunCode_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_RADIOBUTTON_toolbox_data_column_js_refreshColumn_radiobutton_options_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_RADIOBUTTON_toolbox_data_column_js_refreshColumn_radiobutton_options_onclick_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_CHECKBOX_toolbox_data_column_js_refreshColumn_checkbox_options_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_textarea_width_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_textarea_height_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_PRE_CUSTOM_CODE_tr_id_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_POST_CUSTOM_CODE_tr_id_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_MOUSE_TYPE_mousetype_toolbox_data_column_js_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_MOUSE_TYPE_mouse_type_image_toolbox_data_column_js_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_input_type_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_sound_src_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_auto_start_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_hide_sound_player_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_sound_title_'+flowchart_id+data_row_id+data_column_id).hide();
	
	
	$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).hide();
	$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).hide();
}
function toolbox_data_column_js_bindActionToColumnStimulateTypeShowSpecifiedType(flowchart_id,data_row_id,data_column_id,selectedType)
{
	toolbox_data_column_js_bindActionToColumnStimulateTypeHideAll(flowchart_id,data_row_id,data_column_id);
	
	if(selectedType=='STIMULATE_TYPE_PLAINTEXT')
	{
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_width_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_text_height_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontfamily_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_NULL')
	{
		
	}else if(selectedType=='STIMULATE_TYPE_TURNON_SOUND_SWITCH')
	{
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_aliveTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_delayTime_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_TURNOFF_SOUND_SWITCH')
	{
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_aliveTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_delayTime_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY')
	{
		$('#STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY_toolbox_data_column_js_refreshColumn_userDefinedKeys_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_SOUND_SWITCH')
	{
		
	}else if(selectedType=='STIMULATE_TYPE_INPUT')
	{
		$('#STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_input_type_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_DATE')
	{
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_TEXTAREA')
	{
		$('#STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_textarea_width_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_TEXTAREA_toolbox_data_column_js_refreshColumn_textarea_height_'+flowchart_id+data_row_id+data_column_id).show();
		
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_BUTTON')
	{
		$('#STIMULATE_TYPE_BUTTON_toolbox_data_column_js_refreshColumn_button_text_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_RADIOBUTTON')
	{
		$('#STIMULATE_TYPE_RADIOBUTTON_toolbox_data_column_js_refreshColumn_radiobutton_options_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_RADIOBUTTON_toolbox_data_column_js_refreshColumn_radiobutton_options_onclick_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_CHECKBOX')
	{
		$('#STIMULATE_TYPE_CHECKBOX_toolbox_data_column_js_refreshColumn_checkbox_options_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_PLAINTEXT_toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_RICHTEXT')
	{
		tips(selectedType+' has not been implemented!');
		
	}else if(selectedType=='STIMULATE_TYPE_IMAGE')
	{
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_src_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_width_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_height_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_onclickFunCode_'+flowchart_id+data_row_id+data_column_id).show();
		
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
		toolbox_data_column_js_onchangeForImageEnableOnclickEvent(flowchart_id,data_row_id,data_column_id);
		
	}else if(selectedType=='STIMULATE_TYPE_PRE_CUSTOM_CODE')
	{
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_aliveTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_delayTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_PRE_CUSTOM_CODE_tr_id_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_POST_CUSTOM_CODE')
	{
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_aliveTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_delayTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_POST_CUSTOM_CODE_tr_id_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_MOUSE_TYPE')
	{
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_aliveTime_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_common_toolbox_data_column_js_refreshColumn_delayTime_'+flowchart_id+data_row_id+data_column_id).show();
		
		$('#STIMULATE_TYPE_MOUSE_TYPE_mousetype_toolbox_data_column_js_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_MOUSE_TYPE_mouse_type_image_toolbox_data_column_js_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_SOUND')
	{
		$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_sound_src_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_auto_start_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_hide_sound_player_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_SOUND_toolbox_data_column_js_refreshColumn_sound_title_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_my_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_position_at_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else if(selectedType=='STIMULATE_TYPE_FLASH')
	{
		tips(selectedType+' has not been implemented!');
		
	}else if(selectedType=='STIMULATE_TYPE_VIDEO')
	{
		tips(selectedType+' has not been implemented!');
		
	}else
	{
		tips(selectedType+' has not been implemented!');
	}
}
function toolbox_data_column_js_bindActionToColumnStimulateType(flowchart_id,data_row_id,data_column_id)
{
	$('#toolbox_data_column_js_refreshColumn_stimulateType_'+flowchart_id+data_row_id+data_column_id).change(function()
	{
		toolbox_data_column_js_bindActionToColumnStimulateTypeHideAll(flowchart_id,data_row_id,data_column_id);
		var selectedType=$(this).children('option:selected').val();
		toolbox_data_column_js_bindActionToColumnStimulateTypeShowSpecifiedType(flowchart_id,data_row_id,data_column_id,selectedType);
	});
}
//if find, edit it. if not find, add a new one.
function toolbox_data_column_js_addOrEditColumn(flowchart_id,data_row_id,data_column_id)
{
	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	if(data_row==null)
	{
		data_row={};
		data_row.id=data_row_id;
		data_row.data_column_list=[];
		toolbox_data_js_add_data_row(flowchart_id,data_row);

	}
	var data_column=toolbox_data_js_get_data_column(flowchart_id,data_row_id,data_column_id);
	if(data_column==null)
	{
		data_column={};
		data_column.id=data_column_id;
		data_row.data_column_list.push(data_column);
	}

	var toolbox_data_column_js_refreshColumn_aliveTime_=$('#toolbox_data_column_js_refreshColumn_aliveTime_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_delayTime_=$('#toolbox_data_column_js_refreshColumn_delayTime_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_=$('#toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_stimulateType_=$('#toolbox_data_column_js_refreshColumn_stimulateType_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_text_=$('#toolbox_data_column_js_refreshColumn_text_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_text_div_width_=$('#toolbox_data_column_js_refreshColumn_text_width_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_text_div_height_=$('#toolbox_data_column_js_refreshColumn_text_height_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_fontsize_=$('#toolbox_data_column_js_refreshColumn_fontsize_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_fontcolor_=$('#toolbox_data_column_js_refreshColumn_fontcolor_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_fontfamily_=$('#toolbox_data_column_js_refreshColumn_fontfamily_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_position_my=$('#toolbox_data_column_js_refreshColumn_position_my'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_position_at=$('#toolbox_data_column_js_refreshColumn_position_at'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_userDefinedKeys_=$('#toolbox_data_column_js_refreshColumn_userDefinedKeys_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_button_text_=$('#toolbox_data_column_js_refreshColumn_button_text_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_image_src_=$('#toolbox_data_column_js_refreshColumn_image_src_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_=$('#toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_=$('#toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_'+flowchart_id+data_row_id+data_column_id).val();
	//var toolbox_data_column_js_refreshColumn_image_onclickFunName_=$('#toolbox_data_column_js_refreshColumn_image_onclickFunName_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_image_onclickFunCode_=$('#toolbox_data_column_js_refreshColumn_image_onclickFunCode_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_image_width_=$('#toolbox_data_column_js_refreshColumn_image_width_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_image_height_=$('#toolbox_data_column_js_refreshColumn_image_height_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_radiobutton_options_=$('#toolbox_data_column_js_refreshColumn_radiobutton_options_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_radiobutton_options_gotoNextOnClick_=$('#toolbox_data_column_js_refreshColumn_radiobutton_options_onclick_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_checkbox_options_=$('#toolbox_data_column_js_refreshColumn_checkbox_options_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_textarea_width_=$('#toolbox_data_column_js_refreshColumn_textarea_width_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_textarea_height_=$('#toolbox_data_column_js_refreshColumn_textarea_height_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_pre_custom_code_=$('#toolbox_data_column_js_refreshColumn_pre_custom_code_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_post_custom_code_=$('#toolbox_data_column_js_refreshColumn_post_custom_code_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_mousetype_=$('#toolbox_data_column_js_mouse_type_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_mouse_type_image_=$('#toolbox_data_column_js_mouse_type_image_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_input_type_=$('#toolbox_data_column_js_refreshColumn_input_type_'+flowchart_id+data_row_id+data_column_id).val();

	var toolbox_data_column_js_refreshColumn_sound_src_=$('#toolbox_data_column_js_refreshColumn_sound_src_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_auto_start_=$('#toolbox_data_column_js_refreshColumn_auto_start_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_hide_sound_player_=$('#toolbox_data_column_js_refreshColumn_hide_sound_player_'+flowchart_id+data_row_id+data_column_id).val();
	var toolbox_data_column_js_refreshColumn_sound_title_=$('#toolbox_data_column_js_refreshColumn_sound_title_'+flowchart_id+data_row_id+data_column_id).val();

	
	
	
	data_column.aliveTime=toolbox_data_column_js_refreshColumn_aliveTime_;
	data_column.delayTime=toolbox_data_column_js_refreshColumn_delayTime_;
	data_column.startRecordResponseStartTime=(toolbox_data_column_js_refreshColumn_startRecordResponseStartTime_==1?true:false);
	data_column.stimulateType=toolbox_data_column_js_refreshColumn_stimulateType_;

	if(data_column.stimulateType=='STIMULATE_TYPE_PLAINTEXT')
	{
		data_column.text=toolbox_data_column_js_refreshColumn_text_;
		data_column.textDivWidth=toolbox_data_column_js_refreshColumn_text_div_width_;
		data_column.textDivHeight=toolbox_data_column_js_refreshColumn_text_div_height_;
		data_column.fontsize=toolbox_data_column_js_refreshColumn_fontsize_;
		data_column.fontcolor=toolbox_data_column_js_refreshColumn_fontcolor_;
		data_column.fontfamily=toolbox_data_column_js_refreshColumn_fontfamily_;
		
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_NULL')
	{

	}else if(data_column.stimulateType=='STIMULATE_TYPE_BINDANDACCEPTSINGLEKEY')
	{
		var userDefinedKeys=eval(toolbox_data_column_js_refreshColumn_userDefinedKeys_);
		//alert('userDefinedKeys----'+JSON.stringify(userDefinedKeys));
		data_column.userDefinedKeys=userDefinedKeys;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_INPUT')
	{
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;
		data_column.inputType=toolbox_data_column_js_refreshColumn_input_type_;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_DATE')
	{
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_TEXTAREA')
	{
		data_column.width=toolbox_data_column_js_refreshColumn_textarea_width_;
		data_column.height=toolbox_data_column_js_refreshColumn_textarea_height_;
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_BUTTON')
	{
		data_column.text=toolbox_data_column_js_refreshColumn_button_text_;
		data_column.fontsize=toolbox_data_column_js_refreshColumn_fontsize_;
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_RADIOBUTTON')
	{
		var radio_options=eval(toolbox_data_column_js_refreshColumn_radiobutton_options_);
		//alert('radio_options----'+JSON.stringify(radio_options));
		data_column.gotoNextOnClick=(toolbox_data_column_js_refreshColumn_radiobutton_options_gotoNextOnClick_==1?true:false);
		data_column.options=radio_options;
		data_column.fontsize=toolbox_data_column_js_refreshColumn_fontsize_;
		data_column.fontcolor=toolbox_data_column_js_refreshColumn_fontcolor_;
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_CHECKBOX')
	{
		var checkbox_options=eval(toolbox_data_column_js_refreshColumn_checkbox_options_);
		//alert('checkbox_options----'+JSON.stringify(checkbox_options));
		data_column.options=checkbox_options;
		data_column.fontsize=toolbox_data_column_js_refreshColumn_fontsize_;
		data_column.fontcolor=toolbox_data_column_js_refreshColumn_fontcolor_;
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_RICHTEXT')
	{
		tips(data_column.stimulateType+' has not been implemented!');

	}else if(data_column.stimulateType=='STIMULATE_TYPE_IMAGE')
	{
		data_column.src=toolbox_data_column_js_refreshColumn_image_src_;
		data_column.enableOnclickEvent=(toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_==1?true:false); 
		data_column.useGlobalDefinedFunctionForOnclick=(toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_==1?true:false); 
		data_column.onclickFunName='_'+flowchart_id+'_IMG_ONCLICK_'+data_row_id+'_'+data_column.id+'_';
		data_column.onclickFunCode=toolbox_data_column_js_refreshColumn_image_onclickFunCode_; 
		data_column.width=toolbox_data_column_js_refreshColumn_image_width_;
		data_column.height=toolbox_data_column_js_refreshColumn_image_height_;
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_PRE_CUSTOM_CODE')
	{
		data_column.funName='_'+flowchart_id+'_PRE_'+data_row_id+'_'+data_column.id+'_';
		data_column.code=toolbox_data_column_js_refreshColumn_pre_custom_code_;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_POST_CUSTOM_CODE')
	{
		data_column.funName='_'+flowchart_id+'_POST_'+data_row_id+'_'+data_column.id+'_';
		data_column.code=toolbox_data_column_js_refreshColumn_post_custom_code_;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_MOUSE_TYPE')
	{
		data_column.mousetype=toolbox_data_column_js_refreshColumn_mousetype_; 
		data_column.mouse_type_image=toolbox_data_column_js_refreshColumn_mouse_type_image_;

	}else if(data_column.stimulateType=='STIMULATE_TYPE_SOUND')
	{
		data_column.src=toolbox_data_column_js_refreshColumn_sound_src_;
		data_column.autoStart=(toolbox_data_column_js_refreshColumn_auto_start_==1?true:false);
		data_column.hide=(toolbox_data_column_js_refreshColumn_hide_sound_player_==1?true:false);
		data_column.title=toolbox_data_column_js_refreshColumn_sound_title_;
		data_column.loops=1;
		data_column.position={};
		data_column.position.my=toolbox_data_column_js_refreshColumn_position_my;
		data_column.position.at=toolbox_data_column_js_refreshColumn_position_at;
		
	}else if(data_column.stimulateType=='STIMULATE_TYPE_SOUND_SWITCH')
	{
		
	}else if(data_column.stimulateType=='STIMULATE_TYPE_TURNON_SOUND_SWITCH')
	{

	}else if(data_column.stimulateType=='STIMULATE_TYPE_TURNOFF_SOUND_SWITCH')
	{

	}else if(data_column.stimulateType=='STIMULATE_TYPE_FLASH')
	{
		tips(data_column.stimulateType+' has not been implemented!');

	}else if(data_column.stimulateType=='STIMULATE_TYPE_VIDEO')
	{
		tips(data_column.stimulateType+' has not been implemented!');

	}else
	{
		tips(data_column.stimulateType+' has not been implemented!');
	}


	//alert(data_row_id+'----'+JSON.stringify(data_row));
}
function toolbox_data_column_js_addOrEditRow(flowchart_id,data_row_id)
{
	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	if(data_row==null)
	{
		data_row={};
		data_row.id=data_row_id;
		data_row.data_column_list=[];
		data_row.hasBeenShownOnScreen=false;//use this virtual property (will not been saved to database) to filter the rows not shown on screen (e.g. skipped by custom code) 
		toolbox_data_js_add_data_row(flowchart_id,data_row);
	}
	//如果要对data_row添加新的属性，请先在data.js模板里面添加，保证测试通过
	//common setttings
	var toolbox_data_column_js_refreshRow_aliveType_=$('#toolbox_data_column_js_refreshRow_aliveType_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_showTimer_=$('#toolbox_data_column_js_refreshRow_showTimer_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_aliveTime_=$('#toolbox_data_column_js_refreshRow_aliveTime_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_logResultFlag_=$('#toolbox_data_column_js_refreshRow_logResultFlag_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_rowType_=$('#toolbox_data_column_js_refreshRow_rowType_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_trialid_=$('#toolbox_data_column_js_refreshRow_trialid_'+flowchart_id+data_row_id).val();
	data_row.aliveType=toolbox_data_column_js_refreshRow_aliveType_;
	data_row.showTimer=toolbox_data_column_js_refreshRow_showTimer_==1?true:false;
	data_row.aliveTime=toolbox_data_column_js_refreshRow_aliveTime_;//WAIT_FOREVER_TIME
	data_row.logResultFlag=toolbox_data_column_js_refreshRow_logResultFlag_;
	data_row.rowType=toolbox_data_column_js_refreshRow_rowType_;
	data_row.trialid=toolbox_data_column_js_refreshRow_trialid_;
	//alert(data_row.trialid);
	
	//response settings
	var toolbox_data_column_js_refreshRow_responseFlag_=$('#toolbox_data_column_js_refreshRow_responseFlag_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_responseType_=$('#toolbox_data_column_js_refreshRow_responseType_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_correctResult_=$('#toolbox_data_column_js_refreshRow_correctResult_'+flowchart_id+data_row_id).val();
	data_row.responseFlag=toolbox_data_column_js_refreshRow_responseFlag_;
	data_row.responseType=toolbox_data_column_js_refreshRow_responseType_;//RESPONSE_TYPE_CHECKBOX RESPONSE_TYPE_TEXTAREA RESPONSE_TYPE_INPUT RESPONSE_TYPE_RADIOBUTTON RESPONSE_TYPE_SINGLEKEY
	data_row.correctResult=toolbox_data_column_js_refreshRow_correctResult_;
	data_row.userResult=null;
	data_row.responseStartTime=null;
	data_row.responseEndTime=null;
	data_row.responseDuration=null;
		
		
	//feedback settings
	var feedbackFlag=$('#toolbox_data_column_js_refreshRow_feedbackFlag_'+flowchart_id+data_row_id).val();
	var feedback_aliveTime=$('#toolbox_data_column_js_refreshRow_feedback_aliveTime_'+flowchart_id+data_row_id).val();
	var feedback_cleanupAllColumnsWhenShowFeedback=$('#toolbox_data_column_js_refreshRow_feedback_cleanupAllColumnsWhenShowFeedback_'+flowchart_id+data_row_id).val();
	var feedback_showUserResult=$('#toolbox_data_column_js_refreshRow_feedback_showUserResult_'+flowchart_id+data_row_id).val();
	var feedback_showCorrectResult=$('#toolbox_data_column_js_refreshRow_feedback_showCorrectResult_'+flowchart_id+data_row_id).val();
	var feedback_showMsg=$('#toolbox_data_column_js_refreshRow_feedback_showMsg_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_showImage_=$('#toolbox_data_column_js_refreshRow_feedback_showImage_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_fontsize_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontsize_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_width_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_width_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_height_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_height_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_position_my_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_my_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_position_at_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_at_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_msgForWrongResult_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForWrongResult_'+flowchart_id+data_row_id).val();
	var toolbox_data_column_js_refreshRow_feedback_msgImage_msgForCorrectResult_=$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForCorrectResult_'+flowchart_id+data_row_id).val();
	

	data_row.feedbackFlag=feedbackFlag;
	data_row.feedback={};
	data_row.feedback.aliveTime=feedback_aliveTime;
	data_row.feedback.cleanupAllColumnsWhenShowFeedback=feedback_cleanupAllColumnsWhenShowFeedback==1?true:false;
	//alert(data_row.feedback.cleanupAllColumnsWhenShowFeedback);
	data_row.feedback.showCorrectResult=feedback_showCorrectResult==1?true:false;
	data_row.feedback.showUserResult=feedback_showUserResult==1?true:false;
	data_row.feedback.showMsg=feedback_showMsg==1?true:false;
	data_row.feedback.showImage=toolbox_data_column_js_refreshRow_feedback_showImage_==1?true:false;
	data_row.feedback.msgImage={};
	data_row.feedback.msgImage.fontsize=toolbox_data_column_js_refreshRow_feedback_msgImage_fontsize_;
	data_row.feedback.msgImage.fontcolor=toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_;
	data_row.feedback.msgImage.imgForWrongResultSrc=toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_;
	data_row.feedback.msgImage.imgForCorrectResultSrc=toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_;
	data_row.feedback.msgImage.width=toolbox_data_column_js_refreshRow_feedback_msgImage_width_;
	data_row.feedback.msgImage.height=toolbox_data_column_js_refreshRow_feedback_msgImage_height_;
	data_row.feedback.msgImage.position={};
	data_row.feedback.msgImage.position.my=toolbox_data_column_js_refreshRow_feedback_msgImage_position_my_;
	data_row.feedback.msgImage.position.at=toolbox_data_column_js_refreshRow_feedback_msgImage_position_at_;
	data_row.feedback.msgImage.msgForWrongResult=toolbox_data_column_js_refreshRow_feedback_msgImage_msgForWrongResult_;
	data_row.feedback.msgImage.msgForCorrectResult=toolbox_data_column_js_refreshRow_feedback_msgImage_msgForCorrectResult_;

}
function toolbox_data_column_js_refreshRowCommonSettings(flowchart_id,data_row_id)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' id='toolbox_data_column_js_refreshRowCommonSettings_table' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：数据工具: 新建一条数据系列：添加数据</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>时间进度条:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_showTimer_"+flowchart_id+data_row_id+"' style='width:200px;'><option value=1>显示时间进度条</option><option selected value=0>不显示时间进度条</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>呈现类型:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_aliveType_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value='ROW_ALIVE_TYPE_ALIVETIME_RESPONSE_FIRST_COME_FIRST_SERVED'>刺激时间和用户响应哪个在前就使用哪个原则</option><option value='ROW_ALIVE_TYPE_MUST_WAIT_FOR_ALIVE_TIME_REACHED'>本刺激必须等待设置的呈现时间不管用户响应与否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>呈现时间：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_aliveTime_"+flowchart_id+data_row_id+"' style='width:200px;' value='3000' ></input><input type='checkbox' onclick='toolbox_data_column_js_setShowTimeToMaximum(\"toolbox_data_column_js_refreshRow_aliveTime_"+flowchart_id+data_row_id+"\");' ></input>无限时间</td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>记录结果:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_logResultFlag_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value=1>需要记录结果</option><option value=0>不记录结果</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>条件变量：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_rowType_"+flowchart_id+data_row_id+"' style='width:200px;' value='0' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	newcontent+=("<td>BlockID：</td>");//TrialID
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_trialid_"+flowchart_id+data_row_id+"' style='width:200px;' value='"+data_row_id+"' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	
	
	newcontent+="</table>";
	
	$('#toolbox_data_column_js_tab_row_common'+flowchart_id).html(newcontent);
	$('#toolbox_data_column_js_tab_row_common'+flowchart_id+' input[type="text"]').css({'height': '16px','width':'330px','padding':'6px 9px'});
	$('#toolbox_data_column_js_tab_row_common'+flowchart_id+' select').css({'height': '30px','width':'350px'});
	$('#toolbox_data_column_js_refreshRowCommonSettings_table').footable();
	initialize_tooltips();
	$('#toolbox_data_column_js_tab_row_common'+flowchart_id+' td').css({'padding': '2px'});
	

	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	if(data_row!=null)
	{
		if(typeof data_row.aliveType != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_aliveType_'+flowchart_id+data_row_id).val(data_row.aliveType);
		}
		if(typeof data_row.showTimer != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_showTimer_'+flowchart_id+data_row_id).val(data_row.showTimer?1:0);
		}
		if(typeof data_row.aliveTime != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_aliveTime_'+flowchart_id+data_row_id).val(data_row.aliveTime);
		}
		if(typeof data_row.logResultFlag != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_logResultFlag_'+flowchart_id+data_row_id).val(data_row.logResultFlag);
		}
		if(typeof data_row.rowType != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_rowType_'+flowchart_id+data_row_id).val(data_row.rowType);
		}
		if(typeof data_row.trialid != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_trialid_'+flowchart_id+data_row_id).val(data_row.trialid);
		}
	}
	
}
function toolbox_data_column_js_refreshRowResponseSettings(flowchart_id,data_row_id,addOrEditFlag)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium' id='toolbox_data_column_js_refreshRowResponseSettings_table' data-sort='false' cellspacing='0' ><thead><tr><th scope=col colspan=100%>属性：数据工具: 新建一条数据系列：添加数据</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>响应设置:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_responseFlag_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value='1'>需要用户响应</option><option value='0'>不需要用户响应</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>响应类型:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_responseType_"+flowchart_id+data_row_id+"' style='width:200px;'>" +
						"<option selected value='RESPONSE_TYPE_SINGLEKEY'>单个键盘按键响应</option>" +
						"<option value='RESPONSE_TYPE_MULTIPLEKEY'>多个键盘按键响应(尚未实现)</option>" +
						"<option value='RESPONSE_TYPE_SINGLEMOUSECLICK'>鼠标单次点击响应(尚未实现)</option>" +
						"<option value='RESPONSE_TYPE_MULTIPLCLICK'>鼠标多次点击响应(尚未实现)</option>" +
						"<option value='RESPONSE_TYPE_RADIOBUTTON'>单项选择响应</option>" +
						"<option value='RESPONSE_TYPE_CHECKBOX'>多项选择响应</option>" +
						"<option value='RESPONSE_TYPE_INPUT'>输入框响应</option>" +
						"<option value='RESPONSE_TYPE_DATE'>输入日期响应</option>" +
						"<option value='RESPONSE_TYPE_TEXTAREA'>输入文本响应</option>" +
						"<option value='RESPONSE_TYPE_RICHTEXT'>复杂输入文本响应(尚未实现)</option>" +
						"<option value='RESPONSE_TYPE_SOUND_SWITCH'>声控开关</option>" +
						"<option value='RESPONSE_TYPE_SOUND'>声音响应(尚未实现)</option>" +
				"</select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>正确答案：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_correctResult_"+flowchart_id+data_row_id+"' style='width:200px;' value='' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_data_column_js_tab_row_resoponse'+flowchart_id).html(newcontent);
	$('#toolbox_data_column_js_tab_row_resoponse'+flowchart_id+' input').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#toolbox_data_column_js_tab_row_resoponse'+flowchart_id+' select').css({'height': '30px','width':'300px'});
	$('#toolbox_data_column_js_refreshRowResponseSettings_table').footable();
	initialize_tooltips();
	$('#toolbox_data_column_js_tab_row_resoponse'+flowchart_id+' td').css({'padding': '2px'});
	
	toolbox_data_column_js_bindActionToRowResponseSettingsFlag(flowchart_id,data_row_id);
	var selected=$('#toolbox_data_column_js_refreshRow_responseFlag_'+flowchart_id+data_row_id).val();
	toolbox_data_column_js_bindActionToRowResponseSettingsFlagShowSpecifiedAction(flowchart_id,data_row_id,selected);
	
	

	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	if(data_row!=null)
	{
		if(typeof data_row.responseFlag != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_responseFlag_'+flowchart_id+data_row_id).val(data_row.responseFlag);
		}
		if(typeof data_row.responseType != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_responseType_'+flowchart_id+data_row_id).val(data_row.responseType);
		}
		if(typeof data_row.correctResult != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_correctResult_'+flowchart_id+data_row_id).val(data_row.correctResult);
		}
	}
}

function toolbox_data_column_js_bindActionToRowResponseSettingsFlagShowSpecifiedAction(flowchart_id,data_row_id,selected)
{
	if(selected==1)
	{
		$('#toolbox_data_column_js_refreshRow_responseType_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_correctResult_'+flowchart_id+data_row_id).removeAttr("disabled");
	}else
	{
		$('#toolbox_data_column_js_refreshRow_responseType_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_correctResult_'+flowchart_id+data_row_id).attr("disabled","disabled");
	}
}
function toolbox_data_column_js_bindActionToRowResponseSettingsFlag(flowchart_id,data_row_id)
{
	$('#toolbox_data_column_js_refreshRow_responseFlag_'+flowchart_id+data_row_id).change(function()
	{
		var selected=$(this).children('option:selected').val();
		toolbox_data_column_js_bindActionToRowResponseSettingsFlagShowSpecifiedAction(flowchart_id,data_row_id,selected);
	});
}

function toolbox_data_column_js_refreshRowFeedbackSettings(flowchart_id,data_row_id,addOrEditFlag)
{
	var newcontent = "";
	newcontent+=("<table class='footable table toggle-circle toggle-medium'  id='toolbox_data_column_js_refreshRowFeedbackSettings_table' data-sort='false' cellspacing='0' ><thead><tr><th  scope=col colspan=100%>属性：数据工具: 新建一条数据系列：添加数据</th></tr></thead>");
	
	newcontent+="<tr>";
	newcontent+=("<td>反馈设置:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_feedbackFlag_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value='1'>有反馈</option><option value='0'>无反馈</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>反馈呈现时间：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_aliveTime_"+flowchart_id+data_row_id+"' style='width:200px;' value='3000' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>反馈时隐藏刺激:</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_feedback_cleanupAllColumnsWhenShowFeedback_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value=1>是</option><option value=0>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	newcontent+="<tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>显示正确答案：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_feedback_showCorrectResult_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value=1>是</option><option value=0>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>显示用户答案：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_feedback_showUserResult_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value=1>是</option><option value=0>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈内容：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_feedback_showMsg_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value=1>是</option><option value=0>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈表情图片：</td>");
	newcontent+=("<td><select id='toolbox_data_column_js_refreshRow_feedback_showImage_"+flowchart_id+data_row_id+"' style='width:200px;'><option selected value=1>是</option><option value=0>否</option></select></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈内容字体大小：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_fontsize_"+flowchart_id+data_row_id+"' style='width:200px;' value='30' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈内容字体颜色：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_"+flowchart_id+data_row_id+"' style='width:200px;' value='fff' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>用户响应错误时反馈表情图片：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_"+flowchart_id+data_row_id+"' style='width:200px;' value='/lattice/images/logoicon.png' ></input><button onclick='toolbox_data_column_js_open_img_list_dialog(\"toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_"+flowchart_id+data_row_id+"\");' type='button' value='选择图片' >选择图片</button></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>用户响应正确时反馈表情图片：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_"+flowchart_id+data_row_id+"' style='width:200px;' value='/lattice/images/logoicon.png' ></input><button onclick='toolbox_data_column_js_open_img_list_dialog(\"toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_"+flowchart_id+data_row_id+"\");' type='button' value='选择图片' >选择图片</button></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈表情图片宽度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_width_"+flowchart_id+data_row_id+"' style='width:200px;' value='30' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈表情图片高度：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_height_"+flowchart_id+data_row_id+"' style='width:200px;' value='30' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈位置：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_position_my_"+flowchart_id+data_row_id+"' style='width:200px;' value='center bottom' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='必须填写两个字符串：第一个可以填写的字符串是（横向方向）: left, center, right。第二个可以填写的字符串是（纵向方向）: top, center, bottom。例子：left top 或者 center center 或者 right+10 top-25%'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>自定义反馈位置：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_position_at_"+flowchart_id+data_row_id+"' style='width:200px;' value='center bottom' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='必须填写两个字符串：第一个可以填写的字符串是（横向方向）: left, center, right。第二个可以填写的字符串是（纵向方向）: top, center, bottom。例子：left top 或者 center center 或者 right+10 top-25%'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>用户响应错误时的反馈文本内容：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_msgForWrongResult_"+flowchart_id+data_row_id+"' style='width:200px;' value='做错了！' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="<tr>";
	newcontent+=("<td>用户响应正确时的反馈文本内容：</td>");
	newcontent+=("<td><input type='text' id='toolbox_data_column_js_refreshRow_feedback_msgImage_msgForCorrectResult_"+flowchart_id+data_row_id+"' style='width:200px;' value='做对了！' ></input></td>");
	newcontent+=("<td><span><a class='opes2_tooltip' href='javascript:;' title='本条记录的详细信息说明，以及使用方法、例子等。例如：填写值为，含义为。'><img style='width:16px;height:16px;' src='imgs/help.png'></img></a></span></td>");
	newcontent+="</tr>";
	
	newcontent+="</table>";
	
	$('#toolbox_data_column_js_tab_row_feedback'+flowchart_id).html(newcontent);
	$('#toolbox_data_column_js_tab_row_feedback'+flowchart_id+' input').css({'height': '16px','width':'280px','padding':'6px 9px'});
	$('#toolbox_data_column_js_tab_row_feedback'+flowchart_id+' select').css({'height': '30px','width':'300px'});
	initialize_jqueryui_color_picker_for_inputs(['toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_'+flowchart_id+data_row_id]);
	$('#toolbox_data_column_js_refreshRowFeedbackSettings_table').footable();
	initialize_tooltips();
	$('#toolbox_data_column_js_tab_row_feedback'+flowchart_id+' td').css({'padding': '2px'});
	$('#toolbox_data_column_js_refreshRowFeedbackSettings_table tr').css({'display': 'table-row'});
	
	toolbox_data_column_js_bindActionToRowFeedbackSettingsFlag(flowchart_id,data_row_id);

	var data_row=toolbox_data_js_get_data_row(flowchart_id,data_row_id);
	if(data_row!=null)
	{
		if(typeof data_row.feedbackFlag != 'undefined')
		{
			$('#toolbox_data_column_js_refreshRow_feedbackFlag_'+flowchart_id+data_row_id).val(data_row.feedbackFlag);
			toolbox_data_column_js_bindActionToRowFeedbackSettingsFlagShowSpecifiedAction(flowchart_id,data_row_id,data_row.feedbackFlag);
			if(data_row.feedbackFlag==1)
			{
							
				if(typeof data_row.feedback.aliveTime != 'undefined')
				{
					$('#toolbox_data_column_js_refreshRow_feedback_aliveTime_'+flowchart_id+data_row_id).val(data_row.feedback.aliveTime);
				}
				//alert(data_row.feedback.feedback_cleanupAllColumnsWhenShowFeedback);
				if(typeof data_row.feedback.cleanupAllColumnsWhenShowFeedback != 'undefined')
				{
					$('#toolbox_data_column_js_refreshRow_feedback_cleanupAllColumnsWhenShowFeedback_'+flowchart_id+data_row_id).val(data_row.feedback.cleanupAllColumnsWhenShowFeedback?1:0);
				}
				if(typeof data_row.feedback.showUserResult != 'undefined')
				{
					$('#toolbox_data_column_js_refreshRow_feedback_showUserResult_'+flowchart_id+data_row_id).val(data_row.feedback.showUserResult?1:0);
				}
				if(typeof data_row.feedback.showCorrectResult != 'undefined')
				{
					$('#toolbox_data_column_js_refreshRow_feedback_showCorrectResult_'+flowchart_id+data_row_id).val(data_row.feedback.showCorrectResult?1:0);
				}
				if(typeof data_row.feedback.showMsg != 'undefined')
				{
					$('#toolbox_data_column_js_refreshRow_feedback_showMsg_'+flowchart_id+data_row_id).val(data_row.feedback.showMsg?1:0);
				}
				if(typeof data_row.feedback.showImage != 'undefined')
				{
					$('#toolbox_data_column_js_refreshRow_feedback_showImage_'+flowchart_id+data_row_id).val(data_row.feedback.showImage?1:0);
					if(data_row.feedback.showImage)
					{
						if(typeof data_row.feedback.msgImage.fontsize != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontsize_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.fontsize);
						}
						if(typeof data_row.feedback.msgImage.fontcolor != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.fontcolor);
						}
						if(typeof data_row.feedback.msgImage.imgForWrongResultSrc != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.imgForWrongResultSrc);
						}
						if(typeof data_row.feedback.msgImage.imgForCorrectResultSrc != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.imgForCorrectResultSrc);
						}
						if(typeof data_row.feedback.msgImage.width != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_width_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.width);
						}
						if(typeof data_row.feedback.msgImage.height != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_height_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.height);
						}
						if(typeof data_row.feedback.msgImage.position.my != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_my_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.position.my);
						}
						if(typeof data_row.feedback.msgImage.position.at != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_at_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.position.at);
						}
						if(typeof data_row.feedback.msgImage.msgForWrongResult != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForWrongResult_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.msgForWrongResult);
						}
						if(typeof data_row.feedback.msgImage.msgForCorrectResult != 'undefined')
						{
							$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForCorrectResult_'+flowchart_id+data_row_id).val(data_row.feedback.msgImage.msgForCorrectResult);
						}
					}
				}
			}
		}
	}
	
}
function toolbox_data_column_js_bindActionToRowFeedbackSettingsFlagShowSpecifiedAction(flowchart_id,data_row_id,selected)
{
	if(selected==1)
	{
		$('#toolbox_data_column_js_refreshRow_feedback_aliveTime_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_cleanupAllColumnsWhenShowFeedback_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showCorrectResult_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showUserResult_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showMsg_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showImage_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontsize_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_width_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_height_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_my_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_at_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForWrongResult_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForCorrectResult_'+flowchart_id+data_row_id).removeAttr("disabled");
	}else
	{
		$('#toolbox_data_column_js_refreshRow_feedback_aliveTime_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_cleanupAllColumnsWhenShowFeedback_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showCorrectResult_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showUserResult_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showMsg_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_showImage_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontsize_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_fontcolor_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForWrongResultSrc_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_imgForCorrectResultSrc_'+flowchart_id+data_row_id).removeAttr("disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_width_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_height_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_my_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_position_at_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForWrongResult_'+flowchart_id+data_row_id).attr("disabled","disabled");
		$('#toolbox_data_column_js_refreshRow_feedback_msgImage_msgForCorrectResult_'+flowchart_id+data_row_id).attr("disabled","disabled");
	}
}
function toolbox_data_column_js_onchangeForImageEnableOnclickEvent(flowchart_id,data_row_id,data_column_id)
{
	var enable=$('#toolbox_data_column_js_refreshColumn_image_enableOnclickEvent_'+flowchart_id+data_row_id+data_column_id).val();
	if(enable==1)
	{
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_onclickFunCode_'+flowchart_id+data_row_id+data_column_id).show();
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_'+flowchart_id+data_row_id+data_column_id).show();
		
	}else
	{
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_onclickFunCode_'+flowchart_id+data_row_id+data_column_id).hide();
		$('#STIMULATE_TYPE_IMAGE_toolbox_data_column_js_refreshColumn_image_useGlobalDefinedFunctionForOnclick_'+flowchart_id+data_row_id+data_column_id).hide();
	}
}
function toolbox_data_column_js_bindActionToRowFeedbackSettingsFlag(flowchart_id,data_row_id)
{
	$('#toolbox_data_column_js_refreshRow_feedbackFlag_'+flowchart_id+data_row_id).change(function()
	{
		var selected=$(this).children('option:selected').val();
		toolbox_data_column_js_bindActionToRowFeedbackSettingsFlagShowSpecifiedAction(flowchart_id,data_row_id,selected);
	});
}

function toolbox_data_column_js_open_img_list_dialog(inputIDToBeChanged)
{
	load_js_then_exec_func_util('js/framework/img_viewer.js','img_viewer_js_open_img_view_dialog',inputIDToBeChanged);
}
function toolbox_data_column_js_open_sound_list_dialog(inputIDToBeChanged)
{
	load_js_then_exec_func_util('js/framework/sound_viewer.js','sound_viewer_js_open_file_view_dialog',inputIDToBeChanged);
}
