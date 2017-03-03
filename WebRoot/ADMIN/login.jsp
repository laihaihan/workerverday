<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucapx.login.LoginApi"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="java.util.List"%>
<%@include file="../default/common.jsp"%> 
<%
/**
 * 登录页面
 * @auth yjianyou@linewell.com
 * @since 2011-08-15
 */
LoginApi loginApi = new LoginApi();
 %>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>南威UACP支撑平台</title>
<link href="style/login.css" rel="stylesheet" type="text/css" />

<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/jquery.cookie.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/common.js"></script>
<script language="javascript" src="js/login.js"></script>

<script language="javascript">
if(top.location.href !== location.href){top.location.href=location.href;}
(function($){
$(document).ready(function(){  
  $("#username").focus();
  /**
   * 处理表单提交的逻辑
   */
  $("#loginForm").submit(function(){   
    loginSubmit();
    return false;
  });//end submit  
 
});
})(jQuery);
</script>
</head>

<body>

<!--下层背景 begin-->
<div class="lower">	
</div>
<!--下层背景 end-->

<!--登录域 begin-->
<div class="login">

	<!-- LOGO图标 -->
	<div class="logo">
	</div>
	<form method="post" id="loginForm" name="loginForm">
	<!--登录信息区 begin-->
	<div class="login_info">
	
		<!-- 用户名 -->
		<div class="login_info_text">
			用户名：
		</div>
		
		<!-- 用户名输入框 -->
		<div class="login_info_input user">
			<input name="username" id="username" type="text" />
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 密码 -->
		<div class="login_info_text">
			密&nbsp;&nbsp;码：
		</div>
		
		<!-- 密码输入框 -->
		<div class="login_info_input password">
			<input name="password" id="password" type="password" />
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 错误信息 -->
		<div class="login_info_error">
			<label id="resultMsg"></label>
		</div>
		
		<!-- 空白行 -->
		<div class="blank">
		</div>
		
		<!-- 登录按钮 -->
		<div class="login_button" >
		  <input type="submit" name="loginBtn" id="loginBtn" value="" onfocus="this.blur();"/>
		</div>
		
	</div>
	<!--登录信息区 end-->
	</form>
</div>
<!--登录域 end-->

<!--页脚 begin-->
<div class="footer">
	Powered by Ucap © 2001-2011, Linewell Inc.
</div>
<!--页脚 end-->

</body>

</html>
