<%@page contentType="text/html;charset=utf-8"%>
<%@page import=" com.linewell.core.ucap.flow.opinion.FlowOpinion"%>
<%@page import=" com.linewell.core.ucap.flow.opinion.FlowOpinionManager"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	List opinionList = new FlowOpinionManager(appUnid).doFindByDocUnid(docUnid);
	request.setAttribute("opinionList",opinionList);
%>
<table width="98%" border="0" cellpadding="0" cellspacing="0" class="form_table_ext">
	<col width="120"/>
	<col width="150"/>
	<col width="120"/>
	<col width="150"/>
	<col/>
	<tr align="center">
		<th style="text-align:center; ">节点名称</th>   
	   	<th style="text-align:center; ">填写人部门</th>   
	   	<th style="text-align:center; ">填写人</th>   
	   	<th style="text-align:center; ">填写时间</th>   
	   	<th style="text-align:center; ">意见内容</th>  
	</tr>
	<s:iterator value="#request.opinionList" id="flowOpinion">
		<tr>
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowOpinion.opinion_node_name}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowOpinion.opinion_tran_dept_name}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowOpinion.opinion_transactor_name}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowOpinion.opinion_transact_time}&nbsp;</TD>   
		 	<TD align="center" style="border-left:0px;border-top:0px;">${flowOpinion.opinion_content}&nbsp;</TD>   
		</tr>
	</s:iterator>
</table>