<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.rsp.module.webservice.apply.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@taglib prefix="s"  uri="/struts-tags"%>
<%
	String unid = request.getParameter("unid");
	RspWebServiceApply rspWebServiceApply = new RspWebServiceApplyManager().doFindBeanByKey(unid);
	Session ucapSession=(Session)session.getAttribute(Session.SESSION_NAME);
	User ucapUser=ucapSession.getUser();
	if(rspWebServiceApply==null || ucapSession==null){
		out.println("<script type='text/javascript'>top.lwin.alert('信息提示','操作有误！','info',1500);</script>");
		return;
	}
	//判断是否可撤销
	Boolean cancel=new Boolean(false);
	cancel=rspWebServiceApply.getCreate_user_id().equals( ucapUser.getUnid());
	
	
	request.setAttribute("cancel",cancel);
	request.setAttribute("rspWebServiceApply", rspWebServiceApply);
	request.setAttribute("path", request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<style>
	<!--
	.p_table01{background:#aed0ea;width:98%;}
	.p_table01 tr th{background:#fcfcfc;padding:4px 0px;padding:5px;text-align:right;}
	.p_table01 tr td{background:#fff;padding-left:5px;color:#666666;}
	-->
	</style>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<s:if test="#request.cancel">
			<button class="form_btn" id="cancel" fn="cancel"><img src="${path}/core/themes/default/images/admin/default_btn.gif">撤办</button>
		</s:if>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsp/rspWebServiceApplyAction.action">
		<input type="hidden" name="unid" id="unid" style="width:90%" value="${rspWebServiceApply.unid}"/>
		<table cellpadding="0" cellspacing="1" align="center"  class="p_table01">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th>应用系统名称：</th>
				<td>
					${rspWebServiceApply.application}
				</td>
				<th>访问服务ip：</th>
				<td>
					${rspWebServiceApply.v_ip}
				</td>
			</tr>
			<tr>
				<th>部门名称：</th>
				<td>
					${rspWebServiceApply.deptname}
				</td>
				<th>状态：</th>
				<td>
				<s:if test="#request.rspWebServiceApply.status==1">
					已审核
				</s:if>
				<s:elseif test="#request.rspWebServiceApply.status==0">
					待审核
				</s:elseif>
				<s:else>
					未提交
				</s:else>
				</td>
			</tr>
			<tr>
				<th>用户名：</th>
				<td>
					${rspWebServiceApply.v_user}
				</td>
				<th>密码：</th>
				<td>
					${rspWebServiceApply.v_password}
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<textarea  style="display:none" id="content">
					<s:property value="@com.linewell.core.util.ClobUtil@clobToStr(#request.rspWebServiceApply.content)"/>
					</textarea>
					<IFRAME ID="eWebEditor1" src="${path}/eWebEditor/ewebeditor.htm?id=content&style=coolblue" frameborder="0" scrolling="no" width="100%" height="328"></IFRAME>
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#cancel").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
	});
	
	//保存表单信息
	function doSave(){
			var fn=$(this).attr("fn");
			var fromAction =top.appPath+"rsp/rspWebServiceApply_"+fn+".action";
			$("#jspForm").ajaxSubmit({
				url: fromAction,
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
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
</script> 
</body>
</html>