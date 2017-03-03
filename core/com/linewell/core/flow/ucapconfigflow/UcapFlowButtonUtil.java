

package com.linewell.core.flow.ucapconfigflow;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.linewell.ucap.workflow.bean.flow.Transition;

/**
 *功能说明：流程按钮工具类
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class UcapFlowButtonUtil {
	private String nowAppunid = "";
	
	public UcapFlowButtonUtil(String appunid){
		nowAppunid = appunid;
	}

	private static Logger logger = Logger.getLogger(UcapFlowButtonUtil.class);

	/**
	 * 
	 * 功能说明:判断当前节点是否为办结(即流程的最后一个节点)
	 * @param curNode 当前节点  
	 * @param endNode 最后一个节点
	 * @return boolean
	 * @author zjianhui@linewell.com
	 */
	public static boolean isBanjieNode(FlowNode curNode,FlowNode endNode){
		List<Transition> transitionsList = curNode.getTransitions();
		boolean isBanjie =false;//当前节点是否为办结(即流程的最后一个节点)
		for(Transition tran :transitionsList){
			if(tran.getId().equals(endNode.getId())){
				isBanjie =true;
				break;
			}
		}
		return isBanjie;
	}
	
	
	/**
	 * 当前用户是否是当前节点的合法办理人
	 * date: Mar 11, 2011
	 * @param flowNode 节点对象
	 * @param userunid 用户唯一标识
	 * @return
	 */
	public synchronized  boolean isLegitimateMan(String docUnid,String instanceUnid,  User user) {
		boolean flag = false;
		//当前节点参与者
		String retValue = "";
		String sql = "select t.instance_node_transactor_0 from ucap_fw_flow_instance t " 
			+ "where t.instance_doc_unid = '"+docUnid+"' and  t.instance_unid='"+instanceUnid+"'";
		try {
			String[][] record = JDBCTool.doSQLQuery(nowAppunid, sql);
		    if(null != record && record.length > 1){
		    	retValue = record[1][0];
		    }
		} catch (SQLException e) {
		    logger.error(e);
		}
		
		if(retValue.indexOf("_ROL")>0){//角色判断
			System.out.println("1111111111111111111111sdsdsd".indexOf("11111111111111111sdsd"));
			flag = user.getRoles().indexOf(retValue.replaceAll("_ROL", "")) >= 0;
		}else{//个人
			flag = retValue.indexOf(user.getUnid()) > -1;
		}

		return flag;
	}
	
	

	public synchronized  boolean isOver(String docUnid,String instanceUnid, String userunid) {
		//当前节点参与者
		String retValue = "";
		String sql = "select t.instance_state from ucap_fw_flow_instance t " 
			+ "where t.instance_doc_unid = '"+docUnid+"' and  t.instance_unid='"+instanceUnid+"'";
		
		try {
			String[][] record = JDBCTool.doSQLQuery(nowAppunid, sql);
		    if(null != record && record.length > 1){
		    	retValue = record[1][0];
		    }
		} catch (SQLException e) {
		    logger.error(e);
		}
		return "99".equals(retValue);
	}

}

