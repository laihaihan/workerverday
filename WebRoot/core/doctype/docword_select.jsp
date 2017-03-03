
<!-- 
	@author chh
	事项树形
	调用示例：
	
 -->
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="net.sf.json.JSONArray"%>
<%@ page import="java.util.List" %>
<%@ page import="com.linewell.core.util.StrUtil" %>
<%@page import="com.linewell.core.docword.*"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

<%
	String checkedItems =request.getParameter("checkedItems");
	//父节点unid
	String  parentId =request.getParameter("parentId");
	String  type =request.getParameter("type");
	//1表示返回 unid和name
	String  returnType =request.getParameter("returnType");
	if(StrUtil.isNull(type)){
		type ="checkbox";
	}
	if(StrUtil.isNull(returnType)){
		returnType ="1";
	}
	request.setAttribute("path",request.getContextPath());
	request.setAttribute("data",this.getData(request.getParameter("ids")));
%>

<HTML>
 <HEAD>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
  	<link type="text/css" rel="stylesheet" href="${path}/core/js/ztree/zTreeStyle/zTreeStyle.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	
  	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
  	<script type="text/javascript" src="${path}/core/js/ztree/jquery.ztree.min.js"></script>
  	<script type="text/javascript" src="${path}/core/js/lw-ui/globalvar.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
 </HEAD>
<BODY>
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 确定 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<form id="jspForm" name="jspForm" method="post" action="${path}/scene.action">
	<input type="hidden"  id="fn" name="fn" value="batchAdd">
	<input type="hidden" name="parent_id" id="parent_id" style="width:90%" value="<%=parentId %>"/>
	<div id="menu" style="display:block;">
		<ul id="tree" class="ztree" style="background-color:#fff"></ul>
	</div>
	
	</form>		
	<script type="text/javascript">
		var zTree;
		var allSelectedID="";
		var returnType ="<%=returnType%>";
		var zNodes = ${data};
		var setting = {
			check: {
				enable: true,
				chkStyle: "<%=type%>",
				radioType: "all"
			},
			callback: {
				onClick: onClick,
				onCheck: onCheck
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};
			
		$(function(){
			$("#btnClose").bind("click",doClose);
			$("#btnSave").bind("click",doConfirm);
			zTree = $.fn.zTree.init($("#tree"), setting, zNodes);
		});
		
		
		
		//关闭窗口
		function doClose(){
       		//top.jQuery("#showWin").window();
       		//window.parent.Ext.getCmp('showWin').close();
       		window.close();
		}
			
		function doConfirm(){
			window.returnValue=allSelectedID;  
			window.close();
		}
		
		function showMenu() {
			$("#menu").slideDown("fast");
		}
		
		function hideMenu() {
			$("#menu").fadeOut("fast");
		}
		
		function onClick(e, treeId, treeNode) {
			if(treeNode.checked){
				hideMenu();
			}else{
				zTree.checkNode(treeNode, true, null, true);
			}
			return false;
		}
		
		function onCheck(e, treeId, treeNode){
		//parentId+deptunid+deptname
			allSelectedID="";
			var nodes = zTree.getCheckedNodes(true);
			var ids ="";
			var names="";
			for(var i=0;i<nodes.length;i++){
				if(!nodes[i].isParent){
					 ids += (ids == "" ? "" : ",") + nodes[i].id;
					 names += (names == "" ? "" : ",") + nodes[i].name;
				}
			}
			if(1==returnType){
				allSelectedID =ids+";"+names;
			}else{
				allSelectedID =ids;
			}
		}
		
	</script>
	
</BODY>
</HTML>

<%!
	//获取树形数据
	private String getData(String ids){
		DocWordManager manager = new DocWordManager();
		List<DocWord> dwList = manager.doFindListByCondition("",new Object[0]);
		JSONArray jarray = new JSONArray();
		for(DocWord dw : dwList) {
			JSONObject js = new JSONObject();
			js.put("id",dw.getUnid());
			js.put("name",dw.getName());
			js.put("pId","0");
			if(StringUtils.contains(ids,dw.getUnid())) {
				js.put("checked","true");
			}
			jarray.add(js);
		}
		return jarray.toString();
	}
%>