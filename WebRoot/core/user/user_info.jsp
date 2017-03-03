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
			<form id="jspForm" name="jspForm" method="post" action="${path}/UserCenter.action" class="required-validate">
			<input type="hidden" name="fn" value="setUserInfo">
			<input type="hidden" name="unid" value="${user.unid}">
			<table width="100%" class="form_table_ext">
				<col width="80" align="right" style="padding-right:5px;">
				<col align="left">
				<col>
				<tr>
					<th>姓名：</th>
					<td>${user.displayName}</td>
				</tr>
				<tr>
					<th>性别：</th>
					<td> 
						<input type="radio" name="sex" value="0" ${user.sex == "0" ? "checked" : ""}/>男
						<input type="radio" name="sex" value="1" ${user.sex != "0" ? "checked" : ""}/>女
					</td>
				</tr>
				<tr>
					<th>登录名：</th>
					<td> 
						<input type="text" id="loginName" name="loginName" value="${user.name}" size="30" class="required" title="请输入用户名"/>
					</td>
				</tr>			
				<tr>
					<th>手机号码：</th>
					<td> 
						<input type="text" id="mobile" name="mobile" value="${user.mobile}" size="30" class="required validate-integer validate-length-11" title="请输入11位手机号码"/>
					</td>
				</tr>			
				<tr>
					<th>邮箱：</th>
					<td> 
						<input type="text" id="mail" name="mail" value="${user.mail}" size="30" class="required validate-email" title="请输入正确格式的邮箱地址"/>
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
			var validate = new Validation('jspForm');
			if(validate.validate()){
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
	</script>
</body>
</html>