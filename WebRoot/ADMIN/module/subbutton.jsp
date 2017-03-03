<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%
/**
 * 
 * @author 
 * @since 
 */
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String formUnid = request.getParameter("formUnid");//表单UNID
String moduleUnid = request.getParameter("moduleUnid");//模块UNID
String viewUnid = request.getParameter("viewUnid");//视图UNID
String belongtToAppUnid = request.getParameter("belongtToAppUnid");//所属应用系统UNID
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>按钮配置</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="style/pop.css" rel="stylesheet" type="text/css" />
	<script language="javascript"
	src="<%=systemPath%>default/js/jquery-1.6.1.min.js"></script>
  </head>
  <script type="text/javascript">
  /**
   * 上一步
   */
  function nextStep(){
	
	this.location.href = "tip.jsp?formUnid="+<%=formUnid%>+"&moduleUnid="+<%=moduleUnid%>;
	 
	  
  }
  </script>
  <body>
  <!-- 主区域 begin-->
<div class="areaMain">
<iframe src="subbuttons.jsp?unid=E2DC53EB1F11ECDBAFC62B50A7892D52&personalconfig=1&belongToAppId=<%=belongtToAppUnid %>&formId=<%=formUnid%>" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" id="formFrame"></iframe>
<!-- 按钮区 -->
		<div class="popBtns">
			<input name="Button1" type="button" value="下一步" onclick="nextStep()"/>
			<input name="Button1" type="button" value="上一步" />
		</div>
</div>
<!-- 主区域 end-->
  </body>
</html>