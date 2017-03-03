<%@page contentType="text/html;charset=UTF-8"%>
<%
/*
 * 角色授权部门
 * @author xhuatang@linewell.com
 * @date   2011-04-27
 */
	String unid = request.getParameter("unid");
	String sSystemPath = request.getContextPath()+"/";
%>
<html>
<head>
<script type="text/javascript">
Ext.onReady(function(){
  //动态加载js
  var loaderJs = new Ucap.JsModuleLoader();   
  loaderJs.on("loaded", initMainPage);   
  loaderJs.load({   
      script:[   
          '<%=sSystemPath%>UMC/js/roleAuthDept.js?' + Math.random()
       ]   
   });
   /**
    * 初始化页面
    */
   function initMainPage(){    
      //去除成功加载后的事件
      loaderJs.un("loaded", initMainPage);
	    //添加你下面要做的代码
	    roleAuthDept.initRoleDeptTree("roleDeptTree","<%=unid%>");
  }
});
</script>
</head>
<body>

<div id="roleDeptTree"></div>

</body>
</html>