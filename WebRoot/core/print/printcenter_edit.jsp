<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.apas.service.flow.ApasFlowManager"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.core.util.StrUtil"%>
<%@ page import="com.linewell.core.print.*"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String serviceid = request.getParameter("serviceid");
	String flowUnid = ApasFlowManager.getFlowId(serviceid);
	
	PrintCenter printCenter = new PrintCenterManager().doFindBeanByKey(unid);
	if (null == printCenter) {
		fn = "add";
		printCenter = new PrintCenter();
		printCenter.setUnid(new UNIDGenerate().getUnid());
		printCenter.setPunid(StrUtil.formatNull(serviceid));
	}
	
	request.setAttribute("printCenter", printCenter);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/PrintCenter.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid"  value="<%=printCenter.getUnid()%>">
		<input type="hidden" name="punid" id="punid"  value="<%=printCenter.getPunid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="80%" align="left">				
			<tr>
				<th><font color="red">*</font>打印名称：</th>
				<td>
					<input type="text" name="name" id="name" style="width:90%" value="${printCenter.name}"/>
				</td>
			</tr>
			<tr>
				<th>所属环节：</th>
				<td>
					<input type="text" name="nodename" id="nodename" style="width:50%" value="${printCenter.nodename}"/>
					<input type="button" onclick="openFlowConfig();" value="选择流程节点"/>
					<!-- <input type="button" onclick="openPrintNode();" value="选择单据"/> -->
					<input type="hidden" name="nodeunid" id="nodeunid" style="width:90%" value="${printCenter.nodeunid}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>打印类型：</th>
				<td>
					<select id="type" name="type">	
						<option value="1" ${printCenter.type == "1" ? "selected" : ""}>ireport打印方式</option>
						<option value="0" ${printCenter.type == "0" ? "selected" : ""}>lodop打印方式</option>
					</select>&nbsp;&nbsp;
					<input type="button" value="配置模板" onclick="openPrintConfig();"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>状态：</th>
				<td>
					<input type="radio" name="status" value="Y" ${printCenter.status != "N" ? "checked" : ""}>启用&nbsp;&nbsp;
					<input type="radio" name="status" value="N" ${printCenter.status == "N" ? "checked" : ""}>禁用
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
					top.lwin.parentWin().location.reload();
					top.lwin.close(true);
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		try{
			top.lwin.parentWin().location.reload();
		}catch(e){
		}
		top.lwin.close();
	}

	function openPrintConfig(){
		if($("#type").val() == "0"){
			top.lwin.open('/core/print/print_edit.jsp?punid=<%=printCenter.getUnid()%>','lodop打印模板配置',"900","500");
		}else if($("#type").val() == "1"){
			top.lwin.open('/core/print/printireport_edit.jsp?punid=<%=printCenter.getUnid()%>','ireport打印模板配置',"500","200");
		}
	}
	
	function openFlowConfig(){
		top.lwin.open("/core/ucap/flow/flow_select.jsp?flowUnid=<%=flowUnid%>","选择流程节点",800,250);
	}
	
	function openPrintNode(){
		top.lwin.open("/was/jsp/info/flow/printnode_select.jsp?serviceid=<%=serviceid%>","选择",400,250);	
	}

	//表单验证
	var validate = new Validation('jspForm', {
    	immediate: true,
	    validators: {
	      	name:'required',
	      	type:'required'
	    },
	    messages:{
	    	name:'请填写[名称]',
	    	type:'请选择[打印类型]'
	    }
  	});	
</script> 
</body>
</html>