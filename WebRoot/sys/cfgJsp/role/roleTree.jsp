<%@page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<% 
	//WEB 应用路径
	String sSystemPath = request.getContextPath()+"/";
%>
</head>
<body>
<div id="roleTreeHtml">
<script type="text/javascript">
	Ext.onReady(function(){
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