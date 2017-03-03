<%@ page language="java" pageEncoding="UTF-8" %>
<%@page import="java.util.List"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasServiceManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicematerial.WasServiceMaterialManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasService"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicenotice.WasServiceNoticeManager"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
  	String unid = request.getParameter("unid");
  	
	WasServiceManager serviceManager =new WasServiceManager();
  	WasServiceMaterialManager materialManager = new WasServiceMaterialManager();
 	WasService service =serviceManager.doFindBeanByKey(unid);
 	//附件列
 	String condition = "serviceid=? order by sortid";
	List materialList = materialManager.doFindListByCondition(condition,new Object[]{unid});
	//阅读须知
	WasServiceNoticeManager noticeManager=new WasServiceNoticeManager();
	condition = "serviceid=? order by sortid";
	List noticeList = noticeManager.doFindListByCondition(condition,new Object[]{unid});
	
 	request.setAttribute("materialList",materialList);
	request.setAttribute("noticeList",noticeList);
 	request.setAttribute("service",service);
 	request.setAttribute("path",request.getContextPath());
%>
<html>
<head>
  	<TITLE>事项</TITLE>
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
	<div id="tabs" style="background: #DEECFD;">
		<ul>
			<li><a href="#tabs-1">基本信息</a></li>
			<li><a href="#tabs-2">申报材料</a></li>
			<li><a href="#tabs-3">阅读须知</a></li>
		</ul>
		<div id="tabs-1" style="padding:5px;">
			<%@include file="was_service_read_baseinfo.jsp" %>
		</div>
		<div id="tabs-2" style="padding:5px;">
			<%@include file="was_service_read_material_list.jsp" %>
		</div>
		<div id="tabs-3" style="padding:5px;">
			<%@include file="was_service_read_notice_list.jsp" %>
		</div>
	</div>
	<%@include file="was_service_read_js.jsp" %>
</div>
</body>
</html>
