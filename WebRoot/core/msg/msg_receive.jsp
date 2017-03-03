<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@	page import="com.linewell.core.message.*"%>
<%@	page import="com.linewell.core.message.receiver.*"%>
<%@	page import="com.linewell.core.message.reply.*"%>
<%@	page import="com.linewell.ucap.session.Session"%>
<%@ page import="com.linewell.ucap.platform.cache.user.User"%>
<%@	page import="com.linewell.core.util.DateTime"%>
<%@ page import="com.linewell.core.file.AppFileManager"%>
<%@ page import="java.util.List"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
    /*获取当前用户的信息*/
	Session ucapSession = (Session)session.getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
    if (null == user) {
        response.sendRedirect("login.jsp");
        return;
    }
    
	//打开查看消息设置已读
    String unid = request.getParameter("unid");
 	MsgReceiverManager receiverManager = new MsgReceiverManager();
    MsgReceiver msgReceiver = receiverManager.doFindBeanByKey(unid);
    
    if(msgReceiver.getMsgstatus().equals("0") && user.getUnid().equals(msgReceiver.getReceiverunid())){
		msgReceiver.setMsgstatus("1");//设置消息状态为：已读
		msgReceiver.setReadtime(DateTime.getNowDateTime());
		new MsgReceiverManager().doUpdate(msgReceiver);
	}
	
    String condition = "replyreceiverunid='"+msgReceiver.getReceiverunid()+"' and replymsgunid='"+msgReceiver.getUnid()+"'";
	MsgReply msgReply = new MsgReplyManager().doFindBeanByCondition(condition,null);
    Msg msg = new MsgManager().doFindBeanByKey(msgReceiver.getMessageunid());
    
    String tmpMsgClass = "系统消息";
    String msgtypeclass = msg.getMsgtype();//消息类型
    if (MsgType.SYSMSG.equals(msgtypeclass)) {
        tmpMsgClass = "系统消息";
    }else if (MsgType.EFFIMSG.equals(msgtypeclass)) {
        tmpMsgClass = "催办消息";
    }else if (MsgType.UNITEMSG.equals(msgtypeclass)) {
        tmpMsgClass = "催办消息";
    }else if (MsgType.CROSSSYS.equals(msgtypeclass)) {
        tmpMsgClass = "跨系统消息";
    }
    
    AppFileManager fileManager = new AppFileManager(ucapSession.getApp().getUnid());
    List appFileList = fileManager.doFindByBelongto(msg.getUnid());//发送消息中包含的附件列表
    
    request.setAttribute("path", request.getContextPath());
    request.setAttribute("msg", msg);
    request.setAttribute("msgReceiver", msgReceiver);
    request.setAttribute("msgReply", msgReply);
    request.setAttribute("appFileList", appFileList);
%>
<HTML>
<HEAD>
	<TITLE>短信编辑</TITLE>
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	<META http-equiv=pragma content=no-cache>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css"/>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
</HEAD>
<BODY marginheight="0" marginwidth="0">
	<form id="jspForm" name="jspForm" method="post" action="${path}/Message.action">
	<input type="hidden" name="fn" value="update">
	<input type="hidden"name="unid" value="${msg.unid}">
	<div id="form_content">
		<div id="form_toolbar">
			<%if("1".equals(msg.getNeedreply()) && user.getUnid().equals(msgReceiver.getReceiverunid())){ %>
			<button class="form_btn" id="btnReply"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 回复 </button>
			<%} %>
			<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
		</div>
		<div class="easyui-tabs" id="tabs">
			<div title="发送情况" style="padding:5px;background: #DEECFD;">
				<table width="98%" class="form_table_ext">
					<col width="20%" align="right">
					<col width="35%">
					<col width="15%" align="right">
					<col width="30%">
					<tr>
						<th>消息类型：</th>
						<td><%=tmpMsgClass%></td>
						<th>消息级别：</th>
						<td>${msg.msglevel}</td>
					</tr>
					<tr>
						<th>是否需要回复：</th>
						<td colspan="3">${msg.needreply == '0' ? '不需要回复' : '需要回复'}</td>
					</tr>
					<tr>
						<th>发送者：</th>
						<td>${msg.sender}</td>
						<th>发送时间：</th>
						<td>${msg.createtime}</td>
					</tr>
					<tr>
						<th>接收者：</th>
						<td colspan="3">${msgReceiver.receiver}</td>
					</tr>
					<tr>
						<th>标题：</th>
						<td colspan="3" align="left">
							<input value="${msg.title}" name="title" style="width:90%" type="text" id="title" class="required" title="请填写标题">
						</td>
					</tr>
					<tr>
						<th>发送内容：</th>
						<td colspan="3" align="left">
							<textarea name="content" style="width:90%" rows="5" id="content" class="required" title="请填写内容">${msg.content}</textarea>
						</td>
					</tr>
					<tr>
						<th>附件：</th>
						<td colspan="3">
	       					<s:iterator value="#request.appFileList" id="appFile" status="status">
	       						<div style='margin:3px;'>
	       							<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>
	       							<a href="javascript:downloadFile('${appFile.file_unid}')">${appFile.file_name}</a>
	       						</div>
	       					</s:iterator>
						</td>
					</tr>
				</table>
			</div>
			<%
				if(null != msgReply){ 
    				appFileList = fileManager.doFindByBelongto(msgReply.getUnid());//回复消息中包含的附件列表
    				request.setAttribute("appFileList", appFileList);
			%>
			<div title="回复情况" style="padding:5px;background: #DEECFD;">
				<table width="98%" class="form_table_ext">
					<col width="20%" align="right">
					<col width="80%">
					<tr>
						<th>回复时间：</th>
						<td align="left">${msgReply.replytime}</td>
					</tr>
					<tr>
						<th>回复内容：</th>
						<td align="left">
							<textarea name="content" style="width:90%" rows="5" id="content" class="required" readonly="readonly">${msgReply.content}</textarea>
						</td>
					</tr>
					<tr>
						<th>附件：</th>
						<td>
	       					<s:iterator value="#request.appFileList" id="appFile" status="status">
	       						<div style='margin:3px;'>
	       							<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>
	       							<a href="javascript:downloadFile('${appFile.file_unid}')">${appFile.file_name}</a>
	       						</div>
	       					</s:iterator>
						</td>
					</tr>
				</table>
			</div>
			<%} %>
		</div>
	</div>
	</form>
	<script type="text/javascript">
		$(function(){
			$("#btnReply").bind("click",doReply);
			$("#btnClose").bind("click",doClose);
		});
			
		function doReply(){
			window.location.href = "${path}/core/msg/msg_reply.jsp?receiverunid=<%=msgReceiver.getUnid()%>";
		}
		
		function doClose(){
			top.lwin.close(true);
		}
		
		function selectPersion(){
			if($('#revType').val() == 'dept'){
				top.lwin.open("/core/permission/choose_personnel_range.jsp?displayId=seldeptpersonname&fn=getDept&hiddenId=seldeptpersonunid&separate=,","选择",600,450);
			}else if($('#revType').val() == 'person'){
				top.lwin.open("/core/permission/choose_personnel_range.jsp?displayId=seldeptpersonname&fn=getPersion&hiddenId=seldeptpersonunid&separate=,","选择",600,450);
			}
		}
		
		//文件下载	
		function downloadFile(unid){
			location.href = "${path}/core/file/file_download.jsp?unid="+unid;
		}
	</script>
	<script type="text/javascript">
		var validate = new Validation('jspForm', { 
	    	immediate: true,
		    validators: {
		      	title:'required',
		      	content:'required'
		    },
		    messages:{
		    	title:'请填写[标题]',
		    	content:'请选择[内容]'
		    }
	  	});	
	</script>
</BODY>
</HTML>