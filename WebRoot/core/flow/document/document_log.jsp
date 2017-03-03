<%@ page contentType="text/html;charset=utf-8"%>
<%@page import="com.linewell.core.log.LogManager"%>
<table width="98%" border="0" cellpadding="0" cellspacing="0" class="form_table_ext">
	<col width="35"/>
	<col width="150"/>
	<col width="120"/>
	<col width="150"/>
	<col/>
	<tr align="center">
		<th>序号</th>
		<th>办理人</th>
		<th>操作</th>
		<th>接收人</th>
		<th>时间</th>
	</tr>
	<%
		List logList = new LogManager().doFindListByCondition(" punid='"+unid+"' order by LOG_WHEN",null);
		 	request.setAttribute("logList",logList);
	%>
	<s:iterator value="#request.logList" id="log" status="log_status">
	<tr align="center">
		<td>${log_status.index+1}</td>
		<td>&nbsp;${log.who}</td>
		<td>&nbsp;${log.log_do}</td>
		<td>&nbsp;${log.log_what}</td>
		<td>&nbsp;${log.log_when}</td>
	</tr>
	</s:iterator>
</table>