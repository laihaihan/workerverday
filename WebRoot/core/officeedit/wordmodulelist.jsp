<%@ page contentType="text/html;charset=utf-8"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.core.attr.cfg.UcapAttrConfigBusiness"%>
<%@page import="com.linewell.core.attr.cfg.UcapAttrConfig"%>
<%@page import="com.linewell.core.util.ListUtil"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String flowunid = request.getParameter("flowUnid");
String unid = request.getParameter("unid");//文档undi
UcapAttrConfigBusiness ucapAttrConfigBusiness = new UcapAttrConfigBusiness();
List<UcapAttrConfig> attrCfgList = ucapAttrConfigBusiness.getAttrCfgList(flowunid);
if(ListUtil.isNull(attrCfgList)){
	out.print("本流程没配置正文模板，请联系管理员！");
	return;
}

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
	
	<%  
		request.setAttribute("attrCfgList",attrCfgList);
	%>
	<s:iterator value="#request.attrCfgList" id="attr" status="attr_status">
	<tr align="center">
		<td>${attr_status.index+1}</td>
		<td>&nbsp;${attr.attr_cfg_file_name}</td>
		<td>&nbsp;<a href="#" onclick="piyue('${attr.attr_cfg_unid}','<%=new UNIDGenerate().getUnid()%>')">起草</a></td>
	</tr>
	</s:iterator>
</table>
<script>

    function piyue(attrcfgunid,fileunid) {
    	top.popup.showModalDialog('/core/officeedit/editoffice.jsp?attrcfgunid='+attrcfgunid+"&unid=<%=unid%>&fileunid="+fileunid,'起草正文',1200,600);
    }

</script>