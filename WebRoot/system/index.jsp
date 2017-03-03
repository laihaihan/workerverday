<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucap.platform.authorized.app.AppManager"%>
<%@page import="com.linewell.ucap.platform.authorized.scheme.Scheme"%>
<%@page import="com.linewell.ucap.platform.authorized.scheme.SchemeManager"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%
	//WEB应用的路径
	String appPath = request.getContextPath() + "/";
	String sUserStylePath = appPath + "/uistyle/style_1/";

	Session ucapSession = (Session) request.getSession().getAttribute(
			Session.SESSION_NAME);
	if (null == ucapSession) {
		request.getRequestDispatcher("login.jsp").forward(request, response);
		return;
	}
	App app = null;
	//允许应用系统指定相应的系统标识 ，完成到指定系统的跳转，跳转过程中界面风格不做变化 add by llp 2010-08-26
	String appUnid = request.getParameter("appUnid");
	if (null != appUnid && !appUnid.trim().equals("")) {
		AppManager aManager = new AppManager();
		app = aManager.doFinByPunidAndSession(appUnid, ucapSession);
		if (null != app) {
			SchemeManager sm = new SchemeManager();
			Scheme scheme = sm.getSchemeByAppId(app.getPunid(), ucapSession);
			ucapSession.setApp(app);
			ucapSession.setScheme(scheme);
		}
	}//end 
	app = ucapSession.getApp();
	if(null == app){
		out.println("<div style='color:red'><b>系统提示：找不到平台应用系统！</b></div>");
		return;
	}

	User user = ucapSession.getUser();
	if (null == user || !user.isAppAdmin()) {
		out.println("<div style='color:red'><b>系统提示：当前用户没有管理权限！</b></div>"+
		"<div><A href='login.jsp'>返回登录界面</A></div>");
		return;
	}
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>欢迎使用配置管理系统</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />
	<link rel="stylesheet" type="text/css" href="./css/main.css" />
	
	<script type="text/javascript" src="<%=appPath%>js/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=appPath%>js/ext/ext-all.js"></script>
	<script type="text/javascript" src="<%=appPath%>js/ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=appPath%>js/ext/PagingMemoryProxy.js"></script>
	<script type="text/javascript" src="./js/index.js"></script>
	<script type="text/javascript" src="./js/config/moduleConfig.js"></script>
	<script type="text/javascript" src="../js/ucap/util/common.js"></script>
	<script type="text/javascript" src="./js/view.js"></script>
	<script type="text/javascript" src="./js/DBView.js"></script>
	<script type="text/javascript" src="./js/form.js"></script>
	<script type="text/javascript" src="./js/validate.js"></script>
	<link href="./css/view.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=appPath%>js/ucap/view/viewJsp.js"></script>
	<script language="javascript">
		Ext.onReady(function() {
			initIndex();
			initModule();
			initDocForm(null,"system/html/index.jsp","getProxool");
		});
	</script>
  </head>
  
  <body>
  		<!-- 头部 -->
  		<div id="ucap_system_header">
			<div class="header">
			</div>
			<div class="header_separator">
			</div>
			<div class="nav">
				<div style="float:left;">
					当前位置：<span style="color:red;">配置管理系统-</span><span id="cur_nav_msg" style="color:red;">首页</span>
				</div>
				<span style="float:right;padding:0 10px 0 20px;background: url('./images/user.png') no-repeat left center;">
					<%=user.getDisplayName()%>
					<span>|
						<A href="javascript:loginOut();">退出</A>
					</span>
				</span>
			</div>
	  	</div>
	  	<!-- 左侧 -->
	  	<div id="ucap_system_module">
			<div id="ucap_system_module_top">
				<table border="0" cellpadding="0" cellspacing="0" class="table_maximize">
					<tr>
						<td class="area_main_left_top"></td>
					</tr>
				</table>
			</div>
			<div id="ucap_system_module_center">
				<!-- 模块内容 -->
			</div>
			<div id="ucap_system_module_bottom">
				<table border="0" cellpadding="0" cellspacing="0" class="table_maximize">
					<tr>
						<td class="area_main_left_bottom"></td>
					</tr>
				</table>
			</div>
	  	</div>
	  	<div id="ucap_system_rightContent">
	  	</div>
	  	<!-- 内容区域 -->
	  	<div id="ucap_system_content">
			<div id="ucap_system_content_top">
				<table border="0" cellpadding="0" cellspacing="0" class="table_maximize">
					<tr>
						<td class="area_main_right_corner lt"></td>
						<td class="area_main_right_corner_mt">&#160;</td>
						<td class="area_main_right_corner rt"></td>
					</tr>
				</table>
	  		</div>
	  		<div id="ucap_system_content_center">
	  			<div id="ucap_system_content_left">
	  			<!-- 
		  			<div class="content_top_title">
					配置管理
					</div>
					<div class="content_top_content">
					配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理配置管理
					</div>
					 -->
		  		</div>
		  		<div id="ucap_system_content_right">
		  		</div>
	  		</div>
			<div id="ucap_system_content_footer">
				<table border="0" cellpadding="0" cellspacing="0" class="table_maximize">
			  		<tr>
						<td class="area_main_right_corner lb"></td>
						<td class="area_main_right_corner_mb">&#160;</td>
						<td class="area_main_right_corner rb"></td>
					</tr>
				</table>
			</div>
	  			
	  	</div>
	  	<!-- 下面 -->
	  	<div id="ucap_system_footer">
	  	</div>
  </body>
</html>
