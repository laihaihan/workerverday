<%@ page language="java" pageEncoding="UTF-8"%>
<%@	page import="com.linewell.ucap.session.Session"%>
<%@	page import="com.linewell.ucap.platform.cache.user.User"%>
<%
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	User user = ucapsession.getUser();
	
	request.setAttribute("path",request.getContextPath()); 
	request.setAttribute("user",user); 
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
			<button class="form_btn" id="btnSave"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
			<button class="form_btn" id="btnClose"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div>
		<div>
			<form id="jspForm" name="jspForm" method="post" action="${path}/UserCenter.action" >
			<input type="hidden" name="fn" value="setUserPassword">
			<input type="hidden" name="unid" value="${user.unid}">
			<table width="100%" class="form_table_ext">
				<col width="80" align="right" style="padding-right:5px;">
				<col align="left">
				<col>
				<tr>
					<th><font color="red">*</font>旧密码：</th>
					<td> 
						<input type="password" id="old_password" name="old_password" size="30" />
					</td>
				</tr>			
				<tr>
					<th><font color="red">*</font>新密码：</th>
					<td> 
						<input type="password" id="new_password" name="new_password" size="30" />
					</td>
				</tr>			
				<tr>
					<th><font color="red">*</font>确认密码：</th>
					<td> 
						<input type="password" id="password" name="password" size="30"  />
					</td>
				</tr>
			</table>
			</form>
		</div>
	</div>
	
	<script type="text/javascript">
		$(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
		
		//保存表单信息
		function doSave(){


			if(validate.validate()){
				if(!checkUserPassword()){
					top.lwin.alert('操作提示','旧密码错误！','warning',1500,true);
					return;
				}
				if($("#new_password").val() == $("#old_password").val()){
					top.lwin.alert('操作提示','新密码不能和旧密码一致！','warning',1500,true);
					return;
				}
				if($("#new_password").val() != $("#password").val()){
					top.lwin.alert('操作提示','新密码必须和确认密码一致！','warning',1500,true);
					return;
				}
			
				//var validate = new Validation('jspForm');
			
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.lwin.errorService();
					},
					success:function(data){
						if(data.result){
							top.lwin.alert('操作提示','操作成功','info',1000,true);
						}else{
							top.lwin.alert('操作提示','操作成功','error');
						}
					}
				});
			}
		}
		
		//关闭窗口
		function doClose(){
			top.lwin.close();
		}
		
		//验证密码
		function checkUserPassword(){
			var result = true;
			$.ajax({
	    		type: "get",
	    		cache: false,
	    		async: false,
	    		url: "${path}/UserCenter.action",
	    		data: {
	    			fn:'checkUserPassword',
	    			unid:"${user.unid}",
	    			password:$("#old_password").val()
	    		},
	    		dataType:"json",
	    		success: function(data){
	    			if(!data.result){
						result = false;
	    			}
	    		}
	    	});
	    	return result;
		}
		//表单验证
		var validate = new Validation('jspForm', { 
	    	immediate: true,
		    validators: {
				old_password:'required',
				new_password:'required',
				password:'required'
		    },
		    messages:{
		    	old_password:'请填写[旧密码]',
		    	new_password:'请填写[新密码]',
		    	password:'请填写[确认密码]'
		    }
	  	});	
	</script>
</body>
</html>