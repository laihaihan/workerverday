
<!-- 
	页面功能：提交对话框
	@date:2012-08-9
--><%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.ucap.platform.cache.user.UserOpinion"%>
<%@ page import="com.linewell.ucap.util.UcapRequest"%>
<%@ page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@ page import="com.linewell.ucap.workflow.UcapWorkFlow"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="com.linewell.ucap.platform.cache.user.User"%>
<%@ page import="com.linewell.ucap.workflow.bean.flow.FlowNode"%>
<%@ page import="java.util.*"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.core.flow.config.FlowConfigBusiness"%>
<%@page import="com.linewell.core.flow.business.FlowWorkBusiness"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/sys/jsp/session.jsp"%>

<%

	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String app_unid = ucapsession.getApp().getUnid();

	//文档id
	String defaultPath = request.getContextPath();
    String unid = request.getParameter("unid");
	//流程实例unid
	FlowConfigBusiness flowConfigBusiness = new FlowConfigBusiness();
    String instanceUnid = flowConfigBusiness.getInstanceUnid(unid,app_unid);
    FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,app_unid);
	
	UcapRequest ucapRequest = ucapsession.getRequest();
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
%>
<html>
	<head>
		<base target="_self">
		<META http-equiv=Content-Type content="text/html; charset=utf-8">
		<META http-equiv=pragma content=no-cache>
		<title>提交</title>
		<%@include file="/core/params.jsp"%>
		${import_theme}
		${import_jquery}
		<script type='text/javascript' src='${path}/js/ext/ext-base.js'></script>
		<script type='text/javascript' src='${path}/js/ext/ext-all.js'></script>
		<script type='text/javascript' src='${path}/js/ucap/flow/ucapCommonOptions.js'></script>
		<script type='text/javascript' src='${path}/js/ucap/flow/ucapSendFlow_core.js'></script>
		<script type='text/javascript' src='${path}/js/ucap/flow/ucapOpinion.js'></script>
		<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
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
	        
	        //表单验证
	        function checkForm(){
	        	if (jQuery("#opinion").val() == ""){
	           		alert("请输入环节办理意见！");
	                return false;
	            }
	            
	            
	            
	            if(null != jQuery("select[name='ApprSelResult'] option").val()){//非主办批阅	        
	            	jQuery("input[name='curAuditType']").val("4");
	            	
	            	var apprSelResultUnids = ""; //主办人员
		            jQuery("select[name='ApprSelResult'] option").each(function(index,obj){
		            	apprSelResultUnids += (index == 0 ? "" : ",") + jQuery(obj).val();
		            })
	            	jQuery("input[name='apprSelResultUnids']").val(apprSelResultUnids);
		            
	            	var coApprSelResultUnids = ""; //阅办人员
		            jQuery("select[name='CoApprSelResult'] option").each(function(index,obj){
		            	coApprSelResultUnids += (index == 0 ? "" : ",") + jQuery(obj).val();
		            })
	            	jQuery("input[name='coApprSelResultUnids']").val(coApprSelResultUnids);
	            	
	            	
	            }else{
	            	<%
	            	if(!(null != curAuditType &&("3".equals(curAuditType) || "2".equals(curAuditType)))){
            		%>
	            		if(jQuery('select[name=SingleSelResult] option').length<=1){
			           		if( jQuery('select[name=SingleSelResult] option').length==0 || 
			           			jQuery('select[name=SingleSelResult] option').eq(0).text()==''){
			           			alert("请选择发送人员!");
			           			return false;
			           		}
			           	}
            		<%
	            	}
	            	%>
	            }
	           
	           	return true;
	        }
	        
	        //表单提交
	        function doSubmit(){
	            if(checkForm()){
		            //获取参与者unid
		        	var participantUnids = "";
		            jQuery("select[name='SingleSelResult'] option").each(function(index,obj){
		            	participantUnids += (index == 0 ? "" : ",") + jQuery(obj).val();
		            })
		            document.all.participantids.value = participantUnids;
		            
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
	        }        
	    </script>
	</head>
	<body>
		<form action="${path}/flowSubmit.action?oid=<%=unid%>" method="POST" name="jspForm" id="jspForm">
		<input type="hidden" name=interName value="submit">
		<input type="hidden" name=docUnid value="<%=unid%>" />
		<input type="hidden" name=observerName value="submit"/> 
		<input type="hidden" name=curAuditType value="<%=curAuditType%>" />
		<input type="hidden" name="participantids" value=""/>
		<input type="hidden" name="apprSelResultUnids" value=""/>
		<input type="hidden" name="coApprSelResultUnids" value=""/> 
		<input type="hidden" name="smsSend" value=""/>
		<input type="hidden" name="smsMsg" value=""/>
		<input type="hidden" name="opinionType" value="提交意见"/>
		<input type="hidden" name=instanceUnid value="<%=instanceUnid%>">
		<table width="100%" border="0" cellpadding="0" class="form_table_ext">
			<tr bgcolor="#FFFFFF" align="center" valign="middle">
				<th width="80">
					操作说明
				</th>
				<td valign="top" bgcolor="#FFFFFF" align="left">
					当前操作步骤:<b><font color="red">提交</font></b><br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	 				<img src="${path}/core/js/easyui/themes/icons/icon_doc_done.gif"/>
					办理意见:表明处于该环节人员的对审批事项的办理意见
				</td>
			</tr>
			<tr bgcolor="#FFFFFF" align="center" valign="middle">
				<th width="80">
					<font color="red">*</font>办理意见
				</th>
				<td valign="top" bgcolor="#FFFFFF">
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

			<%	
				String sendStyle = "";
				if(null != curAuditType &&("3".equals(curAuditType) || "2".equals(curAuditType))){
			  		sendStyle = "display:none";
			  %>
			  <script>top.lwin.resizeLast(550,280);</script>
			  <%	
				}
			%>
			
		  
			<tr style="<%=sendStyle%>">
				<th align="center" bgcolor="#FFFFFF">
					<font color="red">*</font>发送人员
				</th>
				<td bgcolor="#FFFFFF" align="center">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr bgcolor="#FFFFFF">
							<td width="44%">
								<input name="endType" style="display:none" />
								下一步骤：
								<select name="nextNode" onChange="NextNodeChange();">
								</select>
							</td>
							<td width="51%" id="selRang">
								人员范围:
								<select name="SelectRange" onChange="SelectRangeChange();">
								</select>
							</td>
						</tr>
					</table>
					<span id="displayEndFlowInfo" style="display:none"> <br>
						<br> <br> <br>
						<div align="center">
							下一步骤选择为“
							<span id="endDisPlay"></span>”，则将结束此流程的办理。
						</div> <br> <br> <br> 
					</span>
					<span id="endFlow">
						<table width="100%" border="0" border="0" cellpadding="0" cellspacing="0">
							<tr bgcolor="#FFFFFF">
								<td>
									下一步骤审批方式：
									<select name="NextApproveType" onChange="ApproveTypeChange();">
									</select>
								</td>
								<td colspan=2>
									<input style="width:45%" id="queryText"></input>
									&nbsp;&nbsp;
									<input style="width:45%" id="query" name="query" type="button" value="人员范围查询"
										onClick="_doQuery($('nextNode').value,$('queryText').value);">
								</td>
							</tr>
							<tr>
								<td width="40%" bgcolor="#FFFFFF">
									待选择人员
									<span id="CommonSelRange"> 
										<select name="SingleSelRange" size="10" style="width:100%" 
											ondblclick="SingleSelRangeDBClick(this);">
										</select> 
									</span>
									<span id="srcTreeDiv" style=" overflow-y:scroll;width:100%;height:140px;display:none"></span>
								</td>
								<td bgcolor="#FFFFFF">
									已选择人员
									<span id="SingleSelect"><br>
										<table width="100%" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="17%">
													<span id="MultiSelect" style="visibility:hidden;display:none"> 
														<p>
														<input name="toRightBtnA" type="button" value="选择"
															onClick="addItem( $( 'SingleSelResult' ), $( 'SingleSelRange' ), isMulti)">
														</p>
														<p>
															<input name="toLeftBtnA" type="button" value="删除"
																onClick="removeItem( $( 'SingleSelResult' ) )">
														</p>
														<p>
															<input name="allToRightBtnA" type="button" value="全选"
																onClick="addAllItems( $( 'SingleSelResult' ), $( 'SingleSelRange' ), isMulti )">
														</p>
															<input name="allToLeftBtnA" type="button" value="全删"
																onClick="removeAllItems( $( 'SingleSelResult' ) )">
														</p>		
													</span>
													<span id="deptMultiSelect" style="visibility:hidden;display:none">
														<p>
															<input name="toRightBtn" type="button" value="选择"
																onClick="addTreeItem( $( 'SingleSelResult' ), $( 'srcDataSel' ),  isMulti )">
														</p> <br>
														<p>
															<input name="toLeftBtn" type="button" value="删除"
																onClick="removeItem( $( 'SingleSelResult' ) )">
														</p> <br>
														<p>
															<input name="allToRightBtn" type="button" value="全选"
																onClick="addTreeItem( $( 'SingleSelResult' ), $( 'srcDataSel' ), isMulti )">
														</p> <br>
														<p>
															<input name="allToLeftBtn" type="button" value="全删"
																onClick="removeAllItems( $( 'SingleSelResult' ) )">
														</p> 
													</span>
												</td>
												<td width="83%">
													<select name="SingleSelResult" id="SingleSelResult"
														size="10" style="width:100% "
														ondblclick="$('toLeftBtnA').click();">
													</select>
												</td>
											</tr>
										</table> 
									</span>
									<span id="MainSelect" style="visibility:hidden;display:none"><br>
										<table width="100%" border="0" cellpadding="0" cellspacing="1">
											<tr>
												<td width="17%">
													<span id="MainSelectButton"> 
														<input name="toRightBtnB" type="button" value="选择"
															onClick="addItem( $( 'ApprSelResult' ), $( 'SingleSelRange' ),isMulti)">
														<input name="toLeftBtnB" type="button" value="删除"
															onClick="removeItem( $( 'ApprSelResult' ) )">
														<input name="allToRightBtnB" type="button" value="全选"
															onClick="addAllItems( $( 'ApprSelResult' ), $( 'SingleSelRange' ), isMulti)">
														<input name="allToLeftBtnB" type="button" value="全删"
															onClick="removeAllItems( $( 'ApprSelResult' ) )"> 
														<br> <br> 
														<input name="toRightBtnC" type="button" value="选择"
															onClick="addItem( $( 'CoApprSelResult' ), $( 'SingleSelRange' ), isMulti)">
														<input name="toLeftBtnC" type="button" value="删除"
															onClick="removeItem( $( 'CoApprSelResult' ) )">
														<input name="allToRightBtnC" type="button" value="全选"
															onClick="addAllItems( $( 'CoApprSelResult' ), $( 'SingleSelRange' ), isMulti)">
														<input name="allToLeftBtnC" type="button" value="全删"
															onClick="removeAllItems( $( 'CoApprSelResult' ) )">
													</span>
													<span id="deptMainSelectButton" style="visibility:hidden;display:none"> 
														<input name="toRightBtnB" type="button" value="选择"
															onClick="addTreeItem( $( 'ApprSelResult' ), $( 'srcDataSel' ),  isMulti )">
														<input name="toLeftBtnB" type="button" value="删除"
															onClick="removeItem( $( 'ApprSelResult' ) )">
														<input name="allToRightBtnB" type="button" value="全选"
															onClick="addTreeItem( $( 'ApprSelResult' ), $( 'srcDataSel' ), isMulti )">
														<input name="allToLeftBtnB" type="button" value="全删"
															onClick="removeAllItems( $( 'ApprSelResult' ) )"> 
														<br> <br> 
														<input name="toRightBtnC" type="button" value="选择"
															onClick="addTreeItem( $( 'CoApprSelResult' ), $( 'srcDataSel' ),  isMulti )">
														<input name="toLeftBtnC" type="button" value="删除"
															onClick="removeItem( $( 'CoApprSelResult' ) )">
														<input name="allToRightBtnC" type="button" value="全选"
															onClick="addTreeItem( $( 'CoApprSelResult' ), $( 'srcDataSel' ),  isMulti )">
														<input name="allToLeftBtnC" type="button" value="全删"
															onClick="removeAllItems( $( 'CoApprSelResult' ) )">
													</span>
												</td>
												<td width="83%">
													主办人员：
													<select name="ApprSelResult" size="7" style="width:100% "
														ondblclick="$('toLeftBtnB').click();">
													</select>
													<br>
													参与人员:
													<select name="CoApprSelResult" size="6" style="width:100% "
														ondblclick="$('toLeftBtnC').click();">
													</select>
												</td>
											</tr>
										</table> 
									</span>
								</td>
								<td width="32" bgcolor="#FFFFFF">
									<span id="tomove">
										<p>
											<input name="toUpBtn" type="button" value="上移"
												onClick="moveUpOrDown( $( 'SingleSelResult' ), -1 )">
										</p>
										<p>
											<input name="toDownBtn" type="button" value="下移"
												onClick="moveUpOrDown( $( 'SingleSelResult' ), 1 )">
										</p> 
									</span>
								</td>
							</tr>
						</table> 
					</span>
				</td>
			
			<tr valign="top">
				<th width="80" bgcolor="#FFFFFF" align="center" valign="middle">
					短信发送
				</th>
				<td bgcolor="#FFFFFF" align="left">
					<label>
						<input type="checkbox" name="smsFlag" value="Y">
						是否发送短信通知给下一环节办理人&nbsp;&nbsp;
					</label>
				</td>
			</tr>
			<tr id="allUnid" style="display:none">
				<td>
					所有已选的节点
					<select name="SelectAllUnid" size="3" style="width:100% "
						onchange="changeUnidItem();"
						ondblclick="$('SelectAllUnidDelBtn').click();">
					</select>
				</td>
				<td>
					<input name="SelectAllUnidSelBtn" type="button" value="增加"
						onClick="addUnidItem( $( 'SelectAllUnid' ))">
					<p></p>
					<p>
						<input name="SelectAllUnidDelBtn" type="button" value="删除"
							onClick="delFromArray($( 'SelectAllUnid' ));removeItem( $( 'SelectAllUnid' ) )">
					</p>
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
			ucapFlowSys.sUcapSystemPath = "<%=defaultPath+"/"%>";
			_ucapSendServlet = "<%=defaultPath+"/"%>"+ucapFlowSys.servlet;
			_sendLoad();
		 	function _sendLoad(){
				//try{
					_ucapSendDialogOnload();
				/*	}
				catch(e){
					alert(e.message);
					if (typeof _ucapSendDialogOnload !="function") 
							setTimeout ('_sendLoad();',1000);
					return;
				}*/
			}
			Ext.onReady(function(){
				document.getElementById("opinion").focus();
				jQuery.noConflict();
			})	
		</script>
	</body>
</html>
