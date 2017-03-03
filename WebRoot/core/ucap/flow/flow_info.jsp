<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.linewell.apas.service.flow.*" %>
<%@ page import="com.linewell.ucap.workflow.bean.flow.FlowNode" %>
<%@page import="com.linewell.apas.log.ApasLogManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.apas.log.ApasLog"%>
<%@page import="com.linewell.apas.opinion.ApasOpinionManager"%>
<%@page import="com.linewell.apas.opinion.ApasOpinion"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%

String id = request.getParameter("id");
String flowUnid = request.getParameter("flowUnid");
String docUnid = request.getParameter("docUnid");
FlowNode flowNode = ApasFlowManager.getFlowNodeById(request,flowUnid,id);

request.setAttribute("flowNode",flowNode);

ApasLogManager apasLogManager = new ApasLogManager();
List logList = apasLogManager.doFindListByCondition(" punid='"+docUnid+"' and log_do like '%"+flowNode.getName()+"%'",new Object[0]);

%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>流程图</title>
	
		<%@include file="/core/params.jsp" %>
		${import_jquery}
		${import_easyui}
		${import_theme}
</head>
	
<body>	
	<table width="98%" border="0" cellpadding="0" cellspacing="1" class="form_table_ext">
       <col width="12%" align="right" style="font-weight:bold;"/>
       <col width="38%" align="left" style="padding-left:10px;"/>
       <col width="12%" align="right" style="font-weight:bold;"/>
       <col width="38%" align="left" style="padding-left:10px;"/>
	    <tr>
	         <th colspan="4" align="center">环节名称：<span style="color:red">${flowNode.name}</span></th>
	    </tr>
	    <%
	    	ApasOpinionManager apasOpinionManager = new ApasOpinionManager();
		    for(int i = 0 ; i < logList.size() ; i ++){
		    	ApasLog apasLog = (ApasLog)logList.get(i);
    	%>	
    	 <tr>
	        <th width="20%">办理人员：</th>
	         <td  width="30%"><%=apasLog.getLog_what() %></td>
	        <th width="20%">办理时间：</th>
	         <td  width="30%"><%=apasLog.getLog_when() %></td>
	    </tr>
    	<%
	    	}
	    	List opinionList = apasOpinionManager.doFindListByCondition(" punid='"+docUnid+"' and node_name='"+flowNode.getName()+"'",new Object[0]);
	    	for(int i = 0 ; i < opinionList.size() ; i ++){
	    		ApasOpinion apasOpinion = (ApasOpinion)opinionList.get(i);
    	%>
    	<tr>
	        <th width="20%">办理意见：</th>
	         <td colspan="3" width="80%"><%=apasOpinion.getBody() %></td>
	    </tr>
    	<%} %>
	</table>
	</body>
</html>