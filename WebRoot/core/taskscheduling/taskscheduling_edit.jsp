<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.task.taskscheduling.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.ucap.session.Session"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	TaskScheduling taskScheduling = new TaskSchedulingManager().doFindBeanByKey(unid);
	if (null == taskScheduling) {
		fn = "add";
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME); 
		taskScheduling = new TaskScheduling();
		taskScheduling.setUnid(new UNIDGenerate().getUnid());
		taskScheduling.setApp_unid(ucapSession.getApp().getUnid());
	}
	
	request.setAttribute("taskScheduling", taskScheduling);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/datepicker/WdatePicker.js"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/TaskScheduling.action">
		<input type="hidden" name="fn" id="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="${taskScheduling.unid}">
		<input type="hidden" name="app_unid" id="app_unid"  value="${taskScheduling.app_unid}">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">						
			<tr>
				<th><font color="red">*</font>任务调度名称：</th>
				<td colspan="3">
					<input type="text" name="name" id="name" style="width:80%" value="${taskScheduling.name}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>任务执行类：</th>
				<td colspan="3">
					<input type="text" name="classesname" id="classesname" style="width:80%" value="${taskScheduling.classesname}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>任务开始时间：</th>
				<td>
					<input type="text" id=starttime name=starttime class="Wdate" readonly value="${taskScheduling.starttime}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})" readonly/>
				</td>
				<th><font color="red">*</font>任务结束时间：</th>
				<td>
					<input type="text" id=endtime name=endtime class="Wdate" readonly value="${taskScheduling.endtime}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})" readonly/>
				</td>
			</tr>
			<tr>
				<th>规则说明：</th>
				<td colspan="3">
					<input type="text" name="ruledirections" id="ruledirections" style="width:80%" value="${taskScheduling.ruledirections}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>规则表达式：</th>
				<td colspan="3">
					<input type="text" name="rulecontent" id="rulecontent" style="width:80%" value="${taskScheduling.rulecontent}"/>
					<input type="button" onclick="setRule();" value="规则配置">
				</td>
			</tr>
			<tr>
				<th>执行次数：</th>
				<td colspan="3">
					<input type="text" name="executecount" id="executecount" style="width:80%" value="${taskScheduling.executecount}"/>
				</td>
			</tr>
			<tr>
				<th>备注：</th>
				<td colspan="3">
					<input type="text" name="memo" id="memo" style="width:80%" value="${taskScheduling.memo}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>状态：</th>
				<td colspan="3">
					<input type="radio" name="status" value="Y" <%=!"N".equals(taskScheduling.getStatus())?"checked":"" %>>启用&nbsp;&nbsp;
					<input type="radio" name="status" value="N" <%="N".equals(taskScheduling.getStatus())?"checked":"" %>>禁用
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
		if($("#starttime").val() != "" && $("#endtime").val() != "" && $("#starttime").val() > $("#endtime").val()){
			top.lwin.alert('操作提示','开始时间不能大于结束时间！','warning',1500);
			return;
		}
		if(validate.validate()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
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
	
	function setRule(){
		top.lwin.open('core/taskscheduling/timeschedule.jsp','任务调度规则配置','700','300');

	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	name:'required',
	      	classesname:'required',
	      	starttime:'required',
	      	endtime:'required',
	      	rulecontent:'required'
	    },
	    messages:{
	    	name:'请填写[任务调度名称]',
	    	classesname:'请填写[任务执行类]',
	    	starttime:'请选择[任务开始时间]',
	    	endtime:'请选择[任务结束时间]',
	    	rulecontent:'请填写[规则表达式]'
	    }
  	});	
</script> 
</body>
</html>
