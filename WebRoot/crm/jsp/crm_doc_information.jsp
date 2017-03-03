<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucapx.form.FormUtilsApi"%>
<%@page import="com.linewell.ucapx.form.CommonFormApi"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucapx.form.ForeignApi"%>

<%@page import="com.linewell.crm.account.CrmDocInformation"%>
<%@page import="com.linewell.crm.account.CrmDocInformationManager"%>


<%@include file="../default/common.jsp"%>
<%
/**
 * 表单的最终展示页面,可处理主表或者从表的关系
 * @author xhuatang@linewell.com
 * @since 2011-07-14
 */
//表单的UNID
String formUnid = request.getParameter("formId");

//主表单的FormUNID
String mainFormId = request.getParameter("mainFormId");


//当前文档新建或者修改标志，1:新增 2:修改
String formFlag = "1";
String curDocUnid = "";

FormUtilsApi fuApi = new FormUtilsApi();
fuApi.setAppPath(systemPath);

CommonFormApi commonApi = new CommonFormApi();
Form form = commonApi.getForm(formUnid);

//取文档记录
CrmDocInformation crmDocInformation = null;

//如果是主表
if(StringUtils.isEmpty(mainFormId)){
    //当前对象的unid
    String unid = request.getParameter("unid");
    if(StringUtils.isEmpty(unid)) unid="";    
    if(StringUtils.isNotEmpty(unid)){
        CrmDocInformationManager crmDocInformationManager = new CrmDocInformationManager();
        crmDocInformation = crmDocInformationManager.get(unid, ucapSession);
    } 
}else{//如果是附表
    //取外键
    ForeignApi foreignApi = new ForeignApi();
    String fkName = foreignApi.getFkName(mainFormId, formUnid);
    //主表的UNID
    String mainUnid = request.getParameter("mainUnid");
     
    if(StringUtils.isNotEmpty(mainUnid)){
        CrmDocInformationManager crmDocInformationManager = new CrmDocInformationManager();
        List<CrmDocInformation> crmDocInformationList =crmDocInformationManager.getList(fkName, mainUnid, ucapSession);
        if (null!=crmDocInformationList && !crmDocInformationList.isEmpty()){
            crmDocInformation = crmDocInformationList.get(0);
        }
    }   
    
}

if (null == crmDocInformation) {
    fuApi.setGetDefParam(true,ucapSession);
    crmDocInformation = new CrmDocInformation();  
} else {
    formFlag = "2";
    //TODO 主键替换即可
    curDocUnid = crmDocInformation.getUnid();
    fuApi.setGetDefParam(false,ucapSession);
}
%>
<input type="hidden" id="_ucap_doc_unid<%=formUnid %>" name="_ucap_doc_unid" formUnid="<%=formUnid %>" value="<%= curDocUnid %>" />
<input type="hidden" id="_ucap_doc_flag<%=formUnid %>" name="_ucap_doc_flag" formUnid="<%=formUnid %>" value="<%=formFlag%>" /><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<table class="table2">
<COL width="15%">
<COL width="35%">
<COL width="15%">
<COL width="35%">
	<!--tr>
		<td colspan="4">系统信息</td>
	</tr>
	<tr>
		<th>创建人:</th>
		<td><span id="doc_creator"></span><span id="doc_create_time"></span></td>
		<th>上次修改人:</th>
		<td><span id="doc_modifier"></span><span id="doc_modify_time"></span></td>
	</tr>
	<tr>
		<td colspan="4">记录信息</td>
	</tr>
	<tr>
		<th>记录id:</th>
		<td colspan="3"><span id="doc_unid"></span></td>
	</tr>
	<tr>
		<th>是否归档:</th>
		<td><span id="doc_is_archive"></span></td>
		<th> 是否删除:</th>
		<td><span id="doc_is_delete"></span></td>
	</tr>
	<tr>
		<th>上次浏览时间:</th>
		<td><span id="doc_read_time"></span></td>
		<th>浏览次数:</th>
		<td><span id="doc_read_count"></span></td>
	</tr-->
	<tr>
		<td colspan="4">系统信息</td>
	</tr>
	<tr>
		<th>创建人:</th>
		<td><%=fuApi.getHtml(form,"doc_creator",crmDocInformation.getCreator())%>
			<%=fuApi.getHtml(form,"doc_create_time",crmDocInformation.getCreateTime())%>
		</td>
		<th>上次修改人:</th>
		<td><%=fuApi.getHtml(form,"doc_modifier",crmDocInformation.getModifier())%>
			<%=fuApi.getHtml(form,"doc_modify_time",crmDocInformation.getModifyTime())%>
		</td>
	</tr>
	<tr>
		<td colspan="4">记录信息</td>
	</tr>
	<tr>
		<th>记录id:</th>
		<td colspan="3"><%=fuApi.getHtml(form,"doc_unid",crmDocInformation.getUnid())%></td>
	</tr>
	<tr>
		<th>是否归档:</th>
		<td><%=fuApi.getHtml(form,"doc_is_archive",crmDocInformation.getIsArchive())%></td>
		<th> 是否删除:</th>
		<td><%=fuApi.getHtml(form,"doc_is_delete",crmDocInformation.getIsDelete())%></td>
	</tr>
	<tr>
		<th>上次浏览时间:</th>
		<td><%=fuApi.getHtml(form,"doc_read_time",crmDocInformation.getReadTime())%></td>
		<th>浏览次数:</th>
		<td><%=fuApi.getHtml(form,"doc_read_count",crmDocInformation.getReadCount())%></td>
	</tr>
</table>
