<%@page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<%@include file="/sys/jsp/header.jsp"%><!-- 如果不要页面头部部分可直接引用 session.jsp -->
<% 
	//WEB 应用路径
	//String sSystemPath = request.getContextPath()+"/";
%>
<style>
.headerBox{
background:#0086b9
}
</style>
</head>
<body>
<div id="roleTreeHtml">
<script type="text/javascript">
	Ext.onReady(function(){
		document.getElementById("ucapMenu").style.display="none";//如果直接引用 session.jsp这句必须注释掉
		//document.getElementById("headerBox").style.height=0;
		
		//动态加载js
		var loaderJs = new Ucap.JsModuleLoader();   
	    loaderJs.on("loaded", initMainPage);   
	    loaderJs.load({   
	        script:[   
	            '<%=sSystemPath%>UMC/js/UMCRole.js'
	        ]   
	    });
	    function initMainPage(){
	    	//去除成功加载后的事件
		    loaderJs.un("loaded", initMainPage);   
			//添加你下面要做的代码
			ucapRoleConfig.roleHaveAuth = ucapHeader.roleHaveAuth;
			ucapRoleConfig.initRole();
		}
	});
</script>

<div id="roleTree" style="overflow:hidden"></div>

<div id="roleHtml"  ></div>
<div id="_UmcRoleDept">
	<div id="ucapRoleCenter"></div>
</div>
</div>
</body>
</html>