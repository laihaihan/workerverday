<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.flow.flowtest.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	FlowTest flowTest = new FlowTestManager().doFindBeanByKey(unid);
	if (null == flowTest) {
		fn = "add";
		flowTest = new FlowTest();
		flowTest.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("flowTest", flowTest);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/flowtest.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=flowTest.getUnid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="85%" align="left">
			<tr>
				<th><font color="red">*</font>标题：</th>
				<td>
					<input type="text" name="flowTest[]title" id="flowTest[]title" style="width:90%" value="${flowTest.title}"/>
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