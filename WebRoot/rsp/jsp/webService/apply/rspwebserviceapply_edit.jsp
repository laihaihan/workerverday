<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.rsp.module.webservice.apply.*"%>
<%@taglib prefix="s"  uri="/struts-tags"%>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	RspWebServiceApply rspWebServiceApply = new RspWebServiceApplyManager().doFindBeanByKey(unid);
	if (null == rspWebServiceApply) {
		fn = "add";
		rspWebServiceApply = new RspWebServiceApply();
		rspWebServiceApply.setStatus(-1);
	}
	request.setAttribute("fn",fn);
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
		<button class="form_btn" id="btnSave" fn="${fn}"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<s:if test="#request.rspWebServiceApply.status==-1">
			<button class="form_btn" id="btnSaveAndApply" fn="${fn}AndApply"><img src="${path}/core/themes/default/images/admin/default_btn.gif">保存并提交</button>
		</s:if>
		<s:elseif test="#request.rspWebServiceApply.status==0">
			<button class="form_btn" id="pass" fn="pass"><img src="${path}/core/themes/default/images/admin/default_btn.gif">通过</button>
			<button class="form_btn" id="notPass" fn="notPass"><img src="${path}/core/themes/default/images/admin/default_btn.gif">不通过</button>
		</s:elseif>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" >
		<input type="hidden" name="unid" id="unid" style="width:90%" value="${rspWebServiceApply.unid}"/>
		<table cellpadding="0" cellspacing="1" align="center"  class="p_table01">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th><font color="red">*</font>应用系统名称：</th>
				<td>
					<input type="text" name="application" id="application" style="width:90%" value="${rspWebServiceApply.application}"/>
				</td>
				<th><font color="red">*</font>访问服务ip：</th>
				<td>
					<input type="text" name="v_ip" id="v_ip" style="width:90%" value="${rspWebServiceApply.v_ip}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>部门名称：</th>
				<td>
					<input type="text" name="deptname" id="deptname" class="easyui-validatebox" data-options="validType:'email'" style="width:90%" value="${rspWebServiceApply.deptname}"/>
				</td>
				<th><font color="red">*</font>用户名：</th>
				<td>
					<input type="text" name="v_user" id="v_user" style="width:90%" value="${rspWebServiceApply.v_user}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>密码：</th>
				<td>
					<input type="password" name="v_password" id="v_password" style="width:90%" value="${rspWebServiceApply.v_password}"/>
				</td>
				<th></th>
				<td>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<textarea  style="display:none" name="content" id="content">
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
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$("#btnSaveAndApply").bind("click",doSave);
		$("#pass").bind("click",doSave);
		$("#notPass").bind("click",doSave);
	});
	
	
	//保存表单信息
	function doSave(){
		if(validate.validate()){
			var fn=$(this).attr("fn");
			window.frames["eWebEditor1"].AttachSubmit();
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