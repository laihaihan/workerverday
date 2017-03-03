package com.linewell.core.flow.config;


import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.flow.ucapconfigflow.UcapConfigFlow;
import com.linewell.core.flow.ucapconfigflow.UcapConfigFlowManager;
import com.linewell.core.util.BlobUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.workflow.bean.flow.Flow;

/**
 * 流程引擎配置
 * @author JSC
 *
 */
public class FlowConfigBusiness {	
    static Logger logger = Logger.getLogger(FlowConfigBusiness.class);
	
	/**
	 * 保存平台流程引擎
	 * @param flowid
	 * @param appunid
	 */
	public boolean saveUcapFlowConfig(String flowid,String name ,String appunid){
		//保存流程信息
		Flow flow = this.getDefaultFlow(flowid,name,appunid); //封装流程基础对象
		String xml = this.getDefaultFlowXml(flow.getXml());//构建默认流程xml（包含开始和结束两个默认节点）
		UcapConfigFlowManager ucapConfigFlowManager = new UcapConfigFlowManager(appunid);
		UcapConfigFlow ucapConfigFlow = new UcapConfigFlow();
		ucapConfigFlow.setFlow_unid(flowid);
		ucapConfigFlow.setFlow_name(name +"流程");
		ucapConfigFlow.setFlow_belong_to_app(appunid);
		ucapConfigFlow.setFlow_sort("流程配置");
		ucapConfigFlow.setFlow_content(BlobUtil.StringToBlob(xml,"GBK"));
		return ucapConfigFlowManager.doSave(ucapConfigFlow);	
	}
	
	
	/**
	 * 获取默认流程xml
	 * 
	 * @param xml
	 * @return 包含开始和结束节点的流程配置信息
	 */
	private String getDefaultFlowXml(String xml){
		StringBuffer result = new StringBuffer();
		result.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		result.append(xml.replaceAll("</flow>",""));
		result.append("<nodes>");
		result.append("<node id=\""+new UNIDGenerate().getUnid()+"\" name=\"开始\" formid=\"\" auditType=\"\" multipleParallel=\"\" transferAction=\"\" nodeType=\"0\" convergePattern=\"\" branchPattern=\"\" transactorType=\"0\" convergeNodeId=\"\" toSms=\"\" participantType=\"\"><coordinate x=\"100\" y=\"100\"/></node>");
		result.append("<node id=\""+new UNIDGenerate().getUnid()+"\" name=\"结束\" formid=\"\" auditType=\"\" multipleParallel=\"\" transferAction=\"\" nodeType=\"2\" convergePattern=\"\" branchPattern=\"\" transactorType=\"0\" convergeNodeId=\"\" toSms=\"\" participantType=\"\"><coordinate x=\"500\" y=\"100\"/><actions><action id=\"send\" name=\"发送\"></action><action id=\"diffluence_send\" name=\"分流发送\"></action><action id=\"node_call_back\" name=\"本节点收回\"></action><action id=\"send_sub_flow\" name=\"发送子流程\"></action></actions></node>");
		result.append("</nodes>");
		result.append("</flow>");
		
		return result.toString();
	}
	
	
	/**
	 * 获取默认流程
	 * 
	 * @param flowid
	 * @param serviceid
	 * @return
	 */
	private Flow getDefaultFlow(String flowid,String name,String appunid){
		Flow flow = new Flow();
		flow.setId(flowid);
		flow.setName(name+"流程");
		flow.setBelongToApp(appunid);
		//flow.setFormid(ApasConstants.COMMON_FORMID);
		flow.setItemTitleName("标题");
		flow.setSort("流程引擎");
		flow.setIsSubFlow("0");
		return flow;
	}
	
	/**
	 * 
	 * 功能说明:根据办件unid获取流程unid
	 * @param docUnid
	 * @author zjianhui
	 */
	public static String getFlowUnidByInstanceUnid(String docUnid,String appUnid) {
		String instanceUnid = "";
		String sql = "select instance_flow_cofigure_unid from ucap_fw_flow_instance where instance_doc_unid='" + docUnid + "'";
		try {
			String[][] result = JDBCTool.doSQLQuery(appUnid, sql);
			instanceUnid = result.length > 1 ? result[1][0] : instanceUnid;
		} catch (SQLException e) {
		    logger.error(e);
		}
		return instanceUnid;
	}
	

	/**
	 * 根据文档id获取流程实例的id 
	 *  create by zjianhui@linewell.
	 *  备注： 调用原来的ucWorkFlow.getInstanceList(docUnid,””)用非流程用户登录进去会取不到
	 *    所以直接读流程表。
	 * @param docUnid
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static String getInstanceUnid(String docUnid,String appUnid) {
		String instanceUnid = "";
		String sql = "select instance_unid from ucap_fw_flow_instance where instance_doc_unid='" + docUnid + "'";
		try {
			String[][] result = JDBCTool.doSQLQuery(appUnid, sql);
			instanceUnid = result.length > 1 ? result[1][0] : instanceUnid;
		} catch (SQLException e) {
		    logger.error(e);
		}
		return instanceUnid;
	}
	
	/**
	 * 获取模块对应流程列表
	 * @param moduleUnid 模块唯一标识
	 * @param appUnid 应用唯一标识
	 * @return <FlowConfig>对象的List
	 */
	public List<FlowConfig> getFLowListByModuleUnid(String moduleUnid,String appUnid){
		FlowConfigManager flowConfigManager = new FlowConfigManager();
		Object[] objs = new Object[2];
		objs[0] = moduleUnid;
		objs[1] = appUnid;
		return flowConfigManager.doFindListByCondition("", null);
	}
}
