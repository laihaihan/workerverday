﻿<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.log.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	RspLog rspLog = new RspLogManager().doFindBeanByKey(unid);
	if (null == rspLog) {
		fn = "add";
		rspLog = new RspLog();
		rspLog.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("rspLog", rspLog);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		
		<button class="form_btn" id="btnClose"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 
		</button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsplog.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid"  value="<%=rspLog.getUnid()%>">
		<input type="hidden" name="punid" id="punid" style="width:90%" value="${rspLog.punid}"/>
		<input type="hidden" name="operunid" id="operunid" style="width:90%" value="${rspLog.operunid}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th><font color="red">*</font>操作人</th>
				<td colspan="3">
					<input type="text" name="opername" id="opername" style="width:90%" value="${rspLog.opername}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>操作</th>
				<td colspan="3">
					<input type="text" name="doing" id="doing" style="width:90%" value="${rspLog.doing}"/>
				</td>
			</tr>
			
				
			<tr>
				<th><font color="red">*</font>操作时间</th>
				<td colspan="3">
					<input type="text" name="opertime" id="opertime" style="width:90%" value="${rspLog.opertime}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>操作内容</th>
				<td colspan="3">
					<input type="text" name="opercontent" id="opercontent" style="width:90%" value="${rspLog.opercontent}"/>
				</td>
			</tr>
			
						<tr>
				<th><font color="red">*</font>调用地址</th>
				<td colspan="3">
					<input type="text" name="fromip" id="fromip" style="width:90%" value="${rspLog.fromip}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>类型</th>
				<td colspan="3">
					<input type="text" name="type" id="type" style="width:90%" value="${rspLog.type}"/>
				</td>
			</tr>
					</table>
		</form>
	</div>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
	});
	
	//保存表单信息
	function doSave(){
		if(validate.validate()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
						if($('#fn').val()=='add'){							
							location.href='?unid='+$('#unid').val();
						}
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	
	    },
	    messages:{
	    	
	    }
  	});	
</script> 
</body>
</html>
