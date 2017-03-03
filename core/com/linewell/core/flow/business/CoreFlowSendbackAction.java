package com.linewell.core.flow.business;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.linewell.ucap.platform.cache.user.UserManager;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.opensymphony.xwork2.ActionSupport;

public class CoreFlowSendbackAction   extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(CoreFlowSendbackAction.class);
	
	public String execute() throws Exception {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String userName = ucapSession.getUser().getDisplayName();
		FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,ucapSession.getApp().getUnid());
		FlowNode preNode = flowWorkBusiness.getFlowNode(request,1);//上一节点
		String preNodeName = preNode.getName();
		
		String docUnid = request.getParameter("docUnid");				//文档id
		String instanceUnid = request.getParameter("instanceUnid");		//流程实例id
		String preNodeUnid = request.getParameter("SingleSelRange");	//上一节点id
		String preUserUnid = request.getParameter("SingleSelResult");	//上一节点办理人id	
	
		boolean flag = true;
 
		String logUnid = new UNIDGenerate().getUnid();//日志UNID
		
		//流程退回
		
		flag = flag && flowWorkBusiness.doSendBack(docUnid,instanceUnid,preNodeUnid,preUserUnid);
		//退回意见
		String opinion = request.getParameter("opinion");
		String opinionType = CoreConstants.OPINIONTYPE_SENDBACK;
		OpinionManager  opinionManager = new OpinionManager();
		/**********流程意见列表退回时，环节信息显示出错修改 begin*******************/
		String currentNodeName = "";
		FlowNode currentNode = flowWorkBusiness.getFlowNode(request, 4);
		if (currentNode != null) {
			currentNodeName = currentNode.getName();
		}
		if (StrUtil.isNull(currentNodeName)) {
			currentNodeName = preNodeName;
		}
		flag = flag && opinionManager.doSave(docUnid, opinion, opinionType, userName, currentNodeName,logUnid);
		/**********流程意见列表退回时，环节信息显示出错修改 end*******************/
		//记录操作日志
		String log_what = "";//上一节点接收人员
		String transactors =request.getParameter("SingleSelResult");//上一节点办理人(多人)
		String[] userUnids = StrUtil.formatNull(transactors).split(",");
		for (int i = 0; i < userUnids.length; i++) {
			log_what += (i == 0 ? "" : ",") + UserManager.getUserByResourceUnid(userUnids[i]).getDisplayName();
		}
		flag = flag && new LogManager().doSave(logUnid,docUnid, userName, "退回[" + preNodeName + "]", log_what);
		
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
