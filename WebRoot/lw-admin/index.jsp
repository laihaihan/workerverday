<%--
/**
 * 内网首页
 * @author cyingquan@qq.com
 * @2010-01-04
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="com.linewell.core.system.SystemConfig" %>
<%@ page import="com.linewell.core.system.SystemConfigManager" %>
<%@ page import="com.linewell.core.util.StrUtil" %>
<%@page import="com.linewell.core.userstyle.defaul.UserDefaulStyleBusiness"%>
<%@page import="com.linewell.core.buttonapplication.ButtonApplicationBusiness"%>
<%@page import="java.util.List" %>
<%@ page import="com.linewell.core.constant.CoreConstants" %>
<%@page import="com.linewell.core.util.ListUtil"%>
<%@page import="java.util.ArrayList"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<% 
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	if(null == ucapSession){
		response.sendRedirect(request.getContextPath() + "/login.jsp");
		return;
	}
	
	//样式
    String ischoose = request.getParameter("ischoose");
	
	UserDefaulStyleBusiness userDefaulStyleBusiness = new UserDefaulStyleBusiness();
	String styleUrl = userDefaulStyleBusiness.getDefaulUrlByUser(ucapSession.getUser().getUnid());
	if(!styleUrl.equals("index.jsp")&&StrUtil.isNull(ischoose)){
		response.sendRedirect(styleUrl);
	}
	
	
	String app_unid = ucapSession.getApp().getUnid();
	SystemConfig sysCfg = new SystemConfigManager().doFindBeanByKey(app_unid);
	if(null == sysCfg){
		sysCfg = new SystemConfig();
		sysCfg.setApp_unid(app_unid);
		if(StrUtil.isNull(sysCfg.getLogo_img())){
			sysCfg.setLogo_img("/core/themes/default/images/admin/logo.gif");
		}
		if(StrUtil.isNull(sysCfg.getLeft_menu_style())){
			sysCfg.setLeft_menu_style("1");//默认为树形菜单
		}	
	}
	
	//判断当前系统是否有自定义首页
	if(!StrUtil.isNull(sysCfg.getIndex_page())){
		response.sendRedirect(request.getContextPath() + "/" + sysCfg.getIndex_page());
		return;
	}
	
	request.setAttribute("sysCfg",sysCfg);
	String roles = ucapSession.getUser().getRoles();
	ButtonApplicationBusiness business = new ButtonApplicationBusiness();
	String userUnid = ucapSession.getUser().getUnid();
	List buttonList = new ArrayList();
	if(CoreConstants.DICT_ADMIN_UNID.equals(userUnid)){
		buttonList = business.doFindListByAppUnid(CoreConstants.DICT_NAVIGATION_BUTTON);//4:标识为导航栏按钮
	} else {
		buttonList = business.doFindListByAppUnidAndButtonType(app_unid, CoreConstants.DICT_NAVIGATION_BUTTON, roles);//4:标识为导航栏按钮
	}
	request.setAttribute("buttonList", buttonList);
%>

<html>

<head>	
	<title>南威系统平台<%=cssPath %></title>
	${import_jquery}
	${import_easyui}
	${import_ztree}
	
	<link type="text/css" rel="stylesheet" href="<%=path + cssPath + "index.css" %>">	
	<script type="text/javascript" src="${corejs}/jquery.cookie.js"></script>
	<script type="text/javascript" src="${corejs}/json2.js"></script>
	<script type="text/javascript" src="${corejs}/jquery.jsoncookie.js"></script>
		
	<script type="text/javascript" src="${corejs}/lw-ui/load.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/winCookie.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/globalvar.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/menu.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/tabs.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/lwin.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/popup.js"></script>
	<!-- 增加部分为导航栏新增按钮，所需调用js方法文件 begin -->
	<script type="text/javascript" src="${corejs}/platform/buttonapplication/buttonapplication_edit.js"></script>
	<!-- 增加部分为导航栏新增按钮，所需调用js方法文件 end -->
	<script type="text/javascript" src="${corejs}/tipswindown/tipswindown.js"></script>
	<script type="text/javascript">
		$(function(){
			menu.init("${sysCfg.left_menu_style}","${sysCfg.menu_icon_style}");	
		});
	
	    window.onbeforeunload = onbeforeunload_handler;     
	    window.onunload = onunload_handler;     
	    function onbeforeunload_handler(){     
	        //alert(event.clientX);    
	        //alert(document.body.clientWidth);    
	        //if (event.clientX>document.body.clientWidth && event.clientY<0||event.altKey){ 
	        	  //window.event.returnValue="确定要退出本页吗？";
	        	 // var warning="确认退出?";             
	  	         // return warning;
	        //}
	        //history.go(0);
	    }     
	         
	    function onunload_handler(){     
	        //var warning="谢谢光临";     
	       // alert(warning);     
	    }     

		
		function openTab(title,viewid,modid,leafname,moduleId){
			//没有top.tabs对象，说明是使用平台的
			if(top.tabs==undefined){
				top.ucapCommonFun.indexOpen.directOpenMenu(moduleId,modid);
			}else{
				top.tabs.openTab(title,'','view.action?fn=grid&viewId='+viewid+'&_rand='+Math.random()+'&modId='+modid,leafname)	
			}
		}
	</script>
	<link rel="stylesheet" href="${corejs}/tipswindown/tipswindown.css" type="text/css" media="all" />
</head>
	
<body class="easyui-layout">
	<!-- 系统顶部页 -->
	<%@include file="home/north.jsp"%>
	
	<!-- 系统尾部页 -->		
	<%@include file="home/south.jsp"%>
	
	<!-- 系统菜单页 -->
	<%@include file="home/west.jsp"%>
	
	<!-- 功能选项卡 -->
	<%@include file="home/center.jsp"%>
	
	<!-- iframe 嵌入 -->
	<div id="div_iframe" style="display:none;width:100%;height:100%; top: 132px;overflow: hidden; position: absolute;">
		<iframe id="center_iframe" frameborder="0" width="100%" height="75%" marginheight="0" marginwidth="0" scrolling="n">
	</div>
</body>

</html>