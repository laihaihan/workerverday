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
	
	<title>选择按钮</title>
	${import_jquery}
	${import_easyui}
	${import_theme}	
	<script type="text/javascript" src="${corejs}/lw-ui/globalvar.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/lwin.js"></script>
	<script type="text/javascript" src="${corejs}/lw-ui/popup.js"></script>  
	<script type="text/javascript" src="${corejs}/json2.js"></script>
</head>

<body>

	<table cellspacing="0" cellpadding="0" border="1" align="center" class="tableSet" width="100%" height="100%">
	<tbody>
	<tr>
		<td style="border-right:0px; height: 100%;">
			<iframe id="iframe" src="view.action?fn=grid&viewId=501D5A1D1D31D6B2ED79E90F1DDDB7D8" width="100%" height="100%"></iframe>
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
		if(rows.length == 0){
			top.$.messager.alert("信息","请先选择列表中的信息！","info");
			return;
		} else {
			var btnArr = new Array();
			var btnFnArr = new Array();
			var sort = top.lwin.parent().find('#subbuttonList option').length;
			if(sort != 0){
				++sort;
			}
			for(var i = 0; i < rows.length; i++){
				var btn = {};
				btn.sub_unid = '';
				btn.button_unid = rows[i].BUTTON_UNID;
				btn.sub_name = rows[i].BUTTON_NAME;
				btn.sub_belongto = top.lwin.parent().find("#unid").val();
				btn.sub_sort = (sort + i);
				if(rows[i].BUTTON_FN == 'gDel'){
					btn.sub_img = 'icon-del';
				} else if(rows[i].BUTTON_FN == 'gAdd'){
					btn.sub_img = 'icon-add';
				} else {
					btn.sub_img = 'icon-application';
				}
				btn.fn_path = '';
				btnFnArr[i] = rows[i].BUTTON_FN;
				btnArr[i] = btn;
			}
			$.ajax({
				url:'${path}/subButton.action',
				type:'post',
				dataType:'json',
				data:{
					sg:JSON.stringify(btnArr),
					fn:'subButton'
				},
				success:function(response){
					if(!response.result){
						top.$.messager.alert("信息","选择按钮出错！","error");
					} else {
						top.lwin.parent().find('#subbuttonList option').removeAttr('style');
						var sel = "selected=\"selected\"";
						for(var i = 0; i < response.buttons.length; i++){
							if(i !=0){
								sel = "";
							}
							var subHtml = "<option "+sel+" value=\""+(response.buttons[i]).button_unid+"\" " +
								"title=\""+(response.buttons[i]).sub_name+"\" " + 
								"btnUnid=\""+(response.buttons[i]).button_unid+"\" " + 
								"btnName=\""+(response.buttons[i]).sub_name+"\" " + 
								"btnFn=\""+btnFnArr[i]+"\" " + 
								"subUnid=\""+(response.buttons[i]).sub_unid+"\" " + 
								"subImg=\""+(response.buttons[i]).sub_img+"\" " + 
								"subSort=\""+(response.buttons[i]).sub_sort+"\" " + 
								"fnPath=\""+(response.buttons[i]).fn_path+"\" " + 
								"subName=\""+(response.buttons[i]).sub_name+"\" style='color:red'>"+(response.buttons[i]).sub_name+"</option>";
							top.lwin.parent().find("#subbuttonList").append(subHtml);
							top.lwin.parent().find("#subbuttonList").trigger("click");
						}
						top.lwin.close();
					}
				},
				error:function(){
					top.$.messager.alert("信息","选择按钮出错！","error");
				}
			});
		}
	}	
	</SCRIPT>
</body>
</html>
