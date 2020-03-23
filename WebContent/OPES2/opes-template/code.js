
function prepare_coded_params(coded)
{
	coded.params.funName='custom_code_sample_1';
	coded.params.code='var tempa="aaaa_aaa"; alert(tempa);';
}
function custom_code_sample_1()
{
	//below code will be replaced by coded.code string
	alert('custom_code_sample_1');
	
}
/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/

function code_(fundata,callbackargs)
{
	var temp_func_name=function(args){};
	temp_func_name = eval(fundata.funName);
	temp_func_name();
	
	//call next stage
	var callback=callbackargs.callback;
	exec_func_util(callback.func_name,callback.params,callback);
}