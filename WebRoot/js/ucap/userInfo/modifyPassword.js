/**
 * 用户管理操作
 * @type userManager.createTableSpace();
 */
var userManager={
	/**
	 * 个人信息设置
	 */
	modifyPersonalInfo:function (){
		
		//2012-09-28 mdy by wyongjian@linewell.com
		//判断当前会话是否过期，过期则跳转到登录页面
		//解决BUG1107-页面长时间未进行操作，超时后，点击首页上的快捷方式，页面一片空白，建议跳转到登录页面的问题
		ucapCommonFun.isSessionOut();
		var curWin;
		var html="sys/cfgJsp/userInfo/modifyPersonalInfo.jsp";
		var toolbar=[
		 {text: '出差代理人设置',handler: function(){userManager.modifymodifyProxy()}},
         {text: '修改密码',handler: function(){userManager.modifyPassword()}}
      	];
      	var button=[
				{text:"保存",handler:function(){userManagerFun.saveAs()}},
				{text:"关闭",handler:function(){curWin.close()}}
				];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"个人信息设置",
	    	width:824,
	    	closable:true, //
	    	modal: true,
	    	tbar:toolbar,
			height:368,
			buttons:button,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true}
		});
		curWin=ucapSession.commonWin;
		ucapSession.commonWin.show();
	},
	/**
	 * 出差代理人设置
	 */
	modifymodifyProxy:function(){
		var curWin;
		var html="sys/cfgJsp/userInfo/proxyManager.jsp";
		var toolbar=[
			  {text: '新增代理人',handler:function(){userManager.addProxy(curWin)}},
			  {text: '刷新',handler: function(){reflesh()}},
			  {text: '关闭',handler: function(){curWin.close()}}
	      ];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"出差代理人设置",
		    width:900,
		    closable:true, //
		    modal: true,
		    tbar:toolbar,
			height:500,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true}
		});
		curWin=ucapSession.commonWin;
		ucapSession.commonWin.show();
	},
	
	/**
	 * 新增代理人
	 */
	addProxy:function(perWin){
		var curWin;
		var html="sys/cfgJsp/userInfo/addProxyUser.jsp";
	    var button=[
			 {text: '保存',handler:function(){saveAs(perWin)}},
	         {text: '取消',handler: function(){closeWin(perWin)}}
		];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"出差代理人设置",
		    width:824,
		    closable:true, //
		    modal: true,
		    
			height:500,
			buttons:button,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true}
		});
		ucapSession.commonWin.show();
	},
	
	/**
	 * 修改密码
	 */
	modifyPassword:function(){
		var html="sys/cfgJsp/userInfo/modifyPassword.jsp";
		var button=[
					{text:"确定",handler:function(){userManagerFun.valModify()}},
					{text:"取消",handler:function(){ucapSession.commonWin.close()}}
					];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"修改密码",
		    width:650,
		    closable:true,    //
		    modal: true,     
			height:200,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
	}
}


//变更代理人保存 cjianyan 2011-3-17
var outProxyMangerFun={
	
	
	/**
	 * 获取当前时间 yyyy-dd-mm hh:mm:ss
	 * @return {}
	 */
	curDateTime:function (){   
		var d = new Date();    
		var year = d.getFullYear();   
		var month = d.getMonth()+1;    
		var date = d.getDate();    
		var day = d.getDay();    
		var hours = d.getHours();    
		var minutes = d.getMinutes();    
		var seconds = d.getSeconds();    
		var ms = d.getMilliseconds();      
		var curDateTime= year;   
		if(month>9)   
		curDateTime = curDateTime +"-"+month;   
		else  
		curDateTime = curDateTime +"-0"+month;   
		if(date>9)   
		curDateTime = curDateTime +"-"+date;   
		else  
		curDateTime = curDateTime +"-0"+date;   
		if(hours>9)   
		curDateTime = curDateTime +" "+hours;   
		else  
		curDateTime = curDateTime +" 0"+hours;   
		if(minutes>9)   
		curDateTime = curDateTime +":"+minutes;   
		else  
		curDateTime = curDateTime +":0"+minutes;   
		if(seconds>9)   
		curDateTime = curDateTime +":"+seconds;   
		else  
		curDateTime = curDateTime +":0"+seconds;   
		return curDateTime;    
	},

	
	/**
	 * 传入字符串日期，天数，范围增加后的日期格式，
	 * @param {} time
	 * @param {} num
	 * @return {}
	 */
	GetDateStrAddDayCout:function(time,num){
		var temDate = Date.parse(time.replace("-", "/"));
		var newDate= new Date(temDate);
		newDate.setDate(newDate.getDate()+num);
		var y = newDate.getYear(); 
		var m = newDate.getMonth()+1;//获取当前月份的日期 
		var d = newDate.getDate(); 			
	    if(m<10) m = "0" + m;   //如果月份长度是一位则前面补0 
		if(d<10) d = "0" + d;//如果天的长度是一位则前面补0 
		time = y+"-"+m+"-"+d; 
		return time;
	},
	
	
	/**
	 * js获取日期：前天、昨天、今天、明天、后天
	 * @param {} AddDayCount(=-2,-1,0,1,2,3)天数
	 * @return {}
	 */
	GetDateStr:function(AddDayCount){ 
		var dd = new Date(); 
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		var y = dd.getYear(); 
		var m = dd.getMonth()+1;//获取当前月份的日期 
		var d = dd.getDate(); 
		//如果月份长度是一位则前面补0   
	     if(m<10) m = "0" + m;   
	     //如果天的长度是一位则前面补0   
	     if(d<10) d = "0" + d;
	
		return y+"-"+m+"-"+d; 
	}, 
	
	/**
	 * 获取当前日期yyyy-mm-dd格式的字符串
	 * @param {} date
	 * @return {}
	 */
	getDate:function (date){   
	     var thisYear = date.getYear();   
	     var thisMonth = date.getMonth() + 1;   
	     //如果月份长度是一位则前面补0   
	     if(thisMonth<10) thisMonth = "0" + thisMonth;   
	        
	     var thisDay = date.getDate();   
	     //如果天的长度是一位则前面补0   
	     if(thisDay<10) thisDay = "0" + thisDay;   
	        
	     return thisYear + "-" + thisMonth + "-" + thisDay;   
	 } ,
	
	/**
	 * 日期比较大小，如果oneTime大于等于twoTime 返回true 或者 false
	 * @param {} oneTime
	 * @param {} twoTime
	 * @return {Boolean}
	 */
	compareTime:function(oneTime,twoTime){
		if (Date.parse(oneTime.replace("-", "/").replace("-", "/")) >= 
			Date.parse(twoTime.replace("-", "/").replace("-", "/"))) {    
		   return true;
	    }else{
	    	return false;
	    }
	},

	
	/**
	 * 保存代理人保存业务处理 cjianyan 2011-3-17
	 * @param {} json
	 */
	doSave:function(json){
			var requestConfig = {
				url:ucapSession.baseAction,
				params : {					
					type :"peedingUser",
					act :"addPendingUser"					
				},
				jsonData:json,
				callback : function(options, success, response) {
					if (success) {
						var json = response.responseText;
						if(json){
							ucapSession.commonWin.close();
						}else{
							Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
						}
					} else {
						Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
					}
					
				}
			}
			Ext.Ajax.request(requestConfig);
	},

	/**
	 * 收回代理人授权处理 cjianyan 2011-3-17
	 * @param {} isAll
	 * @param {} todoUnid
	 */
	recoverPower:function(json){
		var userUnid="";
		if(json.userUnid == "" ){
			json.userUnid = ucapSession.userJson.unid;				
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params : {
				type :"peedingUser",
				act :"recoverPower"		
			},
			jsonData:json,
			callback : function(options, success, response) {
				if (success) {
					var json = response.responseText;
					if(json)
						Ext.Msg.alert("提示信息", "回收代理授权成功！");
					else
						Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
				} else {
					Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 修改代理人信息
	 * @param {} proxyUnid
	 */
	mdyPorxyMessage:function(json){
	
		if(json.userUnid == "" ){
			json.userUnid = ucapSession.userJson.unid;				
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params : {
				type :"peedingUser",
				act :"mdyProxyMessage"		
			},
			jsonData:json,
			callback : function(options, success, response) {
				if (success) {
					var result = response.responseText;
					if(result){
						if(json.isflag == "0")
							Ext.Msg.alert("提示信息", "延长出差时间设置成功");
						else
							Ext.Msg.alert("提示信息","提前结束出差设置成功！");
							
					}else{
						Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
					}
				} else {
					Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	
	/*
	 * 删除代理人
	 */
	delOutProxy:function(json){
		var userUnid="";
		if(json.userUnid == "" ){
			json.userUnid = ucapSession.userJson.unid;				
		}
		if(json.proxy_unid==""){
			Ext.Msg.alert("提示信息", "请选择代理人！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params : {
				type :"peedingUser",
				act :"delOutProxy"
			},
			jsonData:json,
			callback : function(options, success, response) {
				if (success) {
					json = response.responseText;
					if(json){
						Ext.Msg.alert("提示信息", "删除代理人成功！");
						loadProxyMessage();	
					}else{
						Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
					}
					
				} else {
					Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}

var userManagerFun={
	
	/**
	 * 获得JSON并验证
	 * 
	 * @param {} json
	 */
	valModify:function(){
		var json = ucapCommonFun.getFormJSon("modifyPasswordHtml");
		
		if(json.oldPassword==""){
			Ext.Msg.alert("提示","原始密码不能为空！");
			return;
		}
		if(json.newPassword=="" || json.valNewPassword==""){
			Ext.Msg.alert("提示","新密码不能为空！");
			return;
		}
		if(json.newPassword!=json.valNewPassword && json.newPassword !=""){
			Ext.Msg.alert("提示","两次密码输入不一致！");
			return;
		}
		userManagerFun.doModify(json);
		
	},
	/**
	 * ִ修改密码函数
	 */
	doModify:function(json){
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"modifyPassword","action":"modify"},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					if(exjson.result || exjson.result=="true"){
						Ext.Msg.alert("提示",exjson.msg);
						if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
					}else{
						Ext.Msg.alert("错误信息",exjson.msg);
					}
				} else {
					Ext.Msg.alert("错误信息","修改不成功！");
					if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 保存个人信息
	 */
	saveAs:function(){
		
		var json = ucapCommonFun.getFormJSon("modifyPersoanalHtml");
		
		
		var sendJson ="[{\"formUnid\":\"01CAA95104FFFDD07FF1E926985B3354\",\"unid\":\""+ucapSession.userJson.unid+"\",\"isNew\":\"0\",\"item\":[";
		var flag=false;
	
		if(json.user_mobile !=ucapSession.userJson.mobile ){
			flag =true ;
			sendJson =sendJson + "{\"k\":\"user_mobile\",\"v\":\""+json.user_mobile+"\",\"t\":\"01\"}";
		}
		
		if(json.user_mail !=ucapSession.userJson.mail ){
			if(flag)
				sendJson =sendJson+"," + "{\"k\":\"user_mail\",\"v\":\""+json.user_mail+"\",\"t\":\"01\"}";
			else{
				sendJson =sendJson + "{\"k\":\"user_mail\",\"v\":\""+json.user_mail+"\",\"t\":\"01\"}";
			}
			flag =true ;
		}
		
		if(json.user_message_number !=ucapSession.userJson.messageNumber ){
			if(flag)
				sendJson =sendJson+"," + "{\"k\":\"user_message_number\",\"v\":\""+json.user_message_number+"\",\"t\":\"01\"}";
			else{
				sendJson =sendJson + "{\"k\":\"user_message_number\",\"v\":\""+json.user_message_number+"\",\"t\":\"01\"}";
			}
			flag =true ;
		}
		if(json.user_proxys !=ucapSession.userJson.proxys ){
			if(flag)
				sendJson =sendJson+"," + "{\"k\":\"user_proxys\",\"v\":\""+json.user_proxys+"\",\"t\":\"01\"}";
			else{
				sendJson =sendJson + "{\"k\":\"user_proxys\",\"v\":\""+json.user_proxys+"\",\"t\":\"01\"}";
			}
			flag =true ;
		}
		sendJson=sendJson+"]}]";
		if(!flag){
			Ext.Msg.alert("信息","文档没有被修改！");
		}else{
			var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"getForm","act":"save","belongToAppId":ucapSession.appUnid},
				jsonData:sendJson,
				callback:function(options,success,response){
					var flag = response.responseText;
					var exjson = Ext.decode(flag);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult){
						Ext.Msg.alert("保存提示","后台有问题!");
						return;
					}
				
					if(flag=="1" || flag==1){
						ucapSession.userJson.mail =json.user_mail ;
						ucapSession.userJson.mobile =json.user_mobile ;
						ucapSession.userJson.messageNumber =json.user_message_number ;
						Ext.Msg.alert("保存提示","文档保存成功!");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		}
	}
}