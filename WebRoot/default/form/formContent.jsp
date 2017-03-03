<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.session.Session" %>
<%@page import="com.linewell.ucapx.form.FormType" %>

<%
/**
 * 表单内容区域
 * @author xhuatang@linewell.com
 * @since 2011-07-08
 */
{
%>
<%
//表单的UNID
String __formUnid = request.getParameter("formId");
//表单的类型
String __formType = request.getParameter("type");
//当前对象的unid
String __unid = request.getParameter("unid");
if(StringUtils.isEmpty(__unid)) __unid="";
%>
<%@include file="pager.jsp"%>
<%@include file="button.jsp"%>

<!-- #_ucap_main_body begin -->
<div id="_ucap_main_body">
  <!-- #_ucap_main_div begin -->
  <div class="showBox" id="_ucap_main_div">
    <!-- #showBox begin -->
    <div id="showBox">
    <form method="post" id="ucapForm" name="ucapForm">
<%
//如果是组合表单
if(FormType.ComposeForm.equals(__formType)){
%>
<%@include file="tabs.jsp"%>
<%
}else{//普通表单与显示表单
    FormUtilsApi __formApi = new FormUtilsApi(); 
    String __jspName = __formApi.getJspName( __formUnid,__formType);
    String __jspPage = "../jsp/" + __jspName + ".jsp";
%>
<jsp:include page="<%= __jspPage %>" />
<%
}
%>
    </form>
    </div><!-- #showBox end -->
  </div><!-- #_ucap_main_div end -->
</div><!-- #_ucap_main_body end -->
<%@include file="footer.jsp"%>
<%
}//end page
%>