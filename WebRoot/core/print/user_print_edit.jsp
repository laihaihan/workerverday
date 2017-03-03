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
		out.println("<script type='text/javascript'>alert('操作提示','套打未配置','warning',1000,true);</script>");
		return;
	}else if(userPrint != null){
		print.setPrint_content(userPrint.getPrint_content());
	}
	
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
<body>
	<table width="100%" align="center" style="background: #ffffff" border=0>
		<tr>
			<td align="right" style="padding-left:20px;height:35px;font-size:14px">
				<font color="red"><b>下次打印时使用：</b></font>
				<input type="radio" name="print_type" value="1" <%=userPrint == null ? "checked" : "" %>>默认配置方案&nbsp;&nbsp;
				<input type="radio" name="print_type" value="2" <%=userPrint != null ? "checked" : "" %>>当前配置方案&nbsp;&nbsp;
				<input type="button" value="保存" id="btnSave" style="margin-right:15px;padding:0px">
			</td>
		</tr>
		<tr>
			<td>
				<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=100% height=550> 
					<embed id="LODOP_EM" type="application/x-print-lodop" pluginspage="install_lodop.exe"></embed>
				</object> 
			</td>
		</tr>
	</table>
	
	<script type="text/javascript">
		$(function(){
			setPrintContent();
			$("#btnSave").bind("click",doSave);
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
		
		//保存表单信息
		function doSave(){
			$.ajax({
				type:'post',		
				url:'${path}/UserPrint.action',
				dataType:'json',
				data:{
					unid:'<%=new UNIDGenerate().getUnid()%>',
					user_unid:'<%=user.getUnid()%>',
					print_unid:'${print.print_unid}',
					print_content:LODOP.GET_VALUE('ProgramCodes',1),
					print_type:$(":radio[name='print_type']:checked").val()
				},
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					alert(data.result ? '保存成功' : '保存失败');
					window.returnValue = true;
					window.close();
				}
			});
		}
	</script>
</body>
</html>