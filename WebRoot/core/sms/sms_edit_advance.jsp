<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.sms.*"%>
<%@ page import="com.linewell.core.util.DateTime"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.ucap.session.Session"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	Sms sms = new SmsManager().doFindBeanByKey(unid);
	if (null == sms) {
		fn = "add";
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		
		sms = new Sms();
		sms.setUnid(new UNIDGenerate().getUnid());
		sms.setSendtime(DateTime.getNowDateTime());
		sms.setStatus("0");//默认为“未发送”
		sms.setApp_unid(ucapSession.getApp().getUnid());
		sms.setMemo("预登记提醒");
	}
	
	request.setAttribute("sms", sms);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/Sms.action">
		<input type="hidden" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" value="${sms.unid}">
		<input type="hidden" name="sendtime" value="${sms.sendtime}">
		<input type="hidden" name="status" value="${sms.status}">
		<input type="hidden" name="app_unid" value="${sms.app_unid}">
		<input type="hidden" name="memo" value="${sms.memo}">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="85%" align="left">
			<tr>
				<th><font color="red">*</font>短信接收号码</th>
				<td>
					<input type="text" name="receiver" id="receiver" style="width:90%" value="${sms.receiver}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>短信内容</th>
				<td>
					<textarea rows="10" style="width:90%" name="content" id="content">${sms.content}</textarea>
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
		top.lwin.close(true);
	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	receiver:'required',
	      	content:'required'
	    },
	    messages:{
	    	receiver:'请填写[短信接收号码]',
	    	content:'请填写[短信内容]'
	    }
  	});	
</script> 
</body>
</html>