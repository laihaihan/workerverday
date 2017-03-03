<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.ClobUtil"%>
<%@page import="com.linewell.core.notice.info.NoticeInfo"%>
<%@page import="com.linewell.core.notice.info.NoticeInfoManager"%>
<%
	String unid = request.getParameter("unid");
	NoticeInfo noticeInfo = new NoticeInfoManager().doFindBeanByKey(unid);

	request.setAttribute("noticeInfo", noticeInfo);
	request.setAttribute("path", request.getContextPath());
%>
<html>
	<head>
		<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
	</head>
	<body>
		<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#fffff7">
			<tr>
				<td align="center" style="padding-top:15px;font-size:20px;font-weight:bolder">
					${noticeInfo.title}
				</td>
			</tr>
			<tr>
				<td height="25" align="right" style="padding-right:20px">
					<span style="margin-right:20px">发布时间：${noticeInfo.publish_time}</span>
					<span>发布人员：${noticeInfo.publish_username}</span>
				</td>
			</tr>
			<tr>
				<td height="25"><hr></td>
			</tr>
			<tr>
				<td style="padding:10px"><%=ClobUtil.clobToStr(noticeInfo.getContent())%></td>
			</tr>
		</table>
	</body>
</html>