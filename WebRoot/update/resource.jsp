<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.function.push.Resource" %>
<%

	Session ss = (Session) request.getSession().getAttribute(Session.SESSION_NAME); 
	int menuCount = 0;
	int moduleCount = 0;
	if(null!=ss){
		Resource resource = new Resource();
		menuCount =resource.setMenuResource(ss);
	
		moduleCount = resource.setModuleResource(ss);
	};
 %>
<head>
</head>
<body>
   重新设置菜单和模块的资源UNID
   <br>
   共更新<%=menuCount%> 个菜单子项
   <br>
   共更新<%=moduleCount%> 个模块子项
   <br>
   更新后，请重新启动应用，以使缓存生效，本更新只需执行一次就可以！
</body>