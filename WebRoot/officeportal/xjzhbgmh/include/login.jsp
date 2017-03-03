<%@page import="com.linewell.ucap.util.JsonUtil"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<% 
	//String basePath = request.getParameter("basePath");
%>
	<script type="text/javascript">
	<!--
		
	//-->
	</script>
	
	<% 
		Session ucapSession = (Session) request.getSession().getAttribute(
			Session.SESSION_NAME);
		if(null == ucapSession){//未登录
	%>
	<form name="ucap_loginWindow" id="ucap_loginWindow" method="post">
	<div style="height:30px;">用户名：<input type="text" name="userName" id="userName" size="15" maxlength="30"/></div>
	<div style="height:30px;">密&nbsp;&nbsp;&nbsp;&nbsp;码：<input type="password" name="password" id="password" size="16" maxlength="30"/></div>
	<div style="height:30px;">&nbsp;</div>
	<div style="height:40px;padding-left:30px;">
		<input type="button" value="登录" onclick="msubmit();"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<input type="reset" value="重置"/>
	</div>
	<div style="padding-left:20px;"><font color="red" id="loginMsg"></font></div>
	</form>
	<%		
		}else{//已登录
			User user = ucapSession.getUser();
			JSONObject json = JsonUtil.objectToJSON(user);
			String unid = json.getString("unid");
			String uname = json.getString("name");
			String udept = json.getString("depts");
			String usex = json.getString("sex");
			String uemail = json.getString("mail");
	%>
			<div align="left" style="height:30px;padding-left:30px;">欢迎您，<%=uname %></div>
			<div align="left" style="height:30px;padding-left:30px;">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<%=("1".equals(usex)?"男":"女") %></div>
			<div align="left" style="height:30px;padding-left:30px;">邮件地址：<%=uemail %></div>
			<div align="left" style="height:30px;padding-left:30px;">
			<!--<input type="hidden" value="<%=unid%>" name="user_unid" id="user_unid"/>-->
			</div>
			<div align="left" style="height:30px;padding-left:30px;">
			【<a title="注销" onclick="mhLoginOut();" href="javascript:void(0)">安全退出</a>】</div>
			<!-- 
			<div align="left" style="height:30px;padding-left:30px;">
			【<a title="切换系统"  href="${basePath}sys/jsp/index.jsp">默认应用</a>】</div> -->
	<%		
		}
	%>
	
	