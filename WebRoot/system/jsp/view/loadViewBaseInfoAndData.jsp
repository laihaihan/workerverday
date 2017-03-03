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
	//��ҳ�õĿ�ʼ��¼��ʾ
	String startStr =request.getParameter("start") ;	
	if(null != startStr && StringUtils.isNumeric(startStr)){	
		start =Integer.parseInt(startStr);
	}	
	params = params+"start="+start;
	String type = request.getParameter("type");
	type ="getView";	
	String action = request.getParameter("action");
	action = "getdata" ;
	
	//��ѯ
	String  extrancon = request.getParameter("extrancon");
	if(StringUtils.isEmpty(extrancon))
		extrancon = "" ;
	params= params + "&extrancon="+extrancon;
	//��ȡpurl
	String purl = request.getParameter("purl");
	
	//����
	String categorycon = request.getParameter("categorycon");
	if(StringUtils.isEmpty(categorycon))
		categorycon = "" ;
	params= params +"&categorycon="+categorycon;
	//�����ֶ�����
	String sort = request.getParameter("sort");
	
	if(StringUtils.isEmpty(sort))
		sort = "";
	params= params +"&sort="+sort;
	//��������
	String dir = request.getParameter("dir");
	if(StringUtils.isEmpty(dir))
		dir = "";
	params= params +"&dir="+dir;
	UcapRequest ur = null;
	
	String isoldref =request.getParameter("isoldref");
	
	if(StringUtils.isEmpty(isoldref))
		isoldref = "";
	
	//�߼���ѯǰ׺
	String advPrefix = "$_A_$";
	
	//������װ Request ת	UcapRequest ��json��������
	String rqJson ="{\"rand\":\""+ Math.random() +"\",\"type\":\""+type+"\",\"viewId\":\""+viewId+"\"}";
	String setQueryString ="viewId="+viewId+"&type="+type+"&rand="+ Math.random() +"";
	ur = UcapRequestWebManager.requestToUcap(request);
	ur.setQueryString(setQueryString);
	ur.setParameterJson(rqJson);
	//end
	//������ͼ��������
	// ����Ϊ��������ͼ������صĲ��������ݻ�ȡ
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

	
	// �Ȼ�ȡ��ͼ�еİ�ť,�ڻ�ȡ��ͼ������Ϣʱ�������� add by llp 2011-04-27
	try {
		SubButtonManager sbm = new SubButtonManager();
		List<SubButton> subButtonList = sbm.doFindByBelongUnid(view.getPunid(), session1);
		view.setSubButtonList(subButtonList);
	} catch (Exception e) {
		e.printStackTrace();
	}
	//��ȡ��ϱ���JSP��Ϣ add by jc 20100915
	if("03".equals(view.getFormType())){
		//�����ܽ����Ż���
		GlobalResource globalRes = GlobalUtils.getComposeForm(ur);
		String jspUrl = globalRes.getData(view.getFormUnid(), "cform_jsp_url");
		if(StringUtils.isNotEmpty(jspUrl)){
			view.setJspUrl(jspUrl);
		}
	}
	
	//ÿҳ������
	int pageSize =view.getPageSize();	
	if(pageSize==0)
		pageSize = 20 ;
	limit=pageSize;
%>