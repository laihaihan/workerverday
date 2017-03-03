<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%		
	request.setAttribute("path",request.getContextPath());
	request.setAttribute("belongToApp",request.getParameter("belongToApp"));
	String id = request.getParameter("id");
    String name = request.getParameter("name");
	
	
	response.setHeader("Cache-Control","no-cache");
	response.setHeader("Pragma","no-cache");
	response.setDateHeader("Expires",0);
%>
<HTML>
 <HEAD>
  <TITLE>模块树</TITLE>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <link rel="stylesheet" href="${path}/core/js/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
  <script type="text/javascript" src="${path}/core/js/jquery.js"></script>
  <script type="text/javascript" src="${path}/core/js/ztree/jquery.ztree.min.js"></script>
  <script type="text/javascript" src="${path}/core/js/lw-ui/globalvar.js"></script>
 </HEAD>
<BODY>
<TABLE border=0 class="tb1" border="1">
	<TR>
		<TD  width="250" height="400" align=center valign=top bgcolor="#FFFFFF">
		<div class="zTreeDemoBackground" style="height:400px width:250px;OVERFLOW-y:auto;">
			<ul id="tree" class="ztree"></ul>
		</div>		
		</TD>
		<td width="50" align="right" valign="top"> 
	        <br>
            <input type="button" name="Button" value=" 确定 " onClick="subform();"><br>
            <br>
            <input type="button" name="Button2" value=" 取消 " onClick="window.close();">
    	</td>
        </tr>
      </table>
    </td>
	</TR>
</TABLE>
</BODY>
</HTML>

<SCRIPT LANGUAGE="JavaScript">

	/** 模块树形 */
	var zTreeObj;
	$(function(){	
		var setting = {
			check: {
				enable: true,
				chkStyle: "radio",
				radioType: "all"
			},
			async: {
				enable: true,
				url:"${path}/module.action?act=getModuleTree&belongToApp=${belongToApp}",
				autoParam:["leafId"],
				dataFilter: filter
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
		var  fatharWindow = window.dialogArguments;
		fatharWindow.document.getElementById("<%=id%>").value = nodes[0].unid;
		fatharWindow.document.getElementById("<%=name%>").value = nodes[0].name;
		window.close();
	}
  </SCRIPT>
