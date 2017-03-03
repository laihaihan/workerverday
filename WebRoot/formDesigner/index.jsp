<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String unid=request.getParameter("unid");
	String type=request.getParameter("type");
	String formId=request.getParameter("formId");
	String openST=request.getParameter("openST");
	String viewMId=request.getParameter("viewMId");
	String belongToAppId=request.getParameter("belongToAppId");
	String belongToModuleId=request.getParameter("belongToModuleId");
	String urlParame="unid="+unid+
					 "&type="+type+
					 "&formId="+formId+
					 "&openST="+openST+
					 "&viewMId="+viewMId+
					 "&belongToAppId="+belongToAppId+
					 "&belongToModuleId="+belongToModuleId;
%>
<html>
<head>
<title></title>
</head>
<body>
<iframe src="../../formDesigner/FormDesigner.jsp?<%=urlParame %>" id="content" name="content" width="100%" height="100%"></iframe>
</body>
</html>