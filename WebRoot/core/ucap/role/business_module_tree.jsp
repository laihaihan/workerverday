<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%		
	request.setAttribute("path",request.getContextPath());
	request.setAttribute("belongToApp",request.getParameter("belongToApp"));
	request.setAttribute("roleunid",request.getParameter("roleunid"));
	
%>
<HTML>
 <HEAD>
  <TITLE>模块树</TITLE>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <link rel="stylesheet" href="${path}/core/js/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
  <script type="text/javascript" src="${path}/core/js/jquery.js"></script>
  <script type="text/javascript" src="${path}/core/js/ztree/jquery.ztree.min.js"></script>
  <script type="text/javascript" src="${path}/core/js/lw-ui/globalvar.js"></script>
		<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
 </HEAD>
<BODY>
<TABLE border=0 class="tb1" border="1">
<div id="form_toolbar" style="position:fixed; left:0px; top:0px; overflow: visible;">
			<button class="form_btn" id="btnClose" onClick="javascript:subform();">
				<img alt="保存" src="${path}/core/themes/default/images/admin/default_btn.gif" /> 保存
			</button>
			<button class="form_btn" id="btnClose"  onClick="top.lwin.close(true);">
				<img alt="关闭" src="${path}/core/themes/default/images/admin/default_btn.gif" /> 关闭
			</button>
		</div>
	<TR>
		<TD  width="250" height="400" align=center valign=top bgcolor="#FFFFFF">
		<div class="zTreeDemoBackground" style="height:400px width:250px;OVERFLOW-y:auto;">
			<ul id="tree" class="ztree"></ul>
		</div>		
		</TD>
		<td width="50" align="right" valign="top"> 
	       
    	</td>
        </tr>
      </table>
    </td>
	</TR>
	<form action="${path}/module.action" id="jspForm">
		<input type="hidden" name="act" value="savebusinessmodule">
		<input type="hidden" name="selectedNodesNames" id="selectedNodesNames">
		<input type="hidden" name="selectedNodesUnids" id="selectedNodesUnids">
		<input type="hidden" name="roleunid" value="${roleunid}" >
		<input type="hidden" name="appunid" value="<%=GlobalParameter.APP_WAS%>" >
	</form>
</TABLE>
</BODY>
</HTML>

<SCRIPT LANGUAGE="JavaScript">

	/** 模块树形 */
	var zTreeObj;
	$(function(){	
		var setting = {
			check: {
				enable: true
			},
			async: {
				enable: true,
				url:"${path}/module.action?act=getModuleTreeByRoleUnid&belongToApp=${belongToApp}&roleunid=${roleunid}",
				autoParam:["leafId"],
				dataFilter: filter
			},callback:{			    	
				onAsyncSuccess:function(){
				
			    	//$().click();
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
	
	function subform(){
		var nodes = zTreeObj.getCheckedNodes(true);
	 	var selectedNodesName ="";
	 	var selectedNodesUnid ="";
		for(var i =  0 ; i < nodes.length ; i ++){

			selectedNodesName = selectedNodesName + "," + nodes[i].name;
			selectedNodesUnid = selectedNodesUnid  + "," +  nodes[i].unid;
		}
		$("#selectedNodesNames").val(selectedNodesName);
		$("#selectedNodesUnids").val(selectedNodesUnid);
		$("#jspForm").ajaxSubmit({
			dataType:'json',
			error:function(){
				top.lwin.errorService();
			},
			success:function(data){
				if(data.result){
					top.$.messager.alert("信息提示","操作成功","info");
					//top.lwin.close(true);
				}else{
					top.lwin.alert('信息提示','保存失败','error');
				}
			}
		});
	}
  </SCRIPT>
