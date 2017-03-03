<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@page import="com.linewell.core.notice.info.NoticeInfoManager"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String condition = "publish_time is not null and rownum<=5 order by publish_time desc";
	List list = new NoticeInfoManager().doFindListByCondition(condition,null);
	
	request.setAttribute("list", list);
	request.setAttribute("path", request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript">
		
	</script>
</head>
<body style="background-color:#FFF">	
	<ul align="left" style="margin-left:30px;">
		<s:iterator value="#request.list" id="noticeInfo">
			<li style="line-height:2.0;padding-bottom:10px"><b>${noticeInfo.title}</b><br/>${noticeInfo.content}</li>
		</s:iterator>
	</ul>
</body>
</html>