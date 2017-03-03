<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/default/common.jsp"%>
<%@page import="com.linewell.ucapx.view.ViewApi"%>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="com.linewell.ucap.platform.authorized.view.CategoryItem"%>
<%@page import="java.util.List"%>
<% 
/**
 * 视图分类
 * 
 * @author llp@linewell.com
 */
	String viewId = request.getParameter("viewId");
    ViewApi viewApi = new ViewApi();
    View view = viewApi.getView(viewId,ucapSession);
    
    List<CategoryItem> ciList = view.getCategoryItems();
    CategoryItem ci = null;
    if(null!=ciList && !ciList.isEmpty()){
    	ci = ciList.get(0);
    }
    String categoryItemType="01";
    if(null!=ci)categoryItemType = ci.getItemType();
    
    String rootText = "视图分类";
    
    //额外参数
	String isTab =request.getParameter("isTab");
	if(isTab == null || "".equals(isTab)){
		isTab="";
	}
	String moduleUnid =request.getParameter("moduleUnid");
	if(moduleUnid == null || "".equals(moduleUnid)){
		moduleUnid="";
	}
	String purl =request.getParameter("purl");
	if(purl == null || "".equals(purl)){
		purl="";
	}
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<link rel="stylesheet" type="text/css" href="<%=systemPath%>default/view/style/ext-all.css" />
		<script type="text/javascript" src="<%=systemPath%>js/ext/ext-base.js"></script>
		<script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.js"></script>
		<script type="text/javascript">
		    var view={
		        baseAction:"<%=systemPath%>BaseAction.action",
		        
		        sqlLikeKey:'~!@0~!@5',        //SQL中like的关键字
	
				sqlAnd:'~!@AND@!~',           //SQL并且的关键字(AND)连接
	
				sqlOr:'~!@OR@!~',             //SQL并且的关键字(OR)连接
	
				sqlLTEQ:'~!@0~!@2',           //SQL并且的关键字(<=)连接
	
				sqlGTEQ:'~!@0~!@1',           //SQL并且的关键字(>=)连接
	
				sqlEQ:'~!@0~!@0',             //SQL并且的关键字(=)连接
	
				fieldDbType:'~!@DB@!~',       //数据库字段
	
				fieldConstType:'~!@CL@!~',    //常量字段
	
				fieldEndPrefix:'~!@E@!~',     //结束符
		        
		    	reloadByCon:function(index,searchValue,extraConType,pcateUrl){
		    	    var url = "view.jsp?viewId="+"<%=viewId%>"+"&cateCon="+searchValue+"&isTab="+"<%=isTab%>";
		    	    url+="&moduleUnid="+"<%=moduleUnid%>"+"&purl="+"<%=purl%>&rand="+Math.random();
		    	    
		    		window.parent.document.getElementById("ifrViewData").src = url;
		    	}
		    }
		</script>
		<script type="text/javascript" src="<%=systemPath%>default/view/js/viewTree.js"></script>
	</head>
	<body>
		<div id="viewCategoryTree"/>		
		<script>viewTree.init("<%=viewId%>","viewCategoryTree",0,"<%=categoryItemType%>");</script>
	</body>
</html>