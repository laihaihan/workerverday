<%@page contentType="text/html;charset=UTF-8"%>
<%--<jsp:include  page="/sys/jsp/session.jsp"/>
--%><body>
<%
	String type= request.getParameter("type");
	if (type==null || "".equals(type)) type="1";
 %>
<div id="columnsTree"></div>
<div id="columnsHtml">
	<div id="columnsView"></div>
</div>
<script type="text/javascript">
	//ucapColumns.initColumns();
	_columnsLoad();
	function _columnsLoad(){
		var type = "<%=type%>";
		try{
			loadfile("js/ucap/columns/columns.js","js");
		}catch(e){
			setTimeout ('_columnsLoad();',1000); 
			return;
		}	 
		try{
			ucapColumns.initColumns("","",type);}
		catch(e){
			if (typeof ucapColumns=="undefined" ||
					typeof ucapColumns.initColumns !="function") 
					setTimeout ('_columnsLoad();',1000);
			return;}
	}
</script>
</body>