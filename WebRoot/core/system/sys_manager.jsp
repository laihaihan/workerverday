<%@page language="java" pageEncoding="UTF-8"%>
<%@include file="/core/params.jsp" %>
<%

Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
if(null == ucapSession){
	response.sendRedirect(request.getContextPath() + "/login.jsp");
	return;
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta charset="UTF-8">
	<title>辅助开发平台</title>
	${import_jquery}
	<link type="text/css" rel="stylesheet" href="<%=path + cssPath + "index.css" %>">
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-easyui-1.3.3/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-easyui-1.3.3/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/easyui/themes/icon.css">
	<!-- <link rel="stylesheet" href="${corejs}/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="${corejs}/ztree/jquery.ztree.min.js"></script> -->
	
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-migrate-1.2.1.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>	
	<script type="text/javascript" src="${corejs}/jquery.cookie.js"></script>
	
	<script type="text/javascript" src="${corejs}/lw-ui/load.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/winCookie.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/globalvar.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/menu.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/tabs2.0.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/lwin.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/popup.js"></script>
	
	
</head>
<body class="easyui-layout">
	<div data-options="region:'north',border:false" style="height:51px;background:#B3DFDA;padding:10px;">
	 	<div style="top:0;left:0; position: absolute;float: left;background-image:url('${path}/core/system/image/index-logo.gif');height:51px; width:362px" > 
	 	<span style="font-size:30px;padding:11px 20px;float:left;">党务辅助开发平台</span>
 		</div>
		<div style="top:0;right:0;position: absolute;float: right;background-image:url('${path}/core/system/image/index-header-bg.gif') ;height:51px; width:76%" > 
 		</div>
 	</div>
	<%@include file="west.jsp"%>
	<%@include file="main.jsp"%>
</body>
</html>