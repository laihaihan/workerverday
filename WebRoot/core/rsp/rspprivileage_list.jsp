<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ page import="com.linewell.core.rsp.privilege.*" %>
<%@ page import="java.util.List" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<% 
	String punid= request.getParameter("punid");
	String condition = "resourceid=? order by createtime";
	String[] params = new String[]{punid};
	List priList = new RspPrivileageManager().doFindListByCondition(condition,params);//授权日志
	
	request.setAttribute("priList", priList);
	request.setAttribute("path", request.getContextPath());
%>
<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript">
	
	
		
		//删除
		function del(unid){
			$.ajax({
			cache:false,
			async:false, //同步执行（默认Ajax为异步）
			url:'rspprivileage.action',
			data: {
	   			fn:'del',
	   			ids:"'"+unid+"'"
	   		},
			success:function(responseText){
				top.lwin.alert('信息提示','操作成功','info',1500);
				window.location.reload();
			},
			error:function(responseText){
				top.popup.errorService();
			}
	});
		}
	</script>
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" class="form_table_ext">
	<tr height="25" align="center">
	    <td width="10%"><b>序号</b></td>
	    <td width="20%"><b>类型</b></td>
	    <td width="40%"><b>拥有者名称</b></td>
	    <td width="20%"><b>操作</b></td>
	</tr>
    <s:iterator value="#request.priList" id="privileage" status="status">
	<tr height="25" align="center">
		<td>${status.index+1}</td>
		<td>${privileage.ownertype}</td>
		<td align="left">${privileage.ownername}</td>
		<td><a href="javascript:del('${privileage.unid}')">删除</a></td>
	</tr>
	</s:iterator>		
</table>
