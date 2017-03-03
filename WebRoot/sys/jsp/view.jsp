<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/sys/jsp/session.jsp"%>
<% 

	String viewId = request.getParameter("viewId");
	//viewId=viewId+","+viewId;
	String punid = request.getParameter("punid");
	
	String purl = request.getParameter("purl");
	
	if(null!=purl)purl = purl.replace("~$*$~","&");
	
	String noQuery = request.getParameter("noQuery");
	String noPreview = request.getParameter("noPreview");
	String noSelfConfig = request.getParameter("noSelfConfig");
	String isSingle = request.getParameter("isSingle");
	String recordSplit = request.getParameter("recordSplit");
	String colSplit = request.getParameter("colSplit");
	String isTab=request.getParameter("isTab");
	String noTbar = request.getParameter("noTbar");
	String noBbar = request.getParameter("noBbar");
	String bModuleUnid = request.getParameter("moduleUnid");
	
	if(null==noQuery)noQuery="false";//默认有查询
	if(null==noPreview)noPreview="false";//默认有预览
	if(null==noSelfConfig)noSelfConfig="false";//默认有自定义
	if(null==isSingle)isSingle = "0";//默认为单选
	if(null==recordSplit)recordSplit="";
	if(null==colSplit)colSplit="";	
	if(null==isTab)isTab="0";
	if(null==noTbar)noTbar = "";
	if(null==noBbar)noBbar = "";
	if(null==bModuleUnid)bModuleUnid = "";
	
%>
<html>
<script language="javascript" type="text/javascript"> 
    var viewId = "<%=viewId%>";
	var punid ="<%=punid%>";
	var isFromJsp = "true";
	
	Ext.onReady(function(){ 
		view.newViewport();		
		//<!-- 进行数据的绚烂 -->
		initFormJspView(viewId,"ucapviewdiv","<%=purl%>","<%=bModuleUnid%>","<%=noQuery%>","<%=noPreview%>","<%=noSelfConfig%>","<%=isTab%>","<%=noTbar%>","<%=noBbar%>","<%=isSingle%>","<%=recordSplit%>","<%=colSplit%>");
	});
	
	
</script>
<head>
<!-- meta http-equiv="Content-Type" content="text/html; charset=UTF-8" / -->
</head>
<body>
	<!-- viewTree.init('','viewCategories'); -->
</body>
</html>