<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
  <head>
    <title></title>
 <%
 	String sSystemQuerySimplePath = request.getContextPath()+"/";
 	String viewId=request.getParameter("unid");
 	String  jspPath=sSystemQuerySimplePath+"sys/cfgJsp/view/querySimpleItem.jsp?unid="+viewId+"&iframe=1";
 %>
  </head>
  <body>
    <iframe id="querySimpleIframe" name="querySimpleIframe"  src="<%=jspPath%>"  height="100%"  width="100%"  border="0px"></iframe>
  </body>
</html>
