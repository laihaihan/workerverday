<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.linewell.core.ucap.flow.*" %>
<%@ page import="com.linewell.core.util.StrUtil"%>
<%@ page import="com.linewell.ucap.workflow.bean.flow.Flow"%>
<% 
	String path = request.getContextPath();
	request.setAttribute("path", path);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<script type="text/javascript" src="${path}/core/js/flow/wz_jsgraphics.js" ></script>
<script type="text/javascript" src="${path}/core/js/flow/jquery.js" ></script>
<script type="text/javascript" src="${path}/core/js/flow/jquery.ui.flow.js" ></script>
<script type="text/javascript" src="${path}/core/js/tipswindown/tipswindown.js"></script>
<link rel="stylesheet" href="${path}/core/js/tipswindown/tipswindown.css" type="text/css" media="all" />
<style type="text/css">
	.before{
		padding:5px;width:80px;height:13px;border:0px solid black;
		background:#0000FF;
		font-size:9pt;
		float: left;
		cursor:hand;
	};
	.hover{
		background: green;
		color: black;
	}

</style>
</head>
<title>文档</title>
<body>
<div id="spanBefore">
	<%
		String flowUnid = request.getParameter("flowUnid");
		FlowParams flowParams = new FlowParams(request);
		FlowDiv flowDiv = new FlowDiv(flowParams);
		FlowManager flowManager = new FlowManager(flowParams);
		Flow flow = flowManager.getFlowById(flowUnid);
		if(StrUtil.isNull(flowUnid) || null == flow || flow.getNodes().size() == 2){
			out.println("<script language='javascript'>top.popup.alert('信息提示','该审批事项未配置流程或未绑定流程！','warning');top.lwin.close();</script>");
			return;
		}
		StringBuffer sb = flowDiv.getFlowShow(flowUnid,null,null);
		out.println(sb);
	%>
</div>
<div style="padding:30px;border:0px dotted black;">
	<div style="position:relative; width:300px;" id="draw"></div>
</div>

<script type="text/javascript">
	$(function(){
		createFlow();
	});
	
	var createFlow = function(){
		$("#spanBefore").flow({hover:function(){
			$(this).addClass("hover");
		},remove:function(){
			$(this).removeClass("hover");
		},click:function(){
			top.lwin.parent().find("#nodename").val($(this).html());
			top.lwin.parent().find("#nodeunid").val($(this).attr("id"));
			top.lwin.close();
		}});
	}

	function showdetail(unid){
		alert(unid);
	}
	
	function dochange(){
		event.srcElement.style.background = "#F76E30";
	}
	
	function doRes(yanse){
		event.srcElement.style.background = yanse;
	}
</script>
</BODY>
</html>