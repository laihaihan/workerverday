<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="com.linewell.was.ptl.survey.Survey"%>
<%@page import="com.linewell.was.ptl.survey.SurveyManager"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@include file="/core/params.jsp" %>
<%
	String strRootUrl = request.getContextPath();
	String stylePath=strRootUrl+"/style/www.fjqw.gov.cn/zh-cn";

	String siteunid = request.getParameter("siteunid");
	
	String unid =request.getParameter("unid");
	
	Survey survey = SurveyManager.getInstance().doFindBeanByKey(unid);
	if(survey==null){
		survey = new Survey();
	}
	
	String begintime = survey.getBegintime();
	String endtime = survey.getEndtime();
	
	boolean boolSubButton = true;
	
	String[] letter = {
		"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","S","Y","Z"
	};
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>福建侨网 - 网上调查</title>
<LINK href="<%=stylePath%>/css/wsdc.css" type=text/css rel=stylesheet>
<style type="text/css">
<!--

-->
</style>
${import_jquery }
<script type="text/javascript" src="/app/core/js/jquery.form.js"></script>

</head>

<body leftMargin=0 topMargin=0 >

<table width="1000"  border="0" align="center" cellpadding="0" cellspacing="0">
<tr>
</tr>
</table>

<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0">
<tr>
	<td height="38" align="left" valign="middle" background="<%=stylePath%>/images/wsdc_01.jpg">
	
		<table width="927" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td width="25">&nbsp;</td>
			<td width="902"> <span class="red">您的位置：</span> <a href="http://www.fjqw.gov.cn" class="a">福建侨网</a> -&gt; <a href="<%=strRootUrl%>/public/publicParticipation/OnlineSurvey/wsdcList.jsp?siteunid=<%=siteunid%>" class="a">网上调查</a></td>
		</tr>
		</table>
	</td>
</tr>
<tr>
	<td align="center" valign="top" background="<%=stylePath%>/images/wsdc_bg.jpg">
		<table width="100%"  border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td valign="top" class="wsdc_bg">
			
				<table width="850" border="0" align="center" cellpadding="0" cellspacing="0">
				<tr>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>
					
						<table width="850"  border="0" align="center" cellpadding="0" cellspacing="0">
						<tr>
							<td width="1%"><img src="<%=stylePath%>/images/wsdc_04.jpg" width="9" height="42"></td>
							<td width="98%" align="center" background="<%=stylePath%>/images/wsdc_05.jpg" class="r3"><%=survey.getTitle()%></td>
							<td width="1%" align="right" background="<%=stylePath%>/images/wsdc_05.jpg"><img src="<%=stylePath%>/images/wsdc_06.jpg" width="8" height="42"></td>
						</tr>
						</table>
								
						<table width="850"  border="0" align="center" cellpadding="0" cellspacing="0">
						<tr>
						<td background="<%=stylePath%>/images/xxgk_08.jpg">&nbsp;</td>
						</tr>
						</table>
						
					</td>
				</tr>
				<tr>
					<td height="500px" valign="top">
					
						<table width="90%"  border="0" align="center" cellpadding="0" cellspacing="0">
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td align="left">								
								<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="5">
								<%
									if(survey.getDescribe().length()>0){
										String describe = survey.getDescribe();
										describe.replaceAll("\r","<br>");
										describe.replaceAll("\n","<br>");
								%>
								<tr>
									<td><%=describe%></td>
								</tr>
								<%
									}
								%>	
								<tr>
									
								</tr>
								<tr>
									<td height="15px"></td>
								</tr>
								<tr>
									<td>
										<form id="jspform" action="Survey.action" name="wsdcForm" method="post" >
										<input type="hidden" name="fn" value="vote" />
										<input type="hidden" name="punid" value="<%=unid %>" />
										<input type="hidden" id="checkItems" name="checkItems" value="" />										
										<table>
										<tr>
											<td>姓名:</td>
											<td><input type="text" name="name" /></td>
										</tr>
										<tr>
											<td>身份证号码:</td>
											<td><input type="text" name="idcard" /></td>
										</tr>
										<tr>
											<td>电话号码:</td>
											<td><input type="text" name="tel" /></td>
										</tr>
										<tr>
											<td>职业:</td>
											<td><input type="text" name="job" /></td>
										</tr>
										<tr>
											<td>通信地址:</td>
											<td><input type="text" name="addr" /></td>
										</tr>
										<tr>
											<td>邮政编码:</td>
											<td><input type="text" name="postcode" /></td>
										</tr>
										</table>
										</form>
									</td>
								</tr>
								<%
									String sql = "select * from survey_item where punid = '"+unid+"' order by createtime";
									List itemList = JDBCTool.doSQLQueryList(GlobalParameter.APP_WAS,sql);
									for(int i=0;i<itemList.size();i++){
										Map mapItem = (Map)itemList.get(i);
								%>
								<input type="hidden" name="item_unid" value="<%=mapItem.get("UNID")%>" title="<%=mapItem.get("TITLE") %>" class="item"/>
								<tr>
									<td>
										<img src="<%=stylePath%>/images/d8.jpg" width="8" height="10">
										<a name="<%=mapItem.get("UNID")%>"></a><%=mapItem.get("TITLE") %>&nbsp;
									</td>
								</tr>
								<tr><td></td></tr>
								<%
										String questionSQL = "select * from survey_question where punid ='"+mapItem.get("UNID")+"'";
										List questionList = JDBCTool.doSQLQueryList(GlobalParameter.APP_WAS,questionSQL);
										for(int j=1;j<questionList.size();j++){
											Map question = (Map)questionList.get(j);
								%>
								<tr>
									<td><Label><input type="radio" name="<%=mapItem.get("UNID")%>" value="<%=question.get("UNID")%>"/><%=letter[j-1]%>. <%=question.get("TITLE") %></Label></td>
								</tr>
								<tr><td></td></tr>
								<%
										}
									}
								%>									
								<tr>								
									<td align="center">
									<%
										if(boolSubButton){
									%>
									<img src="<%=stylePath%>/images/c_myzj_btn1.jpg" onclick="subForm();" style="cursor:hand;" />&nbsp;&nbsp;
									<%	
										}
									%></td>
								</tr>
								</table>
								
								
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						</table>
					
					</td>
				</tr>
				</table>
			
			</td>
		</tr>
		</table>
	
	</td>
</tr>
<tr>
	<td align="center" valign="top"><img src="<%=stylePath%>/images/wsdc_02.jpg" width="1000" height="7"></td>
</tr>
</table>
<!-- 底部文件 -->
<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0">
<tr>
	<td>
	</td>
</tr>
</table>
<!-- /底部文件 -->
<A title="" href=""  name=StranLink  pop="點擊以繁體中文方式浏覽"></A>
<script type="text/javascript">
function subForm(){
	var submit = true;
	var checkItems = "";
	$(".item").each(function(index){
		if($(":checked[name="+$(this).val()+"]").length==0){
			alert("请填写["+$(this).attr("title")+"]项的意见框，再进行提交");
			var href = location.href;
			if(href.indexOf("#")>-1){
				href = href.substring(0,href.indexOf("#"));
				href+="#"+$(this).val();
			}else{
				href+="#"+$(this).val();
			}
			location.href = href;
			submit = false;
			return false;
		}else{
			checkItems+=$(":checked[name="+$(this).val()+"]").val()+",";
		}
	});
	if(submit){
		$("#checkItems").val(checkItems);
		 $("#jspform").ajaxSubmit({
	       	error: function(responseText){
				alert("提交出错");
			},
			success: function(responseText){
				alert("感谢您的参与!");
			}
	     });
	     return false;
	}	
}
</script>
</body>
</html>
