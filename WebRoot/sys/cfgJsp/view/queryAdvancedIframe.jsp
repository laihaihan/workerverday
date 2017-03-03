<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
  <head>
    <title></title>
 <%
 	String sSystemQueryAdvancedPath = request.getContextPath()+"/";
 	String viewId=request.getParameter("unid");
 	String  jspPath=sSystemQueryAdvancedPath+"sys/cfgJsp/view/queryAdvancedItem.jsp?unid="+viewId+"&iframe=1";
 %>
  </head>
  <body>
    <iframe id="queryAdvancedIframe"  name="queryAdvancedIframe" src="<%=jspPath%>"  height="100%"  width="100%"  border="0px"></iframe>
  </body>
</html>
