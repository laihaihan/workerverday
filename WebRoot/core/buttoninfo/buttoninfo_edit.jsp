<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.button.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String appUnid = request.getParameter("APP_UNID");
	appUnid = StrUtil.formatNull(appUnid);
	ButtonManager manager = new ButtonManager();
	
	Button button = manager.doFindBeanByKey(unid);
	if (null == button) {
		fn = "add";
		button = new Button();
		button.setButton_unid(new UNIDGenerate().getUnid());
		button.setButton_belongto(appUnid);
	}
	
	request.setAttribute("button", button);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/buttonInfo.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="button_unid" id="button_unid" value="<%=button.getButton_unid()%>">
		<input type="hidden" name="button[]button_belongto" id="belongto" value="<%=button.getButton_belongto()%>">
		<input type="hidden" name="button[]button_type" id="type" value="1">
		<table width="98%" align="center" class="form_table">
			<tr>
				<th width=100px align=right><font color='red'>*</font>按钮名称</th>
			  	<td>
			    	<input  style='width:375px' type='text' name='button[]button_name' id='name' value='${button.button_name}'/>
			  	</td>
			</tr>
			<tr>
		   		<th width=100px align=right><font color='red'>*</font>按钮方法</th>
		   		<td>
		       		<input type="text" name="button[]button_fn" id="fn" value="${button.button_fn}" style="width:375px;">
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
	
	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	name:'required',
	      	fn:'required'
	    },
	    messages:{
	    	name:'请填写[按钮名称]',
	    	fn:'请填写[方法名称]'
	    }
  	});	
  	
  	//关闭窗口
  	function doClose(){
		top.lwin.close();
	}
</script> 
</body>
</html>