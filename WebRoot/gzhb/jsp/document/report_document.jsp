<%@ page language="java" pageEncoding="UTF-8"%>
<%@	page import="com.linewell.core.dict.ApasDictBussiness"%>

<%@	page import="java.util.*"%>
<%@page import="com.linewell.core.flow.config.FlowConfigBusiness"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<% 
	//文档id
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String appUnid = ucapsession.getApp().getUnid();
	String unid = request.getParameter("unid");
	FlowConfigBusiness flowConfigBusiness = new FlowConfigBusiness();
	//流程unid
	String flowUnid = flowConfigBusiness.getFlowUnidByInstanceUnid(unid,appUnid);
	//流程实例unid
    String instanceUnid = flowConfigBusiness.getInstanceUnid(unid,appUnid);
%>
<html>
<head>
	<base target="_self">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	<META http-equiv=pragma content=no-cache>
	<title>文档</title>
	
	<%@include file="/core/params.jsp" %>
	<script type="text/javascript" src="${path}/core/js/lw-ui/load.js"></script>
	${import_jquery}
	${import_easyui}
	${import_theme}
</head>  
<body>
	<div id="form_toolbar">
		<%@include file="/core/flow/document/document_button.jsp"%>
	</div>
	<div class="easyui-tabs"  id="tt">
	    <div title="基本信息" style="padding:5px;">
		<!-- 根据需要编写 -->
		<table><tr><td>流程绑定表单基本信息编写页面，集成流程引擎时根据实际情况编写</td></tr></table>
		<fieldset style="width:99%">
			<legend>办理情况</legend>
			<table width="95%" border="0" align="center" cellpadding="3" cellspacing="2">
				<tr>
					<td>
						<font color="red">红色：当前办理；</font>
						<font color="blue">蓝色：已办理；</font>
						<font color="gray">灰色：未办理；</font>
						
						<img src="${path}/core/ucap/flow/flow_image.jsp?docUnid=<%=unid %>&flowUnid=<%=flowUnid%>"/>
						<%--
						<iframe src="${path}/core/ucap/flow/flow_div.jsp?docUnid=<%=unid%>&flowUnid=<%=flowUnid%>" width="100%" frameborder="0" id="FlowHandleWindow"></iframe>
						--%>
					</td>
				</tr>
			</table>
		</fieldset>
	    </div>
	    

	     <div title="意见列表" style="padding:5px;">
	       <%@ include file="/core/flow/document/document_opinion.jsp"%>
	    </div>
	     <div title="材料列表" style="padding:5px;">
	       <%@ include file="/core/flow/document/document_attr.jsp"%>
	    </div>
	     <div title="已生成正文" style="padding:5px;">
	       <%@ include file="/core/flow/document/document_zhengwen.jsp"%>
	    </div>
	    <div title="流转日志" style="padding:5px;">
	       <%@ include file="/core/flow/document/document_log.jsp"%>
	    </div>	  
	</div>
	<%@include file="/core/flow/document/document_js.jsp"%>
</body>
</html>