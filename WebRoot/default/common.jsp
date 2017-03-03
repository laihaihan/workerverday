<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session" %>
<%@page import="com.linewell.ucapx.common.WebAppUtils" %> 
<%@page import="com.linewell.ucap.platform.cache.style.Style"%>
<%@page import="com.linewell.ucapx.style.StyleApi"%>
<%
/**
 * 系统的公共文件，处理系统的参数信息并定义全局的变量
 * 此文件只在应用系统的common.jsp中调用，其他文件不可调用
 * @auth xhuatang@linewell.com
 * @since 2011-07-01
 */
//系统的路径
String systemPath = request.getContextPath() + "/";

//获取Session对象
Session ucapSession = WebAppUtils.getSession(request);
//用户的类型
Style userStyle = null;
//用户类型的路径
String userStylePath = "";
if(null != ucapSession){
	//个人样式
	userStyle = ucapSession.getStyle();
	if(null==userStyle){
		StyleApi sm = new StyleApi();
		userStyle = sm.getAllStyle().get(0);
		ucapSession.setStyle(userStyle);
	}
	userStylePath = systemPath + userStyle.getPath() + "/";
}
%>

