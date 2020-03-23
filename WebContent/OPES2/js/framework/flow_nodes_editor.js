var flow_nodes_editor_js_vars={

};


function flow_nodes_editor_js_InitializeFlowNodes(taskid)
{
	var argsdata={taskid:taskid};
	var	data={clazz:'com.lattice.action.proxy.opes.EditTaskFlowProxy',service:'resolveAllFlows',args:JSON.stringify(argsdata)};
	var success=function(rdata){
		flow_nodes_editor_js_DrawFlowNodes(rdata);
	};
	invoke_proxy(data,success);

}

function flow_nodes_editor_js_DrawFlowNodes(nodesList)
{
	//alert(JSON.stringify(rdata));
	
	var prenode=null;
	for(var i=nodesList.length-1;i>=0;i--)
	{
		var node=nodesList[i];
		
		var position={};
		position.top=node.y;
		position.left=node.x;
		add_new_window(node.flowid,node.flowtype,position,node.flowtitle);
		
		var flow=initialize_ui_js_getFlowObject(node.flowid);
		//alert(JSON.stringify(node.flowdata));
		//$('body').append('<div id="aaaaa'+node.flowid+'"></div>');
		//$('#aaaaa'+node.flowid).html(JSON.stringify(node.flowdata));
		flow.flowdata=eval(node.flowdata);
		
		if(prenode!=null)
		{
			jsPlumb.connect({
				  source:prenode.flowid, 
				  target:node.flowid
			}); 
		}
		
		prenode=node;
	}


}

