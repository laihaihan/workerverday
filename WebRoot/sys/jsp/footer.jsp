<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.authorized.scheme.Scheme"%>
<% 
		Session ucapSessionFooter = (Session) request.getSession().getAttribute(
				Session.SESSION_NAME); 
			
	Scheme schemeFooter = ucapSessionFooter.getScheme();
	String copyright = ""; 
	//添加是否为空的判断，保证用户管理中心可以使用 by xhuatang@linewell.com
	if(null != schemeFooter)
	   copyright = schemeFooter.getCopyright();
	if (copyright == null || "".equals(copyright)) copyright = "版权所有 © 2009 南威软件工程发展有限公司";
		
		 %>
<div id="footer">
	<p><%=copyright%></p>
</div>
