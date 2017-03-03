package com.linewell.core.flow.business;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.flow.business.FlowWorkBusiness;
import com.linewell.core.log.LogManager;
import com.linewell.core.observer.ObserverBussiness;
import com.linewell.core.opinion.OpinionManager;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 
 * @author JSC
 *
 */
public class CoreTerminateAction   extends ActionSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final Logger logger = Logger.getLogger(this.getClass());
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String appUnid = ucapSession.getApp().getUnid();
		FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,appUnid);
		 String type = request.getParameter("type");
		 User curUser = ucapSession.getUser();
		 boolean flag =true;
		 FlowNode curNode = flowWorkBusiness.getFlowNode(request,3);//当前节点
		 String punid = request.getParameter("punid");
		 String docUnid = request.getParameter("docUnid");
		 String instanceUnid = request.getParameter("instanceUnid");
		 String result = request.getParameter("result");
		
		 flag = doEnd(request, curUser, flag, curNode, punid, docUnid,instanceUnid, result,appUnid);
		 
        /**
         * 执行观察者扩展业务
         */
		String observerName = request.getParameter("observerName");
		if(!StrUtil.isNull(observerName)){
			ObserverBussiness observerBussiness = new ObserverBussiness();
			observerBussiness.execute(request);
		}
		 
		 //返回值
        JSONObject json = new JSONObject();
        json.put("result", flag);
        PrintUtil.print(response, json.toString());
        return null;
	}
	
	
	/**
	 * 
	 * 功能说明:流程结束功能，并记录日志和意见
	 * @param request
	 * @param curUser
	 * @param flag
	 * @param curNode
	 * @param punid
	 * @param docUnid
	 * @param instanceUnid
	 * @param result
	 * @return
	 * boolean
	 * @author chh
	 * @Jul 31, 2012
	 */
	private boolean doEnd(HttpServletRequest request, User curUser,
			boolean flag, FlowNode curNode, String punid, String docUnid,
			String instanceUnid, String result,String appUnid) {
		new FlowWorkBusiness(request,appUnid).doEnd(docUnid,instanceUnid,appUnid);
		String logUnid = new UNIDGenerate().getUnid();//日志UNID
		//记录意见
		String opinion = request.getParameter("opinion");
		String opinionType = "1";
		OpinionManager opinionManager = new OpinionManager();
		flag = flag && opinionManager.doSave(docUnid, opinion, opinionType, curUser.getDisplayName(), curNode.getName(),logUnid);
		
		//保存日志
		String log_do =result;
		flag = flag && new LogManager().doSave(logUnid,punid, curUser.getDisplayName(), log_do,"");
		return flag;
	}
}
