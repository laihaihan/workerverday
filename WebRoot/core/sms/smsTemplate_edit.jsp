<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.sms.*"%>
<%@ page import="com.linewell.core.sms.template.*"%>
<%@ page import="com.linewell.core.sms.template.SmsTemplate"%>
<%@ page import="com.linewell.core.util.DateTime"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.ucap.session.Session"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	SmsTemplate smsTemplate = new SmsTemplateManager().doFindBeanByKey(unid);
	if (null == smsTemplate) {
		fn = "add";
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		
		smsTemplate = new SmsTemplate();
		smsTemplate.setUnid(new UNIDGenerate().getUnid());
		smsTemplate.setType("");
		smsTemplate.setContent("");
		smsTemplate.setMemo("");
		smsTemplate.setApp_unid(ucapSession.getApp().getUnid());
	}
	
	request.setAttribute("smsTemplate", smsTemplate);
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
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/SmsTemplate.action">
		<input type="hidden" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" value="${smsTemplate.unid}">
		<input type="hidden" name="app_unid" value="${smsTemplate.app_unid}">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th><font color="red">*</font>模板名称</th>
				<td colspan="3">
					<input type="text" name="type" id="type" style="width:370" value="${smsTemplate.type}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>模板内容</th>
				<td colspan="3">
					<textarea name="content" id="content" style="width:370" rows="5">${smsTemplate.content}</textarea>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>模板备注</th>
				<td colspan="3">
					<textarea name="memo" id="memo" style="width:370" rows="5">${smsTemplate.memo}</textarea>
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
						//if($('#fn').val()=='add'){							
						//	location.href='?unid='+$('#unid').val();
						//}
						top.lwin.close(true);
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close(true);
	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
			type:'required',
	      	content:'required',
	      	memo : 'required'
	    },
	    messages:{
	    	type:'请填写[模板名称]',
	    	content:'请填写[模板内容]',
	    	memo:'请填写[模板备注]'
	    }
  	});	
</script> 
</body>
</html>