<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@	page import="com.linewell.core.message.*"%>
<%@	page import="com.linewell.core.util.UNIDGenerate"%>
<%@	page import="com.linewell.core.util.DateTime"%>
<%@	page import="com.linewell.core.util.StrUtil"%>
<%@	page import="com.linewell.ucap.session.Session"%>
<%@ page import="com.linewell.ucap.platform.cache.user.User"%>
<%@ page import="com.linewell.apas.service.flow.ApasFlowManager"%>
<%@ page import="com.linewell.apas.info.ApasInfo"%>
<%@ page import="com.linewell.apas.info.ApasInfoManager"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%
    /*获取当前用户的信息*/
	Session ucapSession = (Session)session.getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
    if (null == user) {
        response.sendRedirect("login.jsp");
        return;
    }
    
    //获取消息的类型
    String unid = request.getParameter("unid");
    String msgtypeclass = request.getParameter("msgtype");
    String relevanceunid = request.getParameter("relevanceunid");
    String relevancetype = request.getParameter("relevancetype");
    relevancetype = StrUtil.isNull(relevancetype) ? "消息" : relevancetype;
    
    String content = request.getParameter("content");

	Msg msg = new MsgManager().doFindBeanByKey(unid);
	String fn = "update";
	if (null == msg) {
		fn = "add";
		msg = new Msg();
		msg.setUnid(new UNIDGenerate().getUnid());
		msg.setRelevancetype(relevancetype);
		msg.setRelevanceunid(relevanceunid);
		msg.setSender(user.getDisplayName());
		msg.setSenderunid(user.getUnid());
		msg.setApp_unid(ucapSession.getApp().getUnid());
	}
	
	if(StringUtils.isNotEmpty(content)){
		msg.setContent(content);
	}
    
    String tmpMsgClass = "";
    if (MsgType.SYSMSG.equals(msgtypeclass)) {
        tmpMsgClass = "系统消息";
    }
    if (MsgType.EFFIMSG.equals(msgtypeclass)) {
        tmpMsgClass = "催办消息";
    }
    if (MsgType.CROSSSYS.equals(msgtypeclass)) {
        tmpMsgClass = "跨系统消息";
    }
    
    if("办件".equals(relevancetype) && MsgType.EFFIMSG.equals(msgtypeclass)){
    	ApasInfo apasInfo = new ApasInfoManager().doFindBeanByKey(relevanceunid);
    	if(!"受理".equals(apasInfo.getHandlestate()) && !"在办".equals(apasInfo.getHandlestate())){
    		StringBuffer script = new StringBuffer();
	    	script.append("<script language='javascript'>\n");
	    	script.append("top.lwin.alert('信息提示','当前办件不是处于待办状态，无需发送催办消息！','info',3000);\n");
	    	script.append("top.lwin.close(true);\n");
	    	script.append("</script>");
	    	out.println(script);
	    	return;
    	}
    }
    
    String seldeptpersonunid = ApasFlowManager.getNodeTransactors(relevanceunid, 1, 1);
    if(StrUtil.isNull(seldeptpersonunid)){
    	StringBuffer script = new StringBuffer();
    	script.append("<script language='javascript'>\n");
    	script.append("top.lwin.alert('信息提示','办件的当前办理人为空，无法发送催办消息！','info',3000);\n");
    	script.append("top.lwin.close(true);\n");
    	script.append("</script>");
    	out.println(script);
    	return;
    }
    
    
    request.setAttribute("path", request.getContextPath());
%>
<HTML>
<HEAD>
	<TITLE>短信编辑</TITLE>
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	<META http-equiv=pragma content=no-cache>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	
</HEAD>
<BODY marginheight="0" marginwidth="0">
	<form id="jspForm" name="jspForm" method="post" action="${path}/Message.action">
	<input type="hidden" name="fn" value="<%=fn%>">
	<input type="hidden" name="unid" value="<%=msg.getUnid() %>">
	<input type="hidden" name="revType" value="person">
	<input type="hidden" name="msgtype" value="<%=msgtypeclass%>">
	<input type="hidden" name="senderunid" value="<%=msg.getSenderunid() %>">
	<input type="hidden" name="createtime" value="<%=DateTime.getNowDateTime() %>">
	<input type="hidden" name="relevancetype" value="<%=msg.getRelevancetype() %>">
	<input type="hidden" name="relevanceunid" value="<%=msg.getRelevanceunid() %>">
	<input type="hidden" name="seldeptpersonunid" value='<%=seldeptpersonunid %>'>
	<input type="hidden" name="seldeptpersonname" value=''>
	<input type="hidden" name="app_unid" value='<%=msg.getApp_unid() %>'>
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存 </button>
			<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
		</div>
		<div>
			<table width="100%" class="form_table_ext">
				<col width="15%" align="right">
				<col width="35%">
				<col width="15%" align="right">
				<col width="35%">
				<tr>
					<th>发送者</th>
					<td colspan="3">
						<input type="text" readonly name=sender style="width:40%" value="<%=user.getDisplayName() %>"/>
					</td>
				</tr>
				<tr>
					<th>消息类型</th>
					<td><%=tmpMsgClass%>
					</td>
					<th>消息级别</th>
					<td>
						<select name="msglevel">
							<option value="普通消息">普通消息</option>
							<option value="紧急消息">紧急消息</option>
							<option value="特急消息">特急消息</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>消息类型</th>
					<td colspan="3">
						<label><input type="radio" name="needreply" id="needreply" value="0" checked="checked">不需要回复</label>
						<label><input type="radio" name="needreply" id="needreply" value="1">需要回复</label>
						<font color="#FF0000">(选择是否需要接收者回复信息)</font> 
					</td>
				</tr>
	
				<tr>
					<th><font color="red">*</font>标题</th>
					<td colspan="3" align="left">
						<input value="<%=msg.getTitle()%>" name="title" style="width:80%" type="text" id="title" class="required" title="请填写标题">
					</td>
				</tr>
				<tr>
					<th><font color="red">*</font>发送内容</th>
					<td colspan="3" align="left">
						<textarea name="content" style="width:80%" rows="8" id="content" class="required" title="请填写内容"><%=msg.getContent()%></textarea>
					</td>
				</tr>		
			</table>
		</div>
	</div>
	</form>
	<script type="text/javascript">
		$(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
			
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
							top.lwin.close();
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