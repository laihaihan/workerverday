<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.linewell.ucap.admin.build.wrapper.ImportExcelBuild"%>
<%@include file="../include/session.jsp"%>
<%
/**
 * excel导入
 * @author fshaoming@linewell.com
 * @since  2011-12-16
 */
%>
<html>
	<head>
	    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>excel导入</title>
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
	</head>
	<body>
		<%
			ImportExcelBuild ie = new ImportExcelBuild();
			//result：返回执行成功的几张表
			String result = ie.uploadExcelFile(request, response);
		%>
	<script type="text/javascript">
		window.parent.oprResult('<%=result%>');
	</script>
	</body>
</html>
