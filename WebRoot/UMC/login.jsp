<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.umc.login.UMCLoginCheck"%> 
<%
	UMCLoginCheck uMCLoginCheck = new UMCLoginCheck();
	String errorMsg = uMCLoginCheck.execute(request,response);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="include/umcCommon.jsp"%> 
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta content="用户管理中心" name="keywords" />
<meta content="用户管理中心" name="description" />
<title>用户管理中心</title>
<link href="style/login.css" rel="stylesheet" type="text/css" />


<script type="text/javascript" src="js/UMCLogin.js" ></script>
<script language="javascript">
//本页面不支持包含在框架内加载（即：iframe,frame框架）
if(window.top != window.self)
{
	window.top.location.reload();
}

//定义文档加载完成事件
Ext.onReady(function(){
	Ext.getDom("username").focus();
	//定义键盘单击事件
	document.onkeydown = function(event) {		
		var e = event ? event : (window.event ? window.event : null);
		switch(e.keyCode)
		{
			//回车单击事件定义
			case 13:
				UMCLogin();
				break;
		}		
	};
});
</script>
</head>

<body>

<!--页眉 begin-->
<div class="header ">

	<!-- LOGO -->
	<div class="logo">
	</div>
	
</div>
<!--页眉 end-->

<!--登录域 begin-->
<div class="login">

	<!-- UMC图标 -->
	<div class="login_icon">
	</div>

	<!--登录信息区 begin-->
	<div class="login_info">
	
		<!-- 用户名 -->
		<div class="login_info_text">
			用户名：
		</div>
		
		<!-- 用记名输入框 -->
		<div class="login_info_input">
			<input  type="text" id="username" name="username" /> 
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 密码 -->
		<div class="login_info_text">
			密&nbsp;&nbsp;码：
		</div>
		
		<!-- 密码输入框 -->
		<div class="login_info_input">
			<input  type="password" id="password" name="password"/> 
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 登录按钮 -->
		<div class="login_button_box">
			<input type="button" class="login_button" id="login_button" name="login_button" onclick="UMCLogin();" onmouseover="this.className='login_button_over'" onmouseout="this.className='login_button'" />
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 错误信息 -->
		<div class="login_info_error" id="login_message">
			<%=errorMsg %>
		</div>
		
	</div>
	<!--登录信息区 end-->
	
</div>
<!--登录域 end-->

<!--页脚 begin-->
<div class="footer">
	Powered by Ucap &copy; 2001-2011, Linewell Inc.
</div>
<!--页脚 end-->
</body>

</html>
