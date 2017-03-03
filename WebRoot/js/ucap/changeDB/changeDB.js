/**
 * proxool.xml操作
 * 
 * @type
 */
var proxoolManager = {

	/**
	 * 修改proxool文件
	 */
	modifyDB : function() {
		//新建应用系统要先保存才能配置数据库   mdy by wyongjian@linewell.com 2012-08-17
		if("" == ucapCommonFun.getUrlParameter("unid")){
			Ext.Msg.alert("提示", "请先保存系统之后再操作");
			return;
		}
		var html = "sys/cfgJsp/proxool/proxool.jsp?unid="
				+ ucapCommonFun.getUrlParameter("unid");
		var button = [{
					text : "确定",
					handler : function() {
						window.top.proxoolFun.valModify("","",win);
					}
				}, {
					text : "取消",
					handler : function() {
						win.close()
					}
				}];
		var win = ucapSession.commonWin = new window.top.Ext.Window({
					title : ucapSession.win.winImg + "修改数据库连接",
					width : 650,
					closable : true, // ȡ��
					modal : true,
					height : 530,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : ucapSession.appPath + html,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapSession.commonWin.show();
	},
	/**
	 * 获取proxool文件信息
	 */
	getProxool : function(callBack) {
		var appId = Ext.getDom("alias").value;
		var unitId = Ext.getDom("unitId").value;
		if(unitId) appId="";
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "changeDB",
				"action" : "getProxool",
				"alias" :appId
			},
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.util.JSON.decode(response.responseText);
					if (exjson) {
						var user = "";
						var password = "";
						for (var i = 0; i < exjson.driverProperties.length; i++) {
							if (exjson.driverProperties[i].name == "user") {
								user = exjson.driverProperties[i].value;
							} else {
								password = exjson.driverProperties[i].value;
							}
						}
						var field = ["url", "driverClass", "user", "password",
								"house", "simultaneous", "prototype",
								"maximum", "minimum"];
						var value = [exjson.driverUrl, exjson.driverClass,
								user, password, exjson.houseKeepingSleepTime,
								exjson.simultaneousBuildThrottle,
								exjson.prototypeCount,
								exjson.maximumConnectionCount,
								exjson.minimumConnectionCount];
						var jsonValue = "{"
								+ ucapCommonFun.getJsonValue(field, value)
								+ "}";
						ucapCommonFun.bindForm(jsonValue);
						if(callBack&&""!=callBack){
							callBack=callBack+"('"+response.responseText+"');";
							ucapCommonFun.evalJavaScript(callBack);//执行回调函数
						}
					} else {
						Ext.Msg.alert("错误信息", "读取proxool文件失败");
					}
				} else {
					Ext.Msg.alert("错误信息", "读取proxool文件失败！");
					if (ucapSession.commonWin) {
						ucapSession.commonWin.close();
					}
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}

}
var proxoolFun = {

	/**
	 * 获得JSON并验证
	 * @param {} deptName
	 * @param {} json
	 * @param {} callBack回调函数
	 */
	valModify : function(deptName,json,win,unid,callBack) {
		json = json||ucapCommonFun.getFormJSon("proxoolHtml");
		if(!json){
			Ext.Msg.alert("提示", "获取不到配置信息！");
			win.close();
			return;
		}
		if (json.url == "") {
			Ext.Msg.alert("提示", "driver-url不能为空！");
			return;
		}
		if (json.user == "") {
			Ext.Msg.alert("提示", "用户名不能为空！");
			return;
		}
		if (json.password == "") {
			Ext.Msg.alert("提示", "密码不能为空！");
			return;
		}
		if(deptName)json["deptName"] = deptName;
		proxoolFun.doModify(json,win,unid,callBack);

	},

	doModify : function(json,win,unid,callBack) {
		_UcapForm.tool.showLodingMsg();
		var requestConfig = {
			timeout:99999,//允许交互时间 modify by zhua 2010-07-28
			url : ucapSession.baseAction,
			params : {
				"type" : "changeDB",
				"action" : "change",
				"unid" : unid  //单位信息的unid 
			},
			jsonData : json,
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.util.JSON.decode(response.responseText);
					var driverUrl=json.url;
					if (exjson.result || exjson.result == "true") {
						if (ucapSession.commonWin) {
							ucapSession.commonWin.close();
						}
					}else{//当数据库连接不成功时，提示进行表空间创建 modify by zhua 2010-06-29
						Ext.Msg.confirm("信息提示","数据库无法正常创建连接，请检查配置信息.现在是否立即创建新的表空间？",function(a,b){
							if(a=="yes"){
								ucapCommonFun.createTableSpace(driverUrl);
							}
						});
					return;
					}
					_UcapForm.tool.hideLodingMsg();
					if(callBack&&""!=callBack){
						callBack=callBack+"('"+response.responseText+"');";
						ucapCommonFun.evalJavaScript(callBack);//执行回调函数
						return;
					}
					Ext.Msg.alert("信息提示", exjson.msg||"修改成功！");					
					win.close();
					//modify by zh 审核通过并且复制成功后才设置为1
					if(unid!=undefined){
							/*开始*/
							var updateRequestConfig = {
								url:ucapSession.baseAction,
								params:'type=auditingpass&unid='+unid+"&attr=updateFlag",
								jsonData:null,
								callback:function(options,success,response){
									if (success){
									}else{
										Ext.Msg.alert("提示信息","设置失败！");
									}
								}
							}
						Ext.Ajax.request(updateRequestConfig);
					/*结束*/
									
					}
				
					//成功后刷新界面
					if(viewTabs.tabs){
						var item=viewTabs.tabs.getActiveTab();
						var frameID = 'ifr'+(item.id||"").replace(/^(\w*_)/g,"");
						var ifrm =document.frames?document.frames[frameID]:
			              				document.getElementById(frameID).contentWindow;
			              try{
			              	  if(ifrm.location){
			             	ifrm.location.reload();
			             }
			              }catch(e){}			           
			              	
					}else{
						//隔一秒再刷新，刷新过快造成提示信息没有显示出来
						setTimeout("window.location.reload();",1000);  
					}
					
				}else{
				  Ext.Msg.alert("信息提示", "与后台交互超时！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}