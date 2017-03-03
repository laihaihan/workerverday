<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.shareset.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	ShareSet shareSet = new ShareSetManager().doFindBeanByKey(unid);
	if (null == shareSet) {
		fn = "add";
		shareSet = new ShareSet();
		shareSet.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("shareSet", shareSet);
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
		<button class="form_btn" id="btnSave"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 
		</button>
		<button class="form_btn" id="btnClose"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 
		</button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/shareset.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid"  value="<%=shareSet.getUnid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
									<tr>
				<th><font color="red">*</font>主键</th>
				<td colspan="3">
					<input type="text" name="unid" id="unid" style="width:90%" value="${shareSet.unid}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>资源id</th>
				<td colspan="3">
					<input type="text" name="resourceid" id="resourceid" style="width:90%" value="${shareSet.resourceid}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>审批事项id</th>
				<td colspan="3">
					<input type="text" name="serviceid" id="serviceid" style="width:90%" value="${shareSet.serviceid}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>材料ID</th>
				<td colspan="3">
					<input type="text" name="materialid" id="materialid" style="width:90%" value="${shareSet.materialid}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>是否有效</th>
				<td colspan="3">
					<input type="text" name="isvalid" id="isvalid" style="width:90%" value="${shareSet.isvalid}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>开始时间</th>
				<td colspan="3">
					<input type="text" name="validbtime" id="validbtime" style="width:90%" value="${shareSet.validbtime}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>截止时间</th>
				<td colspan="3">
					<input type="text" name="validetime" id="validetime" style="width:90%" value="${shareSet.validetime}"/>
				</td>
			</tr>
						<tr>
				<th><font color="red">*</font>创建时间</th>
				<td colspan="3">
					<input type="text" name="createtime" id="createtime" style="width:90%" value="${shareSet.createtime}"/>
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
