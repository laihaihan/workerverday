<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.rsp.module.site.RspSiteManager"%>
<%@page import="com.linewell.rsp.module.site.RspSite"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String belongto=request.getParameter("belongto");
	RspSiteManager manager=new RspSiteManager();
	RspSite rspSite = manager.doFindBeanByKey(unid);
	RspSite belongtoSite=null;
	if (null == rspSite) {
		fn = "add";
		rspSite = new RspSite();
		rspSite.setSite_unid(new UNIDGenerate().getUnid());
		belongtoSite= manager.doFindBeanByKey(belongto);	
	}else{
		if(!StrUtil.isNull(rspSite.getSite_belongto())){
			belongtoSite= manager.doFindBeanByKey(rspSite.getSite_belongto());	
		}
	}
	request.setAttribute("belongtoSite",belongtoSite);
	request.setAttribute("rspSite", rspSite);
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
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsp/rspSiteAction.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="site_unid" id="site_unid" value="<%=rspSite.getSite_unid()%>">
		<input type="hidden" name="site_belongto" id="site_belongto" value="${belongtoSite.site_unid}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			
			<tr>
				<th><font color="red">*</font>系统名称：</th>
				<td>
					<input type="text" name="site_name" id="site_name" style="width:90%" value="${rspSite.site_name}"/>
				</td>
				<th>所属系统：</th>
				<td>
					<input type="text" name="site_belongto_cn" id="site_belongto_cn" style="width:90%" value="${belongtoSite.site_name}" disabled="disabled" />	
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>排序：</th>
				<td>
					<input type="text" name="site_sort" id="site_sort" style="width:90%" value="${rspSite.site_sort}"/>
				</td>
				<th><font color="red">*</font>别名：</th>
				<td>
					<input type="text" name="site_alias" id="site_alias" style="width:90%" value="${rspSite.site_alias}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>是否启用：</th>
				<td>
					<%
					if("1".equals(rspSite.getSite_is_enabled())){
					%>
						<input name="site_is_enabled" type="radio" id="site_is_enabled" value="0" /> 是
						<input name="site_is_enabled" type="radio" id="site_is_enabled" value="1" checked/> 否
					<%	
					}else{
					%>
						<input name="site_is_enabled" type="radio" id="site_is_enabled" value="0" checked /> 是
						<input name="site_is_enabled" type="radio" id="site_is_enabled" value="1" /> 否
					<% 
					}
					%>
				</td>
				<th></th>
				<td></td>
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