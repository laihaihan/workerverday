<%@page contentType="text/html;charset=utf-8"%>
<%@page import=" com.linewell.core.ucap.flow.log.FlowLog"%>
<%@page import=" com.linewell.core.ucap.flow.log.FlowLogManager"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	List logList = new FlowLogManager(appUnid).doFindByDocUnid(docUnid);
	request.setAttribute("logList",logList);
%>
<table width="98%" border="0" cellpadding="0" cellspacing="0" class="form_table_ext">
	<tr align="center">
		<th style="text-align:center; ">步骤名称</th>   
	   	<th style="text-align:center; ">办理人名称</th>   
	   	<th style="text-align:center; ">操作名称</th>   
	   	<th style="text-align:center; ">开始时间</th>   
	   	<th style="text-align:center; ">结束时间</th>  
	   	<th style="text-align:center; ">下一步骤名称</th>  
	   	<th style="text-align:center; ">下一步骤办理人</th>  
	</tr>
	<s:iterator value="#request.logList" id="flowLog">
		<tr>
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowLog.log_step_name}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowLog.log_transactor_name}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowLog.log_operation_name}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowLog.log_begin_time}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowLog.log_end_time}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowLog.log_next_step_name}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowLog.log_next_transactor_name}&nbsp;</TD>   
		</tr>
	</s:iterator>
</table>