<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucapx.form.FormUtilsApi"%>
<%@page import="com.linewell.ucapx.form.CommonFormApi"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucapx.form.ForeignApi"%>

<%@page import="com.linewell.crm.account.CrmAccount"%>
<%@page import="com.linewell.crm.account.CrmAccountManager"%>


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
CrmAccount crmAccount = null;

//如果是主表
if(StringUtils.isEmpty(mainFormId)){
    //当前对象的unid
    String unid = request.getParameter("unid");
    if(StringUtils.isEmpty(unid)) unid="";    
    if(StringUtils.isNotEmpty(unid)){
        CrmAccountManager crmAccountManager = new CrmAccountManager();
        crmAccount = crmAccountManager.get(unid, ucapSession);
    } 
}else{//如果是附表
    //取外键
    ForeignApi foreignApi = new ForeignApi();
    String fkName = foreignApi.getFkName(mainFormId, formUnid);
    //主表的UNID
    String mainUnid = request.getParameter("mainUnid");
     
    if(StringUtils.isNotEmpty(mainUnid)){
        CrmAccountManager crmAccountManager = new CrmAccountManager();
        List<CrmAccount> crmAccountList =crmAccountManager.getList(fkName, mainUnid, ucapSession);
        if (null!=crmAccountList && !crmAccountList.isEmpty()){
            crmAccount = crmAccountList.get(0);
        }
    }   
    
}

if (null == crmAccount) {
    fuApi.setGetDefParam(true,ucapSession);
    crmAccount = new CrmAccount();  
} else {
    formFlag = "2";
    //TODO 主键替换即可
    curDocUnid = crmAccount.getId();
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
		<td align=left colspan="4">客户信息</td>
	</tr>
	<tr>
		<th>客户所有人:</th>
		<td><%=fuApi.getHtml(form,"account_hoder",crmAccount.getHoder())%></td>
		<th>分级:</th>
		<td><%=fuApi.getHtml(form,"account_grade",crmAccount.getGrade())%></td>
		
	</tr>
	<tr>
		<th><span class="red">*</span>客户名:</th>
		<td><%=fuApi.getHtml(form,"account_name",crmAccount.getName())%></td>
		<th>电话:</th>
		<td><%=fuApi.getHtml(form,"account_tel",crmAccount.getTel())%></td>
	</tr>
	<tr>
		<th>客户地点:</th>
		<td><%=fuApi.getHtml(form,"account_address",crmAccount.getAddress())%></td>
		<th>传真:</th>
		<td><%=fuApi.getHtml(form,"account_fax",crmAccount.getFax())%></td>	
	</tr>
	<tr>
		<th>父级客户:</th>
		<td><%=fuApi.getHtml(form,"account_punid",crmAccount.getPunid())%></td>
		<th>网址:</th>
		<td><%=fuApi.getHtml(form,"account_weburl",crmAccount.getWeburl())%></td>		
	</tr>
	<tr>
		<th>客户编号:</th>
		<td><%=fuApi.getHtml(form,"account_number",crmAccount.getNumber())%></td>
		<th>公司股票代码:</th>
		<td><%=fuApi.getHtml(form,"account_code",crmAccount.getCode())%></td>		
	</tr>
	<tr>
		<th>类型:</th>
		<td><%=fuApi.getHtml(form,"account_type",crmAccount.getType())%></td>
		<th>所有权:</th>
		<td><%=fuApi.getHtml(form,"account_fee",crmAccount.getFee())%></td>
	</tr>
	<tr>
		<th>行业:</th>
		<td><%=fuApi.getHtml(form,"account_industry",crmAccount.getIndustry())%></td>
		<th>职员数:</th>
		<td><%=fuApi.getHtml(form,"account_staff_count",crmAccount.getStaffCount())%></td>		
	</tr>
	<tr>
		<th>年收入:</th>
		<td><%=fuApi.getHtml(form,"account_earning",crmAccount.getEarning())%></td>
		<th>标准行业分类代码:</th>
		<td><%=fuApi.getHtml(form,"account_industry_code",crmAccount.getIndustryCode())%></td>		
	</tr>
	<tr>
		<td align=left colspan="4">地址信息</td>
	</tr>
	<tr>
		<th>开单地址-国家/地区:</th>
		<td><%=fuApi.getHtml(form,"account_kd_country",crmAccount.getKdCountry())%></td>
		<th>发货地址-国家/地区:</th>
		<td><%=fuApi.getHtml(form,"account_fh_country",crmAccount.getFhCountry())%></td>
	</tr>
	<tr>
		<th>开单地址-邮政编码:</th>
		<td><%=fuApi.getHtml(form,"account_kd_postcode",crmAccount.getKdPostcode())%></td>
		<th>发货地址-邮政编码:</th>
		<td><%=fuApi.getHtml(form,"account_fh_postcode",crmAccount.getFhPostcode())%></td>		
	</tr>
	<tr>
		<th>开单地址-州/省:</th>
		<td><%=fuApi.getHtml(form,"account_kd_state",crmAccount.getKdState())%></td>
		<th>发货地址-州/省:</th>
		<td><%=fuApi.getHtml(form,"account_fh_state",crmAccount.getFhState())%></td>		
	</tr>
	<tr>
		<th>开单地址-城市:</th>
		<td><%=fuApi.getHtml(form,"account_kd_city",crmAccount.getKdCity())%></td>
		<th>发货地址-城市:</th>
		<td><%=fuApi.getHtml(form,"account_fh_city",crmAccount.getFhCity())%></td>
	</tr>
	<tr>
		<th>开单地址-街道:</th>
		<td><%=fuApi.getHtml(form,"account_kd_street",crmAccount.getKdStreet())%></td>
		<th>发货地址-街道:</th>
		<td><%=fuApi.getHtml(form,"account_fh_street",crmAccount.getFhStreet())%></td>		
	</tr>
	<tr>
		<td align=left colspan="4">描述信息</td>
	</tr>
	<tr>
		<th>描述:</th>
		<td colspan="3"><%=fuApi.getHtml(form,"account_description",crmAccount.getDescription())%></td>
	</tr>
</table>
