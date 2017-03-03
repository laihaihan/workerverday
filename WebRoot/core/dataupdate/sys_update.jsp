<%--
/**
 * 系统框架
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="/core/params.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>更新管理</title>
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-easyui-1.3.3/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-easyui-1.3.3/themes/icon.css">
	<link rel="stylesheet" href="${corejs}/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
	
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${corejs}/ztree/jquery.ztree.min.js"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'west',split:true" style="width:180px;padding:10px;">
		<ul id="tree" class="ztree">
		</ul>			
	</div>
	<div data-options="region:'center',title:''">
	
	<div style="padding:5px;background-color:#EFEFEF" >
		<a href="javascript:onExpData('1');" class="easyui-menubutton" data-options="menu:'#mm2',iconCls:'icon-redo'">导出</a>
		<a href="javascript:onImpData();" class="easyui-menubutton" data-options="plain:true,iconCls:'icon-undo'">导入</a>
	</div>
	
	<div id="mm2" style="width:100px;">
		<div onclick="javascript:onExpData('1');">选中数据</div>
		<div onclick="javascript:onExpData('2');">当前系统所有数据</div>
	</div>
	<table id="gridlist" class="easyui-datagrid"  style="width:950px;height:400px;display:none;"
			data-options="rownumbers:true,singleSelect:false,url:'view.action?fn=view&impclass=com.linewell.core.view.impl.SysFrameViewGrid&id=0'">
		<thead>
			<tr>
				<th data-options="field:'ck',checkbox:true"></th>
				<th data-options="field:'UNID',width:800,hidden:true">主键</th>
				<th data-options="field:'MODULENAME',width:800">名称</th>
			</tr>
		</thead>
	</table>
	</div>
</body>
</html>

<script type="text/javascript">
	function  onExpData(type){
		var rows = $('#gridlist').datagrid('getSelections');
		var columestr = "UNID";
		var ids = "";
		for(var i=0;i<rows.length;i++){
			ids = ids +  rows[i][columestr];
			if(i<rows.length-1){
				ids+=",";
			}
		}
		window.open(top.appPath+'core/dataupdate/data_exp.jsp?ids='+ids+"&type="+type+"&_rand="+Math.random());
	}	


	//导入数据
	function onImpData(){
		top.lwin.open('core/dataupdate/data_imp.jsp','导入数据',480,300);
	}


	$(function(){
		var setting = {
			async:{
				enable: true,
				url:"tree.action?fn=tree&class=com.linewell.core.system.frame.tree.SystemFrameTree",
				autoParam:[
					"id",
					"parentunid"
				]
			},
			callback:{
		    	onClick: zTreeOnClick,
		    	onAsyncSuccess:function(){
		    		$(".root_close,.roots_close").click();
		    	}
		    }			    
		};			
		$.fn.zTree.init($("#tree"), setting);
		zTreeObj = $.fn.zTree.getZTreeObj("tree");
		
		//点击刷新右侧例表
		function zTreeOnClick(event, treeId, treeNode) {
			$('#gridlist').datagrid('clearSelections');
 
			$('#gridlist').datagrid({
				url:"view.action?fn=view&impclass=com.linewell.core.view.impl.SysFrameViewGrid&id="+treeNode.id
			});
		}
		
		
	});
</script>