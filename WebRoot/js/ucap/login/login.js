//用户是否正在进行系统登录 add by jc 20120509
var isLogining = false;
// 初始化用户信息
function initLoginUser() {
	var cookieUsername = getCookies("ucapUserName");
	if (cookieUsername != "undefined" && cookieUsername != null
			&& cookieUsername != "") {
		// 去掉双引号 linux下会莫名其妙出现双引号
		cookieUsername = cookieUsername.replace(new RegExp("\"", "gm"), "");
		var userName = strAnsi2Unicode(decode64(cookieUsername));
	}
	if (typeof(userName) != "undefined" && userName != null && userName != "") {
		Ext.getDom("userName").value = userName;
	}
	if ("undefined" != Ext.getDom("domainName")
			&& null != Ext.getDom("domainName")) {
		var domain = getCookies("ucapDomainName");
		if ("undefined" != typeof(domain) && null != domain && "\"\"" != domain) {
			Ext.getDom("domainName").value = domain;
		}
	}
	if (!ucapCommonFun.getUrlParameter("loginOut")) {
		var password = getCookies("ucapPassword");
		if (typeof(password) != "undefined" && password != null
				&& password != "") {
			//暂时不记住密码，以后考虑增加配置是否记住密码的功能。mdf by jc 20100609
			Ext.getDom("password").value = "";
			//Ext.getDom("password").value = password;
		}
	}
}
// 获取cookies
function getCookies(name) {
	var cookies = document.cookie;
	if (name == null || name == "") {
		return cookies;
	} else {
		var arg = name + "=";
		var alen = arg.length;
		var clen = cookies.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (cookies.substring(i, j) == arg) {
				var endstr = cookies.indexOf(";", j);
				if (endstr == -1) {
					endstr = cookies.length;
				}
				return unescape(cookies.substring(j, endstr));
			}
			i = cookies.indexOf(" ", i) + 1;
			if (i == 0) {
				break;
			}
		}
		return null;
	}
}
function formReset() {
	Ext.getDom("userName").value = "";
	Ext.getDom("password").value = "";
	if (typeof(Ext.getDom("checkimage")) != "undefined"
			&& Ext.getDom("checkimage") != null
			&& Ext.getDom("checkimage") != "") {
		Ext.getDom("checkimage").value = "";
	}
}
Ext.onReady(function() {
			var userName = ucapCommonFun.getUrlParameter("userName");
			var password = ucapCommonFun.getUrlParameter("passWord");
			if((null != userName && userName!="")&&(null!=password&&password!="")){
				this.loginAction(userName, password,null, null, null,"0");
			}
			initLoginUser();
			Ext.getDom("userName").focus();
		});
// 校验验证码
function checkimage(parm) {
	var result = true;
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET", "login/logincheck.jsp?rand=" + parm + "&random="
					+ Math.random(), false);
	conn.send(null);
	if (conn.responseText.indexOf("true") == -1) {
		result = false;
		Ext.MessageBox.alert("提示", conn.responseText);
	}
	return result;
}

/**
 * 发送验证码
 */
function sendVerify() {
	if (Ext.getDom("userName").value == "") {
		Ext.MessageBox.alert("提示", "用户名不能为空！");
		Ext.getDom("userName").focus();
		return;
	}
	if (Ext.getDom("password").value == "") {
		Ext.MessageBox.alert("提示", "密码不能为空！");
		Ext.getDom("password").focus();
		return;
	}
	var result = true;
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET",
			"login/sendVerify.jsp?userName=" + Ext.getDom("userName").value
					+ "&password=" + Ext.getDom("password").value + "&random="
					+ Math.random(), false);
	conn.send(null);
	if (conn.responseText.indexOf("true") == -1) {
		result = false;
		Ext.MessageBox.alert("提示", conn.responseText);
	}
	return result;
}

/**
 * 登录IM的方法
 * 要可以成功的登录IM就必须注册下（imclientapi.dll）和必须安装IM
 * @param {} userName
 * @param {} password
 */
function loginIM(userName,password)
{
	try{
		var i=imsso.login(userName,password);
		if(0!=i){//返回非0的表示没找到IM客户端
			//alert("您的IM客户端没有安装！");
		}
		/**
		 * TODO
		 */
	}
	catch(e){
	}
}

/**
 * 登录
 * @param userName   用户名
 * @param password   密码
 * @param appUnid    应用系统标识（如果指定系统标识，则直接进入系统页面，不跳出选择系统对话框）
 * @param domain     域名
 * @param time       会话时间
 * @param encrypt    加密标志
 * 
 * 2012-09-01 add　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单
 * @param menuId     菜单标识（如果指定菜单标识，则进入系统页面后，自动跳转到指定菜单）
 */
function loginAction(userName, password,appUnid, domain, time,encrypt,menuId) {
	//如果有指定应用系统标识，直接进入，不再进行进行选择应用系统及界面风格
	//var appUnid =  ucapCommonFun.getUrlParameter("appUnid");
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
				var json = ucapSession.loginAppJson;
				var exResult = ucapCommonFun.dealException(json);
				if (!exResult)
					return;
				if (json.errorMsg != "undefined" && json.errorMsg != null
						&& json.errorMsg != "") {
					// 有错误消息		
					showErrorMsg(json);  //统一登入时提示信息的提示,并获取焦点      by@cgc  2011-8-4
					//登录不成功时刷新验证码 add by zzhan@linewell.com 2012-02-27
					refreshCheck();
				} else if (typeof(json.appList) == "undefined"
						|| json.appList.length == 0) {
					// 有默认的界面风格，直接进入首页
					loginIM(userName,password);
					
					//2012-09-01 add　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单 
					json.scheme[0].menuId=menuId;
					
					ucapCommonFun.buttonFun.gotoIndex(json.scheme[0]);
				}else if( json.appList.length == 1){ //当只有一个应用系统时，直接登陆  by@cgc 2011-7-13
					 //loginAction(userName, password, json.appList[0].unid);
					//之前的方式会变成登录系统两次，导致性能消耗，本次修改如果只有一个应用系统，那么直接登录 mdy by llp 2011-11-11
					 loginIM(userName,password);
					 
					//2012-09-01 add　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单 
					 json.scheme[0].menuId=menuId;
					 
					ucapCommonFun.buttonFun.gotoIndex(json.scheme[0]);
				}else {
					// 弹出应用系统和界面风格选择div
					loginIM(userName,password);
					ucapCommonFun.buttonFun.changeSystem("login");
				}
			} else {
				Ext.Msg.alert("登录提示", "无法连接上系统，请确认网络是否正常！");
			}
			
			//设置用户登录完成 add by jc 20120509
			isLogining = false;
		}
	};
	Ext.Ajax.request(requestConfig);
}
/**
 * 显示错误提示
 * 并根据返回的不同错误信息，获取不同的焦点
 */
function showErrorMsg(json){
	if(json.msgNum=="4"){//根据消息配置的内容
		Ext.MessageBox.alert("提示",json.errorMsg,function(){
						Ext.getDom("password").focus();
					});
	}else{
		Ext.MessageBox.alert("提示", json.errorMsg,function(){
						Ext.getDom("userName").focus();
					});
	}
}

document.onkeydown = function(event) {
	var e = event ? event : (window.event ? window.event : null);
	var node=e.srcElement?e.srcElement : e.target; //e.srcElement (IE): e.target(FireFox)
	var name=node.nodeName||node.tagName;//tagName (IE): nodeName(FireFox)
	//对回车进行判断，输入时才有效  by@cgc  2011-8-2
	if (node && name.toLowerCase()=="input" && e.keyCode == 13) {
		//mdy by cjianyan@linewell.com 2011-6-1
		if(null==Ext.get("ucap_loginWindow")){
			submit();
		}
	}
}
/**
 * 判断字符串中是否包含非法字符
 * @param {} v
 */
function isValidUserName(v)
{
	var result=true;
	//非法字符数组，以竖线分隔,暂时只判断单引号和双引号
	var danger="'|\"";
	var dangers=danger.split("|");
	for(var i=0;i<dangers.length;i++)
	{
		if(v.indexOf(dangers[i])>-1)
		{
			result=false;
			break;
		}
	}
	return result;
}
function submit() {
	//用户是否正在进行系统登录 add by jc 20120509
	if(isLogining){
		return;
	}
	//设置用户正在登录中 add by jc 20120509
	isLogining = true;
	if (Ext.getDom("userName").value.trim() == "") {	
		Ext.MessageBox.alert("提示", "用户名不能为空！",function(){
			Ext.getDom("userName").focus();
			isLogining = false;//解决bug1194 mdf by cguangcong@linewell.com 2012-06-18
		});
		return;
	}
	if (!isValidUserName(Ext.getDom("userName").value.trim())) {
		Ext.MessageBox.alert("提示", "用户名输入错误！",function(){
			Ext.getDom("userName").focus();
			isLogining = false;//解决bug1194 mdf by cguangcong@linewell.com 2012-06-18
		});
		return;
	}
	if (Ext.getDom("password").value.trim() == "") {
		Ext.MessageBox.alert("提示", "密码不能为空！",function(){
			Ext.getDom("password").focus();
			isLogining = false;//解决bug1194 mdf by cguangcong@linewell.com 2012-06-18
		});
		return;
	}
	var image = Ext.getDom("checkimage");
	if (typeof(image) != "undefined" && image != null && image != "") {
		if (!checkimage(image.value)) {
			return;
		}
	}
	var cookieTime = Ext.getDom("cookieTime");
	var time = "";
	if (typeof(cookieTime) != "undefined" && cookieTime != null
			&& cookieTime != "") {
		time = cookieTime.value;
	}
	var domain = "";
	if ("undefined" != Ext.getDom("domainName")
			&& null != Ext.getDom("domainName")) {
		domain = Ext.getDom("domainName").value;
	}
	var appUnid =  ucapCommonFun.getUrlParameter("appUnid");
	loginAction(Ext.getDom("userName").value.trim(), Ext.getDom("password").value.trim(),appUnid,
			domain, time);
}
/**
 * 指纹登录
 */
function fingerSubmit() {
	if (Ext.getDom("userName").value == "") {
		Ext.MessageBox.alert("提示", "用户名不能为空！");
		Ext.getDom("userName").focus();
		return;
	}
	if (Ext.getDom("password").value == "") {
		Ext.MessageBox.alert("提示", "密码不能为空！");
		Ext.getDom("password").focus();
		return;
	}
	var image = Ext.getDom("checkimage");
	if (typeof(image) != "undefined" && image != null && image != "") {
		if (!checkimage(image.value)) {
			return;
		}
	}
	var cookieTime = Ext.getDom("cookieTime");
	var time = "";
	if (typeof(cookieTime) != "undefined" && cookieTime != null
			&& cookieTime != "") {
		time = cookieTime.value;
	}
	var domain = "";
	if ("undefined" != Ext.getDom("domainName")
			&& null != Ext.getDom("domainName")) {
		domain = Ext.getDom("domainName").value;
	}
	fingerLoginAction(Ext.getDom("userName").value,
			Ext.getDom("password").value, domain, time);
}

function fingerVerify(userName, password, domain) {
	var result = false;
	var fingertemplate = "";
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (typeof zkonline.RegisterTemplate != "undefined") {
			if (zkonline.GetVerTemplate())
				fingertemplate = zkonline.VerifyTemplate;
			else {
				fingertemplate = "";
				return;
			}
		} else {
			var errnum = "0";
			var emessage = "登录失败.";
			var etips = "请检查确认已安装ZKOnline客户端和指纹设备已连接.";
			ucapCommonFun.DisplayError(errnum, emessage, etips);
			return;
		}
	} else {
		if (window["zkonline"]) {
			if (zkonline.GetVerTemplate())
				fingertemplate = zkonline.VerifyTemplate;
			else {
				fingertemplate = "";
				return;
			}
		} else {
			var errnum = "0";
			var emessage = "登录失败.";
			var etips = "请检查确认已安装ZKOnline客户端和指纹设备已连接.";
			ucapCommonFun.DisplayError(errnum, emessage, etips);
			return;
		}
	}

	if (fingertemplate != "") {
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("POST", "login.action?type=fingerVerify&userName=" + userName
						+ "&password=" + password + "&domainName=" + domain
						+ "&random=" + Math.random(), false);
		conn.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");
		// 替换所有加号
		fingertemplate = fingertemplate.replace(/\+/g, "!@#ucap!@#");
		// alert(fingertemplate);
		conn.send("fingertemplate=" + fingertemplate);
		if (conn.responseText.indexOf("true") != -1) {
			result = true;
			// Ext.MessageBox.alert("提示", conn.responseText);
		}
	}
	return result;

}
function fingerLoginAction(userName, password, domain, time) {
	var requestConfig = {
		url : "login.action",
		params : {
			userName : userName,
			password : password,
			domainName : domain,
			cookieTime : time,
			type : "finger"
		},
		callback : function(options, success, response) {
			if (success) {
				ucapSession.loginAppJson = Ext.util.JSON
						.decode(response.responseText);
				var json = ucapSession.loginAppJson;
				var exResult = ucapCommonFun.dealException(json);
				if (!exResult)
					return;
				if (json.errorMsg != "undefined" && json.errorMsg != null
						&& json.errorMsg != "") {
					// 有错误消息
					Ext.getDom("msg").innerHTML = json.errorMsg;
				} else if (fingerVerify(userName, password, domain)) {

					var requestConfig = {
						url : "login.action",
						params : {
							userName : userName,
							password : password,
							domainName : domain,
							type : "afterFinger"
						},
						callback : function(options, success, response) {
							if (success) {
								ucapSession.loginAppJson = Ext.util.JSON
										.decode(response.responseText);
								var json = ucapSession.loginAppJson;
								var exResult = ucapCommonFun
										.dealException(json);
								if (!exResult)
									return;
								if (json.errorMsg != "undefined"
										&& json.errorMsg != null
										&& json.errorMsg != "") {
									// 有错误消息
									Ext.getDom("msg").innerHTML = json.errorMsg;
								} else if (typeof(json.appList) == "undefined"
										|| json.appList.length == 0) {
									// 有默认的界面风格，直接进入首页
									ucapCommonFun.buttonFun
											.gotoIndex(json.scheme[0]);
								} else {
									// 弹出应用系统和界面风格选择div
									ucapCommonFun.buttonFun
											.changeSystem("login");
								}

							} else {
								Ext.Msg.alert("登录提示", "无法连接上系统，请确认网络是否正常！");
							}
						}
					};
					Ext.Ajax.request(requestConfig);
				} else {
					Ext.getDom("msg").innerHTML = "您的指纹未匹配成功，请重新输入！";
				}

			} else {
				Ext.Msg.alert("登录提示", "无法连接上系统，请确认网络是否正常！");
			}
		}
	};
	Ext.Ajax.request(requestConfig);
}
function MM_swapImgRestore() { // v3.0
	var i, x, a = document.MM_sr;
	for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
		x.src = x.oSrc;
}
function MM_preloadImages() { // v3.0
	var d = document;
	if (d.images) {
		if (!d.MM_p)
			d.MM_p = new Array();
		var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
		for (i = 0; i < a.length; i++)
			if (a[i].indexOf("#") != 0) {
				d.MM_p[j] = new Image;
				d.MM_p[j++].src = a[i];
			}
	}
}

function MM_findObj(n, d) { // v4.01
	var p, i, x;
	if (!d)
		d = document;
	if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document;
		n = n.substring(0, p);
	}
	if (!(x = d[n]) && d.all)
		x = d.all[n];
	for (i = 0; !x && i < d.forms.length; i++)
		x = d.forms[i][n];
	for (i = 0; !x && d.layers && i < d.layers.length; i++)
		x = MM_findObj(n, d.layers[i].document);
	if (!x && d.getElementById)
		x = d.getElementById(n);
	return x;
}

function MM_swapImage() { // v3.0
	var i, j = 0, x, a = MM_swapImage.arguments;
	document.MM_sr = new Array;
	for (i = 0; i < (a.length - 2); i += 3)
		if ((x = MM_findObj(a[i])) != null) {
			document.MM_sr[j++] = x;
			if (!x.oSrc)
				x.oSrc = x.src;
			x.src = a[i + 2];
		}
}

/**
 * 刷新验证码 add by zzhan@linewell.com 2012-02-27
 */
function refreshCheck(){
	var imgDom = Ext.getDom('imgid');
	if(imgDom){
		imgDom.src='login/loginimage.jsp?random='+Math.random();
	}
}
