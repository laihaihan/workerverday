<%@ page contentType="text/html;charset=utf-8"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@page import="com.linewell.core.file.AppFileManager"%>


<table width="98%" border="0" cellpadding="0" cellspacing="0" class="form_table_ext">
	<col width="35"/>
	<col width="150"/>
	<col width="120"/>
	<col width="150"/>
	<col/>
	<tr align="center">
		<th>序号</th>
		<th>材料名称</th>
		<th>操作</th>
	</tr>
	
	<% AppFileManager appFileManagerzhengwen = new AppFileManager(appUnid);
		List attrListzhengwen = appFileManagerzhengwen.doFindListByCondition("file_save_type ='3' and file_belongto ='"+unid+"' order by file_createtime",new Object[0][0]);
		 	request.setAttribute("attrList",attrListzhengwen);
	%>
	<s:iterator value="#request.attrList" id="attr" status="attr_status">
	<tr align="center">
		<td>${attr_status.index+1}</td>
		<td>&nbsp;${attr.file_name}</td>
		<td>&nbsp;<a href="#" onclick="downloadFile('${attr.file_unid}')">下载</a></td>
	</tr>
	</s:iterator>
</table>