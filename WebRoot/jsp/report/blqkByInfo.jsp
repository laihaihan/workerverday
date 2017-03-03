<%@ page language="java" contentType="text/html; charset=gb2312"%>
<%@ page import="com.linewell.monitor.report.amline.AmlineManager"%>
<%
String whoseSys = request.getParameter("whoseSys");
	String area = request.getParameter("area");

	String dept=request.getParameter("dept");
	String starttime = request.getParameter("starttime");
	String endtime = request.getParameter("endtime");
	String[][] res = AmlineManager.blqk(area, dept, starttime, endtime);

 %>
<HTML>
<HEAD>
	<TITLE>jsp模板说明列表</TITLE>
	<META http-equiv=Content-Type content="text/html; charset=gb2312">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<LINK href="../../ess/css/style.css" type=text/css rel=stylesheet>
	<LINK href="../../css/sortabletable.css" type=text/css rel=stylesheet>
	<LINK href="../../css/input.css" type=text/css rel=stylesheet>
	<LINK href="../../css/newstyle.css" type=text/css rel=stylesheet>		
	<SCRIPT language=JScript.Encode src="../../jslib/checkbox.js"></SCRIPT>
	<SCRIPT language=JScript.Encode src="../../jslib/pickdate.js"></SCRIPT>
	
</HEAD>

<BODY>
	<table id="printExcel" width="100%" border="0" cellpadding="2" cellspacing="1" bgcolor="#C7D0D7">
		<tr align="center">
			<td  width="16%" height="24" bgcolor="#DCEFFF" rowspan="2">类型</td>
			<td  width="12%" height="24" bgcolor="#DCEFFF" rowspan="2">总量</td>
			<td  width="12%" height="24" bgcolor="#DCEFFF" rowspan="2">正常</td>
			<!-- <td  width="20%" height="24" bgcolor="#DCEFFF" colspan="2"><img src="<%=request.getContextPath()%>/images/module/w.gif">预警</td> -->
			<td  width="20%" height="24" bgcolor="#DCEFFF" colspan="2"><img src="<%=request.getContextPath()%>/images/module/y.gif">黄牌</td>
			<td  width="20%" height="24" bgcolor="#DCEFFF" colspan="2"><img src="<%=request.getContextPath()%>/images/module/r.gif">红牌</td>
		</tr>
		<tr align="center">
			<!-- <td width="10%" height="24" bgcolor="#DCEFFF">数量</td>
			<td width="10%" height="24" bgcolor="#DCEFFF">占总量%</td> -->
			<td width="10%" height="24" bgcolor="#DCEFFF">数量</td>
			<td width="10%" height="24" bgcolor="#DCEFFF">占总量%</td>
			<td width="10%" height="24" bgcolor="#DCEFFF">数量</td>
			<td width="10%" height="24" bgcolor="#DCEFFF">占总量%</td>
		</tr>
		<% if(res != null)
		for(int i=0; i<res.length; i++){
		out.print("<tr align='center'>");
		out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][0]+ "</td>");
		out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][1]+ "</td>");
		out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][2]+ "</td>");
		out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][3]+ "</td>");
		out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][4]+ "</td>");
	//	out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][5]+ "</td>");
	//	out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][6]+ "</td>");
		out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][7]+ "</td>");
		out.print("<td height='24' bgcolor='#FFFFFF'>" + res[i][8]+ "</td>");
		out.print("</tr>");
		}
		%>
		</table>

<br/><br/><br/><br/><br/>
</BODY>
</HTML>