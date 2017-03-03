<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.portlet.Portlet"%>
<%@ page import="com.linewell.core.portlet.PortletManager"%>
<%@ page import="com.linewell.core.view.View"%>
<%@ page import="com.linewell.core.view.ViewManager"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@ taglib prefix="s" uri="/struts-tags"%> 
<%@include file="/core/params.jsp" %>
<%
	String unid = request.getParameter("unid");
	Portlet portlet = new PortletManager().doFindBeanByKey(unid);
	String fn = "update";
	View view = null; 
	String viewName= "";
	if("-1".equals(unid) || portlet==null){
		fn = "add";
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		String appUnid = request.getParameter("APP_UNID");
		if(StrUtil.isNull(appUnid)){
			appUnid = ucapSession.getApp().getUnid();
		}
		portlet = new Portlet();
		portlet.setPortlet_unid(new UNIDGenerate().getUnid());
		portlet.setApp_unid(appUnid);
	}else{
		ViewManager viewManager = new ViewManager();
		//类型为视图
		//if("0".equals(portlet.getPortlet_type())){
			view = viewManager.getView(portlet.getPortlet_src());
			if(view != null){
				viewName = view.getName();
			}
		//}
	}
	request.setAttribute("portlet",portlet);
%>
<html>
<head>
	${import_theme}
	<script type="text/javascript" src="${corejs}/jquery.js"></script>
	<script type="text/javascript" src="${corejs}/jquery.form.js"></script>
	
	<link rel="stylesheet" type="text/css" href="${corejs}/validation/style.css" />
	<script type="text/javascript" src="${corejs}/validation/validation-min.js"></script>
</head>
<body>
	<form action="portlet.action" name="jspForm" id="jspForm" method="post">
	<input type="hidden" name="fn" value="<%=fn %>"/>
	<input type="hidden" id="portlet_unid" name="portlet_unid" value="${portlet.app_unid}"/>
	<input type="hidden" id="app_unid" name="app_unid" value="${portlet.app_unid}"/>
	
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" type="submit"> <img align="absMiddle" src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
			<button class="form_btn" onclick="top.lwin.close()"> <img align="absMiddle" src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div>
		<div>
			<table width="100%" class="form_table">
			<col width="20%" align="right">
			<col width="80%">
			<col>
			<tr>
				<th><font color="red">*</font>名称：</th>
				<td><input type="text" class="required" title="请填写[名称]" name="portlet_name" value="${portlet.portlet_name}"/></td>
			</tr>
			<tr>
				<th>样式：</th>
				<td>
					<label><input type="radio" name="portlet_type" value="0" ${empty portlet.portlet_type?'checked=true':''} ${portlet.portlet_type==0?'checked=true':''}>列表</label>
					<label><input type="radio" name="portlet_type" value="1" ${portlet.portlet_type==1?'checked=true':''}>链接</label>
					<label><input type="radio" name="portlet_type" value="2" ${portlet.portlet_type==2?'checked=true':''}>FLASH</label>					
				</td>
			</tr>
			<tr>
				<th>数据来源类型：</th>
				<td>
					<label><input type="radio" name="portlet_src_type" value="0" ${empty portlet.portlet_src_type?'checked=true':''} ${portlet.portlet_src_type==0?'checked=true':''}>视图</label>
					<label><input type="radio" name="portlet_src_type" value="1" ${portlet.portlet_src_type==1?'checked=true':''}>URL</label>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>数据来源值：</th>
				<td>
					<input type="text" class="required" title="请填写" id="portlet_src_text" name="portlet_src_text" value="<%=viewName%>" readOnly/>	
					<input  type="hidden" id="portlet_src" name="portlet_src" value="${portlet.portlet_src}"/>				
					<input type="hidden"  id="portlet_view_column" name="portlet_view_column" value="${portlet.portlet_view_column}"/>
					<input type="button" value="" class="btnOnlyChannel" onclick="openView(this)">
				</td>
			</tr>
			</table>
		</div>
	</div>
	</form>
	
	<script type="text/javascript">
	$(function(){
		//ajax from 
		var validate = new Validation('jspForm');
		$("#jspForm").ajaxForm({
			dataType:'json',
			beforeSubmit:function(){
				return validate.validate();
			},
			error:function(){
				top.lwin.errorService();
			},
			success:function(responseText){
				if(responseText.success){
					top.lwin.alert('操作提示','保存成功','info',1000,true);
					location.href = 'portlet.jsp?unid='+responseText.obj.portlet_unid;
				}else{
					top.lwin.alert('操作提示','保存成功','error');
				}
			}
		});
	});	
	
	function openView(e){
		var viewId = $('#portlet_src').val();
		var columnList = $('#portlet_view_column').val();
		top.lwin.showModalDialog("core/portlets/choose.jsp?viewId="+viewId+"&columns="+columnList,"选择视图",680,450);
	}
	</script>
</body>
</html>