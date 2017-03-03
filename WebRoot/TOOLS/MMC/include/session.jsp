<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.umc.login.UMCLoginCheck"%>
<%@page import="com.linewell.ucap.umc.bean.UMCSession"%>
<%@page import="com.linewell.ucap.umc.config.ConfigManager"%>
<%@include file="common.jsp"%>
<%
/*	UMCLoginCheck uMCLoginCheck = new UMCLoginCheck();
	UMCSession uMCSession = uMCLoginCheck.loginCheck(request,response);
	if(null == uMCSession) return;
	//取当前用户可管理的部门，有说明是部门管理员
	ConfigManager configManager = ConfigManager.getInstance();
	boolean deptManagerHaveAuthDept =configManager.isDeptManagerHaveAuthDept();
	String umcManagerDeptId="";
	if(deptManagerHaveAuthDept){
		umcManagerDeptId=uMCSession.getUser().getAdminDeptUnids();
	};*/
%>