
	
function loginAction(userName, password, domain, time,encrypt) {
	//如果有指定应用系统标识，直接进入，不再进行进行选择应用系统及界面风格
	var appUnid =  ucapCommonFun.getUrlParameter("appUnid");
	var requestConfig = {
		url : "login.action",
		params : {
			userName : userName,
			password : password,
			domainName : domain,
			cookieTime : time,
			appUnid:appUnid,
			encryptFlag:encrypt
		},
		callback : function(options, success, response) {
			if (success) {
				ucapSession.loginAppJson = Ext.util.JSON
						.decode(response.responseText);
						
				//登录结果对象: com.linewell.ucap.web.login.LoginResult
				
				var json = ucapSession.loginAppJson;
				var exResult = ucapCommonFun.dealException(json);
				if (!exResult)
					return;
				if (json.errorMsg != "undefined" && json.errorMsg != null
						&& json.errorMsg != "") {
					// 有错误消息
					$("msg").innerHTML = json.errorMsg;
				} else if (typeof(json.appList) == "undefined"
						|| json.appList.length == 0) {
					// 有默认的界面风格，直接进入首页
					//ucapCommonFun.buttonFun.gotoIndex(json.scheme[0]);
					window.location.href = ucapSession.appPath +"demo/index.jsp";
					
					$("msg").innerHTML = "登录成功!";
				} else {
					// 弹出应用系统和界面风格选择div
					changeSystem("login");
					//window.location.href = ucapSession.appPath +"demo/index.jsp";
					
					$("msg").innerHTML = "登录成功!";
				}
			} else {
				Ext.Msg.alert("登录提示", "无法连接上系统，请确认网络是否正常！");
			}
		}
	};
	Ext.Ajax.request(requestConfig);
}


function changeSystemConfirm() {
	var json = ucapCommonFun.getFormJSon("dialogHtml");
	if (json.appList == "") {
		for (var i = 0; i < ucapSession.loginAppJson.appList.length; i++) {
			if (ucapSession.loginAppJson.lastApp == ucapSession.loginAppJson.appList[i].unid) {
				json.appList = i;
				break;
			}
		}
	}
	var requestConfig = {
		url : "login.action",
		params : {
			"type" : "afterChoose",
			"styleUnid" : ucapSession.loginAppJson.styleList[json.appStyle].unid,
			"isDefault" : json.defaultOption,
			"schemeUnid" : ucapSession.loginAppJson.scheme[json.appList].unid
		},
		jsonData : ucapSession.loginAppJson.appList[json.appList],
		callback : function(options, success, response) {
			if (success) {
				var jsonException = Ext.util.JSON
						.decode(response.responseText);
				var exResult = ucapCommonFun.dealException(jsonException);
				if (!exResult)
					return;
					window.location.href = ucapSession.appPath +"demo/index.jsp";
				
			}
		}
	}
	Ext.Ajax.request(requestConfig);
	ucapSession.commonWin.hide();
};

function changeSystem(type) {
	if (typeof(type) == "undefined")
		type = "";
	loginType = type; // 是全局变更
	var html = "login/appSelect.jsp";
	var button = [{
				text : "确定",
				handler : function() {
					changeSystemConfirm();
				}
			}, {
				text : "取消",
				handler : function() {
					ucapSession.commonWin.close();
				}
			}];
	var title = "切换应用系统";
	if (type == "style") {
		title = "切换风格";
	}
	// modify by jc 解决登录时连续按两次回车时出现空的选择系统对话框的问题 20090914
	if (!Ext.get("ucap_loginWindow"))
		ucapSession.commonWin = new Ext.Window({
					id : "ucap_loginWindow",
					title : ucapSession.win.winImg + title,
					width : 500,
					closable : true, // 关闭
					modal : true,
					height : 420,
					autoScroll : true,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : ucapSession.appPath + html,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
	ucapSession.commonWin.show();
}