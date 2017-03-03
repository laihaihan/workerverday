<%--
/**
 * 视图配置页
 * @author cyingquan@qq.com
 * @2010-01-14
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String unid = request.getParameter("unid");
	
	out.println(unid);

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<title>视图配置</title>
	
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	
	<link href="${path}/include/style/skin/default/edit.css" type="text/css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="${path}/include/js/lib/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${path}/include/js/lib/easyui/themes/icon.css">
	
	<script type="text/javascript" src="${path}/include/js/lib/jquery.js"></script>
	<script type="text/javascript" src="${path}/include/js/lib/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/include/js/lib/jquery.form.js"></script>
</head>

<body bgcolor="#ECF2FE">

	
</body>

</html>