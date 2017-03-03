<%@page contentType="text/html;charset=UTF-8"%>
<% 
	//WEB 应用路径
	String sSystemPath = request.getContextPath()+"/";
%>
<body>
<div id="deptTreeHtml">
<script type="text/javascript">
	Ext.onReady(function(){
		//动态加载js
		var loaderJs = new Ucap.JsModuleLoader();   
	    loaderJs.on("loaded", initMainPage);   
	    loaderJs.load({   
	        script:[   
	            '<%=sSystemPath%>UMC/js/UMCDept.js'
	        ]   
	    });
	    function initMainPage(){
	    	//去除成功加载后的事件
		    loaderJs.un("loaded", initMainPage);   
		    ucapUmcDept.appManagerHaveAuthDept =ucapHeader.appManagerHaveAuthDept;
		    ucapUmcDept.deptManagerHaveAuthDept=ucapHeader.deptManagerHaveAuthDept;
		    ucapUmcDept.appRoleHaveAuthDept=ucapHeader.roleHaveAuth;
			//添加你下面要做的代码
			ucapUmcDept.initDept();
		}
	});	
</script>

<div id="deptTree"></div>

<div id="deptHtml"  >
	<div id="userView"></div>
	</div>
</div>
</body>