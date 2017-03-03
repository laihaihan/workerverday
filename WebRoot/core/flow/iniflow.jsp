<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.flow.config.FlowConfigBusiness"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.flow.config.FlowConfig"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String modId = request.getParameter("modId");
	

	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	
	FlowConfigBusiness flowConfigBusiness= new FlowConfigBusiness();
	List<FlowConfig> flowConfigList = flowConfigBusiness.getFLowListByModuleUnid(modId,ucapsession.getApp().getUnid());
	
	
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
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 流程初始化 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/flowtest.action">
		<input type="hidden" id="fn" name="fn" value="iniflow">
		<input type="hidden" id="docUnid" name="docUnid" value="<%=unid%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="85%" align="left">
			<tr>
				<th><font color="red">*</font>流程id：</th>
				<td>
					<select name="flowUnid" id="flowUnid" >
					<%
					for(FlowConfig flowConfig:flowConfigList){
						%>
						<option value='<%=flowConfig.getFlowid()%>'><%=flowConfig.getName()%></option>
						<%	
					}
					%>
					</select>
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