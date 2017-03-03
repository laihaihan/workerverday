<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="java.util.Map"%>
<%@page import="com.linewell.core.opinion.OpinionManager"%>
<%@page import="com.linewell.core.opinion.Opinion"%>
<%@page import="java.util.*" %>
<table width="98%" border="0" cellpadding="0" cellspacing="0" class="form_table_ext">
	<col width="35"/>
	<col width="80"/>
	<col width="100"/>
	<col/>
	<col width="80"/>
	<col width="130"/>
	<tr align="center">
		<th>序号</th>
		<th>环节</th>
		<th>意见类型</th>
		<th>意见内容</th>
		<th>意见发表者</th>
		<th>环节处理时间</th>
	</tr>
	<%
	
		List opinionList = new OpinionManager().doFindListByCondition(" punid='"+unid+"' order by modified",null);
	 	if(null!=opinionList && !opinionList.isEmpty()){
		 	for(int i=0;i<opinionList.size();i++){
		 		Opinion opinion =(Opinion)opinionList.get(i);
			 		
	%>
		<tr align="center">
		<td><%=i+1 %></td>
		<td><%=opinion.getNode_name()%></td>
		<td><%=opinion.getType()%></td>
		<td><%=opinion.getBody()%></td>
		<td><%=opinion.getAuthor()%></td>
		<td><%=opinion.getModified()%></td>
	</tr>
		 		
		<%
	 		}
	 	}
		%> 
	
</table>
<script language="javascript">
//文件下载
	function downloadFile(unid){
		location.href = "${path}/core/file/file_download.jsp?unid="+unid;
	}
</script>