<%--
/**
 * 视图选择表
 * @author cyingquan@qq.com
 * @2010-01-17
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	
	<title>选择字典类型</title>
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
		<td style="border-right:0px; height: 100%;">
			<iframe id="iframe" src="view.action?fn=grid&viewId=B369E053C83ABB44A118725975D2D001" width="100%" height="100%"></iframe>
		</td>
	</tr>	
	<tr>
		<td height="30px;" align="center"> 
			<input type="button" value="确定" class="btnChannel" onclick="choose();">
			<input type="button" value="取消" class="btnChannel" onclick="top.lwin.close();" style="margin-left: 30%;">
		</td>
	</tr>
	</tbody>
	</table>
	
	<SCRIPT type="text/javascript">
	function choose(){
		var rows = document.getElementById("iframe").contentWindow.getSelections();
		if(rows.length==1){
			var dicttype = '<%=request.getParameter("dicttype")%>';
			top.lwin.parent().find(":text[name="+dicttype+"]").val(rows[0].DICTTYPE);
			top.lwin.close();
		}else{
			top.$.messager.alert("信息","请选择一行！","info");
		}
	}	
	</SCRIPT>
</body>
</html>
