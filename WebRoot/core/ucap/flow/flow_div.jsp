<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.linewell.core.ucap.flow.*"%>
<% 
	request.setAttribute("path", request.getContextPath());

	String flowUnid = request.getParameter("flowUnid");//"F275482854A7D0C513D412C007318D57";
	String docUnid = request.getParameter("docUnid");//"ADDA38239BC17BDF0C22FEF1921C502B";
	if(flowUnid == null || flowUnid.trim().length()==0){
		out.println("<font style='color:red;font-size:20px;font-weight:bolder'>没有配置流程，请联系管理员进行配置！</font>");
		return;
	}
	
	FlowParams flowParams = new FlowParams(request);
	FlowDiv flowDiv = new FlowDiv(flowParams);
	StringBuffer sb =  flowDiv.getFlowShow(flowUnid,docUnid,null);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<title>文档</title>
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
<body onLoad="createFlow();">
	<div id="spanBefore">
		<%
			out.println(sb);
		%>
	</div>
	<div style="padding:30px;border:0px dotted black;">
		<div style="position:relative; width:300px;" id="draw"></div>
	</div>
	<script type="text/javascript">
		var createFlow = function(){
			$("#spanBefore").flow({hover:function(){
				$(this).addClass("hover");
			},remove:function(){
				$(this).removeClass("hover");
			},click:function(){
				top.lwin.open('core/ucap/flow/flow_info.jsp?id='+$(this).attr("id")+'&flowUnid=<%=flowUnid%>&docUnid=<%=docUnid%>',$(this).text(),450,250);
				//top.tipsWindown("标题","url:get?${path}/core/ucap/flow/flow_info.jsp?id="+$(this).attr("id")+"&flowUnid=<%=flowUnid%>&docUnid=<%=docUnid%>","450","250","true","","true","text");
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
</body>
</html>