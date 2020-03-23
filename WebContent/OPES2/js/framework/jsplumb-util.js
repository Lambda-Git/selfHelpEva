
jsPlumb.ready(function() {

	 jsPlumb.importDefaults({  
         
	        DragOptions : { cursor: 'pointer', zIndex:2000 },  
	        PaintStyle:{   
	            strokeStyle:"#096EBB",
	            fillStyle:"transparent",  
	            radius: 2,  
	            lineWidth:3
	        },
	        Connector:[ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:4, alwaysRespectStubs:true } ],    
	        Endpoints : [ [ "Dot", { radius:4 } ], [ "Dot", { radius: 4 } ]],  
	        Anchors: [ "RightMiddle", "LeftMiddle" ],//连接点的默认位置  
	        maxConnections:1,
	        ConnectionOverlays : [  
	            [ "Arrow", { location:1 } ],  
	            [ "Label", {
	                location:0.1,
	                id:"label",
	                cssClass:"aLabel"
	            }]  
	        ]  
	    });

});



var connectorPaintStyle = {  
        lineWidth: 3,  
        strokeStyle: "#096EBB",// 096EBB
        joinstyle:"round"
        //outlineColor: "#096EBB",  
       // outlineWidth: 1
    };  
      
    var connectorHoverStyle = {  
        lineWidth: 3,
        strokeStyle: "#5C96BC"
        //outlineWidth: 2,
        //outlineColor:"white"
    };  
      
    var endpointHoverStyle = {  
        fillStyle:"#5C96BC"  
    };  
var sourceEndpoint= {  
    endpoint:"Dot",  
    paintStyle: { fillStyle:"#096EBB",radius: 4 },               
    isSource:true,  
    maxConnections:1,  
    connector:[ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:4, alwaysRespectStubs:true } ],                                                
    connectorStyle: connectorPaintStyle,  
    hoverPaintStyle: endpointHoverStyle,  
    connectorHoverStyle: connectorHoverStyle,  
    dragOptions:{},  
    overlays:[  
        [ "Label", {   
            location:[0.5, 1.5],   
            label:"",  
            cssClass:"endpointSourceLabel"   
        } ]  
    ]  
};
  
var targetEndpoint={  
    endpoint: "Dot",
    paintStyle: { fillStyle:"#096EBB",radius: 4 },
    hoverPaintStyle: endpointHoverStyle,
    maxConnections:1,
    dropOptions:{ hoverClass:"hover", activeClass:"active" },
    isTarget:true,            
    overlays:[  
        [ "Label", { location:[0.5, -0.5], label:"", cssClass:"endpointTargetLabel" } ]
    ]
};







var exampleDropOptions = {
		hoverClass:"dropHover",//释放时指定鼠标停留在该元素上使用的css class
		activeClass:"dragActive"//可拖动到的元素使用的css class
};

var	connectorHoverStyle = {
		lineWidth:4,
		strokeStyle:"#216477",
		outlineWidth:2,
		outlineColor:"white"
};
var	endpointHoverStyle = {
		fillStyle:"#216477",
		strokeStyle:"#216477"
};

var sourceEndpoint___ = {			
		endpoint:["Dot", { radius:8 }],//设置连接点的形状为圆形
		paintStyle:{ fillStyle:'#7AB02C' },//设置连接点的颜色
			isSource:true,	//是否可以拖动（作为连线起点）
		 scope:"green dot",//连接点的标识符，只有标识符相同的连接点才能连接
		 connectorStyle:{ strokeStyle:"#61B7CF", lineWidth:6 },//连线颜色、粗细
		 connector:[ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true } ],	
		 maxConnections:1,//设置连接点最多可以连接几条线
		 isTarget:true,	//是否可以放置（作为连线终点）
		 dropOptions : exampleDropOptions//设置放置相关的css
		 //connectorHoverStyle:connectorHoverStyle,
		 //hoverPaintStyle:endpointHoverStyle
};


var targetEndpoint___ = {			
		endpoint:["Dot", { radius:8 }],//设置连接点的形状为圆形
		paintStyle:{ fillStyle:'#7AB02C' },//设置连接点的颜色
		 isSource:true,	//是否可以拖动（作为连线起点）
		 scope:"green dot",//连接点的标识符，只有标识符相同的连接点才能连接
		 connectorStyle:{ strokeStyle:"#61B7CF", lineWidth:6 },//连线颜色、粗细
		 connector:[ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true } ],	
		 maxConnections:1,//设置连接点最多可以连接几条线
		 isTarget:true,	//是否可以放置（作为连线终点）
		 dropOptions : exampleDropOptions,//设置放置相关的css
		 connectorHoverStyle:connectorHoverStyle,
		 hoverPaintStyle:endpointHoverStyle
};





var	maxConnectionsCallback = function(info) 
{
	//info.connection.id
	//info.endpoint.id
	tips("无法添加连接，已经达最大连接个数！");
};



function addEndpointToFlowChart(windowid)
{

	
	
	var e1 = jsPlumb.addEndpoint(windowid, { anchor:"LeftMiddle" }, targetEndpoint);//将exampleEndpoint1类型的点绑定到id为state2的元素上
	e1.bind("maxConnections", maxConnectionsCallback);//也可以在加到元素上之后绑定函数
	var e2 = jsPlumb.addEndpoint(windowid, { anchor:"RightMiddle" }, sourceEndpoint);
	e2.bind("maxConnections", maxConnectionsCallback);//也可以在加到元素上之后绑定函数


	jsPlumb.draggable($('#'+windowid), { grid: [20, 20] });


	/*
var e1 = jsPlumb.addEndpoint("flowchartWindow2", { anchor:"LeftMiddle" }, exampleEndpoint1);//将exampleEndpoint1类型的点绑定到id为state2的元素上
e1.bind("maxConnections", maxConnectionsCallback);//也可以在加到元素上之后绑定函数

jsPlumb.addEndpoint("flowchartWindow1", exampleEndpoint1);//将exampleEndpoint1类型的点绑定到id为state1的元素上
jsPlumb.addEndpoint("flowchartWindow3", exampleEndpoint2);//将exampleEndpoint2类型的点绑定到id为state3的元素上
jsPlumb.addEndpoint("flowchartWindow2", {anchor:anchors}, exampleEndpoint2);//将exampleEndpoint2类型的点绑定到id为state1的元素上，指定活动连接点
	 */


}


function jsplumb_util_js_removeNode(toolid)
{
	//alert(toolid+" delete was clicked");
	//jsPlumb.empty(toolid);
	var removeNodeFun=function(toolid){
		jsPlumb.detachAllConnections(toolid);
		jsPlumb.remove(toolid);
		
		initialize_ui_js_deleteFlowObject(toolid);
        
		initialize_ui_js_vars.current_selected_tool_id='';
		initialize_ui_js_vars.current_selected_tool=null;
	};
	open_delete_confirm_dialog(removeNodeFun,toolid);
	
}

function jsplumb_util_js_removeNodeFromDeleteKeyEvent()
{
	var toolid=initialize_ui_js_vars.current_selected_tool_id;
	if(toolid!='')
	{
		jsplumb_util_js_removeNode(toolid);
	}
}
function jsplumb_util_js_openNodeFromEnterKeyEvent()
{
	var isOpen = $( "#delete_dialog_confirm" ).dialog( "isOpen" );//if the dialog has not been initialized, isOpen will be Object
	//alert(isOpen.toString()+'');
	if(isOpen===true)
	{
	}else
	{
		var toolid=initialize_ui_js_vars.current_selected_tool_id;
		var tool=initialize_ui_js_vars.current_selected_tool;
		if(toolid!=''&&tool!=null)
		{
			var js_file_name=tool.toolJSFile;
			var func_name=tool.toolEditorFunctionName;
			load_js_then_exec_func_util(js_file_name,func_name,toolid);
		}
	}
}







