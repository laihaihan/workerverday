<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@page import="com.linewell.core.sharelib.attr.ShareLibAttrManager"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<% 
	String condition = "belongto=? order by expiry_date";
	String[] params = new String[]{shareLibUser.getUnid()};
	List attrList = new ShareLibAttrManager().doFindListByCondition(condition,params);//材料列表
	
	request.setAttribute("attrList", attrList);
%>

<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" class="form_table_ext">
	<tr height="25" align="center">
	    <td width="50"><b>序号</b></td>
	    <td><b>文件名称</b></td>
	    <td><b>有效期限</b></td>
	    <td width="50"><b>操作</b></td>
	</tr>
    <s:iterator value="#request.attrList" id="attr" status="status">
	<tr height="25" align="center">
		<td>${status.index+1}</td>
		<td align="left"><a href="javascript:downloadFile('${attr.unid}')">${attr.filename}</a></td>
		<td>${attr.expiry_date}</td>
		<td><a href="javascript:viewAttr('${attr.unid}')" class='btn'>查看</a></td>
	</tr>
	</s:iterator>		
</table>

<script type="text/javascript">
   	//查看材料
   	function viewAttr(unid){
		top.popup.showModalDialog('/core/sharelib/sharelib_attr_edit.jsp?unid=' + unid,'共享材料',600,350);
	}
	//文件下载
	function downloadFile(unid){
		location.href = "${path}/core/file/file_download.jsp?unid="+unid;
	}
</script> 
