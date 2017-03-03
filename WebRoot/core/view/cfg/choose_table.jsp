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
<%
	request.setAttribute("path", request.getContextPath());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	
	<link href="${path}/include/style/skin/default/edit.css" type="text/css" rel="stylesheet">
	<link href="${path}/include/js/lib/autocomplete/jquery.autocomplete.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" src="${path}/include/js/lib/jquery.js"></script>
	<script type="text/javascript" src="${path}/include/js/lib/autocomplete/jquery.autocomplete.min.js"></script>
</head>

<body>

	<table cellspacing="0" cellpadding="0" border="1" align="center" class="tableSet">
	<tbody>
	<tr>
		<td style="border-right:0px;">搜索:<input type="text" id='tags' /></td>
	</tr>
	<tr>
		<td width="13%">
			<select style="width: 200px;" size="20" name="tableList" id="tableList">
				<s:iterator value="#request.TableNames">
					<s:if test="TABLENAME!='TABLENAME'">
						<option value="${TABLENAME}" title="${COMMENTS}">${TABLENAME}</option>
					</s:if>					
				</s:iterator>
			</select>			
		</td>
		<td width="6%" align="center">
			<ul>
				<li>
					<input type="button" value="添加" id="buttonAdd" class="btnChannel" name="btnadd">
				</li>
				<li>&nbsp;</li>
				<li>
					<input type="button" value="删除" id="buttonDel" class="btnChannel" name="btndel">
				</li>
			</ul>
		</td>
		<td width="13%">
			<select style="width: 200px;" size="20" name="chooseTableList" id="chooseTableList">
				
			</select>
		</td>
	</tr>
	<tr>
		<td align="center" colspan="5">
			<input type="button"  value="确定" class="btnChannel" name="btnSave" onclick="sure();">
		</td>
	</tr>
	</tbody>
	</table>
	
	<script type="text/javascript">
	$(function(){
		//为左边例表绑定双击事件,用于双击添加到右侧例表
		$("#tableList").bind("dblclick",function(){
			var obj = $(this).find(":selected");
			if($("#chooseTableList option[value="+obj.text()+"]").length==0){
				$("#chooseTableList").append(obj.clone());
			}			
		});
		
		//为右边例表绑定双击事件,用于双击删除该选中项
		$("#chooseTableList").bind("dblclick",function(){
			var obj = $(this).find(":selected");
			obj.remove();			
		});
		
		//为添加按钮绑定单击事件,用于把左侧项选中添加到右侧
		$("#buttonAdd").bind("click",function(){
			var obj = $("#tableList option:selected");
			if($("#chooseTableList option[value="+obj.text()+"]").length==0){
				$("#chooseTableList").append(obj.clone());
			}
		});
		
		//为删除按钮绑定单击事件,用于删除右侧选中项
		$("#buttonDel").bind("click",function(){
			var obj = $("#chooseTableList option:selected");
			obj.remove()
		});
		
		//搜索框
		var list = new Array();
		$("#tableList option").each(function(index){
			list[index] = $(this).text();
		});
		
		$("#tags").autocomplete(list, {
			width: 200,
			max: 10,
			highlight: false,
			scroll: true,
			scrollHeight: 300
		});
		function log(event, data, formatted) {
			var obj = $("#tableList option[value="+formatted+"]");
			if($("#chooseTableList option[value="+obj.text()+"]").length==0){
				$("#chooseTableList").append(obj.clone());
			}
		}
		$(":text, textarea").result(log).next().click(function() {
			$(this).prev().search();
		});
		
		//已选中chooseTableList
		var selectTable = "${selectTable}";
		
		if(selectTable.length>0){
			$("#tableList option").each(function(index){	
				if(selectTable.indexOf($.trim($(this).text()))>-1){					
					if($("#chooseTableList option[value="+$(this).text()+"]").length==0){
						$("#chooseTableList").append($(this).clone());
					}
				}
			});
		}		
		
	});
	function sure(){
		var text="";
		$("#chooseTableList option").each(function(index){
			text+=$(this).text()+",";
		});
		text = text.substring(0,text.lastIndexOf(","));
		if(top.domId==undefined){
			var tab = top.$("#tabs").tabs("getSelected");
			var obj = tab.find("iframe").contents().find("#sp_table");
			obj.val(text);
			selectField();
			top.lwin.close(true);
		}else{
		var obj = top.$("#"+top.parentDomId).contents().find("#sp_table");
		obj.text(text);
		top.$("#i_"+top.domId).parent().parent().find(".panel-tool-close").click();
		}
	}
	
	/**
	*用于代码生成器
	*选择表字段
	*/
	function selectField(){
			var tab = top.$("#tabs").tabs("getSelected");
			var jndiNameObj = tab.find("iframe").contents().find("#jndiName");
			var spTableObj = tab.find("iframe").contents().find("#sp_table");
		 	var jndiName= jndiNameObj.val();
		 	var tableName= spTableObj.val();
		 	
			$.ajax({
					url:"CommonAction.action?tblname=getFieldAction",
					dataType:'text',
					data:{
						jndiName:jndiName,
						sp_table:tableName
					},
					success:function(responseText){
						var keywordObj = tab.find("iframe").contents().find("#keyword");
						keywordObj.html(responseText);
					},
					error:function(responseText){
						top.lwin.errorService();
					}
				});
	}
	</script>
</body>
</html>
