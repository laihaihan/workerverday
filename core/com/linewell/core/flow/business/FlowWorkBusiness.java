package com.linewell.core.flow.business;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.flow.ucapconfigflow.UcapConfigFlow;
import com.linewell.core.flow.ucapconfigflow.UcapConfigFlowManager;
import com.linewell.core.util.BlobUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.flow.interfaceImp.InterfaceDB;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.UcapRequest;
import com.linewell.ucap.util.UcapRequestWebManager;
import com.linewell.ucap.workflow.UcapWorkFlow;
import com.linewell.ucap.workflow.bean.flow.Flow;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.linewell.ucap.workflow.bean.flow.Participant;


/**
 * 流程工作过程中业务操作
 * @author JSC
 *
 */
public class FlowWorkBusiness {
	static Logger logger = Logger.getLogger(FlowWorkBusiness.class);
	private UcapWorkFlow ucapWorkFlow = null;
	private InterfaceDB dbUtil = new InterfaceDB();
	
	/**
	 * 流程退回
	 * 
	 * @param docUnid
	 * @param instanceUnid
	 * @param preNodeUnid
	 * @param preUserUnid
	 * @return
	 */
	public boolean doSendBack(String docUnid,String instanceUnid,String preNodeUnid,String preUserUnid){
		boolean flag = ucapWorkFlow.returnFlowApi(docUnid, instanceUnid, preNodeUnid, preUserUnid);
		if(!flag){
			logger.error("流程【退回】出错了，docUnid="+docUnid);
		}
		return flag;
	}
	
	/**
	 * 流程退回
	 * 
	 * @param docUnid
	 * @param instanceUnid
	 * @param preNodeUnid
	 * @param preUserUnid
	 * @return
	 */
	public boolean doSendBackLast(String docUnid,String instanceUnid){
		boolean flag = ucapWorkFlow.completeFlowApi(docUnid, instanceUnid);
		if(!flag){
			logger.error("流程【退回上一环节】出错了，docUnid="+docUnid);
		}
		return flag;
	}
	
	/**
	 * 构造函数，主要用于初始化流程需要的相关方法
	 * @param request 
	 * @param appUnid 当前应用唯一标识
	 */
	public FlowWorkBusiness(HttpServletRequest request,String appUnid){
		request.setAttribute("belongToApp", appUnid);
		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("request", ucapRequest);
		ucapWorkFlow = new UcapWorkFlow(map);
		dbUtil.init(map);
	}
	

	/**
	 * 流程初始化
	 * 
	 * @param docUnid 需要绑定流程文档唯一标识
	 * @param flowUnid 流程配置信息唯一标识
	 * @return 初始化是否成功
	 */
	public boolean doInit(String docUnid,String flowUnid,String appUnid,String userid){
    	FlowNode beginNode = getBeginNode(flowUnid,appUnid);
    	String curUnid = beginNode.getId(); //第一节点ID
    	Participant participant = (Participant)beginNode.getParticipants().get(0);
    	    	
    	if("2".equals(participant.getParticipantType())){
    		participant.setDefaultParticipant(participant.getDefaultParticipant() + "_ROL");
    	}
    	
    	String instanceUnid = ucapWorkFlow.saveInstanceFlowDoc(flowUnid, curUnid, docUnid, "标题");//返回流程实例id
    	setCurTransactor(docUnid,participant.getDefaultParticipant(),appUnid);
    	//设置已办理人员
    	setDocAllNodeTran(docUnid,userid,appUnid);
    	
    	boolean flag = StrUtil.isNull(instanceUnid); 
    	if(flag){
    		logger.error("流程【初始化】出错了，docUnid="+docUnid);
    	}
    	return true;
	}
	
	/**
	 * 获取第一节点办理人
	 * 
	 * @param flowUnid 流程配置信息唯一标识
	 * @return Participant 对象
	 */
	public synchronized static Participant getBeginNodeParticipant(String flowUnid,String appUnid) {
		FlowNode beginNode = getBeginNode(flowUnid,appUnid);
		List list = beginNode.getParticipants();
		Participant participant = null;
		if(list != null && !list.isEmpty()){
			participant = (Participant)list.get(0);
		}
		return participant;
	}
	/**
	 * 获取初始节点
	 * 
	 * @param flowUnid 流程配置信息唯一标识
	 * @return FlowNode 对象
	 */
	public synchronized static FlowNode getBeginNode(String flowUnid,String appUnid) {
		FlowNode flowNode = null;
		Flow flow = getFlowById(flowUnid,appUnid);
		Map nodeMaps = flow.getNodes();
		Iterator itr = nodeMaps.values().iterator();
		while (itr.hasNext()) {
			flowNode = (FlowNode) itr.next();
			if (flowNode.getNodeType().equals("1")) {
				break;
			}
		}
		if (null == flowNode) {
			logger.error("当前流程没有设置办理环节!");
		}
		return flowNode;
	}

	/**
	 * 根据流程id取得流程对象
	 * 
	 * @param flowUnid 流程配置信息唯一标识
	 * @return Flow 对象
	 */
	public static Flow getFlowById(String flowUnid,String appUnid){
		UcapConfigFlowManager ucapConfigFlowManager = new UcapConfigFlowManager(appUnid);
		UcapConfigFlow ucapConfigFlow = ucapConfigFlowManager.doFindBeanByKey(flowUnid);
		if(null ==ucapConfigFlow){
			logger.error("流程不存在，unid=【"+flowUnid+"】!");
			return null;
		}
		if(null ==ucapConfigFlow.getFlow_content()){
			logger.error("没有配置流程的节点，流程unid=【"+flowUnid+"】!");
			return null;
		}
		
		Flow flow = null;
		String flowXml = BlobUtil.blobToString(ucapConfigFlow.getFlow_content());
		try {
			String encoding = "utf-8";
			if(flowXml.toLowerCase().indexOf("gb2312") > -1){
				encoding = "gb2312";
			}
			InputStream inputStream = new ByteArrayInputStream(flowXml.getBytes(encoding));
			flow =new Flow(inputStream);
		} catch (UnsupportedEncodingException e) {
		    logger.error(e);
		}
		return flow;
	}

	
	/**
	 * 设置当前办理人
	 * @param docUnid
	 * @param userid
	 * @return
	 */
	public static boolean setCurTransactor(String docUnid, String userUnid,String appUnid) {
		boolean status = true;
		String sql = "update ucap_fw_flow_instance set instance_node_transactor_0 = ? where instance_doc_unid = ?";
		Object[] params = new Object[] { userUnid, docUnid };
		try {
			status = JDBCTool.doSQLUpdate(appUnid, sql, params);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return status;
	}
	

	/**
	 * 设置当前办理人
	 * @param docUnid
	 * @param userid
	 * @return
	 */
	public static boolean setDocAllNodeTran(String docUnid, String userUnid,String appUnid) {
		boolean status = true;
		
		//获取已经办理过人员
		String docallnodetrans = geFlowInstaceColumnByDocUnidAndInstanceUnid(docUnid,"instance_doc_all_node_tran_0",appUnid);
		docallnodetrans = docallnodetrans + ","+userUnid;
		String sql = "update ucap_fw_flow_instance set instance_doc_all_node_tran_0 = ? where instance_doc_unid = ?";
		Object[] params = new Object[] { docallnodetrans, docUnid };
		try {
			status = JDBCTool.doSQLUpdate(appUnid, sql, params);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return status;
	}

	/**
	 * 
	 *  找出流程实例记录特定指端的值
	 * @param docUnid 文档unid
	 * @param columnName 字段名称
	 * @return columnName 字段对应实例的值
	 */
	public static String  geFlowInstaceColumnByDocUnidAndInstanceUnid(String docUnid,String columnName,String appUnid){
		String retValue = "";
		String sql = "select "+columnName+" from ucap_fw_flow_instance t "
			+ "where t.instance_doc_unid = '"+docUnid+"'";
		try {
			String[][] record = JDBCTool.doSQLQuery(appUnid, sql);
		    if(null != record && record.length > 1){
		    	retValue = record[1][0];
		    }
		} catch (SQLException e) {
		    logger.error(e);
		}
		return retValue;
	}
	
	
	/**
	 * 
	 *  找出流程实例记录特定指端的值
	 * @param docUnid 文档unid
	 * @param instanceUnid 流程梳理unid
	 * @param columnName 字段名称
	 * @return columnName 字段对应实例的值
	 */
	public static String  geFlowInstaceColumnByDocUnidAndInstanceUnid(String docUnid,String instanceUnid,String columnName,String appUnid){
		String retValue = "";
		String sql = "select "+columnName+" from ucap_fw_flow_instance t "
			+ "where t.instance_doc_unid = '"+docUnid+"' and  t.instance_unid='"+instanceUnid+"'";
		try {
			String[][] record = JDBCTool.doSQLQuery(appUnid, sql);
		    if(null != record && record.length > 1){
		    	retValue = record[1][0];
		    }
		} catch (SQLException e) {
		    logger.error(e);
		}
		return retValue;
	}
	
	
	/**
	 * 获取流程节点
	 * @param ucapRequest 【使用ucapRequest】
	 * @param nodeType 节点类型：1.上一节点  2.下一节点  3.当前节点
	 * @return
	 * @authur yq
	 * @since 2012-11-22
	 */
	public FlowNode getFlowNode(HttpServletRequest request,int nodeType) {
		String docUnid = request.getParameter("docUnid");
		String instanceUnid = request.getParameter("instanceUnid");

		HashMap<String, Object> map = new HashMap<String, Object>();
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		UcapRequest ucapRequest = ucapSession.getRequest();
		map.put("request", ucapRequest);
		UcapWorkFlow ucWorkFlow = new UcapWorkFlow(map);
		Flow flow = ucWorkFlow.getFlowConfigApi(docUnid, instanceUnid);
		FlowNode flowNode = null;
		switch(nodeType){
			case 1:
				String preNodeUnid = ucapRequest.getParameter("SingleSelRange");//上一节点id
				flowNode = flow.getNodeById(preNodeUnid);
				break;
			case 2:
				String nextNodeUnid = ucapRequest.getParameter("nextNode");//下一节点id
				flowNode = flow.getNodeById(nextNodeUnid);
				break;
			case 4://添加通过节点id获取节点信息选择
				String curNodeId = request.getParameter("curNodeId");
				if (!StrUtil.isNull(curNodeId)) {
					flowNode = flow.getNodeById(curNodeId);
				}
				break;
			default:
				flowNode = ucWorkFlow.getCurNodeApi(docUnid,instanceUnid);
		}
		return flowNode;
	}
	
	/**
	 * 流程发送
	 * 
	 * @param docUnid
	 * @param instanceUnid
	 * @param auditType
	 * @param nextNodeUnid
	 * @param transactors
	 * @return
	 */
	public boolean doSendFlow(String docUnid,String instanceUnid,String auditType,String nextNodeUnid,String transactors){
		boolean flag = ucapWorkFlow.sendFlowApi(docUnid, instanceUnid, auditType, nextNodeUnid, transactors);
		if(!flag){
			logger.error("流程【发送】出错了，docUnid="+docUnid);
		}
		return flag;
	}
	
	/**
	 * 流程结束
	 * 
	 * @param docUnid
	 * @param instanceUnid
	 * @return
	 */
	public boolean doEnd(String docUnid,String instanceUnid,String appUnid){
		String curNodeUnid = getCurrentNodeUnid(docUnid,instanceUnid,appUnid);//当前节点id
		boolean flag = ucapWorkFlow.endFlowApi(docUnid, instanceUnid);//控制流程引擎结束
		flag = flag && updateAllTranNode(docUnid, curNodeUnid,appUnid);//更新已办理节点字段
		if(!flag){
			logger.error("流程【结束】出错了，docUnid="+docUnid);
		}
		return flag;
	}
	
	/**
	 * 获取当前节点id
	 * @param docUnid 文档unid
	 * @param instanceUnid 流程梳理unid
	 * @return  当前节点unid
	 */
	public String getCurrentNodeUnid(String docUnid,String instanceUnid,String appUnid){
		String retValue = "";
		String sql = "select t.instance_current_node_unid from ucap_fw_flow_instance t " 
			+ "where t.instance_doc_unid = '"+docUnid+"' and t.instance_unid='"+instanceUnid+"'";
		try {
			String[][] record = JDBCTool.doSQLQuery(appUnid, sql);
		    if(null != record && record.length > 1){
		    	retValue = record[1][0];
		    }
		} catch (SQLException e) {
		    logger.error(e);
		}
		return retValue;
	}
	

	/**
	 *  更新已办理节点字段（将当前节点id加入到已办理节点id字段）
	 * @param docUnid  文档id
	 * @param nodeId 当前节点id 
	 * @return 操作是否成功　true:成功 false: 失败 
	 */
	public boolean updateAllTranNode(String docUnid,String nodeId,String appUnid){
		String sql = "update ucap_fw_flow_instance set instance_all_tran_node_unid_0=instance_all_tran_node_unid_0||',"+nodeId+"' " 
			+ "where instance_doc_unid='"+docUnid+"'";
		boolean flag = false;
		try {
			flag = JDBCTool.doSQLUpdate(appUnid, sql,new Object[0]);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return flag;
	}
	
}
