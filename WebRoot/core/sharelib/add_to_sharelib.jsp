<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.sharelib.user.ShareLibUser" %>
<%@ page import="com.linewell.core.sharelib.user.ShareLibUserManager" %>
<%@ page import="com.linewell.core.sharelib.attr.ShareLibAttr" %>
<%@ page import="com.linewell.core.sharelib.attr.ShareLibAttrManager" %>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="java.util.List" %>
<% 
	String fn = "update";
	String userunid = request.getParameter("userunid");
	String filepath = request.getParameter("filepath");
	String filename = filepath.substring(filepath.lastIndexOf("/")+1);
	String condition = "belongto=? and filepath=?";
	ShareLibAttr shareLibAttr = null;
	ShareLibUser shareLibUser = new ShareLibUserManager().doFindBeanByKey(userunid);
	List list = new ShareLibAttrManager().doFindListByCondition(condition,new String[]{userunid,filepath});
	if(null == list || list.size() == 0){
		fn = "add";
		shareLibAttr = new ShareLibAttr();
		shareLibAttr.setUnid(new UNIDGenerate().getUnid());
		shareLibAttr.setFilename(filename);
		shareLibAttr.setFilepath(filepath);
		shareLibAttr.setBelongto(userunid);
	}else{
		shareLibAttr = (ShareLibAttr)list.get(0);
	}
	
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("shareLibUser", shareLibUser);
	request.setAttribute("shareLibAttr", shareLibAttr);
%>
<HTML>
<HEAD>
	<TITLE>共享材料信息</TITLE>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${path}/core/js/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="${path}/core/js/validation/style.css" />	
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/datepicker/WdatePicker.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
		
		function doSave(){
			if(validate.validate()){
				if($("#upload_file").val() == ""){
					top.popup.alert('操作提示','请选择[上传文件]！','info');
					return;
				}
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.popup.errorService();
					},
					success:function(data){
						top.popup.alert('操作提示','操作成功','info',2000);
						top.popup.close();
					}
				});
			}
		}
		
		function doClose(){
			top.popup.close();
		}
	</script>
</HEAD>
<BODY text=#000000 bgColor=#ffffff >
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" id="btnSave"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存 </button>
			<button class="form_btn" id="btnClose"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
		</div>
		<div>
			<form action="${path}/ShareLibAttr.action" method="post" name="jspForm" id="jspForm" enctype="multipart/form-data">
			<input type="hidden" name="fn" value="<%=fn%>" />
			<input type="hidden" name="unid" value="${shareLibAttr.unid}" />
			<input type="hidden" name="belongto" value="${shareLibAttr.belongto}" />
			<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" id="none" style="margin-top:10px">
				<tr>
	            	<td width="15%" height="26" align="right" nowrap><font color="#FF0000">*</font>所属用户：</td>
	             	<td width="85%" align="left">
	             		<input type="text" name="username" id="username" value="${shareLibUser.name}" style="width:77%" readonly>
	             	</td>
	         	</tr>
	         	<tr>
	            	<td height="26" align="right" nowrap><font color="#FF0000">*</font>文件名称：</td>
	             	<td align="left">
	             		<input type="text" name="filename" id="filename" value="${shareLibAttr.filename}" style="width:77%">
	             	</td>
	         	</tr>
	         	<tr>
	            	<td height="26" align="right" nowrap><font color="#FF0000">*</font>上传文件：</td>
	             	<td align="left" width="85%">
	             		<input type="text" name="filepath" id="filepath" value="${shareLibAttr.filepath}" style="width:77%" readonly>	
	             	</td>
	         	</tr>
	         	<tr>
	            	<td height="26" align="right" nowrap><font color="#FF0000">*</font>有效期限：</td>
	             	<td align="left" width="85%">
	             		<input id="expiry_date" name="expiry_date" type="text" value="${shareLibAttr.expiry_date}" size="10" class="Wdate" onclick="WdatePicker({el:$dp.$('expiry_date'),skin:'whyGreen',isShowOthers:false})" readonly="readonly" style="cursor:hand;width:77%"/>
	             	</td>
	         	</tr>
			</table>
		<div>
	</div>
	<script type="text/javascript">
		var validate = new Validation('jspForm', { 
	    	immediate: true,
		    validators: {
		      	filename:'required',
		      	expiry_date:'required'
		    },
		    messages:{
		    	filename:'请填写[文件名称]',
		    	expiry_date:'请选择[有效期限]'
		    }
	  	});	
	</script> 
</BODY>
</HTML>	