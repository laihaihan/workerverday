<%--
/**
 * 选择流程
 * @author cyingquan@qq.com
 * @2010-01-17
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.flow.ucapconfigflow.UcapFlowConfigBusiness"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="../../params.jsp" %>
<%
	String appUnid = request.getParameter("appUnid");
	String flowUnid = request.getParameter("flowUnid");
	UcapFlowConfigBusiness business = new UcapFlowConfigBusiness(appUnid);
	List flowList = business.doFindListByAppUnid(appUnid, "");
	request.setAttribute("flowUnid", flowUnid);
	request.setAttribute("flowList", flowList);	
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	
	${import_theme}	
	${import_jquery}
	${import_toolbarPosition}
		
	<!--<script type="text/javascript" src="${corejs}/lw-ui/globalvar.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/lwin.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/popup.js"></script>-->    
</head>

<body>
	<div id="form_content">	
		<div id="form_toolbar">
			<button class="form_btn" id="btnSure"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 确定 </button>
			<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div>
		<div id="jspForm">
		<table align="center" class="form_table">
		<tbody>
		<tr>
			<th style="width: 10%;">序号</th>
			<th style="width: 10%;">选择</th>
			<th>流程名称</th>
		</tr>	
		<s:iterator value="#request.flowList" id="flow" status="s">
			<tr class="row" style="cursor: hand;">
				<td align="center">${s.index + 1}</td>
				<td align="center"><input type="radio" name="radio" class="radio" value="${flow.flow_unid}" /></td>
				<td>${flow.flow_name}</td>
			</tr>
		</s:iterator>
		</tbody>
		</table>
		</div>
	</div>
	<script type="text/javascript">
	$(function(){
		$('#btnSure').bind('click', btnDoSure);
		$('#btnClose').bind('click', btnDoClose);
		$('.row').bind('click', rowClick);
		$('.row').bind('mouseover', rowMouseOver);
		$('.row').bind('mouseout', rowMouseOut);
		initSelRecord();
	});
	/**
	* 说明：确定选择的记录
	**/
	function btnDoSure(){
		var count = $(':radio[name=radio]:checked').length;
		if(count == 0){
			$.messager.alert('消息', '请先选择流程！', 'info');
		} else {
			var flowUnid = $(':radio[name=radio]:checked').val();
			var flowName = $(':radio[name=radio]:checked').parent().next().text();
			top.tabs.getSelected().find("iframe").contents().find('#name').val(flowName);
			top.tabs.getSelected().find("iframe").contents().find('#flowid').val(flowUnid);
			//window.parent.frames[0].document.getElementById('name').value = flowName;
			//window.parent.frames[0].document.getElementById('flowid').value = flowUnid;
			top.lwin.close();
		}
	}
	/**
	* 说明：关闭窗口
	**/
	function btnDoClose(){
		top.lwin.close();
	}
	/**
	* 说明：点击表格行记录时，选中单选框
	**/
	function rowClick(){
		$($($(this).children().get(1)).children().get(0)).attr('checked', 'checked');
	}
	/**
	* 说明：当鼠标移动到记录行时，改变背景色
	**/
	function rowMouseOver(){
		$(this).find('td').css('background', '#F3ECFF');
		$(this).css("background-color","#F3ECFF");
	}
	/**
	* 说明：当鼠标离开记录行时，改变背景色
	**/
	function rowMouseOut(){
		$(this).find('td').css('background', '#fff');
		$(this).css("background-color","#fff");
	}
	
	/**
	* 说明：初始化已选择的流程记录
	**/
	function initSelRecord(){
		if('${flowUnid}' != '' && '${flowUnid}' != 'null' && '${flowUnid}' != 'undefined'){
			var radioCount = $(':radio[name=radio]').length;
			for(var i = 0; i < radioCount; i++){
				if('${flowUnid}' == $($(':radio[name=radio]').get(i)).val()){
					$($(':radio[name=radio]').get(i)).attr('checked', 'checked');
				}
			}
		}
	}
	</script>
</body>
</html>
