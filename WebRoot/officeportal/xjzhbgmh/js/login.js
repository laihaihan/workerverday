//OPEN MORE APP
function openOfficeApp(appType){
	var mUserSession = Ext.getDom("user_unid").value;
    if(null == mUserSession || mUserSession == ""){
    	alert("您还未登录系统，请先登录！");
    	Ext.getDom("userName").focus();
    	return;
    }
	var tmp_uname = getCookie("tmp_uname");
	var tmp_pwd = getCookie("tmp_pwd");
	if(appType == "was"){
		loginAction(tmp_uname,tmp_pwd,"02EA829BF2BA1F4FF0F49145A502C353","","","");
	}else if(appType == "ess"){
		loginAction(tmp_uname,tmp_pwd,"D5A732887EB491ABC10B23D4B43DA38C","","","");
	}else if(appType == "cms"){
		loginAction(tmp_uname,tmp_pwd,"A0A23464638BC1DD675B7D1B4DAA81C2","","","");
	}else if(appType == ""){
	
	}  
}
//LOGIN BUTTON
function msubmit(){
	var userName = Ext.getDom("userName").value;//$("#userName").val();
	var password = Ext.getDom("password").value;//$("#password").val();
	if(isNull(userName) || !isValidUserName(userName)){
		Ext.getDom("loginMsg").innerHTML = "请输入用户名或格式错误";
		Ext.getDom("userName").focus();
		return;
	}
	if(isNull(password)){
		Ext.getDom("loginMsg").innerHTML = "请输入密码";
		Ext.getDom("password").focus();
		return;
	}
	//存储COOKIE，用于保存临时用户信息，以便访问各应用系统
	addCookie("tmp_uname",userName,12);
	addCookie("tmp_pwd",password,12);
	mLoginAction(userName,password,"","","","");
}
//LOGIN ACTION
function mLoginAction(userName, password,appUnid, domain, time,encrypt){
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
				ucapSession.loginAppJson = Ext.util.JSON.decode(response.responseText);
				var json = ucapSession.loginAppJson;
				var exResult = ucapCommonFun.dealException(json);
				if (!exResult)
					return;
				if (json.errorMsg != "undefined" && json.errorMsg != null && json.errorMsg != "") {
					// 有错误消息
					Ext.getDom("loginMsg").innerHTML = json.errorMsg;
				}else{
					//ucapCommonFun.buttonFun.gotoIndex(json.scheme[0]);
					window.location = "index.jsp";
					Ext.getDom("tmp_uname").value = userName;
					Ext.getDom("tmp_pwd").value = password;
				}
			} else {
					Ext.Msg.alert("登录提示", "无法连接上系统，请确认网络是否正常！");
			}
		}
	};
	Ext.Ajax.request(requestConfig);
}
//LOGINOUT ACTION
function mhLoginOut(){
	var a={url:ucapSession.baseAction,params:{type:"loginWriteOff"},
			callback:function(d,f,c){
				if(f){
					var e=Ext.util.JSON.decode(c.responseText);
					var b=ucapCommonFun.dealException(e);
					if(!b){
						return
					}
					window.location="index.jsp";
				}else{
					Ext.Msg.alert("提示","注销不成功，请重试！");
				}
			}
	};
	Ext.Ajax.request(a);
}