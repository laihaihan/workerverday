<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.rsp.baseresouse.was.contents.*" %>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="java.util.*"%>


<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String belongto=request.getParameter("belongto");//获取右边树形菜单主键
	Contents contents = new ContentsManager().doFindBeanByKey(unid);
	if (null == contents) {
		fn = "add";
		contents = new Contents();
		contents.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("contents", contents);
	request.setAttribute("path", request.getContextPath());
			
%>

<html>
<head>
	<!-- zTree JS 开始001 -->
	<link rel="stylesheet" href="${path}/core/js/ztree/zTreeStyle/zTreeStyle.css" type="text/css"></link>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/ztree/jquery.ztree.min.js"></script>
	<!-- zTree JS 结束001 -->
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<!-- easyUI JS 开始002 -->
  	<link rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css" type="text/css"></link>
	<link rel="stylesheet" href="${path}/core/js/easyui/themes/icon.css" type="text/css"></link>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
 	<!-- easyUI JS 结束002 -->
		<SCRIPT type="text/javascript">
		<!--
		var setting = {
			view: {
				selectedMulti: false
			},	
			async: {
				enable: true,
				url:"${path}/rsp/contentsAction!treeData.action",
				autoParam:["id", "name","pid"],
				otherParam: [],
				dataFilter:filter
			},
			callback: {
				onClick: onClick
			}
		};

		function filter(treeId, parentNode, childNodes) {
			if (!childNodes) return null;
			for (var i=0, l=childNodes.length; i<l; i++) {
				childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			}
			return childNodes;
		}
		
		function onClick(e, treeId, treeNode) {
			//单击给控件赋值
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getSelectedNodes(),
			v = "";
			n="";
			nodes.sort(function compare(a,b){return a.id-b.id;});
			for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i].name + ",";//菜单名称
				n += nodes[i].id + ",";// 上一级菜单ID
			}
			if (v.length > 0 ) v = v.substring(0, v.length-1);
			var cityObj = $("#citySel");
			cityObj.attr("value", v);
			
			
			if (n.length > 0 ) n = n.substring(0, n.length-1);
			var belongto = $("#belongto_update");
			belongto.attr("value", n);
		}

		function showMenu() {
			$('#dlg').dialog('open');//打开弹窗框
			var cityObj = $("#citySel");
			var cityOffset = $("#citySel").offset();
			$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
		}
		
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting);//绑定数据
		});
		//-->
	</SCRIPT>
	<script>
		$(function(){
			$('#dlg').dialog({
				buttons:[{
					text:'确定',
					iconCls:'icon-ok',
					handler:function(){
					$('#dlg').dialog('close');
					}
				}]
			});
		});
		function open1(){
			$('#dd').dialog('open');
		}
		function close1(){
			$('#dd').dialog('close');
		}
	</script>
	
	<style type="text/css">
	</style>

</head>
<body>	

<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave" onclick="doSave()"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsp/contentsAction.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<%
			if("add".equals(fn)){//如果是添加操作就增加"所属"值
		%>
				<input type="hidden" id="belongto" name="belongto" value="<%=belongto%>">
		<%
			}
		%>
		<input type="hidden" name="unid" id="unid" value="<%=contents.getUnid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">					
			<tr>
				<th><font color="red">*</font>目录代码：</th>
				<td>
					<input type="text" name="category_code" id="category_code" style="width:90%" value="${contents.category_code}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>类目名称：</th>
				<td>
					<input type="text" name="category_name" id="category_name" style="width:90%" value="${contents.category_name}"/>
				</td>
			</tr>
						<tr>
				<th>描述和说明：</th>
				<td>
					<input type="text" name="description" id="description" style="width:90%" value="${contents.description}"/>
				</td>
			</tr>
			<tr>
					<th>上一级目录：</th>
					<%
					//查询右边选中的菜单
					List contList=new ArrayList();
					String sql=null;
					if("add".equals(fn)){
						   sql=" select unid,category_name from rsp_contents  where  unid='"+belongto+"'";
					}
					else{
						sql="select unid,category_name from rsp_contents where unid=( ";
						sql+=" select belongto from rsp_contents  where  unid='"+unid+"')";
						    
					}
					
					String[][] contListtData = JDBCTool.doSQLQuery(GlobalParameter.APP_RSP,sql);
					for(String[] data : contListtData){
						contList.add(data);
					}
					String[] contenName=null;
					if(contList.size()>0){
					 contenName = (String[])contList.get(1);
					}
				   
					 %>
					<td><input id="citySel" type="text" name="belongtoName" readonly value="<%=contenName[1]%>" style="width:80%"/>
					<a id="menuBtn" href="#" onclick="showMenu(); return false;">选择</a>
					 <input type="hidden" id="belongto_update" name="belongto_update" value="${contents.belongto}">
					</td>
					
			 </tr>
			<tr>
				<th>排序：</th>
				<td>
					<input type="text" name="sort" id="sort" style="width:90%" value="${contents.sort}"/>
				</td>
			</tr>
			<tr>
				<th>别名：</th>
				<td>
					<input type="text" name="alias" id="alias" style="width:90%" value="${contents.alias}"/>
				</td>
			</tr>
			<tr>
				<th>是否启用：</th>
				<td>
					<%
					if("0".equals(contents.getIs_enabled())){
					%>
						<input name="is_enabled" type="radio" id="is_enabled" value="1" /> 是
						<input name="is_enabled" type="radio" id="is_enabled" value="0" checked/> 否
						
					<%	
					}else{
					%>
						<input name="is_enabled" type="radio" id="is_enabled" value="1" checked/> 是
						<input name="is_enabled" type="radio" id="is_enabled" value="0"  /> 否
						
					<% 
					}
					%>
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>
<!-- 树形弹窗框 -->
<div id="dlg" icon="icon-save" title="上一级目录" style="padding:5px;width:240px;height:350px;" closed="true" >
	<div id="menuContent" class="menuContent">
	<ul id="treeDemo" class="ztree" style="margin-top:0;height:auto;width:auto;"></ul>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		//$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
	});
	
	//保存表单信息
	function doSave(){
		if(validate.validate()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					top.lwin.close(true);
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	
	    },
	    messages:{
	    	
	    }
  	});	
</script> 
</body>
</html>