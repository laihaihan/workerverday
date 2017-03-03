<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.linewell.rsp.baseresouse.was.projinfo.WasProjInfoManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.projinfo.WasProjInfo"%>
<%@page import="com.linewell.rsp.baseresouse.was.projunitrela.WasProjUnitRelaManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.projunitrela.WasProjUnitRela"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String unid = request.getParameter("unid");
//得到项目信息
WasProjInfoManager  projInfoManager=new WasProjInfoManager();
WasProjInfo projInfo =projInfoManager.doFindBeanByKey(unid);
//业主单位信息
WasProjUnitRelaManager  unitManager =new WasProjUnitRelaManager();
WasProjUnitRela ownerUnit = unitManager.doFindByProjIdAndUnitType(projInfo.getProj_id(),unitManager.TYPE_OF_OWNER_UNIT);

//申报单位信息
WasProjUnitRela reporterUnit = unitManager.doFindByProjIdAndUnitType(projInfo.getProj_id(),unitManager.TYPE_OF_REPORTER_UNIT);
System.out.println("reporterUnit"+reporterUnit);
System.out.println("ownerUnit"+ownerUnit);
request.setAttribute("reporterUnit",reporterUnit);
request.setAttribute("ownerUnit",ownerUnit);
request.setAttribute("projInfo",projInfo);
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
	<div id="tabs" >
		<ul>
			<li><a href="#tabs-1">基本信息</a></li>
			<li><a href="#tabs-2">单位信息</a></li>
			<li><a href="#tabs-3">分类及指标信息</a></li>
		</ul>
		<div id="tabs-1" style="padding:5px;">
			<%@include file="was_projInfo_read_baseinfo.jsp" %>
		</div>
		<div id="tabs-2" style="padding:5px;">
			<%@include file="was_projInfo_read_unitinfo.jsp" %>
		</div>
		<div id="tabs-3" style="padding:5px;">
			<%@include file="was_projInfo_read_classify.jsp" %>
		</div>
	</div>
	<script type="text/javascript">
		$(function(){
			$('#tabs').tabs();
			$("#btnClose").bind("click",doClose);
		})
		//关闭窗口
		function doClose(){
			top.lwin.close(true);
		}
	</script>
</div>
</body>
</html>
