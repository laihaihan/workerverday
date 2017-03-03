<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.StrUtil"%>
<%@ page import="com.linewell.ucap.platform.cache.user.UserOpinion" %>
<%@ page import="java.util.List" %>
<%@ page import="com.linewell.core.dict.ApasDictBussiness" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/sys/jsp/session.jsp"%>

<!--
	功能：事项办结操作对话框
	@author:chuanghui@linewell.com
	@date:2012-05-16
-->
<%
    String fn = request.getParameter("fn");
    String type = request.getParameter("type");
	if(StrUtil.isNull(fn)){
		fn ="terminate";
	}
    String unid = request.getParameter("unid");//审批事项unid
    String docUnid =unid;//文档id
    String instanceUnid = request.getParameter("instanceUnid"); //流程实例UNID
    List<UserOpinion> opinionList = user.getUserOpinions();
	request.setAttribute("opinionList",opinionList);
	ApasDictBussiness apasDictBussiness = new ApasDictBussiness();
%>
<html>
<head>
    <META http-equiv=Content-Type content="text/html; charset=utf-8">
    <META http-equiv=pragma content=no-cache>
    <title>审批</title>
	<%@include file="/core/params.jsp" %>
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
			if (jQuery("#result").val() == ""){
           		top.popup.alert("操作提示","请选择审批结果！","warning");
                document.all.result.focus();
                return;
            }
            if (jQuery("#result").val() == "不通过" && jQuery("#opinion").val() == ""){
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
	<form action="${path}/flowTermit.action" method="POST" name="jspForm" id="jspForm">
	<input type="hidden" name=fn id="fn" value="<%=fn %>">
	<input type="hidden" name=docUnid value="<%=docUnid%>"/>
	<input type="hidden" name=punid value="<%=unid%>"/>
	<input type="hidden" name=observerName value="terminate"/> 
	<input type="hidden" name=type value="<%=type%>"/>
	<input type="hidden" name="instanceUnid" value="<%=instanceUnid%>"/>
	<table width="100%" border="0" cellpadding="0" class="form_table_ext">
	    <tr valign="top">
	        <td width="80"  bgcolor="#FFFFFF" align="center" valign="middle" >操作说明</td>
	        <td valign="top" bgcolor="#FFFFFF">
				当前操作步骤:<b><font color="red">审批办结</font></b><br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="${path}/core/js/easyui/themes/icons/icon_doc_done.gif"/>办理意见:表明处于该环节人员的对审批事项的办理意见<br>
	        </td>
	    </tr>
	     <tr valign="top">
	        <td width="80"  bgcolor="#FFFFFF" align="center" valign="middle" >审批结果<font color="red">*</font></td>
	        <td valign="top" bgcolor="#FFFFFF">
				<select name="result" id="result">
				<option value="">-请选择-</option>
				<option value="通过">通过</option>
				<option value="不通过">不通过</option>
				</select>
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
		<input type="hidden" name="opnFlag" id="opnFlag" value="N">
	   
	</table>
	<center style="margin-top:10px">
		<input name="button6" type="button" class="btn_big" id="button6" value="提  交" onClick="doSubmit();" />
		<input name="button7" type="button" class="btn_big" id="button7" value="关  闭" onClick="top.popup.close()"/>
	</center>
	</form>
</body>
</html>