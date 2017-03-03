<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.rsp.applyInfo.flow.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	RspApplyFlow rspApplyFlow = new RspApplyFlowManager().doFindBeanByKey(unid);
	if (null == rspApplyFlow) {
		fn = "add";
		rspApplyFlow = new RspApplyFlow();
		rspApplyFlow.setFlow_unid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("rspApplyFlow", rspApplyFlow);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsp/rspapplyflow.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=rspApplyFlow.getFlow_unid()%>">
		<input type="hidden" name="flow_unid" id="flow_unid" style="width:90%" value="${rspApplyFlow.flow_unid}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
				<tr>
				<th><font color="red">*</font>流程名称：</th>
				<td>
					<input type="text" name="flow_name" id="flow_name" style="width:90%" value="${rspApplyFlow.flow_name}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>状态：</th>
				<td>
					<input type="text" name="flow_status" id="flow_status" style="width:90%" value="${rspApplyFlow.flow_status}"/>
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