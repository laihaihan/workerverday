<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucapx.view.ViewApi"%>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="com.linewell.ucapx.common.WebAppUtils"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@include file="/default/common.jsp"%>
 
<% 
/**
 * 视图页面
 * 
 * @author llp@linewell.com,zhua@linewell.com
 * 
 * @since 2011-07-5
 */
	String viewId = request.getParameter("viewId");	//视图ID
	String purl = request.getParameter("purl"); //父URL
	String pageNum =request.getParameter("page");//视图当前页
	String flag = request.getParameter("searchFlag");
	String extranCon = request.getParameter("extranCon");//外部条件
	String cateCon = request.getParameter("cateCon");    //树型分类条件
	boolean isAnd =true;
	if(StringUtils.isNotEmpty(request.getParameter("isAnd"))){
		 isAnd = StringUtil.parseBoolean(request.getParameter("isAnd"));
	}
	String orderBy = request.getParameter("orderBy");//按name1,name2;asc,desc这样的模式，方便扩展
	String orderBySql = "";
	Map<String,String> orderByMap = new HashMap<String,String>();
	if(StringUtils.isNotEmpty(orderBy)){
		String[] keys = orderBy.split(";")[0].split(",");
		String[] mods = orderBy.split(";")[1].split(",");
		for(int i=0;i<keys.length && i<mods.length;i++){
			if(StringUtils.isEmpty(keys[i]))continue;
			if(StringUtils.isNotEmpty(orderBySql))orderBySql += ",";
			orderBySql += keys[i]+" "+mods[i];
			
			orderByMap.put(keys[i],mods[i]);
		}
	}
	
	String result="";
	if(null!=purl)purl = purl.replace("~$*$~","&");
	Map<String,String> map =  new HashMap<String,String>();
	if(StringUtils.isNotEmpty(pageNum)){
		map.put("pageNum",pageNum);
	}else{
		map.put("pageNum","1");
	}
	if(StringUtils.isNotEmpty(extranCon)){
		map.put("extranCon",extranCon);
		
		
	}else{
		map.put("extranCon","");
	}
	if(StringUtils.isNotEmpty(flag)){
		map.put("searchFlag",flag);
	}else{
		map.put("searchFlag","");
	}
	
	String isSingle = request.getParameter("isSingle"); //视图记录单多选标识
	String recordSplit = request.getParameter("recordSplit"); //视图通用选择框返回值的行分隔符
	String colSplit = request.getParameter("colSplit");//视图通用选择框返回值的列分隔符
	String isTab=request.getParameter("isTab"); //是否页签
	String bModuleUnid = request.getParameter("moduleUnid");//业务模块ID

	if(null==isSingle)isSingle = "0";//默认为单选
	if(null==recordSplit)recordSplit="";
	if(null==colSplit)colSplit="";	
	if(null==isTab)isTab="0";
	if(null==bModuleUnid)bModuleUnid = "";
	
	ViewApi viewApi = new ViewApi();
	View view = viewApi.getView(viewId,ucapSession);
	//获取视图分页
	UcapRequest ucapRequest =UcapRequestWebManager.requestToUcap(request);
	ViewPage viewPage = null;
	
	//组合查询条件
	String searchCon = extranCon;
	if(StringUtils.isNotEmpty(cateCon)){
		if(StringUtils.isEmpty(searchCon)){
			searchCon = cateCon;
		}else{
			searchCon+=" and "+cateCon;
		}
	}
	if(StringUtils.isBlank(searchCon)){
		searchCon = "";	
	}
	if(StringUtils.isNotEmpty(searchCon)){
		viewPage = viewApi.getViewPage(view,ucapSession,searchCon,isAnd,ucapRequest);
	}else{
		viewPage = viewApi.getViewPage(view,ucapSession,ucapRequest);
	}
	//相对路径地址
	String uri = request.getRequestURI();
	if(uri.indexOf("/default")>=0){
		uri = uri.substring(0,uri.indexOf("/default"))+"/default";	
	}else{
		String[] uris = uri.split("/");
		uri="/"+uris[1]+"/"+uris[2]+"/default";
	}
%>
<head>
<title>南威CRM系统视图</title>
<link href="<%=uri%>/view/style/view.css" rel="stylesheet" type="text/css" />
<script language="javascript" src="<%=systemPath%>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%=systemPath%>default/js/jquery.cookie.js"></script>
<script language="javascript" src="<%=systemPath%>default/js/jquery.eventDom-0.1.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=systemPath %>js/ucap/util/common.js"></script>
<script type="text/javascript" src="<%=systemPath %>js/ucap/select/listSelect.js"></script>
<script type="text/javascript" src="<%=systemPath%>default/view/js/view.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/view.js"></script>
<script type="text/javascript" src="js/viewImp.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/flow/ucapFlow.js"></script>

<script type="text/javascript">
	var viewInfo={
		viewId:"<%=viewId%>",//视图ID
		formId:"<%=view.getFormUnid()%>",//表单ID
		formType:"<%=view.getFormType()%>",//表单类型
		openJs:"<%=view.getOpenJs()%>",//视图打开函数
		isFlowItem:<%=view.isFlowItem()%>,//是否有流程字段
		opendocType:"<%=view.getOpendocType()%>",//打开文档的方式
		newdocType:"<%=view.getNewdocType()%>", //新建文档的方式 
		jspUrl:"<%=view.getJspUrl()%>",//显示的JSP名称
		purl:"<%=purl%>"
 	
	}

</script>
</head>

<body onload="loadViewDataPosition()">

	<!-- 搜索栏 begin-->
	<form id="queryForm" name="queryForm" action="view.jsp?viewId=<%=viewId%>" method="post">
		<input type="hidden" name="cateCon" id="cateCon" value="<%=WebAppUtils.convertNull(cateCon)%>" />
		<input type="hidden" name="extranCon" id="extranCon" value="<%=WebAppUtils.convertNull(map.get("extranCon"))%>" />
		<input type="hidden" name="orderBy" id="orderBy" value="<%=WebAppUtils.convertNull(orderBy)%>" />
		<input type="hidden" name="page" id="page"  value="<%=WebAppUtils.convertNull(map.get("pageNum"))%>"/>
		<input type="hidden" name="searchFlag" id="searchFlag" value="<%=WebAppUtils.convertNull(map.get("searchFlag"))%>" />
		<%@include file="viewSimpleSearch.jsp"%>
		<!-- 搜索栏 end-->
	
		<!-- 高级搜索 begin-->
		<%@include file="viewAdvanceSearch.jsp"%>
		<!-- 高级搜索 end-->
	</form>
	
	<!-- 按钮栏 begin-->
	<%@include file="viewButton.jsp"%>
	<!-- 按钮栏 end-->
	
	<!-- 视图表格 begin-->
	<!-- 数据内容 -->
	<%@include file="viewData.jsp"%>
	<!-- 数据内容结束 -->
	<!-- 视图表格 end-->
	
	<!-- 页码栏 begin-->
	<%@include file="viewPage.jsp"%>
	<!-- 页码栏 end-->
</body>

</html>
