
/***********************************BELOW_SECTION_IS_USED_FOR_TEMPLATE**********************/
var opes_result_data={
		taskid:-1,
		projectid:-1,
		coid:0,
		redirectURLAfterPostResult:''
};



function post_result()
{
	//clear up all the timeout IDs for all the data rows
	//NOTE:!!! The start point name sometimes if not OPES_T1 (e.g. if delete the start and then add it)
	//TODO: use OPES_T_START instead. (pre-check if it is defined for old tests). see source code of the web page to check if this OPES_T_START is defined.
	prepare_opes_result_js_clearAllTimeOutIDs(OPES_T1);

	//$('body').html(JSON.stringify(OPES_T1));
	//	return;

	//先暂时屏蔽
	//prepare_opes_results_js_saveFileToLocal();

	var argsdata={};
	var	data={clazz:'com.lattice.action.proxy.opes.page.redirect.PageRedirectProxy',service:'getRedirectURL',args:JSON.stringify(argsdata)};

	//$('body').html('正在提交数据，第一阶段（获取返回的URL）请稍等...');
	//$('body').html(JSON.stringify(OPES_T1));
	//return;

	var success=function(rdata){
		opes_result_data.coid=rdata.coid;
		opes_result_data.taskid=rdata.taskid;
		opes_result_data.projectid=rdata.projectid;
		if(GetRequest().targetpagename!=null)
		{
			opes_result_data.redirectURLAfterPostResult=GetRequest().targetpagename;
		}else
		{
			opes_result_data.redirectURLAfterPostResult=rdata.url;
		}
		
		//alert(opes_result_data.redirectURLAfterPostResult);
		parepare_and_post();
	};
	invoke_proxy(data,success);
}

function parepare_and_post()
{
	//NOTE:!!! The start point name sometimes if not OPES_T1 (e.g. if delete the start and then add it)
	//$('body').html(JSON.stringify(OPES_T1));

	var all_data=prepare_opes_all_data_from_flows(OPES_T1);
	all_data=prepare_opes_results_js_filterHasBeenShownOnScreenRows(all_data);
	all_data=prepare_opes_results_js_filterNoUserResultRows(all_data);
	prepare_opes_results_js_changeUnresponsedUsertimeToZeroRows(all_data);
	prepare_opes_result_variable(all_data);
	prepare_opes_result_data();

	//$('body').html(JSON.stringify({OPES_T1:OPES_T1,all_data:all_data,opes_result_data:opes_result_data}));
	//return;

	$.ajax({
		type:"POST",
		async:true,
		cache: false,
		//dataType:"json",//which is expected from the sever
		url:"/lattice/OPESHandler?type=formal",
		data:opes_result_data,
		beforeSend:function(XMLHttpRequestObject)
		{
			$('body').html('正在提交数据，第二阶段（提交结果数据）请稍等...');
		},
		success:function(rdata, textStatus, XMLHttpRequest)
		{
		},
		complete:function(jqXHR,textStatus)
		{
			//as this is ajax call, so the OPESHandler redirect will not use.
			window.location.href=opes_result_data.redirectURLAfterPostResult;
		}
	});
}
/*
 * one test may contains several data tool, as OPESHandler can only accept one data array, combine all data
 */
function prepare_opes_all_data_from_flows(OPES_T1)
{
	//var blockSize_Accumulate=0;
	var all_data=[];
	var tempcallback=OPES_T1;
	//as the stimid=rowid, if there are 2 data_, the rowid are duplicate, make sure the stimid are unique, will reset the rowid
	//var temp_stimid=1;
	while((tempcallback)!=null)
	{
		if(tempcallback.func_name=='data_')
		{
			var rowList=tempcallback.params.data_row_list;

			for(var i=0;i<rowList.length;i++)
			{
				if(rowList[i].logResultFlag==1 && rowList[i].hasBeenShownOnScreen==true)
				{
					var sindata=rowList[i];

					/*sindata.id=temp_stimid;
					temp_stimid++;
					*/

					//sindata.id=rowList[i].id+blockSize_Accumulate;

					/*
					sindata.answer=rowList[i].correctResult;
					sindata.user_answer=rowList[i].userResult;
					sindata.rowType=rowList[i].rowType;
					*/
					all_data.push(sindata);
				}
			}

			//blockSize_Accumulate=blockSize_Accumulate+rowList.length;

		}

		tempcallback=tempcallback.callback;
	}

	return all_data;

}
//clear all timeout id before post the result
function prepare_opes_result_js_clearAllTimeOutIDs(OPES_T1)
{
	var tempcallback=OPES_T1;
	while((tempcallback)!=null)
	{
		if(tempcallback.func_name=='data_')
		{
			var rowList=tempcallback.params.data_row_list;
			
			for(var i=0;i<rowList.length;i++)
			{
				var current_row=rowList[i];
				if(current_row.rowTimeoutID!=null)
				{
					clearTimeout(current_row.rowTimeoutID);
					console.log('Clean up current_row.rowTimeoutID='+current_row.rowTimeoutID);
				}
				if(current_row.timeoutIDForRowFeedbackAliveTime!=null)
				{
					clearTimeout(current_row.timeoutIDForRowFeedbackAliveTime);
					console.log('Clean up current_row.timeoutIDForRowFeedbackAliveTime='+current_row.timeoutIDForRowFeedbackAliveTime);
				}

				var data_column_list=current_row.data_column_list;
				for(var c=0;c<data_column_list.length;c++)
				{
					var column=data_column_list[c];
					if(column.timeoutIDForDelayTime!=null)
					{
						clearTimeout(column.timeoutIDForDelayTime);
						console.log('Clean up column.timeoutIDForDelayTime='+column.timeoutIDForDelayTime);
					}
					if(column.timeoutIDForAliveTime!=null)
					{
						clearTimeout(column.timeoutIDForAliveTime);
						console.log('Clean up column.timeoutIDForAliveTime='+column.timeoutIDForAliveTime);
					}
				}
			}
		}
		tempcallback=tempcallback.callback;
	}
}

function add_result(key, value)
{
	opes_result_data[key]=value;
}
function prepare_opes_results_js_filterNoUserResultRows(all_data)
{
	var new_all_data=[];
	for(var i=0;i<all_data.length;i++)
	{
		var sindata=all_data[i];

		if(typeof(sindata.userResult) =="undefined" ||sindata.userResult==null)
		{
			//why ignore this row? someone report if we define custom code exist when wrong 3 rows, but it finally collect 4 rows, last row userResult is null.
		}else
		{
			new_all_data.push(sindata);
		}
	}
	return new_all_data;
}
function prepare_opes_results_js_filterHasBeenShownOnScreenRows(all_data)
{
	var new_all_data=[];
	for(var i=0;i<all_data.length;i++)
	{
		var sindata=all_data[i];

		if(typeof(sindata.hasBeenShownOnScreen) =="undefined" || sindata.hasBeenShownOnScreen)
		{
			new_all_data.push(sindata);
		}
	}
	return new_all_data;
}
function prepare_opes_results_js_changeUnresponsedUsertimeToZeroRows(all_data)
{
	for(var i=0;i<all_data.length;i++)
	{
		var sindata=all_data[i];
		if(sindata.userResult==null||sindata.userResult=='')
		{
			sindata.responseDuration=0;
		}
	}
}
function prepare_opes_result_variable(all_data)
{
	add_result("taskid", opes_result_data.taskid);
	add_result("sumitcoids", opes_result_data.coid);
	add_result("targetpagename", 'targetpagename');
	add_result("taskIdentifier", 'crt');
	add_result("projectid", opes_result_data.projectid);

	test_begin_ime=getTimestamp();
	rc_key=[];
	rc_time=[];
	eventonset=[];
	correct_result=[];
	type4All=[];//rowType
	stimidAll=[];//rowid
	//currently we have 4 types for OPES2
	buttonSetAll=[];//keyboard, e.g. P Q
	numberSetAll=[];//integer input
	commentSetAll=[];//text input
	radioSetAll=[];//radiobox and checkbox

	radiolist1setAll = [];//score list for one stimulate/row
	radiolist2setAll = [];
	radiolist3setAll = [];
	radiolist4setAll = [];
	radiolist5setAll = [];
	radiolist6setAll = [];
	radiolist7setAll = [];
	radiolist8setAll = [];
	radiolist9setAll = [];
	radiolist10setAll = [];

	for(var i=0;i<all_data.length;i++)
	{
		var sindata=all_data[i];
		rc_key.push(sindata.userResult);

		rc_time.push(sindata.responseDuration);
		eventonset.push(sindata.eventOnset);

		correct_result.push(sindata.correctResult);
		type4All.push(sindata.rowType);
		stimidAll.push(sindata.id);

		//alert(sindata.responseType);
		//alert(sindata.responseDuration);
		//alert(sindata.correctResult);

		if(sindata.responseType=='RESPONSE_TYPE_RADIOBUTTON'||sindata.responseType=='RESPONSE_TYPE_CHECKBOX')
		{
			//sindata.options=rowList[i].options;
			radioSetAll.push(sindata.userResult);
			numberSetAll.push(sindata.userResult);
			commentSetAll.push(sindata.comment);
			buttonSetAll.push(sindata.userResult);

			//radioSetAll.push('');
			//numberSetAll.push(sindata.userResult);
			//commentSetAll.push('');
			//buttonSetAll.push('');


			var data_column_list=sindata.data_column_list;
			for(var k=0;k<data_column_list.length;k++)//there should be error when there are more than 1 STIMULATE_TYPE_RADIOBUTTON columns in 1 row
			{
				var column=data_column_list[k];
				if(column.stimulateType=='STIMULATE_TYPE_RADIOBUTTON')
				{
					var options=column.options;
					//alert(options.length);
					//return;
					if(options.length==1)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push('');
						radiolist3setAll.push('');
						radiolist4setAll.push('');
						radiolist5setAll.push('');
						radiolist6setAll.push('');
						radiolist7setAll.push('');
						radiolist8setAll.push('');
						radiolist9setAll.push('');
						radiolist10setAll.push('');
					}else if(options.length==2)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push('');
						radiolist4setAll.push('');
						radiolist5setAll.push('');
						radiolist6setAll.push('');
						radiolist7setAll.push('');
						radiolist8setAll.push('');
						radiolist9setAll.push('');
						radiolist10setAll.push('');

					}else if(options.length==3)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push('');
						radiolist5setAll.push('');
						radiolist6setAll.push('');
						radiolist7setAll.push('');
						radiolist8setAll.push('');
						radiolist9setAll.push('');
						radiolist10setAll.push('');
					}else if(options.length==4)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push(options[3].score);
						radiolist5setAll.push('');
						radiolist6setAll.push('');
						radiolist7setAll.push('');
						radiolist8setAll.push('');
						radiolist9setAll.push('');
						radiolist10setAll.push('');
					}else if(options.length==5)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push(options[3].score);
						radiolist5setAll.push(options[4].score);
						radiolist6setAll.push('');
						radiolist7setAll.push('');
						radiolist8setAll.push('');
						radiolist9setAll.push('');
						radiolist10setAll.push('');
					}else if(options.length==6)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push(options[3].score);
						radiolist5setAll.push(options[4].score);
						radiolist6setAll.push(options[5].score);
						radiolist7setAll.push('');
						radiolist8setAll.push('');
						radiolist9setAll.push('');
						radiolist10setAll.push('');

					}else if(options.length==7)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push(options[3].score);
						radiolist5setAll.push(options[4].score);
						radiolist6setAll.push(options[5].score);
						radiolist7setAll.push(options[6].score);
						radiolist8setAll.push('');
						radiolist9setAll.push('');
						radiolist10setAll.push('');
					}else if(options.length==8)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push(options[3].score);
						radiolist5setAll.push(options[4].score);
						radiolist6setAll.push(options[5].score);
						radiolist7setAll.push(options[6].score);
						radiolist8setAll.push(options[7].score);
						radiolist9setAll.push('');
						radiolist10setAll.push('');
					}else if(options.length==9)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push(options[3].score);
						radiolist5setAll.push(options[4].score);
						radiolist6setAll.push(options[5].score);
						radiolist7setAll.push(options[6].score);
						radiolist8setAll.push(options[7].score);
						radiolist9setAll.push(options[8].score);
						radiolist10setAll.push('');
					}else if(options.length==10)
					{
						radiolist1setAll.push(options[0].score);
						radiolist2setAll.push(options[1].score);
						radiolist3setAll.push(options[2].score);
						radiolist4setAll.push(options[3].score);
						radiolist5setAll.push(options[4].score);
						radiolist6setAll.push(options[5].score);
						radiolist7setAll.push(options[6].score);
						radiolist8setAll.push(options[7].score);
						radiolist9setAll.push(options[8].score);
						radiolist10setAll.push(options[9].score);
					}else
					{
						alert('TODO for options.length='+options.length+' of prepare_opes_result_variable().');
					}
				}else if(column.stimulateType=='RESPONSE_TYPE_CHECKBOX')
				{
					//RESPONSE_TYPE_CHECKBOX no need to calculate score
				}
			}

		}else
		{
			radiolist1setAll.push('');
			radiolist2setAll.push('');
			radiolist3setAll.push('');
			radiolist4setAll.push('');
			radiolist5setAll.push('');
			radiolist6setAll.push('');
			radiolist7setAll.push('');
			radiolist8setAll.push('');
			radiolist9setAll.push('');
			radiolist10setAll.push('');
		}
		if(sindata.responseType=='RESPONSE_TYPE_INPUT')
		{
			var inputType=prepare_opes_result_getInputType(sindata);
			//alert(inputType);
			if(inputType=='INPUT_TYPE_NUMBER')
			{
				radioSetAll.push('');
				numberSetAll.push(sindata.userResult);
				commentSetAll.push(sindata.comment);
				buttonSetAll.push('');
			}else if(inputType=='INPUT_TYPE_TEXT')
			{
				radioSetAll.push('');
				numberSetAll.push('');
				commentSetAll.push(sindata.comment);
				buttonSetAll.push(sindata.userResult);
			}else if(inputType=='INPUT_TYPE_COMMENTS')
			{
				radioSetAll.push('');
				numberSetAll.push('');
				commentSetAll.push(sindata.comment);
				buttonSetAll.push('');
			}else
			{
				radioSetAll.push('CAN_NOT_FIND_CORRECT_INPUT_TYPE');
				numberSetAll.push('CAN_NOT_FIND_CORRECT_INPUT_TYPE');
				commentSetAll.push('CAN_NOT_FIND_CORRECT_INPUT_TYPE');
				buttonSetAll.push('CAN_NOT_FIND_CORRECT_INPUT_TYPE');
			}
		}

		if(sindata.responseType=='RESPONSE_TYPE_SINGLEKEY')
		{
			buttonSetAll.push(sindata.userResult);
			commentSetAll.push(sindata.comment);
			numberSetAll.push('');
			radioSetAll.push('');
		}
		if(sindata.responseType=='RESPONSE_TYPE_TEXTAREA')
		{
			buttonSetAll.push('');
			numberSetAll.push('');
			commentSetAll.push(sindata.comment);
			radioSetAll.push('');
		}

	}



}

function prepare_opes_result_getInputType(dataRow)
{
	var inputType=null;
	var data_column_list=dataRow.data_column_list;
	for(var k=0;k<data_column_list.length;k++)//there should be error when there are more than 1 STIMULATE_TYPE_INPUT columns in 1 row
	{
		var column=data_column_list[k];
		//alert(column.inputType+'___'+(column.stimulateType=='STIMULATE_TYPE_INPUT'))
		if(column.stimulateType=='STIMULATE_TYPE_INPUT')
		{
			inputType=column.inputType;
			break;
		}
	}
	if(inputType==null)
	{
		tips('实验设置错误：实验相应设置为RESPONSE_TYPE_INPUT，但是在实验里面没有设置STIMULATE_TYPE_INPUT！刺激行号：ROWID='+dataRow.id);
	}
	return inputType;
}
/*****this function is leave unchanged, copied from cftF.jsp********/
function prepare_opes_result_data()
{
	add_result("user_result", rc_key.join(';'));
	add_result("user_time", rc_time.join(';'));
	add_result("eventonsetset", eventonset.join(';'));

	add_result("correct_result", correct_result.join(';'));
	add_result("duration", getTimestamp() - test_begin_ime);

	var type4set = type4All.join(";");
	var stimidset = stimidAll.join(";");
	var correctanswerset = correct_result.join(";");
	var buttonset = rc_key.join(";");
	var timeset = rc_time.join(";");
	var eventonsetset = eventonset.join(";");
	var timeaverage = getTimestamp() - test_begin_ime;
	add_result("type4set", type4set);
	add_result("stimidset", stimidset);
	add_result("correctanswerset", correctanswerset);
	add_result("buttonset", buttonset);
	add_result("timeset", timeset);
	add_result("eventonsetset", eventonsetset);

	add_result("timeaverage", timeaverage);
	var numset = numberSetAll.join(";");
	var radioset = radioSetAll.join(";");
	var commentset = commentSetAll.join(";");
	add_result("numset", numset);
	add_result("radioset", radioset);
	add_result("commentset", commentset);
	var radiolist1set = radiolist1setAll.join(";");//score list for one stimulate/row
	var radiolist2set = radiolist2setAll.join(";");
	var radiolist3set = radiolist3setAll.join(";");
	var radiolist4set = radiolist4setAll.join(";");
	var radiolist5set = radiolist5setAll.join(";");
	var radiolist6set = radiolist6setAll.join(";");
	var radiolist7set = radiolist7setAll.join(";");
	var radiolist8set = radiolist8setAll.join(";");
	var radiolist9set = radiolist9setAll.join(";");
	var radiolist10set = radiolist10setAll.join(";");

	var countOfCorrectNumber_ByType = getCorrectCountSortByType(
			numset, correctanswerset, type4set);
	var countOfCorrectButton_ByType = getCorrectCountSortByType(
			buttonset, correctanswerset, type4set);
	var countOfCorrectRadio_ByType = getCorrectCountSortByType(
			radioset, correctanswerset, type4set);
	var countOfCorrectButton_ByType_Corrected = getCorrectCountSortByType_Corrected(
			buttonset, correctanswerset, type4set);
	var percentageCorrectNumber_ByType = getPercentageCorreceSortByType(
			numset, correctanswerset, type4set);
	var percentageCorrectButton_ByType = getPercentageCorreceSortByType(
			buttonset, correctanswerset, type4set);
	var percentageCorrectRadio_ByType = getPercentageCorreceSortByType(
			radioset, correctanswerset, type4set);
	var meanNumber_ByType = getMeanSortByType(numset, type4set);
	var sumNumber_ByType = getSumSortByType(numset, type4set);
	var meanRT_ByType = getMeanSortByType(timeset, type4set);
	var meanDeviationNumber_ByType = getMeanDeviationSortByType(
			numset, correctanswerset, type4set);
	var sumWeightedRadio_ByType = getWeightedScoreSortByType(
			radioset, type4set, radiolist1set, radiolist2set,
			radiolist3set, radiolist4set, radiolist5set,
			radiolist6set, radiolist7set, radiolist8set,
			radiolist9set, radiolist10set);
	var type4_Unique = getType(type4set);


	var medianRTButton_ByType_Corrected = getMedianSortByType_Corrected(						buttonset, correctanswerset, timeset, type4set);
	add_result("medianRTButton_ByType_Corrected",						medianRTButton_ByType_Corrected);
	add_result("countOfCorrectNumber_ByType",
			countOfCorrectNumber_ByType);
	add_result("countOfCorrectButton_ByType",
			countOfCorrectButton_ByType);
	add_result("countOfCorrectRadio_ByType",
			countOfCorrectRadio_ByType);
	add_result("countOfCorrectButton_ByType_Corrected",
			countOfCorrectButton_ByType_Corrected);
	add_result("percentageCorrectNumber_ByType",
			percentageCorrectNumber_ByType);
	add_result("percentageCorrectButton_ByType",
			percentageCorrectButton_ByType);
	add_result("percentageCorrectRadio_ByType",
			percentageCorrectRadio_ByType);
	add_result("meanNumber_ByType", meanNumber_ByType);
	add_result("sumNumber_ByType", sumNumber_ByType);
	add_result("meanRT_ByType", meanRT_ByType);
	add_result("meanDeviationNumber_ByType",
			meanDeviationNumber_ByType);
	add_result("sumWeightedRadio_ByType", sumWeightedRadio_ByType);
	add_result("type4_Unique", type4_Unique);

	//document.getElementById("result").submit();

}

function prepare_opes_results_js_saveFileToLocal()
{
	var now = new Date();
	var currentTS=now.getTime()
	var currentDate=$.datepicker.formatDate('yy-mm-dd', new Date());
	var currentTime=$.datepicker.formatDate('hh:mm:ss', new Date());

	var url=window.location.href;//http://localhost:8080/lattice/experiments/opes2/36/3995/3995.html
	var paths = url.split("/");
	var uid=paths[paths.length-3];
	var taskid=paths[paths.length-2];

	var fileName='opes_local_results_'+uid+'_'+taskid+'_'+currentDate+'_'+currentTS+".csv";
	//alert(fileName);

	var tempRawDataAndResults=prepare_opes_results_js_getResultContent();

	if($.browser.msie)
	{
		//TODO, use IE object active ? need to discuss later.
		saveTextAs(tempRawDataAndResults, fileName);
	}else
	{
		var file = new Blob([tempRawDataAndResults], {type: "text/plain;charset=utf-8"});
		saveAs(file, fileName);
	}
}

function prepare_opes_results_js_getResultContent()
{
	var content="";

	var all_data=prepare_opes_all_data_from_flows(OPES_T1);
	all_data=prepare_opes_results_js_filterHasBeenShownOnScreenRows(all_data);
	prepare_opes_results_js_changeUnresponsedUsertimeToZeroRows(all_data);
	prepare_opes_result_variable(all_data);
	prepare_opes_result_data();

	var currentDateTime= new Date().format("yyyy-MM-dd hh:mm:ss");
	//alert(currentDateTime);
	var url=window.location.href;//http://localhost:8080/lattice/experiments/opes2/36/3995/3995.html?projectid=1284
	var paths = url.split("/");
	var uid=paths[paths.length-3];
	var taskid=paths[paths.length-2];
	var projectid = GetRequest().projectid;


	var head="Sub-Collective,Resultid,Userid,Username,Realname,Taskid,Radioset,Buttonset,Numberset,Commentset,Timeset,Correctanswerset,Timeraverage,Average,Testtime,Stimidset,Istest,Duration,Userage,Adminflag,Numberofcorrecttrial,Originalscore,Standardscore,Percentile,Stannine,Type4set,Charge,ProjectID,Experimenterid,Eventonsetset";
	content+=head+"\n";

	var tempRawDataAndResults=JSON.stringify(opes_result_data);
	//content+=tempRawDataAndResults+"\n";

	content+="0,";
	content+="0,";
	content+=uid+",";
	content+="0,";
	content+="0,";
	content+=taskid+",";

	content+=opes_result_data.radioset+",";
	content+=opes_result_data.buttonset+",";
	content+=opes_result_data.numset+",";
	content+=opes_result_data.commentset+",";
	content+=opes_result_data.timeset+",";
	content+=opes_result_data.correctanswerset+",";
	content+=opes_result_data.timeaverage+",";
	content+="0,";//content+=opes_result_data.average+",";
	content+=currentDateTime+",";//content+=opes_result_data.testtime+",";
	content+=opes_result_data.stimidset+",";
	content+="0,";//content+=opes_result_data.Istest
	content+=opes_result_data.duration+",";
	content+="0,";//content+=opes_result_data.Userage
	content+="0,";//content+=opes_result_data.Adminflag
	content+="0,";//content+=opes_result_data.Numberofcorrecttrial
	content+="0,";//content+=opes_result_data.Originalscore
	content+="0,";//content+=opes_result_data.Standardscore
	content+="0,";//content+=opes_result_data.Percentile
	content+="0,";//content+=opes_result_data.Stannine
	content+=opes_result_data.type4set+",";
	content+="0,";//content+=opes_result_data.Charge
	content+=projectid+",";
	content+="0,";//content+=opes_result_data.Experimenterid
	content+=opes_result_data.eventonsetset;


	//方法1：添加一个功能， 每个用户再重新上传一次
	//方法2：添加一个功能，系统管理员分个重新上传


	return content;
}
