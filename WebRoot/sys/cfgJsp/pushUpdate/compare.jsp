<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/sys/jsp/jspSession.jsp"%>
<%
	String curAppUnid = request.getParameter("appUnid");
	String moduleId = request.getParameter("moduleUnid");
	String moduleName = java.net.URLDecoder.decode(request.getParameter("moduleName"),"UTF-8");
	String opType=request.getParameter("opType");
%>

<body>
<div id="memo"></div>
<div id="compareResultHtml">
</div>
<script type="text/javascript">
	Ext.onReady(function(){
    	compareResultTree.appInit("<%=curAppUnid%>","compareResultHtml","<%=moduleId%>","<%=moduleName%>","<%=opType%>");
	});
</script>
</body>
