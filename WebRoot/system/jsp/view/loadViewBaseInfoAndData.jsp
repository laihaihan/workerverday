<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.util.UcapRequest"  %>
<%@page import="org.apache.commons.lang.StringUtils"  %>
<%@page import="com.linewell.ucap.action.ViewAction"  %>
<%@page import="com.linewell.ucap.action.base.IUcapAction"  %>
<%@page import="net.sf.json.JSONObject"  %>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="com.linewell.ucap.platform.authorized.view.ViewItem"%>
<%@page import="com.linewell.ucap.platform.authorized.view.query.Query"%>
<%@page import="com.linewell.ucap.platform.authorized.view.query.QuerySimpleItem"%>
<%@page import="com.linewell.ucap.platform.authorized.view.query.QueryAdvancedItem"%>
<%@page import="com.linewell.ucap.platform.subbutton.SubButton" %>
<%@page import="com.linewell.ucap.platform.authorized.view.query.FixedQuery" %>
<%@page import="com.linewell.ucap.platform.authorized.view.CategoryItem" %>
<%@page import="com.linewell.ucap.platform.cache.button.Button" %>
<%@page import="com.linewell.ucap.jdbc.core.JdbcTemplate" %>
<%@page import="com.linewell.ucap.db.JDBCTool" %>
<%@page import="com.linewell.ucap.platform.authorized.view.ViewManager" %>
<%@page import="com.linewell.ucap.session.Session" %>
<%@page import="org.apache.commons.logging.Log" %>
<%@page import="org.apache.commons.logging.LogFactory" %>
<%@page import="com.linewell.ucap.platform.subbutton.SubButtonManager" %>
<%@page import="com.linewell.ucap.session.GlobalResource" %>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils" %>

<%

	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

	int limit = 0 ;
	int start = 0 ;
	String viewId= request.getParameter("viewId");
	
	String params ="";
	
	if(null == viewId ){
		//return;
		viewId= "85EA017398D04F4500151416001D0000" ;
	}	
	//分页用的开始记录标示
	String startStr =request.getParameter("start") ;	
	if(null != startStr && StringUtils.isNumeric(startStr)){	
		start =Integer.parseInt(startStr);
	}	
	params = params+"start="+start;
	String type = request.getParameter("type");
	type ="getView";	
	String action = request.getParameter("action");
	action = "getdata" ;
	
	//查询
	String  extrancon = request.getParameter("extrancon");
	if(StringUtils.isEmpty(extrancon))
		extrancon = "" ;
	params= params + "&extrancon="+extrancon;
	//获取purl
	String purl = request.getParameter("purl");
	
	//分类
	String categorycon = request.getParameter("categorycon");
	if(StringUtils.isEmpty(categorycon))
		categorycon = "" ;
	params= params +"&categorycon="+categorycon;
	//排序字段名称
	String sort = request.getParameter("sort");
	
	if(StringUtils.isEmpty(sort))
		sort = "";
	params= params +"&sort="+sort;
	//排序类型
	String dir = request.getParameter("dir");
	if(StringUtils.isEmpty(dir))
		dir = "";
	params= params +"&dir="+dir;
	UcapRequest ur = null;
	
	String isoldref =request.getParameter("isoldref");
	
	if(StringUtils.isEmpty(isoldref))
		isoldref = "";
	
	//高级查询前缀
	String advPrefix = "$_A_$";
	
	//用于组装 Request 转	UcapRequest 的json请求数据
	String rqJson ="{\"rand\":\""+ Math.random() +"\",\"type\":\""+type+"\",\"viewId\":\""+viewId+"\"}";
	String setQueryString ="viewId="+viewId+"&type="+type+"&rand="+ Math.random() +"";
	ur = UcapRequestWebManager.requestToUcap(request);
	ur.setQueryString(setQueryString);
	ur.setParameterJson(rqJson);
	//end
	//请求视图基本数据
	// 以下为跟具体视图对象相关的操作的数据获取
	JdbcTemplate jt = JDBCTool.getPlatformDBTool();
		jt.open();
	Session session1 = (Session) ur.getSession();
	View view = null;
	ViewManager vm = new ViewManager(jt);
	try {
		view = vm.doFindByPunidAndSession(viewId, session1,ur);
	} catch (Exception e) {
		e.printStackTrace();			
	} finally {
		jt.close();
		jt = null;
	}

	
	// 先获取视图中的按钮,在获取试图基本信息时进行设置 add by llp 2011-04-27
	try {
		SubButtonManager sbm = new SubButtonManager();
		List<SubButton> subButtonList = sbm.doFindByBelongUnid(view.getPunid(), session1);
		view.setSubButtonList(subButtonList);
	} catch (Exception e) {
		e.printStackTrace();
	}
	//获取组合表单的JSP信息 add by jc 20100915
	if("03".equals(view.getFormType())){
		//对性能进行优化下
		GlobalResource globalRes = GlobalUtils.getComposeForm(ur);
		String jspUrl = globalRes.getData(view.getFormUnid(), "cform_jsp_url");
		if(StringUtils.isNotEmpty(jspUrl)){
			view.setJspUrl(jspUrl);
		}
	}
	
	//每页的数量
	int pageSize =view.getPageSize();	
	if(pageSize==0)
		pageSize = 20 ;
	limit=pageSize;
%>