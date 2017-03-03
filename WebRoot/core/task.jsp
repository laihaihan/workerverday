<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.apas.info.ApasInfoBussiness"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.core.message.receiver.MsgReceiverBussiness"%>
<%@page import="com.linewell.core.message.reply.MsgReplyBussiness"%>
<%@page import="com.linewell.core.message.MsgType"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%
	//刷新当前用户所有在办件的剩余办理天数
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	
	User user =null;
	
	if(null != ucapsession){
		//如果是审批系统才需要执行
		if(ucapsession.getApp().getUnid().equals("02EA829BF2BA1F4FF0F49145A502C353")){
			user = ucapsession.getUser();
			ApasInfoBussiness apasInfoBussiness = new ApasInfoBussiness();
			apasInfoBussiness.updateUserDistinceDay(user.getUnid());	
		}
		
	}	
	
	
	//获取当前登录用户未读消息提醒
	MsgReceiverBussiness msgReceiverBussiness = new MsgReceiverBussiness();
	int sysMsgCount = msgReceiverBussiness.msnMsgContents(request,MsgType.RECEIPTMSG+","+MsgType.SYSMSG+","+MsgType.EFFIMSG+","+MsgType.UNITEMSG);
	int crossysCount = msgReceiverBussiness.msnMsgContent(request,"CROSSSYS");
	
	//右下角弹出提示窗口
	if(sysMsgCount > 0){
		String sysMsgContent = "您共有["+sysMsgCount+"]条内部消息未读，点击查看详细";
%>

	<script>
	top.$.messager.show({
	title:'消息提示',
	msg:"<a href=javascript:top.tabs.openTab('未读消息','','view.action?fn=grid&viewId=92B4B1E7CAC588E2FB0FBB70C249A184&_rand=0.23146826251589103&modId=1D45DE7F49E0732364A770BC3A20F6BE','消息中心')><%=sysMsgContent%>.</a>",
	timeout:5000,
	showType:'slide'
	});
	</script>

<%
	}
	//右下角弹出提示窗口
	if(crossysCount > 0){
		String crossysContent = "您共有["+crossysCount+"]条跨系统消息未读，点击查看详细";
%>
		<script>
		top.$.messager.show({
		title:'消息提示',
		msg:"<a href=javascript:top.tabs.openTab('跨系统未读消息','','view.action?fn=grid&viewId=D7AD2884031E94B5E370061EE408B358&_rand=0.12304918212510452&modId=8D3139EB48825148798D4A5089F58DDD','消息中心')><%=crossysContent%>.</a>",
		timeout:5000,
		showType:'slide'
		});
		</script>

<%
	}
	
%>

