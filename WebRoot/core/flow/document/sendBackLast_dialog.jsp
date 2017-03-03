<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.linewell.ucap.platform.cache.user.UserOpinion"%>
<%@ page import="com.linewell.ucap.util.UcapRequest"%>
<%@ page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@ page import="com.linewell.ucap.workflow.UcapWorkFlow"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="com.linewell.ucap.platform.cache.user.User"%>
<%@ page import="com.linewell.ucap.workflow.bean.flow.FlowNode"%>
<%@ page import="java.util.*"%>
<%@page import="com.linewell.core.flow.instance.*" %>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.core.flow.config.FlowConfigBusiness"%>
<%@page import="com.linewell.core.flow.business.FlowWorkBusiness"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/sys/jsp/session.jsp"%>
<!-- 
	页面功能：退回对话框
	@date:2012-07-26
-->
<%
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String app_unid = ucapsession.getApp().getUnid();
	String username=user.getDisplayName();
	
	
	//文档id
	String defaultPath = request.getContextPath();
	String unid = request.getParameter("unid");
	//流程实例unid
	FlowConfigBusiness flowConfigBusiness = new FlowConfigBusiness();
	String instanceUnid = flowConfigBusiness.getInstanceUnid(unid,app_unid);
	FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,app_unid);
	UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	ucapRequest.setAttribute("belongToApp",ucapSession.getApp().getUnid());
	HashMap<String, Object> map = new HashMap<String, Object>();
	map.put("request", ucapRequest);
	UcapWorkFlow ucWorkFlow = new UcapWorkFlow(map);
	ucapRequest.setAttribute("flowUnid",ucWorkFlow.getFlowConfigApi(unid,instanceUnid).getId());
	FlowNode curNode =ucWorkFlow.getCurNodeApi(unid,instanceUnid);
	String curNodeId =curNode.getId();
	
	//流程类型 
	String curAuditType =  flowWorkBusiness.geFlowInstaceColumnByDocUnidAndInstanceUnid(unid,instanceUnid,"instance_cur_node_audit_type",app_unid);
	//多人顺序流程环节是否还有未办理人员
	String moreNotTranUserids = flowWorkBusiness.geFlowInstaceColumnByDocUnidAndInstanceUnid(unid,instanceUnid,"instance_moreorder_not_tran_0",app_unid);
	if(curAuditType.equals("2")&&StrUtil.isNull(moreNotTranUserids)){//当前节点未办理人员为空的话重置为普通环节（审批自行控制跟平台流程引擎控件设计理念有点不一样）
		curAuditType = "0";
	}
	
	//多人并行流程环节人员是否还有未办理人员
	String notTranUserids = flowWorkBusiness.geFlowInstaceColumnByDocUnidAndInstanceUnid(unid,instanceUnid,"instance_node_transactor_0",app_unid);
	if(curAuditType.equals("3")&&notTranUserids.split(",").length==1){//当前节点未办理人员为空的话重置为普通环节（审批自行控制跟平台流程引擎控件设计理念有点不一样）
		curAuditType = "0";
	}
	
	//主办批阅是否结束
	if(curAuditType.equals("4")){//当前节点未办理人员为空的话重置为普通环节（审批自行控制跟平台流程引擎控件设计理念有点不一样）
		curAuditType = "0";
	}
	
	
	String transitions = ucWorkFlow.getFuiHmByName(unid,instanceUnid,com.linewell.ucap.workflow.WorkFlowConstant.UCAP_NODE_TRANSACTOR);//ucap_fw_flow_instance.instance_node_transactor_0

	
    List<UserOpinion> opinionList = user.getUserOpinions();
	request.setAttribute("opinionList",opinionList);
	//默认是任意环节退回
	String thfs ="任意环节";
	
%>
<html>
<head>
	<base target="_self">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	<META http-equiv=pragma content=no-cache>
	<title>退回</title>
	<%@include file="/core/params.jsp"%>
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
	<form action="${path}/flowSendbacklast.action" method="POST" name="jspForm" id="jspForm">
	<input type="hidden" name=interName value="sendBack">
		<input type="hidden" name=observerName value="sendback"/> 
	<input type="hidden" name=docUnid value="<%=unid%>"/>
	<input type="hidden" name=thfs value="<%=thfs%>"/>					<!-- 退回方式 -->
	<input type="hidden" name=instanceUnid value="<%=instanceUnid%>">
	
		<input type="hidden" name=unid value="<%=unid%>">
		
		<input type="hidden" name=username value="<%=username%>">
	<table width="100%" border="0" cellpadding="0" class="form_table_ext">
		<tr valign="top">
			<th width="80" bgcolor="#FFFFFF" align="center" valign="middle">操作说明</th>
			<td valign="top" bgcolor="#FFFFFF">
				 当前操作步骤:<b><font color="red">退回上一环节</font></b><br>
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
	
	</table>
	<center style="margin-top:10px">
		<input name="button6" type="button" class="btn_big" id="button6" value="提  交" onClick="doSubmit();" />
		<input name="button7" type="button" class="btn_big" id="button7" value="关  闭" onClick="top.popup.close()"/>
	</center>
	</form>
	<script type="text/javascript">
	 	ucapFlowSys.flowWinObj = window;
		ucapFlowFun._initValue(); 
		ucapFlowFun.flowValue.docUnid = "<%=unid%>";
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