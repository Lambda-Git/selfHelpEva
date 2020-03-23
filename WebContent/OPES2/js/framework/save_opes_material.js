var save_opes_material_js_vars={

};


function save_opes_material_js_addOPESMaterialOnlyaMaterial()
{
	var opes_material_list=save_opes_material_js_get_opes_material_list();
	if(opes_material_list.length==0)
	{
		//alert('注意,您的实验材料中没有选项设置');				
		//alert('opes_material_list.length==0, no need to addOPESMaterial');
		return;
	}
	var argsdata={taskid:initialize_ui_js_vars.taskid,opes_material_list:opes_material_list};
	var	data={clazz:'com.lattice.action.proxy.opes.materials.OPESMaterialsProxy',service:'addOPESMaterialOnlyaMaterial',args:JSON.stringify(argsdata)};

	var flowlist=initialize_ui_js_vars.flow_object_list;
	//alert(JSON.stringify(flowlist)); 
	var success=function(rdata){
		
	};
	invoke_proxy(data,success);


}

function save_opes_material_js_get_opes_material_list()
{
	var flowlist=initialize_ui_js_vars.flow_object_list;
	var opes_material_list=[];
	for(var i=0;i<flowlist.length;i++)
	{
		var flow=flowlist[i];
		if(flow.flowtype=='TOOLBOX_TYPE_DATA')
		{
			var data_row_list=flow.flowdata.data_row_list;
			for(var k=0;k<data_row_list.length;k++)
			{
				var sindata=data_row_list[k];
				if(sindata.responseType=='RESPONSE_TYPE_RADIOBUTTON'||sindata.responseType=='RESPONSE_TYPE_CHECKBOX')
				{
					
					var data_column_list=sindata.data_column_list;
					for(var i=0;i<data_column_list.length;i++)//there should be error when there are more than 1 STIMULATE_TYPE_RADIOBUTTON columns in 1 row
					{
						var column=data_column_list[i];
						//revised by Zhou Xinlin, adding the condition: STIMULATE_TYPE_CHECKBOX
						if(column.stimulateType=='STIMULATE_TYPE_RADIOBUTTON' || column.stimulateType=='STIMULATE_TYPE_CHECKBOX' )
						{
							var opes_material={};
							opes_material.userResult=sindata.userResult;
							opes_material.correctResult=sindata.correctResult;
							opes_material.rowType=sindata.rowType;
							opes_material.responseFlag=sindata.responseFlag;
							opes_material.id=sindata.id;//Note: there are maybe duplicate value here! e.g. 1 trial with 2 radio selection simulations. Suggest to use column.id (as column.id is unique from now).
							//alert("opes_material.id:"+opes_material.id+"|stimid="+stimid);
							
							var options=column.options;
							//opes_material.options=options;
							
							opes_material.radio1=save_opes_material_js_getOptionValue(options[0]);
							opes_material.radio2=save_opes_material_js_getOptionValue(options[1]);
							opes_material.radio3=save_opes_material_js_getOptionValue(options[2]);
							opes_material.radio4=save_opes_material_js_getOptionValue(options[3]);
							opes_material.radio5=save_opes_material_js_getOptionValue(options[4]);
							opes_material.radio6=save_opes_material_js_getOptionValue(options[5]);
							opes_material.radio7=save_opes_material_js_getOptionValue(options[6]);
							opes_material.radio8=save_opes_material_js_getOptionValue(options[7]);
							opes_material.radio9=save_opes_material_js_getOptionValue(options[8]);
							opes_material.radio10=save_opes_material_js_getOptionValue(options[9]);
							opes_material.radio11=save_opes_material_js_getOptionValue(options[10]);
							opes_material.radio12=save_opes_material_js_getOptionValue(options[11]);
							opes_material.radio13=save_opes_material_js_getOptionValue(options[12]);
							opes_material.radio14=save_opes_material_js_getOptionValue(options[13]);
							opes_material.radio15=save_opes_material_js_getOptionValue(options[14]);
							opes_material.radio16=save_opes_material_js_getOptionValue(options[15]);
							
							//alert(options.length+'_______'+opes_material.radio16);
							
							/*if(options.length==1)
							{
								opes_material.radio1=save_opes_material_js_getOptionValue(options[0]);
								opes_material.radio2='';
								opes_material.radio3='';
								opes_material.radio4='';
								opes_material.radio5='';
								opes_material.radio6='';
								opes_material.radio7='';
								opes_material.radio8='';
								opes_material.radio9='';
								opes_material.radio10='';
							}else if(options.length==2)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3='';
								opes_material.radio4='';
								opes_material.radio5='';
								opes_material.radio6='';
								opes_material.radio7='';
								opes_material.radio8='';
								opes_material.radio9='';
								opes_material.radio10='';
							}else if(options.length==3)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4='';
								opes_material.radio5='';
								opes_material.radio6='';
								opes_material.radio7='';
								opes_material.radio8='';
								opes_material.radio9='';
								opes_material.radio10='';
							}else if(options.length==4)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4=options[3].score;
								opes_material.radio5='';
								opes_material.radio6='';
								opes_material.radio7='';
								opes_material.radio8='';
								opes_material.radio9='';
								opes_material.radio10='';
							}else if(options.length==5)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4=options[3].score;
								opes_material.radio5=options[4].score;
								opes_material.radio6='';
								opes_material.radio7='';
								opes_material.radio8='';
								opes_material.radio9='';
								opes_material.radio10='';								
								//alert(opes_material.radio1);			
							}else if(options.length==6)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4=options[3].score;
								opes_material.radio5=options[4].score;
								opes_material.radio6=options[5].score;
								opes_material.radio7='';
								opes_material.radio8='';
								opes_material.radio9='';
								opes_material.radio10='';
								
							}else if(options.length==7)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4=options[3].score;
								opes_material.radio5=options[4].score;
								opes_material.radio6=options[5].score;
								opes_material.radio7=options[6].score;
								opes_material.radio8='';
								opes_material.radio9='';
								opes_material.radio10='';
								
							}else if(options.length==8)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4=options[3].score;
								opes_material.radio5=options[4].score;
								opes_material.radio6=options[5].score;
								opes_material.radio7=options[6].score;
								opes_material.radio8=options[7].score;
								opes_material.radio9='';
								opes_material.radio10='';
								
							}else if(options.length==9)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4=options[3].score;
								opes_material.radio5=options[4].score;
								opes_material.radio6=options[5].score;
								opes_material.radio7=options[6].score;
								opes_material.radio8=options[7].score;
								opes_material.radio9=options[8].score;
								opes_material.radio10='';
								
							}else if(options.length==10)
							{
								opes_material.radio1=options[0].score;
								opes_material.radio2=options[1].score;
								opes_material.radio3=options[2].score;
								opes_material.radio4=options[3].score;
								opes_material.radio5=options[4].score;
								opes_material.radio6=options[5].score;
								opes_material.radio7=options[6].score;
								opes_material.radio8=options[7].score;
								opes_material.radio9=options[8].score;
								opes_material.radio10=options[9].score;
								
							}else
							{
								alert('TODO for options.length='+options.length+' of prepare_opes_result_variable().');
							}*/
							opes_material_list.push(opes_material);
						}
					}
				}
			}
			
		}
		
	}
	
	return opes_material_list;
}


function save_opes_material_js_getOptionValue(option)
{
	var score=typeof(option)== 'undefined'?'':option.score;
	return score;
}


