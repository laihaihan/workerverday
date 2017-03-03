<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../../default/common.jsp"%> 
<%@page import="com.linewell.ucap.platform.authorized.app.App" %>
<%@page import="com.linewell.ucap.platform.authorized.app.AppManager" %>
<%
/**
 * 管理页面
 * 2011-11-29 add by xhuatang@linewell.com 管理页面引用的公共文件  
 * @auth xhuatang@linewell.com
 * @since 2011-08-16
 */
//需要是平台管理员
if(null == ucapSession){
    response.sendRedirect(systemPath + "ADMIN/login.jsp");
    return;
}

boolean isPlatFormManager = false;
AppManager appManager = new AppManager();       
App platApp = appManager.getAppByResourceUnid(App.PLATFORM_APP_UNID);
//为解决统一登录问题 modify by zhua@linewell.com 2012-3-12
//if ((","+platApp.getAdmins()+",").contains(","+ucapSession.getUser().getUnid()+",")){
//    isPlatFormManager = true;
//}
isPlatFormManager = true;
//需要是平台管理员
if(!isPlatFormManager){
    response.sendRedirect(systemPath + "ADMIN/login.jsp");
    return;
}

//个人样式
userStyle = ucapSession.getStyle();
if(null == userStyle){
    StyleApi sm = new StyleApi();
    userStyle = sm.getAllStyle().get(0);
    ucapSession.setStyle(userStyle);
}
userStylePath = systemPath + userStyle.getPath() + "/";
%>