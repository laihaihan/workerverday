<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.ucap.module.UiModule"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%
UiModule uiModule = new UiModule();
Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
%>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="${corejs}/JQuery zTree v3.5.14/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<!-- <script type="text/javascript" src="${corejs}/JQuery zTree v3.5.14/js/jquery-1.4.4.min.js"></script> -->
	<script type="text/javascript" src="${corejs}/JQuery zTree v3.5.14/js/jquery.ztree.core-3.5.js"></script>
	<div data-options="region:'west',split:true,title:'系统菜单'" style="width:250px;padding:10px;">
		<div>
			<ul id="systree" class="ztree"></ul>
		</div>
	</div>

<SCRIPT type="text/javascript">
		<!--
		var setting = {
			view:{
				fontCss : {}
			},
			callback: {
				onClick: onClick
			}
		};
		function onClick(e,treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("systree");
			if(null != treeNode.urlcontent){
				//$("#center_iframe").attr("src", treeNode.urlcontent); 
				top.tabs.openTab(treeNode.id, treeNode.name,'',treeNode.urlcontent,'');
			}
		}
		
		var zNodes = <%=uiModule.getSysFrame(ucapsession,request.getContextPath())%>

		$(document).ready(function(){
			$.fn.zTree.init($("#systree"), setting, zNodes);
		});
		//-->
	</SCRIPT>