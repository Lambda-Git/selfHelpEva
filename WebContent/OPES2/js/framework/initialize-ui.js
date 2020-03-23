
var initialize_ui_js_vars=
{
	taskid:0,
	initialize_ui_js_toolbox_list:[],
	current_dragged_tool_type:null,
	current_selected_tool_id:'',
	current_selected_tool:null,
	flow_object_list:[]
	
};
/*
 * flow object definition: should also be align with java class Flow
 * {
 * 	 flowid:0,
 *   flowtype:'',
 *   floworder:0,
 *   flowdata:{},
 *   flowtitle:'新建工具',
 *   x:0,
 *   y:0
 *   
 * }
 */



//Please register all the tools here
function register_tools_to_toolbox()
{
	register_toolbox('TOOLBOX_TYPE_START','js/framework/toolbox_start.js','toolbox_start_js_open_toolbox_start_editor','start33.png');
	register_toolbox('TOOLBOX_TYPE_END','js/framework/toolbox_end.js','toolbox_end_js_open_toolbox_end_editor','stop33.png');
	register_toolbox('TOOLBOX_TYPE_DATA','js/framework/toolbox_data.js','toolbox_data_js_open_toolbox_data_editor','table_48.png');
	//register_toolbox('TOOLBOX_TYPE_TEXT','js/framework/toolbox_text.js','toolbox_text_js_open_toolbox_text_editor','computer_48.png');
	//register_toolbox('TOOLBOX_TYPE_PIC','js/framework/toolbox_pic.js','toolbox_text_js_open_toolbox_text_editor','image_48.png');
	register_toolbox('TOOLBOX_TYPE_CODE','js/framework/toolbox_code.js','toolbox_code_js_open_toolbox_code_editor','paper_content_pencil_48.png');
	register_toolbox('TOOLBOX_TYPE_WAIT','js/framework/toolbox_wait.js','toolbox_wait_js_open_toolbox_wait_editor','time36.png');
	register_toolbox('TOOLBOX_TYPE_TIMER','js/framework/toolbox_timer.js','toolbox_timer_js_open_toolbox_timer_editor','time33.png');
	
}

/*
* Usage example: register_toolbox('TOOLBOX_TYPE_TEXT','../js/toolbox_text.js','open_toolbox_text_editor')
*/
function register_toolbox(toolTypeName,toolJSFile,toolEditorFunctionName,toolIconName)
{
	var newtool={};
	newtool.toolTypeName=toolTypeName;
	newtool.toolJSFile=toolJSFile;
	newtool.toolEditorFunctionName=toolEditorFunctionName;
	newtool.toolIconName=toolIconName;
	
	initialize_ui_js_vars.initialize_ui_js_toolbox_list.push(newtool);
}
function get_tool(toolTypeName)
{
	var restool=null;
	var toollist=initialize_ui_js_vars.initialize_ui_js_toolbox_list;
	for(var i=0;i<toollist.length;i++)
	{
		if(toollist[i].toolTypeName==toolTypeName)
		{
			restool=toollist[i];
			break;
		}
	}
	if(restool==null)
	{
		tips(toolTypeName+' has not been registered, please register first.');
	}
	return restool;
}
function initialize_leave_page_events()
{
	$(window).bind('beforeunload',function(){
		//return('请确保当前的实验设计数据已经保存，确定离开此页面吗？');
	});
}
function initialize_global_variables()
{
	var taskid = GetRequest().taskid;
	taskid = parseInt(taskid);
	taskid = isNaN(taskid) ? 0 : taskid;
	initialize_ui_js_vars.taskid=taskid;
	if(taskid==0)
	{
		tips('错误的任务ID！5秒后返回系统主页...');
		var goHome=function(){
			window.location.href='/lattice/';
		};
		window.setTimeout(goHome,5000);
	}else
	{
		load_js_then_exec_func_util('js/framework/flow_nodes_editor.js','flow_nodes_editor_js_InitializeFlowNodes',taskid);
	}
}
function initialize_toolbar()
{
	var content="";
	//content+="<a class='opes-toolbar'><img src='imgs/toolbar/save4.jpg' style='height:30px;width:30px;'></img></a>";
	content+="<a href='/lattice/' target='_self' class='opes-toolbar' title='主页'><img src='imgs/home_01.png' style='height:30px;width:30px;'></img></a>";
	content+="<a id='initialize_ui_js_toolbar_compile' class='opes-toolbar' title='编译'><img src='imgs/compile34.png' style='height:30px;width:30px;'></img></a>";
	content+="<a id='initialize_ui_js_toolbar_run' class='opes-toolbar' title='运行'><img src='imgs/run33.png' style='height:30px;width:30px;'></img></a>";
	content+="<a id='initialize_ui_js_toolbar_about' class='opes-toolbar' title='关于'><img src='imgs/questionmark_48.png' style='height:30px;width:30px;'></img></a>";
	content+="<a href='/lattice/Help2/Help2.html' target='_blank' class='opes-toolbar' title='帮助'><img src='imgs/help_doc.png' style='height:30px;width:30px;'></img></a>";
	content+="<a id='initialize_ui_js_toolbar_cloud' class='opes-toolbar' title='云测验'><img src='imgs/cloud33.png' style='height:30px;width:30px;'></img></a>";
	content+="<a href='/lattice/couser/modifyCollectiveInfo.jsp' target='_self' class='opes-toolbar' title='个人页'><img src='imgs/user33.png' style='height:30px;width:30px;'></img></a>";
	content+="<a id='initialize_ui_js_toolbar_systitle'style='margin-left:300px;font-size:16px;color:blue;'>多维心理在线实验设计系统</a>";
	$('#toolbar').html(content);
	$(".opes-toolbar").button({});
	$(".opes-toolbar").tooltip();
	
	//alert($('#toolbar').width());
	$('#initialize_ui_js_toolbar_systitle').css({'margin-left':($('#toolbar').width()-650)/2+'px'});
	
	$('#initialize_ui_js_toolbar_compile').click(function() {
		load_js_then_exec_func_util('js/framework/chart_to_code.js','chart_to_code_js_convert_chart_to_code');
	});
	$('#initialize_ui_js_toolbar_run').click(function() {
		load_js_then_exec_func_util('js/framework/page_preview.js','page_preview_js_preview_test');
	});
	$('#initialize_ui_js_toolbar_about').click(function() {
		load_js_then_exec_func_util('js/framework/opes_about.js','opes_about_js_open_about_dialog');
	});
	$('#initialize_ui_js_toolbar_cloud').click(function() {
		tips('Ongoing..');
	});
	
}
function reset_element_css_______()
{
	$('#center_div_id,#tab_1,#tab_2,#tab_3,#west_div_id').css({'padding':'0px'});
	$('#west_div_id').css({'width':'198px','background':'#EEE'});
	$('#north_div_id').css({'padding':'0px','border':'0px'});
	
	
}
function initialize_dragdrop_event()
{
	$(".system_toolbox_class div").draggable({
		//	use a helper-clone that is append to 'body' so is not 'contained' by a pane
			helper:	function () { return $(this).clone().appendTo('body').css('zIndex',5).show(); }
		,	cursor:	'move'
		, start: function( event, ui ) {
				//alert(event.target.id+'draggable');
				initialize_ui_js_vars.current_dragged_tool_type=event.target.id;
				//alert(initialize_ui_js_vars.current_dragged_tool_type);
			}
		, stop: function( event, ui ) {
				//alert(event.target.id+'draggable');
				
			}
		});

		$('#flow_designer_main').droppable({ 
		   accept:	'.system_toolbox_class div'
		,  drop:	function (event, ui) {
				//alert(event.target.id);
				var tooltype=initialize_ui_js_vars.current_dragged_tool_type;
				//alert(parseInt(ui.position.left)+'_____'+parseInt(ui.position.top))
				var flowchart_id='OPES_T'+get_max_value_for_toolid();
				var position=ui.position;
				var flowtitle=null;
				add_new_window(flowchart_id,tooltype,position,flowtitle);
			} 
		}); 
}
function initialize_layout()
{

	var myLayout=$('body').layout({ 
	applyDemoStyles: true,
	closable:true,
	resizable:true

	});
	
}

function initialize_tabs_______()
{
	$("#tabs_div").tabs({
			activate: function( event, ui ) 
			{
				 //alert(ui.newPanel.attr('id'));
				var tabid=ui.newPanel.attr('id');
				if(tabid==='tab_1')
				{
					load_js_then_exec_func_util('js/framework/code_to_chart.js','code_to_chart_js_convert_code_to_chart');
				}else if(tabid==='tab_2')
				{
					load_js_then_exec_func_util('js/framework/chart_to_code.js','chart_to_code_js_convert_chart_to_code');
				}else if(tabid==='tab_3')
				{
					load_js_then_exec_func_util('js/framework/page_preview.js','page_preview_js_preview_test');
				}
			}
	  }
	);
}


function initialize_toolbox()
{
	var content="";
	content+="<h3>";
	content+="<a href='#'><img src='imgs/start36.png' style='border:0px;width:24px;height:24px;vertical-align:middle;'></img>&nbsp;起始工具箱</a>";
	content+="</h3>";
	content+="<div class='system_toolbox_class' style='padding-top: 5px; padding-left: 10px;'>";
	content+="<div  id='TOOLBOX_TYPE_START' style='text-align:center;font-size:13px;'><img src='imgs/start34.png' style='border:0px;width:40px;height:40px;'></img><div></div><a href='javascript:;' >开始</a></div>";
	content+="<div  id='TOOLBOX_TYPE_END' style='text-align:center;font-size:13px;'><img src='imgs/stop33.png' style='border:0px;width:40px;height:40px;'></img><div></div><a href='javascript:;' >结束</a></div>";
	content+="</div>";
	
	content+="<h3>";
	content+="<a href='#'><img src='imgs/app_48.png' style='border:0px;width:24px;height:24px;vertical-align:middle;'></img>&nbsp;刺激工具箱</a>";
	content+="</h3>";
	content+="<div class='system_toolbox_class'  style='padding-top: 5px; padding-left: 10px;'>";
	content+="<div  id='TOOLBOX_TYPE_DATA' style='text-align:center;font-size:13px;'><img src='imgs/table_48.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >刺激</a></div>";
	content+="<div  id='TOOLBOX_TYPE_TEXT' style='text-align:center;font-size:13px;'><img src='imgs/computer_48.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >显示</a></div>";
	content+="<div  id='TOOLBOX_TYPE_PIC' style='text-align:center;font-size:13px;'><img src='imgs/image_add_48.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >图片</a></div>";
	content+="</div>";
	content+="<h3>";
	content+="<a href='#'><img src='imgs/hammer_screwdriver.png' style='border:0px;width:20px;height:20px;vertical-align:middle;'></img>&nbsp;代码工具箱</a>";
	content+="</h3>";
	content+="<div class='system_toolbox_class'  style='padding-top: 5px; padding-left: 10px;'>";
	content+="<div  id='TOOLBOX_TYPE_CODE' style='text-align:center;font-size:13px;'><img src='imgs/paper_content_pencil_48.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >程序</a></div>";
	content+="</div>";
	content+="<h3>";
	content+="<a href='#'><img src='imgs/time35.png' style='border:0px;width:24px;height:24px;vertical-align:middle;'></img>&nbsp;时间工具箱</a>";
	content+="</h3>";
	content+="<div class='system_toolbox_class'  style='padding-top: 5px; padding-left: 10px;'>";
	content+="<div  id='TOOLBOX_TYPE_WAIT' style='text-align:center;font-size:13px;'><img src='imgs/time36.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >休息等待</a></div>";
	content+="<div  id='TOOLBOX_TYPE_TIMER' style='text-align:center;font-size:13px;'><img src='imgs/time33.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >时间控制</a></div>";
	content+="</div>";
	
	content+="<h3>";
	content+="<a href='#'><img src='imgs/copy_1.jpg' style='border:0px;width:24px;height:24px;vertical-align:middle;'></img>&nbsp;备份工具箱</a>";
	content+="</h3>";
	content+="<div class='system_toolbox_class'  style='padding-top: 5px; padding-left: 10px;'>";
	content+="<div  id='TOOLBOX_TYPE_EXPORT' onclick='initialize_ui_js_export();' style='text-align:center;font-size:13px;'><img src='imgs/4297.gif' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >导出</a></div>";
	content+="<div  id='TOOLBOX_TYPE_IMPORT' onclick='initialize_ui_js_import();' style='text-align:center;font-size:13px;'><img src='imgs/update_icon2.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >导入</a></div>";
	content+="<div  id='TOOLBOX_TYPE_COPY' onclick='initialize_ui_js_copyStage();' style='text-align:center;font-size:13px;'><img src='imgs/copy.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >复制</a></div>";
	content+="<div  id='TOOLBOX_TYPE_PASTE' onclick='initialize_ui_js_pasteStage();' style='text-align:center;font-size:13px;'><img src='imgs/paste.png' style='border:0px;width:36px;height:36px;'></img><div></div><a href='javascript:;' >粘贴</a></div>";
	content+="</div>";
	
	$( "#accordion" ).html(content);
	$('.system_toolbox_class div').css( 'cursor', 'pointer' );
	
	$( "#accordion" ).accordion({
				collapsible: true,
				fillSpace: false,
				active: false,
				autoHeight: false,
				navigation: true
			}); 
	
}
function initialize_ui_js_export()
{
	load_js_then_exec_func_util('js/framework/toolbox_export_job.js','toolbox_export_job_js_downloadJob');
}
function initialize_ui_js_import()
{
	load_js_then_exec_func_util('js/framework/toolbox_import_job.js','toolbox_import_job_js_importJob');
}
function initialize_ui_js_copyStage()
{
	load_js_then_exec_func_util('js/framework/toolbox_copy_stage.js','toolbox_copy_stage_js_copyStage');
}
function initialize_ui_js_pasteStage()
{
	load_js_then_exec_func_util('js/framework/toolbox_paste_stage.js','toolbox_paste_stage_js_pasteStage');
}
function initialize_tooltips()
{
	$(".opes2_tooltip").tooltip({
		show : {
			effect : "slideDown",
			delay : 250
		},
		hide : {
			effect : "slideUp",
			delay : 250
		}
	});
}

function initialize_ui_js_getDefaulFlowTitleByToolType(tooltype)
{
	var flowtitle='';
	if(tooltype=='TOOLBOX_TYPE_START')
	{
		flowtitle='开始';
	}else if(tooltype=='TOOLBOX_TYPE_END')
	{
		flowtitle='结束';
	}else if(tooltype=='TOOLBOX_TYPE_DATA')
	{
		flowtitle='刺激系列';
	}else if(tooltype=='TOOLBOX_TYPE_CODE')
	{
		flowtitle='代码控制';
	}else if(tooltype=='TOOLBOX_TYPE_WAIT')
	{
		flowtitle='休息等待';
	}else if(tooltype=='TOOLBOX_TYPE_TIMER')
	{
		flowtitle='时间控制';
	}else
	{
		flowtitle=tooltype;
	}
	
	return flowtitle;
}
function add_new_window(flowchart_id,tooltype,position,flowtitle)
{
	if(flowtitle==null)
	{
		flowtitle=initialize_ui_js_getDefaulFlowTitleByToolType(tooltype);
	}
	var tool=get_tool(tooltype);
	if(tool==null)
	{
		return;
	}
	var tool_content='<div class="window" id="'+flowchart_id+'" style="line-height: 30px;margin-top:9px;">'+
						'<img src="imgs/'+tool.toolIconName+'" style="border:0px;width:36px;height:36px;line-height: 30px;margin-top:9px;"></img>'+
						'<br><span id="flowchart_tool_title_'+flowchart_id+'" style="margin-top:20px;">'+flowtitle+'</span>'+
					 '</div>';
	$('#flowchart-demo').append(tool_content);
	$('#'+flowchart_id).css({'top':position.top-100,'left':position.left-170});
	
	addEndpointToFlowChart(flowchart_id);
	initialize_ui_js_addFlowObject(flowchart_id,tooltype,flowtitle);
	
	$("#"+flowchart_id).dblclick(function()
	{
			var js_file_name=tool.toolJSFile;
			var func_name=tool.toolEditorFunctionName;
			load_js_then_exec_func_util(js_file_name,func_name,flowchart_id);
	
	
	});
	
	$("#"+flowchart_id).click(function()
	{
		var flowlist=initialize_ui_js_vars.flow_object_list;
		for(var i=0;i<flowlist.length;i++)
		{
			var flow=flowlist[i];
			var flowid=flow.flowid;
			$('#'+flowid).css({'background-color':'#EEEEEF'});
		}
		
		$('#'+flowchart_id).css({'background-color':'#BCEE68'});
		initialize_ui_js_vars.current_selected_tool_id=flowchart_id;
		initialize_ui_js_vars.current_selected_tool=tool;
	});
	register_context_menu_to_tools(tool,flowchart_id);
}

//calculate the max OPES_T order
function get_max_value_for_toolid()
{
	if(initialize_ui_js_vars.flow_object_list.length==0)
	{
		return 1;
	}else
	{
		var max=-1;
		var flowlist=initialize_ui_js_vars.flow_object_list;
		for(var i=0;i<flowlist.length;i++)
		{
			var flow=flowlist[i];
			var flowid=flow.flowid;
			var intid=parseInt(flowid.split('OPES_T')[1]);
			//alert(flowid.split('OPES_T')[1]+'=========='+flowid.split('OPES_T').length);
			if(intid>max)
			{
				max=intid;
			}
		}
		//alert(max+1);
		return max+1;
	}
}

function register_context_menu_to_tools(tool,toolid)
{
	$.contextMenu({
        selector: '#'+toolid, 
        callback: function(key, options) {
           //alert(toolid+" "+key);
        },
        items: {
        	"sep0": "-----------------",
            "select": {
                name: "选中", 
                icon: "copy", 
                callback: function(key, options) {
                	var flowlist=initialize_ui_js_vars.flow_object_list;
            		for(var i=0;i<flowlist.length;i++)
            		{
            			var flow=flowlist[i];
            			var flowid=flow.flowid;
            			$('#'+flowid).css({'background-color':'#EEEEEF'});
            		}
            		$('#'+toolid).css({'background-color':'#BCEE68'});
            		initialize_ui_js_vars.current_selected_tool_id=toolid;
            		initialize_ui_js_vars.current_selected_tool=tool;
                }
            },
            "sep1": "-----------------",
            "edit": {
                name: "打开", 
                icon: "edit", 
                callback: function(key, options) {
                	var js_file_name=tool.toolJSFile;
        			var func_name=tool.toolEditorFunctionName;
        			load_js_then_exec_func_util(js_file_name,func_name,toolid);
                }
            },
            "sep2": "-----------------",
            "delete": {
                name: "删除", 
                icon: "delete", 
                callback: function(key, options) {
                   jsplumb_util_js_removeNode(toolid);
                }
            },
            "sep3": "-----------------",
            "copy": {
                name: "复制", 
                icon: "copy", 
                callback: function(key, options) {
                	//alert(JSON.stringify({key:key,options:options}));
                	load_js_then_exec_func_util("js/framework/toolbox_data_copy.js","toolbox_data_copy_js_copyData",{toolid:toolid});
                }
            },
            "sep4": "-----------------"
        }
    });
}
function initialize_keyboard_events()
{
	Mousetrap.bind('del', jsplumb_util_js_removeNodeFromDeleteKeyEvent);
	Mousetrap.bind('enter', jsplumb_util_js_openNodeFromEnterKeyEvent);
}

/*********************flow object functions************************/
function initialize_ui_js_addFlowObject(flowid,tooltype,flowtitle)
{
	var flow={};
	flow.flowid=flowid;
	flow.flowtitle=flowtitle;
	flow.flowtype=tooltype;
	flow.floworder=0;
	flow.flowdata={};
	
	initialize_ui_js_vars.flow_object_list.push(flow);
	
}
function initialize_ui_js_getFlowObject(flowid)
{
	var res=null;
	var flowlist=initialize_ui_js_vars.flow_object_list;
	for(var i=0;i<flowlist.length;i++)
	{
		if(flowlist[i].flowid==flowid)
		{
			res=flowlist[i];
			break;
		}
	}
	return res;
}
function initialize_ui_js_deleteFlowObject(flowid)
{
	var delete_index=-1;
	var flowlist=initialize_ui_js_vars.flow_object_list;
	for(var i=0;i<flowlist.length;i++)
	{
		if(flowlist[i].flowid==flowid)
		{
			delete_index=i;
			break;
		}
	}
	flowlist.splice(delete_index, 1);
}