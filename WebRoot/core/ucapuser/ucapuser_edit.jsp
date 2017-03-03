<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.ucap.user.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate"%>
<%@ page import="com.linewell.core.ucap.role.ChooseRoleManager"%>
<%@page import="com.linewell.core.ucap.dept.UcapDeptBusiness"%>
<%@include file="/core/params.jsp" %>


<%
	String fn = "update";
	String unid = request.getParameter("user_unid");
	String treeId = request.getParameter("treeId");
	String appUnid = request.getParameter("APP_UNID");

	User user = new UserManager().doFindBeanByKey(unid);
	UcapDeptBusiness business = new UcapDeptBusiness();
	if (null == user) {
		fn = "add";
		user = new User();
		user.setUser_unid(new UNIDGenerate().getUnid());
		user.setUser_depts(treeId);
		
	}

	request.setAttribute("user", user);
	request.setAttribute("path", request.getContextPath());
	ChooseRoleManager chooseRoleManager = new ChooseRoleManager();
%>

<html>
	<head>
		${import_jquery}
		${import_poshytip}
		<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css"> 
		<style>
		
		#form_toolbar {
			WIDTH: 100%;
			HEIGHT: 35px;
			position: relative;
			/*top: expression(document.getElementById("form_content").scrollTop );*/
			TEXT-ALIGN: right;
			PADDING-BOTTOM: 0px;
			PADDING-LEFT: 0px;
			PADDING-RIGHT: 0px;
			PADDING-TOP: 5px;
			BACKGROUND: url(${path}/core/themes/default/images/admin/toollist_bg.gif) repeat-x center top;
			z-index: 99;
		}
		.form_btn {
			BORDER-BOTTOM: medium none;
			BORDER-LEFT: medium none;
			MARGIN: 0px;
			BACKGROUND: none transparent scroll repeat 0% 0%;
			HEIGHT: 25px;
			COLOR: #333;
			BORDER-TOP: medium none;
			CURSOR: pointer;
			BORDER-RIGHT: medium none
		}
		</style>
	</head>
	<body>
		<div id="form_content">
			<div id="form_toolbar" style="">
				<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif">保存</button>
				<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif">关闭</button>
			</div>
			<div>
				<form id="jspForm" name="jspForm" method="post"	action="${path}/user.action">
				<input type="hidden" id="fn" name="fn" value="<%=fn%>">
				<input type="hidden" name="user_unid" id="user_unid" value="${user.user_unid}">
				<input type="hidden" name="user_depts" id="user_depts" value="${user.user_depts}">
				<input type="hidden" name="app_unid" id="app_unid" value="<%=appUnid %>">
				<table border="0" cellpadding="0" cellspacing="0" class="form_table" align="center">
					<COL width="20%">
					<COL width="30%">
					<COL width="20%">
					<COL width="30%">
					<tr>
						<th><font color="red">*</font>用户名：</th>
						<td>
							<input name="user_display_name" id="user_display_name"  value="${user.user_display_name}"
								type="text" class="inputbox" style="width: 98%;" />
						</td>
						<th>用户拼音：</th>
						<td>
							<input name="user_display_name_spell" id="user_display_name_spell" type="text" class="inputbox"  
								value="${user.user_display_name_spell}" style="width: 98%;" />
						</td>
					</tr>
					<tr>
						<th><font color="red">*</font>登录名：</th>
						<td>
							<input name="user_login_name" id="user_login_name" type="text"  
								value="${user.user_login_name}" class="inputbox" style="width: 98%;" />
						</td>
						<th><font color="red">*</font>密码：</th>
						<td>
							<input name="user_password" id="user_password" type="password" 
								value="${user.user_password}" class="inputbox" style="width: 98%;" itemValue="" />
						</td>
					</tr>

					<tr>
						<th><font color="red">*</font>手机：</th>
						<td>
							<input name="user_mobile" id="user_mobile" type="text"  value="${user.user_mobile}"
								class="inputbox" style="width: 98%;" />
						</td>
						<th>即时通讯号码：</th>
						<td>
							<input name="user_message_number" id="user_message_number"  value="${user.user_message_number}"
								type="text" class="inputbox" style="width: 98%;" />
						</td>
					</tr>
					<tr>
						<th>电子邮箱：</th>
						<td colspan="3">
							<input name="user_mail" id="user_mail" type="text"  value="${user.user_mail}"
								class="inputbox" style="width: 99%;" />
						</td>
					</tr>
					<tr>
						<th>密码问题：</th>
						<td colspan="3">
							<input name="user_question" id="user_question" type="text"  value="${user.user_question}"
								class="inputbox" style="width: 99%;"/>
						</td>
					</tr>
					<tr>
						<th>密码答案：</th>
						<td colspan="3">
							<input name="user_answer" id="user_answer" type="text"  value="${user.user_answer}"
								class="inputbox" style="width: 99%;"/>
						</td>
					</tr>
					<tr>
						<th>请选择角色：</th>
						<td colspan="3">
							<input name="user_roles" id="user_roles" type="hidden"  value="${user.user_roles}" class="inputbox" /> 
							<input name="user_roles_cn_" id="user_roles_cn_" type="text" class="inputbox" size="93"
								value="<%=chooseRoleManager.formatRoleIdToRoleName(user.getUser_roles()) %>" /> 
							<input type="button" class="btnOnlyChannel"  id="btnmodulename" onclick="top.lwin.selectWindow('203','0','user_roles');"">
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
		if(checkForm()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
				    if(data.exist){
						top.lwin.alert('信息提示','登录名已存在','info');
						return;
					}
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
						if($('#fn').val()=='add'){							
							location.href='?user_unid='+$('#user_unid').val();
						}
						top.lwin.close(true);
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
				}
			});
		}
	}
	
	function selectRole(){
		var selectedVal = $("#user_roles").val();
		top.lwin.open("/core/permission/choose_personnel_range.jsp?displayId=user_roles_show&fn=getRole&hiddenId=user_roles&separate=,","选择",600,450);
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close("true");
	}

	function checkForm(){
		var flag = true;
		if(!TextValidation.checkNull("user_display_name;user_login_name;user_password;user_mobile;user_depts_cn_","用户名;登录名;密码;手机;部门")){
			flag = false;
		}
		if(!TextValidation.checkEmail("checktime","邮件")){
			flag = false;
		}
		return flag;
	}

</script>
	</body>
</html>
