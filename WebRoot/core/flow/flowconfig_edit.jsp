<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.flow.config.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	FlowConfig flowConfig = new FlowConfigManager().doFindBeanByKey(unid);
	if (null == flowConfig) {
		fn = "add";
		flowConfig = new FlowConfig();
		flowConfig.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("flowConfig", flowConfig);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/flowconfig.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=flowConfig.getUnid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="85%" align="left">
			<tr>
				<th><font color="red">*</font>流程名称：</th>
				<td>
					<input type="text" name="name" id="name" style="width:90%" value="${flowConfig.name}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>流程所属：</th>
				<td>
					<input type="text" name="punid" id="punid" style="width:90%" value="${flowConfig.punid}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>流程主键：</th>
				<td>
					<input type="text" name="flowid" id="flowid" style="width:90%" value="${flowConfig.flowid}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>状态：1.候选    2.绑定    99.删除：</th>
				<td>
					<input type="text" name="state" id="state" style="width:90%" value="${flowConfig.state}"/>
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