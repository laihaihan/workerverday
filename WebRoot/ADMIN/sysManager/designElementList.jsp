<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.jdbc.core.JdbcTemplate"%>
<%@page import="java.sql.SQLException"%>
<%@page import="com.linewell.ucap.db.JDBCTool"%>
<%@page import="com.linewell.ucap.admin.module.DesignElementWrapper"%>
<%@include file="../include/session.jsp"%>
<%
//获取业务模块标识 
String moduleUnid = request.getParameter("moduleUnid");
String appUnid = request.getParameter("appUnid");

//如果为空，则为非法访问，直接退出不做处理
if (StringUtils.isEmpty(appUnid)
        || StringUtils.isEmpty(moduleUnid)){
    return;
}

String rs[][] = DesignElementWrapper.getElementByModuleUnid(moduleUnid);
if(null==rs && rs.length<2){
	return;
}
%>  
<!DOCTYPE html>
<html>
  <head> 
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>设计元素</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <style type="text/css"> </style>
	<link href="../module/style/stytle.css" rel="stylesheet" type="text/css" />
	<link href="../style/tip.css" rel="stylesheet" type="text/css" />
	<link href="../style/uploadPop.css" rel="stylesheet" type="text/css" />	
	<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
	<script language="javascript"  src="<%= systemPath %>default/js/jquery.cookie.js"></script>
	<script language="javascript" src="../default/js/linewell/linewell.core.js"></script>
	<script language="javascript" src="../js/common.js"></script>
	<script language="javascript"  src="../js/linewell.ucap.admin.settings.js"></script>
	<script language="javascript" src="../js/pageStep.js"></script>
	<script language="javascript" src="../js/jquery.tipHelp.js"></script>
	<%@include file="../include/platformresources.jsp"%>
  </head>
 <script type="text/javascript">
 /**
  * 刷新当前页面
  */
function refreshPage(){
	window.location.href = window.location.href;//刷新页面
}


//模拟试图的刷新，本页面之需要用到刷新本页   
var view={
   refresh:function(){
   	   refreshPage();
   },
   setGridHeight:function(){
   
   }
};
//模拟common.js中的参数
ucapCommonFun.ucapCurOpenType = 0;  
ucapCommonFun.autoMenuHeight = function(){};

  </script>
  <body>
  <div>
    <!-- 主区域 begin-->
	<div class="areaViewFormMain">
	<!-- 工具栏区域 -->
	
		<div class="formCfgToolBar">
			<h1>设计元素列表</h1>
		</div>
	
		<!--按钮列表区域 begin-->
		<div class="formCfgBtns">
		<%
			for(int i=1;i<7;i++){	
		%>	
		   	<div class="formCfgBtn" unid="<%=rs[i][0]%>" onclick="window.top.ucapManagerTree.navNodeEvent('<%=rs[i][0]%>')">
				<img alt="" src="../module/style/images/module/designIcon_<%=i%>.png" class="btnImg"/>
				<a><%=rs[i][1]%></a>
			</div>	
		<%} %>
		</div>
		<!--表单列表区域 end-->
	</div>
	<!-- 主区域 end-->
</div>
</body>
</html>
