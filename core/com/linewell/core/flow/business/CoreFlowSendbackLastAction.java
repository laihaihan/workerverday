package com.linewell.core.flow.business;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.linewell.core.flow.instance.*;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.constant.CoreConstants;
import com.linewell.core.log.LogManager;
import com.linewell.core.observer.ObserverBussiness;
import com.linewell.core.opinion.OpinionManager;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.opensymphony.xwork2.ActionSupport;

public class CoreFlowSendbackLastAction  extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(CoreFlowSendbackLastAction.class);
	

	public String execute() throws Exception {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String userName = ucapSession.getUser().getDisplayName();
		FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,ucapSession.getApp().getUnid());
		
		
		String docUnid = request.getParameter("docUnid");				//文档id
		String instanceUnid = request.getParameter("instanceUnid");		//流程实例id
	    String unid= request.getParameter("unid");	
		boolean flag = true;
      
		String logUnid = new UNIDGenerate().getUnid();//日志UNID
		
		//流程退回
		
		flag = flag && flowWorkBusiness.doSendBackLast(docUnid,instanceUnid);
		//退回意见
		String opinion = request.getParameter("opinion");
		String opinionType = CoreConstants.OPINIONTYPE_SENDBACK;
		OpinionManager  opinionManager = new OpinionManager();
		flag = flag && opinionManager.doSave(docUnid, opinion, opinionType, userName, "退回上一环节",logUnid);
		
		//记录操作日志
		String log_what = "";//上一节点接收人员
        log_what=new UcapFwFlowInsstranceManager().doFindBeanByKey(instanceUnid).getInstance_previous_transactor();
		flag = flag && new LogManager().doSave(logUnid,docUnid, userName, "退回上一环节", log_what);
		
		if(!flag){
			log.error("【退回】出错了，unid="+docUnid);
		}
		
        /**
         * 执行观察者扩展业务
         */
		String observerName = request.getParameter("observerName");
		if(!StrUtil.isNull(observerName)){
			ObserverBussiness observerBussiness = new ObserverBussiness();
			observerBussiness.execute(request);
		}
		
		JSONObject json = new JSONObject();
        json.put("result", flag);
        PrintUtil.print(response, json.toString());
        return null;
	}
}
