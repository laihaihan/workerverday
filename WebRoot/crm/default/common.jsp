<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/default/common.jsp"%> 
<%
/**
 * 应用系统的公共文件
 * 此文件在最终展示页面中加载，其他地方不加载
 * @auth xhuatang@linewell.com
 * @since 2011-07-01
 */
if(null == ucapSession){
	response.sendRedirect(request.getContextPath() + "/" + "crm/login.jsp");
	return;
}
//当前应用的路径
String appPath  = systemPath + "crm/";
//当前应用系统的id
String currentAppId	= ucapSession.getApp().getUnid();
%>
