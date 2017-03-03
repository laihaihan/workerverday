<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.print.printlodop.Print"%>
<%@ page import="com.linewell.core.print.printlodop.PrintManager"%>
<%@ page import="com.linewell.core.print.printlodop.UserPrint"%>
<%@ page import="com.linewell.core.print.printlodop.UserPrintManager"%>
<%@ page import="com.linewell.core.util.StrUtil" %>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@	page import="com.linewell.ucap.session.Session"%>
<%@	page import="com.linewell.ucap.platform.cache.user.User"%>
<%
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	User user = ucapsession.getUser();
	
	String print_unid = request.getParameter("print_unid");
	String condition = "user_unid ='"+user.getUnid()+"' and print_unid='"+print_unid+"'";
	
	PrintManager printManager = new PrintManager();
	UserPrintManager userPrintManager = new UserPrintManager();
	Print print = printManager.doFindBeanByKey(print_unid);
	UserPrint userPrint = userPrintManager.doFindBeanByCondition(condition,null);
	if(print == null){
		StringBuffer script = new StringBuffer();
		script.append("<script type='text/javascript'>");
		script.append("top.popup.alert('操作提示','套打模板未配置','warning',1000,true);");
		script.append("top.popup.close();");
		script.append("</script>");
		out.println(script.toString());
		return;
	}else if(userPrint != null){
		print.setPrint_content(userPrint.getPrint_content());
	}
	print = printManager.setPrintValue(print,request);
	
	request.setAttribute("print",print);
	request.setAttribute("path",request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="LodopFuncs.js"></script>
</head>
<body style="overflow-y:auto">
	<table width="100%" align="center" style="background: #ffffff">
		<tr>
			<td align="right" style="padding-right:20px;height:35px;">
				<input type="button" value="设置个人打印模板" id="btnSetUserPrint">
			</td>
		</tr>
		<tr>
			<td>
				<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=100% height=600> 
					<embed id="LODOP_EM" type="application/x-print-lodop" pluginspage="install_lodop.exe"></embed>
				</object> 
			</td>
		</tr>
	</table>
	
	<script type="text/javascript">
		$(function(){
			setPrintContent();
			$("#btnSetUserPrint").bind("click",doSetUserPrint);
			top.popup.resizeLast(950,680);//重新设置窗口大小
		});
		
		//设置打印内容
		function setPrintContent(){
			var LODOP = getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
			
			${print.print_content}
			LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE",1);
			LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW",1);
			LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",1);	
			
			//插入背景图
			if('${print.print_background}'.length>0 && <%=StrUtil.formatNull(print.getPrint_content()).indexOf("ADD_PRINT_SETUP_BKIMG")==-1?"true":"false"%>){
				LODOP.ADD_PRINT_SETUP_BKIMG("<img src='${path}/${print.print_background}'>");
			}
			
			LODOP.PRINT_DESIGN();
		}
		
		//设置个人打印模板
		function doSetUserPrint(){
			var returnValue = window.showModalDialog("user_print_edit.jsp?print_unid=${print.print_unid}", "设置个人打印模板", "dialogHeight=650px;dialogWidth=950px;resizable=1;center=1;status=1;scroll=1;help=0;");
			if(returnValue){
				location.reload();
			}
		}
	</script>
</body>
</html>