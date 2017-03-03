<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucapx.form.FormUtilsApi"%>
<%@page import="com.linewell.ucapx.form.CommonFormApi"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucapx.form.ForeignApi"%>

<%@page import="com.linewell.crm.account.CrmAccountVisit"%>
<%@page import="com.linewell.crm.account.CrmAccountVisitManager"%>


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
CrmAccountVisit crmAccountVisit = null;

//如果是主表
if(StringUtils.isEmpty(mainFormId)){
    //当前对象的unid
    String unid = request.getParameter("unid");
    if(StringUtils.isEmpty(unid)) unid="";    
    if(StringUtils.isNotEmpty(unid)){
        CrmAccountVisitManager crmAccountVisitManager = new CrmAccountVisitManager();
        crmAccountVisit = crmAccountVisitManager.get(unid, ucapSession);
    } 
}else{//如果是附表
    //取外键
    ForeignApi foreignApi = new ForeignApi();
    String fkName = foreignApi.getFkName(mainFormId, formUnid);
    //主表的UNID
    String mainUnid = request.getParameter("mainUnid");
     
    if(StringUtils.isNotEmpty(mainUnid)){
        CrmAccountVisitManager crmAccountVisitManager = new CrmAccountVisitManager();
        List<CrmAccountVisit> crmAccountVisitList = null;//crmAccountVisitManager.getList(fkName, mainUnid, ucapSession);
        if (null!=crmAccountVisitList && !crmAccountVisitList.isEmpty()){
            crmAccountVisit = crmAccountVisitList.get(0);
        }
    }   
    
}

if (null == crmAccountVisit) {
    fuApi.setGetDefParam(true,ucapSession);
    crmAccountVisit = new CrmAccountVisit();  
} else {
    formFlag = "2";
    //TODO 主键替换即可
    curDocUnid = crmAccountVisit.getUnid();
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
	<tr>
		<th>拜访主题:</th>
		<td><%=fuApi.getHtml(form,"visit_title",crmAccountVisit.getTitle())%></td>
	</tr>
	<tr>
		<th>拜访客户:</th>
		<td><%=fuApi.getHtml(form,"visit_account",crmAccountVisit.getAccount())%></td>
	</tr>
	<tr>
		<th>拜访时间:</th>
		<td><%=fuApi.getHtml(form,"visit_date",crmAccountVisit.getDate())%></td>
	</tr>
	<tr>
		<th>拜访人员:</th>
		<td><%=fuApi.getHtml(form,"visit_staff",crmAccountVisit.getStaff())%></td>
	</tr>
	<tr>
		<th>拜访原因:</th>
		<td><%=fuApi.getHtml(form,"visit_origin",crmAccountVisit.getOrigin())%></td>
	</tr>
	<tr>
		<th>拜访结果:</th>
		<td><%=fuApi.getHtml(form,"visit_result",crmAccountVisit.getResult())%></td>
	</tr>
	<tr>
		<th>下次拜访计划:</th>
		<td><%=fuApi.getHtml(form,"visit_plan",crmAccountVisit.getPlan())%></td>
	</tr>
</table>
