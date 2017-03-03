<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.cache.login.*"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.resource.ResourceCache"%>
<%@page import="com.linewell.ucap.resource.ResourceContext"%>
<%@page import="com.linewell.ucap.resource.ResourceType"%>
<%
ResourceContext rc = ResourceContext.newInstance();
ResourceCache cache = rc.getResourceCache(ResourceType.RESOURCE_TYPE_LOGIN);
Login login = (Login) cache.getResource("");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>二次开发登录实例Demo</title>
 	<script type="text/javascript" src="../js/ext/ext-base.js"></script>
    <script type="text/javascript" src="../js/ext/ext-all.js"></script>
	<script type="text/javascript"	src="../js/ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript"  src="../js/ucap/util/common.js" ></script>	
	
	<script type="text/javascript"  src="../js/ucap/login/base64code.js" ></script>	
	<script type="text/javascript"  src="../js/ucap/login/UnicodeAnsi.js" ></script>	

	<script type="text/javascript" src="demo_login.js"></script>
	
	<script type="text/javascript">
	Ext.onReady(function(){
		
	});
	var loginClick=function(){
		if(""==$F("userName") || ""==$F("password")){
			alert("请输入用户名及密码!");
			return;
		}
		loginAction($F("userName"),$F("password"));
	};
	</script>
</head>

<body>

<div>
	用户名:<input name="userName" id="userName" type="text" size="30" class="inputbox" value="sysadmin"/>
	<br/>
	密  码：<input name="password" id="password" type="password"  size="18" class="inputbox" value="123"/>
	<%if(login.isGetPass()){ %><a href="#" class="blue">找回密码</a> <%} %> 
	<br/>
	<input name="login_name" type="button" onclick="loginClick();" value="登录" />
	<br/><div id="msg"></div>
</div>

</body>
</html>