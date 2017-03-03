<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.core.style.windows.userdesktippic.UserDesktipPicBussiness"%>
<%@page import="com.linewell.core.style.windows.usershortcut.UserShortcutBusiness"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%
	request.setAttribute("path", request.getContextPath());


	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
	App app = ucapSession.getApp();
	
	UserDesktipPicBussiness userDesktipPicBussiness = new UserDesktipPicBussiness();
	UserShortcutBusiness userShortcutBusiness = new UserShortcutBusiness();
	
	//没配置自定义快捷方式则取系统自带快捷方式
	String shortcutUserid = user.getUnid();
	if(!userShortcutBusiness.isHaveDShortcut(app.getUnid(),user.getUnid())){
		shortcutUserid = "SYSTEM";
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="x-ua-compatible" content="ie=emulateie8" />
<meta name="description" content="JavaScript desktop environment built with jQuery." />
<title>政务平台</title>
<!--[if lt IE 7]>
<script>
window.top.location = 'http://desktop.sonspring.com/ie.html';
</script>
<![endif]-->
<link rel="stylesheet" href="${path}/core/js/win7style/assets/stylesheets/html.css" />
<link rel="stylesheet" href="${path}/core/js/win7style/assets/stylesheets/desktop.css" />
<link rel="stylesheet" href="${path}/core/js/win7style/startmenu/css/style.css" />
<link rel="stylesheet" href="${path}/core/js/win7style/deskpicset/css/index_back.css" />
<!--[if lt IE 9]>
<link rel="stylesheet" href="${path}/core/js/win7style/assets/stylesheets/ie.css" />
<![endif]-->


</head>

<body>
<div class="abs" id="wrapper">
<!-- 右上角消息提醒灯 -->
<div  style="">

</div>

	
	<div class="abs" id="desktop">
		<!-- 桌面图标 开始~~~~~~~~~~~~~~~~~~-->
		<%=userShortcutBusiness.genSysShortcutsIcon(app.getUnid(),request.getContextPath(),shortcutUserid).toString()%>
		<!--------------弹出框内容 开始-------------------->		
		<%=userShortcutBusiness.genSysShortcutsShowContent(app.getUnid(),request.getContextPath(),shortcutUserid).toString()%>
	</div>
	
	<!--------------任务栏-------------------->
	<div class="abs" id="bar_bottom">
		<a class="float_left" href="#" onclick="startMenu();">
			开始
		</a>
		<ul id="dock">
			<%=userShortcutBusiness.genSysShortcutsTaskBar(app.getUnid(),request.getContextPath(),shortcutUserid).toString()%>
		</ul>
		<div id="show_desktop" title="显示桌面">
			<img src="${path}/core/js/win7style/assets/images/TaskbarShowDesktopItem.png" height="100"/>
		</div>
		<div class="float_right" id="timetable" align="center">
		</div>
	</div>
	<!--------------任务栏-------------------->

<!-- 开始菜单树 -->
<%@include file="win7/startmenu.jsp"%>
<!-- 桌面右键菜单 -->
<%@include file="win7/rightkeymenu.jsp"%>

</div>
<script type="text/javascript">
var appPath = '${path}';
var curpicpath = '<%=userDesktipPicBussiness.getCurpicpath(user.getUnid(),app.getUnid())%>';
var curContextmenuId;
var app_unid = '<%=app.getUnid()%>';
var userid =  '<%=user.getUnid()%>';
</script>

<!--[if IE 6]>
<script type="text/javascript" src="${path}/core/js/win7style/deskpicset/js/DD_belatedPNG.js" ></script>
<script type="text/javascript">
DD_belatedPNG.fix('.bgT,.bgC');
</script>
<![endif]-->

<script src="${path}/core/js/win7style/assets/javascripts/jquery.js"></script>
<script src="${path}/core/js/win7style/assets/javascripts/jquery.desktop.js"></script>

<link rel="stylesheet" type="text/css" href="/app/core/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="/app/core/js/easyui/themes/icon.css">
<script type="text/javascript" src="/app/core/js/win7style/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/app/core/js/easyui/plugins/jquery.messager.js"></script>
<script type="text/javascript" src="/app/core/js/easyui/locale/easyui-lang-zh_CN.js"></script>

<script type="text/javascript" src="${path}/core/js/datetime.js"></script>
<script type="text/javascript" src="${path}/core/js/jquery.cookie.js"></script>
<script type="text/javascript" src="${path}/core/js/json2.js"></script>
<script type="text/javascript" src="${path}/core/js/jquery.jsoncookie.js"></script>
	
<script type="text/javascript" src="${path}/core/js/lw-ui/tabs.js"></script>
<script type="text/javascript" src="${path}/core/js/lw-ui/winCookie.js"></script>
<script type="text/javascript" src="${path}/core/js/lw-ui/globalvar.js"></script>
<script type="text/javascript" src="${path}/core/js/lw-ui/lwin.js"></script>
<script type="text/javascript" src="${path}/core/js/lw-ui/popup.js"></script>
<script type="text/javascript" src="${path}/core/js/lw-ui/win7style.js"></script>
<script type="text/javascript" src="${path}/core/js/lw-ui/win7bussiness.js"></script>

</body>
</html>