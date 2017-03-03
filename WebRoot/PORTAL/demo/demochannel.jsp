<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%
	String name = request.getParameter("name");
	if(StringUtils.isEmpty(name)) {
		name = "logo";
	}
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>演示用频道</title>
	</head>
	<body scroll=no style="margin:0">
		<img width="100%" height="100%" src="images/<%=name%>.png" >
	</body>
</html>