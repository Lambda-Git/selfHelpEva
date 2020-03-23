var page_preview_js_vars={
		
};


function page_preview_js_preview_test()
{
	//TODO: 如果第一个测验编译通过，后面的都会通过
	if(typeof chart_to_code_js_vars == 'undefined'|| chart_to_code_js_vars==null || !chart_to_code_js_vars.compileFlag)
	{
		tips('请先点击编译按钮编译测验设计和代码！');
	}else
	{
		var flowlist=initialize_ui_js_vars.flow_object_list;
		//alert(JSON.stringify(flowlist));
		var argsdata={designData:{flowList:flowlist},taskid:initialize_ui_js_vars.taskid};
		var	data={clazz:'com.lattice.action.proxy.opes.CompileRunProxy',service:'compileRun',args:JSON.stringify(argsdata)};
		var success=function(rdata){
			if(rdata.code==1)
			{
				window.open(rdata.url);
			}else
			{
				tips('编译返回代码：'+rdata.code+'，编译信息：'+rdata.msg);
			}
			
		};
		invoke_proxy(data,success);
		
		load_js_then_exec_func_util('js/framework/save_opes_material.js','save_opes_material_js_addOPESMaterialOnlyaMaterial',{});
		
	}
	
}


