<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucap.web.login.LoginActionWrapper"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.web.login.LoginResult"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.util.*"%>
<%
	UcapRequest us_ucapRequest = UcapRequestWebManager.requestToUcap(request);	
	String userName=request.getParameter("userName");//获取用户名
	String passWord=request.getParameter("passWord");//获取密码
	String appUnid=request.getParameter("appUnid");//所属系统unid
	String url=request.getParameter("url");//导航到的url
	Session us_sn = (Session) request.getSession().getAttribute(Session.SESSION_NAME); 
	//判断是否重新加载session(session为空或者所属系统为空或者用户名userName不等于当前session中的用户名)都重新加载session
	boolean isGetSession=null==us_sn || null==us_sn.getApp()|| (null!=us_sn.getUser() && null!=userName && !userName.equals(us_sn.getUser().getDisplayName()));
	if(isGetSession){//当会话对象为空，重新设置会话对象
	
		if(StringUtils.isEmpty(userName)||StringUtils.isEmpty(passWord))
		{
			System.out.println("用户名或者密码为空！");
			return;
		}
		LoginResult loginResult=LoginActionWrapper.verifyUserNoEncrypt(us_ucapRequest,response,userName,passWord,"");
		request.getSession().setAttribute(Session.SESSION_NAME, loginResult.getSession());
		us_sn = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		if(null==us_sn)
		{
			System.out.println("获取会话对象失败");
			return;
		}
	}
	url=StringUtil.decodeUrl(url);
	response.sendRedirect(url);
	
%>
