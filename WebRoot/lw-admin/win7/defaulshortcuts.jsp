<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.core.style.windows.usershortcut.UserShortcut"%>
<%@page import="com.linewell.core.style.windows.usershortcut.UserShortcutManager"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	UserShortcut userShortcut = new UserShortcutManager().doFindBeanByKey(unid);
	if (null == userShortcut) {
		fn = "add";
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME); 
		userShortcut = new UserShortcut();
		userShortcut.setUnid(new UNIDGenerate().getUnid());
		App app = ucapSession.getApp();
		userShortcut.setApp_unid(app.getUnid());
		userShortcut.setUserid("SYSTEM");
	}
	
	request.setAttribute("userShortcut", userShortcut);
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
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/usershortcut.action">
		<input type="hidden" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" value="${userShortcut.unid}">
		<input type="hidden" name="app_unid" value="${userShortcut.app_unid}">
		<input type="hidden" name="userid" value="SYSTEM">
		
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th style="width:100"><font color="red">*</font>模块名称：</th>
				<td colspan="3">
					<input type="text" name="shortcutname" id="shortcutname" value="${userShortcut.shortcutid}" size="50"/>&nbsp;
					<input type="hidden" name="shortcutid" id="shortcutid" value=""/>&nbsp;
					<input type="button" class="btnOnlyChannel"  id="btnmodulename">
				</td>
			</tr>
			<tr>
				<th ><font color="red">*</font>X坐标：</th>
				<td>
					<input type="text" name="coordinate_left" id="coordinate_left" style="width:100" value="${userShortcut.coordinate_left}"/>
				</td>
				<th><font color="red">*</font>Y坐标：</th>
				<td>
					<input type="text" name="coordinate_top" id="coordinate_top" style="width:100" value="${userShortcut.coordinate_top}"/>
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
		$('#btnmodulename').bind('click',function(){
			var jndiName = "${userShortcut.app_unid}";
			window.showModalDialog("moduleTree.jsp?belongToApp="+jndiName+"&id=shortcutid&name=shortcutname",window);
		});
	});
	
	function doSave(){
		if(validate.validate()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						if($(":hidden:[name='fn']").val() == "add"){
							top.jQuery.messager.confirm('操作提示','保存成功,是否继续新增', function(r){
								if (r){
									top.tabs.refreshTabGrid();
									location.href = "${path}/lw-admin/win7/defaulshortcuts.jsp?unid=-1";
								}else{
									top.lwin.close("pWin");
								}
							});
						}else{
							top.lwin.alert("信息提示","操作成功","info",1500);
							top.lwin.close("pWin");
						}
					}else{
						top.lwin.alert("信息提示","操作失败","error",1500);
					}
				}
			});
		}
	}
	
	function doClose(){
		top.lwin.close("pWin");
	}
</script>
<script type="text/javascript">
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	shortcutid:'required',
	      	coordinate_left:'required',
	      	coordinate_top:'required'
	    },
	    messages:{
	    	shortcutid:'请填写[模块id]',
	    	coordinate_left:'请填写[X坐标]',
	    	coordinate_top:'请填写[Y坐标]'
	    }
  	});	
</script> 
</body>
</html>
