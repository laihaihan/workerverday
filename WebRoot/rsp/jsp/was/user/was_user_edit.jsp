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
	String siteid =request.getParameter("siteid");
	wasUser = new WasUser();
	wasUser.setSiteid(siteid);
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
	<link rel="stylesheet" type="text/css" href="${path}/core/js/validation/style.css" />
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.tabs.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
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
		<button class="form_btn" id="btnSave"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"/>  保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div id="tabs" >
		<ul>
			<li><a href="#tabs-1">基本信息</a></li>
		
		</ul>
		<form action="${path}/rsp/wasUserAction.action" method="post" id="editForm" name="editForm">
			<input type="hidden" name="fn" value="<%=fn%>" />
			<input type="hidden" name="unid" value="${wasUser.unid}" />
			<input type="hidden" name="datafrom" value="0">
			<div id="tabs-1" style="padding:5px;">
				<%@include file="was_user_edit_baseinfo.jsp" %>
			</div>
		</form>
	</div>
</div>
</body>
<script type="text/javascript">
	$(function(){
		$('#tabs').tabs();
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
	})
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
	
	//保存用户信息
	function doSave(){
		if(validate.validate()){
			$("#editForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.popup.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					top.lwin.close(true);
				}
			});
		}
	}
	
	var validate = new Validation('editForm', { 
    	immediate: true,
	    validators: {
	      name:'required',
	      regist_money:'float',
	      manage_area:'float'
	    },
	    messages:{
	    	name:'请填写[个人/企业名称]',
	    	regist_money:'请填写[注册资金必须为数字]',
	    	manage_area:'请填写[经营面积必须为数字]'
	    }
  	});	
</script>
</html>
