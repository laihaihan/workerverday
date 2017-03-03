<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.ucap.flow.*"%>
<%@page import="com.linewell.ucap.platform.cache.user.UserOpinion" %>
<%@page import="java.util.List" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@include file="/sys/jsp/session.jsp"%>
<%@include file="/core/params.jsp" %>
<!--
	功能：办结操作对话框
	@author:chuanghui@linewell.com
	@date:2012-12-12
-->
<%
	FlowParams flowParams = new FlowParams(request);
	FlowManager flowManager = new FlowManager(flowParams);
	
    String type = request.getParameter("type");
    String docUnid = request.getParameter("docUnid");//文档id
    String flowUnid = flowManager.getFlowByDocUnid(docUnid).getId(); //流程UNID
    String observerName = request.getParameter("observerName");//观察者名称
    String instanceUnid = flowManager.getInstanceUnid(docUnid); //流程实例UNID
    
    List<UserOpinion> opinionList = user.getUserOpinions();
	request.setAttribute("opinionList",opinionList);
	request.setAttribute("curNode",flowManager.getCurNode(docUnid));
%>
<html>
<head>
    <META http-equiv=Content-Type content="text/html; charset=utf-8">
    <META http-equiv=pragma content=no-cache>
    <title>审批</title>
	${import_jquery}
	${import_easyui}
	${import_theme}
    <script language="javascript">
        // 设置意见内容   
        function setOpinion() {
            var userOpn = jQuery("#userOpn").val();
        	if(userOpn != "" && userOpn != null && userOpn != "null"){
            	jQuery("#opinion").val(userOpn);
            }
        }
	        
        // 增加个人常用意见
        function addUserOpinion() {
            top.lwin.showModalDialog('core/user/user_option.jsp','常用意见',550,350);	            
        }
        
        //表单提交
		function doSubmit(){
            if (jQuery("#result").val() == "N" && jQuery("#opinion").val() == ""){
				top.popup.alert("操作提示","审核不通过，请填写意见！","warning");
                document.all.opinion.focus();
                return;
            }
            
	        var obj = jQuery(window.event.srcElement);
	        obj.attr("disabled",true);
			jQuery('#jspForm').ajaxSubmit({
				dataType:'json',
				error:function(){
					obj.attr("disabled",false);
					top.popup.errorService();
				},
				success:function(text){
					top.popup.alert("信息提示","操作成功","info",1500);
					top.popup.close('pWin');	
				}
			});
        }        
    </script>
</head>

<body>
	<form action="${path}/flow.action" method="POST" name="jspForm" id="jspForm">
	<input type="hidden" name=interName id="interName" value="terminate">
	<input type="hidden" name=flowUnid id="flowUnid" value="<%=flowUnid %>">
	<input type="hidden" name=docUnid value="<%=docUnid%>"/>
	<input type="hidden" name=instanceUnid value="<%=instanceUnid%>" />
	<input type="hidden" name=observerName value="<%=observerName%>"/>
	<input type="hidden" name=curNodeUnid value="${curNode.id}" />
	<input type="hidden" name=curNodeName value="${curNode.name}" />
	<input type="hidden" name=type value="<%=type%>"/>
	<table width="100%" border="0" cellpadding="0" class="form_table_ext">
	    <tr valign="top">
	        <td width="80"  bgcolor="#FFFFFF" align="center" valign="middle" >操作说明</td>
	        <td valign="top" bgcolor="#FFFFFF" style="padding:5px">
				当前操作步骤:<b><font color="red">审批办结</font></b><br>
				当前环节名称:<b><font color="red">${curNode.name}</font></b><br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="${path}/core/js/easyui/themes/icons/icon_doc_done.gif"/>办理意见:表明处于该环节人员的对审批事项的办理意见<br>
	        </td>
	    </tr>
	     <tr valign="top">
	        <td width="80"  bgcolor="#FFFFFF" align="center" valign="middle" >审批结果<font color="red">*</font></td>
	        <td valign="top" bgcolor="#FFFFFF">
	        	<input type="radio" name="result" value="Y" checked>通过&nbsp;&nbsp;
	        	<input type="radio" name="result" value="N">不通过
	        </td>
	    </tr>
	    <tr valign="top">
	        <td width="80"  bgcolor="#FFFFFF" align="center" valign="middle" >审批意见</td>
	        <td  valign="top" bgcolor="#FFFFFF">
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th width="60" align="center">常用意见</th>
						<td bgcolor="#FFFFFF">
							<select name="userOpn" id="userOpn" style="width:100%">
								<s:iterator value="#request.opinionList" id="opinion">
									<option value="${opinion.content}">${opinion.content}</option>
								</s:iterator>
							</select>
						</td>
						<td width="60" align="center">
							<a href="javascript:setOpinion()">
								<img src="${path}/core/themes/default/images/admin/arrow_desc.gif" alt="添加到办理意见"/>
							</a>&nbsp;
							<a href="javascript:addUserOpinion()">
								<img src="${path}/core/js/easyui/themes/icons/cog.png" alt="设置个人常用意见"/>
							</a>
						</td>
					</tr>
					<tr>
						<td align="center" colspan="3">
							<textarea name="opinion" id="opinion" style="width:100%" rows="5"></textarea>
						</td>
					</tr>
				</table>
	        </td>
	    </tr>
		<input type="hidden" name="opnFlag" id="opnFlag" value="N" >
	   
	</table>
	<center style="margin-top:10px">
		<input type="button" class="btn_big" value="提  交" onClick="doSubmit();" />
		<input type="button" class="btn_big" value="关  闭" onClick="top.popup.close()"/>
	</center>
	</form>
</body>
</html>