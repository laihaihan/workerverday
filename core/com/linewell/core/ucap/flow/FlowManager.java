package com.linewell.core.ucap.flow;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.flow.interfaceImp.InterfaceDB;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.platform.cache.user.UserManager;
import com.linewell.ucap.workflow.UcapWorkFlow;
import com.linewell.ucap.workflow.bean.flow.Flow;
import com.linewell.ucap.workflow.bean.flow.FlowFactory;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.linewell.ucap.workflow.bean.flow.Participant;
import com.linewell.ucap.workflow.bean.flow.Transition;

/**
 * <p>
 *   流程的数据库操作(增、删、改、查)
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class FlowManager {
	
	private Logger logger = Logger.getLogger(this.getClass());
	private InterfaceDB dbUtil = new InterfaceDB();
	private UcapWorkFlow ucapWorkFlow = null;
	private App app = null;
	
	public FlowManager(FlowParams flowParams){
		this.app = flowParams.getApp();
		this.ucapWorkFlow = flowParams.getUcapWorkFlow();
		this.dbUtil = flowParams.getDbUtil();
	}
	
	/**
	 * 根据流程id取得流程对象
	 * 
	 * @param flowUnid
	 * @return
	 */
	public Flow getFlowById(String flowUnid){
		FlowFactory flowFactory = new FlowFactory();
		return flowFactory.produce(ucapWorkFlow.getDbUtil(),flowUnid);
	}
	
	/**
	 * 获取流程实例所对应的流程对象
	 * 
	 * @param docUnid
	 * @return
	 */
	public Flow getFlowByDocUnid(String docUnid){
		String instanceUnid = this.getInstanceUnid(docUnid);//流程实例id
		return ucapWorkFlow. getFlowConfigApi (docUnid, instanceUnid);
	}
	
	/**
	 * 获取初始节点
	 * 
	 * @param flowUnid
	 * @return
	 */
	public FlowNode getBeginNode(String flowUnid) {
		FlowNode flowNode = null;
		Flow flow = this.getFlowById(flowUnid);
		if(null != flow){
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
		}else{
			logger.error("找不到流程对象，flowUnid=["+flowUnid+"]");
		}
		
		return flowNode;
	}
	public FlowNode getBeginNodeApi(String flowUnid) {
		List nodeList  = ucapWorkFlow. getFlowBeginNodeList(flowUnid);
		if(null!=nodeList && !nodeList.isEmpty()){
			return (FlowNode)nodeList.get(0);
		}
		return null;
	}

	
	/**
	 * 获取当前节点
	 * 
	 * @param docUnid
	 * @return
	 */
	public FlowNode getCurNode(String docUnid) {
		String instanceUnid = this.getInstanceUnid(docUnid);//流程实例id
		return ucapWorkFlow.getCurNodeApi(docUnid,instanceUnid);
	}
	
	/**
	 * 获取流程节点 
	 * 
	 * @param flowUnid 流程id
	 * @param nodeUnid 流程节点id
	 * @return
	 */
	public FlowNode getFlowNodeById(String flowUnid,String nodeUnid){
		FlowFactory flowFactory = new FlowFactory ();
		Flow flow = flowFactory.produce(dbUtil, flowUnid);
		FlowNode flowNode = flow.getNodeById(nodeUnid);
		return flowNode;
	}
	
	/**
	 * 获取初始节点的默认办理人
	 * 
	 * @param flowUnid		流程id
	 * @param returnType	返回值类型：1.unid  2.姓名
	 * @return
	 */
	public String getDefaultParticipant(String flowUnid,int returnType){
		FlowNode beginNode = this.getBeginNode(flowUnid);
		List list = beginNode.getParticipants();
		String defaultUser = "";
		if(list != null && !list.isEmpty()){
			for (int i=0;i<list.size();i++) {
				Participant participant = (Participant)list.get(i);
				defaultUser += (StrUtil.isNull(defaultUser) ? "" : ",") + participant.getDefaultParticipant();
			}
			
			if(returnType == 2 && !StrUtil.isNull(defaultUser)){
				String userNames = "";
				String[] userArray = defaultUser.split(",");
				for (int i = 0; i < userArray.length; i++) {
					User user = UserManager.getUserByResourceUnid(defaultUser);
					userNames += (i == 0 ? "" : ",") + user.getDisplayName();
				}
				defaultUser = userNames;
			}
		}
		return defaultUser;
	}
	
	/**
	 *  更新已办理节点字段（将当前节点id加入到已办理节点id字段）
	 *  
	 * @param docUnid  	文档id
	 * @param nodeId 	当前节点id 
	 * @return 操作是否成功　true:成功 false: 失败 
	 */
	public boolean updateAllTranNode(String docUnid,String nodeId){
		String sql = "update ucap_fw_flow_instance set instance_all_tran_node_unid_0=instance_all_tran_node_unid_0||',"+nodeId+"' ";  
		sql += "where instance_doc_unid='"+docUnid+"'";
		boolean flag = false;
		try {
			flag = JDBCTool.doSQLUpdate(app.getUnid(), sql, null);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return flag;
	}

	/**
	 * 设置当前办理人
	 * @param docUnid
	 * @param userUnid
	 * @return
	 */
	public boolean setCurTransactor(String docUnid, String userUnid) {
		boolean status = true;
		String sql = "update ucap_fw_flow_instance set instance_node_transactor_0 = ? where instance_doc_unid = ?";
		Object[] params = new Object[]{userUnid, docUnid};
		try {
			status = JDBCTool.doSQLUpdate(app.getUnid(), sql, params);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return status;
	}
	
	/**
	 * 判断流程是否已经结束
	 * 
	 * @param docUnid 文档unid
	 * @return  当前节点unid
	 */
	public boolean isFlowEnd(String docUnid){
		String retValue = this.getInstaceColumnValue(docUnid, "instance_state");//流程状态;
		return "99".equals(retValue);
	}
	
	/**
	 * 是否是最后一个节点
	 * 
	 * @param flowNode 流程节点对象
	 * @param flow 流程对象
	 * @return true: 是，false：否
	 */
	public boolean isLastNode(FlowNode flowNode,Flow flow){
		boolean flag = false;
		List list = flowNode.getTransitions();
		if(null != list && !list.isEmpty()){
			for (int i = 0; i < list.size(); i++) {
				Transition transition = (Transition)list.get(i);
				FlowNode nextNode = flow.getNodeById(transition.getId());
				if("2".equals(nextNode.getNodeType())){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}
	
	/**
	 *  更新流程实例主办审阅字段
	 *  
	 * @param docUnid  文档id
	 * @param apprSelResultUnids 主办人员unid 
	 * @param coApprSelResultUnids 阅办人员unid多个以 逗号“,”隔开
	 * @return 操作是否成功　true:成功 false: 失败 
	 */
	public boolean updateFlowZhuBanShenYue(String docUnid,String apprSelResultUnids,String coApprSelResultUnids){
		String sql = "update ucap_fw_flow_instance set INSTANCE_NODE_TRANSACTOR_0='"+apprSelResultUnids+"'," 
			+ "instance_notnode_transactor_0='"+coApprSelResultUnids+"' where instance_doc_unid='"+docUnid+"'";
		boolean flag = false;
		try {
			flag = JDBCTool.doSQLUpdate(app.getUnid(), sql,new Object[0]);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return flag;
	}
	
	/**
	 * 当前用户是否是当前节点的合法办理人
	 * 
	 * @param docUnid 节点对象
	 * @param userUnid 用户唯一标识
	 * @return
	 */
	public boolean isLegitimateMan(String docUnid, String userUnid) {
		String retValue = this.getInstaceColumnValue(docUnid, "instance_node_transactor_0");//当前节点参与者
		return retValue.indexOf(userUnid) > -1;
	}
	
	/**
	 *  获取流程实例表指定字段的值
	 * 
	 * @param docUnid 文档unid
	 * @param columnName 字段名称
	 * @return columnName 字段对应实例的值
	 */
	public String getInstaceColumnValue(String docUnid,String columnName){
		String retValue = "";
		String sql = "select "+columnName+" from ucap_fw_flow_instance where instance_doc_unid = '"+docUnid+"'";
		try {
			String[][] result = JDBCTool.doSQLQuery(app.getUnid(), sql);
			retValue = result.length > 1 ? result[1][0] : retValue;
		} catch (SQLException e) {
		    logger.error(e);
		}
		return retValue;
	}
	
	/**
	 * 根据文档id获取流程实例的id 
	 *  
	 * @param docUnid
	 * @return
	 */
	public String getInstanceUnid(String docUnid) {
		return this.getInstaceColumnValue(docUnid, "instance_unid");
	}

	/**
	 * 获取节点办理人
	 * @param docUnid     文档unid 		   
	 * @param getType     获取类型：1.当前办理人   2.上一节点办理人   3.全部办理人 
	 * @param returnType  返回值类型：1.unid   2.姓名 
	 * @return
	 */
	public String getNodeTransactors(String docUnid, int getType, int returnType) {
		String column = "";
		switch (getType) {
			case 1: column = "instance_node_transactor_0"; break;
			case 2: column = "instance_previous_transactor"; break;
			case 3: column = "instance_doc_all_node_tran_0"; break;
			//TODO 需要其他类型的办理人信息，可在下面自行扩展
			default: column = "";
		}

		String transactors = "";
		if (!StrUtil.isNull(column)) {
			String[] userid = this.getInstaceColumnValue(docUnid, column).split(",");
			for (int i = 0; i < userid.length; i++) {
				User user = UserManager.getUserByResourceUnid(userid[i]);
				if (null != user) {
					String transactor = returnType == 1 ? user.getUnid() : user.getDisplayName();
					transactors += (i == 0 ? "" : ",") + transactor;
				}
			}
		}
		return transactors;
	}

	/**
	 * 获取节点id
	 * 
	 * @param docUnid 	文档unid
	 * @param getType   获取类型：1.初始节点  2.上一节点  3.当前节点  4.已办理节点
	 * @return 指定的unid，多个以逗号隔开
	 */
	public String getNodeUnid(String docUnid, int getType){
		String column = "";
		switch (getType) {
			case 1: column = "instance_begin_node_unid"; break;
			case 2: column = "instance_previous_node_unid"; break;
			case 3: column = "instance_current_node_unid"; break;
			case 4: column = "instance_all_tran_node_unid_0"; break;
			//TODO 需要其他类型的节点信息，可在下面自行扩展
			default: column = "";
		}
		
		String nodeUnid = "";
		if (!StrUtil.isNull(column)) {
			nodeUnid = this.getInstaceColumnValue(docUnid,column);
		}
		return nodeUnid;
	}
}