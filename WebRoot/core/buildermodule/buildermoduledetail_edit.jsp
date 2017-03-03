<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.buildermodule.detail.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	BuilderModuleDetail builderModuleDetail = new BuilderModuleDetailManager().doFindBeanByKey(unid);
	if (null == builderModuleDetail) {
		fn = "add";
		builderModuleDetail = new BuilderModuleDetail();
		builderModuleDetail.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("builderModuleDetail", builderModuleDetail);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/buildermoduledetail.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=builderModuleDetail.getUnid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<tr>
  <th style='width:20%'><font color='red'>*</font>长度限制，没填默认500：</th>
  <td style='width:30%'>
    <input type='text' name='buildermoduledetail_lengthlimit' id='buildermoduledetail_lengthlimit' value='${builderModuleDetail.lengthlimit}'/>
  </td>
  <th style='width:20%'><font color='red'>*</font>主键：</th>
  <td style='width:30%'>
    <input type='text' name='buildermoduledetail_unid' id='buildermoduledetail_unid' value='${builderModuleDetail.unid}'/>
  </td>
</tr>
<tr>
  <th style='width:20%'><font color='red'>*</font>中文名、标题：</th>
  <td style='width:30%'>
    <input type='text' name='buildermoduledetail_caption' id='buildermoduledetail_caption' value='${builderModuleDetail.caption}'/>
  </td>
  <th style='width:20%'><font color='red'>*</font>字段英文名：根据中文翻译自动生成：</th>
  <td style='width:30%'>
    <input type='text' name='buildermoduledetail_enname' id='buildermoduledetail_enname' value='${builderModuleDetail.enname}'/>
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