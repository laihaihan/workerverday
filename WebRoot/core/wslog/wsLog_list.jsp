<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.webservice.wslog.WsLog"%>
<%@ page import="com.linewell.core.webservice.wslog.WsLogManager"%>
<%@ page import="com.linewell.core.util.StrUtil" %>
<%@ page import="com.linewell.core.util.ClobUtil" %>
<%@ page import="java.util.List" %>
<%
	String beginTime = request.getParameter("beginTime");
	String endTime = request.getParameter("endTime");
	String call_interface = request.getParameter("interface");
	String call_method = request.getParameter("method");
	String log_type = request.getParameter("log_type");
	
	String condition = "log_type like '%"+StrUtil.formatNull(log_type)+"%' ";
	if(!StrUtil.isNull(beginTime) && !StrUtil.isNull(endTime)){
		condition += "and substr(call_time,0,10) between '"+beginTime+"' and '"+endTime+"' ";
	}
	if(!StrUtil.isNull(call_interface) && !"合计".equals(call_interface)){
		condition += "and call_interface like '%"+call_interface+"%' ";
	}
	if(!StrUtil.isNull(call_method)){
		condition += "and call_method like '%"+call_method+"%' ";
	}
	condition += "order by call_result,call_time desc";
	
	List list = new WsLogManager().doFindListByCondition(condition,null);
	request.setAttribute("path",request.getContextPath());
	request.setAttribute("list",list);
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
</head>
<body>	
	<table width="98%" align="center" class="form_table_ext">
		<col width="20%" align="center"/>
		<col width="15%" align="center"/>
		<col width="15%" align="center"/>
		<col width="50%"/>
		<tr>
			<th>调用时间</th>
			<th>调用结果</th>
			<th>调用者IP地址</th>
			<th>返回值</th>
		</tr>
		<%
			for(int i=0;i<list.size();i++){
				WsLog wsLog = (WsLog)list.get(i);
		%>
		<tr>
			<td><%=wsLog.getCall_time() %></td>
			<td><%="1".equals(wsLog.getCall_result()) ? "成功" : "失败" %></td>
			<td><%=wsLog.getCall_ipaddr() %></td>
			<td style="word-break:break-all;"><%=ClobUtil.clobToStr(wsLog.getReturn_msg()) %></td>
		</tr>
		<%} %>
	</table>
</body>
</html>