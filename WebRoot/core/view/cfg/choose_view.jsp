<%--
/**
 * 视图选择表
 * @author cyingquan@qq.com
 * @2010-01-17
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="../../params.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
	String APP_UNID = request.getParameter("APP_UNID");
	if(StrUtil.isNull(APP_UNID)){
		APP_UNID = "";
	}
%>
<html>

<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	${import_jquery}
	${import_easyui}
	${import_theme}		
	<script type="text/javascript" src="${corejs}/lw-ui/globalvar.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/lwin.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/popup.js"></script>    
  
</head>

<body>

	<table cellspacing="0" cellpadding="0" border="1" align="center" class="tableSet" width="100%" height="100%">
	<tbody>
	<tr>
		<td style="border-right:0px;">
			<iframe id="iframe" src="view.action?fn=grid&viewId=B369E053C83ABB44A118725975D2DEAE&APP_UNID=<%=APP_UNID %>" width="100%" height="450"></iframe>
		</td>
	</tr>	
	<tr>
		<td height="30px;" align="center"><input type="button" value="确定" onclick="choose()"></td>
	</tr>
	</tbody>
	</table>
	
	<SCRIPT type="text/javascript">
	function choose(){
		var rows = document.getElementById("iframe").contentWindow.getSelections();
		if(rows.length==1){
			var obj = window.dialogArguments ;
			obj.unid = rows[0].VIEW_UNID;
			obj.name = rows[0].VIEW_NAME;
			window.close();
		}else{
			alert('请选择一行');
		}
	}	
	</SCRIPT>
</body>
</html>
