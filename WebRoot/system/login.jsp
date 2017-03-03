<%@page contentType="text/html;charset=UTF-8"%>
<%
//WEB应用的路径
String appPath = request.getContextPath() + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>欢迎使用配置管理系统</title>
<link href="./css/login.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../uistyle/style_1/css/ext-all.css" />

<script type="text/javascript" src="../js/ext/ext-base.js"></script>
<script type="text/javascript" src="../js/ext/ext-all.js"></script>
<script type="text/javascript"	src="../js/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript">
Ext.onReady(function(){
	//设置焦点
	Ext.getDom("userName").focus();
	//全局回车登录事件
	document.onkeydown = function(event) {
		var e = event ? event : (window.event ? window.event : null);
		if (e.keyCode == 13) {
			loginSubmit();
		}
	}
});


function loginSubmit(){
	if (Ext.getDom("userName").value.trim() == "") {
		Ext.MessageBox.alert("提示", "用户名不能为空！");
		Ext.getDom("userName").focus();
		return;
	}
	if (Ext.getDom("password").value.trim() == "") {
		Ext.MessageBox.alert("提示", "密码不能为空！");
		Ext.getDom("password").focus();
		return;
	}
	loginSystemAction(Ext.getDom("userName").value.trim(), Ext.getDom("password").value.trim(),
			"", "");
}

function loginSystemAction(userName, password, domain, time,encrypt) {
	//如果有指定应用系统标识，直接进入，不再进行进行选择应用系统及界面风格
	var appUnid =  "475C4D7E257F5EAF7CCDF46AE0FE35BD";
	var requestConfig = {
		url : "login.action",
		params : {
			userName : userName,
			password : password,
			domainName : domain||"",
			cookieTime : time||"",
			appUnid:appUnid,
			encryptFlag:encrypt||""
		},
		callback : function(options, success, response) {
			if (success) {
				var json = Ext.decode(response.responseText);
				if (json.errorMsg != "undefined" && json.errorMsg != null
						&& json.errorMsg != "") {
					// 有错误消息
					Ext.getDom("msg").innerHTML = json.errorMsg;
				}else if (typeof(json.appList) == "undefined"
						|| json.appList.length == 0) {
					// 有默认的界面风格，直接进入首页
					//ucapCommonFun.buttonFun.gotoIndex(json.scheme[0]);
					window.location.href = "./index.jsp";
				}
			} else {
				Ext.getDom("msg").innerHTML = "无法连接上系统，请确认网络是否正常！";
			}
		}
	};
	Ext.Ajax.request(requestConfig);
}

</script>
</head>

<body>


<!--登录域 begin-->
<div class="login">
	<!--登录信息区 begin-->
	<div class="login_info">	
		<!-- 用户名输入框 -->
		<div class="login_info_input">
			<input id="userName" name="userName" type="text" value=""/> 
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 密码输入框 -->
		<div class="login_info_input">
			<input  id="password" name="password" type="password" value=""/> 
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 错误信息 -->
		<div id="msg" class="login_info_error">
		&#160;
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 登录按钮 -->
		<div class="login_button">
			<input name="systemLogin" onclick="loginSubmit();" type="button" value="" />
		</div>
		
	</div>
	<!--登录信息区 end-->
	
</div>
<!--登录域 end-->

</body>

</html>
