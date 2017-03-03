<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@page import="com.linewell.core.sharelib.log.ShareLibLogManager"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<% 
	condition = "punid=? order by operate_time";
	params = new String[]{shareLibUser.getUnid()};
	List logList = new ShareLibLogManager().doFindListByCondition(condition,params);//操作日志
	
	request.setAttribute("logList", logList);
%>

<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" class="form_table_ext">
	<tr height="25" align="center">
	    <td width="50"><b>序号</b></td>
	    <td width="80"><b>操作人员</b></td>
	    <td><b>操作内容</b></td>
	    <td width="120"><b>操作时间</b></td>
	</tr>
    <s:iterator value="#request.logList" id="log" status="status">
	<tr height="25" align="center">
		<td>${status.index+1}</td>
		<td>${log.operate_username}</td>
		<td align="left">${log.operate_content}</td>
		<td>${log.operate_time}</td>
	</tr>
	</s:iterator>		
</table>
