<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.form.content.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.apas.service.*" %>
<%@ taglib prefix="s" uri="/struts-tags"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String punid = request.getParameter("punid");
	FormContent formContent = new FormContentManager().doFindBeanByKey(unid);
	if (null == formContent) {
		fn = "add";
		formContent = new FormContent();
		formContent.setUnid(new UNIDGenerate().getUnid());
		formContent.setPunid(punid);
		
		ApasServiceManager apasServiceManager = new ApasServiceManager();
		ApasService apasService = apasServiceManager.doFindBeanByKey(punid);
		if(null == apasService){
			out.print("<script>alert('请选择审批事项');top.popup.close('true');</script>");
			return;
		}
		formContent.setInfoprojid(apasService.getInfoprojid());
	}
	
	request.setAttribute("formContent", formContent);
%>


<html>
<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<%@include file="/core/params.jsp" %>
	${import_theme}
	${import_jquery}
	${import_easyui}
	${import_validation}
	${import_autocomplete}
</head>
<body>
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btndesing"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 配置客户端验证 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/FormContent.action" enctype ="multipart/form-data" >
		<input type="hidden" name="fn" id="fn" value="<%=fn%>">
		<input type="hidden" name="unid" value="<%=formContent.getUnid()%>">
		<input type="hidden" name="infoprojid" value="<%=formContent.getInfoprojid()%>">
		<input type="hidden" name="punid" value="<%=formContent.getPunid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="30%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">					
			<tr>
				<th><font color="red">*</font>表单名称：</th>
				<td>
					<input type="text" name="name" id="name" style="width:90%" value="${formContent.name}"/>
				</td>
				<th><font color="red">*</font>排序号：</th>
				<td>
					<input type="text" name="sortid" id="sortid" style="width:50%" value="${formContent.sortid}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>表单html内容：</th>
				<td colspan="3">
					<input type="file" name ="content" id="content" style="width:90%">
					<input type="button" onclick="preview();" value="预览">
				</td>
			</tr>
			<tr>
				<th>业务jsp路径：</th>
				<td colspan="3">
					<input type="text" name="yewujsp" id="yewujsp" style="width:80%" value="${formContent.yewujsp}"/>
				</td>
			</tr>
			<tr>
				<th>后台验证接口：</th>
				<td colspan="3">
					<input type="text" name="verifyinterface" id="verifyinterface" style="width:80%" value="${formContent.verifyinterface}"/>
				</td>
			</tr>
					
			<tr>
				<th>是否展示上个表单信息：</th>
				<td colspan="3">
					<input type="text" name="verifyinterface" id="verifyinterface" style="width:80%" value="${formContent.verifyinterface}"/>
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
		$("#btndesing").bind("click",doDesign);
	});
	
	function doSave(){
		if(validate.validate()){
			if($("#fn").val() == "add" && $("#content").val() == ""){
				top.lwin.alert("信息提示","请上传html模板！","warning",1500);
				return;
			}
			var content = $("#content").val();
			var ext = content.substr(content.lastIndexOf('.')+1,content.length).toUpperCase();
			if(ext!= 'HTML' && ext != 'HTM' ){
				top.lwin.alert("信息提示","请上传正确的html文件","warning",1500);
				return;
			}
		
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.alert("信息提示","操作失败","error");
				},
				success:function(data){
					if(data.result){
						//top.lwin.alert('操作提示','操作成功','info');
						//window.location.reload();
						alert("操作成功");
					}else{
						top.lwin.alert("信息提示","操作失败","error");
					}
					top.lwin.close(true);
				}
			});
		}
	}
	
	function doClose(){
		top.lwin.close();
	}
	
	function doDesign(){
		if($("#fn").val() == "add"){
			top.lwin.alert("信息提示","请先保存表单信息！","warning");
			return;
		}
		//window.location.href = "formcontent_verification.jsp?punid=${formContent.unid}";
		top.lwin.showModalDialog("/core/form/formcontent_verification.jsp?punid=${formContent.unid}"+"&rand="+Math.random(),'表单验证配置',top.clientWidth-30,top.clientHeight-30);
		
	}

	function preview(){
		if($("#fn").val() == "add"){
			top.lwin.alert("信息提示","请先保存表单信息！","warning");
			return;
		}
		window.open("formcontent_preview.jsp?formunid=<%=formContent.getUnid()%>");
	}
	
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	name:'required',
	      	sortid:'float'
	    },
	    messages:{
	    	name:'请填写[表单名称]',
	    	sortid:'[排序编号]必须为数字'
	    }
  	});	
</script> 
</body>
</html>