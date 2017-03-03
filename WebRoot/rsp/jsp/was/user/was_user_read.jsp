<%@ page language="java" pageEncoding="UTF-8" %>
<%@page import="java.util.List"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasServiceManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicematerial.WasServiceMaterialManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasService"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicenotice.WasServiceNoticeManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.user.WasUser"%>
<%@page import="com.linewell.rsp.baseresouse.was.user.WasUserManager"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String fn = "update";
String unid = request.getParameter("unid");
WasUser wasUser = new WasUserManager().doFindBeanByKey(unid);
if(null == wasUser){
	fn = "add";
	wasUser = new WasUser();
	wasUser.setUnid(new UNIDGenerate().getUnid());
}

request.setAttribute("path", request.getContextPath());
request.setAttribute("wasUser", wasUser);
%>
<html>
<head>
  	<TITLE>个人/企业信息</TITLE>
  		<META http-equiv=Content-Type content="text/html; charset=utf-8">
  	<META http-equiv=pragma content=no-cache>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/jquery-ui/themes/cupertino/jquery.ui.all.css"/>
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.tabs.js"></script>
	<style>
	<!--
	.p_table01{background:#aed0ea;width:98%;}
	.p_table01 tr th{background:#fcfcfc;padding:4px 0px;padding:5px;text-align:right;}
	.p_table01 tr td{background:#fff;padding-left:5px;color:#666666;}
	-->
	</style>
</head>
<body>
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div id="tabs" >
		<ul>
			<li><a href="#tabs-1">基本信息</a></li>
		
		</ul>
		<div id="tabs-1" style="padding:5px;">
			<%@include file="was_user_read_baseinfo.jsp" %>
		</div>
		
	</div>
</div>
</body>
<script type="text/javascript">
	$(function(){
		$('#tabs').tabs();
		$("#btnClose").bind("click",doClose);
	})
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
</script>
</html>
