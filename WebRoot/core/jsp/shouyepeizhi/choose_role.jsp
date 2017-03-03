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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

	<head>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<%@include file="/core/params.jsp"%>
		${import_jquery} ${import_easyui} ${import_theme} ${import_autocomplete}
	</head>

	<body>
		<table cellspacing="0" cellpadding="0" align="center" class="tableSet">
			<tbody>
				<tr>
					<td colspan="3" style="border-right: 0px;">
						搜索:
						<input type="text" id='tags' />
					</td>
				</tr>
				<tr>
					<td width="13%">
						<select style="width: 200px;" size="20" name="tableList" id="tableList">
							<s:iterator value="#request.roleList">
								<s:if test="ROLENAME!='ROLENAME'">
									<option value="${ROLENAME}" id="${ROLEUNID}">
										${ROLENAME}
									</option>
								</s:if>
							</s:iterator>
						</select>
					</td>
					<td width="6%" align="center">
						<ul>
							<li>
								<input type="button" value="添加" id="buttonAdd" class="btnChannel" name="btnadd">
							</li>
							<li>
								&nbsp;
							</li>
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
					<td align="center" colspan="3">
						<input type="button" value="确定" class="btnChannel" name="btnSave" onclick="sure();">
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
		var selectTable = "${selectRolesname}";
		
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
	//确认
	function sure(){
		var text="";
		var ids = "";
		$("#chooseTableList option").each(function(index){
			text+=$(this).text()+",";
			ids += $(this).attr("id") +",";
		});
		text = text.substring(0,text.lastIndexOf(","));
		ids = ids.substring(0,ids.lastIndexOf(","));
		
		var parentObj = top.lwin.parent();//父窗口对象
		parentObj.find("#belong_to_rolesname").val(text);
		parentObj.find("#belong_to_roles").val(ids);
		top.lwin.close();

	}
	</script>
	</body>
</html>
