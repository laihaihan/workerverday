<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.ucap.dept.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("dept_unid");
	String appUnid = request.getParameter("APP_UNID");
	UcapDeptBusiness business = new UcapDeptBusiness();
	Map<String, String> map = new HashMap<String, String>();
	UcapDept dept = business.doFindBeanByKey(unid);
	if (null == dept) {
		fn = "add";
		dept = new UcapDept();
		dept.setDept_unid(new UNIDGenerate().getUnid());
	} else {
		map = business.getChineseName(dept);
	}
	request.setAttribute("map", map);
	request.setAttribute("dept", dept);
	request.setAttribute("path", request.getContextPath());
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
				<form id="jspForm" name="jspForm" method="post"	action="${path}/dept.action">
				<input type="hidden" id="fn" name="fn" value="<%=fn%>">
				<input type="hidden" name="dept_unid" id="dept_unid" value="${dept.dept_unid}">
				<input type="hidden" name="app_unid" id="app_unid" value="<%=appUnid %>">
				<table border="0" cellpadding="0" cellspacing="0" class="form_table" align="center">
					<COL width="20%">
					<COL width="30%">
					<COL width="20%">
					<COL width="30%">
					<tr>
						<th><font color="red">*</font>部门名称</th>
						<td>
							<input name="dept_name" id="dept_name"  value="${dept.dept_name}" type="text" class="inputbox" style="width: 98%;" />
						</td>
						<th>部门别名</th>
						<td>
							<input name="dept_name_spell" id="dept_name_spell" type="text" class="inputbox" value="${dept.dept_name_spell}" style="width: 98%;" />
						</td>
					</tr>
					<tr>
						<th>是否业务部门</th>
						<td>
							<input name="dept_is_business" type="radio" id="dept_is_business" value="1" ${dept.dept_is_business eq '1'?'checked="checked"':''}/> 是
          					<input name="dept_is_business" type="radio" id="dept_is_business" value="0" ${empty dept.dept_is_business?'checked="checked"':''} ${dept.dept_is_business eq '0'?'checked="checked"':''}/> 否
						</td>
						<th>是否启用</th>
						<td>
							<input name="dept_is_enabled" type="radio" id="dept_is_enabled" value="1" ${empty dept.dept_is_enabled?'checked="checked"':''} ${dept.dept_is_enabled eq '1'?'checked="checked"':''}/> 是
	          				<input name="dept_is_enabled" type="radio" id="dept_is_enabled" value="0" ${dept.dept_is_enabled eq '0'?'checked="checked"':''}/> 否
						</td>
					</tr>
					<tr>
						<th>部门编号</th>
						<td>
							<input name="dept_serial_number" id="dept_serial_number" type="text"  value="${dept.dept_serial_number}" class="inputbox" style="width: 98%;" />
						</td>
						<th>排序号</th>
						<td>
							<input name="dept_sort" id="dept_sort" type="text"  value="${dept.dept_sort}" class="inputbox" style="width: 98%;" />
						</td>
					</tr>
					<tr>
						<th>上级部门</th>
						<td>
							<input name="dept_belongto" id="dept_belongto" type="hidden" value="${dept.dept_belongto}" class="inputbox" /> 
							<input name="dept_belongto_cn_" id="dept_belongto_cn_" value="${map.dept_belongto_name}" type="text" class="inputbox" style="width: 90%;" /> 
							<input type="button" class="btnOnlyChannel" id="dept_belongto_btn" onclick="top.lwin.selectWindow('201','1','dept_belongto');">
						</td>
						<th>隶属部门</th>
						<td>
							<input name="dept_underdept" id="dept_underdept" type="hidden"  value="${dept.dept_underdept}" class="inputbox" /> 
							<input name="dept_underdept_cn_" id="dept_underdept_cn_" value="${map.dept_underdept_name}" type="text" class="inputbox" style="width: 90%;" /> 
							<input type="button" class="btnOnlyChannel" id="dept_underdept_btn" onclick="top.lwin.selectWindow('201','1','dept_underdept');">
						</td>
					</tr>
					<tr>
						<th>部门领导</th>
						<td colspan="3">
							<input name="dept_leaders" id="dept_leaders" type="hidden"  value="${dept.dept_leaders}" class="inputbox" /> 
							<input name="dept_leaders_cn_" id="dept_leaders_cn_" value="${map.dept_leaders_name}" type="text" class="inputbox" size="93" /> 
							<input type="button" class="btnOnlyChannel" id="dept_leaders_btn" onclick="top.lwin.selectWindow('200','0','dept_leaders');">
						</td>
					</tr>
					<tr>
						<th>部门管理员</th>
						<td colspan="3">
							<input name="dept_admins" id="dept_admins" type="hidden"  value="${dept.dept_admins}" class="inputbox" /> 
							<input name="dept_admins_cn_" id="dept_admins_cn_" value="${map.dept_admins_name}" type="text" class="inputbox" size="93" /> 
							<input type="button" class="btnOnlyChannel" id="dept_admins_btn" onclick="top.lwin.selectWindow('200','0','dept_admins');">
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
		top.lwin.close("true");
	}

	function checkForm(){
		var flag = true;
		if(!TextValidation.checkNull("dept_name","部门名称")){
			flag = false;
		}
		return flag;
	}

</script>
	</body>
</html>
