<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@include file="../include/session.jsp"%>
<%
/**
 *门户配置
 * @author fshaoming@linewell.com
 * @since 2011-12-01
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
//如果为空，则为非法访问，直接退出不做处理
if (StringUtils.isEmpty(appUnid))
    return;  

//门户的unid
String portalId =request.getParameter("portalId");
boolean selfConfig=true;// AuthorizationFilter.selfConfig(app.getEditUsers(),app.getUneditUsers(),ucapSession);
%>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>门户配置 | 新建应用系统 —— 南威UACP支撑平台</title>
		<%@include file="../include/platformresources.jsp"%>
		<link rel="stylesheet" type="text/css" href="<%=userStylePath%>/css/portal.css" />
		<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/index.js"></script>
		<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/portalConfig.js"></script>
		<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/Portal.js"></script>
		<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/miframe.js"></script>
		<SCRIPT language=javascript src="<%=systemPath%>js/user/user.js"></SCRIPT>
		<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/menu.js"></script>
		<script language="javascript">
		 Ext.onReady(function(){
	 			ucapPortal.init("<%=portalId%>");
		});
		</script>
	</head>
	<body>
	<script language="javascript" type="text/javascript">  
	var ucapHeader ={
		//判断是否有自定义权限（频道不能编辑删除，添加之权限）
		selfConfig:<%=selfConfig%>
	}
	</script>
		<div>
			<div id="portal_id">
			</div>
			<div id="portal_info" style="display: none;"></div>
			<div id="portalWidth" style="display: none;">
				门户配置的标志，存在这个id则表明是在配置门户
			</div>
		</div>
	</body>
</html>