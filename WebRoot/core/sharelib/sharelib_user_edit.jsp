<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ page import="com.linewell.core.sharelib.user.ShareLibUser" %>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="java.util.List" %>
<%@page import="com.linewell.core.sharelib.user.ShareLibUserManager"%>
<% 
	String fn = "update";
	String unid = request.getParameter("unid");
	ShareLibUser shareLibUser = new ShareLibUserManager().doFindBeanByKey(unid);
	if(null == shareLibUser){
		fn = "add";
		shareLibUser = new ShareLibUser();
		shareLibUser.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("shareLibUser", shareLibUser);
%>
<HTML>
<HEAD>
	<TITLE>个人/企业信息</TITLE>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/icon.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/validation/style.css" />
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
		
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
		
		//关闭窗口
		function doClose(){
			top.lwin.close(true);
		}
	</script>
</HEAD>
<BODY text=#000000 bgColor=#ffffff >
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" id="btnSave"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"/>  保存 </button>
			<button class="form_btn" id="btnClose"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"/>  关闭 </button>
		</div>
		<div class="easyui-tabs" id="tabs">
			<div title="基本信息" style="padding:5px;background: #DEECFD;">
				<%@ include file="sharelib_user_baseinfo.jsp"%>
			</div>
			<div title="材料列表" style="padding:5px;background: #DEECFD;">
				<%@ include file="sharelib_user_attr.jsp"%>
			</div>
			<div title="操作日志" style="padding:5px;background: #DEECFD;">
				<%@ include file="sharelib_user_log.jsp"%>
			</div>	
		</div>
	</div>
</BODY>
</HTML>	