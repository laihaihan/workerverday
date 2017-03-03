<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.form.content.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.apas.service.*" %>
<%@ page import="com.linewell.core.util.ClobUtil" %>
<%@ page import="com.linewell.core.util.StrUtil" %>
<%@page import="com.linewell.core.form.design.*"%>
<%@page import="com.linewell.core.form.interfaces.*"%>
<%@ page import="com.linewell.core.html.HtmlFilling" %>
<%@page import="com.linewell.apas.constant.ApasConstants"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<%
	String path = request.getContextPath();
	String unid = request.getParameter("unid");
	String formunid = request.getParameter("formunid");
	
	String index = request.getParameter("index");
	String maxindex = request.getParameter("maxindex");
	
	FormContentManager formContentManager = new FormContentManager();
	FormContent formContent = formContentManager.doFindBeanByKey(formunid);
	
	if(!StrUtil.isNull(formContent.getVerifyinterface())){
		out.print("<script type='text/javascript'>");
		out.print("window.location.href='"+path+formContent.getYewujsp()+"';");
		out.print("</script>");
	}
	
	FormDesignBussiness formDesignBussiness = new FormDesignBussiness();
	FromCustomize  fromCustomize = new FromCustomize();
	boolean isNew = fromCustomize.isNew(unid,formunid,formContent.getTablename());

	List histryFormList = formContentManager.doFindListByCondition(" sortid<"+formContent.getSortid(),new Object[0]);

	
	//展示部分
	String showContent = fromCustomize.getFormContent(unid,formContent,request);
	FormContent nextFormContent = formContentManager.getNextFormByNowForm(formContent);

%>


<html>
<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<link rel="stylesheet" type="text/css" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/lw-ui/waitscreen.js"></script>
	<%=ClobUtil.clobToStr(formContent.getLinkcontent()) %>
	<%=ClobUtil.clobToStr(formContent.getScriptcontent()) %>
	<%=ClobUtil.clobToStr(formContent.getCsscontent()) %>
</head>

<body>	
<form id="jspForm" name="jspForm" method="post" action="${path}/ApasRegister.action" enctype ="multipart/form-data" >
		<input type="hidden" name="formunid" value="<%=formContent.getUnid()%>">
		<input type="hidden" name="unid" value="<%=unid%>">
		<input type="hidden" name="serviceid" value="<%=formContent.getPunid()%>">
		<input type="hidden" id="fn" name="fn" value="autoform">
		<input type="hidden" name="applyfrom" value="<%=ApasConstants.APPLYSOURCE_OUTER%>">
		
		<input type="hidden" name="resultTableName" value="<%=formContent.getTablename()%>_RESULT">
		<input type="hidden" id="autohtmlcontent"  name="autohtmlcontent" value="">
		
	<%
		out.println(showContent);
	%>
	</form>
	<div align="center">
	
	</div>
</body>
<script type="text/javascript">

//上一步
function onUpStep(index){
	index = parseInt(index) - 1;
	parent.tabsChangeByIndex(index); 
	
}
//下一步
//index 页签索引
//state 0 不是最后一个页签，1 最后一个页签。
function onNextStep(index,state){
	if(validate.validate()){
		index = parseInt(index) + 1;
		
        $("#autohtmlcontent").val($("#jspForm").html());
		$("#jspForm").ajaxSubmit({
			dataType:'json',
			async:'false',
			error:function(){
				alert("操作失败");
			},
			success:function(data){
				if(data.result){
					if(state == 1){
						alert("申报成功，点击确定关闭窗口。");
						parent.window.close();
					}else{
						//表单保存成功提醒等待
						$("#fn").val("autoformresult");
						new screenClass('nextbtn','<%=path%>').lock();
						//ajax 调用后台代码
						$("#jspForm").ajaxSubmit({
							dataType:'json',
							async:'false',
							error:function(){
								alert("从内网获取数据出错！");
							},
							success:function(data){
								new screenClass('nextbtn','<%=path%>').unlock(); 
								parent.tabsChangeByIndex(index,'<%=nextFormContent.getUnid()%>');	
							}
						});
					}
				}else{
					alert("操作失败！");
				}
			}
		});
		
	}
}



<%
out.print(formDesignBussiness.getValidate(formContent.getUnid(),"jspForm").toString());
%>
	
</script>
</html>