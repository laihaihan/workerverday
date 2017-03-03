<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.dict.ApasDict"%>
<%@ page import="com.linewell.core.dict.ApasDictManager"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.core.util.DateTime" %>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@include file="/core/params.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	ApasDict apasDict = new ApasDictManager().doFindBeanByKey(unid);
	if (null == apasDict) {
		fn = "add";
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME); 
		apasDict = new ApasDict();
		apasDict.setUnid(new UNIDGenerate().getUnid());
		apasDict.setCreatetime(DateTime.getNowDateTime());
		apasDict.setApp_unid(ucapSession.getApp().getUnid());
	}
	
	request.setAttribute("apasDict", apasDict);
	request.setAttribute("path", request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	${import_jquery}
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/dict.action">
		<input type="hidden" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" value="${apasDict.unid}">
		<input type="hidden" name="createtime" value="${apasDict.createtime}">
		<input type="hidden" name="app_unid" value="${apasDict.app_unid}">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th><font color="red">*</font>字典类型</th>
				<td colspan="3">
					<input type="text" name="dicttype" id="dicttype" style="width:370" value="${apasDict.dicttype}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>字典名称</th>
				<td colspan="3">
					<input type="text" name="dictname" id="dictname" style="width:370" value="${apasDict.dictname}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>字 典 值</th>
				<td colspan="3">
					<input type="text" name="dictvalue" id="dictvalue" style="width:370" value="${apasDict.dictvalue}"/>
				</td>
			</tr>
			<tr>
				<th>值 说 明</th>
				<td colspan="3">
					<textarea name="memo" id="memo" style="width:370" rows="5">${apasDict.memo}</textarea>
				</td>
			</tr>
			<tr>
				<th>
					状  态
				</th>
				<td>
					<input type="radio" name="state" value="Y" ${apasDict.state != "N" ? "checked" : ""}>启用&nbsp;
					<input type="radio" name="state" value="N" ${apasDict.state == "N" ? "checked" : ""}>禁用
				</td>
				<th>
					排序编号
				</th>
				<td>
					<input type="text" name="sortid" id="sortid" style="width:75%" value="${apasDict.sortid}"/>
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
									location.href = "${path}/core/dict/dict_edit.jsp?unid=-1";
								}else{
									top.lwin.close(true);
								}
							});	
						}else{
							top.lwin.alert("信息提示","操作成功","info",1500);
							top.lwin.close(true);
						}
					}else{
						top.lwin.alert("信息提示","操作失败","error",1500);
					}
				}
			});
		}
	}
	
	function doClose(){
		top.lwin.close(true);
	}
</script>
<script type="text/javascript">
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	dicttype:'required',
	      	dictname:'required',
	      	dictvalue:'required',
	      	sortid:'float'
	    },
	    messages:{
	    	dicttype:'请填写[字典类型]',
	    	dictname:'请选择[字典名称]',
	    	dictvalue:'请选择[字典值]',
	    	sortid:'[排序编号]必须为数字'
	    }
  	});	
</script> 
</body>
</html>
