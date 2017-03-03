<%@ page language="java" pageEncoding="UTF-8" %>
<%@page import="com.linewell.rsp.baseresouse.was.servicematerial.WasServiceMaterialManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicematerial.WasServiceMaterial"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicetable.WasServiceTableManager"%>
<%@page import="java.util.List"%>
<%
String unid = request.getParameter("unid");
WasServiceMaterialManager manager=new WasServiceMaterialManager();
WasServiceMaterial material = manager.doFindBeanByKey(unid);

String condition = "punid=? order by createtime";
List tableList = new WasServiceTableManager().doFindListByCondition(condition,new Object[]{unid});
request.setAttribute("tableList",tableList);

request.setAttribute("material",material);
request.setAttribute("path",request.getContextPath());


%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/jquery-ui/themes/cupertino/jquery.ui.all.css"/>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.tabs.js"></script>
	<style>
		<!--
		.p_table01{background:#aed0ea;width:98%;}
		.p_table01 tr th{background:#fcfcfc;padding:4px 0px;padding:5px;text-align:right;}
		.p_table01 tr td{background:#fff;padding-left:5px;color:#666666;}
		-->
	</style>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar" style="margin-bottom: 10px">
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	
	<div id="tabs" >
		<ul>
			<li><a href="#tabs-1">基本信息</a></li>
			<li><a href="#tabs-2">附件材料</a></li>
			<li><a href="#tabs-3">历史材料</a></li>
		</ul>
		
		<div id="tabs-1" style="padding:5px;">
			<table cellpadding="0" cellspacing="1"  align="center" class="p_table01">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<tr>
					<th>材料名称：</th>
					<td colspan="3">
						<span>${material.infoname}</span>
					</td>
				<tr>
					<th>状 态：</th>
					<td><span>${material.state != "N" ? "启动" : "禁用"}</span></td>
					<th>材料编码：</th>
					<td>
						<span>${material.code}</span>
					</td>
				</tr>
				<tr>
					<th>纸质原件所需份数：</th>
					<td>
						<span>${material.pagenum}</span>
					</td>
					<th>纸质复印件所需份数：</th>
					<td>
						<span>${material.pagecopynum}</span>
					</td>
				</tr>
				<tr>
					<th>是否需要电子档：</th>
					<td>
						<span>${material.need_electronic == "2" ? "不需要" : "需要"}</span>
					</td>
					<th>重要等级：</th>
					<td>
						<span>${material.type == "1" ? "必要" : "普通"}</span>
					</td>
				</tr>
				<tr>
					<th>材料收取方式：</th>
					<td></td>
					<th>排序号：</th>
					<td>
						<span>${material.sortid}</span>
					</td>
				</tr>
				<tr>
					<th>资料说明：</th>
			        <td colspan="3">
			          	${material.memo}
			        </td>
				</tr>
			</table>
			
		</div>
		<div id="tabs-2" style="padding:5px;">
			<%@include file="../serviceTable/was_service_table_read.jsp" %>
		</div>
		<div id="tabs-3" style="padding:5px;">
			<%@include file="../serviceTable/was_service_table_log_read.jsp" %>
		</div>
		
	</div>

</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$('#tabs').tabs();
		$("#btnClose").bind("click",doClose);
	});
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
	
</script> 
</body>
</html>

