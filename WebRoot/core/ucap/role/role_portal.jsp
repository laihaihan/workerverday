<%@page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.ucap.session.Session" %>
<%@ page import="com.linewell.ucap.platform.cache.user.User"%>
<%@ page import="com.linewell.core.db.JDBCTool"%>
<%@ page import="com.linewell.core.util.StrUtil"%>
<%@ page import="com.linewell.core.system.GlobalParameter"%>
<%@ page import="com.linewell.core.ucap.role.Role"%>
<%@ page import="com.linewell.core.ucap.role.RoleManager"%>
<%
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
	String app_unid = ucapSession.getApp().getUnid();
	Role role = new RoleManager().getEffectiveRole(user, app_unid);
	String portalUnid = this.getRolePortalUnid(app_unid,role.getRole_unid());
	if(!StrUtil.isNull(portalUnid)){
		response.sendRedirect(request.getContextPath() + "/PORTAL/index.jsp?portalUnid="+portalUnid);
		return;
	}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>角色首页</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script language='javascript'>
		top.$('#div_iframe').hide();
		top.$('.layout-panel-west,.layout-panel-center').show();
	</script>
  </head>
  
  <body>
    当前角色没有绑定门户！
  </body>
</html>
<%!
	//取得当前角色绑定的首页id
	private String getRolePortalUnid(String app_unid,String roleUnid){
		String portalUnid = "";
		try{
			//取得当前用户绑定的首页
			String sql = "select portal_unid from ucap_portal ";
			sql += "where portal_belong_to_app='"+app_unid+"' and portal_belong_to_roles like '%"+roleUnid+"%'";
			String[][] result = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			
			//若当前角色没绑定首页，则取当前系统的首页
			if(result.length == 1){
				sql = "select portal_unid from ucap_portal where portal_belong_to_app='"+app_unid+"'";
				result = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			}
			
			portalUnid = result.length > 1 ? result[1][0] : portalUnid;
		}catch(Exception e){
			e.printStackTrace();
		}
		return portalUnid;
	}
%>