<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.ucap.role.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.core.ucap.dept.UcapDeptBusiness"%>
<%@include file="/core/params.jsp" %>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String appUnid = request.getParameter("APP_UNID");
	RoleManager manager = new RoleManager();
	UcapDeptBusiness business = new UcapDeptBusiness();
	Role role = manager.doFindBeanByKey(unid);
	String fRoleName = "";
	String personName = "";
	if (null == role) {
		fn = "add";
		role = new Role();
		role.setRole_unid(new UNIDGenerate().getUnid());
		role.setRole_belong_to_app(appUnid);
	} else {
		if(!StrUtil.isNull(role.getRole_funid())){
			Role fRole = manager.doFindBeanByKey(role.getRole_funid());
			if(fRole != null){
				fRoleName = fRole.getRole_name();
			}
		}
		if(!StrUtil.isNull(role.getRole_users())){
			personName = business.getUserNameByUserUnid(role.getRole_users());
		}
	}
	request.setAttribute("personName", personName);
	request.setAttribute("fRoleName", fRoleName);
	request.setAttribute("role", role);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_jquery}
	${import_poshytip}
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
</head>
<body>
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/role.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" id="role_unid" name="role_unid" value="${role.role_unid}">
		<input type="hidden" name="role_belong_to_app" id="role_belong_to_app" value="${role.role_belong_to_app}">
		<table border="0" cellpadding="0" cellspacing="0" class="form_table" align="center">
			<COL width="20%">
			<COL width="30%">
			<COL width="20%">
			<COL width="30%">
			<tr>
				<th><font color="red">*</font>角色名称</th>
				<td>
					<input type="text" name="role_name" id="role_name" value="${role.role_name}" style="width: 98%;"/>
				</td>
				<th>角色别名</th>
				<td>
					<input type="text" name="role_name_spell" id="role_name_spell" value="${role.role_name_spell}" style="width: 98%;"/>
				</td>
			</tr>
			<tr>
				<th>父级角色</th>
				<td>
					<input name="role_funid" id="role_funid" type="hidden"  value="${role.role_funid}" class="inputbox" /> 
					<input name="role_funid_cn_" id="role_funid_cn_" type="text" value="${fRoleName}" class="inputbox" style="width: 90%;" /> 
					<input type="button" class="btnOnlyChannel" id="role_funid_btn" onclick="top.lwin.selectWindow('203','1','role_funid');" />
				</td>
				<th>角色类型</th>
				<td>
					<select id="role_type" style="width: 98%;" name="role_type" value='${role.role_type}'>
						<option value="">请选择</option>
						<option value="sysAd" ${role.role_type eq 'sysAd'?'selected="selected"':''}>系统管理员</option>
						<option value="audAd" ${role.role_type eq 'audAd'?'selected="selected"':''}>审计管理员</option>
						<option value="secAd" ${role.role_type eq 'secAd'?'selected="selected"':''}>安全管理员</option>
					</select>
				</td>
			</tr>
			<tr>
				<th>是否可创建角色</th>
				<td>
					<input name="role_can_create" type="radio" id="role_can_create" value="1" ${empty role.role_can_create?'checked="checked"':''} ${role.role_can_create eq '1'?'checked="checked"':''}/> 是
        			<input name="role_can_create" type="radio" id="role_can_create" value="0" ${role.role_can_create eq '0'?'checked="checked"':''}/> 否
				</td>
				<th>是否可授权</th>
				<td>
					<input name="role_can_authorize" type="radio" id="role_can_authorize" value="1" ${empty role.role_can_authorize?'checked="checked"':''} ${role.role_can_authorize eq '1'?'checked="checked"':''}/> 是
        			<input name="role_can_authorize" type="radio" id="role_can_authorize" value="0" ${role.role_can_authorize eq '0'?'checked="checked"':''}/> 否
				</td>
			</tr>
			<tr>
				<th>角色成员</th>
				<td colspan="3">
					<input name="role_users" id="role_users" type="hidden" value="${role.role_users}" class="inputbox" /> 
					<input name="role_users_cn_" id="role_users_cn_" value="${personName}" type="text" class="inputbox" size="93" /> 
					<input type="button" class="btnOnlyChannel" id="role_users_btn" onclick="top.lwin.selectWindow('200','0','role_users');">
				</td>
			</tr>
			<tr>
				<th>排序号</th>
				<td colspan="3">
					<input type="text" name="role_sort" id="role_sort" value="${role.role_sort}" style="width: 99%;"/>
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
	function checkForm(){
		var flag = true;
		if(!TextValidation.checkNull("role_name","角色名称")){
			flag = false;
		}
		return flag;
	}
</script> 
</body>
</html>