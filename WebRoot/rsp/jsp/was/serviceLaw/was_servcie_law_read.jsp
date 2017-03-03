<%@ page language="java" pageEncoding="UTF-8" %>
<%@page import="com.linewell.rsp.baseresouse.was.servicelaw.WasServiceLawManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicelaw.WasServiceLaw"%>
<%
String unid = request.getParameter("unid");
WasServiceLawManager lawManager = new WasServiceLawManager();
WasServiceLaw law = lawManager.doFindBeanByKey(unid);
request.setAttribute("law",law);
request.setAttribute("path",request.getContextPath());
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
	<div id="form_toolbar" style="margin-bottom: 10px">
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div >
		<table cellpadding="0" cellspacing="1"  align="center" class="p_table01">
			<col width="15%" align="right">
			<col width="30%">
			<col width="15%" align="right">
			<col width="40%">	
			<tr>
		      	<th>连接地址：</th>
		        <td colspan="3">
		        	<span>${law.url}</span>
		  		</td>
		   	</tr>
			<tr>
		       	<th>许可依据：</th>
		        <td colspan="3">
		        	<span>${law.content}</span>
		        </td>
		    </tr>
			<tr>
		   		<th>备注：</th>
		       	<td colspan="3">
		       		<span>${law.memo}</span>
		     	</td>
		   	</tr>
		 	<tr>
		   		<th>排序号：</th>
		       	<td>
		       		<span>${law.sortid}</span>
		     	</td>
		        <th>状态：</th>
		        <td>
		        	<span>${law.status != "N" ? "启动" : "禁用"}</span>
				</td>
		   	</tr> 
		</table>
		<br />
		<jsp:include page="../serviceTable/was_service_table_read.jsp">
   			<jsp:param value="${material.unid}" name="unid"/>
   		</jsp:include>
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

