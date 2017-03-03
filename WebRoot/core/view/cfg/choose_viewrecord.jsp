<%--
/**
 * 视图视图记录
 * @author lfunian@linewell.com
 * @date Aug 28, 2013
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	//视图id
	String viewId = request.getParameter("viewId");
	request.setAttribute("viewId", viewId);
	//单选或者多选
	String selType = request.getParameter("selType");
	request.setAttribute("selType", selType);
	//窗口返回的显示名称
	String input = request.getParameter("input");
	request.setAttribute("input", input);
	//视图列表显示名称
	String field = request.getParameter("field");
	request.setAttribute("field", field);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	
	<title>选择视图记录</title>
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
			<iframe id="iframe" src="view.action?fn=grid&viewId=${viewId}" width="100%" height="100%"></iframe>
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
	/**
	* 说明：选择记录按钮事件方法
	**/
	function choose(){
		var input = '<%=input%>';
		var field = '<%=field%>';
		var rows = document.getElementById("iframe").contentWindow.getSelections();
		if(rows.length == 0){
			top.$.messager.alert("信息","请先选择列表中的信息！","info");
			return;
		} else {
			if('${selType}' == '1'){
				if(rows.length > 1){
					top.$.messager.alert("信息","请选择一条记录！","info");
					return;
				} else {
					if(input.indexOf(',') > 0){
						var inputArr = input.split(',');
						var fieldArr = field.split(',');
						for(var i = 0; i < inputArr.length; i++){
							top.lwin.parent().find("#"+inputArr[i]).val(eval("rows[0]."+fieldArr[i]));
						}
					} else {
						top.lwin.parent().find("#"+input).val(eval("rows[0]."+field));
					}
					top.lwin.close();
				}
			} else if('${selType}' == '0'){
				for(var i = 0; i < rows.length; i++){
					if(i == 0){
						if(input.indexOf(',') > 0){
							var inputArr = input.split(',');
							var fieldArr = field.split(',');
							for(var j = 0; j < inputArr.length; j++){
								top.lwin.parent().find("#"+inputArr[i]).val(eval("rows["+ i +"]." + fieldArr[i]));
							}
						} else {
							top.lwin.parent().find("#"+input).val(eval("rows["+ i +"]." + field));
						}
					} else {
						if(input.indexOf(',') > 0){
							var inputArr = input.split(',');
							var fieldArr = field.split(',');
							for(var j = 0; j < inputArr.length; j++){
								top.lwin.parent().find("#"+inputArr[i]).val(top.lwin.parent().find("#"+inputArr[i]).val() + "," + eval("rows["+ i +"]." + fieldArr[i]));
							}
						} else {
							top.lwin.parent().find("#"+input).val(top.lwin.parent().find("#"+input).val() + "," + eval("rows["+ i +"]." + field));
						}
					}
				}
				top.lwin.close();
			}
		}
	}	
	</SCRIPT>
</body>
</html>
