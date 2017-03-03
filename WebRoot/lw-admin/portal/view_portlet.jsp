<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.portlet.Portlet"%>
<%@page import="com.linewell.core.portlet.PortletManager"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	String portletId = request.getParameter("portletId");
	
	Portlet portlet = new PortletManager().doFindBeanByKey(portletId);
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("portlet", portlet);
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<title>${portlet.portlet_name}</title>
	<link rel="stylesheet" type="text/css" href="${path}/core/portlets/portlets.css">
	<script type="text/javascript" src="${path}/core/js/jquery-ui/jquery-1.5.1.js"></script>
	<script type="text/javascript" src="${path}/core/portlets/portlet.js"></script>
	<script language='javascript'>
		$(function(){
			portlet.displayData('${portlet.portlet_unid}');
		});
	</script>
</head>
<body>
	<div id="p_${portlet.portlet_unid}">
		<ul></ul>
	</div>
</div>
</body>
</html>