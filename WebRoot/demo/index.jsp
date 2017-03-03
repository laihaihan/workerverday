<%@page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<%@include file="/sys/jsp/session.jsp"%>

<script type="text/javascript" src="demo_menu.js"></script>
<script type="text/javascript" src="demo_portal.js"></script>
<script type="text/javascript" src="demo_navigation.js"></script>
<script type="text/javascript" src="demo_shortcut.js"></script>

<script type="text/javascript" src="demo_module.js"></script>
<script type="text/javascript" src="demo_viewl.js"></script>
<script type="text/javascript" src="../js/ucap/view/view.js"></script>
<script type="text/javascript" src="../js/ucap/portal/index.js"></script>
<script type="text/javascript" src="../js/ucap/portal/menu.js"></script>
<script type="text/javascript" src="../js/ucap/portal/Portal.js"></script>

<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/miframe.js"></script>

<script type="text/javascript">
Ext.onReady(function(){
	$("demo_div").innerHTML = ("已登录!");
});

/**
 *加载菜单
 */
function onMenu(){
	demoMenu.load();
}

/*
加载模块
*/
function onModuleByMenu()
{
	
}

//频道
function onPortal(){
	demoPortal.load();
}

/**
 *导航栏
 */
function onNavigation(){
	demoNavigation.load();
}

/**
 *快捷方式
 */
function onShortcut(){
	demoShortcut.load();
}

/*
视图相关js  加载视图  弹出一个新页面
2DBC01C30C1259E6CAFF4112355ADD22  任意一个视图的viewid
*/
function onView()
{
	window.open("../sys/jsp/view.jsp?viewId=2DBC01C30C1259E6CAFF4112355ADD22","传入一个任意的视图id");
}

/*
视图相关js  加载视图  渲染到指定的div上  demo_view_div

视图id  --viewId
punid
purl
默认有查询---noQuery 
默认有预览---noPreview
默认有自定义---noSelfConfig
默认为单选---isSingle
recordSplit
colSplit
是否有页签---isTab
是否顶部工具栏---noTbar
是否底部工具栏---noBbar
所属模块ID---bModuleUnid
initFormJspView(viewId,renderto,purl,bModuleUnid,noQuery,noPreview,noSelfConfig,isTab,noTbar,noBbar,isSingle,recordSplit,colSplit)


2DBC01C30C1259E6CAFF4112355ADD22  任意一个视图的viewid

*/
function onViewDiv()
{
	//需要引用view.js这个js文件---initFormJspView
	initFormJspView("2DBC01C30C1259E6CAFF4112355ADD22","demo_view_div");
	$("demo_module_name").innerHTML="";
	$("demo_module_div").innerHTML="";
}

</script>
</head>
<body>
<b>操作：从后台获取的json数据</b>
<div id="demo_div"  style="height:120px;overflow:scroll">未登录
</div>
<br/>
<input type="button" value="频道" onclick="onPortal();"/>
<input type="button" value="菜单" onclick="onMenu();"/>
<input type="button" value="表单"/>
<input type="button" value="导航" onclick="onNavigation();"/>
<input type="button" value="快捷方式" onclick="onShortcut();"/>
<input type="button"  name="viewDemoName1"   width="100px"   value="加载视图(直接打开新页面)"   onclick="onView()"  />
<input type="button"  name="viewDemoName2"   width="100px"   value="加载视图(渲染div)"   onclick="onViewDiv()"  />
<br/><br/>
<div id="demo_menu_div">
</div>
<br/>
<div style="width:99%;">
<div style="font-weight:bold;color:red;" id="demo_module_name"></div>
<div id="demo_module_div"  style="width:20%; height:400px;overflow:scroll;float:left">
</div>
<div id="demo_view_div" style="width:80%; height:400px;overflow:scroll;float:left">
</div>
</div>
<div id="demo_portal_div">
</div>

</body>
</html>