package com.linewell.core.ucap.flow;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.linewell.ucap.flow.interfaceImp.InterfaceDB;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.UcapRequest;
import com.linewell.ucap.util.UcapRequestWebManager;
import com.linewell.ucap.workflow.UcapWorkFlow;

/**
 * <p>
 *    流程参数
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 6, 2012
 * @version 1.0  
 */
public class FlowParams {
	
	private InterfaceDB dbUtil = new InterfaceDB();
	private UcapWorkFlow ucapWorkFlow = null;
	private UcapRequest ucapRequest = null;
	private App app = null;
	
	public FlowParams(HttpServletRequest request){
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		this.app = ucapSession.getApp();
		
		request.setAttribute("belongToApp", this.app.getUnid());
		this.ucapRequest = UcapRequestWebManager.requestToUcap(request);
		ucapRequest.setSession(ucapSession);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("request", ucapRequest);
		this.ucapWorkFlow = new UcapWorkFlow(map);
		this.dbUtil.init(map);
	}

	public App getApp() {
		return app;
	}

	public void setApp(App app) {
		this.app = app;
	}

	public InterfaceDB getDbUtil() {
		return dbUtil;
	}

	public void setDbUtil(InterfaceDB dbUtil) {
		this.dbUtil = dbUtil;
	}

	public UcapRequest getUcapRequest() {
		return ucapRequest;
	}

	public void setUcapRequest(UcapRequest ucapRequest) {
		this.ucapRequest = ucapRequest;
	}

	public UcapWorkFlow getUcapWorkFlow() {
		return ucapWorkFlow;
	}

	public void setUcapWorkFlow(UcapWorkFlow ucapWorkFlow) {
		this.ucapWorkFlow = ucapWorkFlow;
	}
}
