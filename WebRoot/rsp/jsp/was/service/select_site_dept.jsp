<%@ page language="java" pageEncoding="UTF-8"%>
<%
request.setAttribute("viewId",request.getParameter("viewId"));
request.setAttribute("frameid",request.getParameter("frameid"));
request.setAttribute("path", request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
</head>
<body>
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSubmit"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 确认
		</button>
		<button class="form_btn" id="btnClose"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 
		</button>
	</div>
	<div style="height:425px">
		<iframe id="iframe" src="view.action?fn=grid&viewId=${viewId}" width="100%" height="100%"></iframe>
	</div>
</div>
<script type="text/javascript">
	$(function(){
			$("#btnSubmit").bind("click",doSubmit);
			$("#btnClose").bind("click",doClose);
		});
		
		
		//保存表单信息
		function doSubmit(){
			var rows = document.getElementById("iframe").contentWindow.getSelections();
			var ids='';
			var names='';
			if(rows.length==1){
				var win = top.document.getElementById("${frameid}")?top.document.getElementById("${frameid}"):window;
				var parentModuleNameObj = win.contentWindow.$("#deptname")
				var parentModuleIDObj = win.contentWindow.$("#deptunid");
				var parentSiteId = win.contentWindow.$("#siteid");
				parentModuleNameObj.val(rows[0]["DEPT_NAME"]);
				parentModuleIDObj.val(rows[0]["DEPT_UNID"]);
				$.ajax({
					type: "POST",
				   	url: "${path}/rsp/rspSiteDeptAction.action",
				   	data: "fn=getSiteidByDeptid&deptid="+rows[0]["DEPT_UNID"],
				   	dataType: "json",
				   	async: false,
				   	success: function(obj){
				   		parentSiteId.val(obj.siteid)
				   	}
				});
				top.lwin.close();
			}else{
				alert('请选择一行');
			}
			
		}
		
		//关闭窗口
		function doClose(){
			top.lwin.close(true);
		}
</script> 
</body>
</html>