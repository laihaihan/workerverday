<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.ucap.session.Session"%>
<%@ page import="com.linewell.ucap.platform.cache.user.User"%>
<%@ page import="com.linewell.ucap.workflow.UcapWorkFlow"%>
<%@ page import="com.linewell.ucap.util.UcapRequest"%>
<%@ page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@ page import="com.linewell.ucap.workflow.bean.flow.*"%>
<%@ page import="com.linewell.ucap.resource.ResourceCache"%>
<%@ page import="com.linewell.ucap.resource.ResourceContext"%>
<%@ page import="com.linewell.ucap.resource.ResourceType"%>
<%@ page import="com.linewell.ucap.platform.cache.button.Button"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="com.linewell.core.system.GlobalParameter"%> 
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.print.PrintCenterManager"%>
<%@page import="com.linewell.core.print.PrintCenter"%>
<%@page import="com.linewell.core.print.printireport.PrintIreportManager"%>
<%@page import="com.linewell.core.print.printireport.PrintIreport"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.linewell.core.flow.ucapconfigflow.UcapFlowButtonUtil"%>
<%
	//获取当前流程信息
	HashMap<String, Object> map = new HashMap<String, Object>();
	UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	map.put("request", ucapRequest);

	UcapWorkFlow ucWorkFlow = new UcapWorkFlow(map);
	FlowNode flowNode = ucWorkFlow.getCurNodeApi(unid,instanceUnid);
	
	List<Action> actions =  new ArrayList<Action>();//节点的操作集
	if(null != flowNode){
		actions = flowNode.getActions();
	}
	
	//是否是当前节点合法用户,审批系统管理员绕过验证
	boolean isLegitimateMan = true;
	Session ucapSession = (Session)session.getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
	
	UcapFlowButtonUtil  ucapFlowButtonUtil= new UcapFlowButtonUtil(ucapSession.getApp().getUnid());
	
	isLegitimateMan = ucapFlowButtonUtil.isLegitimateMan(unid,instanceUnid,user);
	if(isLegitimateMan){
	//受理和在办状态，默认显示“提交”按钮
		   
			for(Action action : actions) {
		  		String id = action.getId();
		  		String name = action.getName();
		  		ResourceContext context = ResourceContext.newInstance();
		  		ResourceCache cache = context.getResourceCache(ResourceType.RESOURCE_TYPE_BUTTON);
		  		Button button = (Button)cache.getResource(id);
		  		if(null == button) continue;
%>
				<button class="form_btn" onclick="<%=button.getCode() %>"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> <%=name %> </button>
<%
	   			}
			}
%>
	
	<button class="form_btn" onclick="top.popup.close(true);"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>