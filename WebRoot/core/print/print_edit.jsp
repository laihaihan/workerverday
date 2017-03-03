<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.print.printlodop.Print"%>
<%@ page import="com.linewell.core.print.printlodop.PrintManager"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="java.util.List"%>
<%
	String fn = "update";
	String punid = request.getParameter("punid");
	
	List printList = new PrintManager().doFindListByCondition(" punid='"+punid+"'",new Object[0]);
	
	
	Print print = new Print();
	if (null != printList && printList.size() > 0) {
		print = (Print)printList.get(0);
	}else{
		fn = "add";
		print.setPrint_unid(new UNIDGenerate().getUnid());
		print.setPunid(punid);
	}
	
	request.setAttribute("print",print);
	request.setAttribute("path",request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css"/>	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/jquery-ui/themes/cupertino/jquery.ui.all.css"/>
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/uiutil/load.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.tabs.js"></script>
</head>
<body>
	<div id="tabs">
		<ul>
			<li><a href="#tabs-1">基本信息</a></li>
			<li><a href="#tabs-2">字段配置</a></li>
		</ul>
		<div id="tabs-1" style="padding:0px;margin:0px">
			<%@include file="print_baseinfo.jsp" %>
		</div>
		<div id="tabs-2" style="padding:0px;margin:0px">
			<iframe id="iframe" src="print_field_cfg.jsp?print_unid=${print.print_unid}" 
				marginheight="0" marginwidth="0" frameborder="0" width="100%" height="420">
			</iframe>
		</div>
		<%@include file="print_js.jsp" %>
	</div>
</body>
</html>