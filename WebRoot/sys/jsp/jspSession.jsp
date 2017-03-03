<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.style.Style"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucap.platform.authorized.app.AppManager"%>
<%@page import="com.linewell.ucap.platform.authorized.scheme.Scheme"%>
<%@page import="com.linewell.ucap.platform.authorized.scheme.SchemeManager"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.ucap.authorization.AuthorizationFilter"%>
<%@page import="com.linewell.ucap.util.JsonUtil" %>
<%@page import="com.linewell.ucap.platform.cache.style.StyleManager"%>
<%@page import="net.sf.json.JSONObject" %>
<%@page import="com.linewell.ucap.umc.config.ConfigManager"%>
<%
	//yjy2011-5-10 add 
	ConfigManager configManager = ConfigManager.getInstance();
	boolean haveAuthDept = configManager.isAppManagerHaveAuthDept();
	boolean deptManagerHaveAuthDept =configManager.isDeptManagerHaveAuthDept();
	boolean roleAuthDept = configManager.isAppRoleHaveAuthDept();
 %>
<% 
	//WEB 应用路径
	String sSystemPath = request.getContextPath()+"/";
	Session ucapSession = (Session) request.getSession().getAttribute(
				Session.SESSION_NAME); 
	if(null==ucapSession)return;
	//个人样式
	Style style = ucapSession.getStyle();
	if(null==style){
		StyleManager sm = new StyleManager();
		style = sm.doFindAll().get(0);
		ucapSession.setStyle(style);
	}
	String sUserStylePath =sSystemPath+style.getPath()+"/";
	App app = null;
	
	//允许应用系统指定相应的系统标识 ，完成到指定系统的跳转，跳转过程中界面风格不做变化 add by llp 2010-08-26
	String appUnid = request.getParameter("appUnid");
	if(null!=appUnid && !appUnid.trim().equals("")){
		AppManager aManager = new AppManager();
		app = aManager.doFinByPunidAndSession(appUnid,ucapSession);
		if(null!=app){
		    SchemeManager sm = new SchemeManager();
		    Scheme scheme = sm.getSchemeByAppId(app.getPunid(), ucapSession);
		    ucapSession.setApp(app);
		    ucapSession.setScheme(scheme);
		}
	}//end 

	app = ucapSession.getApp();	
	//当前起作用的界面风格
	Scheme scheme = ucapSession.getScheme(); 
	
	String sMenuType=null;
	String sNavType=null ;
	String sOpenStyle=null ;
	String sviewOpenType=null ;
	String newdocType=null ;
	String opendocType=null ;
	String logoName=null;
	String sindexType=null;
	String sindex=null;
	//yjy 2011-4-29 保证可从UMC中引用
	if (scheme!=null){
		 sMenuType = scheme.getMenuStyle();
		 sNavType = scheme.getNavigationType();
		 sOpenStyle = scheme.getOpenStyle();
		 sviewOpenType = scheme.getOpenStyle();
		 newdocType = scheme.getNewdocType();
		 opendocType = scheme.getOpendocType();
		 logoName = scheme.getPicture();
		 sindexType = scheme.getIndexType();
		 sindex =scheme.getIndex();
	}
	if(sindexType ==null || "".equals(sindexType) ) sindexType="1";
	if(sindex ==null || "".equals(sindex) ) sindex="1";
	
	if(sMenuType ==null || "".equals(sMenuType) ) sMenuType="1";
	int menuType = Integer.parseInt(sMenuType);
	
	
	if(sNavType ==null || "".equals(sNavType) ) sNavType="1";
	int navType = Integer.parseInt(sNavType);
	
	
	if(sOpenStyle ==null || "".equals(sOpenStyle) ) sOpenStyle="2";
	int openStyle = Integer.parseInt(sOpenStyle);
	//窗口的打开方式，只对视图有用
	
	if (sviewOpenType==null || "".equals(sviewOpenType)) sviewOpenType="2";
	int viewOpenType = Integer.parseInt(sviewOpenType);	
	
	//新建文档方式
	
	if (newdocType==null || "".equals(newdocType)) newdocType="0";
	
	//打开文档方式
	
	if (opendocType==null || "".equals(opendocType)) opendocType="0";
	
	//LOGO图片
	
	if (logoName == null || "".equals(logoName)) logoName = "logo.gif";

	boolean selfConfig =false;
	if(null!=app)
	{
		selfConfig= AuthorizationFilter.selfConfig(app.getEditUsers(),app.getUneditUsers(),ucapSession);
	}
	//把用户对象设置到前台的全局对象中
	User user = ucapSession.getUser();
	//转化为json对象
	JSONObject json = JsonUtil.objectToJSON(user);
	json.remove("password");
	json.remove("name");
	json.remove("question");
	json.remove("answer");
	json.remove("userOpinions");
	String userJson =json.toString();	
	
	//System.out.println("userJson="+userJson);
	
%>
<script language="javascript" type="text/javascript">  
	var ucapHeader ={
		sUserStylePath :"<%=sUserStylePath%>",
		appManagerHaveAuthDept:<%=haveAuthDept%>,
		deptManagerHaveAuthDept:<%=deptManagerHaveAuthDept%>,
		roleHaveAuth:<%=roleAuthDept%>,
		menuType : <%=menuType%>,
		navType : <%=navType%>,
		openStyle:<%=openStyle%>,
		viewOpenType:<%=viewOpenType%>,
		userJson:<%=userJson%>,
		indexType:"<%=sindexType%>",
		newdocType:"<%=newdocType%>",
		opendocType:"<%=opendocType%>",
		index:"<%=sindex%>",
		selfConfig:<%=selfConfig%>
		<%
			if(null!=app)
			{
				%>
				//批量附件上传总大小 
				,attrSizeMax:'<%=(app.getAttrSizeMax()==null?"":app.getAttrSizeMax())%>',
				appUnid:"<%=app.getPunid()%>",
				//单一附件上传大小
				attrFileSizeMax:'<%=(app.getAttrFileSizeMax()==null?"":app.getAttrFileSizeMax())%>',
				attrCfgPath:'<%=(app.getAttrConfigPath()==null?"":app.getAttrConfigPath().replace("\\","/"))%>',
				formHtmlPath:'<%=(app.getFormHtmlPath()==null?"":app.getFormHtmlPath().replace("\\","/"))%>'
				<%
			}
		%>

	}
</script>
