<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucapx.common.WebAppUtils"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucapx.app.AppApi"%>
<%@page import="java.util.List"%>
<%
boolean canGoNext = false;
//获取除平台以外的所有应用系统
AppApi appApi = new AppApi();
List<App> appList = appApi.getAppListExceptPlat();
if(null != appList && !appList.isEmpty()){
	canGoNext = true;
	appList = null;
}

//应用的UNID
String appUnid = request.getParameter("appUnid");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />

<title>代码生成工具</title>
<%@include file="include/common.jsp"%>

<link href="style/genCode.css" rel="stylesheet" type="text/css" />

<script type="text/javascript">
	var moduleId = "<%=WebAppUtils.convertNull(moduleId)%>";
	var appUnid = "<%=WebAppUtils.convertNull(appUnid)%>";
	function nextStep(){
	   if(!<%= canGoNext%>){
	       alert("您还没有创建任何应用系统！\n请先到应用系统构建创建至少一套系统再做下一步的操作！");
	       return;
	   }
		var formIds = "<%=formIds%>";
		var url = "step1.jsp?redirect=1";
		if(moduleId){
		  url += "&moduleId=" + moduleId;
		}
		if(appUnid){
		  url += "&appUnid=" + appUnid;
        }
		this.location.href = url;		
	}

</script>
</head>
<body>
<!--底区域-->
<div class="area_bg_bottom ">
</div>
<!--主区域 begin-->
<div class="area_main_first ">
	<!--下一步-->
	<a class="button_next" href="javascript:void(0)" onclick="nextStep();">
	</a>
	<!--上一步-->
	<a class="button_pre_invalid" >
	</a>
	<!--文字说明区域-->
	<div class="area_text_explain">
		<!-- 图片 -->
		<img alt="" src="style/images/title_features.jpg"/>
		<!-- 空白行 -->
		<div class="blank">
		</div>
		<!-- 文字 -->
		<p>代码生成工具，通过制定的模块或指定的表单进行相关二次开发代码生成，主要包括前台代码(JSP、JS)与后台代码（ACTION、BEAN、MANAGER、DAO）。生成后，可以根据业务需要对生成代码进行修改！</p>
		<!-- 空白行 -->
		<div class="blank">
		</div>
		<!-- 图片 -->
		<img alt="" src="style/images/title_quickly.jpg" />
		<!-- 空白行 -->
		<div class="blank">
		</div>
		<!-- 文字 -->
		<p>只需通过以下三步就可以完成代码生成：<br />
		（1） 模块表单列表确认 <br />
		（2） 生成信息确认<br />
		（3） 表单映射关系</p>
	</div>
</div>
<!--主区域 end-->
</body>
</html>