<%@ page contentType="text/html;charset=utf-8"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%

Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
String appUnid = ucapsession.getApp().getUnid();
String unid = request.getParameter("unid");

%>

<table width="98%" border="1" cellpadding="0" cellspacing="0" class="form_table_ext">
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
	
	<% AppFileManager appFileManager = new AppFileManager(appUnid);
		List attrList = appFileManager.doFindListByCondition("file_save_type <>'3' and file_belongto ='"+unid+"' order by file_createtime",new Object[0][0]);
		request.setAttribute("attrList",attrList);
	%>
	<s:iterator value="#request.attrList" id="attr" status="attr_status">
	<tr align="center">
		<td>${attr_status.index+1}</td>
		<td>&nbsp;${attr.file_name}</td>
		<td>&nbsp;<a href="#" onclick="piyue('${attr.file_unid}')">批阅</a></td>
	</tr>
	</s:iterator>
</table>
<script>

    function piyue(fileunid) {
    	top.popup.showModalDialog('/core/officeedit/editoffice.jsp?fileunid='+fileunid+"&unid=<%=unid%>",'批阅正文',1200,600);
    }

</script>