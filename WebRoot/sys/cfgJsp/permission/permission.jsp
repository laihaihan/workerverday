<%@page contentType="text/html;charset=UTF-8"%>
<%
	String sourceFormId = request.getParameter("formId");
	String sourceId=request.getParameter("unid");
%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){		
		permission.init("permission");
	});	 
</script>
    <div id="sourceobj" style="display:none"><input type="hidden" name="sourceId" id="sourceId" value="<%=sourceId%>"><input type="hidden" name="sourceFormId" id="sourceFormId" value="<%=sourceFormId%>"></div>
    <div id="sourceDisplay" style="font:12px/200% Tahoma;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级联选择：<input type='checkbox' onclick="permission.checkChanged(this);"></div>
    <div id="targetTree" style="width:500px"></div>
</body>