<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="../../core/params.jsp" %>
<%
	request.setAttribute("path", request.getContextPath());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   
    
    <title>系统首页设置</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link rel="stylesheet" type="text/css" href="${corejs}/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/autocomplete/jquery.autocomplete.css" >
	
	<script type="text/javascript" src="${corejs}/jquery.js"></script>
	<script type="text/javascript" src="${corejs}/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${corejs}/easyui/locale/easyui-lang-zh_CN.js"></script>		
	
	<link rel="stylesheet" href="${corejs}/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="${corejs}/ztree/jquery.ztree.min.js"></script>
	
	<script type="text/javascript" src="${corejs}/jquery.highlight.js"></script>
	<script type="text/javascript" src="${corejs}/autocomplete/jquery.autocomplete.min.js"></script>
	<script type="text/javascript" src="${corejs}/datepicker/WdatePicker.js"></script>

  </head>
  
  <body class="easyui-layout">
    <div region="west" split="true" style="width: 150px; padding: 3px;">
		<ul id="tree" class="ztree"></ul>
	</div>
	<div region="center" style="padding:1px">		
		<iframe id="iframe" marginheight="0" marginwidth="0" height="100%" width="100%" frameborder="0" src="portlets_edit_iframe.jsp"></iframe> 	
	</div>
	
	<script type="text/javascript">
	
		var zTreeObj;//树对象
		var setting;//树设置
		$(function(){			
			
			//显示模块树
			var setting = {
				async:{
					enable: true,
					url:"tree.action?fn=tree&class=com.linewell.core.tree.impl.RoleTree",
					autoParam:["id"]
				},
				callback:{
					onClick: zTreeOnClick
			    }			    
			};	
			/*
			setting = {
				showLine: true,
			    expandSpeed : "",
			    async : true,
			   	asyncUrl: top.globalSession.commonAction+"?tblname=treeAction&class=com.linewell.tree.impl.RoleTree",
			   	asyncParam : ["id"],
			    callback:{
			    	click: zTreeOnClick,
			    	asyncSuccess:function(){
			    		$(".switch_roots_close,.switch_root_close").click();
			    		$(".tree-node a").bind({
			    			'mouseover':function(){
			    				if(!$(this).hasClass('curSelectedNode')){
			    					$(this).data('click',false);
			    					$(this).addClass('curSelectedNode');
			    				}					    			
				    			$(this).find('span').css('font-size','16px');
			    			},
			    			'mouseout':function(){
			    				if(!$(this).data('click')){
			    					$(this).removeClass('curSelectedNode');
			    				}					    				
		    					$(this).find('span').css('font-size','12px');
			    			},
			    			'click':function(){
			    				$(this).data('click',true);		    				
			    			}
			    		});
			    	}
			    }
			};
			*/
			$.fn.zTree.init($("#tree"), setting);
			zTreeObj = $.fn.zTree.getZTreeObj("tree");
			//var obj = jQuery.parseJSON('{"name":"系统管理","id":"0"}');
			//zTreeObj.selectNode(obj);
			
			//点击刷新右侧例表
			function zTreeOnClick(event, treeId, treeNode) {
				if(!treeNode.isParent){
					$('#iframe').attr('src','portlets_edit_iframe.jsp?roleId='+treeNode.id+"&_rand="+Math.random());
				}				
			}
			
		});
	
	</script>
  </body>
</html>
