<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String type = request.getParameter("type");//人员范围类型
	System.out.println(type);
	String displayId = request.getParameter("displayId");
	String hiddenId = request.getParameter("hiddenId");
	String separate = request.getParameter("separate");
	String isShowAll = request.getParameter("isShowAll");
	String fn = request.getParameter("fn");
	
	if(StringUtils.isEmpty(separate)){
		separate = ",";
	}
	request.setAttribute("type",type);
	request.setAttribute("path",request.getContextPath());
%>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="${path}/uistyle/style_3/css/ucap.css">
  <link rel="stylesheet" href="${path}/core/js/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
  <script type="text/javascript" src="${path}/core/js/jquery.js"></script>
  <script type="text/javascript" src="${path}/core/js/ztree/jquery.ztree.min.js"></script>
  <script type="text/javascript" src="${path}/core/js/lw-ui/globalvar.js"></script>
<style>
		
		#form_toolbar {
			WIDTH: 100%;
			HEIGHT: 35px;
			position: relative;
			/*top: expression(document.getElementById("form_content").scrollTop );*/
			TEXT-ALIGN: right;
			PADDING-BOTTOM: 0px;
			PADDING-LEFT: 0px;
			PADDING-RIGHT: 0px;
			PADDING-TOP: 5px;
			BACKGROUND: url(${path}/core/themes/default/images/admin/toollist_bg.gif) repeat-x center top;
			z-index: 99;
		}
		.form_btn {
			BORDER-BOTTOM: medium none;
			BORDER-LEFT: medium none;
			MARGIN: 0px;
			BACKGROUND: none transparent scroll repeat 0% 0%;
			HEIGHT: 25px;
			COLOR: #333;
			BORDER-TOP: medium none;
			CURSOR: pointer;
			BORDER-RIGHT: medium none
		}
		.choose_type{
			border-right: #afb7cc 1px solid;
			border-bottom: #afb7cc 1px solid;
			border-left: #afb7cc 1px solid;
			border-collapse: collapse;
			border-top: #afb7cc 1px solid;
		}
		</style>
</head>
<body>
	<div id="form_content" style="width:99.5%; height:100%;">
		<div id="form_toolbar">
			<button class="btnn1" onclick="choosePersonnel.submit()"> 
					<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 确定 </button>
			<button class="btnn1" onclick="top.popup.close()"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div>
		<div style="height:25px;" >
			<div class='choose_type' style="float: left;width:20%; text-align:right;height:25px;border-bottom:none;"; >选择类型:</div>
			<div class='choose_type' style="float: left;width:80%; text-align:left;height:25px;border-bottom:none;border-left:none;";>
				<label style='display:${type eq '0'?'':'none'}'><input type="radio" name="type" value="0" ${type eq '0'?'checked="checked"':''}>人员</label>
				<label style='display:${type eq '1'?'':'none'}'><input type="radio" name="type" value="1" ${type eq '1'?'checked="checked"':''}>部门</label>
				<label style='display:${type eq '2'?'':'none'}'><input type="radio" name="type" value="2" ${type eq '2'?'checked="checked"':''}>职位</label>
				<label style='display:${type eq '3'?'':'none'}'><input type="radio" name="type" value="3" ${type eq '3'?'checked="checked"':''}>角色</label>
				<label style='display:${type eq '4'?'':'none'}'><input type="radio" name="type" value="3" ${type eq '4'?'checked="checked"':''}>环节</label>
			</div>
		</div>
		<div style="width:99.5%; height:90%; " >
			<div class='choose_type' style="float: left;width:40%;height:90%;valign:'top';padding-bottom:4px;">
				<div  style="width:100%; height:100%; overflow:auto;" >
					<ul id="tree" class="ztree"></ul>
				</div>
			</div>
			<div class='choose_type' style="float: left;width:20%;height:90%;">
				<div style="height:100%;vertical-align:middle;text-align:center;padding-top:100px;">
					<ul>
	        	        <li>
	        	          <input type="button" onclick="choosePersonnel.addSelect();" value="添加" id="button" class="btnChannel" name="btnadd">
	        	        </li>
				        <li>&nbsp;</li>
	                    <li>
	        	          <input type="button" onclick="choosePersonnel.delSelect();" value="删除" id="button1" class="btnChannel" name="btndel">
	        	        </li>
	        	        <li>&nbsp;</li>
	                    <li>
	        	          <input type="button" onclick="choosePersonnel.addAll();" value="全添" id="button2" class="btnChannel" name="btnAddAll">
	        	        </li>
	        	        <li>&nbsp;</li>
	                    <li>
	        	          <input type="button" onclick="choosePersonnel.delAll();" value="全删" id="button3" class="btnChannel" name="btnDelAll">
	        	        </li>
	                </ul>
                </div>
			</div>
			<div class='choose_type' style="float: left;width:40%;valign:top; height:90%;">
				<select id="resultList" style="width:100%; height:100%; overflow:auto;border-left:none;" size="15" name="resultList"></select>
			</div>
		</div>
		<div></div>
	</div>
	
	<script type="text/javascript">
	
	var choosePersonnel = {
		init:function(){
			var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-2]);
			var domId = domIdJson.domId;
			var displayVal = top.$("#i_"+domId).contents().find("#<%=displayId%>").val().split('<%=separate%>');
			var hiddenVal = top.$("#i_"+domId).contents().find("#<%=hiddenId%>").val().split('<%=separate%>');
			if(displayVal[0].length>0){
				for(var i=0;i<displayVal.length;i++){
					choosePersonnel.addTo(displayVal[i],hiddenVal[i]);
				}
			}			
		},
		addTo:function(name,val){
			//alert(name);
			if($('#resultList option[value='+val+']').length==0){
				var html = "<option value='"+val+"'>"+name+"</option>";
				$('#resultList').append(html);
			}
		},
		dbAddTo:function(treeNode){
			choosePersonnel.addTo(treeNode.name,treeNode.id);			
		},
		addSelect:function(){
			var nodes = zTreeObj.getCheckedNodes();
			if(nodes!=null){
				for(var i=0;i<nodes.length;i++){
					var node = nodes[i];
					if(!node.isParent){
						choosePersonnel.addTo(node.name,node.id);
					}
				}
			}			
		},
		delSelect:function(){
			$("#resultList :selected").remove();
		},
		addAll:function(){
			$('.checkbox_false_full').eq(0).click();		
			var nodes = zTreeObj.getCheckedNodes();
			if(nodes!=null){
				for(var i=0;i<nodes.length;i++){
					var node = nodes[i];
					if(!node.isParent){
						choosePersonnel.addTo(node.name,node.id);
					}
				}
			}
		},
		delAll:function(){
			$('.checkbox_true_full').eq(0).click();
			$("#resultList option").remove();
		},
		submit:function(){
			var hiddenVal = "";
			var displayVal = "";
			var options = $("#resultList option");
			for(var i=0;i<options.length;i++){
				hiddenVal+=$(options[i]).val();
				displayVal+=$(options[i]).text();
				if(i<options.length-1){
					hiddenVal+="<%=separate%>";
					displayVal+="<%=separate%>";
				}
			}
			var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-2]);
			var domId = domIdJson.domId;
			top.$("#i_"+domId).contents().find("#<%=displayId%>").val(displayVal);
			top.$("#i_"+domId).contents().find("#<%=hiddenId%>").val(hiddenVal);
			top.popup.close()
		}
	}
	
	var zTreeObj;
	$(function(){
		var setting = {
			check: {
				enable: true
			},
		
			showLine: true,
		    expandSpeed : "",
		    checkable :true,
			async: {
				enable: true,
				url:"${path}/resource.action?fn=<%=fn%>&isShowAll=<%=isShowAll%>",
				autoParam:["id"],
				dataFilter: filter
			},
			callback:{
		    	beforeClick:zTreeBeforeClick,
		    	onAsyncSuccess:function(){
			    	$(".checkbox_true_full,.checkbox_true_part").prev(".root_close,.roots_close,.center_close,.bottom_close").click();
			   	}
		    }
		};
		function filter(treeId, parentNode, childNodes) {
			if (!childNodes) return null;
			for (var i=0, l=childNodes.length; i<l; i++) {
				childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			}
			return childNodes;
		}
		zTreeObj = $.fn.zTree.init($("#tree"), setting);
			
	
	});				
		//树形双击添加至例表框
		function zTreeBeforeClick(treeId, treeNode) {
			//alert(treeNode.isParent);
			//if(!treeNode.isParent){
				//alert(1);
				$('#'+treeNode.tId).one('dblclick',function(){
					choosePersonnel.dbAddTo(treeNode);
				});
			//}			
		}
		
		//为右边例表绑定双击事件,用于双击删除该选中项
		$("#resultList").bind("dblclick",function(){
			var obj = $(this).find(":selected");
			obj.remove();
		});
		
		choosePersonnel.init();

	</script>
</body>
</html>