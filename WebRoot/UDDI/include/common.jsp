<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.util.monitor.Monitor"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucap.platform.authorized.app.AppManager"%>
<%!
/**
 * 获取按钮的状态信息
 */
String getStatusBtnText(boolean st, String addStr){
  if(true == st){
    return "禁用" + addStr;    
  }else{
    return "启用" + addStr;
  }    
}

/**
 * 获取按钮的状态，只有管理员且为调试模式才能够管理
 * @param session Session对象
 */
boolean getBtnStatus(Session session){
	boolean isDebug = Monitor.getInstance().isDebug();
	if(!isDebug || null == session)
		return false;
	boolean isPlatFormManager = false;
    AppManager appManager = new AppManager();       
    App platApp = appManager.getAppByResourceUnid(App.PLATFORM_APP_UNID);
    if ((","+platApp.getAdmins()+",").contains(","+session.getUser().getUnid()+",")){
        isPlatFormManager = true;
    }else{
    	isPlatFormManager = false;
    }
    return isPlatFormManager;
}
%>