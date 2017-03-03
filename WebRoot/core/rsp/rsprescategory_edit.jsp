<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.category.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String punid = request.getParameter("punid");
	
	RspResCategory rspResCategory = new RspResCategoryManager().doFindBeanByKey(unid);
	if (null == rspResCategory) {
		fn = "add";
		rspResCategory = new RspResCategory();
		rspResCategory.setUnid(new UNIDGenerate().getUnid());
		rspResCategory.setStatus("Y");
		rspResCategory.setParentunid(punid);
		
	}
	
	request.setAttribute("rspResCategory", rspResCategory);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsprescategory.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid"  value="<%=rspResCategory.getUnid()%>">
		<input type="hidden" name="parentunid" id="parentunid"  value="${rspResCategory.parentunid}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="30%" align="left">
			<tr>
				<th><font color="red">*</font>目录名称：</th>
				<td colspan="3">
					<input type="text" name="name" id="name" style="width:90%" value="${rspResCategory.name}"/>
				</td>
			</tr>
			<tr>
				<th>备注：</th>
				<td colspan="3">
					<textarea name="memo" id="memo" style="width:90%" rows="5">${rspResCategory.memo}</textarea>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>排序号：</th>
				<td>
					<input type="text" name="sortid" id="sortid" style="width:90%" value="${rspResCategory.sortid}"/>
				</td>
				<th><font color="red">*</font>状态：</th>
				<td>
					<input type="radio" name="status" value="Y" <%="Y".equals(rspResCategory.getStatus()) ? "checked" : "" %>>是&nbsp;
			  		<input type="radio" name="status" value="N" <%=!"Y".equals(rspResCategory.getStatus()) ? "checked" : "" %>>否
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
	      		name :'required',
	      		state :'required',
	      		sortid:'integer'
	    },
	    messages:{
	    		name:'请填写[名称]',
	    		state:'请选择[状态]',
	    		sortid:'请填写[排序号并且只能是数字]'
	    }
  	});	
</script> 
</body>
</html>
