<%@page contentType="text/html;charset=UTF-8" %>
<%@page import="com.linewell.core.ucap.flow.*"%>
<%@page import="com.linewell.ucap.platform.cache.user.UserOpinion" %>
<%@page import="java.util.*" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@include file="/sys/jsp/session.jsp"%>
<%@include file="/core/params.jsp"%>
<!-- 
	页面功能：退回对话框
	@date:2012-12-12
-->
<%
	FlowParams flowParams = new FlowParams(request);
	FlowManager flowManager = new FlowManager(flowParams);
	
    String docUnid = request.getParameter("docUnid");//文档id
    String observerName = request.getParameter("observerName");//观察者名称
    String instanceUnid = flowManager.getInstanceUnid(docUnid); //流程实例UNID
	String curAuditType = flowManager.getCurNode(docUnid).getAuditType();//当前节点审批方式
	
    List<UserOpinion> opinionList = user.getUserOpinions();
	request.setAttribute("opinionList",opinionList);
	//默认是任意环节退回
	String thfs ="";
	
%>
<html>
<head>
	<base target="_self">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	<META http-equiv=pragma content=no-cache>
	<title>退回</title>
	${import_jquery}
	${import_easyui}
	${import_theme}
	<script type='text/javascript' src='${path}/js/ext/ext-base.js'></script>
	<script type='text/javascript' src='${path}/js/ext/ext-all.js'></script>
	<script type='text/javascript' src='${path}/js/ucap/flow/ucapCommonOptions.js'></script>
	<script type='text/javascript' src='${path}/js/ucap/flow/wasReturn.js'></script>
	<script type='text/javascript' src='${path}/js/ucap/flow/ucapOpinion.js'></script>
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
        
        function doSubmit(){
            if (jQuery("#opinion").val() == ""){
           		top.popup.alert("操作提示","请输入退回意见！","warning");
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
	<input type="hidden" name=interName value="sendBack">
	<input type="hidden" name=docUnid value="<%=docUnid%>"/>
	<input type="hidden" name=instanceUnid value="<%=instanceUnid%>" />
	<input type="hidden" name=observerName value="<%=observerName%>"/>
	<input type="hidden" name=thfs value="<%=thfs%>"/>					<!-- 退回方式 -->
	<table width="100%" border="0" cellpadding="0" class="form_table_ext">
		<tr valign="top">
			<th width="80" bgcolor="#FFFFFF" align="center" valign="middle">操作说明</th>
			<td valign="top" bgcolor="#FFFFFF">
				 当前操作步骤:<b><font color="red">退回</font></b><br>
				 当前环节名称:<b><font color="red"><%=flowManager.getCurNode(docUnid).getName() %></font></b><br>
				 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				 <img src="${path}/core/js/easyui/themes/icons/icon_doc_done.gif"/>
				 办理意见:表明处于该环节人员的对审批事项的办理意见<br>
			</td>
		</tr>
		<tr valign="top">
			<th width="80" bgcolor="#FFFFFF" align="center" valign="middle" >办理意见</th>
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
		<tr valign="top">
			<th width="80" bgcolor="#FFFFFF" align="center" valign="middle" >发布意见</th>
			<td  valign="top" bgcolor="#FFFFFF">
				<label>
					<input type="checkbox" name="opnFlag" id="opnFlag" value="Y" >是否向申报人公布办理意见
				</label> 
			</td>
		</tr>
		<%if(null != curAuditType &&!"2".equals(curAuditType)){%>
		<tr>
			<th align="center" bgcolor="#FFFFFF" >发送人员</th>
			<td bgcolor="#FFFFFF" align="center">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"  >
				<tr>
					<td width="40%">请选择退回的步骤：				
						<select name="SingleSelRange" id="SingleSelRange" size="5" style="width:100%;"></select>
					</td>
					<td width="5%">
					</td>
					<td width="40%">此步骤的办理人员：
						<select name="SingleSelResult" size="5" style="width:100%;"></select>
					</td>		
				</tr>
				</table> 
			</td>
		</tr>
		<%}%>
	</table>
	<center style="margin-top:10px">
		<input type="button" class="btn_big" value="提  交" onClick="doSubmit();" />
		<input type="button" class="btn_big" value="关  闭" onClick="top.popup.close()"/>
	</center>
	</form>
	<script type="text/javascript">
	 	ucapFlowSys.flowWinObj = window;
		ucapFlowFun._initValue(); 
		ucapFlowFun.flowValue.docUnid = "<%=docUnid%>";
		ucapFlowFun.flowValue.instanceUnid = "<%=instanceUnid%>";
		ucapFlowFun.flowValue.type = 1;
		ucapFlowSys.sUcapSystemPath = "${path}/";
		_ucapSendServlet = "${path}/"+ucapFlowSys.servlet;
		_returnSendLoad();
	 	function _returnSendLoad(){
			returnDialogOnload();//alert($("SingleSelRange").selectedIndex)
		}
  	</script>
  
  	<script type="text/javascript">
	  	jQuery(function(){
			jQuery.noConflict();
			jQuery("#SingleSelRange").bind("click",changeUnidItem);
	  	});
  	</script>	
</body>
</html>