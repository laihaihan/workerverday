<%@page language="java" contentType="text/html; charset=utf-8" %>
<%@page import="com.linewell.core.message.receiver.*"%>
<%@page import="com.linewell.core.message.reply.*"%>
<%@page import="com.linewell.core.message.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.core.util.DateTime"%>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="java.util.List"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
    /*获取当前用户的信息*/
	Session ucapSession = (Session)session.getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
    if (null == user) {
        response.sendRedirect("login.jsp");
        return;
    }
    
    String receiverunid = request.getParameter("receiverunid");
    MsgReceiver msgReceiver = new MsgReceiverManager().doFindBeanByKey(receiverunid);
	Msg msg = new MsgManager().doFindBeanByKey(msgReceiver.getMessageunid());
	
    //联办消息回复
    if(null != msg && MsgType.UNITEMSG.equals(msg.getMsgtype())){
    	response.sendRedirect(request.getContextPath()+"/was/jsp/info/unite/unite_msg_reply.jsp?receiverunid="+receiverunid);
    	return;
    }
	    
    String fn = "update";
    String condition = "replymsgunid='"+msgReceiver.getMessageunid()+"' and replyreceiverunid='"+msgReceiver.getReceiverunid()+"'";
	MsgReply msgReply = new MsgReplyManager().doFindBeanByCondition(condition,null);
    if(null == msgReply){
	    fn = "add";
    	msgReply = new MsgReply();
    	msgReply.setUnid(new UNIDGenerate().getUnid());
    	msgReply.setMsgstatus("1");//消息状态设置为：已回复
    	msgReply.setReplytime(DateTime.getNowDateTime());
    	msgReply.setReplymsgunid(msgReceiver.getMessageunid());
    	msgReply.setReplyuser(user.getDisplayName());
    	msgReply.setReplyuserunid(user.getUnid());
    	
    	//回复消息的接收人员必须保存消息的接收者，而不是发送者，否则会导致app_msg_receiver和app_msg_reply这两张表关联不上，从而导致视图数据显示混乱。
    	msgReply.setReplyreceiver(msgReceiver.getReceiver());
    	msgReply.setReplyreceiverunid(msgReceiver.getReceiverunid());
    }
    
    List appFileList = new AppFileManager(ucapSession.getApp().getUnid()).doFindByBelongto(msgReply.getUnid());//回复消息中包含的附件列表
    
    request.setAttribute("path", request.getContextPath());
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
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
</HEAD>
<BODY marginheight="0" marginwidth="0">
	<form id="jspForm" name="jspForm" method="post" action="${path}/MessageReply.action">
	<input type="hidden" name="fn" value="<%=fn%>">
	<input type="hidden" name="unid" value="${msgReply.unid}">
	<input type="hidden" name="msgstatus" value="${msgReply.msgstatus}">
	<input type="hidden" name=replymsgunid value="${msgReply.replymsgunid}">
	<input type="hidden" name="replyreceiver" value="${msgReply.replyreceiver}">
	<input type="hidden" name="replyreceiverunid" value="${msgReply.replyreceiverunid}">
	<input type="hidden" name="replytime" value="${msgReply.replytime}">
	<input type="hidden" name="replyuser" value="${msgReply.replyuser}">
	<input type="hidden" name="replyuserunid" value="${msgReply.replyuserunid}">
	
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 回复 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
	</div>
	<div>
		<table width="100%" class="form_table_ext">
			<col width="15%" align="right">
			<col width="85%" align="left">
			<tr>
				<th>回复内容：</th>
				<td>
					<textarea name="content" style="width:90%" rows="8" id="content" class="required" title="请填写内容">${msgReply.content}</textarea>
				</td>
			</tr>
			<tr>
				<th>附件：</th>
				<td id="td_file">
					<input type="text" name="filepath" id="filepath" value="" style="width:85%" readonly>
      				<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>
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
	</form>
	<script type="text/javascript">
		$(function(){
			top.popup.resizeLast(600,350);//重新设置窗口大小
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
			$(".uploadify").uploadify({   
	          	'uploader'       : '${path}/core/js/uploadify/uploadify.swf',   
	          	'script'         : '${path}/AppFile.action?belongTo=${msgReply.unid}',   
	          	'buttonImg'	     : '${path}/core/js/uploadify/theme/default/fill-090.png',
	          	'cancelImg'      : '${path}/core/js/uploadify/cancel.png',   
	          	'height'         : 16,
	  		  	'width'          : 16,
	          	'auto'           : true,   
	          	'multi'          : true,   
	          	'sizeLimit'      : 2048000, 
	          	'fileDataName'   :'file',
	          	//'fileDesc'       : '支持格式：doc,docx',
	          	//'removeCompleted' : false,
	          	'fileExt'         : '*.*;' ,
	          	onComplete:function(event, ID, fileObj, response, data){
		          	var json = $.parseJSON(response);
		          	if(json.success){
		          		var html = "<div style='margin:3px;'>";
			          	html += "<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>";
			          	html += "<a href=\"javascript:downloadFile('"+json.unid+"')\">"+fileObj.name+"</a>";
			          	html += "</div>";
			          	$("#td_file").append(html);
		          		$("#filepath").val(json.appFile.file_path);
		          	}
	          	},
	          	onError:function(event,ID,fileObj,errorObj){
		       		if(errorObj.type=='File Size'){
		       			alert("文件过大");
		       		}
	          	}
	      	});
		});
		
		//文件下载	
		function downloadFile(unid){
			location.href = "${path}/core/file/file_download.jsp?unid="+unid;
		}
			
		function doSave(){
			if(validate.validate()){
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.lwin.errorService();
					},
					success:function(data){
						if(data.result){
							top.lwin.alert("信息提示","操作成功","info",1500);
							top.lwin.close(true);
						}else{
							top.lwin.alert("信息提示","操作失败","error",1500);
						}
					}
				});
			}
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