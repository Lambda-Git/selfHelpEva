

	//Sun  
	function save_to_local(jsonData,local_saved_disk) {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var taskid = jsonData.taskid;  
		var username = jsonData.username.replace(/(^\s+)|(\s+$)/g, "");
		var current_dt = get_date_yyyy_mm_dd_hh_mm_ss();
		var saved_file = local_saved_disk + "Results_For_Dweipsy_Taskid_" + taskid   
				+ "_Username_" + username + "_" + current_dt + "_File.txt";
		var txtFile = fso.CreateTextFile(saved_file, true);

		txtFile.WriteLine("userid:" + jsonData.userid);
		txtFile.WriteLine("username:" + jsonData.username);
		txtFile.WriteLine("taskid:" + jsonData.taskid);
		txtFile.WriteLine("radioset:" + jsonData.radioset);
		txtFile.WriteLine("buttonset:" +jsonData.buttonset);
		txtFile.WriteLine("numset:" +jsonData.numset);
		txtFile.WriteLine("commentset:" +jsonData.commentset);
		txtFile.WriteLine("timeset:" +jsonData.timeset);
		txtFile.WriteLine("correctanswerset:" +jsonData.correctanswerset);
		txtFile.WriteLine("timeaverage:" +jsonData.timeaverage);
		txtFile.WriteLine("average:" +		jsonData.average);
		txtFile.WriteLine("asum:" +		jsonData.asum);
		txtFile.WriteLine("bsum:" +		jsonData.bsum);
		txtFile.WriteLine("csum:" +		jsonData.csum);
		txtFile.WriteLine("dsum:" +		jsonData.dsum);
		txtFile.WriteLine("esum:" +		jsonData.esum);
		txtFile.WriteLine("fsum:" +		jsonData.fsum);
		txtFile.WriteLine("gsum:" +		jsonData.gsum);
		txtFile.WriteLine("hsum:" +		jsonData.hsum);
		txtFile.WriteLine("isum:" +		jsonData.isum);
		txtFile.WriteLine("jsum:" +		jsonData.jsum);
		txtFile.WriteLine("testtime:" +		getNowFormatDate1());
		txtFile.WriteLine("stimidset:" +		jsonData.stimidset);
		txtFile.WriteLine("istest:" +		jsonData.istest);
		txtFile.WriteLine("duration:" +		jsonData.duration);
		txtFile.WriteLine("userage:" +		jsonData.userage);
		txtFile.WriteLine("adminflag:" +		jsonData.adminflag);
		txtFile.WriteLine("numberofcorrecttrial:" +		jsonData.numberofcorrecttrial);
		txtFile.WriteLine("originalscore:" +		jsonData.originalscore);
		txtFile.WriteLine("standardscore:" +		jsonData.standardscore);
		txtFile.WriteLine("percentage:" +		jsonData.percentage);
		txtFile.WriteLine("stannine:" +		jsonData.stannine);
		txtFile.WriteLine("eventtime:" +		jsonData.eventtime);
		txtFile.WriteLine("type4set:" +		jsonData.type4set);
		txtFile.WriteLine("charge:" +		jsonData.charge);
		txtFile.WriteLine("projectid:" +		jsonData.projectid);

/*
		txtFile.WriteLine("输入答案:" + numset);
		txtFile.WriteLine("备注:" + commentset);
		txtFile.WriteLine("反应时间:" + timeset);
		txtFile.WriteLine("平均时间" + median_rt);
		txtFile.WriteLine("正确答案" + correcttimeset);

		txtFile.WriteLine("选项A的个数:" + asum);
		txtFile.WriteLine("选项B的个数:" + bsum);
		txtFile.WriteLine("选项C的个数:" + csum);
		txtFile.WriteLine("选项D的个数:" + dsum);
		txtFile.WriteLine("选项E的个数:" + esum);
		txtFile.WriteLine("选项F的个数:" + fsum);
		txtFile.WriteLine("选项G的个数:" + gsum);
		txtFile.WriteLine("选项H的个数:" + hsum);
		txtFile.WriteLine("选项I的个数:" + isum);
		txtFile.WriteLine("选项J的个数:" + jsum);

		txtFile.WriteLine("按键:" + buttonset);
*/
		txtFile.Close();
	}

	
	function getNowFormatDate1() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;

	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = year + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}
	
	