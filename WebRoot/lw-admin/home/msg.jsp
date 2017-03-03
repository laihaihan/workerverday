<%--
/**
 * 内网首页
 * @author cyingquan@qq.com
 * @2011-01-06
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.db.JDBCTool"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String msgSql = 	"select m.msgtype, count(1)\n" +
					"  from message_receiver r, message m\n" + 
					" where r.messageunid = m.unid(+)\n" + 
					"   and r.receiverunid = '"+ucapSession.getUser().getUnid()+"'\n" + 
					"   and r.msgstatus = '0'\n" + 
					" group by m.msgtype";
	
	String[][] msgArray = JDBCTool.doSQLQuery(msgSql);
	String msg = "\"";
	for(int i=1;i<msgArray.length;i++){
		String msgType = msgArray[i][0];
		String count = msgArray[i][1];
		if("系统消息".equals(msgType)){			
			msg+="<a href=\'javascript:top.tabs.openTab(\\\"系统消息\\\",\\\"\\\",\\\"view.action?fn=grid&viewId=1EE291B0703257DFF53C5A16DB2B01C0\\\")\'>系统消息"+count+"条</a><br>";
			
		}else if("催办消息".equals(msgType)){
			msg+="<a href=\'javascript:top.tabs.openTab(\\\"催办消息\\\",\\\"\\\",\\\"view.action?fn=grid&viewId=20110710-89EEFB4A5538BBC707CB-11\\\")\'>催办消息"+count+"条</a><br>";
		
		}else if("短消息".equals(msgType)){
			msg+="<a href=\'javascript:top.tabs.openTab(\\\"短消息\\\",\\\"\\\",\\\"view.action?fn=grid&viewId=20110711-E87201199CD6771D42F5-11\\\")\'>短消息"+count+"条</a><br>";
		
		}
		
	}
	msg += "\"";	
	request.setAttribute("path", request.getContextPath());
%>
<script type="text/javascript">
$(function(){
	<%
		if(msgArray.length>1){
	%>	
	$.messager.show({
		title:'未读消息提醒',
		msg:<%=msg%>,
		timeout:5000,
		showType:'slide'
	});
	<%		
		}
	%>
})
</script>
