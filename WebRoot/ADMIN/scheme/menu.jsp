<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@include file="../include/session.jsp"%>
<%
/**
 * 菜单列表页
 * @author  fshaoming@linewell.com
 * @since  2011-12-01
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
//如果为空，则为非法访问，直接退出不做处理
if (StringUtils.isEmpty(appUnid))
    return; 
%>
<!DOCTYPE html>
<html>
	<head>
		<title>菜单列表--新建应用系统</title>
		<link href="../style/build.css" rel="stylesheet" type="text/css" />
		<%@include file="../include/platformresources.jsp"%>

		<script type="text/javascript">
Ext.onReady(function(){
	//初始化菜单 
	//createMenuTree();
	try{
		ucapMenuConfig.belongToAppId="<%=appUnid%>";
		ucapMenuConfig.openMenuConfig(false,true);
	}catch(e){}
});

/**
*构造树形菜单
*
*/
function createMenuTree(){
		var menuActionParams={type:"menu",act:"getAllMenu",menuType:"tree",edit:"1",belongToAppId:"<%=appUnid%>"};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:menuActionParams,
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					var treeJson=[];
					if (typeof json.uiMenu == "undefined"){
						treeJson =[];
					} else{
						treeJson = json.uiMenu;
					}
					var rootUnid="1";
					var displayName="应用系统菜单";
					createTree(rootUnid,displayName,treeJson)
				}
			}
		}
		Ext.Ajax.request(requestConfig);
}

/**
*创建菜单树形
*@param rootUnid  节点根的unid
*@param displayName  节点根的名称
*@param treeJson  叶子节点
*/
function createTree(rootUnid,displayName,treeJson){
		var root;
	 	if (typeof(treeJson)!="undefined" ){
		 	root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:rootUnid,
				text:displayName,
				children: treeJson 
			});	
	 	} else {
	 		root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:rootUnid,
				leaf:true,
				text:displayName
			});	
	 	}
		var tree=new Ext.tree.TreePanel({
			renderTo:"leftTree",
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			 containerScroll: true,
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		});	
}

</script>
	</head>
	<body>

		<!-- 工具栏 begin-->
		<div class="subMenuToolbar">

			<div class="subMenuToolbarBtn"
				onclick="javascript:onItemClick('menuNew');">
				<img
					src="<%=systemPath%>ADMIN/style/images/scheme/subMenuToolBar_add.png">
				新建
			</div>
			<div class="subMenuToolbarBtn"
				onclick="javascript:onItemClick('menuDelete');">
				<img
					src="<%=systemPath%>ADMIN/style/images/scheme/subMenuToolBar_delete.png" />
				删除
			</div>
			<div class="subMenuToolbarBtn"
				onclick="javascript:ucapMenuConfig.save()">
				<img
					src="<%=systemPath%>ADMIN/style/images/scheme/subMenuToolBar_disk.png" />
				保存
			</div>
				<div class="subMenuToolbarBtn"
				onclick="javascript:ucapMenuConfig.save('',1)">
				<img
					src="<%=systemPath%>ADMIN/style/images/scheme/subMenuToolBar_disk_1.png" />
				保存并新增下一个
			</div>
		</div>
		<!-- 工具栏 end-->

		<!-- 左区域 begin-->
		<div class="subMenuLeftBox">
			<div id="leftTree"></div>
		</div>
		<!-- 左区域 end-->

		<!-- 右区域 begin-->
		<div class="subMenuRightBox" >
			<div id="menuConfigTitle" style="display: none"></div>
			<div id="ucapCenter"></div>
		</div>
		<!-- 右区域 end-->

	</body>
</html>