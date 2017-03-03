<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.rsp.module.sitedept.RspSiteDept"%>
<%@page import="com.linewell.rsp.module.sitedept.RspSiteDeptManager"%>
<%@page import="com.linewell.rsp.module.site.RspSite"%>
<%@page import="com.linewell.rsp.module.site.RspSiteManager"%>
<% 
	String dept_unid = request.getParameter("unid");
	RspSiteDept dept= null;
	RspSiteDeptManager manager = new RspSiteDeptManager();
	String belongName = "";//上级部门名称
	RspSiteDept belongto=null;
	RspSite site=null;
	if(!StrUtil.isNull(dept_unid)){
		dept = manager.doFindBeanByKey(dept_unid);
		belongto = manager.doFindBeanByKey(dept.getDept_belongto());
		site=new RspSiteManager().doFindBeanByKey(dept.getDept_siteid());
	}
	request.setAttribute("site",site);
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("dept",dept);
	request.setAttribute("belongto",belongto);
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>安徽省公安厅网上办事大厅</title>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
</head>
<body>
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnClose"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 
		</button>
	</div>
	<div>
		<table width="98%" align="center" class="form_table_ext">
			<col width="18%" align="right">
			<col width="32%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th>部门名称：</th>
				<td>
					<span>${dept.dept_name}</span>
				</td>
				<th>部门别名：</th>
				<td>
					<span>${dept.dept_alias}</span>
				</td>
			</tr>
			<tr> 
				<th>是否业务部门：</th>
				<td>
					<span>${dept.dept_is_business==1?'是':'否' }</span>
				</td>
				<th>上级部门：</th>
				<td>
					<span>${belongto.dept_name}</span>
				</td>
				
			</tr>
			<tr>
				<th>所属站点</th>
				<td><span>${site.site_name}</span></td>
				<th></th>
				<td></td>
			</tr>
			</table>
	</div>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnClose").bind("click",doClose);
	});
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
</script>
</body>
</html>