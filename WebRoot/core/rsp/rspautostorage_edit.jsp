<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.autostorage.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.DateTime;"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String servicename = request.getParameter("servicename");
	String serviceid = request.getParameter("serviceid");
	Autostorage autostorage = new AutostorageManager().doFindBeanByKey(unid);
	if (null == autostorage) {
		fn = "add";
		autostorage = new Autostorage();
		autostorage.setUnid(new UNIDGenerate().getUnid());
		autostorage.setCreatetime(new DateTime().getNowTime());
	}
	autostorage.setServiceid(serviceid);
	
	request.setAttribute("autostorage", autostorage);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/Autostorage.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid"  value="<%=autostorage.getUnid()%>">
		<input type="hidden" name="serviceid" id="serviceid" value="${autostorage.serviceid}">
		<input type="hidden" name="servicename" id="servicename" value=<%=servicename%>>
		<table width="98%" align="center" class="form_table_ext">
			<col width="30%" align="right">
			<col width="70%" align="left">
			<tr>
				<th><font color="red">*</font>审批事项名称：</th>
				<td><%=servicename%></td>
			</tr>
			<tr>
				<th><font color="red">*</font>申报材料是否自动入库：</th>
				<td>
					<input type="radio" name="ismaterialin" value="Y" <%if("Y".equals(autostorage.getIsmaterialin())) out.print("checked"); %>>是&nbsp;
			  		<input type="radio" name="ismaterialin" value="N" <%if(!"Y".equals(autostorage.getIsmaterialin())) out.print("checked"); %>>否
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>审批结果是否自动入库：</th>
				<td>
					<input type="radio" name="isapprovalin" value="Y" <%if("Y".equals(autostorage.getIsapprovalin())) out.print("checked"); %>>是&nbsp;
			  		<input type="radio" name="isapprovalin" value="N" <%if(!"Y".equals(autostorage.getIsapprovalin())) out.print("checked"); %>>否
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>表单信息是否自动入库：</th>
				<td>
					<input type="radio" name="isformalin" value="Y" <%if("Y".equals(autostorage.getIsformalin())) out.print("checked"); %>>是&nbsp;
			  		<input type="radio" name="isformalin" value="N" <%if(!"Y".equals(autostorage.getIsformalin())) out.print("checked"); %>>否
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>入库的状态：</th>
				<td>
					<select name="state" id="state" style="width:200px;" >
						<option value="">-请选择-</option>
						<option value='待审核' <%="待审核".equals(autostorage.getState())?"selected":""%> >待审核</option>
						<option value='通过' <%="通过".equals(autostorage.getState())?"selected":"" %>>通过</option>
						<option value='不通过' <%="不通过".equals(autostorage.getState())?"selected":"" %>>不通过</option>
					</select>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>创建时间：</th>
				<td>
					<input id="createtime" name="createtime" type="text" style="width:40%"value="${autostorage.createtime}"	readonly/>
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
							location.href='?unid='+$('#unid').val()+'&serviceid='+$('#serviceid').val()+'&servicename='+$('#servicename').val();
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
	      	state :'required'
	    },
	    messages:{
	    	state:'请选择[状态]'
	    }
  	});	
</script> 
</body>
</html>
