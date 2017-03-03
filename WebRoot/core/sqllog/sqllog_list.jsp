<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="com.linewell.core.view.sqllog.*" %>
<%@page import="com.linewell.core.util.ListUtil"%>
<%@include file="/core/params.jsp" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	SqlLogBusiness business = new SqlLogBusiness();
	String appUnid = request.getParameter("appUnid");
	String viewUnid = request.getParameter("viewUnid");
	List sqlLogList = business.doFindListByAppUnidAndViewUnid(appUnid, viewUnid);
	request.setAttribute("sqlLogList", sqlLogList);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	<link rel="stylesheet" type="text/css" href="${path}/uistyle/style_1/css/ucap.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/uistyle/style_1/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="${path}/uistyle/style_1/css/ext-patch.css" />
	<link rel="stylesheet" type="text/css" href="${path}/js/ucap/calendar/skin/WdatePicker.css" />
	<style type="text/css">
		th {
			font:15px 宋体 !important;
			text-align: center;
		}
		td {
			text-align: center;
		}
	</style>
</head>
<body>
	<div id="form_toolbar">
		<div align="left">
			<button class="form_btn" id="btnChoose"><img src="${path}/core/js/easyui/themes/icons/ok.png">选择</button>
		</div>
	</div>
	<table width="100%" align="center" class="form_table">
		<tr>
			<th nowrap="nowrap">选择</th>
			<th nowrap="nowrap">序号</th>
			<th nowrap="nowrap">SQL语句</th>
			<th nowrap="nowrap">创建时间</th>
		</tr>
		<%
			if(!ListUtil.isNull(sqlLogList)){
				SqlLog sqlLog = null;
				int index = 0;
				for(Object object : sqlLogList){
					sqlLog = (SqlLog)object;
		%>
			<tr class="dataRow">
				<td style="width: 5%;">
					<input type="hidden" id="sqlHdden" value="<%=sqlLog.getSql() %>">
					<input type="radio" name="sqlRadio" class="sqlRadio">
				</td>
				<td style="width: 5%;">
					<%=++index %>
					<input type="hidden" name="unid" value="<%=sqlLog.getUnid() %>">
					<input type="hidden" name="app_unid" value="<%=sqlLog.getApp_unid() %>">
					<input type="hidden" name="view_unid" value="<%=sqlLog.getView_unid() %>">
				</td>
				<td class="sqlDiv" style="width: 72%;" title="<%=sqlLog.getSql() %>">
					<%
						if(sqlLog.getSql().length() > 70){
					%>
							<%=sqlLog.getSql().substring(0, 70) %> ......
					<%		
						} else {
					%>
							<%=sqlLog.getSql() %>
					<%		
						}
					%>
				</td>
				<td style="width: 18%;"><%=sqlLog.getCreatetime() %></td>
			</tr>
		<%		
				}
			} else {
		%>
			<tr><td colspan="4">无历史SQL语句记录</td></tr>
		<%	
			}
		%>
	</table>
	<br>
	<div style="display: none; background-color: white;" id="showDiv">
	</div>
	<script type="text/javascript">
	$(function(){
		/**
		* 说明：绑定鼠标移动到SQL语句列时，显示记录
		**/
		/*$('.sqlDiv').mouseover(function(e){
    		var alt = $(this).find('#sqlHdden').val();
    		var dhtml = $("<div style='background-color:white;'>"+alt+"</div>").css({position:'absolute',top:(e.pageY+10)+'px',left:(e.pageX+5)+'px',display:'none'});
    		dhtml.appendTo('body').fadeIn();
    		$(this).unbind('mouseout').mouseout(function(){
       			dhtml.fadeOut(100,function(){$(this).remove()});
   			})
		})*/
		//绑定选择按钮点击事件
		$('#btnChoose').bind('click', onChoose);
		//绑定单选按钮点击事件
		$('.sqlRadio').bind('click', onRadio);
		//绑定数据行点击事件
		$('.dataRow').bind('click', onDataROw);
	});
	/**
	* 说明：点击选择按钮时，返回已经选择的记录给父窗口
	**/
	function onChoose(){
		var chooseArr = $('.sqlRadio');
		if(chooseArr.length == 0){
			top.$.messager.alert('消息', '无可供选择的历史记录！', 'info');
			return;
		} else {
			var index = -1;
			for(var i = 0; i < chooseArr.length; i++){
				if($(chooseArr[i]).attr('checked')){
					index = i;
				}
			}
			if(index == -1){
				top.$.messager.alert('消息', '请先选择历史记录！', 'info');
			} else {
				top.lwin.parent().find('#sql').val($(chooseArr[index]).prev().val());
				top.lwin.close();
			}
		}
	}
	/**
	* 说明：点击单选选择按钮时，显示完整的sql语句信息
	**/
	function onRadio(){
		if($(this).prev().val().length > 70){
			$('#showDiv').show();
			$('#showDiv').html($(this).prev().val());
		} else {
			$('#showDiv').hide();
			$('#showDiv').html('');
		}
	}
	
	/**
	* 说明：点击数据行时，选中单选按钮，并且显示相应的sql语句信息
	**/
	function onDataROw(){
		$(this).find('.sqlRadio').attr('checked', 'checked');
		if($(this).find('#sqlHdden').val().length > 70){
			$('#showDiv').show();
			$('#showDiv').html($(this).find('#sqlHdden').val());
		} else {
			$('#showDiv').hide();
			$('#showDiv').html('');
		}
	}
	</script>
</body>
</html>