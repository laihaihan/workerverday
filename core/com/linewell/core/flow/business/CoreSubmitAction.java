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
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.cache.user.UserManager;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.linewell.ucap.platform.cache.role.Role;
import com.linewell.ucap.platform.cache.role.RoleManager;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 流程提交样例
 * @author JSC
 *
 */
public class CoreSubmitAction  extends ActionSupport {
	
	private final Logger logger = Logger.getLogger(this.getClass());

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String appUnid = ucapSession.getApp().getUnid();
		FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,appUnid);
    	String userName = ucapSession.getUser().getDisplayName();
		FlowNode nextNode = flowWorkBusiness.getFlowNode(request,2);//下一节点 
		FlowNode curNode = flowWorkBusiness.getFlowNode(request,3);//下一节点
		String nextNodeName = nextNode.getName();

		String curAuditType = request.getParameter("curAuditType");		//当前节点审批方式
		String transactors =request.getParameter("participantids");		//下一节点办理人(多人)
		String nextNodeUnid = request.getParameter("nextNode");			//下一节点id
		String nextauditType = request.getParameter("NextApproveType");	//下一节点审批方式
		String docUnid = request.getParameter("docUnid");	
	//文档id
		String instanceUnid = request.getParameter("instanceUnid");		//流程实例id
		
	    boolean flag = false;
		String doing = "";
		String log_what = "";//下一节点接收人员
		
		if("2".equals(curAuditType)){ //多人顺序
			doing = "多人顺序节点内流转";
			String userids = flowWorkBusiness.geFlowInstaceColumnByDocUnidAndInstanceUnid(docUnid,instanceUnid,"instance_moreorder_not_tran_0",appUnid);
			log_what = UserManager.getUserByResourceUnid(userids.split(",")[0]).getDisplayName();
		}else if("3".equals(curAuditType)){ //多人并行
			
			doing = "多人并行节点内流转";
			log_what = "并行节点未办理人员【";
			String userids = flowWorkBusiness.geFlowInstaceColumnByDocUnidAndInstanceUnid(docUnid,instanceUnid,"instance_node_transactor_0",appUnid);
			String[] useridss = userids.split(",");
			for (int i = 0; i < useridss.length; i++) {
				log_what += (i == 0 ? "" : ",") +  UserManager.getUserByResourceUnid(useridss[i]).getDisplayName();
			}
			log_what = log_what + "】";
		
		}else{ //单人审批
			//流程发送到下一节点
			flag = flowWorkBusiness.doSendFlow(docUnid,instanceUnid,nextauditType,nextNodeUnid,transactors);
			doing = "送[" + nextNodeName + "]";
			if(!StrUtil.isNull(transactors)){
				String[] userUnids = StrUtil.formatNull(transactors).split(",");
				for (int i = 0; i < userUnids.length; i++) {
					if(userUnids[i].indexOf("_ROL")>0){//角色判断
						RoleManager roleManager = new RoleManager();
						Role role = roleManager.doFindByUnid(userUnids[i].replaceAll("_ROL", ""));
						log_what += (i == 0 ? "" : ",") + role.getName();	
					}else{
						log_what += (i == 0 ? "" : ",") + UserManager.getUserByResourceUnid(userUnids[i]).getDisplayName();	
					}
				}
			}
		}
		
		
		//环节意见
		String logUnid = new UNIDGenerate().getUnid();//日志UNID
		String opinion = request.getParameter("opinion");
	
	    String	 opinionType = "提交意见";
		
		
		String opinionUnid =new UNIDGenerate().getUnid();
		flag = flag && new OpinionManager().doSave(opinionUnid,docUnid, opinion, opinionType, userName, curNode.getName(),logUnid);//modify by zwenyu 20120727 应取当前环节 nextNodeName
		
		//记录操作日志
    	flag = flag && new LogManager().doSave(logUnid,docUnid, userName, doing, log_what);
    	
    	if(!flag){
    		logger.error("办件【提交】出错了，unid="+docUnid);
    	}
    	
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
}